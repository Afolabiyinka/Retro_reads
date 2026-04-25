import { Archive, Bookmark, House, Search } from "lucide-react";

const NAVICONS = [
  {
    path: "/",
    icon: House,
    label: "Home",
  },
  {
    path: "/books",
    icon: Archive,
    label: "Archive",
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