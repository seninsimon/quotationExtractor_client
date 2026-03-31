
export default function Navbar() {
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-[#1F2937] text-lg">
        Ociuz
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>Admin</span>
      </div>
    </div>
  );
}