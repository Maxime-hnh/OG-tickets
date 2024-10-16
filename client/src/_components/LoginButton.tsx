import {
  Button,
  Group,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {
  AuthenticatedUser,
  AuthenticationRequest,
  authenticationService,
  AuthRole
} from "@/_services/authentication.service";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from 'next/navigation';
import {notifications} from "@mantine/notifications";
import {IconCheck, IconForbid, IconLock, IconMail, IconShieldLock} from "@tabler/icons-react";
import {FetchedUser} from "@/_objects/User";

interface LoginButtonProps {
  grow?: boolean;
}

const LoginButton = ({grow = false}: LoginButtonProps) => {

  const [opened, {open, close}] = useDisclosure(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticationService.isLogged());
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<Partial<FetchedUser> | null>(null);
  let authenticationRequest = new AuthenticationRequest();

  useEffect(() => {
    const subscription = authenticationService.loggedUser.subscribe(user => {
      setIsAuthenticated(user !== null);
    });
    return () => subscription.unsubscribe();
  }, [authenticationService]);

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

  const getValidationSchema = (step: number) => {
    if (step === 0) {
      return Yup.object().shape({
        email: Yup.string()
          .email('Email invalide')
          .required("Saisissez votre adresse mail"),
        password: Yup.string()
          .required('Saisissez votre mot de passe'),
      });
    } else {
      return Yup.object().shape({
        twoFactorCode: Yup.string()
          .length(6, 'Le code à deux facteurs doit comporter exactement 6 caractères')
          .required('Saisissez le code reçu par mail'),
      });
    }
  }

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
          loading={isLoading}
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
        <Formik
          initialValues={authenticationRequest}
          enableReinitialize={true}
          validationSchema={getValidationSchema(loginStep)}
          onSubmit={async (values) => {
            try {
              if (loginStep === 0) {
                setIsLoading(true);
                const userShortData = await authenticationService.login(loginStep, values)
                if (userShortData) {
                  setUserInfo(userShortData)
                  setLoginStep(1)
                }
              }
              if (loginStep === 1) {
                setIsLoading(true)
                let data = {
                  userId: userInfo!.id,
                  twoFactorCode: values.twoFactorCode
                }
                const loggedUser = await authenticationService.login(loginStep, data)
                if (loggedUser) {
                  close();
                  redirectUser(loggedUser)
                }
              }
            } catch (e) {
              notifications.show({
                icon: <IconForbid/>,
                color: "red",
                position: "bottom-center",
                title: "Erreur de connexion",
                message: `Une erreur est survenue ${e}`
              })
            } finally {
              setIsLoading(false);
            }
          }
          }
        >
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <Form onSubmit={handleSubmit}>
              <Title ta="center" className={"titleFont"} mb={30}>Connexion</Title>
              {isLoading && <Group py={20} justify={"center"}><Loader type="bars"/></Group>}
              {!isLoading
                && loginStep === 0
                && <Stack>
                      <TextInput
                          label="Email"
                          name="email"
                          value={values.email}
                          error={touched.email && errors.email}
                          onChange={handleChange}
                          inputWrapperOrder={['label', 'description', 'input', 'error']}
                          leftSection={<IconMail/>}
                          mb={10}
                          withAsterisk
                      />

                      <PasswordInput
                          withAsterisk
                          label="Mot de passe"
                          name="password"
                          value={values.password}
                          error={touched.password && errors.password}
                          onChange={handleChange}
                          inputWrapperOrder={['label', 'description', 'input', 'error']}
                          mb={10}
                          leftSection={<IconLock/>}
                      />

                      <Button type={"submit"}>
                          Connexion
                      </Button>
                  </Stack>
              }

              {!isLoading
                && loginStep === 1
                && <Stack>
                      <Text ta={"center"}>Veuillez renseigner le code de vérification que vous avez reçu par
                          mail.</Text>
                      <TextInput
                          label="Code de vérification"
                          name="twoFactorCode"
                          value={values.twoFactorCode}
                          error={touched.twoFactorCode && errors.twoFactorCode}
                          onChange={(event) => {
                            const upperValue = event.currentTarget.value.toUpperCase();
                            handleChange(event.currentTarget.name)(upperValue);
                          }}
                          inputWrapperOrder={['label', 'description', 'input', 'error']}
                          leftSection={<IconShieldLock/>}
                          mb={10}
                          withAsterisk
                      />
                      <Button type={"submit"}>
                          Confirmer
                      </Button>
                  </Stack>
              }

            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )

};

export default LoginButton;