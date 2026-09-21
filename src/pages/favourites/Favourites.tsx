import BookCard from "@/components/books/BookCard";
import { useFavourites } from "@/hooks/useFavourites";
import { BookType } from "@/types/types";

const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <div className="min-h-screen bg-parchment text-ink font-serif pt-24 px-6">
      {/* Header */}
      <div className="text-center border-b border-faded pb-4 mb-10">
        <h1 className="text-3xl md:text-5xl tracking-wide">Your saved books</h1>
        <p className="text-sm text-faded italic mt-2">
          Your personal collection of books to revisit
        </p>
      </div>

      {/* Empty State */}
      {favourites.length === 0 ? (
        <div className="text-center text-faded italic mt-20">
          You haven’t saved any books yet.
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
