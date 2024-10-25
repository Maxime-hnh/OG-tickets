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
  rem,
  Flex
} from "@mantine/core";
import styles from "./Home.module.scss"
import {IconAt, IconCheck, IconChevronLeft, IconChevronRight, IconForbid} from "@tabler/icons-react";
import {Carousel} from '@mantine/carousel';
import {colors} from "@/_helpers/colors";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {notifications} from "@mantine/notifications";
import React, {useState} from "react";
import styled from 'styled-components';
import Link from "next/link";

const StyledCarousel = styled(Carousel)`
    .mantine-Carousel-indicator {
        z-index: 99;
        width: 12px;
        height: 4px;
        transition: width 250ms ease;
        background: #34ae86;

        &[data-active] {
            width: 40px;
            background: #34ae86;
        }
    }

    .mantine-Carousel-control {
        opacity: 1;
        background-color: #fff;
        border: none;
        box-shadow: unset;

        &[data-inactive] {
            opacity: 0;
            cursor: default;
        }
    }
`;

const HomePageContent = () => {

    const {width} = useWindowSize();
    const [emailInput, setEmailInput] = useState<string>("");

    const raffleNotification = () => {
      if (emailInput.length < 7) {
        return (
          notifications.show({
            icon: <IconForbid/>,
            color: "red",
            position: "bottom-center",
            title: "Adresse mail non valide",
            message: "Il semblerait que votre adresse mail ne soit pas valide."
          })
        )
      } else {
        notifications.show({
          icon: <IconCheck/>,
          color: "green",
          position: "bottom-center",
          title: "Participation prise en compte",
          message: "Le tirage au sort aura lieu le 02 novembre 2024, pensez à vérifier votre boîte mail !"
        })
      }
    }

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
        style: {objectPosition: width < 991 ? "50% 66%" : ""},
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
        style: {objectPosition: width < 991 ? "50% 0%" : ""},
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
        style: {objectPosition: width < 991 ? "50% 38%" : ""},
        description: "  L'épreuve de natation des Jeux Olympiques est un spectacle de vitesse, de force et de grâce, attirant\n" +
          "                des\n" +
          "                nageurs du monde entier pour concourir dans ce qui est souvent considéré comme le joyau de la couronne\n" +
          "                des\n" +
          "                Jeux. Les compétiteurs s'affrontent dans une variété de styles, incluant le crawl, le dos, la brasse, et\n" +
          "                le\n" +
          "                papillon, offrant un véritable festin visuel de technique et d'endurance."
      },
    ];


    return (
      <div id={"home"}>

        <div className={styles.hero}>
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
            opacity={1}
            zIndex={0}
          />
          <Container className={styles.hero_container} size="md">
            <Title className={styles.hero_title}>Bienvenue aux Jeux Olympiques de Paris 2024</Title>
            <Text ta={"justify"} className={styles.hero_description} size="xl" mt="xl">
              Ne manquez pas cette opportunité unique de vivre les Jeux Olympiques dans la ville lumière, où
              l&apos;histoire et
              la modernité se rencontrent pour créer une expérience olympique inégalée.
            </Text>

            <Button variant="gradient" size="xl" radius="xl" className={styles.hero_button}>
              <Link href={"/shop"}>Voir les offres</Link>
            </Button>
          </Container>
        </div>


        <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}} m={0} miw={"100%"} w={'100%'}>
          <Title fz={40} className={"titleFont"}>Actualité de Paris 2024</Title>
          <Divider c={"dark"} my={20}/>
          <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>

            {articleCardData.map((article, index) => (
              <Card key={article.title} p="md" radius="md" component="a" className={styles.article_card}>
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={article.image} radius={"sm"} alt={`représentation de l'article ${index}`}/>
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

        <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}}>
          <Paper radius={"md"} className={styles.lottery_wrapper}>
            <Box p={{base: "lg", md: "xl"}} className={styles.lottery_body}>
              <Stack h={"100%"} justify={"space-evenly"}>
                <div>
                  <Title mb={10} fz={{base: 30, sm: 45}} className={"titleFont"}>Tentez votre chance !
                    🎁</Title>
                  <Text fw={500} fz={{base: "md", sm: "xl"}} mb={{base: 5, sm: 10}}>
                    Remportez une place pour la finale de judo.
                  </Text>
                  <Text fz="sm" c="white" ta={"justify"}>
                    Renseignez votre adresse mail et participez à la loterie qui aura lieu le mardi 06 août 2024.
                  </Text>
                </div>

                <div className={styles.lottery_controls}>
                  <TextInput
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    leftSection={<IconAt/>}
                    placeholder="Votre adresse mail"
                    classNames={{input: styles.lottery_input, root: styles.lottery_inputWrapper}}
                  />
                  <Button onClick={raffleNotification} className={styles.lottery_button}>Participer</Button>
                </div>
              </Stack>
            </Box>
            <Box className={styles.lottery_container_image}>
              <Image src={"./olympics_fan.webp"} className={styles.lottery_image} alt={"supporters olympiques"}/>
            </Box>
          </Paper>
        </Container>

        <Container py={"xl"} px={{base: 10, sm: 40, xl: 75}} m={0} miw={"100%"} w={'100%'}>
          <Title fz={40} className={"titleFont"}>Épreuves de Paris 2024</Title>
          <Divider c={"dark"} mt={20} mb={30}/>
          <StyledCarousel
            slideSize={"100%"}
            slideGap={{base: rem(2), sm: 'xl'}}
            align="start"
            slidesToScroll={1}
            classNames={styles}
            withIndicators={width < 991}
            withControls={width > 991}
            previousControlIcon={
              <IconChevronLeft
                style={{width: rem(30), height: rem(30)}}
                color="#222"
              />
            }
            nextControlIcon={
              <IconChevronRight
                style={{width: rem(30), height: rem(30)}}
                color="#222"
              />
            }
          >
            {carouselData.map((item) => (
              <Carousel.Slide key={item.title} w={"100%"}>
                <Paper w={{base: "100%", md: "85%", xl: "70%"}} m={"auto"}>
                  <Flex wrap={"nowrap"} direction={{base: "column", md: "row"}} gap={"sm"} align={"center"}>
                    <AspectRatio ratio={width < 992 ? 1920 / 1080 : 3 / 4} className={styles.intro_img_container}>
                      <Image w={400} src={item.image} radius={"sm"} className={styles.intro_img} style={item.style} alt={item.title}/>
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

          </StyledCarousel>

        </Container>

      </div>

    );
  }
;

export default HomePageContent;