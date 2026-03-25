import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api/api";
import DataTable from "../components/DataTable";
import type { MRT_ColumnDef } from "mantine-react-table";
import { Button, Badge } from "@mantine/core";
import { confirmAction } from "../utils/confirm";
import PageHeader from "../components/PageHeader";

type Response = {
  _id: string;
  supplierName: string;
  email?: string;
  contact?: string;
  amount?: number;
  textQuote?: string;
  file?: string;
  notes?: string;
  status: string;
  createdAt: string;
};

export default function QuatationInfo() {
  const { id } = useParams();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/responses/quotation/${id}`);

      const sorted = res.data.sort(
        (a: Response, b: Response) => (a.amount || 0) - (b.amount || 0),
      );

      setResponses(sorted);
    } catch (err) {
      console.error("Failed to fetch responses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [id]);

  const selectQuote = async (responseId: string) => {
    try {
      await API.put(`/responses/${responseId}/status`, {
        status: "selected",
      });

      setResponses((prev) =>
        prev.map((r) => ({
          ...r,
          status: r._id === responseId ? "selected" : "reviewed",
        })),
      );
    } catch (err) {
      alert("Failed to update");
    }
  };

  const columns = useMemo<MRT_ColumnDef<Response>[]>(
    () => [
      {
        accessorKey: "supplierName",
        header: "Supplier",
      },
      {
        header: "Contact",
        Cell: ({ row }) => (
          <div className="text-xs">
            {row.original.email && <div>{row.original.email}</div>}
            {row.original.contact && <div>{row.original.contact}</div>}
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        Cell: ({ cell }) =>
          cell.getValue<number>() ? `₹ ${cell.getValue<number>()}` : "N/A",
      },
      {
        accessorKey: "textQuote",
        header: "Quote",
      },
      {
        header: "Attachment",
        Cell: ({ row }) =>
          row.original.file ? (
            <a
              href={`${import.meta.env.VITE_API_URL}/uploads/${row.original.file}`}
              target="_blank"
              className="text-blue-500 underline text-xs"
            >
              View
            </a>
          ) : (
            "-"
          ),
      },
      {
        header: "Status",
        Cell: ({ row }) => (
          <Badge color={row.original.status === "selected" ? "green" : "gray"}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
      },
      {
        id: "actions", // 🔥 REQUIRED for pinning
        header: "Action",
        Cell: ({ row }) =>
          row.original.status !== "selected" ? (
            <Button
              size="xs"
              onClick={() =>
                confirmAction({
                  title: "Select Quote",
                  message: "Are you sure you want to select this quote?",
                  confirmText: "Select",
                  cancelText: "Cancel",
                  onConfirm: () => selectQuote(row.original._id),
                })
              }
            >
              Select
            </Button>
          ) : (
            "Selected"
          ),
      },
    ],
    [],
  );

  return (
    <>
      <PageHeader
        title="Quotes"
      />
      <div className="min-h-screen  flex justify-center py-8">
        <div className="w-full max-w-6xl  rounded-lg shadow-sm space-y-4">

          <DataTable columns={columns} data={responses} loading={loading} />
        </div>
      </div>
    </>
  );
}
