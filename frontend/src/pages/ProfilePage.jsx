import { useState, useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import Loader from "../components/common/Loader.jsx";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser, loading } = useContext(UserContext);
  const [shops, setShops] = useState([]);
  const [loadingShops, setLoadingShops] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
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

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 md:py-8">
      {/* Profile Info */}
      <div className="relative flex flex-col max-w-md items-center text-center bg-white rounded-xl shadow-md p-6 mx-auto border border-gray-400">
          <button
              onClick={handleLogout}
              className="absolute top-3 right-3 flex items-center justify-center gap-1 py-1.5 px-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-700 active:scale-[0.98] transition cursor-pointer"
            >
              <LogOut size={15} />
              Logout
          </button>
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-emerald-400 shadow">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt={user.username || "User Profile"}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-gray-600 mb-3">{user.email}</p>

        <Link
          to="/start-shop"
          className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
        >
          Create Shop
        </Link>
      </div>

      {/* User's Shops */}
      {loadingShops ? (
        <Loader />
      ) : (
        <div className="mt-8 max-w-6xl mx-auto">
          {shops.length > 0 && (
            <h2 className="text-2xl font-semibold mb-4">Your Shops</h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* All Shop Cards */}
            {shops.map((shop) => (
              <Link
                key={shop._id}
                to={`/shop/${shop._id}`}
                className="group border p-3 rounded-xl shadow-sm bg-white hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="overflow-hidden rounded-lg h-50 sm:h-40 mb-3 bg-gray-100">
                  <img
                    src={shop.logo || "/default-shop.png"}
                    alt={shop.shopname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {shop.shopname}
                </h3>
                <p className="text-sm text-gray-500">{shop.address}</p>
              </Link>
            ))}

            {/* Create Shop Card — Always Visible */}
            <Link
              to="/start-shop"
              className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-400 p-6 rounded-xl shadow-sm bg-white hover:bg-emerald-50 hover:shadow-md transition transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-4xl mb-2">
                +
              </div>
              <p className="text-lg font-semibold text-emerald-700">
                Create Shop
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
