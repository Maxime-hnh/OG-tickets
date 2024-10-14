import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import {useMemo} from 'react';
import {FetchedProduct} from "@/_objects/Product";
import {MRT_Localization_FR} from 'mantine-react-table/locales/fr/index.cjs';

interface ProductsTableProps {
  products: FetchedProduct[];
  isLoading: boolean;
}

const ProductsTable = ({products, isLoading}: ProductsTableProps) => {

  const columns = useMemo<MRT_ColumnDef<FetchedProduct>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Sport',
      },
      {
        accessorKey: 'category',
        header: 'Catégorie',
      },
      {
        accessorKey: 'stock',
        header: 'Places disponible',
      },
      {
        accessorKey: 'quantitySold',
        header: 'Quantité vendue',
      },
      {
        accessorKey: 'price',
        header: 'Prix unitaire',
      },
      {
        header: "Chiffre d'affaires",
        accessorFn: (row) => `${(row.price! * row.quantitySold!).toFixed(2)} €`,
      },
    ], []);


  const table = useMantineReactTable({
    columns,
    data: products,
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
  return <MantineReactTable key={products.length} table={table}/>;
};

export default ProductsTable;