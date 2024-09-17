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
  Stack
} from "@mantine/core";
import styles from "./Home.module.scss"
import { IconAt } from "@tabler/icons-react";

export default function Home() {

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
        <Divider c={"dark"} my={20}/>
      </Container>
    </div>

  );
};