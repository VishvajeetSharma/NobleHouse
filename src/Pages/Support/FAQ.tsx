import React, { useState } from "react";
import {
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaUserCircle,
  FaBoxOpen,
  FaHeadset,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Header from "../../components/Header/Heading";

// ── Types ──
interface FAQ {
  id: string;
  question: string;
  answer: string;
}
interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

// ── Data ──
const tabs: Tab[] = [
  { id: "orders", label: "Orders", icon: FaShoppingBag },
  { id: "payments", label: "Payments", icon: FaCreditCard },
  { id: "shipping", label: "Shipping", icon: FaTruck },
  { id: "returns", label: "Returns", icon: FaUndo },
  { id: "account", label: "Account", icon: FaUserCircle },
  { id: "products", label: "Products", icon: FaBoxOpen },
];

const faqData: Record<string, FAQ[]> = {
  orders: [
    {
      id: "o1",
      question: "How can I place an order?",
      answer:
        "Browse our curated collections, select your desired size & quantity, click 'Add to Cart' or 'Buy Now', proceed to checkout, enter your shipping details, choose your payment method, and confirm.",
    },
    {
      id: "o2",
      question: "How do I track my order?",
      answer:
        "You'll receive a real-time tracking link via email/SMS once dispatched. You can also view live status under 'My Orders' in your account.",
    },
    {
      id: "o3",
      question: "Can I cancel my order?",
      answer:
        "Yes, orders can be cancelled within 1 hour of placement before dispatch. Go to 'My Orders' and select 'Cancel Order'.",
    },
    {
      id: "o4",
      question: "What if my order is delayed?",
      answer:
        "Please connect with our concierge support team if your delivery extends past the promised delivery window.",
    },
    {
      id: "o5",
      question: "How will I know my order is confirmed?",
      answer:
        "You'll receive an instant confirmation notification and email with complete order specifics immediately upon successful payment.",
    },
  ],
  payments: [
    {
      id: "p1",
      question: "What payment methods do you accept?",
      answer:
        "We support all major Credit/Debit Cards (Visa, MasterCard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking, Noble House Wallet, and Cash on Delivery.",
    },
    {
      id: "p2",
      question: "Is Cash on Delivery available?",
      answer:
        "Yes, COD is available for eligible orders under ₹10,000 in supported pin codes across India.",
    },
    {
      id: "p3",
      question: "Is online payment secure?",
      answer:
        "Absolutely. All transactions are protected via 256-bit SSL encryption and PCI-DSS compliant payment gateways. We never store payment credentials.",
    },
    {
      id: "p4",
      question: "Why did my payment fail?",
      answer:
        "Possible reasons include insufficient balance, bank server downtime, or 2FA timeout. Any debited amount is automatically reversed within 24-48 hours.",
    },
    {
      id: "p5",
      question: "When will my refund be processed?",
      answer:
        "Approved refunds are credited back to your original payment source or wallet within 5–7 business days.",
    },
  ],
  shipping: [
    {
      id: "s1",
      question: "What are the delivery charges?",
      answer:
        "Enjoy complimentary premium shipping on all orders above ₹2,999. A nominal flat fee of ₹99 applies to orders below this amount.",
    },
    {
      id: "s2",
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 3–5 business days for major metropolitan areas and 5–7 days for all other regions.",
    },
    {
      id: "s3",
      question: "Do you deliver to my location?",
      answer:
        "We provide insured domestic shipping to over 25,000 pin codes across India.",
    },
    {
      id: "s4",
      question: "Can I change the delivery address?",
      answer:
        "Delivery addresses can be modified within 1 hour of placing the order via the 'My Orders' panel.",
    },
    {
      id: "s5",
      question: "What if I miss the delivery?",
      answer:
        "Our courier partner will attempt delivery 3 times. You will receive a call or SMS to reschedule if needed.",
    },
  ],
  returns: [
    {
      id: "r1",
      question: "How do I return a product?",
      answer:
        "Initiate a return request within 15 days directly from 'My Orders'. Our courier partner will schedule a doorstep quality check and pickup.",
    },
    {
      id: "r2",
      question: "What is the return policy?",
      answer:
        "We offer 15-day complimentary returns for unused items retained with original tags and packaging intact.",
    },
    {
      id: "r3",
      question: "How long does a refund take?",
      answer:
        "Refunds are processed within 5–7 business days once the return parcel passes warehouse inspection.",
    },
    {
      id: "r4",
      question: "Can I exchange an item?",
      answer:
        "Yes, you can exchange for a different size or shade within 15 days at no additional fee.",
    },
    {
      id: "r5",
      question: "What if I receive a damaged product?",
      answer:
        "Notify us within 48 hours with photographic proof, and our concierge team will dispatch an expedited replacement immediately.",
    },
  ],
  account: [
    {
      id: "a1",
      question: "How do I create an account?",
      answer:
        "Click the user icon in the top header, enter your phone or email, and complete verification in seconds.",
    },
    {
      id: "a2",
      question: "I forgot my password — what do I do?",
      answer:
        "Click 'Forgot Password' on the login modal to receive a secure password reset link or OTP.",
    },
    {
      id: "a3",
      question: "How do I update my profile?",
      answer:
        "Navigate to 'My Account' to manage your default shipping addresses, phone number, and preferences.",
    },
    {
      id: "a4",
      question: "How do I delete my account?",
      answer:
        "You can request account deletion in 'Account Settings' or contact support for full data removal.",
    },
  ],
  products: [
    {
      id: "pr1",
      question: "Are products authentic?",
      answer:
        "Every single item on Noble House is 100% authentic, handcrafted or sourced directly from verified ateliers.",
    },
    {
      id: "pr2",
      question: "What if a product is out of stock?",
      answer:
        "Click 'Notify Me' on the product detail page to receive an alert when a restock arrives.",
    },
    {
      id: "pr3",
      question: "How do I check size or details?",
      answer:
        "Every garment page features detailed garment measurements and an interactive sizing guide.",
    },
    {
      id: "pr4",
      question: "Will the product come back?",
      answer:
        "High-demand couture and seasonal pieces may be limited editions; subscribe for restock notices.",
    },
  ],
};

// ── Accordion item ──
const AccordionItem = ({ q, idx }: { q: FAQ; idx: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open
          ? "border-[#812D3A]/40 bg-white shadow-xs"
          : "border-[#E7DCD7] bg-white hover:border-[#812D3A]/30"
        }`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 group"
      >
        <div className="flex items-center gap-3.5">
          {/* Number */}
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-200 font-serif ${open
                ? "bg-[#4A101C] text-[#FAF7F2]"
                : "bg-[#F1E8E2] text-[#4A101C]"
              }`}
          >
            {idx + 1}
          </span>
          <span className="text-sm font-medium text-[#241719]">
            {q.question}
          </span>
        </div>
        <FaChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#4A101C]" : "text-[#75676A]"
            }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? "220px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-[#75676A] text-sm leading-relaxed px-5 pb-5 ml-9 border-l-2 border-[#4A101C] pl-3.5 font-normal">
          {q.answer}
        </p>
      </div>
    </div>
  );
};

// ── Main component ──
const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const ActiveIcon = currentTab.icon;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-item { animation: fadeUp 0.35s ease both; }

        .tab-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 99px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.04em; white-space: nowrap;
          transition: all 0.2s; cursor: pointer; border: none;
        }

        .sidebar-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between;
          padding: 12px 16px; border-radius: 14px;
          font-size: 13px; font-weight: 500;
          transition: all 0.2s; cursor: pointer;
          border: 1px solid transparent; text-align: left;
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: "#FAF7F2",
          fontFamily: "'Inter', sans-serif",
          color: "#241719",
        }}
      >
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ── Page header ── */}
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#812D3A] mb-3 font-serif">
              ✦ Knowledge Base ✦
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#241719] mb-3">
              Frequently Asked{" "}
              <span className="italic text-[#4A101C]">
                Questions
              </span>
            </h1>
            <p className="text-sm text-[#75676A] max-w-sm mx-auto">
              Clear answers regarding ordering, luxury packaging, deliveries, and boutique returns.
            </p>
          </div>

          {/* ── MOBILE: horizontal tab pills ── */}
          <div
            className="lg:hidden overflow-x-auto pb-2 mb-6 -mx-4 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={
                      isActive
                        ? {
                          background:
                            "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                          color: "#fff",
                        }
                        : undefined
                    }
                    className={`tab-pill ${isActive
                        ? "shadow-xs font-semibold"
                        : "bg-white text-[#75676A] border border-[#E7DCD7]"
                      }`}
                  >
                    <tab.icon size={12} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE: active section label ── */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div
              className="w-1 h-5 rounded-full shrink-0"
              style={{
                background:
                  "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
              }}
            />
            <div className="flex items-center gap-2">
              <ActiveIcon size={14} style={{ color: "#4A101C" }} />
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#75676A] font-serif">
                {currentTab.label}
              </p>
            </div>
          </div>

          {/* ── Layout ── */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Sidebar (desktop only) ── */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#75676A] mb-4 flex items-center gap-2 font-serif">
                  <span
                    className="w-1 h-3.5 rounded-full inline-block"
                    style={{
                      background:
                        "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                    }}
                  />
                  Categories
                </p>

                <div className="space-y-1.5 mb-6">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`sidebar-btn ${isActive
                            ? "bg-[#F1E8E2] text-[#4A101C] border-[#E7DCD7] font-semibold"
                            : "text-[#75676A] hover:bg-white hover:text-[#241719]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <tab.icon
                            size={14}
                            style={{
                              color: isActive ? "#4A101C" : "#75676A",
                            }}
                          />
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        <FaArrowRight
                          size={10}
                          style={{
                            color: isActive ? "#4A101C" : "#E7DCD7",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-[#E7DCD7] pt-5">
                  <p className="text-xs text-[#75676A] mb-3 font-medium">
                    Still need concierge support?
                  </p>
                  <Link to="/contact">
                    <button
                      style={{
                        background:
                          "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white tracking-wide hover:brightness-110 transition-all duration-200 shadow-sm"
                    >
                      <FaHeadset size={13} />
                      Contact Concierge
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── FAQ list ── */}
            <div className="flex-1 min-w-0">
              <div className="space-y-2.5">
                {faqData[activeTab].map((q, idx) => (
                  <div
                    key={q.id}
                    className="faq-item"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <AccordionItem q={q} idx={idx} />
                  </div>
                ))}
              </div>

              {/* Mobile contact support */}
              <div className="lg:hidden mt-8 pt-6 border-t border-[#E7DCD7] text-center">
                <p className="text-sm text-[#75676A] mb-3">
                  Still have questions?
                </p>
                <Link to="/contact">
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white shadow-xs"
                  >
                    <FaHeadset size={12} />
                    Contact Concierge
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;