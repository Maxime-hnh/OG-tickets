import {Button, Modal, PasswordInput, Stack, TextInput, Title, Text} from "@mantine/core";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {AuthenticationRequest, authenticationService} from "@/_services/authentication.service";
import {IconLock, IconMail} from "@tabler/icons-react";
import React from "react";

interface LoginFormProps {
  opened: boolean
  onClose: () => void;
  onSubmit: (values: AuthenticationRequest) => void;
  warningMessage?: string;
}

const LoginForm = ({opened, onClose, onSubmit, warningMessage}: LoginFormProps) => {

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
          email: Yup.string().email('Email invalide').required("Saisissez votre adresse mail"),
          password: Yup.string().required('Saisissez votre mot de passe'),
        })
        }
        onSubmit={async (values) => {
          onSubmit(values)
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
            <Stack mt={30}>
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
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default LoginForm;