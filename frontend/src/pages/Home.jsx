import React from "react";
import HeroSection1 from "../components/home/HeroSection1";
import HeroCarousel from "../components/home/HeroCarousel";

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