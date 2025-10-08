import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Bell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Newsletter Section
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-center py-6 px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-2">
          Stay Updated! <Bell className="text-yellow-300" size={22} />
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-200 max-w-md mx-auto">
          Get the latest trends, seller tips, and exclusive offers directly in your inbox
        </p>

        <form className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-3 py-2 sm:py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base bg-gray-900 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center gap-1 transition text-sm sm:text-base"
          >
            Subscribe ✨
          </button>
        </form>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-16 text-center md:text-left">
        
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">TrueSeller</h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 max-w-sm mx-auto md:mx-0 ">
            Marketplace for modern entrepreneurs. Turn your passion into profit with our next-gen selling platform!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="/products" className="hover:text-indigo-400 transition-colors">Explore Products</a></li>
            <li><a href="/shops" className="hover:text-indigo-400 transition-colors">Shops</a></li>
            <li><a href="/sell" className="hover:text-indigo-400 transition-colors">Open Shop</a></li>
            <li><a href="/login" className="hover:text-indigo-400 transition-colors">Login</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 sm:space-x-5">
            <a href="#" className="hover:text-indigo-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} TrueSeller. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
