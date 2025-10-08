import { useState, useEffect, useContext } from "react";
import axios from "../config/axios.js";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
import { UserContext } from "../context/user.context.jsx";
import Loader from "../components/common/Loader.jsx";
import { Link } from "react-router-dom";

export default function ShopPage() {
  const { user, loading } = useContext(UserContext);

  const [shops, setShops] = useState([]);
  const [loadingShops, setLoadingShops] = useState(false);

  // Modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    shopname: "",
    city: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    logo: null,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData((prev) => ({ ...prev, [name]: files[0] }));
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch user's shops
  const fetchUserShops = async () => {
    if (!user) return;
    try {
      setLoadingShops(true);
      const res = await axios.get(`/api/shops/owner/${user._id}`);
      setShops(res.data.shops || []);
    } catch (err) {
      console.error("Failed to fetch shops:", err);
    } finally {
      setLoadingShops(false);
    }
  };

  useEffect(() => {
    if (!loading) fetchUserShops();
  }, [user, loading]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      let logoUrl = "";
      if (formData.logo) logoUrl = await uploadImageToCloudinary(formData.logo);

      const token = localStorage.getItem("token");
      await axios.post(
        "/api/shops",
        { ...formData, logo: logoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Shop created successfully!");
      setFormData({ shopname: "",city:"", address: "", contactEmail: "", contactPhone: "", description: "", logo: null });
      setIsOpen(false);
      fetchUserShops();
    } catch (err) {
      console.error(err);
      alert("Failed to create shop");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-3 md:px-8 md:py-6 flex-col ">
      
      {/* Big Banner / Start Shop Button */}
      <div className="md:flex gap-20">
        <div 
          className="relative w-full md:max-w-150 md:max-h-150 rounded-xl overflow-hidden transition transform shadow-lg"
        >
          <img 
            src="/shop2.png" 
            alt="Start Shop" 
            className="w-full h-full object-fit"
          />
          {/* Overlay with blurred text */}
          <div className="absolute bottom-2 left-4 right-4 bg-black/30 backdrop-blur-sm py-2 px-4 rounded-lg flex justify-center">
            <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">Start Your Shop</h2>
          </div>

        </div>

        {/* Right: Desktop-only fixed form */}
        <div className="hidden md:block md:w-1/2 bg-white rounded-xl shadow-xl p-6">
          <h2 className="flex justify-center text-2xl font-semibold mb-4">Start Your Shop</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Logo Upload */}
            <div className="flex justify-center mb-4">
              <label className="relative cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {formData.logo ? (
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Upload Logo</span>
                  )}
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <input
              type="text"
              name="shopname"
              placeholder="Shop Name"
              value={formData.shopname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="city"
              placeholder="City Name"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />            
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="contactPhone"
              placeholder="Contact Phone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Shop Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={loadingSubmit}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg mt-2"
            >
              {loadingSubmit ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        
        {/* Mobile-only button below image */}
        <div className="md:hidden mt-4 flex justify-center">
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Create Shop
          </button>
        </div>
      </div>


      {/* User's Shops */}
      <div className="mt-3">
        <h2 className="text-2xl font-semibold mb-4">Your Shops</h2>
        {loadingShops ? (
          <Loader />
        ) : shops.length === 0 ? (
          <p className="text-gray-500">You haven't created any shops yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop) => (
              <Link
                key={shop._id}
                to={`/shop/${shop._id}`}
                className="group border p-3 rounded-xl shadow-sm bg-white hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="overflow-hidden rounded-lg h-50 mb-3 bg-gray-100">
                  <img
                    src={shop.logo || "/default-shop.png"}
                    alt={shop.shopname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{shop.shopname}</h3>
                <p className="text-sm text-gray-500">{shop.address}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Form */}
      {isOpen && (
        <div 
        className="fixed inset-0 z-50 flex backdrop-blur-sm items-center justify-center bg-black/50 p-2"
        onClick={()=>setIsOpen(false)}
        >
          <div 
          className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
          onClick={(e)=>e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >×</button>
            
            <h2 className="flex justify-center text-2xl font-semibold mb-4">Start Your Shop</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
            {/* Logo Upload */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {formData.logo ? (
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Upload Logo</span>
                  )}
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
              
              <input
                type="text"
                name="shopname"
                placeholder="Shop Name"
                value={formData.shopname}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                placeholder="City Name"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />              
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="email"
                name="contactEmail"
                placeholder="Contact Email"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="contactPhone"
                placeholder="Contact Phone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                name="description"
                placeholder="Shop Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />

              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg mt-2"
              >
                {loadingSubmit ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
