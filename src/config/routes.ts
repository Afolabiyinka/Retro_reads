import BookDetails from "@/modules/books/BookDetails";
import Books from "@/modules/books/Books";
import Layout from "@/modules/Layout";
import Notfound from "@/modules/app/Notfound";
import SearchPage from "@/modules/search/SearchPage";
import type { RouteObject } from "react-router-dom";
import Home from "@/modules/app/Home";
import Favourites from "@/modules/favourites/Favourites";

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
