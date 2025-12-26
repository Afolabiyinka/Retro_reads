import { useFavouritesStore } from "@/store/favouritesStore";

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
