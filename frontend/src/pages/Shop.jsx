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

        // Pre-fill shop form for owner
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

  // Handle product input change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle shop form input change
  const handleShopChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setShopForm((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setShopForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload images for product
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

  // Create new product
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

  // Update shop details (owner only)
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
    //   alert("Shop updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update shop");
    }
    finally{
      setShopUpdateLoading(false);
    }
  };

  if (loading || !shop) return <Loader />;

  return (
    <div className="min-h-screen flex-col mx-auto p-5">
      
      <div className="md:flex p-3 md:p-10 md:mr-10 mb-4 gap-25">
        {/* Shop Logo */}
          <div className="flex-col mx-auto w-full max-w-70 md:max-w-130 md:max-h-130 justify-center mb-4">
            <img
              src={shop.logo}
              alt={shop.shopname}
              className="w-full h-full rounded-full object-cover border-4 border-emerald-400 shadow-lg"
            />
            <h1 className="flex justify-center text-4xl text-emerald-800 font-bold">{shop.shopname}</h1>
          </div>

          {/* Shop Info */}
          <div className="relative flex flex-col flex-1 max-w-150 max-h-150 p-5 md:p-10 items-center text-center bg-white rounded-xl shadow-md border">
            
            {/* Edit Icon */}
            {isOwner && (
              <button
                onClick={() => setShowShopModal(true)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                title="Edit Shop Info"
              >
                ✏️
              </button>
            )}

            
            {/* Logo */}
            <img
              src={shop.logo}
              alt={shop.shopname}
              className="hidden md:block w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow mb-4"
            />

            {/* Name */}
            <h1 className="hidden md:block text-3xl font-bold text-emerald-800 mb-2">{shop.shopname}</h1>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-lg w-full max-w-2xl mt-2 mb-4">
              <div className="flex gap-3">
                <span className="font-semibold w-28">Address:</span>
                <span className="text-emerald-600">{shop.address}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">City:</span>
                <span className="text-emerald-600">{shop.city}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Category:</span>
                <span className="text-emerald-600">{shop.category}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Phone:</span>
                <span className="text-emerald-600">{shop.contactPhone}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Email:</span>
                <span className="text-emerald-600">{shop.contactEmail || "Not provided"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Rating:</span>
                <span className="text-gold-200">⭐ {shop.rating?.toFixed(1) || "0.0"}</span>
              </div>
            </div>


            <button
              className="mt-2 bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600 transition"
              onClick={() =>{
                let scrollTop;
                if(window.innerWidth >= 640){
                  scrollTop = 648;   // sm
                }
                else{
                  scrollTop = 740;
                }

                window.scrollTo(
                {
                  top:scrollTop,
                  behavior: 'smooth' 
                }
                )
              }}
            >
              Explore Our Products
            </button>

            {/* Description (optional) */}
            {shop.description && (
              <div className="flex gap-3 mt-2">
                <span className="font-semibold w-28">About Shop:</span>
                <p className="text-gray-600 max-w-lg">{shop.description}</p>
              </div>
            )}

          </div>

      </div>


      {/* Products */}
      <h2 className="flex justify-center text-2xl font-semibold mb-4">Our Products</h2>
      
      {loadingProducts ? (
        <Loader />
        ) : products.length==0 ? (<p>no product added yet</p>):(
          <>
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
                  Shop: {shop?.shopname || "—"}
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


      {/* Owner Section */}
      {isOwner && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Owner Section</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
              Add New Product
            </button>
            <button
              onClick={() => setShowShopModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Shop Details
            </button>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductFormModal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        newProduct={newProduct}
        handleProductChange={handleProductChange}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
        handleCreateProduct={handleCreateProduct}
      />

      {/* Shop Update Modal */}
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