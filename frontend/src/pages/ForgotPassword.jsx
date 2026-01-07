import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const ForgotPassword = () => {
  const borderColor = "#ddd";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              />

              <button
                className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                onClick={() => setStep(2)}
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
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />

              <button
                className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
                onClick={() => setStep(3)}
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
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your new password"
                style={{ border: `1px solid ${borderColor}` }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label className="block text-gray-700 font-medium mt-4 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Confirm password"
                style={{ border: `1px solid ${borderColor}` }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="w-full font-semibold py-2 mt-4 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]">
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
