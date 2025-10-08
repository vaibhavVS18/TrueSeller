import React from "react";

const HeroSection1 = () => {
  return (
    <section
      className="
        relative
        flex flex-col items-center justify-center 
        lg:items-start flex-1 w-full 
        text-center lg:text-left 
        px-4 sm:px-6 py-4 
        h-[50vh] lg:h-auto
        transition-all duration-300
      "
    >
      {/* Brand Name */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 text-purple-700 tracking-tight">
        TrueSeller
      </h2>

      {/* Tagline */}
      <span className="inline-block px-2 py-1 mb-3 text-xs sm:text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
        India’s Fastest Growing Marketplace
      </span>

      {/* Heading */}
      <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold leading-tight mb-2">
        Turn your <span className="text-purple-600">Passion</span> into{" "}
        <span className="text-purple-600">Profit</span>
      </h1>

      {/* Subtext — hidden on small screens */}
      <p className="hidden md:block text-gray-600 text-sm md:text-lg mb-4 leading-relaxed max-w-md sm:max-w-xl">
        Start selling your products online with TrueSeller — the trusted
        platform that connects small shopkeepers to customers across India.
        Launch your store in minutes, grow your brand, and earn more with every
        sale. 🚀
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-3 justify-center lg:justify-start">
        <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-all">
          ⚡ Start Selling
        </button>
        <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl shadow-md active:scale-95 transition-all">
          📈 Explore Shops
        </button>
      </div>
    </section>
  );
};

export default HeroSection1;
