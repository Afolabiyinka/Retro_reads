import BookCard from "@/components/books/BookCard";
import type { BookType } from "@/types/types";
import useBooks from "@/hooks/useBooks";
import Pagination from "@/components/ui/pagination";
import Loader from "@/components/loading/Loader";

const Books = () => {
  const {
    books,
    error,
    isLoading,
    currentPage,
    handleNextPage,
    handlePrevPage,
    refetch,
  } = useBooks();

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col  gap-10 items-center justify-center font-serif italic text-aged">
        <Loader />

        Accessing archive records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center font-serif text-center border border-faded bg-parchment p-6">
        <h1 className="text-2xl md:text-4xl mb-4">
          Archive Connection Failed
        </h1>

        <p className="text-sm text-faded italic mb-6">
          Unable to retrieve manuscripts at this time.
        </p>

        <button
          onClick={() => refetch()}
          className="border border-aged px-5 py-2 hover:bg-aged hover:text-parchment transition"
        >
          Retry Access
        </button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[85%] mx-auto mt-24 font-serif">

      {/* Page Header */}
      <div className="mb-10 border-b border-faded pb-4 text-center">
        <h1 className="text-3xl md:text-5xl tracking-wide">
          Archive Catalog
        </h1>
        <p className="text-sm text-faded italic mt-2">
          Collection of preserved literary works
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ">
        {books?.map((book: BookType) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center border-t border-faded pt-4 text-sm">
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default Books;