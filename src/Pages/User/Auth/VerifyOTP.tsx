import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaHeart } from "react-icons/fa";
import Header from "../../../components/Header/Heading";
import img from "../../../assets/Images/noble-house-logo-monogram.png";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mobileNumber = "9876543210"; // This would come from previous page

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    // API call to resend OTP
    console.log("Resend OTP");
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <>
      <Header />
      <div className="min-h-[85vh] bg-[#FAF7F2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white border border-[#E7DCD7] rounded-3xl shadow-xl p-7 md:p-8">
            {/* Brand */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAF7F2] border border-[#E7DCD7] rounded-full mb-4 shadow-xs">
                <img
                  src={img}
                  alt="Logo"
                  className="h-8 w-auto cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#241719]">
                NOBLE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#4A101C]">
                  HOUSE
                </span>
              </h1>
              <div className="w-14 h-0.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="text-center mb-6">
              <p className="text-[#241719] text-base font-semibold mb-1">
                Enter Verification Code
              </p>
              <p className="text-[#75676A] text-xs">
                We've sent a 4-digit security code to{" "}
                <span className="text-[#4A101C] font-semibold">
                  +91 {mobileNumber}
                </span>
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                    digit
                      ? "border-[#4A101C] bg-[#FAF7F2] text-[#4A101C] shadow-xs"
                      : "border-[#E7DCD7] bg-white text-[#241719]"
                  } focus:border-[#4A101C] focus:ring-2 focus:ring-[#A66A75]/30`}
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-xs text-[#75676A]">
                  Resend code in{" "}
                  <span className="text-[#4A101C] font-semibold">{timer}</span>{" "}
                  seconds
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-xs text-[#4A101C] font-semibold hover:text-[#351019] transition underline cursor-pointer"
                >
                  Resend Code
                </button>
              )}
            </div>   

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || isLoading}
              className={`w-full h-12 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                isOtpComplete && !isLoading
                  ? "bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white hover:from-[#351019] hover:to-[#4A101C] shadow-md hover:shadow-lg cursor-pointer"
                  : "bg-[#F1E8E2] text-[#75676A] cursor-not-allowed border border-[#E7DCD7]"
              }`}
            >
              {isLoading ? "VERIFYING..." : "VERIFY & CONTINUE"}
            </button>

            {/* Wrong Number */}
            <p className="text-xs text-[#75676A] mt-4 text-center">
              Wrong number?{" "}
              <button
                onClick={() => navigate(-1)}
                className="text-[#4A101C] font-semibold hover:underline cursor-pointer"
              >
                Edit Number
              </button>
            </p>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-[#E7DCD7]">
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-[#4A101C] text-xs" />
                <span className="text-[#75676A] text-[10px] font-medium tracking-wider">
                  100% SECURE
                </span>
              </div>
              <div className="w-px h-3.5 bg-[#E7DCD7]"></div>
              <div className="flex items-center gap-1.5">
                <FaHeart className="text-[#812D3A] text-xs" />
                <span className="text-[#75676A] text-[10px] font-medium tracking-wider">
                  ENCRYPTED
                </span>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-[#75676A] text-xs mt-6">
            Didn't receive the code? Check your SMS or contact luxury concierge
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpVerificationPage;
