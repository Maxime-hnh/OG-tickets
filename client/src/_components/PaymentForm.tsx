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
import React, {useState} from "react";
import {DateInput} from "@mantine/dates";
import {formatCardNumber} from "@/_helpers/helper";
import {AuthenticatedUser} from "@/_services/authentication.service";
import {FetchedOrder} from "@/_objects/Order";
import {orderService} from "@/_services/order.service";
import {FetchedProduct} from "@/_objects/Product";

interface PaymentRequestValues {
  fullname: string;
  cardNumber: string;
  expirationDate?: Date;
  securityCode: string;
}


interface PaymentFormProps {
  orderId: number;
  authenticatedUser: AuthenticatedUser;
  selectedProducts: FetchedProduct[];
  totalPrice: number;
}

const PaymentForm = ({orderId, authenticatedUser, selectedProducts, totalPrice}: PaymentFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [validatedOrder, setValidatedOrder] = useState<FetchedOrder | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<any>()
  console.log(validatedOrder)
  let PaymentValues: PaymentRequestValues = {
    fullname: "",
    cardNumber: "",
    securityCode: ""
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
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper p={"lg"} withBorder w={600} m={"auto"} pos={"relative"} shadow={"sm"}>
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
              >
                {({values, handleChange, handleSubmit, errors, touched}) => (

                  <Form onSubmit={handleSubmit}>
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
                      name="fullname"
                      value={values.fullname}
                      error={touched.fullname && errors.fullname}
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
                      name="cardNumber"
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
                    <Group align={"center"} mb={30}>
                      <DateInput
                        name={"expirationDate"}
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
                        value={values.expirationDate ?? new Date()}
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
                        name="securityCode"
                        value={values.securityCode}
                        error={touched.securityCode && errors.securityCode}
                        onChange={handleChange}
                        inputWrapperOrder={['label', 'description', 'input', 'error']}
                      />

                    </Group>
                    <Button type={"submit"}>Confirmer le paiement</Button>
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