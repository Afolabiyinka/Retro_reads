import BookCard from "@/components/books/BookCard";
import type { BookType } from "@/types/types";
import useBooks from "@/hooks/useBooks";
import LoadingContainer from "@/components/loading/loadingContainer";
import Pagination from "@/components/ui/pagination";
import { Frown } from "lucide-react";

const Books = () => {
  const {
    books,
    error,
    isLoading,
    currentPage,
    handleNextPage,
    handlePrevPage,
  } = useBooks();

  return (
    <div className="flex justify-center flex-col items-center">
      {isLoading ? (
        <LoadingContainer />
      ) : error ? (
        <div className="h-screen w-full  flex items-center gap-3   flex-col justify-center">
          <Frown size={200} className="animate-bounce" />
          <h1 className="text-2xl md:text-5xl">
            {" "}
            Failed to connect to our servers
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-5 p-10 pt-28 gap-8 h-full w-screen overflow-y-scroll">
          {books.map((book: BookType) => (
            <BookCard book={book} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

export default Books;
