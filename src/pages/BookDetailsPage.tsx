import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook } from "../api";
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
      <Link to="/">← Back to catalog</Link>
      <h2>{book.title}</h2>
      <p>{book.author} · {book.year}</p>
      <p>{book.genre} · {book.pages} pages</p>
      <p>{book.description}</p>
      <p>{book.available ? "Available" : "Not available"}</p>
      <Link to={`/books/${book.id}/edit`}>Edit</Link>
      {" | "}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default BookDetailsPage;