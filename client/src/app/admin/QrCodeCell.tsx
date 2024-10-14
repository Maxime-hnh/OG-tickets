import {orderService} from "@/_services/order.service";
import {FetchedOrder} from "@/_objects/Order";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconForbid, IconZoomInFilled} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useQuery} from "react-query";
import {ActionIcon, Group, Image, Loader, Modal, Tooltip} from "@mantine/core";
import React from "react";

const QrCodeCell = (order: FetchedOrder) => {

  const fetchQrCode = async (orderId: number) => {
    const qrCodeBlob = await orderService.getQrCode(orderId);
    return URL.createObjectURL(qrCodeBlob);
  };

  const scanQrCode = async () => {
    const response = await orderService.scanQrCode({
      userId: order.user!.id,
      finalKey: order.finalKey
    })
    if (response.ok) {
      notifications.show({
        icon: <IconCheck/>,
        color: "green",
        position: "bottom-right",
        title: "QR code valide",
        message: `${await response.text()}`
      })
    } else {
      notifications.show({
        icon: <IconForbid/>,
        color: "red",
        position: "bottom-right",
        title: "QR code non valide",
        message: ""
      })
    }
  }
  const [opened, {open, close}] = useDisclosure(false);
  const {data: qrCodeUrl, isLoading} = useQuery(['qrCode', order.id], () => fetchQrCode(order.id), {
    suspense: true
  });
  if (isLoading) {
    return <Loader size="sm"/>;
  }
  return (
    <>
      <Group align={"flex-start"} gap={2}>
        <Tooltip label={"Vérifier le qrcode"} position="right-end" offset={8}>
          <Image
            style={{cursor: "pointer"}}
            alt="QR Code"
            src={qrCodeUrl}
            w={50}
            h={50}
            onClick={() => scanQrCode()}
          />
        </Tooltip>
        <ActionIcon onClick={open} radius={"xl"} size={"sm"}>
          <IconZoomInFilled size={15}/>
        </ActionIcon>
      </Group>
      <Modal title={order.invoice} opened={opened} onClose={close} centered withCloseButton={false}>
        <Image
          m={"auto"}
          alt="QR Code"
          src={qrCodeUrl}
          w={250}
          h={250}
        />
      </Modal>
    </>
  );
};

export default QrCodeCell;