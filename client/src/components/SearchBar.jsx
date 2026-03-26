import { useState } from "react";
function SearchBar() {
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      debounceSearch(e.target.value);
    }
  };

  const debounceSearch = async (searchInput) => {
    try {
      const response = await fetch(
        `http://localhost:3000/media/search?title=${searchInput}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        alert("Search Failed!");
      }
    } catch (err) {
      console.log(err);
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
