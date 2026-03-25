import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* Sidebar */}
      <div className="w-60 bg-white border-r p-4 space-y-4">
        <h2 className="font-semibold text-[#1F2937] text-lg">
          Quotations
        </h2>

        <Link to="/" className="block hover:bg-gray-100 p-2 rounded">
          Create Quote
        </Link>

        <Link to="/quotes" className="block hover:bg-gray-100 p-2 rounded">
          View Quotes
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}