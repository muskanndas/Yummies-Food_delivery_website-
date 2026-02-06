import React from "react";

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      
      /* Increased box size and improved styling */
      className="group relative 
      w-[200px] h-[200px] md:w-[240px] md:h-[240px]   
      rounded-3xl border border-gray-200             
      shrink-0 overflow-hidden bg-white
      shadow-lg hover:shadow-2xl                     
      transition-all duration-500 ease-in-out
      hover:-translate-y-2 cursor-pointer"
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover
        transition-transform duration-700 ease-in-out
        group-hover:scale-110"   /* smooth zoom on hover */
      />

      <div
        className="absolute bottom-0 w-full
        bg-gradient-to-t from-black/70 to-transparent  
        text-white text-center py-3
        text-base font-semibold tracking-wide"
      >
        {name}
      </div>
    </div>
  );
};

export default CategoryCard;
