import BookCard from "@/components/books/BookCard";
import { useFavourites } from "@/hooks/useFavourites";
import { BookType } from "@/types/types";

const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <div className="min-h-screen bg-parchment text-ink font-serif pt-24 px-6">

      {/* Header */}
      <div className="text-center border-b border-faded pb-4 mb-10">
        <h1 className="text-3xl md:text-5xl tracking-wide">
          Saved Works
        </h1>
        <p className="text-sm text-faded italic mt-2">
          A personal collection of archived readings
        </p>
      </div>

      {/* Empty State */}
      {favourites.length === 0 ? (
        <div className="text-center text-faded italic mt-20">
          No saved books in your archive.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favourites.map((book: BookType) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;