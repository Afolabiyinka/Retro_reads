export async function getBooks(page = 1) {
  const url = `https://gutendex.com/books/?page=${page}`;

  const result = await fetch(url);
  const response = await result.json();
  return response.results;
}
export async function getBookDetails(id: number | undefined) {
  const url = `https://gutendex.com/books/${id}`;

  const result = await fetch(url);
  const response = await result.json();
  return response;
}

export async function searchBook(query: string) {
  const url = `https://gutendex.com/books/?search=${query}`;
  const result = await fetch(url);
  const response = await result.json();
  return response.results;
}
