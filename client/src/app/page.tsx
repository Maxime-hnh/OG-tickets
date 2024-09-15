"use client"
import {Button, Container, Flex, Image, Overlay, Paper, Text, Title} from "@mantine/core";
import CarouselEvent from "../_components/CarouselEvent";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {TABLET_SIZE} from "@/_helpers/constants";
import "./Home.scss"

export default function Home() {

  const {width} = useWindowSize();
  const isTablet = width <= TABLET_SIZE;

  return (

    <div className={"hero"}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={"container"} size="md">
        <Title className={"title"}>Bienvenue aux Jeux Olympique de Paris 2024</Title>
        <Text ta={"justify"} className={"description"} size="xl" mt="xl">
          Ne manquez pas cette opportunité unique de vivre les Jeux Olympiques dans la ville lumière, où l'histoire et
          la modernité se rencontrent pour créer une expérience olympique inégalée.
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={"control"}>
          Voir les offres
        </Button>
      </Container>
    </div>

    // <Container mx={isTablet ? 0 : 30} maw={"100%"} px={0}>
    //   <Container m={0} p={0} maw={"100%"}>
    //     <Flex direction={"column"}>
    //       <Title order={1}>Bienvenue aux Jeux Olympique de Paris 2024</Title>
    //       <Text c={"gray"} fz={18}>Découvrez les moments forts et les épreuves de cette édition</Text>
    //     </Flex>
    //     <Flex direction={isTablet ? "column" : "row"} mt={10}>
    //       <Image
    //         radius={"xs"}
    //         src={"/home_stadium.png"}
    //         alt={"Stade olympique"}
    //         w={isTablet ? "100%" : 600}
    //         fit={"contain"}
    //         mr={isTablet ? 0 : 10}
    //         mb={isTablet ? 10 : 0}
    //       />
    //       <Flex direction={"column"} justify={"space-between"}>
    //         <Text
    //           ta={"justify"}
    //           c={"#bbc6ce"}
    //           fz={22}
    //           mb={isTablet ? 10 : 0}
    //         >
    //           Des compétitions palpitantes dans des disciplines variées, allant
    //           de l'athlétisme à la natation en passant par la gymnastique, se dérouleront dans des sites emblématiques
    //           de
    //           Paris, offrant aux spectateurs des moments inoubliables. Ne manquez pas cette opportunité unique de vivre
    //           les Jeux Olympiques dans la ville lumière, où l'histoire et la modernité se rencontrent pour créer une
    //           expérience olympique inégalée.
    //         </Text>
    //         <Paper
    //           px={25}
    //           py={40}
    //           bg={"#141e26"}
    //           radius={"xs"}
    //         >
    //           <Title>S'inscrire et participer</Title>
    //           <Text c={"#73828c"}>Réservez dès maintenant vos places pour l'histoire</Text>
    //           <Flex mt={20} justify={"space-evenly"}>
    //             <Button size={"lg"} variant={"outline"} c={"white"}>S'inscrire</Button>
    //             <Button size={"lg"}>Voir les offres</Button>
    //           </Flex>
    //         </Paper>
    //       </Flex>
    //
    //     </Flex>
    //   </Container>
    //   <CarouselEvent/>
    //
    //
    // </Container>

  );
};