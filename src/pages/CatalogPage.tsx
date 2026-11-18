import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookList from "../components/BookList";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import type { SortOption } from "../components/SortSelect";
import type { Book } from "../types";

function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState<SortOption>("title");

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setError("Could not load books"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const genres = Array.from(new Set(books.map((book) => book.genre))).sort();

  const visibleBooks = books
    .filter((book) => {
      const text = `${book.title} ${book.author}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesGenre = genre === "" || book.genre === genre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sort === "year-asc") return a.year - b.year;
      if (sort === "year-desc") return b.year - a.year;
      if (sort === "pages") return a.pages - b.pages;
      return a.title.localeCompare(b.title);
    });

  return (
    <div>
      <h2>Catalog</h2>
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <BookList books={visibleBooks} />
    </div>
  );
}

export default CatalogPage;