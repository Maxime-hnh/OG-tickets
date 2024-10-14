import {Badge, Group, Image, Paper, Text, Stack, Title, Flex, ActionIcon} from "@mantine/core";
import {FetchedProduct, ProductCategory} from "@/_objects/Product";
import {colors} from "@/_helpers/colors";
import dayjs from "dayjs";
import {IconCalendarMonth, IconMapPin, IconMinus, IconPlus} from "@tabler/icons-react";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {useState} from "react";

interface ProductCardProps {
  product: FetchedProduct;
  selectedProducts: FetchedProduct[];
  addToCart: (product: FetchedProduct, quantity: number) => void;
  removeFromCart: (product: FetchedProduct) => void;
}

const ShopCard = ({product, selectedProducts, addToCart, removeFromCart}: ProductCardProps) => {

  const productInCart = selectedProducts.find(p => p.id === product.id);
  const [quantity, setQuantity] = useState<number>(productInCart && productInCart.quantity ? productInCart.quantity : 0);
  const {width} = useWindowSize();

  const handleAdd = () => {
    if (quantity === 0) {
      setQuantity(1);
      addToCart(product, 1);
    } else {
      setQuantity(quantity + 1);
      addToCart(product, 1);
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeFromCart(product);
    } else {
      setQuantity(0);
      removeFromCart(product);
    }
  };

  const quantityChoice = <Paper shadow={"none"} radius="sm" withBorder>
    <Group gap={"xs"}>
      <ActionIcon
        radius={0}
        variant="transparent"
        onClick={handleRemove}
        style={{borderRight: '1px solid #dee2e6'}}
      >
        <IconMinus size={20} color="#34AE86"/>
      </ActionIcon>
      <Text>{quantity}</Text>
      <ActionIcon
        radius={0}
        variant="transparent"
        onClick={handleAdd}
        style={{borderLeft: '1px solid #dee2e6'}}
      >
        <IconPlus size={20} color="#34AE86"/>
      </ActionIcon>
    </Group>
  </Paper>

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
      <Flex align={{base: "flex-start", xs: "center"}} direction={{base: "column", xs: "row"}}>
        <Badge pos={"absolute"} color={"gray"} left={5} top={5}>
          <Text size={"xs"}>{dayjs(product.date!).format("DD MMM")}</Text>
        </Badge>
        {width >= 835
          && <Image
                src={product.image}
                alt="Image sportive"
                fit="cover"
                h={{sm: 80, md : 100}}
            />
        }
        <Stack style={{flex: 1}} justify={"space-between"} mt={width < 835 ? 15 : 0}>
          <Group justify="flex-start" align={"center"} mt={width < 610 ? 10 : 0}>
            <Title order={3}>{product.name}</Title>
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

          <Text size="sm" c="dimmed">
            {product.stage} / {product.description}
          </Text>
          <Stack gap={5}>
            <Group gap={5}>
              {width > 324 && <IconCalendarMonth/>}
              <Text size={"sm"} fw={"bold"}>
                {`${dayjs(product.date).locale("fr").format("ddd DD/MM/YYYY")} 
           | ${dayjs(product.startTime, "HH:mm:ss").format("HH:mm")} 
           | ${dayjs(product.endTime, "HH:mm:ss").format("HH:mm")}
           `}
              </Text>
            </Group>
            <Group gap={5}>
              {width > 324 && <IconMapPin/> }
              <Text size={"sm"} fw={"bold"}>
                {`${product.city} | ${product.venue}`}
              </Text>
            </Group>
          </Stack>
        </Stack>
        <Flex
          gap={5}
          direction={width > 363 ? "column" : "row"}
          justify={width > 363 ? "initial" : "space-between"}
          mt={width > 363 ? 0 : 10}
          align={"flex-end"}
          w={width < 576 ? "100%" : ""}
        >
          <Text
            ta={"center"}
            fw={"bold"}
            c={"green"}
          >
            {product.price} €
          </Text>
          {quantityChoice}
        </Flex>
      </Flex>
    </Paper>
  )
}

export default ShopCard;