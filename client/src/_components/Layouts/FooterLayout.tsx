import {ActionIcon, Box, Container, Flex, Group, Image, rem, Stack, Text, Title} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconPointFilled
} from "@tabler/icons-react";
import "./FooterLayout.scss"
import React from "react";

const FooterLayout = () => {

  const data = [
    {
      title: 'Jeux Olympiques',
      links: [
        {label: 'Calendrier & Résultats', link: '#'},
        {label: 'Tableau des médailles', link: '#'},
        {label: 'Sports', link: '#'},
        {label: 'Sites', link: '#'},
      ],
    },
    {
      title: 'Célébrer les Jeux',
      links: [
        {label: 'Célébrer les Jeux', link: '#'},
        {label: 'Parc des Champions', link: '#'},
      ],
    },
    {
      title: 'Spectateurs',
      links: [
        {label: 'Info spectateurs', link: '#'},
        {label: 'Billetterie', link: '#'},
        {label: 'La boutique des Jeux', link: '#'},
        {label: 'Une question ?', link: '#'},
      ],
    },
  ];

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        c="dimmed"
        fz={"sm"}
        display={"block"}
        py={"3px"}
        key={index}
        className={"footer_link"}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <Box w={170} key={group.title}>
        <Text fw={700} fz={"lg"} c={"white"} mb={10} className={"title"}>{group.title}</Text>
        {links}
      </Box>
    );
  });


  return (
    <footer id={"footerLayout"}>
      <Container className={"inner"}>
        <Box className={"logo"} maw={200}>
          <Image
            radius={'xs'}
            w={"48px"}
            src="/my_logo_signature_222.png"
            alt="logo"
          />
          <Text
            mt={{base: "xs", sm: "sm"}}
            size="xs"
            c="dimmed"
            className={"description"}
          >
            Powered by Maxime Huynh
          </Text>
        </Box>
        <Flex wrap={"wrap"} className={"groups"}>{groups}</Flex>
      </Container>
      <Container className={"afterFooter"} mt={"xl"} py={"xl"}>
        <Stack w={"100%"}>
          <Group justify={"space-between"}>

            <Text c="dimmed" size="sm">
              © 2024 Tous droits réservés.
            </Text>
            <Group gap={0} className={"social"} justify="flex-end" wrap="nowrap">
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandGithub style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTwitter style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandInstagram style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
              </ActionIcon>

            </Group>
          </Group>
          <Group justify={"center"}>
            <Text
              c="dimmed"
              size="sm"
              className={"footer_link"}
              component="a"
              href={"/"}
              onClick={(event) => event.preventDefault()}
            >
              Politique de confidentialité
            </Text>
            <IconPointFilled color={"#868e96"}/>
            <Text
              c="dimmed"
              size="sm"
              className={"footer_link"}
              component="a"
              href={"/"}
              onClick={(event) => event.preventDefault()}
            >
              Conditions d&apos;utilisations
            </Text>
          </Group>
        </Stack>
      </Container>
    </footer>
  )
}


export default FooterLayout