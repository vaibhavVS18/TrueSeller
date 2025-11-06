import React from "react";

const StartLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        {/* Spinning Logo */}
        <img
          src="/logo2.png"
          alt="Logo"
          className="w-23 h-23 object-contain animate-spin-slow"
        />

        {/* Website Name */}
        <h2
          className="text-4xl lg:text-4xl xl:text-3xl mb-2 font-extrabold tracking-tight"
          style={{
            WebkitTextStroke: "0.8px #f3f4f6",
            color: "black",
          }}
        >
          <span className="text-emerald-600">True</span>
          <span className="text-cyan-600">Seller</span>
        </h2>

        {/* Loading Text */}
        <p className="text-lg font-medium animate-pulse text-gray-200 mb-1">
          Loading Awesome Experience...
        </p>
        <div className="w-8 h-8 border-3 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default StartLoader;



    // it is imp. to keep it fixed inset-0 , so that always showing laoder at middle at every screen
