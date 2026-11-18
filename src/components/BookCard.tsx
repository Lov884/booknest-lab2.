import { Link } from "react-router-dom";
import type { Book } from "../types";
import BookCover from "./BookCover";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <li className="book-card">
      <Link to={`/books/${book.id}`} tabIndex={-1} aria-hidden="true">
        <BookCover id={book.id} title={book.title} author={book.author} />
      </Link>
      <h3>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h3>
      <p>{book.author} · {book.year}</p>
      <p>{book.genre} · {book.pages} pages</p>
      <p className={book.available ? "status available" : "status checked-out"}>
        {book.available ? "Available" : "Not available"}
      </p>
    </li>
  );
}

export default BookCard;