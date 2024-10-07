import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import React, {useMemo} from 'react';
import {MRT_Localization_FR} from 'mantine-react-table/locales/fr/index.cjs';
import {FetchedOrder} from "@/_objects/Order";
import {ActionIcon, Group, Image, Loader, Modal, Tooltip} from "@mantine/core";
import {orderService} from "@/_services/order.service";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconForbid, IconZoomInFilled} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";

interface OrdersTableProps {
  orders: FetchedOrder[];
  isLoading: boolean;
}

const queryClient = new QueryClient();

const fetchQrCode = async (orderId: number) => {
  const qrCodeBlob = await orderService.getQrCode(orderId);
  return URL.createObjectURL(qrCodeBlob);
};

const QrCodeCell = (order: FetchedOrder) => {

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

const OrdersTable = ({orders, isLoading}: OrdersTableProps) => {

    const columns = useMemo<MRT_ColumnDef<FetchedOrder>[]>(
      () => [
        {
          accessorKey: 'invoice',
          header: 'Référence',
        },
        {
          accessorKey: 'amount',
          header: 'Montant',
        },
        {
          accessorKey: 'qrCode',
          header: 'Places disponible',
          Cell: ({row}) => QrCodeCell(row.original)

        },
      ], []);


    const table = useMantineReactTable({
      columns,
      data: orders,
      localization: MRT_Localization_FR,
      enableEditing: false,
      enableRowActions: false,
      enableColumnFilters: false,
      enableRowSelection: false,
      enableFilters: false,
      enableHiding: false,
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      columnResizeMode: 'onEnd',
      enablePagination: true,
      enableRowOrdering: false,
      enableStickyHeader: false,
      enableBottomToolbar: true,
      enableGrouping: false,
      enableColumnPinning: false,
      positionActionsColumn: 'last',
      state: {
        isLoading: isLoading
      },
      defaultColumn: {
        enableGrouping: false,
        enableColumnDragging: false,
        enableResizing: true,

      },
      mantineTableProps: {
        withColumnBorders: true,
        highlightOnHover: true,
      },
      mantinePaginationProps: {
        rowsPerPageOptions: ['5', '10', '20', '30'],
        withEdges: true
      },
      paginationDisplayMode: 'pages',
      initialState: {
        columnPinning: {
          right: ['mrt-row-actions']
        },
      },
      mantineTableHeadCellProps: {
        style: {
          padding: '0.5em',
          backgroundColor: '#fafafa',
        }
      },
      mantineTableBodyCellProps: {
        style: {
          padding: '0.5em'
        }
      }
    });
    return <QueryClientProvider client={queryClient}>
      <MantineReactTable key={orders.length} table={table}/>
    </QueryClientProvider>
  }
;

export default OrdersTable;