import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/adminSlice";
import axios from "axios";

const AdminItemCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true },
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-[#ffe5df] overflow-hidden mt-6 flex flex-col md:flex-row">
      {/* IMAGE BLOCK */}
      <div className="w-full md:w-60 h-56 md:h-60 p-4 border-b md:border-b-0 md:border-r border-[#ffe5df] bg-[#fff9f6] flex items-center justify-center">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover rounded-xl shadow-sm"
        />
      </div>

      {/* CONTENT BLOCK */}
      <div className="flex flex-col justify-between flex-1 p-6 md:p-8">
        <div className="space-y-3 md:space-y-4">
          {/* Food Name */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[#C93B2B]">
            {data.name}
          </h2>

          {/* Category */}
          <p className="text-gray-800 font-medium text-base md:text-lg">
            <span className="text-gray-500 text-xl">Category:</span>{" "}
            {data.category}
          </p>

          {/* Price */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-gray-800 font-medium text-base md:text-lg">
              <span className="text-gray-500">Price:</span> ₹ {data.price}
            </p>
          </div>

          {/* Food Type */}
          <p className="text-sm md:text-base">
            <span className="text-gray-500">Type:</span>{" "}
            <span
              className={`font-semibold ${
                data.foodtype === "Veg" ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.foodtype}
            </span>
          </p>

          <div className="flex gap-4">
            <button
              className="bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 p-3 cursor-pointer rounded-full transition"
              onClick={() => navigate(`/edit-item/${data._id}`)}
            >
              <RiPencilFill size={18} className="text-[#C93B2B]" />
            </button>

            <button
              className="bg-red-100 hover:bg-red-200 p-3 cursor-pointer rounded-full transition"
              onClick={handleDelete}
            >
              <FaTrash size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemCard;
