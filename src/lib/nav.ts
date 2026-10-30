
import {
  HouseIcon,
  BooksIcon,
  MagnifyingGlassIcon,
  BookmarkSimpleIcon,
} from "@phosphor-icons/react";

const NAVICONS = [
  {
    path: "/",
    icon: HouseIcon,
    label: "Home",
  },
  {
    path: "/books",
    icon: BooksIcon,
    label: "Library",
  },
  {
    path: "/search",
    icon: MagnifyingGlassIcon,
    label: "Search",
  },
  {
    path: "/favourites",
    icon: BookmarkSimpleIcon,
    label: "Saved",
  },
];

export { NAVICONS };
