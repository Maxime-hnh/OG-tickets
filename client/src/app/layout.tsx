"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "@mantine/notifications/styles.css";
import {
  AppShellHeader,
  AppShellMain,
  AppShellNavbar, AppShellSection, Button,
  ColorSchemeScript,
  createTheme,
  MantineProvider, Text
} from '@mantine/core';
import {AppShell, Burger, Group, Image, UnstyledButton} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import classes from './ui/home.module.scss';
import React, {useEffect, useState } from "react";
import Link from "next/link";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {MOBILE_SIZE} from "@/_helpers/constants";
import AppContext from "./Context/AppContext";

const inter = Inter({subsets: ["latin"]});
const themeMantine = createTheme({
  autoContrast: true
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  const [opened, {toggle}] = useDisclosure();
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= MOBILE_SIZE;
    setIsMobile(isMobile);
    const vh = window.innerHeight * 0.01;
    if (isMobile) document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [width]);

  return (
    <html lang="fr">
    <head>
      <title>OG-Tickets</title>
      <ColorSchemeScript/>
    </head>
    <body className={inter.className}>
    <MantineProvider theme={themeMantine}>
      <AppContext.Provider value={{
        isMobile
      }}>
      <AppShell
        header={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
        padding="md"
      >
        <AppShellHeader withBorder={false}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color={"white"}/>
            <Group justify="space-between" style={{flex: 1}}>
              <Image
                radius={'xs'}
                w={"48px"}
                src="/logo_OG.svg"
                alt="logo"
              />
              <Group gap={0} visibleFrom="sm">
                <Link href={"/"}>
                  <Button color={"white"} radius={"xl"} mr={10}>Accueil</Button>
                </Link>
                <Link href={"/products"}>
                  <Button color={"white"} radius={"xl"} mr={10}>Offres</Button>
                </Link>
                <Button radius={"xl"} mr={10}>Se connecter</Button>
              </Group>
            </Group>
          </Group>
        </AppShellHeader>

        <AppShellNavbar py="md" px={4}>
          <UnstyledButton className={classes.control}>Accueil</UnstyledButton>
          <UnstyledButton className={classes.control}>Offres</UnstyledButton>
          <UnstyledButton className={classes.control}>Se connecter</UnstyledButton>
        </AppShellNavbar>

        <AppShellMain bg={"#11191f"}>
          {children}
        </AppShellMain>
        <AppShellSection bg={"#fff"}>
          <Text>footer</Text>
        </AppShellSection>
      </AppShell>
      </AppContext.Provider>
    </MantineProvider>
    </body>
    </html>
  );
}
