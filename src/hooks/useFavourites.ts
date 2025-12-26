import { useFavouritesStore } from "@/store/favouritesStore";
import { BookType } from "@/types/types";

export const useFavourites = () => {
  const { favourites, addTofavourites, removeFromFavourites, isFavourite } =
    useFavouritesStore();

  return {
    addTofavourites,
    favourites,
    removeFromFavourites,
    isFavourite,
  };
};
