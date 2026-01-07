import React from "react";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const yellow = "#E6B800";
  const red = "#C93B2B";
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
 const [email, setEmail] = useState("");
 
 const [password, setPassword] = useState("");

 //fetch sign up controller

  const handelSignIn = async()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      },{withCredentials:true});
      console.log("Sign In successful:", result.data);
      
    } catch (error) {
      console.error("Sign In failed:", error);
    }
  }

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-2`}
          style={{ border: `1px solid ${borderColor}` }}
        >
          <h1 className="text-3xl font-bold mb-2 flex justify-center">
            <span style={{ color: red }}>Yumm</span>
            <span style={{ color: yellow }}>!es</span>
          </h1>
          <p className="text-gray-600 mb-8">
            SignIn your account to get started with delicious food deliveries
          </p>


          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>


          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Enter your password"
                style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password}
              />
              <button
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <TbEyeClosed />}
              </button>
            </div>
             <p className="italic text-gray-400 font-thin text-sm">password must be 6 character</p>
              

          </div>

          {/* forget password */}
          <div className="mb-4 text-right text-sm text-[#ff4d2d]" onClick={()=>navigate("/forgot-Password")}>
          Forgot Password
          </div>
          
          
          {/* signin buttom*/}
          <button className={`w-full font-semibold py-2 rounded-lg  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handelSignIn}
           >
            SignIn
          </button>

          {/* signin with google*/}
        <button className="w-full mt-4 flex 
        justify-center items-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100">
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        {/* Already have an account*/}
        <p className="mt-6 text-center cursor-pointer" onClick={()=>navigate('/signup')}>
          Want to create an account? <span className="text-orange-500 hover:underline">SignUp</span>
        </p>
        </div>

      </div>
    </>
  );
};

export default SignIn;
