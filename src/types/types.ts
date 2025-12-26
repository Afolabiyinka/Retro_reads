export type BookType = {
  title: string;
  summaries: [];
  download_count: number;
  bookshelves: [];
  formats: {
    [key: string]: string;
  };
  id: number;
  authors: [
    {
      name: string;
      birth_year: number;
      death_year: number;
    }
  ];
};
