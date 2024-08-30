import React, {useState} from "react";
import {AppShell, Burger, Group, Image, NavLink, Skeleton} from "@mantine/core";
import {IconBuildingStore, IconHome2, IconLogout, IconSettings} from "@tabler/icons-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {colors} from "@/_helpers/colors";

interface AdminLayoutProps {
  children: React.ReactNode;
  opened: boolean;
  toggle: () => void;
}


const AdminLayout = ({children, opened, toggle}: AdminLayoutProps) => {

  const navData = [
    {icon: IconHome2, label: "Dashboard", path: "/admin"},
    {icon: IconBuildingStore, label: "Produits", path: "/admin/products"},
    {icon: IconSettings, label: "Paramètres", path: "/admin/settings"},
    {icon: IconLogout, label: "Se déconnecter", path: "/"},

  ];
  const pathname = usePathname()
  return (
    <AppShell
      header={{height: 60}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
          <Image
            radius={'xs'}
            w={"48px"}
            src="/logo_OG.svg"
            alt="logo"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navData.map((item, index) => (
          <Link href={item.path} key={index} passHref>
            <NavLink

              color={colors.og_green}
              variant="light"
              label={item.label}
              active={pathname === item.path}
              leftSection={<item.icon size={20} stroke={1.5}/>}
              styles={{
                label: {fontSize: "1rem"},
              }}
            />
          </Link>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout;