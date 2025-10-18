import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(8); // products per page
  const [totalPages, setTotalPages] = useState(1);


  // Fetch shops with optional filters
  const fetchShops = async (filters = {}) => {
    try {
      setLoading(true);
      const params = {page, limit};
      if (filters.query) params.search = filters.query;
      if (filters.category) params.category = filters.category;
      if (filters.city) params.city = filters.city;

      const res = await axios.get("/api/shops", { params });
      setShops(res.data.shops || []);
      setTotalPages(res.data.pagination?.totalPages || 1);

    } catch (err) {
      console.error("❌ Error fetching shops:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options (categories + cities)
  const fetchFilters = async () => {
    try {
      const res = await axios.get("/api/shops");
      const allShops = res.data.shops || [];

      // Extract unique categories
      const uniqueCategories = [...new Set(allShops.map((s) => s.category).filter(Boolean))];

      // Extract unique cities
      const uniqueCities = [...new Set(allShops.map((s) => s.city).filter(Boolean))];

      setCategories(uniqueCategories);
      setCities(uniqueCities);
    } catch (err) {
      console.error("❌ Error fetching filters:", err.message);
    }
  };

  // Initial load
  useEffect(() => {
    fetchShops();
    fetchFilters();
  }, []);

  // Refetch shops whenever filters change
  useEffect(() => {
    setPage(1);
    fetchShops({ query, category, city });
  }, [query, category, city]);

  useEffect(() => {
    fetchShops({ query, category, city });
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchShops({ query, category, city });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 md:px-8">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-row items-center gap-3 mb-3 max-w-3xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search shops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
        />
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-lg shadow bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition w-auto"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* City Filter */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Cities</option>
          {cities.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Shops Grid */}
      {loading ? (
        <Loader/>
      ) : shops.length === 0 ? (
        <p className="text-center text-gray-500">No shops found.</p>
      ) : (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {shops.map((shop) => (
            <Link
            to={`/shop/${shop._id}`}
              key={shop._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
            >
              {/* Shop Logo */}
              <div className="overflow-hidden rounded-lg h-50 flex items-center justify-center bg-gray-100">
                <img
                  src={shop.logo || "/default-shop.png"}
                  alt={shop.shopname}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>

              {/* Shop Name + Rating */}
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 transition-colors">
                  {shop.shopname}
                </h3>
                <p className="text-yellow-500 font-bold">{shop.rating.toFixed(1)}★</p>
              </div>

              {/* Category & City */}
              <div className="mt-auto pt-2 text-sm text-gray-500 border-t">
                <p className="hover:text-gray-800 transition-colors">
                  Category: {shop.category || "—"}
                </p>
                <p className="hover:text-gray-800 transition-colors font-semibold text-base text-gray-450">
                  City: {shop.city || "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>

                        {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </>
      )}
    </div>
  );
}
