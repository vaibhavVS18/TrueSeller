import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight, FaArrowDown} from "react-icons/fa";
import {motion} from "framer-motion";

const HeroSection1 = ({isLeftHovered, setIsLeftHovered}) => {

  return (
    // <section className="flex flex-col items-center justify-center lg:items-start w-full text-center lg:text-left px-4 sm:px-6 lg:py-0">
      <section
        className={`relative flex flex-col h-auto xl:h-[91vh] items-center xl:justify-between text-center xl:text-left `}
      >

      <div className={`${isLeftHovered ? "hidden" : ""} flex max-h-25 xl:max-h-18 mt-2 xl:mt-0`}>
        <img src="logo2.png" className="h-full w-auto object-cover">
        </img>
      </div>
      
      {/* Brand Name */}
        <h2 className="xl:absolute top-16 text-4xl lg:text-4xl xl:text-3xl mb-2 font-extrabold tracking-tight"
            style={{
              WebkitTextStroke: "0.8px #f3f4f6",
              color: "black"
            }}
        >
          <span className="text-emerald-600">True</span><span className="text-cyan-600">Seller</span>
        </h2>


      {/* Headline */}
      <h1 className="xl:hidden text-2xl lg:text-3xl font-extrabold leading-tight mb-5 md:mb-2 md:mt-1"
      >
        Turn your <span className="text-emerald-600">Passion </span>
         into{" "} <span className="text-cyan-600">Profit</span>
      </h1>

        {/* Tagline */}
      <motion.button className="hidden absolute top-[27vh] xl:flex justify-center items-center gap-2 px-2 py-1 text-basic text-white bg-gradient-to-r from-emerald-600 to-cyan-600 font-medium rounded-full border hover:border-gray-100 cursor-pointer shadow-md shadow-emerald-700/30 hover:shadow-lg transition-all duration-100"
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

      <motion.button className="xl:hidden flex justify-center items-center gap-2 px-2 py-1 mb-2 text-basic md:text-lg text-white bg-gradient-to-r from-emerald-600 to-cyan-600 font-medium rounded-full border hover:border-gray-100 cursor-pointer shadow-md shadow-emerald-700/30 hover:shadow-lg transition-all duration-100"
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
      <p className="xl:hidden text-gray-600 text-sm md:text-lg lg:text-xl leading-relaxed max-w-[60vh] md:max-w-[75vh] p-3">
        Start selling your products online with{" "}
        <span className="font-semibold text-emerald-600">TrueSeller</span> — the
        trusted platform connecting local shopkeepers to customers across India.
        Launch your store in minutes, grow your brand, and earn more with every
        sale. 🚀
      </p>

        {/* imp.-  xl:max-h-[91vh]  , for image wrapper (div) we have to write it again. */}
      <div className={`${isLeftHovered ? "invisible" : ""} flex items-end sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[75vh] xl:max-h-[80.5vh] transition duration-100`}>  
        <img src="https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275346/bs4_xrstpy.png" 
             className="h-full w-auto object-contain"
             loading="lazy"
        ></img>
      </div>
      

    </section>
  );
};

export default HeroSection1;
