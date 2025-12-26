import { searchBook } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useSearch(query: any) {
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: noResults,
  } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => searchBook(query),
    enabled: !!query,
  });

  useEffect(() => {
    if (searchResults) {
      console.log("Fetched results:", searchResults);
    }
  }, [searchResults]);
  return { searchResults, searchLoading, noResults };
}
