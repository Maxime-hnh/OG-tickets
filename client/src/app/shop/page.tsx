"use client"
import {Button, Container, Group, Loader, SimpleGrid} from "@mantine/core";
import {useEffect, useState} from "react";
import {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import ShopCard from "@/app/shop/ShopCard";
import {IconChevronRight, IconShoppingCart, IconShoppingCartCopy} from "@tabler/icons-react";

const ProductsPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<FetchedProduct | null>(null);
  console.log(selectedProduct);

  const getProducts = async () => {
    setIsLoading(true);
    const data = await productService.getProducts();
    if (data) setProducts(data as FetchedProduct[]);
    setIsLoading(false);
  };

  const addToCart = (product: FetchedProduct) => {
    setSelectedProduct(product);
  };

  const removeFromCart = () => {
    setSelectedProduct(null);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <Loader/>
  return (
    <Container>
      <SimpleGrid cols={1}>
        {products.map(product => (
          <ShopCard
            product={product}
            key={product.id}
            selectedProduct={selectedProduct}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </SimpleGrid>
      <Group justify={"flex-end"}>
        <Button
          mt={20}
          radius={"xl"}
          rightSection={<IconChevronRight/>}
          leftSection={!selectedProduct ? <IconShoppingCart/> : <IconShoppingCartCopy/>}
        >
          Procéder au paiement
        </Button>
      </Group>
    </Container>
  )
}

export default ProductsPage;