import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { UserContext } from "../../context/user.context";
import Sidebar from "../common/Sidebar";

import {
  ShoppingCart,
  ShoppingBag,
  Store,
  PackageSearch,
  Search,
  Menu,
  X, Home, User
} from "lucide-react";

const Navbar = ({ onLoginClick , onTabChange}) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      localStorage.removeItem("token");
      setUser(null);
      setIsSidebarOpen(false); // ✅ close sidebar
      navigate("/");
    } 
    catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
         to={"/"}
         className="text-xl md:text-2xl font-extrabold text-blue-700 cursor-pointer"
         >
          TrueSeller
        </Link>

        {/* Desktop Nav + Search */}
        <div className="hidden md:flex items-center flex-1 justify-center space-x-6">
          <Link
            to="/productsPage"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 font-medium"
          >
            <PackageSearch size={20} />
            <span>Products</span>
          </Link>

          <Link
            to="/shopsPage"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 font-medium"
          >
            <Store size={20} />
            <span>Shops</span>
          </Link>

          <Link
            to="/start-shop"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 font-medium"
          >
            <ShoppingBag size={20} />
            <span>Sell</span>
          </Link>

          {/* Search Bar */}
          <div className="flex items-center w-64">
            <input
              type="text"
              placeholder="Search products or shops..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="bg-blue-700 text-white px-4 py-2 rounded-full ml-1 hover:bg-blue-800 transition">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative cursor-pointer text-gray-700 hover:text-blue-700">
            <ShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </div>

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
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-medium shadow-md hover:shadow-emerald-500/30 transition-all"
            >
              Login
            </button>
          )}
        
            {/* Sidebar Toggle Icon */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-700"
            >
                <Menu size={28} />
            </button>          
        </div>
      </div>

      {/* Mobile Quick Nav Strip */}
      <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t shadow-md py-2 flex justify-around items-center text-gray-700 text-xs font-medium safe-bottom">
        <Link to="/" className="flex flex-col items-center hover:text-blue-600 transition-all">
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link to="/productsPage" className="flex flex-col items-center hover:text-blue-600 transition-all">
          <PackageSearch size={20} />
          <span>Products</span>
        </Link>

        <Link to="/shopsPage" className="flex flex-col items-center hover:text-blue-600 transition-all">
          <Store size={20} />
          <span>Shops</span>
        </Link>

        <Link to="/start-shop" className="flex flex-col items-center hover:text-blue-600 transition-all">
          <ShoppingBag size={20} />
          <span>Sell</span>
        </Link>

        <Link to="/profilePage" className="flex flex-col items-center hover:text-blue-600 transition-all">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>


          {/* Mobile Bottom Nav */}
      {/* <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t shadow-md py-2 flex justify-around items-center text-gray-700 text-xs font-medium safe-bottom">
        <button
          onClick={() => onTabChange("home")}
          className="flex flex-col items-center hover:text-blue-600 transition-all"
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          onClick={() => onTabChange("products")}
          className="flex flex-col items-center hover:text-blue-600 transition-all"
        >
          <PackageSearch size={20} />
          <span>Products</span>
        </button>

        <button
          onClick={() => onTabChange("shops")}
          className="flex flex-col items-center hover:text-blue-600 transition-all"
        >
          <Store size={20} />
          <span>Shops</span>
        </button>

        <button
          onClick={() => onTabChange("sell")}
          className="flex flex-col items-center hover:text-blue-600 transition-all"
        >
          <ShoppingBag size={20} />
          <span>Sell</span>
        </button>

        <Link
          to="/profile"
          className="flex flex-col items-center hover:text-blue-600 transition-all"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div> */}

      {/* Mobile Search Bar */}
      {/* <div className="md:hidden px-4 py-2 bg-gray-50 border rounded">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products or shops..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-1 hover:bg-blue-700 transition">
            <Search size={18} />
          </button>
        </div>
      </div> */}

      {/* Sidebar Overlay */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleLogout={handleLogout}/>
    </header>
  );
};

export default Navbar;
