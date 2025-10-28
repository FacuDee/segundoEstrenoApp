import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/prendas?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/prendas");
    }
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