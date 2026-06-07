import { useParams, useNavigate } from "react-router-dom";
import { BookType } from "@/types/types";
import useBookDetails from "@/hooks/useBookdetails";
import { useFavourites } from "@/hooks/useFavourites";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Bookmark, HeartOff } from "lucide-react";
import Loader from "@/components/loading/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addTofavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const bookId = Number(id);
  const { fetchedDetails, detailsLoading, noDetails } =
    useBookDetails(bookId);

  if (detailsLoading) {
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-aged">
        <Loader />
      </div>
    );
  }

  if (noDetails) {
    return (
      <div className="h-screen flex items-center justify-center font-serif text-center">
        <p>Archive record unavailable.</p>
      </div>
    );
  }

  if (!fetchedDetails) {
    return (
      <div className="h-screen flex items-center justify-center font-serif">
        Record not found.
      </div>
    );
  }

  const book: BookType = fetchedDetails;
  const coverUrl = book.formats["image/jpeg"];
  const bookUrl = book.formats["text/html"];
  const bookInFavorites = isFavourite(book.id);

  function handleFavouriteClick() {
    if (bookInFavorites) {
      removeFromFavourites(book.id);
      toast("Removed from archive");
    } else {
      addTofavourites(book);
      toast("Saved to archive");
    }
  }

  return (
    <div className="min-h-screen bg-parchment text-ink font-serif p-6 mt-12">

      <div className="max-w-5xl mx-auto border border-faded p-6">

        {/* Header */}
        <div className="flex  flex-col md:flex-row justify-between items-center border-b border-faded pb-3 mb-6">
          <Button
            variant={`outline`}
            size={`lg`}
            onClick={() => navigate(-1)}
          >
            ← Return
          </Button>

          <p className="text-sm text-faded italic">
            Record #{book.id} · {book.download_count} accesses
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="border border-faded p-3 bg-parchment">
            <img
              src={coverUrl || "/fallback-book.png"}
              alt={book.title}
              className="w-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="italic text-aged mb-2">
              {book.authors[0]?.name || "Unknown Author"}
            </p>

            <h1 className="text-3xl md:text-4xl mb-4 tracking-wide">
              {book.title}
            </h1>

            {/* Categories */}
            <div className="mb-6">
              <h2 className="text-sm uppercase tracking-wide mb-2 text-faded">
                Classification
              </h2>

              <div className="flex flex-wrap gap-2">
                {book.bookshelves.map((cat: string) => (
                  <span
                    key={cat}
                    className="border border-faded px-2 py-1 text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-sm uppercase tracking-wide mb-2 text-faded">
                Description
              </h2>

              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {book.summaries || "No description available."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row items-center gap-3 mt-8">

              <a href={bookUrl} target="_blank" className="">
                <Button
                  variant={`secondary`}
                  className="border"
                  size={`lg`}

                >
                  Read Book →
                </Button>
              </a>

              <Button
                size={`lg`}
                onClick={handleFavouriteClick}
              // className="w-full"
              >
                {bookInFavorites ? <HeartOff /> : <Bookmark />}
                {bookInFavorites ? "Remove" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Toaster
        closeButton
        position="top-center"
        toastOptions={{
          className:
            "font-serif border border-faded bg-parchment text-ink rounded-none shadow-none",
        }}
      />
    </div>
  );
};

export default BookDetails;