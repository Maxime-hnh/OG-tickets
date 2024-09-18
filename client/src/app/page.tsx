"use client"
import {
  AspectRatio,
  Button,
  Card,
  Container,
  Divider,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  Image,
  TextInput,
  Paper,
  Box,
  Stack,
  Group, rem,
  Flex
} from "@mantine/core";
import styles from "./Home.module.scss"
import {IconAt} from "@tabler/icons-react";
import {Carousel} from '@mantine/carousel';
import {colors} from "@/_helpers/colors";
import useWindowSize from "@/_components/Utils/useWindowSize";

export default function Home() {

  const {width} = useWindowSize();

  const articleCardData = [
    {
      title: "Le nageur français obtient sa 4ème médaille d'or",
      image: "./articleCard_swim.webp",
      date: "02 août 2024"
    },
    {
      title: "La gymnaste américaine brille encore",
      image: "./articleCard_gym.webp",
      date: "04 août 2024"
    },
    {
      title: "Les frères obtiennent la bronze au tennis de table",
      image: "./articleCard_tableTennis.webp",
      date: "04 août 2024"
    },
  ]

  const carouselData = [
    {
      title: "Judo",
      color: colors.og_red_2,
      image: "./intro_judo.webp",
      date: "08/08/20204",
      description: "  L'épreuve de natation des Jeux Olympiques est un spectacle de vitesse, de force et de grâce, attirant\n" +
        "                des\n" +
        "                nageurs du monde entier pour concourir dans ce qui est souvent considéré comme le joyau de la couronne\n" +
        "                des\n" +
        "                Jeux. Les compétiteurs s'affrontent dans une variété de styles, incluant le crawl, le dos, la brasse, et\n" +
        "                le\n" +
        "                papillon, offrant un véritable festin visuel de technique et d'endurance."
    },
    {
      title: "Natation",
      color: colors.og_blue,
      image: "./intro_swim.webp",
      date: "07/08/20204",
      description: "  L'épreuve de natation des Jeux Olympiques est un spectacle de vitesse, de force et de grâce, attirant\n" +
        "                des\n" +
        "                nageurs du monde entier pour concourir dans ce qui est souvent considéré comme le joyau de la couronne\n" +
        "                des\n" +
        "                Jeux. Les compétiteurs s'affrontent dans une variété de styles, incluant le crawl, le dos, la brasse, et\n" +
        "                le\n" +
        "                papillon, offrant un véritable festin visuel de technique et d'endurance."
    },
    {
      title: "BMX",
      color: colors.og_green_3,
      image: "./intro_bmx.webp",
      date: "10/08/20204",
      description: "  L'épreuve de natation des Jeux Olympiques est un spectacle de vitesse, de force et de grâce, attirant\n" +
        "                des\n" +
        "                nageurs du monde entier pour concourir dans ce qui est souvent considéré comme le joyau de la couronne\n" +
        "                des\n" +
        "                Jeux. Les compétiteurs s'affrontent dans une variété de styles, incluant le crawl, le dos, la brasse, et\n" +
        "                le\n" +
        "                papillon, offrant un véritable festin visuel de technique et d'endurance."
    },
  ]

  return (
    <div id={"home"}>

      <div className={styles.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={styles.hero_container} size="md">
          <Title className={styles.hero_title}>Bienvenue aux Jeux Olympique de Paris 2024</Title>
          <Text ta={"justify"} className={styles.hero_description} size="xl" mt="xl">
            Ne manquez pas cette opportunité unique de vivre les Jeux Olympiques dans la ville lumière, où l'histoire et
            la modernité se rencontrent pour créer une expérience olympique inégalée.
          </Text>

          <Button variant="gradient" size="xl" radius="xl" className={styles.hero_button}>
            Voir les offres
          </Button>
        </Container>
      </div>


      <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}} m={0} miw={"100%"} w={'100%'}>
        <Title fz={40} className={"titleFont"}>Actualité de Paris 2024</Title>
        <Divider c={"dark"} my={20}/>
        <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>

          {articleCardData.map(article => (
            <Card key={article.title} p="md" radius="md" component="a" href="#" className={styles.article_card}>
              <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} radius={"sm"}/>
              </AspectRatio>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                {article.date}
              </Text>
              <Text fw={700} className={styles.article_title} mt={5}>
                {article.title}
              </Text>
            </Card>
          ))}

        </SimpleGrid>
      </Container>

      <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}} m={0} miw={"100%"} w={'100%'}>
        <Paper radius={"md"} className={styles.lottery_wrapper}>
          <Box p={"xl"} className={styles.lottery_body}>
            <Stack h={"100%"} justify={"space-evenly"}>
              <div>

                <Title mb={10} fz={45} className={"titleFont"}>Tentez votre chance ! 🎁</Title>
                <Text fw={500} fz="xl" mb={10}>
                  Remportez une place pour la finale de judo.
                </Text>
                <Text fz="sm" c="white">
                  Renseignez votre adresse mail et participez à la lotterie qui aura lieu le mardi 06 août 2024.
                </Text>
              </div>

              <div className={styles.lottery_controls}>
                <TextInput
                  leftSection={<IconAt/>}
                  placeholder="Votre adresse mail"
                  classNames={{input: styles.lottery_input, root: styles.lottery_inputWrapper}}
                />
                <Button className={styles.lottery_button}>Participer</Button>
              </div>
            </Stack>
          </Box>
          <Box className={styles.lottery_container_image}>
            <Image src={"./olympics_fan.webp"} className={styles.lottery_image}/>
          </Box>
        </Paper>
      </Container>

      <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}} m={0} miw={"100%"} w={'100%'}>
        <Title fz={40} className={"titleFont"}>Épreuves de Paris 2024</Title>
        <Divider c={"dark"} mt={20} mb={30}/>
        <Carousel
          slideSize={{base: '100%', sm: '100%'}}
          slideGap={{base: rem(2), sm: 'xl'}}
          align="start"
          slidesToScroll={1}
          classNames={styles}
        >
          {carouselData.map((item) => (
            <Carousel.Slide key={item.title}>
              <Paper w={{base: "100%", md: "85%", xl: "70%"}} m={"auto"}>
                <Flex wrap={"nowrap"} direction={{base: "column", md: "row"}} gap={"sm"} align={"center"}>
                  <AspectRatio ratio={width < 992 ? 1920 / 1080 : 3 / 4} className={styles.intro_img_container}>
                    <Image w={400} src={item.image} radius={"sm"} className={styles.intro_img}/>
                  </AspectRatio>
                  <Paper h={{base: "100%", md: "50%"}} shadow={"md"} p={"xl"} className={styles.intro_text_container}>
                    <Stack align={"flex-start"}>
                      <Stack gap={0}>
                        <Title fz={40} className={"titleFont"} c={item.color}>{item.title}</Title>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                          {`Date de la finale : ${item.date}`}
                        </Text>
                      </Stack>
                      <Text ta={"justify"}>
                        {item.description}
                      </Text>
                    </Stack>
                  </Paper>
                </Flex>
              </Paper>
            </Carousel.Slide>
          ))}

        </Carousel>

      </Container>

    </div>

  );
};