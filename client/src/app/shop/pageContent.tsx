"use client"
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  rem,
  ScrollArea,
  Stack,
  Text,
  Title,
  Transition
} from "@mantine/core";
import React, {useContext, useEffect, useState} from "react";
import {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import ShopCard from "@/app/shop/components/ShopCard";
import {
  IconBuildingStore,
  IconChevronLeft,
  IconChevronRight,
  IconShoppingCart,
  IconShoppingCartCopy, IconShoppingCartFilled,
  IconX
} from "@tabler/icons-react";
import CustomLoading from "@/_components/CustomLoading";
import styles from './styles/ShopPage.module.scss';
import {AuthenticatedUser, authenticationService} from "@/_services/authentication.service";
import Order, {FetchedOrder, SelectedProducts} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import PaymentForm from "@/_components/PaymentForm";
import AppContext from "@/app/Context/AppContext";
import LoginForm from "@/_components/LoginForm";

const ShopPageContent = () => {

  const {isMobile} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<FetchedProduct[]>([]);
  const [hideSummary, setHideSummary] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(authenticationService.loggedUserValue);
  const [order, setOrder] = useState<FetchedOrder | null>(null);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSummary, setShowSummary] = useState(false);
  const [shopStep, setShopStep] = useState<number>(0);

  const getProducts = async () => {
    setIsLoading(true);
    const data = await productService.getProducts();
    if (data) setProducts(data as FetchedProduct[]);
    setIsLoading(false);
  };

  const addToCart = (product: FetchedProduct, quantity: number) => {
    setSelectedProducts((prevProducts) => {
      const existingProduct = prevProducts.find(p => p.id === product.id);

      if (existingProduct) {
        return prevProducts.map(p =>
          p.id === product.id ? {...p, quantity: existingProduct.quantity! + quantity} : p
        );
      } else {
        const partialProduct = {
          id: product.id,
          name: product.name,
          price: product.price!,
          quantity: quantity,
        };
        return [...prevProducts, partialProduct];
      }
    });
  };

  const removeFromCart = (product: FetchedProduct) => {
    setSelectedProducts((prevProducts) => {
      const existingProduct = prevProducts.find(p => p.id === product.id);

      if (existingProduct && existingProduct.quantity && existingProduct.quantity > 1) {
        return prevProducts.map(p =>
          p.id === product.id ? {...p, quantity: existingProduct.quantity! - 1} : p
        );
      } else {
        return prevProducts.filter(p => p.id !== product.id);
      }
    });
  };

  const calculateTotalPrice = () => {
    const totalPrice = parseFloat(
      selectedProducts
        .reduce((total, product) => total + (product.price! * product.quantity!), 0)
        .toFixed(2)
    )
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts])

  const goToPayment = async (selectedProducts: SelectedProducts[], amount: number, userId: number | null | undefined) => {
    if (authenticatedUser === null) return setOpenLogin(true);

    const data = new Order()
    data.amount = amount;
    // @ts-ignore
    data.products = selectedProducts;
    const newOrderDraft = await orderService.createOrder(data, userId!);
    if (newOrderDraft) {
      setOrder(newOrderDraft);
      setShopStep(1);
    }
  }

  const resetAndBackToStore = () => {
    setShopStep(0);
    setSelectedProducts([]);
    setHideSummary(false);
  }

  useEffect(() => {
    getProducts();
  }, []);


  if (isLoading) return <CustomLoading/>
  return (
    <>
      {isMobile
        && !hideSummary
        && <Button
              mt={10}
              ml={"md"}
              radius={"xl"}
              leftSection={selectedProducts.length > 0 ? <IconShoppingCartFilled/> : <IconShoppingCart/>}
              onClick={() => setShowSummary(!showSummary)}
          >
              Mon panier
          </Button>
      }
      <Group gap={0} id={"shopPage"} className={styles.shopPage} wrap={"nowrap"}>
        <div
          className={`${styles.summaryBar} ${showSummary ? styles.visible : ''} ${hideSummary ? styles.hide : ''}`}>
          <Title ta={"center"} className={"titleFont"}>Récapitulatif</Title>
          {isMobile
            && <ActionIcon pos={"absolute"} right={15} variant={"subtle"} color="gray"
                           onClick={() => setShowSummary(!showSummary)}>
                  <IconX style={{width: rem(50), height: rem(50)}}/>
              </ActionIcon>
          }
          <Divider my={15}/>
          <ScrollArea h={"75%"}>
            <Stack>
              {selectedProducts.map((p) => (
                <Group justify={"space-between"} align={"center"} py={"sm"} key={p.id}>
                  <Text>{p.name}...<Text span c={"dimmed"}>x{p.quantity}</Text></Text>
                  <Text fw={700}>{parseFloat((p.price! * p.quantity!).toFixed(2))} €</Text>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
          <Divider/>
          <Stack py={'md'}>
            <Group justify={"space-between"} align={"center"}>
              <Text fz={"1.5rem"} fw={700} className={"titleFont"}>Total : </Text>
              <Text fz={"1.5rem"} fw={700} className={"titleFont"}>{totalPrice} €</Text>
            </Group>
            {shopStep === 0
              ? <Button
                disabled={selectedProducts.length < 1}
                radius={"xl"}
                rightSection={<IconChevronRight/>}
                leftSection={!selectedProducts ? <IconShoppingCart/> : <IconShoppingCartCopy/>}
                onClick={() => goToPayment(selectedProducts as SelectedProducts[], totalPrice, authenticatedUser?.id)}
              >
                Procéder au paiement
              </Button>
              : <Button
                radius={"xl"}
                leftSection={<IconChevronLeft/>}
                onClick={() => {
                  setShopStep(0)
                }}
              >
                Revenir à la boutique
              </Button>
            }
          </Stack>
        </div>

        <Box w={"100%"} h={"100%"} p={"md"}>
          <ScrollArea h={"100%"}>
            <Transition
              mounted={shopStep === 0}
              transition="slide-down"
              duration={400}
              timingFunction="ease"
            >
              {(styles) =>
                <Stack style={styles}>
                  {products.map(product => (
                    <ShopCard
                      product={product}
                      key={product.id}
                      selectedProducts={selectedProducts}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </Stack>
              }
            </Transition>
            <Transition
              mounted={shopStep === 1 && authenticatedUser !== null}
              transition="slide-up"
              duration={400}
              timingFunction="ease"
            >
              {(styles) =>
                <Box style={styles}>
                  <Group justify={"space-between"} align={"flex-start"}>
                    <Stack gap={"xs"}>
                      <Text>Nom : {authenticatedUser?.firstName} {authenticatedUser?.lastName}</Text>
                      <Text>Adresse de facturation :</Text>
                      <Text>Adresse mail : {authenticatedUser?.email}</Text>
                    </Stack>
                    <Text fw={700}>N° de commande : {order?.invoice}</Text>
                  </Group>
                  <Divider my={20}/>
                  <PaymentForm
                    authenticatedUser={authenticatedUser!}
                    orderId={order!.id}
                    setHideSummary={setHideSummary}
                    selectedProducts={selectedProducts}
                    totalPrice={totalPrice}
                  />
                  {hideSummary
                    && <Button
                          m={"auto"}
                          display={"flex"}
                          mt={15}
                          radius={"xl"}
                          leftSection={<IconBuildingStore/>}
                          onClick={resetAndBackToStore}
                      >
                          Revenir à la boutique
                      </Button>
                  }
                </Box>
              }
            </Transition>
          </ScrollArea>
        </Box>
      </Group>
      <Modal
        centered
        opened={openLogin}
        onClose={() => setOpenLogin(false)}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={"sm"}
      >
        <LoginForm
          closeModal={() => setOpenLogin(false)}
          setAuthenticatedUser={setAuthenticatedUser}
          warningMessage={true}
        />
      </Modal>
    </>
  )
}

export default ShopPageContent;