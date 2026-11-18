import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>BookNest</h1>
      <nav>
        <NavLink to="/">Catalog</NavLink>
        <NavLink to="/add">Add book</NavLink>
      </nav>
    </header>
  );
}

export default Header;