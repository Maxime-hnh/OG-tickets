import {Form, Formik} from "formik";
import {Dispatch, forwardRef, Ref, RefObject, SetStateAction, useRef, useState} from "react";
import * as Yup from "yup";
import {
  ActionIcon, Avatar, Flex,
  Grid,
  Group,
  NumberInput,
  Paper, rem,
  Select, Skeleton,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import {
  IconBuildingStadium, IconCalendar, IconClock, IconMapPin, IconPhoto, IconPingPong, IconTournament,
  IconUsers
} from "@tabler/icons-react";
import Product, {FetchedProduct, ProductCategory} from "@/_objects/Product";
import {cityList, sportsList, stageList, venueList} from "@/_helpers/constants";
import {DatePickerInput, TimeInput} from "@mantine/dates";

interface ProductFormProps {
  formValues: FetchedProduct | Product | undefined;
  handleSubmitForm: (values: FetchedProduct | Product, setLoader: Dispatch<SetStateAction<boolean>>) => void;
}

const ProductForm = forwardRef(({formValues, handleSubmitForm}: ProductFormProps, formRef) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startClockRef = useRef<HTMLInputElement>(null);
  const endClockRef = useRef<HTMLInputElement>(null);

  const startTimeControl = (clockRef: RefObject<HTMLInputElement>) => (
    <ActionIcon variant="subtle" color="gray" onClick={() => clockRef.current?.showPicker()}>
      <IconClock style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
    </ActionIcon>
  );
  console.log(formValues);

  if (!formValues || isLoading) return null;
  return (
    <Formik
      innerRef={formRef as any}
      initialValues={formValues}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("name error"),
        description: Yup.string().required("description error"),
        price: Yup.number().required("price error"),
        stock: Yup.number().required("stock error"),
        city: Yup.string().required("city error"),
        venue: Yup.string().required("venue error"),
        stage: Yup.string().required("stage error"),
        visible: Yup.boolean().required("visible error"),
        date: Yup.string().required("date error"),
        startTime: Yup.string().required("startTime error"),
        endTime: Yup.string().required("endTime error"),
        category: Yup.string()
          .oneOf([ProductCategory.SOLO, ProductCategory.DUO, ProductCategory.FAMILY])
          .required("category error"),
      })}
      onSubmit={async (values) => {
        handleSubmitForm(values, setIsLoading)
      }}
    >
      {({values, handleChange, handleSubmit, errors, touched, setFieldValue}) => (
        <Form onSubmit={handleSubmit}>
          <Grid grow>
            <Grid.Col span={8}>
              <Paper px={"lg"} py={"md"} shadow='md' radius={'sm'}>
                <Title order={3} mb={10}>Information</Title>
                    <Select
                      leftSection={<IconPingPong/>}
                      name="name"
                      label="Sport"
                      placeholder={"Gymnastique"}
                      value={values.name}
                      data={sportsList}
                      error={touched.name && errors.name}
                      onChange={(val) => {
                        setFieldValue(`name`, val);
                        setFieldValue('image', `/pictograms/${val}.avif`)
                      }}
                      style={{flex: 1}}
                      clearable
                      mb={10}
                    />
                    <Textarea
                      name="description"
                      label={"Description"}
                      value={values.description}
                      error={touched.description && errors.description}
                      onChange={handleChange}
                    />

                    <Group justify="flex-start" align="center" mt={"md"}>
                      <Select
                        leftSection={<IconTournament/>}
                        name="stage"
                        label="Étape"
                        placeholder={"Tour préliminaires"}
                        value={values.stage}
                        data={stageList}
                        error={touched.stage && errors.stage}
                        onChange={(val) => setFieldValue(`stage`, val)}
                        style={{flex: 1}}
                        clearable
                      />
                      <Select
                        leftSection={<IconUsers/>}
                        name="category"
                        label="Catégorie"
                        placeholder={"DUO"}
                        value={values.category}
                        data={[ProductCategory.SOLO, ProductCategory.DUO, ProductCategory.FAMILY]}
                        error={touched.category && errors.category}
                        onChange={(val) => setFieldValue(`category`, val)}
                        style={{flex: 1}}
                        clearable
                      />

                    </Group>
              </Paper>

              <Paper px={"lg"} py={"md"} shadow='md' radius={'sm'} mt={20}>
                <Title order={3} mb={10}>Date et horaires</Title>
                <DatePickerInput
                  locale={"fr"}
                  valueFormat="DD MMMM YYYY"
                  leftSection={<IconCalendar/>}
                  leftSectionPointerEvents="none"
                  label={"Date"}
                  value={values.date}
                  onChange={(val) => setFieldValue("date", val)}
                />
                <Group justify="flex-start" align="center" mt={"md"}>
                  <TimeInput
                    name="startTime"
                    label="Début"
                    ref={startClockRef}
                    leftSection={startTimeControl(startClockRef)}
                    onChange={(e) =>  setFieldValue("startTime", e.target.value)}
                    style={{flex: 1}}
                  />
                  <TimeInput
                    name="endTime"
                    label="Fin"
                    ref={endClockRef}
                    leftSection={startTimeControl(endClockRef)}
                    onChange={(e) =>  setFieldValue("endTime", e.target.value)}
                    style={{flex: 1}}

                  />
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={4}>
              <Paper px={"lg"} py={"md"} shadow='md' radius={'sm'}>
                <Title order={3} mb={10}>Statut</Title>
                <Select
                  leftSection={<IconUsers/>}
                  name="visible"
                  value={values.visible === true ? "Actif" : "Inactif"}
                  data={["Actif", "Inactif"]}
                  defaultValue={"Actif"}
                  error={touched.visible && errors.visible}
                  onChange={(val) => setFieldValue(`status`, val)}
                  style={{flex: 1}}
                />
              </Paper>
              <Paper px={"lg"} py={"md"} shadow='md' radius={'sm'} mt={20}>
                <Title order={3} mb={10}>Localisation</Title>

                <Select
                  name="city"
                  label={"Ville"}
                  placeholder={"Paris"}
                  leftSection={<IconMapPin/>}
                  value={values.city}
                  data={cityList}
                  error={touched.city && errors.city}
                  onChange={(val) => setFieldValue(`city`, val)}
                  style={{flex: 1}}
                />
                <Select
                  name="venue"
                  label={"Lieu"}
                  placeholder={"Stade de France"}
                  leftSection={<IconBuildingStadium/>}
                  value={values.venue}
                  data={venueList}
                  error={touched.venue && errors.venue}
                  onChange={(val) => setFieldValue(`venue`, val)}
                  style={{flex: 1}}
                />
              </Paper>

              <Paper px={"lg"} py={"md"} shadow='md' radius={'sm'} mt={20}>
                <Title order={3}>Prix et Stock</Title>
                <Group justify="flex-start" align="center" mt={"md"}>

                  <NumberInput
                    name="price"
                    label="Prix"
                    value={values.price}
                    error={touched.price && errors.price}
                    onChange={(val) => setFieldValue('price', val)}
                    suffix=" €"
                    allowDecimal={false}
                    thousandSeparator=" "
                    style={{flex: 1}}
                  />
                  <NumberInput
                    name="stock"
                    label="Stock"
                    value={values.stock}
                    error={touched.stock && errors.stock}
                    onChange={(val) => setFieldValue('stock', val)}
                    suffix=" places"
                    allowDecimal={false}
                    thousandSeparator=" "
                    style={{flex: 1}}
                  />
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>

        </Form>
      )
      }
    </Formik>
  );
});

export default ProductForm;