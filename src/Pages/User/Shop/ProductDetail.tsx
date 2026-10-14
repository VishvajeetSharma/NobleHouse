import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";
import { Footer } from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/wishlistSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/Card/CardComponent";

import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaMinus,
  FaPlus,
  FaTruck,
  FaExchangeAlt,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaChevronRight,
  FaTimes,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { IconIcons } from "@tabler/icons-react";
import { IoBagHandleOutline } from "react-icons/io5";
//import SellerProductsComponent from "../../seller/dashboard/Product";

// ── Static addresses ──
const addressList = [
  {
    id: 1,
    type: "Home",
    name: "Riya Sharma",
    phone: "+91 98765 43210",
    line: "42, Linking Road, Bandra West",
    city: "Mumbai",
    pincode: "400050",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "Riya Sharma",
    phone: "+91 98765 43210",
    line: "WeWork, Andheri East",
    city: "Mumbai",
    pincode: "400093",
    isDefault: false,
  },
  {
    id: 3,
    type: "Other",
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    line: "15, MG Road, Pune",
    city: "Pune",
    pincode: "411001",
    isDefault: false,
  },
];

// ── Static reviews ──
const reviews = [
  {
    id: 1,
    name: "Ananya M.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    rating: 5,
    date: "12 Mar 2024",
    title: "Absolutely love it!",
    body: "The fabric quality is amazing and the fit is perfect. Got so many compliments!",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop",
  },
  // {
  //   id: 2,
  //   name: "Shruti K.",
  //   avatar:
  //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
  //   rating: 4,
  //   date: "05 Mar 2024",
  //   title: "Great purchase",
  //   body: "Looks exactly like the picture. Delivery was fast. Would recommend!",
  //   image: null,
  // },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  //const[beautyProductSize , setBeautyProductSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedAddress, setSelectedAddress] = useState(addressList[0]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const products = useSelector((state: any) => state.products.products);

  const product = products.find((p: any) => p.id == Number(id));
  console.log("Product Details ", product);
  const isWishlisted = useSelector((state: any) =>
    state.wishlist.wishlistItems.some((w: any) => w.id === product?.id)
  );
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const isInCart = cartItems.some(
    (cartItem: any) =>
      cartItem.id === product?.id && cartItem.size === selectedSize
  );
  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`f${i}`} className="text-yellow-400 text-xs" />
        ))}
        {half && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`e${i}`} className="text-yellow-400 text-xs" />
        ))}
      </div>
    );
  };
  const hasSizeSelector = ["Topwear", "Bottomwear"].includes(
    product?.mainCategory
  );
  const productImages = [
    product?.image,
    "https://images.unsplash.com/photo-1776811789960-0de476026ce1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    product?.image,
    product?.image,
  ];

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product!.id));

      Swal.fire({
        title: "Removed from Wishlist",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      dispatch(
        addToWishlist({
          id: product!.id,
          name: product!.name,
          price: product!.price,
          originalPrice: product!.originalPrice || null,
          image: product!.image,
          quantity,
          size: selectedSize,
        })
      );

      Swal.fire({
        title: "Added to Wishlist",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  const handleAddCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (isInCart) {
      navigate("/cart");
    } else {
      dispatch(
        addToCart({
          id: product!.id,
          name: product!.name,
          price: product!.price,
          originalPrice: product!.originalPrice || null,
          image: product!.image,
          quantity,
          size: selectedSize,
          sellerId: product.sellerId,
          returnAvailable: product.returnAvailable,
          exchangeAvailable: product.exchangeAvailable,
        })
      );

      Swal.fire({
        title: "Add To Cart ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    window.scrollTo(0, 0);
  };
  const handleShare = async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url: window.location.href,
        });
      } catch (_) { }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  let relatedProducts = products.filter(
    (p: any) =>
      p.mainCategory === product?.mainCategory &&
      p.gender === product?.gender &&
      p.id !== product?.id
  );
  if (relatedProducts.length === 0)
    relatedProducts = products
      .filter((p: any) => p.id !== product?.id)
      .slice(0, 8);
  const displayProducts = relatedProducts.slice(0, 8);

  const avgRating = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);
  // for size selection
  // let options: string[] = [];

  // if (product?.mainCategory === "Beauty") {
  //   options = ["200 ml", "400 ml", "500 ml", "1 L"];
  // } else if (
  //   product?.mainCategory === "Jewelry" ||
  //   product?.mainCategory === "Accessories"
  // ) {
  //   options = ["One Size"];
  // } else {
  //   options = ["XS", "S", "M", "L", "XL", "XXL"];
  // }
  // for Size selection

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-20">
          <div className="text-center p-8 bg-white rounded-2xl border border-[#E7DCD7] shadow-sm max-w-md mx-4">
            <h2 className="text-2xl font-serif font-bold text-[#241719] mb-2">Product Not Found</h2>
            <p className="text-[#75676A] text-sm mb-6">
              The product you are looking for may have been archived or is temporarily unavailable.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              style={{ background: "linear-gradient(135deg,#4A101C,#812D3A)" }}
            >
              Back to Collections
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .f1{animation:fadeUp 0.5s ease 0.05s both}
        .f2{animation:fadeUp 0.5s ease 0.15s both}

        @keyframes modalIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .modal-in { animation: modalIn 0.3s cubic-bezier(0.34,1.2,0.64,1) both; }

        .addr-row {
          display:flex; align-items:flex-start; gap:12px;
          padding:14px 16px; border-radius:16px;
          border:1.5px solid #E7DCD7; background:#fff;
          cursor:pointer; transition:all 0.2s;
        }
        .addr-row:hover { border-color:#812D3A; background:#FAF7F2; }
        .addr-row.selected { border-color:#4A101C; background:linear-gradient(135deg,#FAF7F2,#F1E8E2); }

        .review-card {
          background:#fff; border:1px solid #E7DCD7;
          border-radius:20px; padding:20px;
          transition:all 0.2s;
        }
        .review-card:hover { border-color:#812D3A; box-shadow:0 8px 24px rgba(74,16,28,0.07); }

        .tab-btn { position:relative; padding:14px 0; font-size:13px; font-weight:600;
          transition:color 0.2s; background:none; border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; color:#75676A; }
        .tab-btn.active { color:#4A101C; }
        .tab-btn.active::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:2px; border-radius:99px;
          background:linear-gradient(90deg,#4A101C,#812D3A);
        }
      `}</style>

      <div className="min-h-screen bg-[#FAF7F2]">
        {/* Back button mobile */}
        <button
          onClick={() => navigate(-1)}
          className="flex md:hidden fixed top-5 left-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-[#FAF7F2] border border-[#E7DCD7] transition"
        >
          <FaArrowLeft size={15} className="text-[#241719]" />
        </button>

        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-0">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7DCD7] overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* ── LEFT: Images ── */}
              <div className="lg:w-1/2 bg-gradient-to-br from-[#FAF7F2] to-white p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#E7DCD7]">
                <div className="relative bg-white overflow-hidden mb-4 border border-[#E7DCD7] rounded-xl">
                  <img
                    src={
                      productImages[selectedImage] ||
                      "https://i.pinimg.com/736x/b9/6d/58/b96d5896468ec6a93899154b4c480426.jpg"
                    }
                    alt={product.name}
                    className="w-full h-auto object-cover max-h-150 transition-transform duration-700 hover:scale-105"
                  />

                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white shadow-sm"
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          background:
                            product.badge === "TRENDING"
                              ? "linear-gradient(135deg,#4A101C,#812D3A)"
                              : product.badge === "NEW"
                              ? "linear-gradient(135deg,#287653,#812D3A)"
                              : product.badge === "SALE"
                              ? "linear-gradient(135deg,#B54745,#812D3A)"
                              : "linear-gradient(135deg,#4A101C,#812D3A)",
                        }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      border: isWishlisted
                        ? "1.5px solid #4A101C"
                        : "1.5px solid #E7DCD7",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    {isWishlisted ? (
                      <FaHeart size={15} style={{ color: "#4A101C" }} />
                    ) : (
                      <FaRegHeart size={15} className="text-[#75676A]" />
                    )}
                  </button>

                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={handleShare}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(8px)",
                        border: "1.5px solid #E7DCD7",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      }}
                    >
                      <FaShareAlt size={14} className="text-[#75676A]" />
                    </button>
                    {showShareTooltip && (
                      <div
                        className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-xl text-[11px] text-white whitespace-nowrap shadow-lg"
                        style={{
                          background: "linear-gradient(135deg,#4A101C,#812D3A)",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        Link copied ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 justify-center">
                  {productImages?.map((img: string, idx: any) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        selectedImage === idx
                          ? "border-[#4A101C] shadow-md scale-105"
                          : "border-[#E7DCD7] hover:border-[#812D3A]"
                      }`}
                    >
                      <img
                        src={
                          img ||
                          "https://i.pinimg.com/736x/b9/6d/58/b96d5896468ec6a93899154b4c480426.jpg"
                        }
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Product Info ── */}
              <div className="lg:w-1/2 p-6 md:p-8 lg:p-10">
                {/* Category */}
                <div className="mb-4">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      background: "linear-gradient(135deg,#FAF7F2,#F1E8E2)",
                      color: "#4A101C",
                      border: "1px solid #E7DCD7",
                    }}
                  >
                    {product.category || "Luxury Fashion"}
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-2xl md:text-3xl font-semibold text-[#241719] mb-2 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  {product?.name || "Kurti"}
                </h1>

                {/* Rating */}
                <div className="flex flex-col items-start gap-3 mb-1">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating || 4.5)}
                    </div>
                    <span
                      className="text-sm text-[#75676A]"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      {product.rating || 128} reviews
                    </span>
                    <span
                      className="text-sm text-[#75676A]"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      ( {product.ratingCount || 140} )
                    </span>
                    <div className="w-px h-3.5 bg-[#E7DCD7]" />
                  </div>
                </div>

                {/* Price */}
                <div className="pb-3 border-b border-[#E7DCD7]">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl md:text-3xl font-bold"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        background: "linear-gradient(135deg,#4A101C,#812D3A)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ₹{product.price || "499"}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span
                          className="text-base text-[#75676A] line-through"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            background:
                              "linear-gradient(135deg,#FAF7F2,#F1E8E2)",
                            color: "#B54745",
                            border: "1px solid #E7DCD7",
                          }}
                        >
                          {product.discount ||
                            `${Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}% OFF`}
                        </span>
                      </>
                    )}
                  </div>
                  <p
                    className="text-[11px] text-[#75676A] mt-1.5"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#75676A] text-[13px] mb-3 leading-relaxed font-google font-light">
                  {product.description ||
                    `Premium quality ${product.name} crafted for
                  comfort and style. Perfect for any occasion — elegance meets
                  everyday wearability.`}
                </p>

                {/* Size */}
                <div className="flex items-center gap-2 flex-wrap">
                  {product?.sizeAvailability?.map((opt: any) => {
                    const isLowStock = opt.stock > 0 && opt.stock < 30;

                    return (
                      <div key={opt.size} className="relative inline-block">
                        <button
                          onClick={() => setSelectedSize(opt.size)}
                          disabled={!opt.stock}
                          className="w-auto px-3.5 h-8 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                          style={{
                            border:
                              selectedSize === opt.size
                                ? "2px solid #4A101C"
                                : "1.5px solid #E7DCD7",

                            background:
                              selectedSize === opt.size
                                ? "linear-gradient(135deg,#FAF7F2,#F1E8E2)"
                                : isLowStock
                                ? "#fef2f2"
                                : "#fff",

                            color:
                              selectedSize === opt.size
                                ? "#4A101C"
                                : !opt.stock
                                ? "#d1d5db"
                                : isLowStock
                                ? "#B54745"
                                : "#75676A",

                            cursor: !opt.stock ? "not-allowed" : "pointer",
                            textDecoration: !opt.stock
                              ? "line-through"
                              : "none",
                            fontWeight: selectedSize === opt.size ? 600 : 400,
                          }}
                        >
                          {opt.size}
                        </button>

                        {/* Low Stock Badge */}
                        {isLowStock && opt.stock > 0 && (
                          <span
                            className="absolute -top-3 -right-2 bg-[#B54745] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
                            style={{
                              animation: "pulse 1.5s infinite",
                            }}
                          >
                            {opt.stock} left
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quantity */}
                <div className="mb-3 mt-2">
                  <p
                    className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#75676A] mb-3"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                      className="w-9 h-7 rounded-xl border border-[#E7DCD7] flex items-center justify-center hover:border-[#812D3A] hover:bg-[#FAF7F2] transition-all cursor-pointer"
                    >
                      <FaMinus size={11} className="text-[#75676A]" />
                    </button>
                    <span
                      className="w-10 text-center text-lg font-semibold text-[#241719]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-7 rounded-xl border border-[#E7DCD7] flex items-center justify-center hover:border-[#812D3A] hover:bg-[#FAF7F2] transition-all cursor-pointer"
                    >
                      <FaPlus size={11} className="text-[#75676A]" />
                    </button>
                  </div>
                </div>

                {/* ── Delivery Address ── */}
                <div className="pb-3 border-b border-[#E7DCD7]">
                  <p
                    className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#75676A] mb-3"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Deliver To
                  </p>
                  <div
                    className="flex items-start justify-between gap-3 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg,#FAF7F2,#F1E8E2)",
                      border: "1px solid #E7DCD7",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: "linear-gradient(135deg,#4A101C,#812D3A)",
                        }}
                      >
                        <FaMapMarkerAlt size={12} color="#fff" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p
                            className="text-sm font-semibold text-[#241719]"
                            style={{ fontFamily: "'DM Sans',sans-serif" }}
                          >
                            {selectedAddress.name}
                          </p>
                          <span
                            className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
                            style={{
                              background: "#fff",
                              color: "#4A101C",
                              border: "1px solid #E7DCD7",
                              fontFamily: "'DM Sans',sans-serif",
                            }}
                          >
                            {selectedAddress.type}
                          </span>
                        </div>
                        <p
                          className="text-xs text-[#75676A] leading-relaxed"
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 300,
                          }}
                        >
                          {selectedAddress.line}, {selectedAddress.city} –{" "}
                          {selectedAddress.pincode}
                        </p>
                        <p
                          className="text-[10px] text-[#75676A] mt-0.5"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          {selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#4A101C] hover:text-[#812D3A] transition-colors shrink-0 mt-1 cursor-pointer"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      Change <FaChevronRight size={9} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-3 mt-3">
                  <button
                    onClick={handleAddCart}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,16,28,0.25)] cursor-pointer"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      background: "linear-gradient(135deg,#4A101C,#812D3A)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {isInCart ? (
                      <span className="flex items-center justify-center gap-2">
                        Go to Cart
                        <FaArrowRight size={15} />
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <IoBagHandleOutline size={18} />
                        Add to Cart
                      </span>
                    )}
                  </button>
                </div>

                {/* Delivery Info */}
                {[
                  {
                    icon: FaTruck,
                    title: "Free Delivery",
                    sub: "On orders ₹999+",
                  },
                  {
                    icon: FaExchangeAlt,
                  },
                  {
                    icon: FaShieldAlt,
                    title: "Secure Payment",
                    sub: "100% safe",
                  },
                  {
                    icon: FaClock,
                    title: "Fast Shipping",
                    sub: "3–5 business days",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 font-google rounded-xl hover:bg-[#FAF7F2] transition-all duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#FAF7F2,#F1E8E2)",
                      }}
                    >
                      <item.icon size={13} style={{ color: "#4A101C" }} />
                    </div>

                    <div>
                      {index === 1 ? (
                        <>
                          <p className="text-xs font-semibold text-[#241719] font-google">
                            {product?.exchangeAvailable &&
                            product?.returnAvailable
                              ? "Return & Exchange Available"
                              : "Return/Exchange Not Available on this Product "}
                          </p>

                          <p className="text-[10px] text-[#75676A] font-google">
                            {product?.exchangeAvailable &&
                            product?.returnAvailable
                              ? "14 day policy"
                              : "This product is non-returnable"}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-[#241719]">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#75676A]">
                            {item.sub}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tabs + Reviews — Two column layout ── */}
            <div className="border-t border-[#E7DCD7] bg-[#FAF7F2]">
              <div className="max-w-7xl mx-auto">
                <div
                  className="flex flex-col lg:flex-row"
                  style={{ minHeight: 520 }}
                >
                  {/* LEFT — Tab Sidebar */}
                  <div
                    className="lg:w-[30vw] shrink-0 bg-white border-r border-[#E7DCD7] px-4 py-7"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {/* Sidebar label */}
                    <p className="text-[1rem] font-bold tracking-widest uppercase text-[#241719] px-3 pb-3 border-b border-[#E7DCD7] mb-3">
                      Product Info
                    </p>

                    {/* Tab buttons */}
                    <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible mb-4">
                      {[
                        {
                          id: "description",
                          label: "Product Details",
                          sub: "Features & specs",
                          iconBg: "#FAF7F2",
                          iconBorder: "#E7DCD7",
                          icon: (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#4A101C"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                          ),
                        },
                        {
                          id: "care",
                          label: "Care Guide",
                          sub: "Wash & maintain",
                          iconBg: "#FAF7F2",
                          iconBorder: "#E7DCD7",
                          icon: (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#812D3A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          ),
                        },
                        {
                          id: "shipping",
                          label: "Shipping Info",
                          sub: "Delivery & returns",
                          iconBg: "#FAF7F2",
                          iconBorder: "#E7DCD7",
                          icon: (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#4A101C"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                            </svg>
                          ),
                        },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal w-full cursor-pointer"
                          style={{
                            background:
                              activeTab === tab.id ? "#fff" : "transparent",
                            border:
                              activeTab === tab.id
                                ? "0.5px solid #E7DCD7"
                                : "0.5px solid transparent",
                            boxShadow:
                              activeTab === tab.id
                                ? "0 1px 4px rgba(74,16,28,0.08)"
                                : "none",
                          }}
                        >
                          {/* Icon box */}
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: tab.iconBg,
                              border: `0.5px solid ${tab.iconBorder}`,
                            }}
                          >
                            {tab.icon}
                          </div>
                          <div>
                            <p
                              className="text-sm leading-tight"
                              style={{
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                color:
                                  activeTab === tab.id ? "#4A101C" : "#75676A",
                              }}
                            >
                              {tab.label}
                            </p>
                            <p className="text-[10.5px] text-[#75676A]">
                              {tab.sub}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* ── Tab content panels ── */}
                    <div className="border-t border-[#E7DCD7] pt-4">
                      {/* Description */}
                      {activeTab === "description" && (
                        <div>
                          <h3
                            className="text-base font-semibold text-[#241719] mb-3"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            Product Details
                          </h3>
                          <p className="text-xs text-[#75676A] leading-relaxed mb-4 font-light">
                            Crafted from premium materials, designed for
                            everyday comfort and lasting style.
                          </p>
                          <div className="flex flex-col gap-2">
                            {[
                              "Premium quality fabric",
                              "Comfortable & breathable",
                              "Easy to care & maintain",
                              "Available in multiple sizes",
                              "Perfect for luxury everyday wear",
                            ].map((feat) => (
                              <div
                                key={feat}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#4A101C,#812D3A)",
                                  }}
                                />
                                <span className="text-xs text-[#241719]">
                                  {feat}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Care */}
                      {activeTab === "care" && (
                        <div>
                          <h3
                            className="text-base font-semibold text-[#241719] mb-3"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            Care Instructions
                          </h3>
                          <div className="flex flex-col gap-3">
                            {[
                              {
                                color: "#812D3A",
                                bg: "#FAF7F2",
                                text: "Machine wash cold, similar colors",
                              },
                              {
                                color: "#B54745",
                                bg: "#FAF7F2",
                                text: "No bleach or tumble dry",
                              },
                              {
                                color: "#75676A",
                                bg: "#FAF7F2",
                                text: "Iron on low heat if needed",
                              },
                              {
                                color: "#287653",
                                bg: "#FAF7F2",
                                text: "Dry in shade, maintain colour",
                              },
                            ].map((c) => (
                              <div
                                key={c.text}
                                className="flex items-center gap-2.5"
                              >
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[#E7DCD7]"
                                  style={{ background: c.bg }}
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: c.color }}
                                  />
                                </div>
                                <span className="text-xs text-[#75676A] leading-relaxed">
                                  {c.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Shipping */}
                      {activeTab === "shipping" && (
                        <div>
                          <h3
                            className="text-base font-semibold text-[#241719] mb-3"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            Shipping Info
                          </h3>
                          <div className="flex flex-col gap-3">
                            {[
                              {
                                color: "#4A101C",
                                bg: "#FAF7F2",
                                text: "Free delivery above ₹999",
                              },
                              {
                                color: "#287653",
                                bg: "#FAF7F2",
                                text: "3–5 business days delivery",
                              },
                              {
                                color: "#812D3A",
                                bg: "#FAF7F2",
                                text: "Easy returns within 14 days",
                              },
                              {
                                color: "#4A101C",
                                bg: "#FAF7F2",
                                text: "Real-time order tracking",
                              },
                            ].map((s) => (
                              <div
                                key={s.text}
                                className="flex items-center gap-2.5"
                              >
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[#E7DCD7]"
                                  style={{ background: s.bg }}
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: s.color }}
                                  />
                                </div>
                                <span className="text-xs text-[#75676A] leading-relaxed">
                                  {s.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ══════════════════════
          RIGHT — Reviews
      ══════════════════════ */}
                  <div
                    className="flex-1 px-5 lg:px-8 py-7 bg-white overflow-y-auto"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {/* Sidebar label */}
                    <div className="flex items-center">
                      <p className="text-[1.5rem] font-bold font-garamond text-[#241719] px-3 pb-3 border-b border-[#E7DCD7] mb-3">
                        Ratings
                      </p>
                    </div>
                    {/* ── Rating hero row ── */}
                    <div className="flex items-center gap-6 pb-5 border-b border-[#E7DCD7] mb-5">
                      {/* Big number */}
                      <div className="text-center shrink-0">
                        <p
                          className="leading-none mb-1 font-bold"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 52,
                            color: "#4A101C",
                          }}
                        >
                          {avgRating}
                        </p>
                        <div className="flex justify-center gap-0.5 mb-1">
                          {renderStars(Number(avgRating))}
                        </div>
                        <p className="text-[10px] text-[#75676A]">
                          {reviews.length} verified reviews
                        </p>
                      </div>

                      {/* Rating bars */}
                      <div className="flex-1 space-y-1.5">
                        {[
                          { star: 5, count: 218, color: "#287653" },
                          { star: 4, count: 44, color: "#812D3A" },
                          { star: 3, count: 21, color: "#eab308" },
                          { star: 2, count: 8, color: "#f97316" },
                          { star: 1, count: 14, color: "#B54745" },
                        ].map((r) => {
                          const total = 305;
                          const pct = Math.round((r.count / total) * 100);
                          return (
                            <div
                              key={r.star}
                              className="flex items-center gap-2"
                            >
                              <span className="text-[11px] text-[#75676A] w-3 text-right shrink-0">
                                {r.star}
                              </span>
                              <FaStar
                                size={9}
                                style={{ color: r.color, flexShrink: 0 }}
                              />
                              <div className="flex-1 h-1.5 rounded-full bg-[#FAF7F2] border border-[#E7DCD7]/60 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${pct}%`,
                                    background: r.color,
                                  }}
                                />
                              </div>
                              <span className="text-[10px] text-[#75676A] w-6 shrink-0">
                                {r.count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Customer photos strip ── */}
                    <p className="text-[9.5px] font-bold tracking-[0.15em] uppercase text-[#75676A] mb-2.5">
                      Customer Photos (
                      {reviews.filter((r: any) => r.image).length})
                    </p>
                    <div
                      className="flex gap-2 overflow-x-auto pb-1 mb-5"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {reviews
                        .filter((r: any) => r.image)
                        .map((rev: any) => (
                          <div
                            key={rev.id}
                            className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#E7DCD7] cursor-pointer hover:scale-105 transition-transform duration-200"
                          >
                            <img
                              src={rev.image}
                              alt="Customer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      {reviews.filter((r: any) => r.image).length > 0 && (
                        <div
                          className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#FAF7F2] transition-all text-[10px] font-bold text-[#4A101C]"
                          style={{ border: "1.5px dashed #E7DCD7" }}
                        >
                          +12
                        </div>
                      )}
                    </div>

                    {/* ── Review list ── */}
                    <p className="text-[9.5px] font-bold tracking-[0.15em] uppercase text-[#75676A] mb-3">
                      Customer Reviews ({reviews.length})
                    </p>

                    <div className="divide-y divide-[#E7DCD7]">
                      {reviews.map((rev: any) => {
                        const ratingStyle =
                          rev.rating >= 4
                            ? {
                                bg: "#FAF7F2",
                                text: "#287653",
                                star: "#287653",
                              }
                            : rev.rating === 3
                            ? {
                                bg: "#FAF7F2",
                                text: "#ca8a04",
                                star: "#eab308",
                              }
                            : {
                                bg: "#FAF7F2",
                                text: "#B54745",
                                star: "#B54745",
                              };

                        return (
                          <div key={rev.id} className="py-4">
                            {/* Top row — avatar + name + date */}
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={rev.avatar}
                                  alt={rev.name}
                                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#E7DCD7]"
                                />
                                <div>
                                  <p className="text-sm font-medium text-[#241719] leading-none">
                                    {rev.name}
                                  </p>
                                  {/* Verified badge */}
                                  <span
                                    className="inline-flex items-center gap-1 text-[9.5px] font-medium px-2 py-0.5 rounded-full mt-1"
                                    style={{
                                      background: "#FAF7F2",
                                      color: "#287653",
                                      border: "0.5px solid #E7DCD7",
                                    }}
                                  >
                                    <FaCheck size={7} /> Verified Purchase
                                  </span>
                                </div>
                              </div>
                              <p className="text-[10px] text-[#75676A] shrink-0">
                                {rev.date}
                              </p>
                            </div>

                            {/* Rating badge + title */}
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border border-[#E7DCD7]"
                                style={{
                                  background: ratingStyle.bg,
                                  color: ratingStyle.text,
                                }}
                              >
                                <FaStar
                                  size={9}
                                  style={{ color: ratingStyle.star }}
                                />
                                {rev.rating}.0
                              </span>
                              <p className="text-sm font-medium text-[#241719]">
                                {rev.title}
                              </p>
                            </div>

                            {/* Body */}
                            <p className="text-xs text-[#75676A] leading-relaxed font-light mb-2">
                              {rev.body}
                            </p>

                            {/* Review image */}
                            {rev.image && (
                              <img
                                src={rev.image}
                                alt="Review"
                                className="w-14 h-14 rounded-xl object-cover border border-[#E7DCD7] cursor-pointer hover:scale-105 transition-transform mb-2"
                              />
                            )}

                            {/* Helpful row */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10.5px] text-[#75676A]">
                                Helpful?
                              </span>
                              <button className="text-[10.5px] text-[#75676A] border border-[#E7DCD7] px-2.5 py-1 rounded-lg hover:border-[#812D3A] hover:text-[#4A101C] transition cursor-pointer">
                                Yes (12)
                              </button>
                              <button className="text-[10.5px] text-[#75676A] border border-[#E7DCD7] px-2.5 py-1 rounded-lg hover:border-[#812D3A] hover:text-[#4A101C] transition cursor-pointer">
                                No
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View all */}
                    <button
                      className="mt-3 text-sm font-medium text-[#4A101C] hover:text-[#812D3A] transition-colors cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      onClick={() => {
                        navigate(`/productReview`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      View all reviews →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="flex flex-col items-center mb-6 mt-10">
            <p
              className="text-[10px] font-bold tracking-widest uppercase text-[#812D3A] mb-1"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              ✦ You May Also Like
            </p>
            <h2
              className="text-3xl font-semibold text-[#241719]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Featured Products
            </h2>
            <div
              className="w-16 h-0.5 mt-2 rounded-full"
              style={{ background: "linear-gradient(90deg,#4A101C,#812D3A)" }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-3">
            {displayProducts.map((p: any) => (
              <ProductCard key={p.id} item={p} />
            ))}
          </div>
        </div>

        <Footer />
      </div>

      {/* ── Address Modal ── */}
      {showAddressModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4"
          style={{
            background: "rgba(36,23,25,0.45)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="modal-in bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl mb-4 sm:mb-0 border border-[#E7DCD7]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#812D3A] mb-0.5"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  Select Address
                </p>
                <h3
                  className="text-xl font-semibold text-[#241719]"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  Deliver To
                </h3>
              </div>
              <button
                onClick={() => setShowAddressModal(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E7DCD7] flex items-center justify-center hover:bg-[#F1E8E2] transition-all cursor-pointer"
              >
                <FaTimes size={13} className="text-[#241719]" />
              </button>
            </div>

            {/* Address list */}
            <div className="space-y-3 mb-5">
              {addressList.map((addr) => (
                <div
                  key={addr.id}
                  className={`addr-row ${
                    selectedAddress.id === addr.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddressModal(false);
                  }}
                >
                  {/* Radio */}
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      borderColor:
                        selectedAddress.id === addr.id ? "#4A101C" : "#E7DCD7",
                      background:
                        selectedAddress.id === addr.id ? "#4A101C" : "#fff",
                    }}
                  >
                    {selectedAddress.id === addr.id && (
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <polyline
                          points="2,5 4,8 8,2"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          color:
                            selectedAddress.id === addr.id
                              ? "#4A101C"
                              : "#241719",
                        }}
                      >
                        {addr.name}
                      </p>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            selectedAddress.id === addr.id
                              ? "linear-gradient(135deg,#FAF7F2,#F1E8E2)"
                              : "#FAF7F2",
                          color:
                            selectedAddress.id === addr.id
                              ? "#4A101C"
                              : "#75676A",
                          border: "1px solid #E7DCD7",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#287653] border border-[#E7DCD7]"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          Default
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs text-[#75676A] leading-relaxed"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      {addr.line}, {addr.city} – {addr.pincode}
                    </p>
                    <p
                      className="text-[10px] text-[#75676A] mt-0.5"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      {addr.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
