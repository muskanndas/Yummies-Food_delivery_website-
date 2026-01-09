import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const borderColor = "#ddd";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // timer for otp expiration
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // FORMAT TIME FUNCTION
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  //fecth controller for fogot password functionality
  const handleSendotp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setTimeLeft(300);
      setStep(2);
    } catch (error) {
      console.error("Error in sending OTP: ", error);
    }
  };

  const handleVerifyotp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.error("Error in verifying OTP: ", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
     alert("Password reset successful");
    navigate("/signin");
    } catch (error) {
      console.error("Error in sending OTP: ", error);
    }
  };
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]">
        <div
          className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-2"
          style={{ border: `1px solid ${borderColor}` }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <IoIosArrowRoundBack
              size={34}
              className="text-[#ff4d2d] cursor-pointer"
              onClick={() => navigate("/signin")}
            />
            <h1 className="text-2xl font-bold text-[#ff4d2d]">
              Forgot Password
            </h1>
          </div>

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                style={{ border: `1px solid ${borderColor}` }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                onClick={handleSendotp}
              >
                Send OTP
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your OTP"
                style={{ border: `1px solid ${borderColor}` }}
                value={otp}
                onChange={(e) => setOTP(e.target.value)} required
              />
              <p className="text-sm text-gray-500 mt-1">
                OTP expires in:{" "}
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </p>

              <button
                className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                onClick={handleVerifyotp}
              >
                Verify
              </button>
            </div>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === 3 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your new password"
                  style={{ border: `1px solid ${borderColor}` }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <FaEye /> : <TbEyeClosed />}
                </button>
              </div>

              <label className="block text-gray-700 font-medium mt-4 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Confirm password"
                  style={{ border: `1px solid ${borderColor}` }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEye /> : <TbEyeClosed />}
                </button>
              </div>

              <button
                className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
