import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
// import { FaUtensils } from "react-icons/fa6";
const AdminDashBoard = () => {
  const yellow = "#E6B800";
  const red = "#C93B2B";
  const navigate = useNavigate();
  const { myshopdata } = useSelector((state) => state.admininfo);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center pt-[120px]">
      <Nav />

      {/* IF RESTAURANT DOES NOT EXIST*/}
      {!myshopdata && (
        <div className="w-full flex justify-center items-center px-4">
          {/* Card Section */}
          <div
            className="
              w-full
              max-w-2xl
              bg-white
              shadow-2xl
              rounded-3xl
              p-10
              text-center
              border
              border-[#ffe5df]
            "
          >
            {/* ===== Food Logo / Icon Section ===== */}
            <div className="text-7xl mb-6">🍔</div>

            <h1
              className="text-5xl text-[#C93B2B] mb-4 tracking-wide"
              style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600 }}
            >
              Add Your Restaurant
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              “Every successful food business starts with a single step.”
              <br />
              Join{" "}
              <span className="font-semibold text-[#C93B2B]">
                {" "}
                <span style={{ color: red }}>Yumm</span>
                <span style={{ color: yellow }}>!es </span>
              </span>
              and serve happiness to thousands of customers.
            </p>

            {/* ===== Get Started Button ===== */}
            <button
              className="
                bg-[#C93B2B]
                hover:bg-[#a83224]
                transition-all duration-300
                text-white
                px-8
                py-3
                rounded-full
                text-lg
                font-semibold
                shadow-lg
                hover:scale-105
              "
              onClick={() => navigate("/create-edit-shop")}
            >
              Get Started
              <GoArrowRight className="inline-block ml-2 mb-1" />
            </button>
          </div>
        </div>
      )}

      {/* RESTAURANT EXISTS SECTION  */}
      {myshopdata && (
        <div className="w-full flex flex-col items-center px-4">
          {/* restaurant info Section */}
          <div
            className="
        w-full
        max-w-4xl
        bg-white
        shadow-2xl
        rounded-3xl
        overflow-hidden
        border
        border-[#ffe5df]
      "
          >
            {/*  Image Section */}
            <div className="relative">
              <img
                src={myshopdata.image}
                alt={myshopdata.name}
                className="w-full h-64 object-cover"
              />

              {/* Edit Button Top Right */}
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="
            absolute
            top-4
            right-4

            hover:bg-[#a83224]
            p-3
            rounded-full
            bg-[#C93B2B]
            shadow-md
            transition
          "
              >
                <RiPencilFill size={25} className="text-white" />
              </button>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#C93B2B] mb-4">
                {myshopdata.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
                <div>
                  <p className="font-semibold">City</p>
                  <p>{myshopdata.city}</p>
                </div>

                <div>
                  <p className="font-semibold">State</p>
                  <p>{myshopdata.state}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="font-semibold">Address</p>
                  <p>{myshopdata.address}</p>
                </div>
              </div>
            </div>
          </div>


          {/*  ADD FOOD ITEM SECTION  */}
          {myshopdata?.items?.length === 0 && (
            <div className="w-full max-w-4xl mt-6 flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-md border border-[#ffe5df]">
              <div>
                <h3 className="text-xl font-semibold text-[#C93B2B]">
                  No Food Items Added
                </h3>
                <p className="text-gray-500 text-sm">
                  Start building your menu and attract hungry customers. Add
                  your first delicious item now!
                </p>
              </div>

              <button
                onClick={() => navigate("/add-item")}
                className="
        bg-[#C93B2B]
        hover:bg-[#a83224]
        text-white
        px-6
        py-2
        rounded-full
        text-sm
        font-semibold
        transition
        duration-300
        flex
        items-center
        gap-2
      "
              > <FiPlus size={20} />
                Add Item         
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
