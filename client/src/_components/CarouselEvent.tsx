"use client"
import {Container, Flex, Image, Paper, Text, Title} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {colors} from "@/_helpers/colors";
import {useContext} from "react";
import AppContext from "@/app/Context/AppContext";

const CarouselEvent = () => {

  const {isMobile} = useContext(AppContext);

  const carouselContent = [
    {
      title: "Athlétisme",
      img: "/carousel_running_ls.png",
      content: "Réunissant les meilleurs coureurs,vsauteurs et lanceurs du monde, les compétitions d'athlétisme sont " +
        "un véritable test de vitesse, de force et d'endurance, mettant en lumière les capacités exceptionnelles des " +
        "athlètes.vQue ce soit le 100 mètres, le saut en longueur ou le lancer de javelot, chaque épreuve offre des " +
        "moments de suspense et d'excitation, captivant les spectateurs du monde entier.",
      color: colors.og_yellow_2
    },
    {
      title: "Gymnastique",
      img: "/carousel_gym_ls.png",
      content: "La gymnastique aux Jeux olympiques de Paris 2024 est synonyme de grâce, de puissance et de maîtrise " +
        "technique, incarnée par l'incroyable Simone Biles. Sa présence aux Jeux est un moment fort, offrant un " +
        "spectacle de talent et de détermination. Les mouvements précis et élégants de la gymnastique artistique " +
        "captivent les spectateurs, rendant chaque routine mémorable et inspirante.",
      color: colors.og_red_2
    },
    {
      title: "Natation",
      img: "/carousel_swimming_ls.png",
      content: "La natation est l'une des disciplines les plus captivantes des Jeux olympiques de Paris 2024. " +
        "Chaque course est une démonstration de force, d'endurance et de technique, où les nageurs doivent non " +
        "seulement rivaliser avec leurs adversaires, mais aussi surmonter les défis de l'eau. Les épreuves de natation " +
        "offrent un spectacle palpitant et sont attendues avec impatience par les spectateurs du monde entier.",
      color: colors.og_green_2
    },
  ];

  return (
    <Container m={0} p={0} maw={"100%"} mt={30}>

      <Carousel
        orientation={"horizontal"}
        withIndicators
        withControls={false}
        loop
        slideGap="xs"
        align="center"
        slideSize="50%"
      >
        {carouselContent.map((item, index) => (
          <Carousel.Slide key={index}>
            <Flex direction={"column"} justify={"center"} align={"flex-start"} w={600}>
              <Title>{item.title}</Title>
              <Image
                radius={"xs"}
                src={item.img}
                alt={"Stade olympique"}
                w={"100%"}
                fit={"contain"}
                mr={10}
              />
              <Paper
                py={"1rem"}
                px={"1.5rem"}
                bg={item.color}
                radius={"0 0 0.125rem 0.125rem"}
              >
                <Text ta={"justify"} fz={18} mt={5}>
                  {item.content}
                </Text>
              </Paper>
            </Flex>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  )
};
export default CarouselEvent;