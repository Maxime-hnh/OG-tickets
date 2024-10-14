import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import React, {useMemo} from 'react';
import {MRT_Localization_FR} from 'mantine-react-table/locales/fr/index.cjs';
import {FetchedOrder} from "@/_objects/Order";
import {QueryClient, QueryClientProvider} from "react-query";
import QrCodeCell from "@/app/admin/QrCodeCell";

interface OrdersTableProps {
  orders: FetchedOrder[];
  isLoading: boolean;
}

const queryClient = new QueryClient();

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