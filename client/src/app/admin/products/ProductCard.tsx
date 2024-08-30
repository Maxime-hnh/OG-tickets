import {Badge, Button, Card, Flex, Group, Image, Text} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {FetchedProduct} from "@/_objects/Product";

interface ProductCardProps {
  product: FetchedProduct;
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <Card
      key={product.id}
      padding="lg"
      shadow="sm"
      withBorder
    >
      <Card.Section>
        <Image
          src={"/Judo.avif"}
          alt="Image sportive"
          fit="cover"
        />
    </Card.Section>

  <Group justify="space-between" mt="md" mb="xs">
    <Text fw={500}>{product.name}</Text>
    <Badge color="pink">Tags</Badge>
  </Group>
  <Text size="sm" c="dimmed">
    {product.description}
  </Text>

  <Flex align={"center"} justify={"space-between"}>

    <Button
      color="red" mt="md" radius="sm"
      // onClick={() => deleteRecipe(recipe)}
    >
      <IconTrash/>
    </Button>

    <Button
      color="blue"
      mt="md"
      radius="sm"
      // onClick={() => editRecipe(recipe)}
    >
      <IconEdit/>
    </Button>
  </Flex>
</Card>
)
}

export default ProductCard;