import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { MdFastfood } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/adminSlice";
import { ClipLoader } from "react-spinners";
const EditItem = () => {
  const navigate = useNavigate();
  const { myshopdata } = useSelector((state) => state.admininfo);
  const { itemId } = useParams(); //  MUST match backend route
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burger",
    "Sandwiche",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [foodtype, setFoodtype] = useState("Veg");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // // FETCH CURRENT ITEM
  // useEffect(() => {
  //   const fetchItem = async () => {
  //     try {
  //       const result = await axios.get(
  //         `${serverUrl}/api/item/get-item/${itemId}`,
  //         { withCredentials: true }
  //       );

  //       const item = result.data;

  //       //  Set form values from backend
  //       setName(item.name);
  //       setPrice(item.price);
  //       setCategory(item.category);
  //       setFoodtype(item.foodtype);
  //       setFrontendImage(item.image);

  //     } catch (error) {
  //       console.log("Get item error:", error);
  //     }
  //   };

  //   fetchItem();
  // }, [itemId]);

  useEffect(() => {
    const handelGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-item/${itemId}`,
          { withCredentials: true },
        );
        setCurrentItem(result.data);
      } catch (error) {
        console.log("Get item by id error:", error);
      }
    };
    handelGetItemById();
  }, [itemId]);

  useEffect(() => {
    if (currentItem) {
      setName(currentItem?.name || "");
      setPrice(currentItem?.price || 0);
      setCategory(currentItem?.category || "");
      setFoodtype(currentItem?.foodtype || "Veg");
      setFrontendImage(currentItem?.image || null);
    }
  }, [currentItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // UPDATE ITEM
  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodtype", foodtype);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch(setMyShopData(result.data));
        setLoading(false);
      // console.log("Item updated successfully");
      // console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log("Edit item error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative">
      <div className="absolute top-[20px] left-[20px]">
        <GoArrowLeft
          size={35}
          className="text-[#C93B2B] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 border border-[#ffe5df]">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-[#ff4d2d]/10 p-5 rounded-full">
            <MdFastfood size={40} className="text-[#C93B2B]" />
          </div>

          <h1 className="text-3xl font-semibold text-center text-[#C93B2B]">
            Edit Food Item
          </h1>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Food Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#C93B2B]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Food Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-xl p-3 
                         file:bg-[#C93B2B] 
                         file:text-white 
                         file:px-4 
                         file:py-2 
                         file:cursor-pointer
                         file:rounded-lg 
                         file:border-none 
                         file:mr-4 
                         hover:file:bg-[#a83224] 
                         transition duration-200"
            />

            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#C93B2B]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Category</label>
            <select
              className="border border-gray-300 rounded-xl p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Food Type</label>
            <select
              className="border border-gray-300 rounded-xl p-3"
              value={foodtype}
              onChange={(e) => setFoodtype(e.target.value)}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#C93B2B] hover:bg-[#a83224] text-white py-3 rounded-xl font-semibold text-lg"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Update Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
