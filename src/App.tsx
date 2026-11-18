import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddBookPage from "./pages/AddBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import CatalogPage from "./pages/CatalogPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="/add" element={<AddBookPage />} />
      </Routes>
    </div>
  );
}

export default App;