"use client"
import {ActionIcon, Box, Button, Divider, Group, rem, ScrollArea, Stack, Text, Title, Transition} from "@mantine/core";
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import ShopCard from "@/app/shop/components/ShopCard";
import {
  IconCheck, IconChevronLeft,
  IconChevronRight,
  IconForbid,
  IconShoppingCart,
  IconShoppingCartCopy, IconShoppingCartFilled,
  IconX
} from "@tabler/icons-react";
import CustomLoading from "@/_components/CustomLoading";
import styles from './styles/ShopPage.module.scss';
import {AuthenticatedUser, AuthenticationRequest, authenticationService} from "@/_services/authentication.service";
import Order, {FetchedOrder, SelectedProducts} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import LoginForm from "@/_components/LoginForm";
import {notifications} from "@mantine/notifications";
import PaymentForm from "@/_components/PaymentForm";
import {FetchedUser} from "@/_objects/User";
import AppContext from "@/app/Context/AppContext";

const ShopPageContent = () => {

  const {isMobile} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<FetchedProduct[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(authenticationService.loggedUserValue);
  const [order, setOrder] = useState<FetchedOrder | null>(null);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSummary, setShowSummary] = useState(false);
  const [shopStep, setShopStep] = useState<number>(0);

  const [loginStep, setLoginStep] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<Partial<FetchedUser> | null>(null);

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
    calculateTotalPrice()
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

  const handleSubmitLoginForm = async (values: AuthenticationRequest, setLoader: Dispatch<SetStateAction<boolean>>) => {
    try {
      if (loginStep === 0) {
        setLoader(true);
        const userShortData = await authenticationService.login(loginStep, values)
        if (userShortData) {
          setUserInfo(userShortData)
          setLoginStep(1)
          setLoader(false)
        }
      }
      if (loginStep === 1) {
        setLoader(true)
        let data = {
          userId: userInfo!.id,
          twoFactorCode: values.twoFactorCode
        }
        const loggedUser = await authenticationService.login(loginStep, data)
        if (loggedUser) {
          setLoader(false)
          setAuthenticatedUser(loggedUser)
          setOpenLogin(false);
          notifications.show({
            icon: <IconCheck/>,
            color: "green",
            position: "top-right",
            title: "Connexion réussie !",
            message: `Bonjour ${loggedUser.firstName} ${loggedUser.lastName}, vous pouvez à présent procéder au paiement`
          })
        }
      }
    } catch (e) {
      setLoader(false)
      notifications.show({
        icon: <IconForbid/>,
        color: "red",
        position: "bottom-center",
        title: "Erreur de connexion",
        message: `Une erreur est survenue ${e}`
      })
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <CustomLoading/>
  return (
    <>
      {isMobile
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
        <div className={`${styles.summaryBar} ${showSummary ? styles.visible : ''}`}>
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
                onClick={() => setShopStep(0)}
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
                    selectedProducts={selectedProducts}
                    totalPrice={totalPrice}
                  />
                </Box>
              }
            </Transition>
          </ScrollArea>
        </Box>
      </Group>
      <LoginForm
        opened={openLogin}
        onClose={() => setOpenLogin(false)}
        onSubmit={handleSubmitLoginForm}
        warningMessage={"Vous devez être authentifié avant d'aller plus loin"}
        loginStep={loginStep}
      />
    </>
  )
}

export default ShopPageContent;