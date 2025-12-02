import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../config/axios.js";
import Loader from "../components/common/Loader.jsx";
import { UserContext } from "../context/user.context.jsx";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import ImageCarousel from "../components/product/ImageCarousel.jsx";
import { ShoppingCart, Package, Heart, Loader2 } from "lucide-react";
import { CartContext } from "../context/cart.context.jsx";
import { ModalContext } from "../context/modal.context.jsx";
import UpdateProductFormModal from "../components/product/UpdateProductFormModal.jsx";

export default function Product() {
  const { productId } = useParams();
  const { user, loading: userLoading } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const { setIsLoginOpen } = useContext(ModalContext);

  const [isOwner, setIsOwner] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    tags: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!userLoading) fetchProduct();
    if (user) fetchWishlist();
  }, [productId, user, userLoading]);

  useEffect(() => {
    if (product) {
      setProductForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        category: product.category || "",
        tags: product.tags ? product.tags.join(", ") : "",
        images: product.images || [],
      });
      
      // Fetch similar products when product is loaded
      if (product.category) {
        fetchSimilarProducts(product.category);
      }
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data.product);
      if (res.data.product.shop.owner === user._id) setIsOwner(true);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category) => {
    try {
      setLoadingSimilar(true);
      const res = await axios.get("/api/products", {
        params: { category }
      });
      // Filter out the current product from similar products
      const filtered = res.data.products.filter(p => p._id !== productId);
      setSimilarProducts(filtered);
    } catch (err) {
      console.error("Error fetching similar products:", err);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        tags: productForm.tags.split(",").map((t) => t.trim()),
      };
      const res = await axios.put(`/api/products/${productId}`, payload);
      setProduct(res.data.product);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files.length) return;
    try {
      setUploading(true);
      const urls = [];
      for (const file of e.target.files) {
        const url = await uploadImageToCloudinary(file);
        urls.push(url);
      }
      setProductForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/wishlists");
      setWishlist(res.data?.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      setWishlistLoading(productId);
      const res = await axios.post("/api/wishlists/toggle", { productId });

      setWishlist((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        } else {
          return [...prev, productId];
        }
      });
    } catch (err) {
      console.log("Error toggling wishlist: ", err.response?.data || err);
    } finally {
      setWishlistLoading(null);
    }
  };

  if (loading || userLoading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      {/* Main Product Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {/* Image Carousel */}
            <div className="bg-white rounded-xl shadow-lg p-3">
              <ImageCarousel product={product} />
            </div>

            {/* Product Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden">
              {/* Background Logo */}
              {product.images?.[0] && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                />
              )}
              
              {/* Action Buttons Row */}
              <div className="flex justify-between items-start mb-3 relative z-10">
                {isOwner && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 px-3 py-1 text-sm font-medium transition"
                  >
                    Update ✏️
                  </button>
                )}
                
                <button
                  onClick={() => {
                    user ? toggleWishlist(product._id) : setIsLoginOpen(true);
                  }}
                  disabled={wishlistLoading === product._id}
                  className={`ml-auto flex items-center justify-center rounded-full p-2 transition-all duration-200 border-2 border-emerald-400
                    ${wishlist.includes(product._id) ? "bg-emerald-50" : "bg-white"} 
                    hover:bg-emerald-100 disabled:opacity-70`}
                >
                  {wishlistLoading === product._id ? (
                    <Loader2 size={18} className="animate-spin text-emerald-500" />
                  ) : (
                    <Heart
                      size={20}
                      color="#10B981"
                      fill={wishlist.includes(product._id) ? "#10B981" : "none"}
                    />
                  )}
                </button>
              </div>

              {/* Product Name */}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Price Badge */}
              <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg mb-3">
                <span className="text-xl font-bold">₹{product.price}</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-3 pb-3 border-b">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="text-gray-900 font-semibold">{product.category || "General"}</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <p className="text-yellow-500 font-semibold">⭐ {product.rating?.toFixed(1) || "0.0"}</p>
                </div>

                <div>
                  <span className="text-gray-600">Stock:</span>
                  <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock}` : 'Out'}
                  </p>
                </div>

                {product.shop && (
                  <div>
                    <span className="text-gray-600">Shop:</span>
                    <Link to={`/shop/${product.shop._id}`} className="text-emerald-600 hover:text-emerald-700 font-semibold underline block truncate">
                      {product.shop.shopname}
                    </Link>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">About:</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    user ? addToCart(product, product.shop?._id) : setIsLoginOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-cyan-700 transition shadow-md"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>

                <Link
                  to={user ? "/cartPage" : "#"}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition shadow-md"
                  onClick={(e) => {
                    if (user) {
                      addToCart(product, product.shop?._id);
                    } else {
                      e.preventDefault();
                      setIsLoginOpen(true);
                    }
                  }}
                >
                  <Package size={18} />
                  <span>Place Order</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden lg:flex gap-6 xl:gap-8 h-[calc(100vh-8rem)]">
            {/* Left: Image Carousel */}
            <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-hidden">
              <ImageCarousel product={product} />
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 bg-white rounded-xl shadow-lg p-6 relative overflow-y-auto">
              {/* Action Buttons */}
              <div className="flex justify-between items-start mb-4">
                {isOwner && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2 font-medium transition"
                  >
                    Update ✏️
                  </button>
                )}

                <button
                  onClick={() => {
                    user ? toggleWishlist(product._id) : setIsLoginOpen(true);
                  }}
                  disabled={wishlistLoading === product._id}
                  className={`ml-auto flex items-center justify-center rounded-full p-2 transition-all duration-200 border-2 border-emerald-400
                    ${wishlist.includes(product._id) ? "bg-emerald-50" : "bg-white"} 
                    hover:bg-emerald-100 disabled:opacity-70`}
                >
                  {wishlistLoading === product._id ? (
                    <Loader2 size={20} className="animate-spin text-emerald-500" />
                  ) : (
                    <Heart
                      size={22}
                      color="#10B981"
                      fill={wishlist.includes(product._id) ? "#10B981" : "none"}
                    />
                  )}
                </button>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price Badge */}
              <div className="inline-block bg-emerald-100 text-emerald-800 px-5 py-2 rounded-lg mb-4">
                <span className="text-2xl font-bold">₹{product.price}</span>
              </div>

              {/* Info Grid */}
              <div className="space-y-3 mb-4 pb-4 border-b-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Category:</span>
                  <span className="text-gray-900 font-semibold">{product.category || "General"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Rating:</span>
                  <span className="text-yellow-500 font-semibold">⭐ {product.rating?.toFixed(1) || "0.0"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Stock:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                  </span>
                </div>

                {product.shop && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Shop:</span>
                    <Link
                      to={`/shop/${product.shop._id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold underline"
                    >
                      {product.shop.shopname}
                    </Link>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">About this product:</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    user ? addToCart(product, product.shop?._id) : setIsLoginOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-cyan-700 transition shadow-md"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <Link
                  to={user ? "/cartPage" : "#"}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition shadow-md"
                  onClick={(e) => {
                    if (user) {
                      addToCart(product, product.shop?._id);
                    } else {
                      e.preventDefault();
                      setIsLoginOpen(true);
                    }
                  }}
                >
                  <Package size={20} />
                  <span>Place Order</span>
                </Link>
              </div>

              {/* Owner Section - Desktop */}
              {isOwner && (
                <div className="mt-6 pt-6 border-t">
                  <h2 className="text-lg font-bold mb-3 text-gray-800">Owner Section</h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-emerald-500 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-600 transition font-medium"
                  >
                    Update Product
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            Similar Products
          </h2>

          {loadingSimilar ? (
            <Loader />
          ) : similarProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No similar products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <div
                  key={similarProduct._id}
                  className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
                >
                  <button
                    onClick={() => {
                      user ? toggleWishlist(similarProduct._id) : setIsLoginOpen(true);
                    }}
                    disabled={wishlistLoading === similarProduct._id}
                    className={`absolute top-3 right-3 z-20 cursor-pointer 
                                flex items-center justify-center 
                                rounded-full p-1 transition-colors duration-200 border border-emerald-400
                                ${wishlist.includes(similarProduct._id) ? "bg-gray-100" : "bg-gray-100"} 
                                hover:bg-emerald-100 disabled:opacity-70`}
                  >
                    {wishlistLoading === similarProduct._id ? (
                      <Loader2 size={18} className="animate-spin text-emerald-500" />
                    ) : (
                      <Heart
                        size={22}
                        color={wishlist.includes(similarProduct._id) ? "#33c292ff" : "#10B981"}
                        fill={wishlist.includes(similarProduct._id) ? "#33c292ff" : "none"}
                      />
                    )}
                  </button>

                  <Link to={`/product/${similarProduct._id}`}>
                    {/* Image with hover zoom */}
                    <div className="overflow-hidden h-40 rounded-lg mb-3">
                      <img
                        src={similarProduct.images?.[0] || "/vite.svg"}
                        alt={similarProduct.name}
                        className="w-full h-48 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>

                    {/* Name + Price */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="truncate font-semibold text-gray-900 text-lg hover:text-emerald-600 transition-colors">
                        {similarProduct.name}
                      </h3>
                      <p className="text-emerald-600 font-bold text-lg">
                        ₹{similarProduct.price}
                      </p>
                    </div>

                    {/* Category & Shop */}
                    <div className="flex items-start justify-between mt-auto pt-2 text-sm text-gray-500 border-t">
                      <div className="flex-1 min-w-0 pr-3">
                        <p className="truncate hover:text-gray-800 transition-colors">
                          Category: {similarProduct.category || "—"}
                        </p>
                        <p className="truncate hover:text-gray-800 font-bold text-gray-450 transition-colors">
                          Shop: {similarProduct.shop?.shopname || "—"}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          user ? addToCart(similarProduct, similarProduct.shop?._id) : setIsLoginOpen(true);
                        }}
                        className="flex items-center gap-2 border border-cyan-600 text-cyan-700 
                                  hover:bg-cyan-600 hover:text-white hover:shadow-lg hover:border-white
                                  font-medium px-4 py-2 rounded-full transition-all duration-300 
                                  hover:-translate-y-0.5 active:scale-95 shrink-0"
                      >
                        <span>Add to Cart</span>
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      <UpdateProductFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        productForm={productForm}
        handleProductFormChange={handleProductFormChange}
        handleUpdateProduct={handleUpdateProduct}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
        setProductForm={setProductForm}
      />
    </div>
  );
}