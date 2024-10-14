import React, {useEffect, useState} from "react";
import {AppShell, Box, Burger, Divider, Flex, Group, Image, NavLink, Text} from "@mantine/core";
import {IconBuildingStore, IconHome2, IconLogout, IconSettings} from "@tabler/icons-react";
import {usePathname, useRouter} from "next/navigation";
import {colors} from "@/_helpers/colors";
import AdminContext from "@/app/Context/AdminContext";
import {AuthenticatedUser, authenticationService, AuthRole} from "@/_services/authentication.service";
import {FetchedUser} from "@/_objects/User";
import useWindowSize from "@/_components/Utils/useWindowSize";

interface AdminLayoutProps {
  children: React.ReactNode;
  opened: boolean;
  toggle: () => void;
}

const AdminLayout = ({children, opened, toggle}: AdminLayoutProps) => {

  const router = useRouter();
  const {width} = useWindowSize();
  const navData = [
    {icon: IconHome2, label: "Dashboard", path: "/admin"},
    {icon: IconBuildingStore, label: "Produits", path: "/admin/products"},
    {icon: IconSettings, label: "Paramètres", path: "/admin/settings"},
    {icon: IconLogout, label: "Se déconnecter", path: "/"},
  ];
  const pathname = usePathname()
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<AuthenticatedUser | null>(authenticationService.loggedUserValue);
  const [userInfo, setUserInfo] = useState<FetchedUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isAdmin = authenticationService.hasRole(AuthRole.ADMIN);
    if (!isAdmin) {
      router.replace('/');
    } else {
      setIsAuthorized(true);
    }
  }, [router])

  if (!isAuthorized) return null;
  return (
    <AdminContext.Provider value={{
      authenticatedAdmin,
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
              onClick={() => item.label === "Se déconnecter" ? authenticationService.logout() : ""}
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
          {width < 767 && <Divider my="sm" color={colors.og_green}/>}
          <Box pos={"absolute"} bottom={10} w={"100%"} maw={"100%"}>
            <Flex gap={4} direction={"column"} justify={"center"} align={"center"}>
              <Text fz={{base: "sm", sm: "xs"}} c={"dimmed"} style={{cursor: "pointer"}}>Politique de
                confidentialité</Text>
              <Text fz={{base: "sm", sm: "xs"}} c={"dimmed"} style={{cursor: "pointer"}}>Conditions
                d&apos;utilisations</Text>
            </Flex>
          </Box>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AdminContext.Provider>
  )
}

export default AdminLayout;