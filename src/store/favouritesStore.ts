import { BookType } from "@/types/types";
import { create } from "zustand";

type FavouritesStore = {
  favourites: BookType[];
  addTofavourites: (book: BookType) => void;
  removeFromFavourites: (id: number) => void;
  clearFavourites: () => void;
  isFavourite: (id: number) => boolean;
};
export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favourites: (() => {
    const storedFav = localStorage.getItem("favourites");
    return storedFav ? (JSON.parse(storedFav) as BookType[]) : [];
  })(),
  addTofavourites: (book) =>
    set((state) => {
      if (state.favourites.some((fav) => fav.id === book.id)) {
        return state;
      }

      const updated = [...state.favourites, book];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return { favourites: updated };
    }),
  removeFromFavourites: (id) =>
    set((state) => {
      const updated = state.favourites.filter((fav) => fav.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updated));

      return { favourites: updated };
    }),
  clearFavourites: () => {
    localStorage.removeItem("favourites");
    set({ favourites: [] });
  },
  isFavourite: (id) => {
    return get().favourites.some((fav) => fav.id === id);
  },
}));
