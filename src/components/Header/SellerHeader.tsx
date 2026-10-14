import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "../../assets/Images/noble-house-logo-full.png";
import { useNavigate } from "react-router-dom";

import {
  ChevronDown,
  Layout,
  Zap,
  Shield,
  Cpu,
  Layers,
  Box,
} from "lucide-react";

// TYPES
type MenuItemType = {
  icon: any;
  title: string;
  desc: string;
};

type MegaMenuType = {
  [key: string]: MenuItemType[];
};

// NAV ITEMS
const navItems = [
  { name: "Sell Online" },
  { name: "Fee and Commission" },
  { name: "Shipping and Commission" },
  { name: "Grow Business" },
];

const routeMap: Record<string, string> = {
  "Create Account": "/sellersignup",
  "List Products": "/listProducts",
  "Low Fees": "/seller/fees",
  "Fast Payments": "/seller/payments",
  "Shipping and Commission ": "/seller/shippingandcommission",
  "Grow Business": "/seller/growbusiness",
};

// DROPDOWN DATA 
// push the code 
const megaMenuData: MegaMenuType = {
  "Sell Online": [
    {
      icon: Layout,
      title: "Create Account",
      desc: "Create account and start selling",
    },
    {
      icon: Zap,
      title: "List Products",
      desc: "Add products and reach customers",
    },
  ],
  "Fee and Commission": [
    { icon: Shield, title: "Low Fees", desc: "Transparent pricing structure" },
    { icon: Cpu, title: "Fast Payments", desc: "Secure and quick payouts" },
  ],
  "Shipping and Commission": [
    {
      icon: Layers,
      title: "Shipping and Commission ",
      desc: "Scale your business efficiently",
    },
  ],
  "Grow Business": [
    {
      icon: Box,
      title: "Grow Business",
      desc: "Learn how to grow your business",
    },
  ],
};

const NavMegaMenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* NAVBAR */}
      <div className="w-full px-4 md:px-12 pt-6 sticky top-0 z-50">
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between h-20 
        bg-white/90 backdrop-blur-xl border border-[#E7DCD7] rounded-full px-6 md:px-8 shadow-sm"
        >
          {/* LOGO */}
          <img
            src={img}
            alt="NOBLE HOUSE"
            className="h-9 md:h-10 w-auto object-contain cursor-pointer"
            onClick={() => navigate("/seller")}
          />

          {/* NAV */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative px-3 py-2 font-semibold text-sm text-[#75676A] hover:text-[#4A101C] transition cursor-pointer"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-1">
                  {item.name}
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      hoveredMenu === item.name ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {hoveredMenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-12 left-0 w-87.5 bg-white shadow-xl rounded-2xl p-4 border border-[#E7DCD7] z-50"
                    >
                      {megaMenuData[item.name]?.map((menu, i) => (
                        <div
                          key={i}
                          onClick={() => navigate(routeMap[menu.title])}
                          className="flex gap-3 p-3 hover:bg-[#FAF7F2] rounded-xl cursor-pointer transition"
                        >
                          <div className="bg-[#F1E8E2] text-[#4A101C] p-2 rounded-lg">
                            <menu.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-[#241719]">
                              {menu.title}
                            </h4>
                            <p className="text-xs text-[#75676A]">{menu.desc}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block font-semibold text-sm text-[#75676A] hover:text-[#4A101C] transition px-3 py-2"
              onClick={() => navigate("/seller/login")}
            >
              Log In
            </button>
            <button
              className="bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-[#FAF7F2] px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:brightness-110 transition active:scale-95"
              onClick={() => navigate("/sellersignup")}
            >
              Start Selling
            </button>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <div className="max-w-6xl mx-auto mt-16 px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#812D3A] mb-3">
              Start selling today
            </p>
            <h1 className="font-black text-[#241719] font-google leading-tight">
              <span className="text-4xl md:text-5xl">Sell Online Your</span>
              <br />
              <span className="text-4xl md:text-5xl">Product With</span>
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#B54745] block my-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.2rem, 8vw, 5.2rem)",
                  lineHeight: 1.2,
                }}
              >
                NOBLE HOUSE
              </span>
              <span className="text-4xl md:text-5xl">to Increase Profit</span>
            </h1>
            <p className="text-[#75676A] text-sm md:text-base mt-5 leading-relaxed max-w-md">
              Join thousands of luxury ateliers and grow your creations with our trusted
              platform.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => navigate("/sellersignup")}
                className="px-7 py-3.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white text-sm font-semibold rounded-full shadow-md hover:brightness-110 transition active:scale-95"
              >
                Start Selling
              </button>
              <button
                onClick={() => navigate("/seller/growbusiness")}
                className="px-6 py-3.5 border border-[#E7DCD7] text-[#4A101C] text-sm font-semibold rounded-full hover:bg-[#F1E8E2] transition"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                alt="Seller managing online store"
                className="rounded-3xl shadow-xl w-full object-cover border border-[#E7DCD7]"
              />
              {/* Floating stats card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#E7DCD7]">
                <div className="w-9 h-9 rounded-xl bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] text-lg">
                  📦
                </div>
                <div>
                  <p className="text-xs text-[#75676A] font-medium">
                    Products listed
                  </p>
                  <p className="text-sm font-bold text-[#241719]">4,821 items</p>
                </div>
              </div>
              {/* Floating earnings card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#E7DCD7]">
                <div className="w-9 h-9 rounded-xl bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] text-lg">
                  💰
                </div>
                <div>
                  <p className="text-xs text-[#75676A] font-medium">
                    Monthly earnings
                  </p>
                  <p className="text-sm font-bold text-[#241719]">₹1,28,400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-20 px-4 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: Layout, title: "45M+ Customers", desc: "Trusted shoppers" },
            { icon: Shield, title: "Secure Payments", desc: "Safe & reliable" },
            { icon: Zap, title: "Low Cost", desc: "Best margins" },
            { icon: Cpu, title: "24/7 Support", desc: "Always available" },
            { icon: Box, title: "Big Sale Access", desc: "Exclusive events" },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-xl border border-[#E7DCD7] 
                rounded-2xl p-5 text-center shadow-sm hover:shadow-xl hover:border-[#A66A75] transition"
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 flex items-center justify-center 
                rounded-xl bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white shadow-sm"
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="font-bold text-sm text-[#241719]">
                  {item.title}
                </h4>

                <p className="text-xs text-[#75676A] mt-1">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavMegaMenu;
