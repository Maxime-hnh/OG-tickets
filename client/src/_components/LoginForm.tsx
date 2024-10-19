import {Form, Formik} from "formik";
import {
  AuthenticatedUser,
  AuthenticationRequest,
  authenticationService,
} from "@/_services/authentication.service";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconForbid, IconLock, IconMail, IconShieldLock} from "@tabler/icons-react";
import {Button, Group, Loader, Modal, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import React, {Dispatch, SetStateAction, useState} from "react";
import {FetchedUser} from "@/_objects/User";
import * as Yup from "yup";
import SignupForm from "@/_components/SignupForm";

interface LoginFormProps {
  closeModal: () => void;
  redirectUser?: (user: AuthenticatedUser) => void;
  setAuthenticatedUser?: Dispatch<SetStateAction<AuthenticatedUser | null>>
}

const LoginForm = ({closeModal, redirectUser, setAuthenticatedUser}: LoginFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginStep, setLoginStep] = useState<number>(0);
  const [openSignupForm, setOpenSignupForm] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Partial<FetchedUser> | null>(null);
  let authenticationRequest = new AuthenticationRequest();

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
              let data = {
                userId: userInfo!.id,
                twoFactorCode: values.twoFactorCode
              }
              const loggedUser = await authenticationService.login(loginStep, data)
              if (loggedUser) {
                closeModal();
                if (redirectUser) {
                  redirectUser(loggedUser)
                } else {
                  setAuthenticatedUser!(loggedUser)
                  notifications.show({
                    icon: <IconCheck/>,
                    color: "green",
                    position: "top-right",
                    title: "Connexion réussie !",
                    message: `Bonjour ${loggedUser.firstName} ${loggedUser.lastName}, vous pouvez à présent procéder au paiement`
                  })
                }
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

                    <Stack>
                        <Button type={"submit"}>
                            Connexion
                        </Button>
                        <Text
                            fz={"sm"}
                            style={{cursor: 'pointer'}}
                            ta={"center"}
                            c={"blue"}
                            td="underline"
                            onClick={() => setOpenSignupForm(true)}
                        >
                            Vous n&apos;avez pas de compte ? Inscrivez-vous ici
                        </Text>
                    </Stack>
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
                        Connexion
                    </Button>
                </Stack>
            }

          </Form>
        )}
      </Formik>
      <Modal
        centered
        opened={openSignupForm}
        onClose={() => setOpenSignupForm(false)}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={"sm"}
      >
        <SignupForm/>
      </Modal>
    </>
  )
}
export default LoginForm;