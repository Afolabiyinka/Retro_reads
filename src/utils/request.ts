import { BookType } from "@/types/types";

export async function getBooks(page: number = 1): Promise<BookType[]> {
  const url = `https://gutendex.com/books/?page=${page}`;

  const result = await fetch(url);
  const response = await result.json();
  return response.results;
}
export async function getBookDetails(id: number | string): Promise<BookType> {
  const url = `https://gutendex.com/books/${id}`;

  const result = await fetch(url);
  const response = await result.json();
  return response;
}

export async function searchBook(query: string): Promise<BookType[]> {
  const url = `https://gutendex.com/books/?search=${query}`;
  const result = await fetch(url);
  const response = await result.json();
  return response.results;
}
