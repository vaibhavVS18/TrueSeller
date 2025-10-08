import React, { useState, useEffect } from "react";

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

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        relative
        w-full sm:w-[85%] md:w-[70%] lg:w-[520px] xl:w-[600px]
        aspect-square
        mx-auto lg:mx-0 lg:ml-auto
        overflow-hidden
        rounded-3xl
        shadow-2xl
        border border-gray-700/40
        transition-all duration-500
      "
    >
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

          {/* Optional overlay for gradient fade bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Text overlay */}
          <div className="absolute bottom-5 left-0 right-0 text-center px-4">
            <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg mb-1">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base text-gray-300 leading-snug">
              {slide.desc1}
            </p>
            <p className="text-sm md:text-base text-gray-300 leading-snug">
              {slide.desc2}
            </p>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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

export default HeroCarousel;

