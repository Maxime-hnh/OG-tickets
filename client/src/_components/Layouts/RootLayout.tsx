"use client";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "@mantine/notifications/styles.css";
import {
  AppShellHeader,
  AppShellMain,
  AppShellNavbar, AppShellSection, Button,
  Text
} from '@mantine/core';
import {AppShell, Burger, Group, Image, UnstyledButton} from '@mantine/core';
import React from "react";
import Link from "next/link";
import LoginButton from "@/_components/LoginButton";

interface RootLayoutProps {
  children: React.ReactNode;
  opened: boolean;
  toggle: () => void;
}

const RootLayout = ({children, opened, toggle}: RootLayoutProps) => {

  return (
    <AppShell
      header={{height: 60}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
      padding="md"
    >
      <AppShellHeader withBorder={true}>
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
                <Button
                  variant={"transparent"}
                  radius={"xl"}
                  mr={10}
                  styles={{label: {color: "#000"}}}>
                  Accueil
                </Button>
              </Link>
              <Link href={"/shop"}>
                <Button
                  variant={"transparent"}
                  radius={"xl"}
                  mr={10}
                  styles={{label: {color: "#000"}}}>
                  Offres
                </Button>
              </Link>
              <LoginButton/>
            </Group>
          </Group>
        </Group>
      </AppShellHeader>

      <AppShellNavbar py="md" px={4}>
        <UnstyledButton className={""}>Accueil</UnstyledButton>
        <UnstyledButton className={""}>Offres</UnstyledButton>
        <UnstyledButton className={""}>Se connecter</UnstyledButton>
      </AppShellNavbar>

      <AppShellMain>
        {children}
      </AppShellMain>
      <AppShellSection>
        <Text>footer</Text>
      </AppShellSection>
    </AppShell>
  );
}

export default RootLayout;
