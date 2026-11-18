import { useNavigate } from "react-router-dom";
import { createBook } from "../api";
import BookForm from "../components/BookForm";

function AddBookPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Add a book</h2>
      <BookForm
        submitLabel="Add book"
        onSubmit={async (values) => {
          const book = await createBook(values);
          navigate(`/books/${book.id}`);
        }}
      />
    </div>
  );
}

export default AddBookPage;