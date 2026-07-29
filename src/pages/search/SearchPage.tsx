import React, { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import { BookType } from "@/types/types";
import BookCard from "@/components/books/BookCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Loader from "@/components/loading/Loader";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const { searchLoading, noResults, searchResults } = useSearch(debouncedQuery);

  if (noResults) {
    return (
      <div className="h-screen flex items-center justify-center font-serif">
        Search system unavailable.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-ink font-serif px-6 pt-24">
      {/* Header */}
      <div className="max-w-md mx-auto mb-10 border-b border-faded pb-4 space-y-3">
        <Button onClick={() => navigate("/books")}>← Back to library</Button>

        <h1 className="text-3xl md:text-5xl tracking-wide">Archive Search</h1>

        <p className="text-sm text-faded italic mt-2">
          Query the literary database
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-12 relative">
        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-faded" /> */}

        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search archive records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto w-full">
        {" "}
        {searchLoading ? (
          <div className="text-center italic text-faded">
            <Loader />
          </div>
        ) : searchResults?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border border-faded p-6 w-full">
            {" "}
            {searchResults.map((book: BookType) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center text-faded italic py-20">
            No matching records found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
