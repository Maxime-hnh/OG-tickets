"use client";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "@mantine/notifications/styles.css";
import {
  AppShellHeader,
  AppShellMain,
  AppShellNavbar, AppShellSection, Divider,
} from '@mantine/core';
import {AppShell, Burger, Group, Image, Text} from '@mantine/core';
import React, {useContext} from "react";
import Link from "next/link";
import LoginButton from "@/_components/LoginButton";
import SignupButton from "@/_components/SignupButton";
import "./RootLayout.scss";
import FooterLayout from "@/_components/Layouts/FooterLayout";
import AppContext from "@/app/Context/AppContext";
import useWindowSize from "@/_components/Utils/useWindowSize";

interface RootLayoutProps {
  children: React.ReactNode;
  opened: boolean;
  toggle: () => void;
}

const RootLayout = ({children, opened, toggle}: RootLayoutProps) => {

  const {isMobile} = useContext(AppContext);
  const {width} = useWindowSize();

  return (
    <AppShell
      id={"rootLayout"}
      header={{height: 60}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
      padding="md"
    >
      <AppShellHeader withBorder={isMobile} bg={"#222"}>
        <Group justify="space-between" style={{flex: 1}} h={"100%"} px={"md"}>
          <Link href={"/"}>
            <Image
              radius={'xs'}
              w={"48px"}
              src="/logo_OG.svg"
              alt="logo"
            />
          </Link>
          <Group gap={width < 991 ? 3 : "lg"} visibleFrom="sm" h={"100%"}>
            <Link href={"/"} className={"link"}>Accueil</Link>
            <Link href={"/shop"} className={"link"}>Offres</Link>
            <Text className={"link"}>Résultats</Text>
            <Text className={"link"}>Contact</Text>
          </Group>
          <Group visibleFrom="sm">
            <SignupButton/>
            <LoginButton/>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color={"white"}/>
        </Group>
      </AppShellHeader>

      <AppShellNavbar py="md" px={4} bg={"#222"}>
        <Link href={"/"} className={"link"} onClick={toggle}>Accueil</Link>
        <Link href={"/shop"} className={"link"} onClick={toggle}>Offres</Link>
        <Text className={"link"} onClick={toggle}>Résultats</Text>
        <Text className={"link"} onClick={toggle}>Contact</Text>
        <Divider my="sm"/>
        <Group align={"center"} justify={"space-between"}>
          <SignupButton grow={true}/>
          <LoginButton grow={true}/>
        </Group>
      </AppShellNavbar>

      <AppShellMain px={0} pt={"60px"}>
        {children}
      </AppShellMain>
      <AppShellSection>
        <FooterLayout/>
      </AppShellSection>
    </AppShell>
  );
}

export default RootLayout;
