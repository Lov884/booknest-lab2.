export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  pages: number;
  description: string;
  available: boolean;
}

export type BookFormValues = Omit<Book, "id">;