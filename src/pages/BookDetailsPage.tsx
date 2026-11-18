import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook } from "../api";
import BookCover from "../components/BookCover";
import type { Book } from "../types";

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBook(Number(id))
      .then(setBook)
      .catch(() => setError("Book not found"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!book) return;
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    try {
      await deleteBook(book.id);
      navigate("/");
    } catch {
      setError("Could not delete the book");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error || !book) return <p>{error || "Book not found"}</p>;

  return (
    <div>
      <div className="detail">
        <BookCover id={book.id} title={book.title} author={book.author} />
        <div className="detail-info">
          <h2>{book.title}</h2>
          <p>{book.author} · {book.year}</p>
          <p>{book.genre} · {book.pages} pages</p>
          <p>{book.description}</p>
          <p className={book.available ? "status available" : "status checked-out"}>
            {book.available ? "Available" : "Not available"}
          </p>
          <div className="actions">
            <Link className="button-link" to={`/books/${book.id}/edit`}>
              Edit
            </Link>
            <button className="button-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <Link className="back-link" to="/">← Back to catalog</Link>
    </div>
  );
}

export default BookDetailsPage;