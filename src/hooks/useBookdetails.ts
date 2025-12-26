import { getBookDetails } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

export default function useBookDetails(id: number | string) {
  const {
    data: fetchedDetails,
    isLoading: detailsLoading,
    error: noDetails,
  } = useQuery({
    queryKey: ["book details", id],
    enabled: !!id,
    queryFn: () => getBookDetails(id),
  });

  return {
    detailsLoading,
    noDetails,
    fetchedDetails,
  };
}
