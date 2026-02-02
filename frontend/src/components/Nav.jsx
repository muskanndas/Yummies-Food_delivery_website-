import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { GoPlus } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";


const Nav = () => {
  const yellow = "#E6B800";
  const red = "#C93B2B";

  //getting user data and city from redux store
  const { userdata, currentCity } = useSelector((state) => state.userinfo);
  // console.log(userdata, city);
 const { myshopdata } = useSelector((state) => state.admininfo);

  const [showPopup, setShowPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
    const [orderCount, setOrderCount] = useState(0); 
    // Temporary value (replace later with backend data)
  const dispatch = useDispatch();



  //extra check
  if (!userdata) return null;

  //fetching signout controller
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  return (
    <div
      className="
      w-full h-[80px]
      flex items-center justify-between md:justify-center
      gap-[30px] px-[20px]
      fixed top-0 z-[9999]
      bg-[#fff9f6]
      mt-[20px]
      overflow-visible
    "
    >
      {/* =======MOBILE SEARCH BAR======*/}
      {showSearch && userdata.role === "user" && (
        <div
          className="
          w-[90%]
          h-[70px]
          flex
          fixed
          top-[80px]
          left-[5%]
          bg-white
          shadow-xl
          rounded-lg
          items-center gap-[20px]
          z-[9998]
          md:hidden 
        "
        >
          {/* Location (mobile)*/}
          <div className="flex items-center w-[45%] gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <IoLocationSharp style={{ color: "#C93B2B", fontSize: "30px" }} />
            <div className="text-gray-600 whitespace-normal break-words">
              {currentCity|| "Detecting..."}
            </div>
          </div>

          {/* Search Input (mobile)*/}
          <div className="flex-1 flex items-center gap-[10px] pr-[10px]">
            <IoIosSearch style={{ color: "#C93B2B", fontSize: "30px" }} />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full bg-transparent outline-none text-gray-700 whitespace-normal"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Logo same for mobile and desktop */}
      <h1 className="text-3xl font-bold mb-2 flex justify-center">
        <span style={{ color: red }}>Yumm</span>
        <span style={{ color: yellow }}>!es</span>
      </h1>

       {/* ================= DESKTOP SEARCH (USER ONLY) ================= */}
      {userdata?.role == "user" &&
        (
          <div
            className="
        md:w-[60%] lg:w-[40%]
        h-[70px]
        bg-white
        shadow-xl
        rounded-lg
        md:flex hidden items-center gap-[20px]
      "
          >
            {/* Location (Desktop) */}
            <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
              <IoLocationSharp style={{ color: "#C93B2B", fontSize: "30px" }} />
              <div className="w-[80%] truncate text-gray-600">
                {currentCity || "Detecting..."}
              </div>
            </div>


            {/* Search Input (Desktop) */}
            <div className="w-[80%] flex items-center gap-[10px]">
              <IoIosSearch style={{ color: "#C93B2B", fontSize: "30px" }} />
              <input
                type="text"
                placeholder="Search your favourite food..."
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>
        )}

      {/* RIGHT SECTION (icons, cart, profile) */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon (User only) */}
        {userdata.role === "user" && (
          <>
            {showSearch ? (
              <RxCross2
                style={{ color: "#C93B2B", fontSize: "30px" }}
                className="md:hidden cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            ) : (
              <IoIosSearch
                style={{ color: "#C93B2B", fontSize: "30px" }}
                className="md:hidden cursor-pointer"
                onClick={() => {
                  setShowSearch(true);
                  setShowPopup(false);
                }}
              />
            )}
          </>
        )}
  
        {/* ================= ADMIN BUTTON ================= */}
        {/* Add Food Item (Admin only) */}
        {userdata?.role === "admin" ? (
          <>
          {myshopdata && <>
           {/* Desktop Add Food Item Button */}
            <button className=" hidden md:flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-[#C93B2B] bg-[#ff4d2d]/10 text-[#C93B2B] text-base font-semibold">
              <GoPlus size={20} />
              <span>Add Food Item</span>
            </button>

            {/* Mobile Add Food Item Button */}
            <button className="md:hidden flex items-center cursor-pointer p-2 rounded-full border border-[#C93B2B] bg-[#ff4d2d]/10 text-[#C93B2B] text-base font-semibold">
              <GoPlus size={20} />
            </button>
          </>}
           

             {/* Notifications Icon <div className="hidden md:flex items-center gap-2 cursor-pointer relative p-2 rounded-full bg-[#ff4d2d]/10 border border-[#C93B2B] text-[#C93B2B] text-base font-semibold"> <IoNotificationsOutline size={20}/> <span>Orders</span><span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#C93B2B] rounded-full px-[6px] py-[1px]" >0</span> </div>
             
              <div className="md:hidden flex items-center gap-2 cursor-pointer relative p-2 rounded-full bg-[#ff4d2d]/10 border border-[#C93B2B] text-[#C93B2B] text-base font-semibold"> <IoNotificationsOutline size={20}/> <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#C93B2B] rounded-full px-[6px] py-[1px]" >0</span> </div>
             */}


            {/* 🔔 Bell Notification */}
<div className="relative cursor-pointer flex items-center">

  <IoNotificationsOutline
    className="text-[#C93B2B] bell-animation 
               w-7 h-7 
               sm:w-8 sm:h-15
               md:w-8 md:h-8"
  />

  {orderCount > 0 && (
    <span className="
      absolute 
      -top-1 -right-1 
      sm:-top-2 sm:-right-2
      bg-[#C93B2B] 
      text-white 
      text-[8px] 
      sm:text-[10px]
      font-bold 
      px-1 
      sm:px-1.5 
      py-[1px] 
      rounded-full
    ">
      {orderCount > 99 ? "99+" : orderCount}
    </span>
  )}
</div>


          </>
        ) : (
          <>
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <CiShoppingCart style={{ color: "#C93B2B", fontSize: "40px" }} />
              <span
                className="
            absolute 
            -top-1 
            -right-1 
            bg-[#C93B2B] 
            text-white 
            text-xs 
            font-bold
            rounded-full
            px-1
          "
              >
                0
              </span>
            </div>

            {/* My Order  (Desktop only) */}
            <button
              className="
          hidden md:block 
          px-6 py-3 
          rounded-full 
          border 
          border-[#C93B2B] 
          bg-[#ff4d2d]/10 
          text-[#C93B2B]
          text-base 
          font-semibold
        "
            >
              My Order
            </button>
          </>
        )}

     {/* ================= PROFILE CIRCLE ================= */}
        {/* User Icon */}
        <div
          className="
          w-10 
          h-10 
          rounded-full 
          bg-[#C93B2B]
          text-white 
          flex 
          items-center 
          justify-center 
          text-lg 
          font-bold
          cursor-pointer
        "
          onClick={() => {
            setShowPopup((prev) => !prev); // toggle popup
            setShowSearch(false); // close search bar
          }}
        >
          {/* {userdata?.fullName?.slice(0, 1).toUpperCase()} */}
          {userdata?.fullName ? userdata.fullName.charAt(0).toUpperCase() : ""}
        </div>

        {/* Profile Popup (mobile + desktop)*/}
        {showPopup && (
          <div
            className="
            fixed 
            top-[80px] 
            right-[10px] 
            md:right-[10%] 
            lg:right-[25%] 
            w-[180px] 
            bg-white 
            shadow-2xl 
            rounded-xl 
            p-[20px] 
            flex 
            flex-col 
            gap-[10px] 
            z-[9999]
          "
          >
            <div className="text-[17px] font-semibold">
              {userdata?.fullName}
            </div>

            <div className="md:hidden text-[#C93B2B] font-semibold cursor-pointer">
              My Orders
            </div>

            <div
              className="text-[#C93B2B] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
