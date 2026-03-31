// import { useState } from "react";
// import "./MediaResultList";
// import MediaResultList from "./MediaResultList";
// import "./SearchBar.css";
// import "./AddToShelf";
// import AddToShelf from "./AddToShelf";
// function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("");

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       debounceSearch(e.target.value);
//     }
//   };

//   function handleSelectedItem(result) {
//     setSelectedItem(result);
//     console.log(result.id);
//     setIsPopupVisible(true);
//   }

//   const debounceSearch = async (searchInput) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/media/search?title=${searchInput}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       const searchResponse = await response.json();
//       if (response.ok) {
//         setData(searchResponse);
//       } else {
//         alert("Search Failed!");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div>
//       <div className="popup-info">
//         <input
//           placeholder="Search"
//           type="text"
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           value={query}
//         ></input>
//       </div>
//       <div>
//         <MediaResultList
//           data={data}
//           onselect={handleSelectedItem}
//         ></MediaResultList>
//       </div>
//       <div className="add-to-shelf">
//         {isPopupVisible && (
//           <AddToShelf
//             setIsPopupVisible={setIsPopupVisible}
//             selectedItem={selectedItem}
//           ></AddToShelf>
//         )}
//       </div>
//     </div>
//   );
// }
// export default SearchBar;
