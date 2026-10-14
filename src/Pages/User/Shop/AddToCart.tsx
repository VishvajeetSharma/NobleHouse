import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";
import { Footer } from "../../../components/Footer/Footer";
import Swal from "sweetalert2";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
  FaTag,
  FaGift,
  FaShieldAlt,
  FaHeart,
  FaRegHeart,
  FaBolt,
  FaStar,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [expandedFees, setExpandedFees] = useState(false);
  const handleProceed = () => {
    window.scrollTo(0, 0);
    navigate("/buynow");
  };
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  const removeItem = (id: number, size?: string) => {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "No, keep",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart({ id, size }));
        Swal.fire({
          title: "Removed!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  const toggleWishlist = (id: number) => {
    setWishlistItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const fees = 7;
  const shipping = subtotal > 5000 ? 0 : 299;
  const savings =
    cartItems.reduce(
      (s: number, i: any) =>
        s + ((i.originalPrice || i.price) - i.price) * i.quantity,
      0
    ) + discount;
  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    }
  };
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-12">
          <div className="bg-white rounded-xl shadow-xs border border-[#E7DCD7] px-6 sm:px-12 py-12 sm:py-16 text-center max-w-sm w-full mx-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF7F2] border border-[#E7DCD7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <video
                src="/Cart.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="mx-auto"
              ></video>
            </div>
            <h2 className="text-base sm:text-lg font-medium text-[#241719] mb-1 font-editorial">
              Your cart is empty!
            </h2>
            <p className="text-xs sm:text-sm text-[#75676A] mb-5 sm:mb-6">
              Explore our luxury collection and add timeless pieces.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white text-xs sm:text-sm font-semibold rounded-md hover:shadow-md transition cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .cart-wrap * { font-family: 'DM Sans', sans-serif; }
        .qty-btn { width:28px; height:28px; border-radius:50%; border:1.5px solid #4A101C; display:flex; align-items:center; justify-content:center; background:#fff; cursor:pointer; transition:all .15s; color:#4A101C; }
        .qty-btn:hover { background:#FAF7F2; }
        .save-badge { background:#287653; color:#fff; font-size:9px; font-weight:700; padding:1px 5px; border-radius:2px; }
        .action-btn { display:flex; align-items:center; gap:5px; padding:8px 0; font-size:11px; color:#75676A; cursor:pointer; border:none; background:none; transition:color .15s; flex:1; justify-content:center; }
        .action-btn:hover { color:#4A101C; }
        .place-btn { width:100%; padding:12px; background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff; font-size:13px; font-weight:700; letter-spacing:.05em; border:none; cursor:pointer; transition:all .2s; border-radius:4px; }
        .place-btn:hover { opacity:.94; box-shadow:0 4px 16px rgba(74,16,28,.3); }
        .star { color:#ff9f00; font-size:9px; }
      `}</style>
      <div className="cart-wrap min-h-screen bg-[#FAF7F2]">
        <Header />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Page title */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex md:hidden items-center gap-1 text-[#4A101C] hover:text-[#812D3A] text-xs transition cursor-pointer"
            >
              <FaArrowLeft size={10} /> Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 sm:h-7 rounded-full bg-gradient-to-b from-[#4A101C] to-[#812D3A]" />
              <h1 className="text-base sm:text-xl font-bold text-[#241719] font-editorial">
                Shopping Cart
                <span className="text-[#812D3A] font-normal text-xs sm:text-base ml-1">
                  ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* LEFT — Cart Items */}
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              {/* Items */}
              <div className="bg-white border border-[#E7DCD7] rounded-xl overflow-hidden w-full shadow-xs">
                {cartItems.map((item: any, idx: number) => {
                  const discountPct = item.originalPrice
                    ? Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )
                    : null;
                  const deliveryDate = new Date(
                    Date.now() + 5 * 86400000
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  });
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className={`px-3 sm:px-4 py-3 sm:py-5 w-full ${
                        idx < cartItems.length - 1
                          ? "border-b border-[#E7DCD7]"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3 sm:gap-4 w-full">
                        {/* Image */}
                        <div className="relative shrink-0 flex flex-col gap-2 sm:gap-4">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-md border border-[#E7DCD7]"
                            />
                            {discountPct && discountPct > 0 && (
                              <div className="absolute top-0.5 left-0.5 save-badge">
                                {discountPct}%
                              </div>
                            )}
                          </div>
                          {/* Qty control */}
                          <div className="flex items-center rounded-lg border border-[#E7DCD7] overflow-hidden bg-white">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:bg-[#FAF7F2] active:scale-90 cursor-pointer"
                              style={{
                                borderRight: "1px solid #E7DCD7",
                              }}
                            >
                              <FaMinus size={7} style={{ color: "#4A101C" }} />
                            </button>
                            <span className="w-7 sm:w-9 text-center text-xs sm:text-sm font-bold text-[#4A101C]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:bg-[#FAF7F2] active:scale-90 cursor-pointer"
                              style={{
                                borderLeft: "1px solid #E7DCD7",
                              }}
                            >
                              <FaPlus size={7} style={{ color: "#4A101C" }} />
                            </button>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 w-full">
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] sm:text-[11px] text-[#75676A] uppercase tracking-wide font-semibold mb-0.5">
                                {item.category || "Fashion"}
                              </p>
                              <h3 className="text-xs sm:text-sm font-medium text-[#241719] leading-snug line-clamp-2 mb-1">
                                {item.name}
                              </h3>
                              {/* Rating */}
                              <div className="flex items-center gap-0.5 mb-1 sm:mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <FaStar
                                    key={s}
                                    className="star"
                                    style={{
                                      color: s <= 4 ? "#ff9f00" : "#e0e0e0",
                                    }}
                                  />
                                ))}
                                <span className="text-[9px] sm:text-[11px] text-[#75676A] ml-0.5">
                                  4.2
                                </span>
                              </div>
                              {/* Variants */}
                              <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                                {item.size && (
                                  <span className="text-[9px] sm:text-xs text-[#241719] bg-[#FAF7F2] border border-[#E7DCD7] px-2 py-0.5 rounded-md font-medium">
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="text-[9px] sm:text-xs text-[#241719] bg-[#FAF7F2] border border-[#E7DCD7] px-2 py-0.5 rounded-md font-medium">
                                    Color: {item.color}
                                  </span>
                                )}
                              </div>
                              {/* Price row */}
                              <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2">
                                <span className="text-sm sm:text-lg font-bold text-[#4A101C]">
                                  ₹{item.price.toLocaleString("en-IN")}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-[10px] sm:text-sm text-[#75676A] line-through">
                                    ₹
                                    {item.originalPrice.toLocaleString("en-IN")}
                                  </span>
                                )}
                                {discountPct && discountPct > 0 && (
                                  <span className="text-[9px] sm:text-sm font-semibold text-[#287653]">
                                    {discountPct}% off
                                  </span>
                                )}
                              </div>
                              {/* Only few left */}
                              <p className="text-[9px] sm:text-xs font-semibold text-[#B54745] mt-0.5 sm:mt-1">
                                Only few left
                              </p>
                            </div>
                            {/* Wishlist toggle */}
                            <button
                              onClick={() => toggleWishlist(item.id)}
                              className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-[#FAF7F2] transition cursor-pointer"
                            >
                              {wishlistItems.includes(item.id) ? (
                                <FaHeart className="text-[#4A101C]" size={13} />
                              ) : (
                                <FaRegHeart
                                  className="text-[#75676A]"
                                  size={13}
                                />
                              )}
                            </button>
                          </div>
                          {/* Delivery info */}
                          <div className="flex items-center gap-1 mt-1.5 text-[9px] sm:text-xs text-[#75676A]">
                            <FaCheckCircle
                              className="text-[#287653]"
                              size={9}
                            />
                            Delivery by <strong>{deliveryDate}</strong>
                            <span className="text-[#287653] ml-0.5 font-semibold">FREE</span>
                          </div>
                        </div>
                      </div>
                      {/* Action buttons row */}
                      <div className="flex items-center mt-2 sm:mt-3 pt-2 border-t border-[#E7DCD7] w-full">
                        <button
                          className="action-btn"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <FaTrashAlt size={11} /> Remove
                        </button>
                        <button className="action-btn text-[#4A101C] font-semibold" onClick={handleProceed}>
                          <FaBolt size={11} style={{ color: "#812D3A" }} /> Buy now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Promo code */}
              <div className="bg-white border border-[#E7DCD7] rounded-xl px-3 sm:px-4 py-3 sm:py-4 mt-3 flex items-center gap-2 w-full shadow-xs">
                <FaTag className="text-[#812D3A] shrink-0" size={12} />
                <input
                  type="text"
                  placeholder="Enter promo code (e.g. SAVE10)"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoApplied(false);
                  }}
                  className="flex-1 text-xs sm:text-sm border-none outline-none text-[#241719] placeholder:text-[#75676A]/60 bg-transparent"
                />
                <button
                  onClick={applyPromo}
                  className="text-xs sm:text-sm font-bold text-[#4A101C] hover:text-[#812D3A] transition px-3 py-1 cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="bg-[#FAF7F2] border border-[#287653]/30 text-[#287653] text-[10px] sm:text-xs px-3 sm:px-4 py-2 mt-2 rounded-lg flex items-center gap-1 w-full">
                  <FaCheckCircle size={10} /> Code SAVE10 applied — 10% discount!
                </p>
              )}
              {promoError && (
                <p className="bg-red-50 border border-red-200 text-[#B54745] text-[10px] sm:text-xs px-3 sm:px-4 py-2 mt-2 rounded-lg w-full">
                  Invalid promo code. Try SAVE10
                </p>
              )}
            </div>
            {/* RIGHT — Price Details */}
            <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-20">
              <div className="bg-white border border-[#E7DCD7] rounded-xl shadow-xs overflow-hidden w-full">
                <div className="px-4 py-3 border-b border-[#E7DCD7] bg-[#FAF7F2]">
                  <p className="text-[10px] sm:text-xs font-bold text-[#241719] uppercase tracking-wider font-editorial">
                    Price Details ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </p>
                </div>
                <div className="px-4 py-4 space-y-2.5 border-b border-[#E7DCD7]">
                  <div className="flex justify-between text-xs sm:text-sm text-[#75676A]">
                    <span>MRP</span>
                    <span className="text-[#241719]">
                      ₹
                      {cartItems
                        .reduce(
                          (s: number, i: any) =>
                            s + (i.originalPrice || i.price) * i.quantity,
                          0
                        )
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#75676A]">Discounts</span>
                      <span className="text-[#287653] font-medium">
                        −₹{savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#75676A]">Coupon (SAVE10)</span>
                      <span className="text-[#287653] font-medium">
                        −₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <button
                      className="flex items-center gap-1 text-[#75676A] hover:text-[#4A101C] transition cursor-pointer"
                      onClick={() => setExpandedFees((p) => !p)}
                    >
                      Fees{" "}
                      <FaChevronDown
                        size={8}
                        className={`transition-transform ${
                          expandedFees ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <span className="text-[#241719]">₹{fees}</span>
                  </div>
                  {expandedFees && (
                    <div className="text-[10px] sm:text-xs text-[#75676A] bg-[#FAF7F2] rounded-md px-3 py-1.5 border border-[#E7DCD7]">
                      Platform fee: ₹{fees} (non-refundable)
                    </div>
                  )}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#75676A]">Delivery Charges</span>
                    <span>
                      {subtotal >= 5000 ? (
                        <span className="text-[#287653] font-medium">FREE</span>
                      ) : (
                        <span className="text-[#241719]">₹{shipping}</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3 border-b border-[#E7DCD7] flex justify-between items-center bg-[#FAF7F2]/50">
                  <span className="font-bold text-[#241719] text-sm sm:text-base">
                    Total Amount
                  </span>
                  <span className="font-bold text-[#4A101C] text-base sm:text-lg">
                    ₹{(subtotal - discount + fees).toLocaleString("en-IN")}
                  </span>
                </div>
                {savings + discount > 0 && (
                  <div className="px-4 py-2.5 bg-[#287653]/10 border-b border-[#287653]/20 flex items-center gap-2">
                    <FaGift className="text-[#287653] shrink-0" size={11} />
                    <p className="text-[10px] sm:text-xs text-[#287653] font-semibold">
                      You will save ₹{(savings + discount).toLocaleString("en-IN")} on this order!
                    </p>
                  </div>
                )}
                <div className="px-4 py-3 flex items-center gap-2">
                  <FaShieldAlt className="text-[#812D3A] shrink-0" size={12} />
                  <p className="text-[10px] sm:text-xs text-[#75676A]">
                    Safe and secure payments. 100% authentic fashion.
                  </p>
                </div>
              </div>
              <div className="mt-3 bg-white border border-[#E7DCD7] rounded-xl px-4 py-3.5 w-full shadow-xs">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[#75676A]">Total Payable</span>
                  <span className="text-base sm:text-xl font-bold text-[#4A101C]">
                    ₹{(subtotal - discount + fees).toLocaleString("en-IN")}
                  </span>
                </div>
                <button className="place-btn" onClick={handleProceed}>
                  Proceed to Checkout
                </button>
              </div>
              <div className="bg-white border border-[#E7DCD7] rounded-xl mt-3 px-4 py-3 w-full shadow-xs">
                <p className="text-[9px] sm:text-[10px] text-[#75676A] font-semibold uppercase tracking-wider mb-2 text-center">
                  Guaranteed Safe Checkout
                </p>
                <div className="flex justify-center gap-4 text-[#812D3A]/60">
                  <FaCreditCard size={16} />
                  <FaPaypal size={16} />
                  <FaGooglePay size={16} />
                  <FaApplePay size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default CartPage;
