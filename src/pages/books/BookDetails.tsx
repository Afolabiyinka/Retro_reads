import { useParams, useNavigate } from "react-router-dom";
import { BookType } from "@/types/types";
import LoadingContainer from "@/components/loading/loadingContainer";
import useBookDetails from "@/hooks/useBookdetails";
import Chip from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, ChevronLeft, Heart } from "lucide-react";
import { useFavourites } from "@/hooks/useFavourites";
import { toast, Toaster } from "sonner";
const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTofavourites, favourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const bookId = Number(id);
  const { fetchedDetails, detailsLoading, noDetails } = useBookDetails(bookId);

  if (detailsLoading) {
    return <LoadingContainer />;
  }

  if (noDetails) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: {noDetails.message}
      </div>
    );
  }

  if (!fetchedDetails) {
    return (
      <div className="p-4 text-center">Book not found or data is missing.</div>
    );
  }

  const book: BookType = fetchedDetails;
  const coverUrl = fetchedDetails.formats["image/jpeg"];
  const bookUrl = fetchedDetails.formats["text/html"];

  const bookInFavorites = isFavourite(book.id);

  function handleFavouriteClick() {
    if (!book) return;
    if (bookInFavorites) {
      removeFromFavourites(book.id);
      toast("Book removed from favourites");
    } else {
      addTofavourites(book);
      toast("Book added to favourites");
    }
  }

  return (
    <div className="min-h-screen p-1 lg:pt-16">
      <div className="w-full  mt-20 md:mt-0">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <Button onClick={() => navigate(-1)} className="" size={`lg`}>
              {/* <ChevronLeft className="w-6 h-6" /> */}
              Go Back
            </Button>
            <span className="text-lg text-gray-600">
              {book.download_count} Downloads
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto lg:max-w-none rounded-lg shadow-md object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                {book.authors[0].name}
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  mb-4 md:mb-6">
                {book.title}
              </h1>
              <div className="mb-6 md:mb-8">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                  Categories
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {book.bookshelves.map((fullCategoryText: string) => {
                    let cleanedText = fullCategoryText
                      .replace("Categories:", "")
                      .trim();

                    const lastColonIndex = cleanedText.lastIndexOf(":");
                    if (lastColonIndex !== -1) {
                      cleanedText = cleanedText
                        .substring(lastColonIndex + 1)
                        .trim();
                    }

                    return <Chip key={fullCategoryText} text={cleanedText} />;
                  })}
                </div>
              </div>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                  Summary of the story
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {book.summaries}
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <a href={bookUrl} target="_blank">
                  <Button className="" size="lg">
                    Read Now
                  </Button>
                </a>

                <Button
                  size={`icon-lg`}
                  onClick={handleFavouriteClick}
                  className={` shadow rounded-full ${
                    bookInFavorites ? "" : ""
                  }`}
                >
                  <Bookmark
                    className="w-8 h-8 text-inherit"
                    fill={`${bookInFavorites ? "white" : "none"}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default BookDetails;
