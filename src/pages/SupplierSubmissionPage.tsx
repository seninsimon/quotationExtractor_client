import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../api/api";
import { showNotification } from "@mantine/notifications";
import { Upload } from "lucide-react";

export default function SubmitQuote() {
  const { shareId } = useParams();

  const [form, setForm] = useState({
    supplierName: "",
    email: "",
    contact: "",
    amount: "",
    notes: "",
    textQuote: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.supplierName) return "Supplier name required";
    if (!form.email) return "Email required";
    if (!form.amount) return "Amount required";
    if (!form.textQuote) return "Quotation details required";
    if (!form.contact) return "Contact number required";

    return null;
  };

  const submit = async () => {
    const error = validate();
    if (error) {
      showNotification({
        title: "Validation Error",
        message: error,
        color: "red",
      });
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (file) data.append("file", file);

      await API.post(`/responses/${shareId}`, data);

      alert("Submitted Successfully!");

      setForm({
        supplierName: "",
        email: "",
        contact: "",
        amount: "",
        notes: "",
        textQuote: "",
      });
      setFile(null);
    } catch {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#1F2937]">
            Submit Your Quote
          </h1>
          <p className="text-sm text-gray-500">
            Please fill the details below to respond to this request
          </p>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Supplier Info */}
          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium">Supplier Name *</label>
              <input
                value={form.supplierName}
                onChange={(e) => handleChange("supplierName", e.target.value)}
                placeholder="Enter your name or company"
                className="w-full mt-1 border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="example@email.com"
                  className="w-full mt-1 border border-[#D1D5DB] p-2 rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contact</label>
                <input
                  value={form.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  placeholder="Phone number"
                  className="w-full mt-1 border border-[#D1D5DB] p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* Quote Info */}
          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium">Amount (₹) *</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="Enter your quote amount"
                className="w-full mt-1 border border-[#D1D5DB] p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Detailed Quotation</label>
              <textarea
                value={form.textQuote}
                onChange={(e) => {
                  handleChange("textQuote", e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                placeholder="Explain your quotation (pricing breakdown, timeline, etc.)"
                className="w-full mt-1 border border-[#D1D5DB] p-2 rounded resize-none overflow-hidden"
                style={{ minHeight: "120px" }}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Attachment
            </label>

            <label className="flex items-center justify-between border border-[#D1D5DB] rounded px-3 py-2 cursor-pointer hover:shadow-sm transition">
              {/* Left side */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Upload size={16} className="text-gray-400" />
                <span>{file ? file.name : "Upload file"}</span>
              </div>

              {/* Right side */}
              <span className="text-xs text-gray-400">Browse</span>

              {/* Hidden input */}
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any extra information..."
              className="w-full mt-1 border border-[#D1D5DB] p-2 rounded"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-[#1F2937] text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Submitting..." : "Submit Quote"}
        </button>
      </div>
    </div>
  );
}
