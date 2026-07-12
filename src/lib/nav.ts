import { Bookmark, House, Library, Search } from "lucide-react";

const NAVICONS = [
  {
    path: "/",
    icon: House,
    label: "Home",
  },
  {
    path: "/books",
    icon: Library,
    label: "Library",
  },
  {
    path: "/search",
    icon: Search,
    label: "Search",
  },
  {
    path: "/favourites",
    icon: Bookmark,
    label: "Saved",
  },
];

export { NAVICONS };