import { NavLink } from "react-router-dom";
import { FileText, Aperture, X, Menu } from "lucide-react";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: Props) {
  const linkBase =
    "flex items-center gap-3 p-2 rounded-md text-sm transition-colors";
  const linkActive = "bg-gray-200 font-medium text-[#1F2937]";
  const linkInactive = "text-gray-600 hover:bg-gray-100";

  return (
    <div
      className={`bg-white border-r fixed h-full transition-all duration-300 z-40 ${
        isOpen ? "w-60 p-4" : "w-16 p-2"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <h2 className="font-semibold text-[#1F2937] text-lg">
            Quotations
          </h2>
        )}

        <button
          onClick={toggle}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <FileText size={18} />
          {isOpen && "Create Quote"}
        </NavLink>

        <NavLink
          to="/quotes"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <Aperture size={18} />
          {isOpen && "View Quotes"}
        </NavLink>
      </nav>
    </div>
  );
}