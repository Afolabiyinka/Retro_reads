import React from "react";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NAVICONS } from "@/libs/nav";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="w-full p-3 flex justify-between items-center shadow fixed z-50 bg-white">
      {/* Logo Section */}
      <Link to={`/`}>
        <div className="flex items-center p-2 gap-3 rounded-xl cursor-pointer">
          <Book />
          <h1 className="text-xl font-extrabold capitalize  tracking-widest">
            RetroReads
          </h1>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {NAVICONS.map(({ path, icon: Icon }) => (
          <Link to={path}>
            <Button
              size={`icon-lg`}
              className="rounded-full stroke-[5px]"
              variant={`${location.pathname === path ? "default" : "outline"}`}
            >
              <Icon />
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
