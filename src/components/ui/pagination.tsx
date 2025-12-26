import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  maxPages?: number;
}
const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  maxPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-6 justify-center py-4">
      {/* Previous Button */}
      <Button
        onClick={handlePrevPage}
        color="secondary"
        variant="outline"
        // isCircular
        disabled={currentPage === 1}
        className="disabled:bg-gray-400 px-5 py-1 rounded-3xl"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <p className="pointer-events-none">{currentPage}</p>

      {/* Next Button */}
      <Button
        onClick={handleNextPage}
        color="secondary"
        variant="outline"
        disabled={currentPage === maxPages}
        className="disabled:bg-gray-400 px-5 py-1 rounded-3xl "
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Pagination;
