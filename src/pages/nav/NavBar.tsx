import React, { useState } from "react";
import { Book, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAVICONS } from "@/lib/nav";

const NavBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-white border-b border-faded px-4 md:px-6 py-3 font-serif">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to={`/`}>
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
            <Book className="text-aged" size={18} />
            <h1 className="text-base md:text-xl tracking-widest">
              RetroReads Archive
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {NAVICONS.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;

            return (
              <Link key={path} to={path}>
                <div
                  className={`flex items-center gap-2 px-3 py-1 border transition ${isActive
                      ? "border-aged text-aged"
                      : "border-transparent hover:border-faded"
                    }`}
                >
                  <Icon size={16} />
                  <span className="uppercase tracking-wide">
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-faded p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 border-t border-faded pt-3 flex flex-col gap-2 text-sm">
          {NAVICONS.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;

            return (
              <Link key={path} to={path} onClick={() => setOpen(false)}>
                <div
                  className={`flex items-center gap-2 px-3 py-2 border ${isActive
                      ? "border-aged text-aged"
                      : "border-transparent"
                    }`}
                >
                  <Icon size={16} />
                  <span className="uppercase tracking-wide">
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default NavBar;