import React, {useState} from "react";
import {AppShell, Burger, Group, Image, NavLink} from "@mantine/core";
import {IconBuildingStore, IconHome2, IconLogout, IconSettings} from "@tabler/icons-react";
import {usePathname} from "next/navigation";
import {colors} from "@/_helpers/colors";
import AdminContext from "@/app/Context/AdminContext";
import {AuthenticatedUser, authenticationService} from "@/_services/authentication.service";
import {FetchedUser} from "@/_objects/User";

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
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(authenticationService.currentUserValue);
  const [userInfo, setUserInfo] = useState<FetchedUser | null>(null);

  return (
    <AdminContext.Provider value={{
      authenticatedUser,
      userInfo
    }}>
      <AppShell
        header={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
        padding="md"
      >
        <AppShell.Header bg={colors.og_green_3}>
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
            <NavLink
              key={index}
              href={item.path}
              color={colors.og_green}
              variant="light"
              label={item.label}
              active={pathname === item.path}
              leftSection={<item.icon size={20} stroke={1.5}/>}
              styles={{
                label: {fontSize: "1rem"},
              }}
            />
          ))}
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AdminContext.Provider>
  )
}

export default AdminLayout;