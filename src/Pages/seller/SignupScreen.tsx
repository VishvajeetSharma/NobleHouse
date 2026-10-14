import React, { useState } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaStore,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaRocket,
} from "react-icons/fa";
import { MdVerified, MdSecurity } from "react-icons/md";

const SignupPage = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateMobile = (number: any) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleSendOtp = async () => {
    setError("");

    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log(`OTP sent to ${mobile}`);
    }, 1000);
  };

  const handleLogin = async () => {
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("Login Successful 🚀 Welcome to Seller Dashboard!");
      setLoading(false);
      setMobile("");
      setOtp("");
      setOtpSent(false);
    }, 1000);
  };

  const handleMobileChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
    setError("");
  };

  const handleOtpChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (otpSent) {
      handleLogin();
    } else {
      handleSendOtp();
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SECTION */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#4A101C] via-[#351019] to-[#812D3A] text-white p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-white/15">
            <FaRocket className="text-sm text-[#E8D9C9]" />
            <span className="text-xs font-semibold tracking-wide text-[#E8D9C9]">Trusted by 10,000+ Curated Ateliers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-serif">
            Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] via-[#E8D9C9] to-[#d4af37]">
              Atelier Journey
            </span>
          </h1>

          <p className="mb-8 text-sm sm:text-base opacity-90 leading-relaxed max-w-md text-[#E8D9C9]">
            Join India's most prestigious luxury platform and present your artisan creations to discerning patrons nationwide.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-[#E8D9C9]">10L+</div>
              <div className="text-xs text-[#E8D9C9]/80">Patrons</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-[#E8D9C9]">20K+</div>
              <div className="text-xs text-[#E8D9C9]/80">Pincodes</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-[#E8D9C9]">500+</div>
              <div className="text-xs text-[#E8D9C9]/80">Categories</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-[#E8D9C9]">0%</div>
              <div className="text-xs text-[#E8D9C9]/80">Commission</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-[#E8D9C9]">
                <FaStore />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#FAF7F2]">Zero Commission</div>
                <div className="text-xs text-[#E8D9C9]/80">
                  Keep 100% of your earnings
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-[#E8D9C9]">
                <MdVerified />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#FAF7F2]">Quick Setup</div>
                <div className="text-xs text-[#E8D9C9]/80">
                  Start showcasing in minutes
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-[#E8D9C9]">
                <FaShieldAlt />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#FAF7F2]">Secure Payments</div>
                <div className="text-xs text-[#E8D9C9]/80">Reliable settlements</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-[#E8D9C9]">
                <FaHeadset />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#FAF7F2]">Concierge Support</div>
                <div className="text-xs text-[#E8D9C9]/80">
                  Dedicated partner liaison
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-1/2 flex items-center justify-center bg-[#FAF7F2] p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4A101C] to-[#812D3A] rounded-2xl shadow-lg mb-4 text-[#FAF7F2]">
              <FaStore className="text-2xl" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#241719] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Atelier Access
            </h2>
            <p className="text-sm text-[#75676A]">
              {otpSent
                ? "Enter verification code"
                : "Get started with your registered mobile"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#E7DCD7] transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit}>
              {/* Mobile Input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-[#75676A] sm:text-sm font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-3 border border-[#E7DCD7] rounded-xl focus:border-[#4A101C] focus:ring-2 focus:ring-[#A66A75]/20 outline-none transition-all duration-200 text-sm text-[#241719] bg-[#FAF7F2]/40 focus:bg-white"
                    value={mobile}
                    onChange={handleMobileChange}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-2">
                    One Time Password (OTP)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 border border-[#E7DCD7] rounded-xl focus:border-[#4A101C] focus:ring-2 focus:ring-[#A66A75]/20 outline-none transition-all duration-200 text-center text-lg tracking-widest text-[#241719] bg-[#FAF7F2]/40 focus:bg-white"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-2 text-xs font-semibold text-[#812D3A] hover:text-[#4A101C] transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-[#B54745] text-xs font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#4A101C] to-[#812D3A] hover:brightness-110 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {otpSent ? "Verify & Login" : "Send Verification OTP"}
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-[#75676A] mt-6 text-center">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#812D3A] hover:underline">
                  Terms of Partnership
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#812D3A] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>

            {/* Alternative Login */}
            <div className="mt-6 pt-6 border-t border-[#E7DCD7]">
              <p className="text-center text-xs text-[#75676A] mb-3">
                Want to partner as an enterprise brand?
              </p>
              <button className="w-full border border-[#E7DCD7] hover:border-[#4A101C] text-[#241719] py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs font-semibold hover:bg-[#F1E8E2]/50">
                <MdSecurity className="text-[#4A101C]" />
                Register as Luxury Enterprise Atelier
              </button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#75676A]">
            <MdVerified className="text-[#287653]" />
            <span>SSL Certified 256-bit</span>
            <span className="w-1 h-1 bg-[#E7DCD7] rounded-full"></span>
            <MdVerified className="text-[#287653]" />
            <span>Verified Atelier Network</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
