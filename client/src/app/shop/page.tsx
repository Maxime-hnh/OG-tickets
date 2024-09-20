"use client"
import {Box, Button, Divider, Group, ScrollArea, Stack, Text, Title, Transition} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import ShopCard from "@/app/shop/components/ShopCard";
import {IconCheck, IconChevronRight, IconShoppingCart, IconShoppingCartCopy} from "@tabler/icons-react";
import CustomLoading from "@/_components/CustomLoading";
import styles from './styles/ShopPage.module.scss';
import {AuthenticatedUser, AuthenticationRequest, authenticationService} from "@/_services/authentication.service";
import Order, {FetchedOrder, SelectedProducts} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import LoginForm from "@/_components/LoginForm";
import {notifications} from "@mantine/notifications";
import PaymentForm from "@/_components/PaymentForm";

const ShopPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<FetchedProduct[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(authenticationService.currentUserValue);
  const [order, setOrder] = useState<FetchedOrder | null>(null);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
    if (newOrderDraft) setOrder(newOrderDraft)
  }

  const handleSubmitLoginForm = async (values: AuthenticationRequest) => {
    const loggedUser = await authenticationService.login(values)
    if (loggedUser) {
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

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <CustomLoading/>
  return (
    <>
      <Group gap={0} id={"shopPage"} className={styles.shopPage} wrap={"nowrap"}>
        <div className={styles.navbar}>
          <Title ta={"center"} className={"titleFont"}>Récapitulatif</Title>
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
            <Button
              radius={"xl"}
              rightSection={<IconChevronRight/>}
              leftSection={!selectedProducts ? <IconShoppingCart/> : <IconShoppingCartCopy/>}
              onClick={() => goToPayment(selectedProducts as SelectedProducts[], totalPrice, authenticatedUser?.id)}
            >
              Procéder au paiement
            </Button>
          </Stack>
        </div>

        <Box w={"100%"} h={"100%"} p={"md"}>
          <ScrollArea h={"100%"}>
            <Transition
              mounted={order === null}
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
              mounted={order !== null && authenticatedUser !== null}
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
      />
    </>
  )
}

export default ShopPage;