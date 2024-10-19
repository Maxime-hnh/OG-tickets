import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  TextInput,
  PasswordInput,
  Button,
  Image,
  LoadingOverlay, Transition, Divider
} from "@mantine/core";
import {Form, Formik} from "formik";
import React, {Dispatch, SetStateAction, useState} from "react";
import {formatCardNumber} from "@/_helpers/helper";
import {AuthenticatedUser} from "@/_services/authentication.service";
import {FetchedOrder} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import {FetchedProduct} from "@/_objects/Product";
import ExpirationDateInput from "@/_components/ExpirationDateInput";
import * as Yup from "yup";
import {notifications} from "@mantine/notifications";
import {IconForbid} from "@tabler/icons-react";

interface PaymentRequestValues {
  fullname: string;
  cardNumber: string;
  expirationDate?: any;
  securityCode: string;
}


interface PaymentFormProps {
  orderId: number;
  authenticatedUser: AuthenticatedUser;
  setHideSummary: Dispatch<SetStateAction<boolean>>
  selectedProducts: FetchedProduct[];
  totalPrice: number;
}

const PaymentForm = ({
                       orderId,
                       authenticatedUser,
                       setHideSummary,
                       selectedProducts,
                       totalPrice,
                     }: PaymentFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [validatedOrder, setValidatedOrder] = useState<FetchedOrder | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<any>()

  let PaymentValues: PaymentRequestValues = {
    fullname: "",
    cardNumber: "",
    securityCode: "",
    expirationDate: {
      month: null,
      year: null
    }
  }

  const paiementRequest = async () => {
    try {
      setIsLoading(true);
      const validatedOrder = await orderService.validateOrder(orderId, authenticatedUser.id);
      if (validatedOrder) {
        setValidatedOrder(validatedOrder);
        const qrCodeBlob = await orderService.getQrCode(orderId);
        if (qrCodeBlob) {
          const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
          setQrCodeUrl(qrCodeUrl);
          setIsSuccess(true);
          setHideSummary(true);
        }
      }
    } catch (e) {
      console.error(e)
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
  };

  return (
    <Paper
      p={"lg"}
      withBorder
      w={{base: "100%", sm: !isSuccess ? "100%" : 600, md: 600}}
      m={"auto"}
      pos={"relative"}
      shadow={"sm"}
    >
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

      {!isSuccess
        && <Stack gap={"xs"}>
              <Title c={"indigo"} ta={"center"} order={3} tt={"uppercase"}>Paiement sécurisé</Title>

              <Group justify={"center"} align={"center"}>
                  <Image
                      alt={"logo mastercard"}
                      src={"./mastercard.svg"}
                      width={50}
                      height={50}
                  />
                  <Image
                      alt={"logo visa"}
                      src={"./visa.svg"}
                      width={40}
                      height={40}
                  />
              </Group>

              <Formik
                  initialValues={PaymentValues}
                  onSubmit={paiementRequest}
                  validationSchema={Yup.object().shape({
                    fullname: Yup.string().required("Le nom complet est requis"),
                    cardNumber: Yup.string()
                      .length(19, 'Le numéro de carte doit contenir exactement 16 chiffres')
                      .matches(/^[0-9 ]+$/, "Le numéro de carte doit uniquement contenir des chiffres")
                      .required("Le numéro de carte bancaire est requis"),
                    securityCode: Yup.string()
                      .length(3, "Le code de sécurité doit contenir exactement 3 chiffres")
                      .matches(/^[0-9]+$/, "Le code de sécurité doit uniquement contenir des chiffres")
                      .required("Le code de sécurité est requis"),
                    expirationDate: Yup.object({
                      month: Yup.number()
                        .min(1, 'Le mois doit être au moins 1')
                        .max(12, 'Le mois ne peut pas être supérieur à 12')
                        .nullable()
                        .required('Le mois est requis'),
                      year: Yup.number()
                        .min(new Date().getFullYear(), "L'année ne peut pas être dans le passé")
                        .max(new Date().getFullYear() + 20, "L'année n'est pas valide")
                        .required("L'année est requise")

                    }),
                  })
                  }
              >
                {({values, handleChange, handleSubmit, errors, touched, setFieldValue}) => (

                  <Form onSubmit={handleSubmit}>
                    <TextInput
                      name="fullname"
                      styles={{
                        input: {
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none"
                        }
                      }}
                      radius={0}
                      label="Titulaire de la carte"
                      value={values.fullname}
                      error={touched.fullname && errors.fullname}
                      onChange={handleChange}
                      inputWrapperOrder={['label', 'description', 'input', 'error']}
                      mb={10}
                    />
                    <TextInput
                      name="cardNumber"
                      styles={{
                        input: {
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none"
                        }
                      }}
                      radius={0}
                      label="Numéro de la carte"
                      value={formatCardNumber(values.cardNumber)}
                      error={touched.cardNumber && errors.cardNumber}
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
                    <Group align={"flex-end"} mb={30}>
                      <ExpirationDateInput
                        month={values.expirationDate?.month}
                        year={values.expirationDate?.year}
                        setFieldValue={setFieldValue}
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
                        name="securityCode"
                        maxLength={3}
                        value={values.securityCode}
                        error={touched.securityCode && errors.securityCode}
                        onChange={handleChange}
                        inputWrapperOrder={['label', 'description', 'input', 'error']}
                      />

                    </Group>
                    <Button type={"submit"}>Confirmer le paiement</Button>
                    <Text fz={"xs"} c={"dimmed"}>Ceci est un faux paiement, ne renseignez pas vos coordonnées
                      bancaires.</Text>
                  </Form>
                )}
              </Formik>
          </Stack>
      }
      <Transition
        mounted={isSuccess}
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
              Conservez précieusement votre QR code, il vous sera demandé lors de votre arrivée à l'évènement.`}
            </Text>
            <Divider my={10}/>


            <Text td="underline">Détail de la réservation :</Text>
            <Stack gap={4}>
              {selectedProducts.map((p) => (
                <Group justify={"space-between"} align={"center"} key={p.id}>
                  <Text>{p.name}...<Text span c={"dimmed"}>x{p.quantity}</Text></Text>
                  <Text fw={700}>{parseFloat((p.price! * p.quantity!).toFixed(2))} €</Text>
                </Group>
              ))}
              <Divider my={5}/>
              <Group justify={"space-between"} align={"center"}>
                <Text fz={"1.5rem"} fw={700} className={"titleFont"}>Total : </Text>
                <Text fz={"1.5rem"} fw={700} className={"titleFont"}>{totalPrice} €</Text>
              </Group>
            </Stack>

            <Group align={"center"}>
              <Text>QR code :</Text>
              <Image
                alt={"QrCode"}
                src={qrCodeUrl}
                w={100}
                h={100}
              />
            </Group>
          </Stack>
        }
      </Transition>

    </Paper>
  )
}
export default PaymentForm;