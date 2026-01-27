import BookDetails from "@/pages/books/BookDetails";
import Books from "@/pages/books/Books";
import Layout from "@/pages/Layout";
import Notfound from "@/pages/app/Notfound";
import SearchPage from "@/pages/search/SearchPage";
import type { RouteObject } from "react-router-dom";
import Home from "@/pages/app/Home";
import Favourites from "@/pages/favourites/Favourites";

export const routes: RouteObject[] = [
  {
    path: "/",

    Component: Layout,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "favourites",
        Component: Favourites,
      },
      {
        path: "books",
        index: true,
        Component: Books,
      },
      {
        path: "search",
        Component: SearchPage,
      },
      {
        path: "book/:id",
        Component: BookDetails,
      },
      {
        path: "*",
        Component: Notfound,
      },
    ],
  },
];
