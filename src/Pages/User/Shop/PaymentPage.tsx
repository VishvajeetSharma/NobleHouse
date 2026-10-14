import { useState } from "react";
import {
  FaTruck,
  FaCreditCard,
  FaShieldAlt,
  FaRupeeSign,
  FaLock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";
import { ConfettiButton } from "../../../components/acertunity/confettiButtonVariants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/cartSlice";
import Header from "../../../components/Header/Heading";
import { placeOrder } from "../../../redux/OrderSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Footer } from "../../../components/Footer/Footer";

const PaymentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cartItem = useSelector((state: any) => state.cart.cartItems);
  const subtotal = cartItem.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({ title: "Select payment method", icon: "warning" });
      return;
    }
    if (cartItem.length === 0) {
      Swal.fire({ title: "Cart is empty", icon: "error" });
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);

  
    const newOrder = {
      id: String(Date.now()),
      orderId: `ORD-${Date.now()}`,
      customerName: "", 
      customerEmail: "",
      customerPhone: "",
      items: [...cartItem],
      amount: total, 
      paymentMethod,
      paymentStatus: "paid", 
      status: "processing",
      date: new Date().toISOString(),
      estimatedDelivery: null,
      trackingId: null,
    };

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());

 
    window.scrollTo(0, 0);
    navigate("/orderPlaced");
  };

  const paymentOptions = [
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: FaCreditCard,
      iconColor: "text-[#4A101C]",
    },
    {
      id: "upi",
      title: "UPI / Google Pay",
      icon: SiGooglepay,
      iconColor: "text-[#812D3A]",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: FaRupeeSign,
      iconColor: "text-[#287653]",
    },
    {
      id: "wallet",
      title: "Wallet",
      icon: FaWallet,
      iconColor: "text-[#4A101C]",
    },
  ];

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (value.length > 19) return;
    }
    if (name === "expiry") {
      value = value
        .replace(/\//g, "")
        .replace(/(.{2})/, "$1/")
        .trim();
      if (value.length > 5) return;
    }
    if (name === "cvv" && value.length > 3) return;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="md:hidden flex items-center gap-1.5 text-[#75676A] hover:text-[#4A101C] text-sm mb-4 transition"
            >
              ← Back to cart
            </button>
            <div className="bg-white border border-[#E7DCD7] rounded-2xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-12 bg-gradient-to-b from-[#4A101C] to-[#812D3A] rounded-full"></div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#241719] tracking-tight">
                    Secure Checkout
                  </h1>
                  <p className="text-[#75676A] text-sm mt-1">
                    Complete your luxury purchase safely and securely
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <FaLock size={11} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        SSL 256-bit Encrypted
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#E7DCD7]"></div>
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt size={11} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        Buyer Protection
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#E7DCD7]"></div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle size={11} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        Authentic Guarantee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT — PAYMENT METHODS */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xs border border-[#E7DCD7] overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-[#E7DCD7]">
                  <h2 className="text-[#241719] font-serif font-bold text-lg flex items-center gap-2.5">
                    <FaLock size={16} className="text-[#4A101C]" />
                    Select Payment Method
                  </h2>
                </div>
                <div className="p-6 space-y-3.5">
                  {paymentOptions.map((option, idx) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`border rounded-xl transition-all duration-200 cursor-pointer ${
                        paymentMethod === option.id
                          ? "border-[#4A101C] bg-[#FAF7F2] shadow-xs ring-1 ring-[#4A101C]/20"
                          : "border-[#E7DCD7] bg-white hover:border-[#812D3A] hover:bg-[#FAF7F2]/40"
                      }`}
                      onClick={() => setPaymentMethod(option.id)}
                    >
                      <div className="p-4 md:p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-11 h-11 rounded-xl bg-white border border-[#E7DCD7] flex items-center justify-center transition ${paymentMethod === option.id ? "scale-105 border-[#4A101C] shadow-xs" : ""}`}
                            >
                              <option.icon
                                size={20}
                                className={option.iconColor}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="radio"
                                  checked={paymentMethod === option.id}
                                  onChange={() => setPaymentMethod(option.id)}
                                  className="w-4 h-4 accent-[#4A101C] cursor-pointer"
                                />
                                <span className="font-semibold text-[#241719]">
                                  {option.title}
                                </span>
                              </div>
                              {option.id === "upi" && (
                                <p className="text-xs text-[#75676A] mt-0.5">
                                  Google Pay, PhonePe, Paytm, BHIM
                                </p>
                              )}
                            </div>
                          </div>
                          {paymentMethod === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-[#4A101C] rounded-full flex items-center justify-center"
                            >
                              <FaCheckCircle size={12} className="text-white" />
                            </motion.div>
                          )}
                        </div>
                        {option.id === "card" && paymentMethod === "card" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-3 pl-4 md:pl-7 border-l-2 border-[#4A101C]"
                          >
                            <input
                              type="text"
                              name="cardNumber"
                              placeholder="Card Number"
                              value={cardDetails.cardNumber}
                              onChange={handleCardChange}
                              className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-[#E7DCD7] rounded-xl focus:outline-none focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] text-[#241719] transition-all"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleCardChange}
                                className="px-4 py-2.5 bg-[#FAF7F2]/50 border border-[#E7DCD7] rounded-xl focus:outline-none focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] text-[#241719] transition-all"
                              />
                              <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={cardDetails.cvv}
                                onChange={handleCardChange}
                                className="px-4 py-2.5 bg-[#FAF7F2]/50 border border-[#E7DCD7] rounded-xl focus:outline-none focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] text-[#241719] transition-all"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#75676A]">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                                alt="visa"
                                className="h-3.5"
                              />
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                                alt="mastercard"
                                className="h-3.5"
                              />
                              <span className="ml-auto">
                                256-bit encrypted card vault
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-[#FAF7F2] px-6 py-3.5 border-t border-[#E7DCD7]">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <FaLock size={10} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        SSL Secure
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt size={10} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        100% Protection
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle size={10} className="text-[#287653]" />
                      <span className="text-xs text-[#75676A] font-medium">
                        Authentic Refund
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xs border border-[#E7DCD7] sticky top-24 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-[#E7DCD7]">
                  <h2 className="text-[#241719] font-serif font-bold text-lg flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs bg-[#FAF7F2] border border-[#E7DCD7] px-2.5 py-1 rounded-full text-[#4A101C] font-semibold">
                      {cartItem.length}{" "}
                      {cartItem.length === 1 ? "Item" : "Items"}
                    </span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#75676A]">
                        Subtotal
                      </span>
                      <span className="text-[#241719] font-medium">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#75676A]">
                        Delivery
                      </span>
                      <span
                        className={
                          deliveryCharge === 0
                            ? "text-[#287653] font-semibold"
                            : "text-[#241719] font-medium"
                        }
                      >
                        {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#75676A]">
                        GST (5%)
                      </span>
                      <span className="text-[#241719] font-medium">₹{gst}</span>
                    </div>
                    <div className="bg-[#FAF7F2] p-3.5 rounded-xl mt-3 border border-[#E7DCD7]">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-[#241719]">
                          Total
                        </span>
                        <span className="text-xl font-serif font-bold text-[#4A101C]">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod || isProcessing}
                    whileHover={paymentMethod ? { scale: 1.01 } : {}}
                    whileTap={paymentMethod ? { scale: 0.99 } : {}}
                    className={`w-full py-3.5 mt-5 rounded-xl font-semibold transition-all duration-200 text-sm tracking-wide ${
                      paymentMethod && !isProcessing
                        ? "bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white hover:from-[#351019] hover:to-[#4A101C] shadow-md hover:shadow-lg cursor-pointer"
                        : "bg-[#F1E8E2] text-[#75676A] cursor-not-allowed border border-[#E7DCD7]"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : showSuccess ? (
                      <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle size={14} />
                        Order Placed
                      </div>
                    ) : (
                      <ConfettiButton
                        icon={<Sparkles className="h-4 w-4" />}
                        confettiOptions={{ particleCount: 100, spread: 70 }}
                      >
                        {`Place Order • ₹${total.toLocaleString()}`}
                      </ConfettiButton>
                    )}
                  </motion.button>

                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                      <FaTruck size={13} className="text-[#4A101C]" />
                      <span>Free luxury delivery on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                      <FaShieldAlt size={13} className="text-[#4A101C]" />
                      <span>Secure encrypted transaction guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                      <FaCreditCard size={13} className="text-[#4A101C]" />
                      <span>Complimentary returns within 7 days</span>
                    </div>
                  </div>
                  <div className="mt-5 pt-3.5 text-center border-t border-[#E7DCD7]">
                    <p className="text-[11px] text-[#75676A]">
                      By placing order, you agree to NOBLE HOUSE Terms & Conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PaymentSection;
