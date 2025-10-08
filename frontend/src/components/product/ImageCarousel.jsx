import React, { useState, useEffect } from "react";

const ImageCarousel = ({product}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (product.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [product.images]);

  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        No Images
      </div>
    );
  }

  return (
    <div className="flex-col mx-auto w-full md:max-w-150 justify-center mb-4">
        <div className="relative flex-col h-70 md:h-130 mx-auto overflow-hidden rounded-2xl shadow-lg border-2 border-gray-300">
        {product.images.map((img, index) => (
            <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
            }`}
            >
            <img
                src={img}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-fit"
            />
            </div>
        ))}

        {/* Dots */}
        {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {product.images.map((_, index) => (
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
        )}

        <h1 className="flex justify-center text-4xl text-emerald-800 font-bold">{name} km</h1>

        </div>
        <h1 className="flex justify-center text-4xl text-emerald-800 font-bold">{product.name}</h1>
    </div>

  );
};

export default ImageCarousel;