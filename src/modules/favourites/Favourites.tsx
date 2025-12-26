import BookCard from "@/components/books/BookCard";
import { useFavourites } from "@/hooks/useFavourites";
import { BookType } from "@/types/types";
const Favourites = () => {
  const { favourites } = useFavourites();
  return (
    <div className="flex flex-col gap-4 justify-center items-center pt-24  p-2">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Books you want to read
      </h1>
      <div className="grid md:grid-cols-4 w-full h-full gap-12 overflow-x-scroll p-6">
        {favourites.map((book: BookType) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
