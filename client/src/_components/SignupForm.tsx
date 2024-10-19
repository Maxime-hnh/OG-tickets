import {useState} from "react";
import {FetchedUser, UserSignup} from "@/_objects/User";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  Popover,
  Progress,
  rem, Stack,
  Text,
  TextInput,
  Title,
  Transition
} from "@mantine/core";
import {IconCheck, IconMail, IconSword, IconSwords, IconX} from "@tabler/icons-react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {authenticationService} from "@/_services/authentication.service";
import {ApiError} from "@/_helpers/handle-response";

const SignupForm = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<FetchedUser | null>(null);

  const requirements = [
    {re: /[0-9]/, label: 'Votre mot de passe doit contenir au moins un nombre'},
    {re: /[a-z]/, label: 'Votre mot de passe doit contenir au moins une minuscule'},
    {re: /[A-Z]/, label: 'Votre mot de passe doit contenir au moins une majuscule'},
  ];

  function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }


  function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
      <Text
        c={meets ? 'teal' : 'red'}
        style={{display: 'flex', alignItems: 'center'}}
        mt={7}
        size="sm"
      >
        {meets ? (
          <IconCheck style={{width: rem(14), height: rem(14)}}/>
        ) : (
          <IconX style={{width: rem(14), height: rem(14)}}/>
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>

    );
  }

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)}/>
  ));
  const strength = getStrength(password);
  const color = strength && strength === 100 ? 'teal' : strength && strength > 50 ? 'yellow' : 'red';

  return (
    <>
      <Formik
        initialValues={new UserSignup()}
        enableReinitialize
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("Le prénom est requis"),
          lastName: Yup.string()
            .required("Le nom est requis"),
          email: Yup.string()
            .email("L'email ne semble pas correct")
            .required("L'email est requis"),
          password: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              'Votre mot de passe doit contenir 8 caractères et au moins une majuscule, une minuscule et un nombre'
            ),
          confirmPassword: Yup.string()
            .required('Confirmation requise')
            .oneOf([Yup.ref('password')], "La confirmation n'est pas identique au mot de passe")
        })}
        onSubmit={async (values, {setFieldError}) => {
          setIsLoading(true);
          try {
            const newUser = await authenticationService.signup(values);
            setUser(newUser);
          } catch (e) {
            if (e instanceof ApiError) {
              if (e.errorCode === 400) setFieldError("email", "L'adresse mail est déjà utilisée");
            }
          } finally {
            setIsLoading(false)
          }
        }}
      >
        {({values, handleChange, handleSubmit, errors, touched, setFieldValue}) => (

          !user && <Form onSubmit={handleSubmit}>
              <Title ta="center" className={"titleFont"} mb={30}>Inscription</Title>

              <Group mb={10} gap={"xs"} wrap={"nowrap"} align={"center"}>
                  <TextInput
                      data-autofocus
                      label="Prénom"
                      name="firstName"
                      value={values.firstName}
                      error={touched.firstName && errors.firstName}
                      onChange={handleChange}
                      inputWrapperOrder={['label', 'description', 'input', 'error']}
                      style={{flex: 1}}
                      withAsterisk
                  />
                  <TextInput
                      label="Nom"
                      name="lastName"
                      value={values.lastName}
                      error={touched.lastName && errors.lastName}
                      onChange={handleChange}
                      inputWrapperOrder={['label', 'description', 'input', 'error']}
                      style={{flex: 1}}
                      withAsterisk
                  />
              </Group>

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

              <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{transition: 'pop'}}>
                  <Popover.Target>
                      <div
                          onFocusCapture={() => setPopoverOpened(true)}
                          onBlurCapture={() => setPopoverOpened(false)}
                      >
                          <PasswordInput
                              withAsterisk
                              label="Nouveau mot de passe"
                              name="password"
                              value={values.password}
                              error={touched.password && errors.password}
                              onChange={(e) => {
                                setFieldValue("password", e.currentTarget.value)
                                setPassword(e.currentTarget.value)
                              }}
                              inputWrapperOrder={['label', 'description', 'input', 'error']}
                              mb={10}
                              leftSection={<IconSword/>}
                          />
                      </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                      <Progress color={color} value={strength} size={5} mb="xs"/>
                      <PasswordRequirement label="Votre mot de passe doit contenir au moins 8 caractères"
                                           meets={values.password.length > 7}/>
                    {checks}
                  </Popover.Dropdown>
              </Popover>

              <PasswordInput
                  withAsterisk
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  onChange={handleChange}
                  error={touched.confirmPassword && errors.confirmPassword}
                  inputWrapperOrder={['label', 'description', 'input', 'error']}
                  mb={10}
                  leftSection={<IconSwords/>}
              />
              <Group justify={"center"} align={"center"} mt={30}>
                  <Button
                      type={"submit"}
                      size={"md"}
                      radius={"sm"}
                      loading={isLoading}
                  >
                      Je m&apos;inscris
                  </Button>
              </Group>
          </Form>
        )}
      </Formik>
      <Transition
        mounted={user !== null}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) =>
          <Stack style={styles} px={"lg"} pb={"lg"}>
            <Title ta="center">🎉🎉</Title>
            <Title ta="center" className={"titleFont"}>Félicitations ! </Title>
            <Text ta={"center"}>Bienvenue {user?.firstName}, vous pouvez à présent vous connecter et réserver vos
              tickets.</Text>
          </Stack>
        }
      </Transition>
    </>
  )
}

export default SignupForm;