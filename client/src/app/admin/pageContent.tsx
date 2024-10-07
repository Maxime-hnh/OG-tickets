"use client"
import {Button, Group} from "@mantine/core";
import ProductsTable from "@/app/admin/ProductsTable";
import {FetchedProduct} from "@/_objects/Product";
import {useEffect, useState} from "react";
import {productService} from "@/_services/product.service";
import {IconCoins, IconUsers} from "@tabler/icons-react";
import {FetchedOrder} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import OrdersTable from "@/app/admin/OrdersTable";

const AdminPageContent = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [orders, setOrders] = useState<FetchedOrder[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(true);

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
      <Group mb={10}>
        <Button
          variant={showProducts ? "filled" : "outline"}
          leftSection={<IconCoins/>}
          onClick={() => setShowProducts(true)}
        >
          Tableau des ventes
        </Button>

        <Button
          variant={!showProducts ? "filled" : "outline"}
          leftSection={<IconUsers/>}
          onClick={() => setShowProducts(false)}
        >
          Tableau client
        </Button>
      </Group>

      {showProducts
        ? <ProductsTable
          products={products}
          isLoading={isLoading}
        />
        : <OrdersTable
          orders={orders}
          isLoading={isLoading}
        />
      }

    </div>
  )
}
export default AdminPageContent;