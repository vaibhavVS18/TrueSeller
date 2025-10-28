import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../config/axios.js";
import Loader from "../components/common/Loader.jsx";
import { UserContext } from "../context/user.context.jsx";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import ImageCarousel from "../components/product/ImageCarousel.jsx";
import { ShoppingCart , Package, Heart, Loader2} from "lucide-react";
import { CartContext } from "../context/cart.context.jsx";
import { ModalContext } from "../context/modal.context.jsx";

export default function Product() {
  const { productId } = useParams();
  const { user, loading: userLoading } = useContext(UserContext);
  const {addToCart} = useContext(CartContext);
  const {setIsLoginOpen} = useContext(ModalContext);

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
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Fetch product
  useEffect(() => {
    if( !userLoading) fetchProduct();
    if(user) fetchWishlist();

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

  const fetchWishlist = async()=>{
    try{
      const res = await axios.get("/api/wishlists");
      // setWishlist(res.data)
      console.log(res.data.products);
      setWishlist(res.data?.products || []);
    }
    catch(err){
      console.log(err);
    }
  }

  const toggleWishlist = async(productId)=>{
    try{
      setWishlistLoading(true);
      const res = await axios.post("/api/wishlists/toggle", {productId});
      // console.log(res.data);

      setWishlist((prev)=>{
        if(prev.includes(productId)){
          return prev.filter((id)=> id !== productId);
        }
        else{
          return [...prev, productId];
        }
      });
    }
    catch(err){
      console.log("Error toggling wishlist: ", err.response?.data || err);
    }
    finally{
      setWishlistLoading(false);
    }
  }

  
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
              className="sm:absolute top-3 left-3 text-gray-500 border-2 rounded-full hover:bg-gray-500 hover:text-white text-md p-1 px-2"
              title="Edit Product Info"
            >
              Update ✏️
            </button>
          )}

          <button
            onClick={() => {
              user? toggleWishlist(product._id) : setIsLoginOpen(true);
            }}
            disabled={wishlistLoading}
            className={`absolute top-3 right-3 z-20 cursor-pointer 
                        flex items-center justify-center 
                        rounded-full p-1 transition-colors duration-200 border border-emerald-400
                        ${wishlist.includes(product._id) ? "bg-gray-100" : "bg-gray-100"} 
                        hover:bg-emerald-100 disabled:opacity-70`}  // also can keep 'disabled:cursor-not-allowed'
          >
            {wishlistLoading ? (
              <Loader2 size={18} className="animate-spin text-emerald-500" />
            ) : (
            <Heart
              size={22}
              color={wishlist.includes(product._id) ? "#33c292ff" : "#10B981"}   // emerald
              fill={wishlist.includes(product._id) ? "#33c292ff" : "none"}        // cyan
            />
            )}
          </button>

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
          <div className="flex flex-col sm:flex-row justify-between sm:gap-8 p-4 text-gray-700 text-lg w-full mt-2 mb-4 border">
            
            <div className="flex justify-between flex-1">
              <div className="flex flex-col items-start">
                <span className="font-semibold">Price:</span>
                <span className="font-semibold">Category:</span>
                <span className="font-semibold">Rating:</span>
              </div>
              <div className="flex flex-col sm:items-start">
              <span className="text-emerald-600">₹{product.price}</span>
              <span className="text-emerald-600">{product.category || "General"}</span>
              <span className="text-gold-200">⭐ {product.rating?.toFixed(1) || "0.0"}</span>
              </div>
            </div>

            <div className="flex justify-between flex-1">
              <div className="flex flex-col items-start">
                {product.shop && (
                  <span className="font-semibold">Shop:</span>
                )}                
                  <span className="font-semibold">Stock:</span>
              </div>
              <div className="flex flex-col sm:items-start">
                {product.shop && (
                  <Link
                    to={`/shop/${product.shop._id}`}
                    className="text-emerald-600 underline"
                  >
                    {product.shop.shopname}
                  </Link>              
                )}
                  <span className="text-emerald-600">{product.stock}</span>
              </div>
            </div>

          </div>


          {/* Description */}
          {product.description && (
            <div className="flex flex-col mt-2">
              <span className="font-semibold">About Product:</span>
              <p className="text-gray-600 max-w-lg">{product.description}</p>
            </div>
          )}

          <div className="flex gap-1 mt-4">
            <button
              onClick={() => {
                user ? addToCart(product, product.shop?._id): setIsLoginOpen(true);
              }}
              className="flex items-center justify-center gap-1 mt-2 bg-cyan-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-cyan-600 transition"
            >
              <span>Add to Cart</span>
              <ShoppingCart size={18} />
            </button>

            <Link
            to={ user? "/cartPage" : "#"}
              className="flex items-center justify-center gap-1 mt-2 bg-emerald-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-600 transition"
              onClick={(e) =>{
                if(user){
                  addToCart(product, product.shop?._id);
                }
                else{
                  e.preventDefault();    // stop navigation 
                  setIsLoginOpen(true);
                }

              }}
            >
              <span>Place Order</span>
              <Package size={18}/>
              
            </Link>
          </div>

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
                      className="w-full h-24 object-cover border rounded"
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
