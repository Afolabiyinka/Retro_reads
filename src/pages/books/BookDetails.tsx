import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  HeartOff,
  Share2,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { BookType } from "@/types/types";
import useBookDetails from "@/hooks/useBookdetails";
import { useFavouritesStore } from "@/store/favouritesStore";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loading/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const { addTofavourites, removeFromFavourites, isFavourite } =
    useFavouritesStore();

  const bookId = Number(id);
  const { fetchedDetails, detailsLoading, noDetails } = useBookDetails(bookId);

  if (detailsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <Loader />
      </div>
    );
  }

  if (noDetails || !fetchedDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-parchment font-serif">
        <BookOpen size={40} className="text-aged" />
        <h2 className="text-xl">Book not found</h2>
        <p className="text-sm text-faded">
          We couldn't find the book you're looking for.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go back
        </Button>
      </div>
    );
  }

  const book: BookType = fetchedDetails;

  const coverUrl = book.formats["image/jpeg"];
  const bookUrl = book.formats["text/html"];
  const bookInFavorites = isFavourite(book.id);

  const author = book.authors?.[0]?.name || "Unknown Author";
  const summary = book.summaries || "No summary available for this book.";
  const categories = book.bookshelves || [];

  const handleFavouriteClick = () => {
    if (bookInFavorites) {
      removeFromFavourites(book.id);
      toast("Removed from your saved books");
    } else {
      addTofavourites(book);
      toast("Added to your saved books");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Book link copied!");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  return (
    <main className="min-h-screen bg-parchment text-ink font-serif">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-16">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-faded/40 pb-5 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-faded hover:text-ink transition-colors"
          >
            <ArrowLeft size={17} />
            Back to books
          </button>

          <button
            onClick={handleShare}
            aria-label="Share book"
            className="p-2 rounded-full hover:bg-aged/10 transition-colors"
          >
            <Share2 size={19} />
          </button>
        </div>

        {/* Main Book Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <aside className="flex flex-col items-center md:items-start">
            {/* Book Cover */}
            <div className="w-full max-w-[280px] aspect-[2/3] rounded-xl overflow-hidden bg-aged/10 shadow-xl shadow-ink/10">
              <img
                src={coverUrl || "/fallback-book.png"}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Actions */}
            <div className="w-full max-w-[280px] mt-6 flex flex-col gap-3">
              {bookUrl ? (
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full h-12 bg-aged hover:bg-aged/90 text-parchment rounded-lg">
                    <BookOpen size={17} />
                    Read this book
                    <ArrowUpRight size={16} className="ml-auto" />
                  </Button>
                </a>
              ) : (
                <Button disabled className="w-full h-12">
                  Reading link unavailable
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleFavouriteClick}
                className="w-full h-12  rounded-lg"
              >
                {bookInFavorites ? (
                  <>
                    <HeartOff size={17} />
                    Remove from saved books
                  </>
                ) : (
                  <>
                    <Bookmark size={17} />
                    Save to my books
                  </>
                )}
              </Button>
            </div>

            {/* Download Information */}
            <div className="w-full max-w-[280px] mt-6 border-t border-faded/40 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-faded">
                  <Download size={16} />
                  Total downloads
                </span>
                <span className="font-semibold tabular-nums">
                  {book.download_count?.toLocaleString() || "—"}
                </span>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <section className="min-w-0">
            {/* Author */}
            <p className="text-aged italic text-base md:text-lg mb-2">
              {author}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight mb-5">
              {book.title}
            </h1>

            {/* Book Availability */}
            <div className="inline-flex items-center gap-2 rounded-md bg-aged/10 px-3 py-2 text-xs text-aged mb-6">
              <span className="w-2 h-2 rounded-full bg-aged" />
              Available in the RetroReads library
            </div>

            {/* Description */}
            <div className="mb-9">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm uppercase tracking-[0.15em] text-faded">
                  About this book
                </h2>

                <span className="text-xs text-faded">#{book.id}</span>
              </div>

              <p
                className={`text-sm md:text-base leading-7 text-ink/85 whitespace-pre-line ${
                  !expanded ? "line-clamp-6" : ""
                }`}
              >
                {summary}
              </p>

              {summary.length > 350 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 mt-3 text-sm font-semibold text-aged hover:text-ink transition-colors"
                >
                  {expanded ? "Show less" : "Show more"}
                  {expanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              )}
            </div>

            {/* Genres */}
            {categories.length > 0 && (
              <div className="mb-9">
                <h2 className="text-sm uppercase tracking-[0.15em] text-faded mb-4">
                  Genres & Categories
                </h2>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category: string) => (
                    <span
                      key={category}
                      className="px-3 py-2 rounded-full border border-aged/30 text-xs md:text-sm text-ink/80 hover:bg-aged/10 transition-colors"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Book Information */}
            <div className="border-t border-b border-faded/40 py-6">
              <h2 className="text-sm uppercase tracking-[0.15em] text-faded mb-5">
                Book information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                <div>
                  <p className="text-xs text-faded mb-1">Book title</p>
                  <p className="text-sm">{book.title}</p>
                </div>

                <div>
                  <p className="text-xs text-faded mb-1">Author</p>
                  <p className="text-sm">{author}</p>
                </div>

                <div>
                  <p className="text-xs text-faded mb-1">Gutenberg ID</p>
                  <p className="text-sm">#{book.id}</p>
                </div>

                <div>
                  <p className="text-xs text-faded mb-1">Downloads</p>
                  <p className="text-sm tabular-nums">
                    {book.download_count?.toLocaleString() || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 p-5 md:p-6 rounded-xl bg-aged/5 border border-aged/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Ready to start reading?</h3>
                <p className="text-sm text-faded mt-1">
                  Discover your next favourite story.
                </p>
              </div>

              {bookUrl && (
                <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-aged hover:bg-aged/90 text-parchment">
                    Start reading
                    <ArrowUpRight size={16} />
                  </Button>
                </a>
              )}
            </div>
          </section>
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
    </main>
  );
};

export default BookDetails;
