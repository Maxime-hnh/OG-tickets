import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Image,
  LoadingOverlay, Transition
} from "@mantine/core";
import {Form, Formik} from "formik";
import React, {useState} from "react";
import {DateInput} from "@mantine/dates";
import {formatCardNumber} from "@/_helpers/helper";
import * as Yup from "yup";
import {AuthenticatedUser} from "@/_services/authentication.service";

interface PaiementFormProps {
  authenticatedUser: AuthenticatedUser
}

const PaiementForm = ({authenticatedUser}: PaiementFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const paiementRequest = (values: any) => {

  }

  return (
    <Paper p={"lg"} withBorder w={600} m={"auto"} pos={"relative"} shadow={"sm"}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

      {isSuccess
        && <Stack gap={"xs"}>
              <Title c={"indigo"} ta={"center"} order={3} tt={"uppercase"}>Paiement sécurisé</Title>

              <Group justify={"center"} align={"center"}>
                  <Image
                      src={"./mastercard.svg"}
                      width={50}
                      height={50}
                  />
                  <Image
                      src={"./visa.svg"}
                      width={40}
                      height={40}
                  />
              </Group>

              <Formik
                  initialValues={{test: "", cardNumber: ""}}
                  onSubmit={async (values) => {

                  }}
              >
                {({values, handleChange, handleSubmit, errors, touched}) => (

                  <Form>
                    <TextInput
                      styles={{
                        input: {
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none"
                        }
                      }}
                      radius={0}
                      label="Titulaire de la carte"
                      name="email"
                      value={values.test}
                      error={touched.test && errors.test}
                      onChange={handleChange}
                      inputWrapperOrder={['label', 'description', 'input', 'error']}
                      mb={10}
                    />
                    <TextInput
                      styles={{
                        input: {
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none"
                        }
                      }}
                      radius={0}
                      label="Numéro de la carte"
                      name="email"
                      value={formatCardNumber(values.cardNumber)}
                      error={touched.test && errors.test}
                      onChange={(e) => {
                        const input = e.target.value;
                        const cleanedInput = input.replace(/\s+/g, '');

                        if (cleanedInput.length <= 16) {
                          const formattedValue = formatCardNumber(cleanedInput);
                          handleChange({target: {name: 'cardNumber', value: formattedValue}});
                        }
                      }}
                      inputWrapperOrder={['label', 'description', 'input', 'error']}
                      mb={10}
                    />
                    <Group align={"center"} mb={30}>
                      <DateInput
                        locale={"fr"}
                        valueFormat={"MM/YYYY"}
                        styles={{
                          input: {
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none"
                          }
                        }}
                        radius={0}
                        value={new Date()}
                        onChange={handleChange}
                        label="Date d'expiration"
                        placeholder="01/01/2030"
                        mr={20}
                      />
                      <PasswordInput
                        styles={{
                          input: {
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none"
                          }
                        }}
                        radius={0}
                        label="Crytptogramme"
                        name="crypto"
                        value={values.test}
                        error={touched.test && errors.test}
                        onChange={handleChange}
                        inputWrapperOrder={['label', 'description', 'input', 'error']}
                      />

                    </Group>
                    <Button>Confirmer le paiement</Button>
                  </Form>
                )}
              </Formik>
          </Stack>
      }
      <Transition
        mounted={!isSuccess}
        transition="fade-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) =>
          <Stack style={styles}>
            <Title className={"titleFont"}>Paiement approuvé ! ✅</Title>
            <Text
              c={"dimmed"}
              ta={"justify"}
            >
              {`Bonjour ${authenticatedUser.firstName}, nous avons bien reçu votre demande de paiement.
              Conservez précieusement votre QR code, il vous sera demandé lors de votre arrivée à l'évènement`}
            </Text>
            <Text>Détail de la réservation :</Text>
          </Stack>
        }
      </Transition>

    </Paper>
  )
}
export default PaiementForm;