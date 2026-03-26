import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
    }
  };

  return (
    <div className="popup-info">
      <input
        placeholder="Search"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        value={query}
      ></input>
    </div>
  );
}
export default SearchBar;
