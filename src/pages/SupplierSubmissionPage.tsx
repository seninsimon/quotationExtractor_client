import { useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../api/api";

export default function SubmitQuote() {
  const { shareId } = useParams();

  const [form, setForm] = useState({
    supplierName: "",
    email: "",
    contact: "",
    amount: "",
    notes: "",
    textQuote: ""
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
    return null;
  };

  const submit = async () => {
    const error = validate();
    if (error) return alert(error);

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (file) data.append("file", file);

      await API.post(`/responses/${shareId}`, data);

      alert("Submitted Successfully!");

      // reset form
      setForm({
        supplierName: "",
        email: "",
        contact: "",
        amount: "",
        notes: "",
        textQuote: ""
      });
      setFile(null);
    } catch (err) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">
          Submit Quote
        </h2>

        {/* Supplier Name */}
        <input
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={(e) => handleChange("supplierName", e.target.value)}
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* Contact */}
        <input
          placeholder="Contact Number"
          value={form.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* Text Quote */}
        <textarea
          placeholder="Quotation Details (optional)"
          value={form.textQuote}
          onChange={(e) =>
            handleChange("textQuote", e.target.value)
          }
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="w-full"
        />

        {/* Notes */}
        <textarea
          placeholder="Additional Notes (optional)"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="w-full border border-[#D1D5DB] p-2 rounded focus:shadow-sm"
        />

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-[#1F2937] text-white p-2 rounded hover:opacity-90"
        >
          {loading ? "Submitting..." : "Submit Quote"}
        </button>
      </div>
    </div>
  );
}