import { Link } from "react-router-dom";
import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <li className="book-card">
      <h3>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h3>
      <p>{book.author} · {book.year}</p>
      <p>{book.genre} · {book.pages} pages</p>
      <p>{book.available ? "Available" : "Not available"}</p>
    </li>
  );
}

export default BookCard;