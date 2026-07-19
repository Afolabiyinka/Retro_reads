import React, { useState } from "react";
import { Book, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { NAVICONS } from "@/lib/nav";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 px-4 md:px-10 py-6 font-serif bg-white">
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
        <div className="hidden md:flex items-center gap-1 text-sm">
          {NAVICONS.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path} className="relative px-6 py-2">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 1,
                      }}
                    />
                  )}

                  <motion.span
                    className={`relative z-10 flex gap-2 items-center ${isActive ? "text-foreground" : ""}`}
                  >
                    <Icon size={16} />
                    {label}
                  </motion.span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden border border-faded p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 border-t border-faded pt-3 flex flex-col gap-2 text-sm">
          {NAVICONS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className="relative px-2 py-2"
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 1,
                      }}
                    />
                  )}

                  <motion.span
                    className={`relative z-10 flex gap-2 items-center ${isActive ? "text-foreground" : ""}`}
                  >
                    <Icon size={16} />
                    {label}
                  </motion.span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
