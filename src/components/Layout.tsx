
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-[#F9FAFB]">

      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />


      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-60" : "ml-16"
        }`}
      >
        <Navbar />

        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}