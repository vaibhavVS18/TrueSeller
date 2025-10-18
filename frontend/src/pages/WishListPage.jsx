import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { Heart, Loader2 } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  //  Fetch wishlist products
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/wishlists/wishlistdata"); // Adjust if endpoint differs
      setWishlist(res.data?.products || []);
    } 
    catch (err) {
      console.error("Error fetching wishlist:", err);
    } 
    finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      setWishlistLoading(productId);
      await axios.post("/api/wishlists/toggle", { productId });
      // Remove product locally
      setWishlist((prev) =>
        prev.filter((p) => p._id !== productId)
      );
    } catch (err) {
      console.error("Error removing product:", err);
    } finally {
      setWishlistLoading(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
        <div className="flex justify-center items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-cyan-600">
                My Wishlist
            </h2>
                <Heart
                  size={25}
                  color="#33c292ff"   // emerald
                  fill="#33c292ff"        // cyan
                />
        </div>


      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          Your wishlist is empty. <Link to="/productsPage" className="text-cyan-600 text-lg hover:underline">Browse products</Link>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
            >
              {/* Heart button to remove */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                disabled={wishlistLoading === product._id}
                className={`absolute top-3 right-3 z-20 cursor-pointer 
                            flex items-center justify-center 
                            rounded-full p-1 transition-all duration-200 border border-emerald-400
                            bg-cyan-100 hover:bg-cyan-200 disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {wishlistLoading === product._id ? (
                  <Loader2 size={18} className="animate-spin text-emerald-500" />
                ) : (
                  <Heart
                    size={22}
                    color="#33c292ff"  // emerald-500
                    fill="#33c292ff"    // cyan-400
                  />
                )}
              </button>

              <Link to={`/product/${product._id}`}>
                <div className="overflow-hidden h-40 rounded-lg mb-3">
                  <img
                    src={product.images?.[0] || "/vite.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-emerald-600 font-bold text-lg">
                    ₹{product.price}
                  </p>
                </div>

                <div className="mt-auto pt-2 text-sm text-gray-500 border-t">
                  <p>Category: {product.category || "—"}</p>
                  <p className="font-bold text-gray-600">
                    Shop: {product.shop?.shopname || "—"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
