import { useState } from "react";
import {
  FaChartLine,
  FaTruck,
  FaHeadset,
  FaWallet,
  FaHeart,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaStore,
} from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SellerPartnerPortal = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    navigate("/seller/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#B54745] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Noble House
          </h1>
          <p className="text-[#75676A] font-semibold text-xs tracking-[0.25em] uppercase">
            ATELIER & PARTNER PORTAL
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Brand Message */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#4A101C] via-[#351019] to-[#812D3A] rounded-3xl p-8 text-[#FAF7F2] shadow-2xl border border-[#812D3A]/40 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/15">
                <FaHeart className="text-[#E8D9C9]" />
                <span className="text-xs font-semibold tracking-wide text-[#E8D9C9]">
                  Haute Partner Collective
                </span>
              </div>

              <h2
                className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Craft what makes women feel extraordinary
              </h2>

              <p className="text-sm opacity-90 mb-6 leading-relaxed text-[#E8D9C9]">
                India's foremost destination for curated couture, handcrafted jewelry & luxury beauty. Expand your artisan reach to discerning collectors nationwide.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <FaChartLine className="text-2xl text-[#E8D9C9]" />
                  <div>
                    <p className="font-semibold text-sm text-[#FAF7F2]">Real-time Insights</p>
                    <p className="text-xs text-[#E8D9C9]/80">
                      Sales & inventory analytics
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <FaTruck className="text-2xl text-[#E8D9C9]" />
                  <div>
                    <p className="font-semibold text-sm text-[#FAF7F2]">White-Glove Logistics</p>
                    <p className="text-xs text-[#E8D9C9]/80">Nationwide courier network</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <FaHeadset className="text-2xl text-[#E8D9C9]" />
                  <div>
                    <p className="font-semibold text-sm text-[#FAF7F2]">Dedicated Concierge</p>
                    <p className="text-xs text-[#E8D9C9]/80">
                      24/7 priority seller service
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <FaWallet className="text-2xl text-[#E8D9C9]" />
                  <div>
                    <p className="font-semibold text-sm text-[#FAF7F2]">Accelerated Payouts</p>
                    <p className="text-xs text-[#E8D9C9]/80">Reliable settlements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#E7DCD7]">
                <div className="text-2xl font-bold text-[#4A101C]">50L+</div>
                <div className="text-xs text-[#75676A] mt-0.5">Active Connoisseurs</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#E7DCD7]">
                <div className="text-2xl font-bold text-[#4A101C]">10K+</div>
                <div className="text-xs text-[#75676A] mt-0.5">Curated Ateliers</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#E7DCD7]">
                <div className="text-2xl font-bold text-[#4A101C]">500+</div>
                <div className="text-xs text-[#75676A] mt-0.5">Luxury Niches</div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-[#E7DCD7]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4A101C] to-[#812D3A] rounded-2xl mb-4 shadow-md text-[#FAF7F2]">
                <FaStore className="text-2xl" />
              </div>
              <h3
                className="text-2xl font-bold text-[#241719]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ATELIER LOGIN
              </h3>
              <p className="text-[#75676A] mt-1 text-sm">
                Welcome back to{" "}
                <span className="font-semibold text-[#4A101C]">Noble House</span>
              </p>
              <p className="text-xs text-[#75676A]">
                Sign in to your bespoke partner dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#75676A] mb-2">
                  EMAIL / ATELIER ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MdEmail className="text-[#75676A]" />
                  </div>
                  <input
                    type="email"
                    placeholder="partner@noblehouse.in"
                    className="w-full pl-10 pr-4 py-3 border border-[#E7DCD7] rounded-xl focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] focus:outline-none transition-all text-sm text-[#241719] bg-[#FAF7F2]/50 focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#75676A] mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MdLock className="text-[#75676A]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-[#E7DCD7] rounded-xl focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] focus:outline-none transition-all text-sm text-[#241719] bg-[#FAF7F2]/50 focus:bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-[#75676A] hover:text-[#4A101C]" />
                    ) : (
                      <FaEye className="text-[#75676A] hover:text-[#4A101C]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#75676A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E7DCD7] accent-[#4A101C]"
                  />
                  <span>Remember session</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert("Password reset instructions sent to your registered address")
                  }
                  className="text-xs text-[#812D3A] hover:text-[#4A101C] font-medium transition"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                onClick={() => {
                  localStorage.setItem(
                    "currentSeller",
                    email?.split("@")[0] || email || "default_seller",
                  );
                  navigate("/seller/dashboard");
                }}
                className="w-full bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                Log In to Dashboard
                <FaArrowRight className="text-xs" />
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-[#75676A]">
                New atelier partner?{" "}
                <button
                  onClick={() => navigate("/sellersignup")}
                  className="text-[#812D3A] font-semibold hover:text-[#4A101C] transition ml-1"
                >
                  Apply to sell
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E7DCD7]">
          <div className="text-center">
            <p className="text-xs text-[#75676A]">
              © 2026 Noble House Atelier Network. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-3 text-xs text-[#75676A]/80">
              <a href="#" className="hover:text-[#4A101C] transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#4A101C] transition">
                Terms of Partnership
              </a>
              <a href="#" className="hover:text-[#4A101C] transition">
                Shipping Standards
              </a>
              <a href="#" className="hover:text-[#4A101C] transition">
                Concierge Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SellerPartnerPortal;
