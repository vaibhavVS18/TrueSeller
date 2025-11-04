import React, { useRef, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  { id: 1, name: "SmartPhones", video:"https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275349/one_savk0s.mp4", startTime: 2, imageTime: 2, category: "smartphones" },
  { id: 2, name: "Beauty Products", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275351/two_qqbwio.mp4", startTime: 0, imageTime: 0, category: "beauty" },
  { id: 3, name: "Watches", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275351/three_tpj6op.mp4", startTime: 0, imageTime: 0, category: "watches" },
  { id: 4, name: "Groceries & oil", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275348/four_ryu0gv.mp4", startTime: 1, imageTime: 7, category: "groceries" },
  { id: 5, name: "Clothes", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275347/five_dppp67.mp4", startTime: 0, imageTime: 0, category: "shirts" },
  { id: 6, name: "Laptops", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275351/six_aq5em5.mp4", startTime: 4, imageTime: 17, category: "laptops" },
  { id: 7, name: "Earbuds", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275350/seven_wwplgf.mp4", startTime: 3, imageTime: 4.2, category: "earbuds" },
  { id: 8, name: "Shoes", video: "https://res.cloudinary.com/dmfdw5lzn/video/upload/v1762275346/eight_kaj6p1.mp4", startTime: 0, imageTime: 0, category: "shoes" },
];


const ExploreCategories = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const videoRefs = useRef([]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
        if (video) {
            const start = categories[index].imageTime;
            // wait until metadata is loaded, 
    /*
    NOte - 
    The "loadedmetadata" event fires when the browser has loaded video information(metadata) like duration, dimensions, etc.
        Until then, you cannot safely set currentTime — it’ll be ignored or error out.

        { once: true } means this listener automatically removes itself after running once (cleaner & memory-safe).
    */        
            video.addEventListener("loadedmetadata",() => {
                    video.currentTime = categories[index].imageTime;

                    if (isMobile) {
                        video.play().catch(() => {});
                    }
                },
                { once: true }
                );
            }
        });
    }, []);


  return (
    <div className="flex flex-col justify-center w-full min-h-[90vh] py-10 bg-gray-50 border-t">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8">
        Explore Product <span className="text-emerald-600">Categories</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-10">
        {categories.map((cat, index) => (
          <Link
            key={cat.id}
            to={`/productsPage?search=${encodeURIComponent(cat.category.trim())}`}
            className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => {
              const video = videoRefs.current[index];
              video.currentTime = cat.startTime; 
              if (video) video.play();
            }}
            onMouseLeave={() => {
              //  pause and reset when leaving
              const video = videoRefs.current[index];
              if (video) {
                video.pause();
                video.currentTime = cat.imageTime;
              }
            }}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)} // store each video reference
              src={cat.video}
              className="w-full h-56 object-cover"
              muted
              loop
              playsInline
            />

            <div className="absolute bottom-0 w-full backdrop-blur-md bg-black/30 py-2 text-center">
              <h3 className="text-white text-lg font-semibold tracking-wide">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

        <div className="flex w-full justify-center items-center">
            <Link className="flex justify-center items-center gap-2 border p-2 px-3 rounded-full text-base text-gray-100 font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:scale-105 cursor-pointer mt-5"
                  to="/productsPage"
            >
                Explore More
                <FaArrowRight className="text-sm"/>
            </Link>
        </div>

    </div>
  );
};

export default ExploreCategories;
