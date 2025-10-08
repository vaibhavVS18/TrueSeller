import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");

  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const params = {};

      if (filters.query) params.search = filters.query;
      if (filters.category) params.category = filters.category;
      if (filters.shop) params.shop = filters.shop;

      const res = await axios.get("/api/products", { params });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("❌ Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get("/api/products");
      const allProducts = res.data.products || [];

      const uniqueCategories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
      const uniqueShops = [];
      allProducts.forEach((p) => {
        if (p.shop?._id && !uniqueShops.some((s) => s.id === p.shop._id)) {
          uniqueShops.push({ id: p.shop._id, shopname: p.shop.shopname });
        }
      });

      setCategories(uniqueCategories);
      setShops(uniqueShops);
    } catch (err) {
      console.error("❌ Error fetching filters:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts({ query, category, shop });
  }, [query, category, shop]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts({ query, category, shop });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 md:px-8">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center gap-3 mb-3 max-w-3xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
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

        <select
          value={shop}
          onChange={(e) => setShop(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Shops</option>
          {shops.map((s) => (
            <option key={s.id} value={s.id}>
              {s.shopname}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
            to={`/product/${product._id}`}
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
            >
              {/* Image with hover zoom */}
              <div className="overflow-hidden h-40 rounded-lg mb-3">
                <img
                  src={product.images?.[0] || "/vite.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>

              {/* Name + Price */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
              </div>

              {/* Category & Shop */}
              <div className="mt-auto pt-2 text-sm text-gray-500 border-t">
                <p className="hover:text-gray-800 transition-colors">
                  Category: {product.category || "—"}
                </p>
                <p className="hover:text-gray-800 font-bold text-gray-450 transition-colors">
                  Shop: {product.shop?.shopname || "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
