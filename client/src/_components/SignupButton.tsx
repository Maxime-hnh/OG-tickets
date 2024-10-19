import {
  Button,
  Modal,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import SignupForm from "@/_components/SignupForm";

interface SignupButtonProps {
  grow?: boolean;
}

const SignupButton = ({grow = false}: SignupButtonProps) => {

  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Button
        variant="default"
        radius={"sm"}
        onClick={open}
        style={{flex: grow ? 1 : ""}}
      >
        S&apos;inscrire
      </Button>
      <Modal
        centered
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={"sm"}
      >
        <SignupForm/>
      </Modal>

    </>

  );
}

export default SignupButton;