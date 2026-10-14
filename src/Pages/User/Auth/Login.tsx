import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaHeart,
  FaLock,
  FaMobileAlt,
  FaArrowRight,
  FaGem,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../../../components/Header/Heading";
import img from "../../../assets/Images/noble-house-logo-full.png";
import { Globe3D } from "../../../components/acertunity/3d-globe";
import type { GlobeMarker } from "../../../components/acertunity/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const canContinue = mobile.length === 10 && agreed;

  const handleContinue = () => {
    if (!canContinue) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/otp");
    }, 1500);
  };

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-64px)] relative overflow-y-auto overflow-x-hidden">
        {/* Premium Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&h=1080&fit=crop')`,
            filter: "brightness(0.25) saturate(1.2)",
          }}
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A101C]/90 via-[#351019]/85 to-[#812D3A]/90"></div>

        {/* Animated Gradient Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#812D3A]/25 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A101C]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#E8D9C9]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Accents Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#E8D9C9]/20"
              initial={{
                y: "100%",
                x: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              animate={{
                y: "-20%",
                opacity: [0, 0.35, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              <FaHeart size={Math.random() * 40 + 25} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto h-full px-4 mt-0 md:mt-0">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center h-full py-8">
            {/* Globe Section */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <Globe3DDemo />
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="w-full lg:w-1/2 max-w-md"
            >
              {/* Card Inner */}
              <div className="relative bg-[#FAF7F2] rounded-3xl p-7 md:p-8 shadow-2xl border border-[#E7DCD7]">
                {/* Brand Logo */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center cursor-pointer mb-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    <img
                      src={img}
                      alt="NOBLE HOUSE"
                      className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>

                  <p className="text-[#75676A] text-xs mt-1 flex items-center justify-center gap-1.5 font-medium">
                    <FaHeart size={9} className="text-[#812D3A]" />
                    Welcome to Luxury Boutique
                    <FaHeart size={9} className="text-[#812D3A]" />
                  </p>
                </div>

                {/* Mobile Input */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#241719] mb-1.5">
                    Mobile Number
                  </label>
                  <div
                    className={`flex items-center border-2 rounded-xl transition-all ${
                      mobile.length === 10
                        ? "border-[#287653] bg-white ring-1 ring-[#287653]/30"
                        : "border-[#E7DCD7] focus-within:border-[#4A101C] bg-white"
                    } focus-within:ring-2 focus-within:ring-[#A66A75]/25 bg-white`}
                  >
                    <span className="px-3.5 h-11 flex items-center text-sm font-semibold text-[#241719] border-r border-[#E7DCD7] shrink-0">
                      +91
                    </span>
                    <FaMobileAlt className="ml-2.5 text-[#75676A]" size={14} />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 h-11 outline-none text-sm text-[#241719] px-2.5 placeholder:text-[#75676A]/60 bg-transparent"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {mobile.length === 10 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-3 text-[#287653] text-sm font-bold"
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                  {mobile.length > 0 && mobile.length !== 10 && (
                    <p className="text-[11px] text-[#B54745] mt-1.5 flex items-center gap-1">
                      <span>⚠️</span> Enter valid 10-digit mobile number
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2.5 mb-5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#E7DCD7] accent-[#4A101C] cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[11px] text-[#75676A] leading-relaxed cursor-pointer"
                  >
                    By continuing, I agree to the{" "}
                    <a
                      href="#"
                      className="text-[#4A101C] font-semibold hover:underline"
                    >
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="text-[#4A101C] font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  disabled={!canContinue || isLoading}
                  whileHover={canContinue && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={canContinue && !isLoading ? { scale: 0.98 } : {}}
                  className={`w-full h-12 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 relative overflow-hidden ${
                    canContinue && !isLoading
                      ? "bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#4A101C] text-white shadow-md hover:shadow-lg hover:from-[#351019] hover:to-[#4A101C] cursor-pointer"
                      : "bg-[#F1E8E2] text-[#75676A] cursor-not-allowed border border-[#E7DCD7]"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs">PROCESSING...</span>
                    </div>
                  ) : (
                    <>
                      <span>CONTINUE</span>
                      <FaArrowRight size={11} />
                    </>
                  )}
                </motion.button>

                {/* Help Link */}
                <p className="text-center text-[11px] text-[#75676A] mt-3.5">
                  Trouble logging in?{" "}
                  <a
                    href="#"
                    className="text-[#4A101C] font-semibold hover:underline"
                  >
                    Get luxury concierge help
                  </a>
                </p>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-[#E7DCD7]">
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E7DCD7] flex items-center justify-center group-hover/badge:scale-110 transition shadow-2xs">
                      <FaShieldAlt className="text-[#4A101C] text-[10px]" />
                    </div>
                    <span className="text-[#75676A] text-[10px] font-medium">
                      SECURE
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#E7DCD7]"></div>
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E7DCD7] flex items-center justify-center group-hover/badge:scale-110 transition shadow-2xs">
                      <FaLock className="text-[#4A101C] text-[10px]" />
                    </div>
                    <span className="text-[#75676A] text-[10px] font-medium">
                      ENCRYPTED
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#E7DCD7]"></div>
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E7DCD7] flex items-center justify-center group-hover/badge:scale-110 transition shadow-2xs">
                      <FaHeart className="text-[#4A101C] text-[10px]" />
                    </div>
                    <span className="text-[#75676A] text-[10px] font-medium">
                      TRUSTED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

export function Globe3DDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      {/* Premium Heading */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-3 shadow-xs">
          <FaGem size={10} className="text-[#E8D9C9]" />
          <span className="text-[10px] text-[#FAF7F2] font-semibold tracking-widest uppercase">
            GLOBAL LUXURY PRESENCE
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-tight">
          Global Network of{" "}
          <span className="bg-gradient-to-r from-[#FAF7F2] via-[#E8D9C9] to-white bg-clip-text text-transparent">
            Discerning Patrons
          </span>
        </h2>
        <p className="text-[#FAF7F2]/80 text-xs mt-2">
          Trusted by luxury fashion connoisseurs worldwide
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#E8D9C9] to-[#812D3A] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Globe Container */}
      <div className="w-full h-70 md:h-80 relative">
        <Globe3D
          className="w-full h-full relative z-10"
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#812D3A",
            atmosphereIntensity: 25,
            bumpScale: 5,
            autoRotateSpeed: 0.5,
          }}
          onMarkerClick={(marker) => {
            console.log("Clicked marker:", marker.label);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              console.log("Hovering:", marker.label);
            }
          }}
        />
      </div>

      {/* Stats */}
      <div className="flex gap-8 bg-black/35 backdrop-blur-md rounded-full px-7 py-3 border border-white/20 shadow-lg">
        <div className="text-center">
          <p className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] to-[#E8D9C9]">
            50+
          </p>
          <p className="text-[10px] text-[#FAF7F2]/80 font-medium">Countries</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="text-center">
          <p className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] to-[#E8D9C9]">
            10k+
          </p>
          <p className="text-[10px] text-[#FAF7F2]/80 font-medium">Patrons</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="text-center">
          <p className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] to-[#E8D9C9]">
            24/7
          </p>
          <p className="text-[10px] text-[#FAF7F2]/80 font-medium">Concierge</p>
        </div>
      </div>
    </motion.div>
  );
}
