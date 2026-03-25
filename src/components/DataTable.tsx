import {
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

import type { MRT_ColumnDef } from "mantine-react-table";

type Props<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  loading?: boolean;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading,
}: Props<T>) {
  const table = useMantineReactTable({
    columns,
    data,

    state: {
      isLoading: loading,
    },

    enableColumnPinning: true,

    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },

    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,

    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
      withBorder: false,
    },

    // 🔥 THIS IS IMPORTANT
    mantineTableContainerProps: {
      style: {
        minHeight: "500px", // fixed height
        overflowY: "auto",
      },
    },
  });

  return <MantineReactTable table={table} />;
}