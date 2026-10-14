import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiShield, FiLock, FiServer, FiActivity, FiArrowRight } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "admin@noblehouse.com",
    password: "admin123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (
        credentials.email === "admin@noblehouse.com" &&
        credentials.password === "admin123"
      ) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", credentials.email);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-[#FAF7F2]">
      {/* Decorative Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 text-[#4A101C] text-7xl">
          <FiShield />
        </div>
        <div className="absolute bottom-20 right-10 text-[#812D3A] text-7xl">
          <FiLock />
        </div>
        <div className="absolute top-1/3 right-1/4 text-[#A66A75] text-5xl">
          <FiServer />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-[#812D3A] text-6xl">
          <FiActivity />
        </div>
      </div>

      {/* LEFT SIDE - Admin Visual Branding */}
      <div className="hidden lg:flex w-[50%] relative items-center justify-center p-12 bg-gradient-to-br from-[#4A101C] via-[#351019] to-[#812D3A] text-white">
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl mb-6">
            <RiAdminFill className="text-[#E8D9C9] text-3xl" />
          </div>

          <h1
            className="text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] via-[#E8D9C9] to-[#d4af37]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Noble House
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-[#E8D9C9] font-medium mb-4">
            Luxury Administration Portal
          </p>

          <p className="text-sm text-[#E8D9C9]/85 max-w-md leading-relaxed mb-8">
            Comprehensive atelier governance, product authentication, merchant settlement, and executive commerce telemetry.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-lg font-bold text-[#E8D9C9]">100%</p>
              <p className="text-[10px] text-white/70 uppercase tracking-wider mt-1">Uptime</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-lg font-bold text-[#E8D9C9]">256-Bit</p>
              <p className="text-[10px] text-white/70 uppercase tracking-wider mt-1">Encrypted</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-lg font-bold text-[#E8D9C9]">Multi-Tier</p>
              <p className="text-[10px] text-white/70 uppercase tracking-wider mt-1">Security</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative">
        <div className="w-full max-w-md relative z-10">
          <div className="relative rounded-3xl border border-[#E7DCD7] bg-white shadow-xl p-8 lg:p-10 overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#B54745]" />

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F1E8E2] border border-[#E7DCD7] flex items-center justify-center shadow-xs mb-3">
                <RiAdminFill className="text-[#4A101C] text-2xl" />
              </div>
              <p className="uppercase tracking-[0.2em] text-[#812D3A] text-[10px] font-bold">
                Executive Access
              </p>
              <h2
                className="mt-1 text-2xl font-bold text-[#241719]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Sign In to Console
              </h2>
              <p className="text-xs text-[#75676A] mt-1">
                Enter your administrative credentials to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#75676A] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75676A] text-xs" />
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="admin@noblehouse.com"
                    disabled={loading}
                    className="w-full h-11 rounded-xl border border-[#E7DCD7] bg-[#FAF7F2]/50 pl-10 pr-3 text-xs text-[#241719] outline-none focus:border-[#4A101C] focus:bg-white focus:ring-1 focus:ring-[#A66A75] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#75676A] mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75676A] text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="w-full h-11 rounded-xl border border-[#E7DCD7] bg-[#FAF7F2]/50 pl-10 pr-10 text-xs text-[#241719] outline-none focus:border-[#4A101C] focus:bg-white focus:ring-1 focus:ring-[#A66A75] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75676A] hover:text-[#4A101C] transition"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#75676A] cursor-pointer">
                  <input type="checkbox" className="accent-[#4A101C] w-3.5 h-3.5 rounded" defaultChecked />
                  <span className="text-[11px]">Remember terminal</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Administrative reset requires security key or root access.")}
                  className="text-[11px] font-semibold text-[#812D3A] hover:text-[#4A101C] transition"
                >
                  Forgot Key?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[#B54745] text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white font-semibold tracking-wider text-xs shadow-md hover:brightness-110 active:scale-98 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
                <FiArrowRight size={14} />
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-4 border-t border-[#E7DCD7]">
              <p className="text-center text-[10px] font-bold text-[#812D3A] uppercase tracking-wider mb-2">
                Demonstration Credentials
              </p>
              <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#E7DCD7]">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#75676A]">Email:</span>
                  <span className="text-[#241719] font-mono text-[11px]">admin@noblehouse.com</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#75676A]">Password:</span>
                  <span className="text-[#241719] font-mono text-[11px]">admin123</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[11px] text-[#75676A] mt-5">
              Secure 256-bit Executive Admin Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;