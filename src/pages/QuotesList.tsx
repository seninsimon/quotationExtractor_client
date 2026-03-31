import { useEffect, useMemo, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import  type { MRT_ColumnDef } from "mantine-react-table";
import { Button, Badge } from "@mantine/core";
import PageHeader from "../components/PageHeader";

type Quote = {
  _id: string;
  title: string;
  createdAt: string;
  responseCount: number;
  selectedSupplier?: string;
  selectedAmount?: number;
};

export default function QuotesList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await API.get("/quotations");

        const sorted = res.data.sort(
          (a: Quote, b: Quote) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setQuotes(sorted);
      } catch (err) {
        console.error("Failed to fetch quotations");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Quote>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        Cell: ({ cell }) =>
          new Date(cell.getValue<string>()).toLocaleString(),
      },
      {
        accessorKey: "responseCount",
        header: "Responses",
      },
      {
        header: "Status",
        Cell: ({ row }) => {
          const q = row.original;

          return q.selectedSupplier ? (
            <div>
              <Badge color="green">Selected</Badge>
              <div className="text-xs text-gray-500">
                ₹ {q.selectedAmount} • {q.selectedSupplier}
              </div>
            </div>
          ) : (
            <Badge color="gray">Open</Badge>
          );
        },
      },
      {
        header: "Action",
        Cell: ({ row }) => (
          <Button
            size="xs"
            onClick={() => navigate(`/quatation/${row.original._id}`)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <>
    <PageHeader title="Quotations" />
    <div className=" bg-[#F9FAFB] flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm space-y-4">
        <DataTable columns={columns} data={quotes} loading={loading} />
      </div>
    </div>
    </>
  );
}