"use client"
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Product, {FetchedProduct} from "@/_objects/Product";
import {productService} from "@/_services/product.service";
import {Button, Container, SimpleGrid} from "@mantine/core";
import ProductCard from "@/app/admin/products/components/ProductCard";
import CustomDrawer from "@/_components/CustomDrawer";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconPencilPlus} from "@tabler/icons-react";
import ProductForm from "@/app/admin/products/components/ProductForm";
import CustomLoading from "@/_components/CustomLoading";

const ProductsPageContent = () => {

  const formRef = useRef<any>();
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FetchedProduct | Product | undefined>(undefined);


  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      if (data) setProducts(data as FetchedProduct[]);
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  };

  const quitForm = () => {
    setFormValues(undefined)
  };
  const submitForm = async () => {
    if (formRef.current) await formRef.current.submitForm()
  };
  const handleSubmitForm = async (values: FetchedProduct | Product, setLoader: Dispatch<SetStateAction<boolean>>) => {
    setLoader(true)
    try {
      values.edit === true
        ? await productService.updateById((values as FetchedProduct).id, values)
        : await productService.addProduct(values)
      await getProducts();
      quitForm();
      notifications.show({
        icon: <IconCheck/>,
        color: "green",
        position: "top-right",
        title: values.edit === true ? "Modification" : "Création",
        message: values.edit === true
          ? "Le produit a été mise à jour"
          : "Le produit a été créé avec succès"
      })

    } catch (e) {
      console.error(e)
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [])

  const editProduct = (product: FetchedProduct) => {
    setFormValues({edit: true, ...product})
  };

  const deleteProduct = async (productId: number) => {
    try {
      await productService.deleteById(productId)
      notifications.show({
        icon: <IconCheck/>,
        color: "green",
        position: "top-right",
        title: "Suppression",
        message: "Le produit a été supprimé"
      })
      await getProducts()
    } catch (e) {
      notifications.show({
        icon: <IconCheck/>,
        color: "red",
        position: "top-right",
        title: "Erreur",
        message: "error"
      })
    }
  }

  if (isLoading) return <CustomLoading/>;
  return (
    <>
      <Container mx={0} miw={"100%"}>
        <Button mb={10} leftSection={<IconPencilPlus/>} onClick={() => setFormValues(new Product())}>Ajouter</Button>

        <SimpleGrid cols={{base: 1, xs: 2, md: 3, lg: 4}}>
          {products.length > 0
            && products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
              />
            ))}
        </SimpleGrid>
      </Container>
      <CustomDrawer
        opened={formValues !== undefined}
        withHeader={true}
        onRequestClose={quitForm}
        submitForm={submitForm}
        content={
          <ProductForm
            ref={formRef}
            formValues={formValues}
            handleSubmitForm={handleSubmitForm}
          />
        }
      />
    </>

  )
}

export default ProductsPageContent;