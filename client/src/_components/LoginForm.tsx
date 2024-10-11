import {Button, Modal, PasswordInput, Stack, TextInput, Title, Text, Group, Loader} from "@mantine/core";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {AuthenticationRequest, authenticationService} from "@/_services/authentication.service";
import {IconLock, IconMail, IconShieldLock} from "@tabler/icons-react";
import React, {Dispatch, SetStateAction, useState} from "react";
import {FetchedUser} from "@/_objects/User";

interface LoginFormProps {
  opened: boolean
  onClose: () => void;
  onSubmit: (values: AuthenticationRequest, setLoader: Dispatch<SetStateAction<boolean>>) => void;
  loginStep: number;
  warningMessage?: string;
}

const LoginForm = ({opened, onClose, onSubmit, warningMessage, loginStep}: LoginFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  let authenticationRequest = new AuthenticationRequest()

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      radius={"sm"}
    >
      <Formik
        initialValues={authenticationRequest}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Email invalide').required("Saisissez votre adresse mail"),
          // password: Yup.string().required('Saisissez votre mot de passe'),
        })
        }
        onSubmit={async (values) => {
          onSubmit(values, setIsLoading)
        }}
      >
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <Form onSubmit={handleSubmit}>
            <Title ta="center" className={"titleFont"}>Connexion</Title>
            {warningMessage
              && <Text ta={"center"} c={"dimmed"} mt={10}>
                {warningMessage}
                </Text>
            }
            {isLoading && <Group py={20} justify={"center"}><Loader type="bars"/></Group>}
            {!isLoading
              && loginStep === 0
              && <Stack mt={30}>
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
                        onChange={handleChange}
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
  )
}

export default LoginForm;