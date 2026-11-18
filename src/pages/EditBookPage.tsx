import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../api";
import BookForm from "../components/BookForm";
import type { Book } from "../types";

function EditBookPage() {
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

  if (loading) return <p>Loading...</p>;
  if (error || !book) return <p>{error || "Book not found"}</p>;

  return (
    <div>
      <h2>Edit book</h2>
      <BookForm
        initialValues={book}
        submitLabel="Save changes"
        onSubmit={async (values) => {
          await updateBook(book.id, values);
          navigate(`/books/${book.id}`);
        }}
      />
    </div>
  );
}

export default EditBookPage;