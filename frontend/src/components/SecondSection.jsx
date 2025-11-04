import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const SecondSection = () => {
  const [isFirstHovered, setIsFirstHovered] = useState(false);
  const [isSecondHovered, setIsSecondHovered] = useState(false);
  const [isThirdHovered, setIsThirdHovered] = useState(false);

  const cards = [
    {
      title: "Become a Seller",
      desc1: "Turn your passion into profit by creating your shop.",
      desc2: "Upload products and start selling instantly.",
      img: isFirstHovered ? "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275350/shopp_ornonp.png" : "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275350/shop_n2gw5c.png",
      hoverSetter: setIsFirstHovered,
      link: "/start-shop",
      btn: "Start Selling",
    },
    {
      title: "Explore Products",
      desc1: "Buy from famous and authentic shops across India.",
      desc2: "Get unique regional items delivered to your door.",
      img: isThirdHovered ? "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/productt_ohflg3.png" : "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/product_ejs728.png",
      hoverSetter: setIsThirdHovered,
      link: "/productsPage",
      btn: "View Products",
    },
    {
      title: "Explore Shops",
      desc1: "Discover authentic shops from different Indian cities.",
      desc2: "Connect to the nation through regional treasures.",
      img: isSecondHovered ? "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275350/selll_b95yyw.png" : "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/sell_w9ctzt.png",
      hoverSetter: setIsSecondHovered,
      link: "/shopsPage",
      btn: "View Shops",
    },
  ];

  return (
    <div id="features" className="flex flex-col gap-3 w-full min-h-[88vh] p-10 md:mt-8 scroll-mt-15 md:scroll-mt-22">
      <div className="flex justify-center items-center text-4xl text-emerald-800 font-semibold mb-8">
        Features
      </div>

      <div className="flex flex-wrap gap-10 max-w-8xl justify-center items-center mx-auto">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.link}
            className="hover:h-[60vh] md:h-[60vh] h-[47vh] relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-300"
            onMouseEnter={() => card.hoverSetter(true)}
            onMouseLeave={() => card.hoverSetter(false)}
          >
            {/* Background Image */}
            <img
              src={card.img}
              alt={card.title}
              className="w-[50vh] object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Blurred Text Overlay */}
            <div className="absolute bottom-0 w-full backdrop-blur-xl bg-black/50 text-white/95 md:p-4 p-2.5 flex flex-col gap-2 border-t border-white/20">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 className="text-lg font-semibold tracking-wide drop-shadow-md">
                    {card.title}
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-full md:text-sm text-xs font-medium shadow-md hover:bg-emerald-700 transition-all duration-300">
                    {card.btn}
                    <FaArrowRight className="text-xs" />
                    </button>
                </div>

                <p className="text-xs md:text-sm text-gray-200 font-light drop-shadow-md group-hover:hidden text-center">
                    {card.desc1}
                </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
