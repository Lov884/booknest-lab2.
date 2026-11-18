import type { Book } from "../types";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  );
}

export default BookList;