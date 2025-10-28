import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { set } from "mongoose";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productsPage?search=${encodeURIComponent(query.trim())}`);
    }
    // setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-64">
      <input
        type="text"
        placeholder="Search products or shops..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white px-4 py-2 rounded-full ml-1 hover:bg-blue-800 transition"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
