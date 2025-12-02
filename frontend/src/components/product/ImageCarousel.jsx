import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons for arrows

const ImageCarousel = ({ product }) => {
  const [current, setCurrent] = useState(0);

  const images = product?.images || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        No Images
      </div>
    );
  }

  // functions for arrows
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex-col mx-auto w-full md:max-w-150 justify-center mb-4">
      <div className="relative flex-col h-70 md:h-123 mx-auto overflow-hidden rounded-2xl shadow-lg border-2 border-gray-300">

        {/* Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-contain bg-white"
            />
          </div>
        ))}

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-emerald-100 text-black p-2 rounded-full transition"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/*Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-emerald-100 text-black p-2 rounded-full transition"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-green-800 scale-110 shadow-md"
                    : "bg-gray-500 hover:bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>

      <h1 className="flex justify-center text-3xl text-emerald-800 font-bold mt-2">
        {product.name}
      </h1>
    </div>
  );
};

export default ImageCarousel;
