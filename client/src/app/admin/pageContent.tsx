"use client"
import {Center, rem, SegmentedControl} from "@mantine/core";
import ProductsTable from "@/app/admin/ProductsTable";
import {FetchedProduct} from "@/_objects/Product";
import {useEffect, useState} from "react";
import {productService} from "@/_services/product.service";
import {IconCoins, IconMessage2, IconUsers} from "@tabler/icons-react";
import {FetchedOrder} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import OrdersTable from "@/app/admin/OrdersTable";
import ConstructionMessage from "@/_components/ConstructionMessage";

const AdminPageContent = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [orders, setOrders] = useState<FetchedOrder[]>([]);
  const [segmentValue, setSegmentValue] = useState<string>("productsTable");

  const getProducts = async () => {
    setIsLoading(true);
    const data = await productService.getProducts();
    if (data) {
      setProducts(data)
    }
    setIsLoading(false);
  };

  const getOrders = async () => {
    setIsLoading(true);
    const data = await orderService.getAll();
    if (data) {
      setOrders(data)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  return (
    <div>
      <SegmentedControl
        mb={10}
        size={"md"}
        radius={"md"}
        color={"blue"}
        value={segmentValue}
        onChange={(value) => setSegmentValue(value)}
        data={[
          {
            value: 'productsTable',
            label: (
              <Center style={{gap: 10}}>
                <IconCoins style={{width: rem(16), height: rem(16)}}/>
                <span>Ventes</span>
              </Center>
            ),
          },
          {
            value: 'ordersTable',
            label: (
              <Center style={{gap: 10}}>
                <IconUsers style={{width: rem(16), height: rem(16)}}/>
                <span>Clients</span>
              </Center>
            ),
          },
          {
            value: 'messages',
            label: (
              <Center style={{gap: 10}}>
                <IconMessage2 style={{width: rem(16), height: rem(16)}}/>
                <span>Messages</span>
              </Center>
            ),
          },
        ]}/>

      {segmentValue === "productsTable"
        ? <ProductsTable
          products={products}
          isLoading={isLoading}
        />
        : segmentValue === "ordersTable"
          ? <OrdersTable
            orders={orders}
            isLoading={isLoading}
          />
          : <ConstructionMessage setSegmentValue={setSegmentValue} buttonMessage={"Retour au tableau des ventes"}/>
      }

    </div>
  )
}
export default AdminPageContent;