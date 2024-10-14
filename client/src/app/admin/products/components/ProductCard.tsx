import {Badge, Button, Card, Divider, Group, Image, Text} from "@mantine/core";
import {IconBuildingStadium, IconEdit, IconMapPin, IconTrash} from "@tabler/icons-react";
import {FetchedProduct, ProductCategory} from "@/_objects/Product";
import {colors} from "@/_helpers/colors";
import {useContext} from "react";
import AdminContext from "@/app/Context/AdminContext";
import {AuthRole} from "@/_services/authentication.service";
import dayjs from "dayjs";

interface ProductCardProps {
  product: FetchedProduct;
  editProduct: (product: FetchedProduct) => void;
  deleteProduct: (productId: number) => void;

}

const ProductCard = ({product, editProduct, deleteProduct}: ProductCardProps) => {

  const {authenticatedAdmin} = useContext(AdminContext);
  const isAdmin = authenticatedAdmin?.role === AuthRole.ADMIN;

  return (
    <Card
      key={product.id}
      padding="lg"
      shadow="sm"
      withBorder
    >
      <Card.Section>
        <Badge pos={"absolute"} color={"gray"} left={5} top={5}>
          <Text size={"xs"}>{dayjs(product.date!).format("DD MMM")}</Text>
        </Badge>
        <Image
          src={product.image}
          alt="Image sportive"
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="md">
        <Text fw={"bold"} style={{flex: 1}}>{product.name}</Text>
        <Badge
          color={
            product.category === ProductCategory.SOLO
              ? colors.og_yellow_2
              : product.category === ProductCategory.DUO
                ? colors.og_green
                : colors.og_blue
          }
          styles={{label: {color: "#fff"}}}
        >
          {product.category}
        </Badge>

      </Group>
      <Group justify={"space-between"}>
        <Group gap={2}>
          <IconMapPin color={"#868e96"}/>
          <Text size="sm" c="dimmed">
            {product.city}
          </Text>
        </Group>
        <Group gap={2}>
          <IconBuildingStadium color={"#868e96"}/>
          <Text size="sm" c="dimmed">
            {product.venue}
          </Text>
        </Group>
      </Group>
      <Divider my={15}/>
      <Text
        ta={"center"}
        fw={"bold"}
        c={"green"}
        fz={"xl"}
      >
        {product.price} €
      </Text>

      {isAdmin
        && <Group>
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
              <Button
                  color="red" mt="md" radius="sm"
                  variant={"outline"}
                  style={{flex: 1}}
                  onClick={() => deleteProduct(product.id)}
              >
                  <IconTrash/>
              </Button>
          </Group>
      }
    </Card>
  )
}

export default ProductCard;