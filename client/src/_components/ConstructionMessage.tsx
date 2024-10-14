import {Image, Container, Title, Text, Button, SimpleGrid} from '@mantine/core';
import styles from './ConstructionMessage.module.scss';
import {Dispatch, SetStateAction} from "react";
import {useRouter} from "next/navigation";

interface ConstructionMessageProps {
  buttonMessage: string;
  setSegmentValue?: Dispatch<SetStateAction<string>>;
}

const ConstructionMessage = ({buttonMessage, setSegmentValue}: ConstructionMessageProps) => {

  const router = useRouter();

  return (
    <Container className={styles.root}>
      <SimpleGrid spacing={{base: 40, sm: 80}} cols={{base: 1, sm: 2}}>
        <Image src={"/builder.svg"} className={styles.mobileImage}/>
        <div>
          <Title className={styles.title}>Bientôt disponible...</Title>
          <Text c="dimmed" size="lg" ta={"justify"}>
            Nos équipes travaillent activement à l'enrichissement du site pour vous offrir une expérience
            toujours plus complète et agréable. Nous vous invitons à revenir prochainement pour découvrir toutes les
            nouveautés. Merci de votre patience et à très bientôt !
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={styles.control}
            onClick={() => setSegmentValue ? setSegmentValue("productsTable") : router.push("/admin")}
          >
            {buttonMessage}
          </Button>

        </div>
        <Image src={"/builder.svg"} className={styles.desktopImage}/>
      </SimpleGrid>
    </Container>
  )
}
export default ConstructionMessage;