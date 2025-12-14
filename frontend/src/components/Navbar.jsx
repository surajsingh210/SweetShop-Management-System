import { useState } from "react";

export default function Navbar({ onSearch, onCategoryChange }) {
  const [search, setSearch] = useState("");
  const categories = [
    "All",
    "Sweets",
    "Snacks",
    "Cakes",
    "Pastry",
    "Cookies",
    "Chocolates",
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-3 gap-3">
        <h1 className="text-2xl font-bold text-pink-600">🍬 Sweet Shop</h1>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className="px-3 py-1 rounded-lg text-gray-700 hover:bg-pink-100 border border-gray-200"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search menu here"
            value={search}
            onChange={handleSearch}
            className="border rounded-lg p-2 focus:outline-pink-400"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
