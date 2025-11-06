import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SecondSection from "../components/SecondSection";
import ExploreCategories from "../components/ExploreCategories";
import First from "../components/First";
import Second from "../components/Second";

const Home2 = () => {
  const navigate = useNavigate();

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


  return (
    <main className="w-full overflow-x-hidden">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-10 px-4 sm:px-6 lg:px-20 py-6 lg:py-5 ">
        <div className="w-full my-auto lg:flex-1 flex items-center justify-center">
          <First />
        </div>

        <div className="w-full my-auto lg:flex-1 flex items-center justify-center py-3">
          <Second />
        </div>
      </section>

      {/* Second Section */}
      <SecondSection />

      {/* Third Section */}
      <section className="flex w-full border-t">
        <ExploreCategories />
      </section>
    </main>
  );
};

export default Home2;