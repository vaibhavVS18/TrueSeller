import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeroSection1 from "../components/home/HeroSection1";
import { UserContext } from "../context/user.context";
import SecondSection from "../components/SecondSection";
import ExploreCategories from "../components/ExploreCategories";

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
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Loading Awesome Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-between w-full h-screen overflow-y-auto md:h-[88vh] lg:h-[91vh] border-b">
        <div className="flex justify-between h-full">
          {/* Left Hero */}
          <div
            className="hidden h-[90.9vh] lg:flex items-center justify-center"
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
              className="h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Center Hero Section */}
          <div className="flex flex-1 justify-center">
            <HeroSection1
              isLeftHovered={isLeftHovered}
              setIsLeftHovered={setIsLeftHovered}
            />
          </div>

          {/* Right Hero */}
          <div
            className="hidden h-[90.9vh] lg:flex items-center"
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
              className="h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <SecondSection />

      {/* Third Section */}
      <div className="flex w-full md:h-[90vh] border-t">
        <ExploreCategories />
      </div>
    </>
  );
};

export default Home;
