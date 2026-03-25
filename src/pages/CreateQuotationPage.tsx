import { useState } from "react";
import { API } from "../api/api";

export default function CreateQuotation() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    const res = await API.post("/quotations", { title });
    setLink(res.data.shareLink);
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-[#1F2937]">
        Create Quotation
      </h2>

      <input
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-[#1F2937] text-white p-2 rounded"
      >
        Generate Link
      </button>

      {link && (
        <div className="text-sm">
          <p>Share this link:</p>
          <a className="text-blue-500" href={link}>
            {link}
          </a>
        </div>
      )}
    </div>
  );
}