import React, { useContext } from "react";
import { X, Store, ShoppingBag, ShoppingCart, LogOut, LogIn, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, handleLogout, onLoginClick }) => {
  if (!isSidebarOpen) return null;

  const { user } = useContext(UserContext);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background Overlay */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="w-72 bg-white shadow-2xl h-full flex flex-col p-6 relative animate-slide-left">
        {/* Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={26} />
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <Link
            to={user ? "/profilePage" : "#"}
            className="w-30 h-30 rounded-full overflow-hidden border-4 border-emerald-400 shadow-md"
            onClick={() => {
                !user && onLoginClick()
                setIsSidebarOpen(false)
            }
            }
          >
            <img
              src={
                user?.profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s"
              }
              alt={user?.email || "Guest"}
              className="w-full h-full object-cover"
            />
          </Link>
          <p className="mt-3 text-gray-800 font-medium text-center truncate w-full">
            {user?.email || "Guest"}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <Link
            to="/ordersPage"
            className="flex items-center gap-3 text-gray-700 hover:bg-emerald-50 hover:text-cyan-600 p-3 rounded-lg transition font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Package size={20} />
            My Orders
          </Link>

          <Link
            to="/start-shop"
            className="flex items-center gap-3 text-gray-700 hover:bg-emerald-50 hover:text-cyan-600 p-3 rounded-lg transition font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Store size={20} />
            My Shops
          </Link>

          <Link
            to="/productsPage"
            className="flex items-center gap-3 text-gray-700 hover:bg-emerald-50 hover:text-cyan-600 p-3 rounded-lg transition font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ShoppingBag size={20} />
            Explore Products
          </Link>

          <Link
            to="/shopsPage"
            className="flex items-center gap-3 text-gray-700 hover:bg-emerald-50 hover:text-cyan-600 p-3 rounded-lg transition font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ShoppingCart size={20} />
            Explore Shops
          </Link>
        </nav>

        {/* Auth Button */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 active:scale-[0.98] transition cursor-pointer"
            >
              <LogOut size={20} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 active:scale-[0.98] transition cursor-pointer"
            >
              <LogIn size={20} />
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
