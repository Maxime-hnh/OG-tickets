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
import {AppShell, Burger, Group, Image} from '@mantine/core';
import React from "react";
import Link from "next/link";
import LoginButton from "@/_components/LoginButton";
import SignupButton from "@/_components/SignupButton";
import "./RootLayout.scss";
import FooterLayout from "@/_components/Layouts/FooterLayout";

interface RootLayoutProps {
  children: React.ReactNode;
  opened: boolean;
  toggle: () => void;
}

const RootLayout = ({children, opened, toggle}: RootLayoutProps) => {

  return (
    <AppShell
      id={"rootLayout"}
      header={{height: 60}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
      padding="md"
    >
      <AppShellHeader withBorder={true}>
          <Group justify="space-between" style={{flex: 1}} h={"100%"} px={"md"}>
            <Image
              radius={'xs'}
              w={"48px"}
              src="/logo_OG.svg"
              alt="logo"
            />
            <Group gap={0} visibleFrom="sm" h={"100%"}>
              <Link href={"/"} className={"link"}>Accueil</Link>
              <Link href={"/shop"} className={"link"}>Offres</Link>
              <Link href={"/shop"} className={"link"}>Contact</Link>
            </Group>
            <Group visibleFrom="sm">
              <SignupButton/>
              <LoginButton/>
            </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color={"black"}/>
          </Group>
      </AppShellHeader>

      <AppShellNavbar py="md" px={4}>
        <Link href={"/"} className={"link"}>Accueil</Link>
        <Link href={"/shop"} className={"link"}>Offres</Link>
        <Link href={"/shop"} className={"link"}>Contact</Link>
        <Divider my="sm" />
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
