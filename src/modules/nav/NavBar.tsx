import React from "react";
import { Book, Search, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full p-3 flex justify-between items-center shadow fixed z-50 bg-white">
      {/* Logo Section */}
      <Link to={`/`}>
        <div className="flex items-center p-2 gap-3 rounded-xl cursor-pointer">
          <Book />
          <h1 className="text-xl font-extrabold capitalize font-[Lora] tracking-widest">
            RetroReads
          </h1>
        </div>
      </Link>

      <Link className="md:text-xl cursor-pointer" to={`/books`}>
        Books
      </Link>
      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <Link to={`/search`}>
          <Button className="rounded-full" variant={`outline`}>
            <Search />
          </Button>
        </Link>

        {/* Favorites Button */}
        <Link to={`/favourites`}>
          <Button className="rounded-full">
            <Bookmark />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
