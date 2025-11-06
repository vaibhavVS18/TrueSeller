import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const Second = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative flex-1 max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[600px] aspect-square mx-auto lg:mx-0 lg:ml-auto overflow-hidden rounded-3xl shadow-2xl border border-gray-700/40 transition-all duration-500">
      
      {/* Slides */}
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

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white text-xl transition-all duration-300"
        aria-label="Previous Slide"
      >
        <FaArrowLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white text-xl transition-all duration-300"
        aria-label="Next Slide"
      >
        <FaArrowRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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

export default Second;
