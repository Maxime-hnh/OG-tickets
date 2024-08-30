"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "@mantine/notifications/styles.css";
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider, Text
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import React, {useEffect, useState } from "react";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {MOBILE_SIZE} from "@/_helpers/constants";
import AppContext from "./Context/AppContext";
import AdminLayout from "@/_components/AdminLayout";
import RootLayout from "@/_components/RootLayout";
import { usePathname } from "next/navigation";

const inter = Inter({subsets: ["latin"]});
const themeMantine = createTheme({
  autoContrast: true
});

export default function Layout({children}: Readonly<{ children: React.ReactNode; }>) {

  const [opened, {toggle}] = useDisclosure();
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');


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
        {isAdminRoute
        ? <AdminLayout children={children} opened={opened} toggle={toggle}/>
          : <RootLayout opened={opened} toggle={toggle} children={children}/>
        }
      </AppContext.Provider>
    </MantineProvider>
    </body>
    </html>
  );
}
