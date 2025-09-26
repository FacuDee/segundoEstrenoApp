import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de búsqueda
    alert(`Buscar: ${query}`);
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" placeholder="Buscar..." value={query} onChange={handleChange} />
      <button className="search-button" type="submit">
        <FaSearch />
      </button>
    </form>
  );
};
export default SearchBar;