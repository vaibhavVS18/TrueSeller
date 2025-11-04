import React, {useContext, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import HeroSection1 from "../components/home/HeroSection1";
import { UserContext } from "../context/user.context";
import SecondSection from "../components/SecondSection";
import ExploreCategories from "../components/ExploreCategories";

const Home = () => {
    const navigate = useNavigate();
    const { user , setUser} = useContext(UserContext);

    const [isLeftHovered, setIsLeftHovered] = useState(false);

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
  <>
       <div className="flex flex-col items-between w-full h-[86vh] sm:h-[91vh] border-b">
        <div className="flex justify-between h-full">

          <div className="hidden h-[90.9vh] sm:flex items-center justify-center"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <img 
              src={isLeftHovered ? "/left.png" : "/left1.png"}
              alt="left hero"
              className="h-full object-contain"
            />
          </div>
          <div className="flex flex-1 justify-center">
            <HeroSection1 isLeftHovered={isLeftHovered} setIsLeftHovered={setIsLeftHovered} />
          </div>

          <div className="hidden h-[90.9vh] sm:flex items-center"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <img 
              src={isLeftHovered ? "/right.png" : "/right1.png"}
              alt="right hero"
              className="h-full object-contain"
            />
          </div>

        </div>
      </div>


      {/* second section of home page */}
        <SecondSection/> 


        {/* Third section */}
      <div className="flex w-full md:h-[90vh] border-t">
        <ExploreCategories />
      </div>
  </>

);

}


export default Home;