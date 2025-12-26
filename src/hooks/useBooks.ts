import { useEffect, useState } from "react";
import { getBooks } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function useBooks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<any>(initialPage);

  const handlePrevPage = () =>
    setCurrentPage((prev: number) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev: number) => prev + 1);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => getBooks(currentPage),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  return {
    isLoading,
    error,
    books,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
}
