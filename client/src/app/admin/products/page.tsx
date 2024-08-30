"use client"
import {useEffect, useState} from "react";
import {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import {Button, Container, SimpleGrid, Tabs} from "@mantine/core";
import ProductCard from "@/app/admin/products/ProductCard";
import {IconId, IconTable} from "@tabler/icons-react";

const ProductsPage = () => {

  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    const data = await productService.getProducts();
    if (data) setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();

  }, [])

  if (isLoading) return null;
  return (


    <Container mx={0} miw={"100%"}>

      <Tabs defaultValue="card" mb={20}>
        <Tabs.List>
          <Tabs.Tab value="card" leftSection={<IconId />}>
            Cartes
          </Tabs.Tab>
          <Tabs.Tab value="table" leftSection={<IconTable/>}>
            Tableau
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="card">
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value="table">
          Messages tab content
        </Tabs.Panel>

      </Tabs>
      <SimpleGrid cols={4}>
        {products.length > 0
          && products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </SimpleGrid>
    </Container>
  )
}

export default ProductsPage;
