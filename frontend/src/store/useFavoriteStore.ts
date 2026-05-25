import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoriteStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "favorites-storage", // имя ключа в localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
