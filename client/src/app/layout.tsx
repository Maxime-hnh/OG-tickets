"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "@mantine/notifications/styles.css";
import 'mantine-react-table/styles.css';
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import React, {useEffect, useState} from "react";
import useWindowSize from "@/_components/Utils/useWindowSize";
import {MOBILE_SIZE} from "@/_helpers/constants";
import AppContext from "./Context/AppContext";
import AdminLayout from "@/_components/Layouts/AdminLayout";
import RootLayout from "@/_components/Layouts/RootLayout";
import {usePathname} from "next/navigation";
import {Notifications} from '@mantine/notifications';
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import customParseFormat from "dayjs/plugin/customParseFormat";
import './globals.css';

const inter = Inter({subsets: ["latin"]});
const themeMantine = createTheme({
  autoContrast: true
});

const Layout = ({children}: Readonly<{ children: React.ReactNode; }>) => {

  dayjs.extend(customParseFormat);
  const [opened, {toggle}] = useDisclosure();
  const {width} = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_SIZE;
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
        isMobile,
      }}>
        <Notifications/>
        {isAdminRoute
          ? <AdminLayout opened={opened} toggle={toggle}>
            {children}
          </AdminLayout>
          : <RootLayout opened={opened} toggle={toggle}>
            {children}
          </RootLayout>
        }
      </AppContext.Provider>
    </MantineProvider>
    </body>
    </html>
  );
}
export default Layout;

