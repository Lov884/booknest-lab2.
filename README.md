# BookNest (Lab 2)

A single-page book catalog built with React and TypeScript. It continues the BookNest site from Lab 1.

## Features

- Book catalog loaded from a REST API
- Search by title or author
- Filter by genre
- Sorting by title, year or number of pages
- Book details page (dynamic route `/books/:id`)
- Add, edit and delete books, with form validation
- Loading, error and empty states

## Technologies

React, TypeScript, Vite, React Router, json-server, Git and GitHub

## Project structure

- `src/types.ts` - Book types
- `src/api.ts` - API functions (GET, POST, PUT, DELETE)
- `src/components/` - BookCard, BookList, SearchBar, GenreFilter, SortSelect, Header, BookForm
- `src/pages/` - CatalogPage, BookDetailsPage, AddBookPage, EditBookPage
- `db.json` - data for json-server (20 books)

## Routes

| Address | Page |
|---|---|
| `/` | Catalog |
| `/books/:id` | Book details |
| `/books/:id/edit` | Edit a book |
| `/add` | Add a book |

## How to run

1. Install dependencies: `npm install`
2. Start the API in one terminal: `npm run server` (runs on http://localhost:3001)
3. Start the site in a second terminal: `npm run dev` (runs on http://localhost:5173)

## Author

Abiyel Okoye, group Bi 24-1