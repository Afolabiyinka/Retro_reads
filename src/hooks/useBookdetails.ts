import { getBookDetails } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useBookDetails(id: any) {
  const [bookDetails, setBookDetails] = useState();

  const {
    data: fetchedDetails,
    isLoading: detailsLoading,
    error: noDetails,
  } = useQuery({
    queryKey: ["book details", id],
    enabled: !!id,
    queryFn: () => getBookDetails(id),
  });

  useEffect(() => {
    if (fetchedDetails) {
      setBookDetails(fetchedDetails);
    }
  }, [fetchedDetails]);
  return {
    detailsLoading,
    noDetails,
    // bookDetails,
    fetchedDetails,
  };
}
