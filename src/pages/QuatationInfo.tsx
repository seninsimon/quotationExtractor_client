import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api/api";

export default function Dashboard() {
  const { id } = useParams();
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/responses/quotation/${id}`);

      // sort by lowest amount
      const sorted = res.data.sort(
        (a: any, b: any) => (a.amount || 0) - (b.amount || 0)
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

      // update UI → only one selected
      setResponses((prev) =>
        prev.map((r) => ({
          ...r,
          status: r._id === responseId ? "selected" : "reviewed",
        }))
      );
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center py-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">
          Quotes
        </h2>

        {loading && (
          <p className="text-sm text-gray-500">Loading...</p>
        )}

        {!loading && responses.length === 0 && (
          <p className="text-gray-500 text-sm">
            No responses yet
          </p>
        )}

        {responses.map((r) => (
          <div
            key={r._id}
            className={`border border-[#D1D5DB] p-4 rounded space-y-3 transition ${
              r.status === "selected"
                ? "border-green-500 bg-green-50"
                : "hover:shadow-sm"
            }`}
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <p className="font-medium text-[#1F2937]">
                {r.supplierName || "Unknown Supplier"}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  r.status === "selected"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {r.status}
              </span>
            </div>

            {/* Contact */}
            <div className="text-sm text-gray-600 space-y-1">
              {r.email && <p>Email: {r.email}</p>}
              {r.contact && <p>Phone: {r.contact}</p>}
            </div>

            {/* Amount */}
            <p className="text-sm">
              Amount:{" "}
              <span className="font-semibold text-[#1F2937]">
                {r.amount ? `₹ ${r.amount}` : "Not provided"}
              </span>
            </p>

            {/* Quote */}
            {r.textQuote && (
              <p className="text-sm text-gray-600 border-l-2 pl-2">
                {r.textQuote}
              </p>
            )}

            {/* File */}
            {r.file && (
              <a
                href={`${import.meta.env.VITE_API_URL}/uploads/${r.file}`}
                target="_blank"
                className="text-blue-500 text-sm underline"
              >
                View Attachment
              </a>
            )}

            {/* Notes */}
            {r.notes && (
              <p className="text-xs text-gray-500">
                Notes: {r.notes}
              </p>
            )}

            {/* Timestamp */}
            <p className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleString()}
            </p>

            {/* Action */}
            {r.status !== "selected" && (
              <button
                onClick={() => selectQuote(r._id)}
                className="w-full bg-[#1F2937] text-white p-2 rounded hover:opacity-90"
              >
                Select Quote
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}