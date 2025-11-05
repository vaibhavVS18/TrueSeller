import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight, FaArrowDown} from "react-icons/fa";
import {motion} from "framer-motion";

const HeroSection1 = ({isLeftHovered, setIsLeftHovered}) => {

  return (
    // <section className="flex flex-col items-center justify-center lg:items-start w-full text-center lg:text-left px-4 sm:px-6 lg:py-0">
      <section
        className={`relative flex flex-col flex-1 h-full items-center justify-between text-center lg:text-left sm:px-2 
        ${isLeftHovered ? "bg-[url('https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275346/bs5_n7u95t.png')]" : "" } 
        bg-cover bg-center transition duration-200`}
      >
      
      {/* Brand Name */}
      {
        isLeftHovered ? (
          <h2 className="md:absolute top-19 text-4xl md:text-xl text-gray-100 font-bold mb-2 mt-5 md:mt-0 tracking-tight"
                style={{
                WebkitTextStroke: "0.2px #000000ff",
                color: "white"
              }}
          >
            <span> True Seller</span>
          </h2>
        ):(
          <h2 className="md:absolute top-16 text-4xl md:text-3xl font-extrabold mb-2 mt-5 md:mt-0 tracking-tight"
              style={{
                WebkitTextStroke: "0.8px #f3f4f6",
                color: "black"
              }}
          >
            <span className="text-emerald-600">True</span><span className="text-cyan-600">Seller</span>
          </h2>
        )
      }


      <div className={`${isLeftHovered ? "hidden" : ""} md:absolute flex max-h-20 p-2 mb-6 md:mb-10`}>
        <img src="logo2.png" className="h-24 md:h-16 object-cover">
      </img>
      </div>

      {/* Headline */}
      <h1 className="md:hidden text-2xl md:text-xl font-extrabold leading-tight mb-4 md:mb-2"
      >
        Turn your <span className="text-emerald-600">Passion </span>
         into{" "} <span className="text-cyan-600">Profit</span>
      </h1>

        {/* Tagline */}
      <motion.button className="hidden md:absolute top-47 md:flex justify-center items-center gap-2 px-2 py-1 text-basic text-white bg-gradient-to-r from-emerald-600 to-cyan-600 font-medium rounded-full border hover:border-gray-100 cursor-pointer shadow-md shadow-emerald-700/30 hover:shadow-lg transition-all duration-100"
        onMouseEnter={()=>{setIsLeftHovered(true)}}
        onMouseLeave={()=>(setIsLeftHovered(false))}
        onClick={()=>{
          document.getElementById("features").scrollIntoView({behavior: "smooth"});
        }}

        animate={{
          y: [0, -5, 0], 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
          Explore India's Fastest Growing Marketplace
          <FaArrowDown className="text-sm" />
          
      </motion.button>

      <motion.button className="md:hidden flex justify-center items-center gap-2 px-2 py-1 text-basic text-white bg-gradient-to-r from-emerald-600 to-cyan-600 font-medium rounded-full border hover:border-gray-100 cursor-pointer shadow-md shadow-emerald-700/30 hover:shadow-lg transition-all duration-100"
        onClick={()=>{
          document.getElementById("features").scrollIntoView({behavior: "smooth"});
        }}

        animate={{
          y: [0, -5, 0], 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
          Explore India's Fastest Growing Marketplace
          <FaArrowDown className="text-sm" />
          
      </motion.button>


      {/* Description */}
      <p className="sm:hidden text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-xl p-3">
        Start selling your products online with{" "}
        <span className="font-semibold text-emerald-600">TrueSeller</span> — the
        trusted platform connecting local shopkeepers to customers across India.
        Launch your store in minutes, grow your brand, and earn more with every
        sale. 🚀
      </p>

      {
      <div className={`${isLeftHovered ? "invisible" : ""} flex flex-1 items-end h-full transition duration-100`}>
        <img src="https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275346/bs4_xrstpy.png" className="max-h-[82vh] sm:max-w-[87vh] object-contain"
          loading="lazy"
        ></img>
      </div>
      }

    </section>
  );
};

export default HeroSection1;
