import {Button, Input, Modal} from "@mantine/core";
import React from "react";
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

const LoginButton = () => {

  const [opened, {open, close}] = useDisclosure(false);
  const router = useRouter();
  const isAuthenticated = authenticationService.isLogged()
  let authenticationRequest = new AuthenticationRequest()

  const redirectUser = (user: AuthenticatedUser) => {
    const username = encodeURIComponent(user.firstName)
    switch (user.role) {
      case AuthRole.ADMIN:
        router.push(`/admin`);
        break;
      case AuthRole.USER:
        router.push("/");
        break;
      default:
        router.push("/login");
    }
  }

  return (
    <>
      {isAuthenticated
      ? <Button onClick={() => authenticationService.logout()} radius={"xl"} mr={10}>Se déconnecter</Button>
      : <Button onClick={open} radius={"xl"} mr={10}>Se connecter</Button>
      }


      <Modal
        title={"Connexion"}
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Formik
          initialValues={authenticationRequest}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email invalide').required("Saisissez votre adresse mail"),
            password: Yup.string().required('Saisissez votre mot de passe'),
          })
          }
          onSubmit={async (values) => {
            const loggedUser = await authenticationService.login(values)
            if (loggedUser) {
              close();
              redirectUser(loggedUser)
            }
          }}
        >
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <Form onSubmit={handleSubmit}>
              <Input.Wrapper
                label="Email"
                error={touched.email && errors.email}
                withAsterisk
              >
                <Input
                  name={"email"}
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Input inside Input.Wrapper"
                />
              </Input.Wrapper>

              <Input.Wrapper
                label="Mot de passe"
                error={touched.password && errors.password}
                withAsterisk
              >
                <Input
                  name={"password"}
                  value={values.password}
                  onChange={handleChange}
                />
              </Input.Wrapper>

              <Button type={"submit"}>
                Connexion
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )

};

export default LoginButton;