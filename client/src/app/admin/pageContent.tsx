"use client"
import {Button, Group} from "@mantine/core";
import ProductsTable from "@/app/admin/ProductsTable";
import {FetchedProduct} from "@/_objects/Product";
import {useEffect, useState} from "react";
import {productService} from "@/_services/product.service";
import {IconCoins, IconUsers} from "@tabler/icons-react";

const AdminPageContent = () => {

  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    const data = await productService.getProducts();
    if (data) {
      setProducts(data as FetchedProduct[])
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div>
      <Group>
        <Button
          leftSection={<IconCoins/>}
        >Tableau des ventes</Button>
        <Button
          variant="light"
          leftSection={<IconUsers/>}
        >Tableau client</Button>
      </Group>
      <ProductsTable
        products={products}
        isLoading={isLoading}
      />
    </div>
  )
}
export default AdminPageContent;