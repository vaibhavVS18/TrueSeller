import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../config/axios";
import { UserContext } from "../../context/user.context";
import Sidebar from "../common/Sidebar";
import { CartContext } from "../../context/cart.context";
import SearchBar from "./SearchBar";

import {
  ShoppingCart,
  Heart,
  ShoppingBag,
  Store,
  PackageSearch,
  Search,
  Menu,
  X,
  Home,
  User,
} from "lucide-react";


const Navbar = ({ onLoginClick }) => {
  const { user, setUser } = useContext(UserContext);
  const {totalItems} = useContext(CartContext);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      localStorage.removeItem("token");
      setUser(null);
      setIsSidebarOpen(false); // close sidebar
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="cursor-pointer">
          <img 
            src="/logo.png" 
            alt="TrueSeller Logo" 
            className="h-11 md:h-11 object-contain" 
          />
        </Link>


        {/* Desktop Nav + Search */}
        <div className="hidden md:flex items-center flex-1 justify-center space-x-6">
          <Link
            to="/productsPage"
            className={`flex items-center space-x-2 hover:text-emerald-500 font-medium
                        ${location.pathname=== "/productsPage" ? "text-emerald-500 font-semibold": "text-gray-700"}
              `}
          >
            <PackageSearch size={20} />
            <span>Products</span>
          </Link>

          <Link
            to="/shopsPage"
            className={`flex items-center space-x-2 hover:text-emerald-500 font-medium
                                    ${location.pathname=== "/shopsPage" ? "text-emerald-500 font-semibold": "text-gray-700"}
              `}
          >
            <Store size={20} />
            <span>Shops</span>
          </Link>

          <Link
            to="/start-shop"
            className={`flex items-center space-x-2 hover:text-emerald-500 font-medium
                        ${location.pathname=== "/start-shop" ? "text-emerald-500 font-semibold": "text-gray-700"}
              `}
          >
            <ShoppingBag size={20} />
            <span>Sell</span>
          </Link>

          {/* Search Bar */}
          <SearchBar/>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {
            user && (
              <Link
                to="/wishlistPage"
                className={`relative cursor-pointer hover:text-emerald-600
                            ${location.pathname === "/wishlistPage" ? "text-emerald-600" : "text-gray-700"}
                            flex flex-col items-center justify-center`}
              >
                <Heart 
                  size={22} 
                  fill="#c5f6e5ff" 
                />
                <span className="text-sm text-cyan-700 font-medium hover:text-cyan-600">Wishlist</span>
              </Link>
            )
          }

{
  user && totalItems !== 0 && (
    <Link
      to="/cartPage"
      className={`relative cursor-pointer hover:text-emerald-600
                  ${location.pathname === "/cartpage" ? "text-emerald-600" : "text-gray-700"} 
                  flex flex-col items-center justify-center`}
    >
      <div className="relative">
        <ShoppingCart size={24} />

        <span
          className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px]
                     font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
        >
          {totalItems}
        </span>
      </div>

      <span className="text-sm font-medium text-cyan-700 hover:text-cyan-600">
        Cart
      </span>
    </Link>
  )
}


          {/* Login/Profile */}
          {user ? (
            <>
              <Link
                to="/profilePage"
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 hover:border-cyan-400 transition-all"
              >
                <img
                  src={`${user.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </Link>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-medium shadow-md transition-all"
            >
              Login
            </button>
          )}

          {/* Sidebar Toggle Icon */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-700 hover:text-emerald-600"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Quick Nav Strip */}
      <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border shadow-md py-2 flex justify-around items-center text-gray-700 text-xs font-medium safe-bottom">
        <Link
          to="/"
          className={`flex flex-col items-center hover:text-emerald-600 transition-all
            ${location.pathname=== "/" ? "text-emerald-500 font-semibold": null}
          `}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/productsPage"
          className={`flex flex-col items-center hover:text-emerald-600 transition-all
            ${location.pathname=== "/productsPage" ? "text-emerald-500 font-semibold": null}
          `}        >
          <PackageSearch size={20} />
          <span>Products</span>
        </Link>

        <Link
          to="/shopsPage"
          className={`flex flex-col items-center hover:text-emerald-600 transition-all
            ${location.pathname=== "/shopsPage" ? "text-emerald-500 font-semibold": null}
          `}        
        >
          <Store size={20} />
          <span>Shops</span>
        </Link>

        <Link
          to="/start-shop"
          className={`flex flex-col items-center hover:text-emerald-600 transition-all
            ${location.pathname=== "/start-shop" ? "text-emerald-500 font-semibold": null}
          `}        >
          <ShoppingBag size={20} />
          <span>Sell</span>
        </Link>

        <Link
          to={user? "/profilePage": "#"}
          onClick={!user && onLoginClick}

          className={`flex flex-col items-center hover:text-emerald-600 transition-all
            ${location.pathname=== "/profilePage" ? "text-emerald-500 font-semibold": null}
          `}        >
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>

      {/* Sidebar Overlay */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
        onLoginClick={onLoginClick}
      />
    </header>
  );
};

export default Navbar;
