// Header.tsx
import { useState, useEffect } from "react";
import img from "../../assets/Images/noble-house-logo-monogram.png";
import { useSelector } from "react-redux";
import { GoChevronDown } from "react-icons/go";
import {
  FaShoppingBag,
  FaUser,
  FaBars,
  FaTimes,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/Searchbar";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { name: "MEN", path: "/category/men", id: "men" },
    { name: "WOMEN", path: "/category/women", id: "women" },
    { name: "KIDS", path: "/category/kids", id: "kids" },
    { name: "BEAUTY", path: "/beauty", id: "beauty" },
    { name: "STUDIO", path: "/studio", id: "studio" },
  ];

  const mobileMenuItems = [
    { icon: FaRegHeart, label: "Wishlist", link: "/wishlist" },
    { icon: FaShoppingBag, label: "Cart", link: "/cart", badge: cartCount },
    { icon: FaUser, label: "My Account", link: "/userprofile" },
  ];

  // Update active category based on current path
  useEffect(() => {
    const matchedCategory = categories.find((cat) => location.pathname === cat.path);
    setActiveCategory(matchedCategory?.name || null);
  }, [location.pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    navigate(category.path);
    window.scrollTo(0, 0);
  };

  const handleCart = () => {
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="text-sm text-white w-full sticky top-0 z-50 bg-white shadow-md ">
      {/* Desktop Header */}
      <div className="hidden md:block  backdrop-blur-xl bg-white/80  border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-13 gap-2">

            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer shrink-0 py-0.5 group"
              onClick={() => handleNavigation("/dashboard")}
            >
              <img
                src={img}
                alt="NOBLE HOUSE"
                className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-sm">
              <SearchBar />
            </div>

            {/* Categories */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`relative py-3 text-[.8rem] flex items-center gap-1 font-garamond font-bold transition-colors duration-200 ${activeCategory === cat.name
                    ? "text-[#4A101C]"
                    : "text-[#75676A] hover:text-[#4A101C]"
                  }`}
              >
                {cat.name}
                <GoChevronDown size={12} />
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full rounded-full transition-transform duration-300"
                  style={{
                    background: "linear-gradient(90deg, #4A101C, #812D3A)",
                    transform: activeCategory === cat.name ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </button>
            ))}

            {/* Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleNavigation("/userprofile")}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-[#4A101C] hover:bg-[#F1E8E2] transition-all duration-200 border border-[#E7DCD7] hover:border-[#4A101C]"
              >
                <FaUser size={13} />
              </button>

              <button
                onClick={() => handleNavigation("/wishlist")}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-[#4A101C] hover:bg-[#F1E8E2] transition-all duration-200 border border-[#E7DCD7] hover:border-[#4A101C]"
              >
                <FaRegHeart size={13} />
              </button>

              <button
                onClick={handleCart}
                className="relative w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-[#4A101C] hover:bg-[#F1E8E2] transition-all duration-200 border border-[#E7DCD7] hover:border-[#4A101C]"
              >
                <FaShoppingBag size={13} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2.5 -right-2 min-w-4.25 h-4.25 rounded-full text-white text-[9px] font-bold flex items-center justify-center px-1"
                    style={{ background: "linear-gradient(135deg, #4A101C, #812D3A)" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              <div className="w-px h-5 bg-gray-200 mx-1" />

              <button
                onClick={() => handleNavigation("/login")}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-semibold text-white tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,16,28,0.25)]"
                style={{ background: "linear-gradient(135deg, #4A101C, #812D3A)" }}
              >
                <FaUser size={12} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white px-3 py-2 flex items-center justify-between gap-2 border-b border-gray-100">
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => handleNavigation("/dashboard")}
        >
          <img
            src={img}
            alt="NOBLE HOUSE"
            className="h-8 w-auto object-contain"
          />
          <span
            className="font-serif font-bold text-sm tracking-[0.12em] text-[#241719] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            NOBLE HOUSE
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <SearchBar searchQuery="" setSearchQuery={() => { }} />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            className="relative p-2 rounded-full border border-gray-400 hover:bg-gray-100 transition"
            onClick={() => handleNavigation("/wishlist")}
          >
            <FaRegHeart size={15} className="text-gray-700" />
          </button>

          <button
            className="relative p-2 rounded-full border border-gray-400 hover:bg-gray-100 transition"
            onClick={handleCart}
          >
            <FaShoppingBag size={15} className="text-gray-700" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full min-w-3.75 h-4.5 flex items-center justify-center px-1"
                style={{ background: "linear-gradient(135deg, #4A101C, #812D3A)" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            className="relative p-2 rounded-full border border-gray-400 hover:bg-gray-100 transition"
            onClick={() => handleNavigation("/userprofile")}
          >
            <FaUser size={15} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Category Section */}
      <div className="md:hidden bg-white border-b border-gray-100 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 px-4 py-2.5 min-w-max">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[11px] font-semibold whitespace-nowrap hover:border-[#812D3A] hover:text-[#4A101C] transition shrink-0"
          >
            <FaBars size={10} />
            All
          </button>

          <div className="w-px h-4 bg-gray-200 shrink-0" />

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                navigate(cat.path);
                window.scrollTo(0, 0);
                setIsMobileMenuOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-serif font-bold whitespace-nowrap transition-all duration-200 shrink-0"
              style={
                activeCategory === cat.name
                  ? { background: "linear-gradient(135deg, #4A101C, #812D3A)", color: "#fff" }
                  : { background: "#FAF7F2", color: "#241719" }
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl md:hidden animate-slideIn">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleNavigation("/dashboard")}
              >
                <img src={img} alt="NOBLE HOUSE" className="h-8 w-auto object-contain" />
                <span
                  className="font-serif font-bold text-base tracking-[0.12em] text-[#241719] uppercase"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  NOBLE HOUSE
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FaTimes size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4 bg-[#F1E8E2]/60 mx-4 mt-4 rounded-xl border border-[#E7DCD7]">
              <button
                style={{ background: "linear-gradient(135deg, #4A101C, #812D3A)" }}
                className="w-full text-white py-2.5 rounded-full font-semibold text-sm shadow-md"
                onClick={() => handleNavigation("/login")}
              >
                Login / Sign Up
              </button>
            </div>

            <div className="border-t border-gray-100 my-2" />

            <div className="px-4 pb-4">
              {mobileMenuItems.map((item, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#F1E8E2] transition"
                  onClick={() => handleNavigation(item.link)}
                >
                  <item.icon className="text-[#75676A]" size={18} />
                  <span className="text-[#241719] text-sm flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-[#F1E8E2] text-[#4A101C] text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Header;