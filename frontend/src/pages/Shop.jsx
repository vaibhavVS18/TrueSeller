import { useState, useEffect, useContext } from "react";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import { Link } from "react-router-dom";
import ProductFormModal from "../components/shop/ProductFormModal.jsx";
import UpdateShopFormModal from "../components/shop/UpdateShopFormModal.jsx";

export default function Shop() {
  const { shopId } = useParams();
  const { user, loading } = useContext(UserContext);
  const currUserId = user?._id;

  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [shopUpdateLoading, setShopUpdateLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    tags: "",
    description: "",
    images: [],
  });

  const [shopForm, setShopForm] = useState({
    shopname: "",
    city: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    logo: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch shop details
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`/api/shops/${shopId}`);
        setShop(res.data.shop);
        if (res.data.shop.owner._id === user._id) setIsOwner(true);

        setShopForm({
          shopname: res.data.shop.shopname,
          city: res.data.shop.city,
          address: res.data.shop.address,
          contactEmail: res.data.shop.contactEmail,
          contactPhone: res.data.shop.contactPhone,
          description: res.data.shop.description,
          logo: res.data.shop.logo,
        });
      } catch (err) {
        console.error("Error fetching shop:", err);
      }
    };

    if (!loading) fetchShop();
  }, [shopId, loading, currUserId, user]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(
        `/api/products/shop/${shopId}?page=${page}&limit=4`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (!loading) fetchProducts();
  }, [shopId, page, loading]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleShopChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setShopForm((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setShopForm((prev) => ({ ...prev, [name]: value }));
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
      setNewProduct((prev) => ({
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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        shop: shopId,
        tags: newProduct.tags.split(",").map((t) => t.trim()),
      };
      await axios.post("/api/products", payload);
      setShowProductModal(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        tags: "",
        images: [],
      });
      setPage(1);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();
    try {
      setShopUpdateLoading(true);
      let logoUrl = shopForm.logo;
      if (shopForm.logo instanceof File) {
        logoUrl = await uploadImageToCloudinary(shopForm.logo);
      }

      const payload = {
        shopname: shopForm.shopname,
        city: shopForm.city,
        address: shopForm.address,
        contactEmail: shopForm.contactEmail,
        contactPhone: shopForm.contactPhone,
        description: shopForm.description,
        logo: logoUrl,
      };

      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/shops/${shopId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShop(res.data.shop);
      setShowShopModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update shop");
    } finally {
      setShopUpdateLoading(false);
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading || !shop) return <Loader />;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      {/* Main Shop Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {/* Logo Section */}
            <div className="flex flex-col gap-2 bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
              <img
                src={shop.logo}
                alt={shop.shopname}
                className="w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow-md"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {shop.shopname}
              </h1>
            </div>

            {/* Shop Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden">
            
              <div className="flex justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {shop.shopname}
                </h1>

                {isOwner && (
                  <button
                    onClick={() => setShowShopModal(true)}
                    className="text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2 font-medium transition"
                  >
                    Update ✏️
                  </button>
                )}
              </div>
  

              {/* Category Badge */}
              <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg mb-3">
                <span className="text-lg font-bold">{shop.category}</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-3 pb-3 border-b">
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <p className="text-yellow-500 font-semibold">⭐ {shop.rating?.toFixed(1) || "0.0"}</p>
                </div>

                <div>
                  <span className="text-gray-600">City:</span>
                  <p className="text-gray-900 font-semibold">{shop.city}</p>
                </div>

                <div className="col-span-2">
                  <span className="text-gray-600">Phone:</span>
                  <p className="text-gray-900 font-semibold break-all">{shop.contactPhone}</p>
                </div>

                <div className="col-span-2">
                  <span className="text-gray-600">Email:</span>
                  <p className="text-gray-900 font-semibold break-all">{shop.contactEmail}</p>
                </div>

                <div className="col-span-2">
                  <span className="text-gray-600">Address:</span>
                  <p className="text-gray-900 font-semibold">{shop.address || "—"}</p>
                </div>
              </div>

              {/* Description */}
              {shop.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">About Shop:</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{shop.description}</p>
                </div>
              )}

              {/* Explore Button */}
              <button
                onClick={scrollToProducts}
                className="w-full bg-cyan-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-cyan-600 transition shadow-md mb-4"
              >
                Explore Our Products 🛍️
              </button>

              {/* Owner Section - Mobile */}
              {isOwner && (
                <div className="pt-4 border-t">
                  <h2 className="text-lg font-bold mb-2 text-gray-800">Owner Section</h2>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowProductModal(true)}
                      className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition font-medium"
                    >
                      Add New Product
                    </button>
                    <button
                      onClick={() => setShowShopModal(true)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                      Update Shop Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden lg:flex gap-6 xl:gap-8 h-[calc(100vh-8rem)]">
            {/* Left: Logo Section */}
            <div className="flex-1 flex-col gap-10 bg-white rounded-xl shadow-lg p-6 overflow-hidden flex justify-center items-center">
                <img
                  src={shop.logo}
                  alt={shop.shopname}
                  className="w-84 h-84 xl:w-100 xl:h-100 rounded-full object-cover border-4 border-emerald-400 shadow-md"
                />

              <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
                {shop.shopname}
              </h1>            
              
            </div>

            {/* Right: Shop Info */}
            <div className="relative flex-1 bg-white rounded-xl shadow-lg p-6 relative overflow-y-auto">
              
              {isOwner && (
                <button
                  onClick={() => setShowShopModal(true)}
                  className="absolute text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2 font-medium transition"
                >
                  Update ✏️
                </button>
              )}

              <div className="flex justify-center items-center">
                <img
                  src={shop.logo}
                  alt={shop.shopname}
                  className="w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow-md"
                />
              </div>

              {/* Shop Name */}
              <h1 className="text-xl text-center xl:text-3xl font-bold text-gray-900 mb-4">
                {shop.shopname}
              </h1>

              {/* Category Badge */}
              <div className="inline-block bg-emerald-100 text-emerald-800 px-5 py-2 rounded-lg mb-4">
                <span className="text-2xl font-bold">{shop.category}</span>
              </div>

              {/* Info Grid */}
              <div className="space-y-3 mb-4 pb-4 border-b-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Rating:</span>
                  <span className="text-yellow-500 font-semibold">⭐ {shop.rating?.toFixed(1) || "0.0"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">City:</span>
                  <span className="text-gray-900 font-semibold">{shop.city}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-900 font-semibold">{shop.contactPhone}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-900 font-semibold break-all">{shop.contactEmail}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-900 font-semibold text-right">{shop.address || "—"}</span>
                </div>
              </div>

              {/* Description */}
              {shop.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">About this shop:</h3>
                  <p className="text-gray-600 leading-relaxed">{shop.description}</p>
                </div>
              )}

              {/* Explore Button */}
              <button
                onClick={scrollToProducts}
                className="w-full bg-cyan-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-cyan-600 transition shadow-md"
              >
                Explore Our Products 🛍️
              </button>

              {/* Owner Section - Desktop */}
              {isOwner && (
                <div className="mt-6 pt-6 border-t">
                  <h2 className="text-lg font-bold mb-3 text-gray-800">Owner Section</h2>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setShowProductModal(true)}
                      className="w-full bg-emerald-500 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-600 transition font-medium"
                    >
                      Add New Product
                    </button>
                    <button
                      onClick={() => setShowShopModal(true)}
                      className="w-full bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                      Update Shop Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products-section" className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            Our Products
          </h2>

          {loadingProducts ? (
            <Loader />
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No products added yet</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col"
                  >
                    <div className="overflow-hidden rounded-lg mb-3 bg-gray-50">
                      <img
                        src={product.images?.[0] || "/vite.svg"}
                        alt={product.name}
                        className="w-full h-48 object-contain transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg whitespace-nowrap">
                        ₹{product.price}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 text-sm text-gray-500 border-t space-y-1">
                      <p className="hover:text-gray-800 transition-colors">
                        Category: {product.category || "—"}
                      </p>
                      <p className="hover:text-gray-800 font-medium text-gray-700 transition-colors">
                        Shop: {shop?.shopname || "—"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-medium"
                >
                  Previous
                </button>
                <span className="text-gray-700 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-medium"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        newProduct={newProduct}
        handleProductChange={handleProductChange}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
        handleCreateProduct={handleCreateProduct}
      />

      <UpdateShopFormModal
        showShopModal={showShopModal}
        setShowShopModal={setShowShopModal}
        shopForm={shopForm}
        handleShopChange={handleShopChange}
        handleUpdateShop={handleUpdateShop}
        shopUpdateLoading={shopUpdateLoading}
      />
    </div>
  );
}