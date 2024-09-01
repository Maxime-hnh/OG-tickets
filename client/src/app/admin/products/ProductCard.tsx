import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {FetchedProduct, ProductCategory} from "@/_objects/Product";
import {colors} from "@/_helpers/colors";

interface ProductCardProps {
  product: FetchedProduct;
  editProduct: (product:FetchedProduct) => void;
  deleteProduct: (productId:number) => void;

}

const ProductCard = ({product, editProduct, deleteProduct}: ProductCardProps) => {
  return (
    <Card
      key={product.id}
      padding="lg"
      shadow="sm"
      withBorder
    >
      <Card.Section>
        <Image
          src={"/pictograms/Judo.avif"}
          alt="Image sportive"
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
        <Badge
          color={
          ProductCategory.SOLO
            ? colors.og_yellow_2
            : ProductCategory.DUO
            ? colors.og_green
            : colors.og_blue
        }
          styles={{label: {color: "#fff"}}}
        >
          {product.category}
        </Badge>
      </Group>
      <Text size="sm" c="dimmed">
        {product.description}
      </Text>
      <Text
        ta={"center"}
        fw={"bold"}
        c={"green"}
      >
        {product.price} €
      </Text>

      <Group>
        <Button
          color="red" mt="md" radius="sm"
          variant={"outline"}
          style={{flex: 1}}
          onClick={() => deleteProduct(product.id)}
        >
          <IconTrash/>
        </Button>

        <Button
          color="blue"
          mt="md"
          radius="sm"
          variant={"outline"}
          style={{flex: 1}}
          onClick={() => editProduct(product)}
        >
          <IconEdit/>
        </Button>
      </Group>
    </Card>
  )
}

export default ProductCard;