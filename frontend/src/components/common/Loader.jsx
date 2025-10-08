// components/common/Loader.jsx
import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Optional text */}
      {text && <p className="mt-3 text-gray-600 font-medium">{text}</p>}
    </div>
  );
}
