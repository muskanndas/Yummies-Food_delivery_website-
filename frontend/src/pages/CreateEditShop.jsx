import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { MdRestaurant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/adminSlice";
import axios from "axios";

const CreateEditShop = () => {
  const navigate = useNavigate();

  // Getting shop data from Redux
  const { myshopdata } = useSelector((state) => state.admininfo);
  //  console.log( "myshopdata:",myshopdata);

  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.userinfo,
  );
  const [shopName, setShopName] = useState(myshopdata?.name || "");
  const [address, setAddress] = useState(
    myshopdata?.address || currentAddress || "",
  );
  const [city, setCity] = useState(myshopdata?.city || currentCity || "");
  const [state, setState] = useState(myshopdata?.state || currentState || "");
  const [frontendImage, setFrontendImage] = useState(myshopdata?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", shopName);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit-shop`,
        formData,
        { withCredentials: true ,
           headers: {
      "Content-Type": "multipart/form-data"
    }
        });
         dispatch(setMyShopData(result.data))
        //  console.log("Shop created/edited successfully:", result.data);
         navigate("/");
      
    } catch (error) {
      console.error("Error submitting form:", error);
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

      {/* Form Card  */}
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 border border-[#ffe5df]">
        {/* Top Icon  */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-[#ff4d2d]/10 p-5 rounded-full">
            <MdRestaurant size={40} className="text-[#C93B2B]" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-center text-[#C93B2B] mb-8">
              {myshopdata ? "Edit Your Shop Details" : "Add Your Shop Details"}
            </h1>
          </div>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handelSubmit}>
          {/* Shop Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Shop Name</label>
            <input
              type="text"
              placeholder="Enter your shop name"
              className="border border-gray-300 rounded-xl p-3 
                         focus:outline-none 
                         focus:border-[#C93B2B] 
                         focus:ring-2 
                         focus:ring-[#ff4d2d]/20 
                         transition duration-200"
              onChange={(e) => setShopName(e.target.value)}
              value={shopName}
            />
          </div>

          {/* Shop Image */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Shop Image</label>
            <input
              type="file"
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
              onChange={handleImageChange}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="border border-gray-300 rounded-xl p-3 
                         focus:outline-none 
                         focus:border-[#C93B2B] 
                         focus:ring-2 
                         focus:ring-[#ff4d2d]/20 
                         transition duration-200"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            {/* State */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">State</label>
              <input
                type="text"
                placeholder="Enter state"
                className="border border-gray-300 rounded-xl p-3 
                         focus:outline-none 
                         focus:border-[#C93B2B] 
                         focus:ring-2 
                         focus:ring-[#ff4d2d]/20 
                         transition duration-200"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Address</label>
            <textarea
              rows="3"
              placeholder="Enter full address"
              className="border border-gray-300 rounded-xl p-3 
                         focus:outline-none 
                         focus:border-[#C93B2B] 
                         focus:ring-2 
                         focus:ring-[#ff4d2d]/20 
                         transition duration-200 
                         resize-none"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>

          {/* =====  Button ===== */}
          <button
            type="submit"
            className="bg-[#C93B2B] 
                       hover:bg-[#a83224] 
                       cursor-pointer
                       text-white 
                       py-3 
                       rounded-xl 
                       font-semibold 
                       text-lg 
                       shadow-md 
                       transition-all duration-300 
                       hover:scale-[1.02]"
          >
            {myshopdata ? "Update Shop" : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
