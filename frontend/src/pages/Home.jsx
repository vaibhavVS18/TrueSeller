import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import HeroSection1 from "../components/home/HeroSection1";
import HeroCarousel from "../components/home/HeroCarousel";
import { UserContext } from "../context/user.context";

const Home = () => {
    const navigate = useNavigate();
    const { user , setUser} = useContext(UserContext);

    useEffect(()=>{
      fetch("https://trueseller-q39b.onrender.com");
    }, []);

    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);   // it gives query string part of the url
      const token = params.get("token");
      const redirectPage= params.get("redirectPage");
      console.log(redirectPage);

      if (token) {
        // Save token in localStorage
        localStorage.setItem("token", token);

        // Navigate to original page
        navigate(redirectPage, { replace: true });
      }
    }, []);

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