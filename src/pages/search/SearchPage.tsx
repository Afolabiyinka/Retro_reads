import React, { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import LoadingContainer from "@/components/loading/loadingContainer";
import { BookType } from "@/types/types";
import BookCard from "@/components/books/BookCard";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/modern-ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setBouncedQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const { searchLoading, noResults, searchResults } = useSearch(debouncedQuery);

  if (noResults) {
    return <div>An error occurred: {noResults.message}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center border pt-24 px-4 md:px-10 lg:px-20">
      <div className="w-full max-w-3xl mb-6">
        <Button onClick={() => navigate("/books")}>
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <div className="relative w-full mb-12">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for your book here"
          className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="w-full">
        {searchLoading ? (
          <LoadingContainer />
        ) : searchResults?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {searchResults.map((book: BookType) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">No books found</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
