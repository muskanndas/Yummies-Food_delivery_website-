import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const FoodCard = ({ data }) => {
  if (!data) return null;

  const [quantity, setQuantity] = useState(0);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-amber-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-amber-300 text-sm" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div
      className="w-full bg-white rounded-2xl
      border border-gray-100
      shadow-sm hover:shadow-lg
      transition-all duration-300
      flex flex-col overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative w-full h-[210px] overflow-hidden">
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Food Type Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
          px-3 py-1 rounded-full shadow-sm text-xs font-medium flex items-center gap-1">
          {data.foodtype === "Veg" ? (
            <>
              <FaLeaf className="text-green-600" />
              Veg
            </>
          ) : (
            <>
              <FaDrumstickBite className="text-red-600" />
              Non-Veg
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 py-5 space-y-3">

        <h1 className="text-gray-900 text-lg font-semibold tracking-tight">
          {data.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-sm text-gray-500">
            {data.rating?.count || 0} reviews
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-full border border-gray-200
              flex items-center justify-center hover:bg-gray-50 transition"
            >
              <FaMinus size={10} />
            </button>

            <span className="font-medium text-gray-700">
              {quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="w-8 h-8 rounded-full border border-gray-200
              flex items-center justify-center hover:bg-gray-50 transition"
            >
              <FaPlus size={10} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="px-4 py-2 rounded-full
            bg-[#C93B2B] text-white text-sm
            hover:bg-black transition shadow-sm"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
