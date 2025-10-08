import React, { useState, useEffect } from "react";

// HeroCarousel Component
const HeroCarousel = () => {
  const slides = [
    {
      img: "/shop1.png",
      title: "Sell your Products",
      desc1: "Sell your homemade product with the whole nation",
      desc2: "and Earn our Verified Badge as a mark of trust and quality.",
    },
    {
      img: "/shop2.png",
      title: "For Shopkeepers",
      desc1: "Turn Your Passion into Profit by 'Create your Shop'",
      desc2: "Upload product photos with prices and start selling instantly.",
    },
    {
      img: "/shop3.png",
      title: "For Buyers",
      desc1: "Purchase from Famous and Authentic Shops across India.",
      desc2: "Enjoy famous regional items delivered to your doorstep.",
    },
    {
      img: "/shop4.png",
      title: "Nationwide Reach",
      desc1: "Shopkeepers can sell anywhere in India without limits.",
      desc2: "Buyers can access authentic products from other states.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex-1 max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[600px] aspect-square mx-auto lg:mx-0 lg:ml-auto overflow-hidden rounded-3xl shadow-2xl border border-gray-700/40 transition-all duration-500">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white scale-110 shadow-md"
                : "bg-gray-500 hover:bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// HeroSection1 Component
const HeroSection1 = () => {
  return (
    <section className="flex flex-col items-center justify-center lg:items-start w-full text-center lg:text-left px-4 sm:px-6 lg:py-0">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 text-purple-700 tracking-tight">
        TrueSeller
      </h2>

      <span className="inline-block px-2 py-1 mb-2 sm:mb-3 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
        India's Fastest Growing Marketplace
      </span>

      <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
        Turn your <span className="text-purple-600">Passion</span> into{" "}
        <span className="text-purple-600">Profit</span>
      </h1>

      <p className="md:block text-gray-600 text-sm md:text-base lg:text-lg mb-4 leading-relaxed max-w-md lg:max-w-xl">
        Start selling your products online with TrueSeller — the trusted
        platform that connects small shopkeepers to customers across India.
        Launch your store in minutes, grow your brand, and earn more with every
        sale. 🚀
      </p>

      <div className="flex gap-3 justify-center lg:justify-start mt-1 sm:mt-2">
        <button className="px-4 py-3 sm:px-5 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-all text-sm sm:text-base">
          ⚡ Start your Shop
        </button>
        <button className="px-4 py-3 sm:px-5 sm:py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl shadow-md active:scale-95 transition-all text-sm sm:text-base">
          📈 Explore Shops
        </button>
      </div>
    </section>
  );
};



// Home Component
const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-10 px-4 sm:px-6 lg:px-20 py-6 lg:py-5 ">
      <div className="w-full my-auto lg:flex-1 flex items-center justify-center">
        <HeroSection1 />
      </div>

      <div className="w-full my-auto lg:flex-1 flex items-center justify-center py-3">
        <HeroCarousel />
      </div>
    </div>

  );
};

export default Home;