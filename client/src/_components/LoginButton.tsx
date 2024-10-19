import {
  Button,
  Modal,
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {
  AuthenticatedUser,
  authenticationService,
  AuthRole
} from "@/_services/authentication.service";
import {useRouter} from 'next/navigation';
import {notifications} from "@mantine/notifications";
import {IconCheck} from "@tabler/icons-react";
import LoginForm from "./LoginForm";

interface LoginButtonProps {
  grow?: boolean;
}

const LoginButton = ({grow = false}: LoginButtonProps) => {

  const router = useRouter();
  const [opened, {open, close}] = useDisclosure(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticationService.isLogged());

  const redirectUser = (user: AuthenticatedUser) => {
    switch (user.role) {
      case AuthRole.ADMIN:
        router.push(`/admin`);
        break;
      case AuthRole.USER:
        router.push("/");
        break;
      default:
        router.push("/");
    }
  }

  const logout = () => {
    authenticationService.logout();
    setIsAuthenticated(false)
    notifications.show({
      icon: <IconCheck/>,
      color: "green",
      position: "top-right",
      title: "Déconnexion",
      message: "Vous vous êtes déconnecté avec succès !"
    })
  }

  useEffect(() => {
    const subscription = authenticationService.loggedUser.subscribe(user => {
      setIsAuthenticated(user !== null);
    });
    return () => subscription.unsubscribe();
  }, [authenticationService]);

  return (
    <>
      {isAuthenticated
        ? <Button
          onClick={logout}
          radius={"sm"}
          style={{flex: grow ? 1 : ""}}
        >
          Se déconnecter
        </Button>
        : <Button
          onClick={open}
          radius={"sm"}
          style={{flex: grow ? 1 : ""}}
        >
          Se connecter
        </Button>
      }
      <Modal
        centered
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={"sm"}
      >
        <LoginForm
          closeModal={close}
          redirectUser={redirectUser}
        />
      </Modal>
    </>
  )
};

export default LoginButton;