import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function QuotesList() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await API.get("/quotations");

        const sorted = res.data.sort(
          (a: any, b: any) =>
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center py-8">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">
          All Quotations
        </h2>

        {loading && (
          <p className="text-sm text-gray-500">Loading...</p>
        )}

        {!loading && quotes.length === 0 && (
          <p className="text-gray-500 text-sm">
            No quotations found
          </p>
        )}

        {!loading && quotes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Created Date</th>
                  <th className="p-3">Responses</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {quotes.map((q) => (
                  <tr
                    key={q._id}
                    className="border-b hover:bg-gray-50"
                  >
                    {/* Title */}
                    <td className="p-3 font-medium text-[#1F2937]">
                      {q.title}
                    </td>

                    {/* Date */}
                    <td className="p-3 text-gray-500 text-xs">
                      {new Date(q.createdAt).toLocaleString()}
                    </td>

                    {/* Response Count */}
                    <td className="p-3 text-gray-600">
                      {q.responseCount || 0}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      {q.selectedSupplier ? (
                        <div className="text-xs">
                          <span className="text-green-600 font-medium">
                            Selected
                          </span>
                          <div className="text-gray-500">
                            ₹ {q.selectedAmount} • {q.selectedSupplier}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Open
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/${q._id}`)
                        }
                        className="bg-[#1F2937] text-white px-3 py-1 rounded text-xs hover:opacity-90"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}