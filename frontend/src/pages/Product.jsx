import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../config/axios.js";
import Loader from "../components/common/Loader.jsx";
import { UserContext } from "../context/user.context.jsx";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import ImageCarousel from "../components/product/ImageCarousel.jsx";

export default function Product() {
  const { productId } = useParams();
  const { user, loading: userLoading } = useContext(UserContext);
  const [isOwner, setIsOwner] = useState(false);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${productId}`);
        setProduct(res.data.product);

          // Check if current user is owner
        if(res.data.product.shop.owner === user._id) setIsOwner(true);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if( !userLoading) fetchProduct();
  }, [productId, user, userLoading]);

  // Set form values when product loads
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
    }
  }, [product]);

  // Handle form input changes
  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update product
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
      // alert("Product updated successfully!");
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

  if (loading || userLoading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="min-h-screen flex-col mx-auto p-6">
      <div className="md:flex p-3 md:p-10 md:mr-10 mb-4 gap-25">
        {/* Product Images */}
         <ImageCarousel product={product}/>
           
                        {/* Product Details*/}
        <div className="relative mt-6 sm:mt-0 flex flex-col flex-1 max-w-150 max-h-132 p-4 md:p-8 items-center justify-center text-center bg-white rounded-xl shadow-md border">

          {/* Edit Icon */}
          {isOwner && (
            <button
              onClick={() => setShowModal(true)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              title="Edit Product Info"
            >
              ✏️
            </button>
          )}

          {/* Product Images Placeholder (or main image) */}
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="hidden md:block w-32 h-32 rounded-xl object-cover border-4 border-emerald-400 shadow mb-4"
            />
          )}

          {/* Product Name */}
          <h1 className="hidden md:block text-3xl font-bold text-emerald-800 mb-2">{product.name}</h1>

          {/* Product Basic Info */}
          <div className="grid grid-cols-1sm:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-lg w-full max-w-2xl mt-2 mb-4">
            
            <div className="flex gap-3">
              <span className="font-semibold w-28">Price:</span>
              <span className="text-emerald-600">₹{product.price}</span>
            </div>

            <div className="flex gap-3">
              <span className="font-semibold w-28">Stock:</span>
              <span className="text-emerald-600">{product.stock}</span>
            </div>

            <div className="flex gap-3">
              <span className="font-semibold w-28">Category:</span>
              <span className="text-emerald-600">{product.category || "General"}</span>
            </div>

            <div className="flex gap-3">
              <span className="font-semibold w-28">Rating:</span>
              <span className="text-gold-200">⭐ {product.rating?.toFixed(1) || "0.0"}</span>
            </div>

            {product.shop && (
              <div className="flex gap-3 col-span-1 sm:col-span-2">
                <span className="font-semibold w-28">Shop:</span>
                <Link
                  to={`/shop/${product.shop._id}`}
                  className="text-emerald-600 underline"
                >
                  {product.shop.shopname}
                </Link>
              </div>
            )}
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
              Place Order
            </button>

          {/* Description */}
          {product.description && (
            <div className="flex gap-3 mt-2">
              <span className="font-semibold w-28">About Product:</span>
              <p className="text-gray-600 max-w-lg">{product.description}</p>
            </div>
          )}

        </div>

      </div>

      {/* Owner Section */}
      {isOwner && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Owner Section</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Update Product
          </button>
        </div>
      )}

      {/* Update Modal */}
      {showModal && (
        <div 
        className="fixed inset-0 z-50 p-2 flex items-start sm:items-center justify-center backdrop-blur-sm bg-black/50 overflow-auto"
        onClick={()=>setShowModal(false)}
        >
          <div 
          className="relative bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto mt-20 sm:mt-0"
          onClick={(e)=>e.stopPropagation()}
          >
          {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold mb-4">Update Product</h3>
            <form onSubmit={handleUpdateProduct} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productForm.name}
                onChange={handleProductFormChange}
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={productForm.description}
                onChange={handleProductFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleProductFormChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={productForm.stock}
                onChange={handleProductFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={productForm.category}
                onChange={handleProductFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={productForm.tags}
                onChange={handleProductFormChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full"
              />
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

              <div className="grid grid-cols-3 gap-2">
                {productForm.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded transition">
                      ✕
                    </button>
                  </div>
                ))}
              </div>


              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-500 text-white rounded"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
