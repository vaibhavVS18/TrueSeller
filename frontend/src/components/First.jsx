import React from "react";
import { Link } from "react-router-dom";

const First = () => {
  return (
    <section className="flex flex-col items-center justify-center lg:items-start w-full text-center lg:text-left px-4 sm:px-6 lg:py-0">
      
      {/* Brand Name */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 tracking-tight">
        <span className="text-emerald-600">True</span><span className="text-cyan-600">Seller</span>
      </h2>

      {/* Tagline */}
      <span className="inline-block px-2 py-1 mb-2 sm:mb-3 text-sm font-medium text-cyan-700 bg-emerald-100 rounded-full">
        India's Fastest Growing Marketplace
      </span>

      {/* Headline */}
      <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
        Turn your <span className="text-emerald-600">Passion</span>
        <p> into{" "}<span className="text-cyan-600">Profit</span></p>
        
      </h1>

      {/* Description */}
      <p className="md:block text-gray-600 text-sm md:text-base lg:text-lg mb-4 leading-relaxed max-w-md lg:max-w-xl">
        Start selling your products online with{" "}
        <span className="font-semibold text-emerald-600">TrueSeller</span> — the
        trusted platform connecting local shopkeepers to customers across India.
        Launch your store in minutes, grow your brand, and earn more with every
        sale. 🚀
      </p>

      {/* Buttons */}
      <div className="flex gap-3 justify-center lg:justify-start mt-1 sm:mt-2">
        <Link 
          className="px-4 py-3 sm:px-5 sm:py-2.5 
                     bg-gradient-to-r from-emerald-500 to-cyan-500 
                     hover:from-emerald-400 hover:to-cyan-400 
                     text-white font-semibold rounded-xl shadow-md 
                     active:scale-95 transition-all text-sm sm:text-base"
          to="/start-shop"
        >
          ⚡ Start your Shop
        </Link>
        <Link 
          className="px-4 py-3 sm:px-5 sm:py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl shadow-md active:scale-95 transition-all text-sm sm:text-base"
          to="/shopsPage"
        >
          📈 Explore Shops
        </Link>
      </div>
    </section>
  );
};

export default First;
