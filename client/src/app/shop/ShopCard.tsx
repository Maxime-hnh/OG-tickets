import {Badge, Group, Image, Paper, Text, Stack, Title, Button, ActionIcon} from "@mantine/core";
import {FetchedProduct, ProductCategory} from "@/_objects/Product";
import {colors} from "@/_helpers/colors";
import dayjs from "dayjs";
import {IconCalendarMonth, IconCirclePlus, IconMapPin, IconPlus, IconTrash} from "@tabler/icons-react";

interface ProductCardProps {
  product: FetchedProduct;
  selectedProduct: FetchedProduct | null;
  addToCart: (product: FetchedProduct) => void;
  removeFromCart: () => void;
}

const ShopCard = ({product, selectedProduct, addToCart, removeFromCart}: ProductCardProps) => {

  const isSelected = selectedProduct && selectedProduct.id === product.id

  return (
    <Paper
      mah={300}
      key={product.id}
      shadow="sm"
      p={"md"}
      radius={"sm"}
      withBorder
      pos={"relative"}
    >
      <Group align={"center"}>
        <Badge pos={"absolute"} color={"gray"} left={5} top={5}>
          <Text size={"xs"}>{dayjs(product.date!).format("DD MMM")}</Text>
        </Badge>
        <Image
          src={product.image}
          alt="Image sportive"
          fit="cover"
          h={100}
        />
        <Stack style={{flex: 1}} justify={"space-between"}>
          <Group justify="flex-start" align={"center"}>
            <Title order={3}>{product.name}</Title>
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
            {product.stage} / {product.description}
          </Text>
          <Stack gap={5}>
            <Group gap={5}>
              <IconCalendarMonth/>
              <Text size={"sm"} fw={"bold"}>
                {`${dayjs(product.date).locale("fr").format("ddd DD/MM/YYYY")} 
           | ${dayjs(product.startTime, "HH:mm:ss").format("HH:mm")} 
           | ${dayjs(product.endTime, "HH:mm:ss").format("HH:mm")}
           `}
              </Text>
            </Group>
            <Group gap={5}>
              <IconMapPin/>
              <Text size={"sm"} fw={"bold"}>
                {`${product.city} | ${product.venue}`}
              </Text>
            </Group>
          </Stack>
        </Stack>
        <Stack align={"flex-end"}>
          <Text
            ta={"center"}
            fw={"bold"}
            c={"green"}
          >
            {product.price} €
          </Text>
            <Button
              disabled={isSelected !== null ? !isSelected : false}
              leftSection={isSelected ? <IconTrash/> : <IconCirclePlus/>}
              color={isSelected ? "red" : "blue"}
              onClick={() => {
                isSelected
                  ? removeFromCart()
                  : addToCart(product)
              }}
              styles={{label: {color: "white"}}}
            >
              {isSelected ? "Supprimer du panier" : "Ajouter"}
            </Button>
        </Stack>
      </Group>
    </Paper>
  )
}

export default ShopCard;