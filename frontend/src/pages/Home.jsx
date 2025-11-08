import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeroSection1 from "../components/home/HeroSection1";
import { UserContext } from "../context/user.context";
import SecondSection from "../components/SecondSection";
import ExploreCategories from "../components/ExploreCategories";
import StartLoader from "../components/common/StartLoader";
import { FaArrowDown } from "react-icons/fa";
import {motion} from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const importantImages = [
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275346/bs4_xrstpy.png",
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/f_auto,q_auto,w_1200/v1762275346/bs5_n7u95t.png",
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275348/left_cpy0vq.png",
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275348/left1_pugqlr.png",
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/right_xpdyik.png",
    "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/right1_mktnnw.png",
  ];

  useEffect(() => {
    let loadedCount = 0;

    importantImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === importantImages.length) {
          setLoading(false); // all done!
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === importantImages.length) {
          setLoading(false); // continue even if one fails
        }
      };
    });
  }, []);

  useEffect(() => {
    fetch("https://trueseller-q39b.onrender.com");
    fetch("https://codchat-jvsc.onrender.com");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const redirectPage = params.get("redirectPage");
    console.log(redirectPage);

    if (token) {
      localStorage.setItem("token", token);
      navigate(redirectPage, { replace: true });
    }
  }, [navigate]);

  if (loading) {
    return (
        <StartLoader/>
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      <section className="flex w-full justify-between xl:min-h-[91vh] border-b">
          {/* Left Hero */}
          <div
            className="hidden xl:flex overflow-hidden items-center justify-center"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <img
              src={
                isLeftHovered
                  ? "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275348/left_cpy0vq.png"
                  : "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275348/left1_pugqlr.png"
              }
              alt="left hero"
              className="max-h-[91vh] w-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Center Hero Section */}
        {isLeftHovered ? (
          <div className="flex flex-1">
            <section
              className="relative flex flex-1 xl:h-[91vh] items-center xl:justify-between text-center"
            >
              <img 
                src="https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275346/bs5_n7u95t.png"
                className="h-full w-auto object-cover">
              </img>
              <h2 className="xl:absolute top-19 left-1/2 -translate-x-1/2 md:text-xl text-center text-gray-100 font-bold tracking-tight"
                    style={{
                    WebkitTextStroke: "0.2px #000000ff",
                    color: "white"
                  }}
              >
                <span> True Seller</span>
              </h2>

              <motion.button className="hidden absolute top-[27vh] left-1/2 -translate-x-1/2 xl:flex justify-center items-center gap-2 px-2 py-1 text-basic text-white bg-gradient-to-r from-emerald-600 to-cyan-600 font-medium rounded-full border hover:border-gray-100 cursor-pointer shadow-md shadow-emerald-700/30 hover:shadow-lg transition-all duration-100"
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
            </section>

        </div>

      ):
      (
        <div className="flex flex-1 justify-center">
          <HeroSection1
            isLeftHovered={isLeftHovered}
            setIsLeftHovered={setIsLeftHovered}
          />
        </div>
      )
      
      }

          {/* Right Hero */}
          <div
            className="hidden xl:flex overflow-hidden items-center justify-center"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <img
              src={
                isLeftHovered
                  ? "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/right_xpdyik.png"
                  : "https://res.cloudinary.com/dmfdw5lzn/image/upload/v1762275349/right1_mktnnw.png"
              }
              alt="right hero"
              className="max-h-[91vh] w-auto object-contain"
              loading="lazy"
            />
          </div>
      </section>

      {/* Second Section */}
      <SecondSection />

      {/* Third Section */}
      <div className="flex w-full border-t">
        <ExploreCategories />
      </div>
    </main>
  );
};

export default Home;
