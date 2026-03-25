import { useState } from "react";
import { API } from "../api/api";
import { Copy, Check } from "lucide-react";

export default function CreateQuotation() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    const res = await API.post("/quotations", { title });
    setLink(res.data.shareLink);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#1F2937]">
        Create Quotation
      </h2>

      <input
        className="w-full border border-[#D1D5DB] p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-[#1F2937] text-white p-2 rounded hover:opacity-90 transition"
      >
        Generate Link
      </button>

      {link && (
        <div className="text-sm space-y-2">
          <p className="text-gray-600">Share this link:</p>

          <div className="flex items-center border border-[#D1D5DB] rounded px-3 py-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-blue-500 truncate"
            >
              {link}
            </a>

            <button
              onClick={handleCopy}
              className="ml-2 p-1 rounded hover:bg-gray-100 transition"
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}