"use client";

import React, { useState } from "react";
import {
  FaBullhorn,
  FaCheckCircle,
  FaArrowRight,
  FaRupeeSign,
  FaMousePointer,
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaEye,
  FaRocket,
  FaGem,
  FaWallet,
  FaTrophy,
  FaStar,
  FaFire,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

interface Benefit {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
  stat: string;
  statLabel: string;
}

interface Step {
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const AdvertiseProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [mobile, setMobile] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const handleSubmit = (): void => {
    if (mobile.length === 10) {
      alert(
        "🎉 Awesome! Our team will contact you within 24 hours to start your ad campaign!",
      );
      setMobile("");
      setShowForm(false);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: <FaEye className="text-sm" /> },
    { id: "benefits", label: "Benefits", icon: <FaGem className="text-sm" /> },
    {
      id: "how-it-works",
      label: "How It Works",
      icon: <FaRocket className="text-sm" />,
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: <FaRupeeSign className="text-sm" />,
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: <FaEye className="text-2xl text-[#E8D9C9]" />,
      title: "Prominent Visibility",
      description: "Your couture creations appear at the pinnacle of category search",
      color: "from-[#4A101C] to-[#812D3A]",
      stat: "500%",
      statLabel: "More Impressions",
    },
    {
      icon: <FaShoppingCart className="text-2xl text-[#E8D9C9]" />,
      title: "Elevated Orders",
      description: "High visibility drives connoisseurs directly to your collection",
      color: "from-[#812D3A] to-[#B54745]",
      stat: "3x",
      statLabel: "Volume Growth",
    },
    {
      icon: <FaMousePointer className="text-2xl text-[#E8D9C9]" />,
      title: "Cost Per Engagement",
      description: "Only pay when a patron interacts directly with your creation",
      color: "from-[#4A101C] to-[#351019]",
      stat: "₹0.50",
      statLabel: "Starting Rate",
    },
    {
      icon: <FaChartLine className="text-2xl text-[#E8D9C9]" />,
      title: "Real-time Metrics",
      description: "Gain deep intelligence into high-value buyer interest and conversions",
      color: "from-[#812D3A] to-[#4A101C]",
      stat: "Live",
      statLabel: "Analytics",
    },
    {
      icon: <FaRupeeSign className="text-2xl text-[#E8D9C9]" />,
      title: "Discretionary Budget",
      description: "Set strict campaign ceilings with 100% financial precision",
      color: "from-[#351019] to-[#812D3A]",
      stat: "100%",
      statLabel: "Spend Control",
    },
    {
      icon: <FaUsers className="text-2xl text-[#E8D9C9]" />,
      title: "Affluent Audience",
      description: "Reach elite shoppers seeking artisan and handcrafted creations",
      color: "from-[#4A101C] to-[#812D3A]",
      stat: "5Cr+",
      statLabel: "Monthly Patrons",
    },
  ];

  const steps: Step[] = [
    {
      step: "01",
      title: "Curate Offerings",
      description:
        "Select signature masterpieces from your atelier catalog",
      icon: "📦",
      color: "from-[#4A101C] to-[#812D3A]",
    },
    {
      step: "02",
      title: "Define Trajectory",
      description:
        "Set your daily marketing parameters and placement bids",
      icon: "💰",
      color: "from-[#812D3A] to-[#B54745]",
    },
    {
      step: "03",
      title: "Launch Spotlight",
      description: "Ignite client discovery and elevate your atelier's presence",
      icon: "✨",
      color: "from-[#4A101C] to-[#351019]",
    },
  ];

  return (
    <>
      <div className="bg-[#FAF7F2] min-h-screen">
        {/* Hero Section - Luxury Atelier Design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#4A101C] via-[#351019] to-[#812D3A] text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-white/15">
                <FaFire className="text-[#E8D9C9]" />
                <span className="text-xs font-semibold tracking-wide text-[#E8D9C9]">
                  Trusted by 10,000+ Curated Designers
                </span>
              </div>

              <h1
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Captivate Discerning Patrons,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] via-[#E8D9C9] to-[#d4af37]">
                  Elevate Atelier Sales
                </span>
              </h1>

              <p className="text-base lg:text-xl mb-10 opacity-90 leading-relaxed max-w-3xl mx-auto text-[#E8D9C9]">
                Feature your bespoke collections at the pinnacle of customer discovery. Pay only when clients explore your creations.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="group bg-[#FAF7F2] text-[#4A101C] px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:shadow-2xl transition-all duration-300 transform active:scale-95 inline-flex items-center gap-3 shadow-lg"
                >
                  Start Atelier Spotlight
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="border border-[#E7DCD7] text-[#FAF7F2] px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-all duration-300"
                >
                  Request Consultation
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/15">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#FAF7F2]">5Cr+</div>
                  <div className="text-xs text-[#E8D9C9] mt-1">
                    Monthly Connoisseurs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#FAF7F2]">3x</div>
                  <div className="text-xs text-[#E8D9C9] mt-1">
                    Avg Atelier Growth
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#FAF7F2]">₹0.50</div>
                  <div className="text-xs text-[#E8D9C9] mt-1">Starting Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Sticky */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E7DCD7]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-2 md:gap-6 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white shadow-md transform scale-105"
                      : "text-[#75676A] hover:bg-[#FAF7F2] hover:text-[#4A101C]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E7DCD7] transform transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4A101C] to-[#812D3A] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#FAF7F2] shadow-md">
                  <FaRocket className="text-2xl" />
                </div>
                <h3
                  className="text-2xl font-bold text-[#241719]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Initiate Spotlight
                </h3>
                <p className="text-xs text-[#75676A] mt-1">
                  Complimentary 500 promotion credits on your inaugural campaign
                </p>
              </div>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border border-[#E7DCD7] rounded-xl focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] focus:outline-none transition mb-4 text-sm text-[#241719] bg-[#FAF7F2]/50"
                value={mobile}
                onChange={handleMobileChange}
                maxLength={10}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white py-3 rounded-xl font-semibold text-sm hover:brightness-110 shadow-md transition transform active:scale-95"
                >
                  Confirm Request
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-[#E7DCD7] text-[#75676A] py-3 rounded-xl font-semibold text-sm hover:bg-[#FAF7F2] transition"
                >
                  Cancel
                </button>
              </div>
              <p className="text-[11px] text-[#75676A] text-center mt-4">
                Strict confidentiality assured. Our concierge contacts you within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Main Overview */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#F1E8E2] text-[#4A101C] px-3.5 py-1.5 rounded-full mb-4 text-xs font-semibold">
                    <FaBullhorn />
                    <span>What is Atelier Spotlight?</span>
                  </div>
                  <h2
                    className="text-3xl lg:text-4xl font-bold text-[#241719] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Showcase at the Forefront
                  </h2>
                  <p className="text-[#75676A] text-sm md:text-base leading-relaxed mb-4">
                    Spotlight advertising positions your luxury pieces at the crown of search results and high-fashion category pages, visible to discerning shoppers.
                  </p>
                  <p className="text-[#75676A] text-sm md:text-base leading-relaxed mb-6">
                    When patrons explore bespoke fashion matching your aesthetic, your collection is presented prominently with an elegant{" "}
                    <span className="font-semibold text-[#4A101C]">
                      "Curated Spotlight" badge
                    </span>
                    .
                  </p>
                  <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E7DCD7] text-[#287653] px-4 py-3 rounded-xl text-xs font-semibold">
                    <FaCheckCircle className="text-base" />
                    <span>Zero fee until a customer engages with your creation</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E7DCD7]">
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-2">📈</div>
                      <div className="text-4xl font-bold text-[#4A101C] mb-1 font-serif">
                        3x
                      </div>
                      <p className="text-xs text-[#75676A] font-medium">
                        Average sales acceleration for spotlighted ateliers
                      </p>
                    </div>
                    <div className="space-y-4 text-xs">
                      <div className="flex justify-between items-center py-2 border-b border-[#E7DCD7]">
                        <span className="text-[#75676A]">Organic Reach</span>
                        <span className="font-semibold text-[#241719]">100 views/day</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#E7DCD7]">
                        <span className="text-[#75676A]">With Spotlight</span>
                        <span className="font-semibold text-[#287653]">
                          500+ views/day
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[#75676A]">Acceleration</span>
                        <span className="font-bold text-[#4A101C] text-sm">
                          5x Greater Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7DCD7] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-[#F1E8E2] text-[#4A101C] rounded-xl flex items-center justify-center mb-4 text-xl">
                    <FaShieldAlt />
                  </div>
                  <h3 className="font-bold text-base text-[#241719] mb-2 font-serif">Verified & Discreet</h3>
                  <p className="text-xs text-[#75676A] leading-relaxed">
                    Maintain full control over brand presentation and artistic boundaries.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7DCD7] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-[#F1E8E2] text-[#4A101C] rounded-xl flex items-center justify-center mb-4 text-xl">
                    <FaWallet />
                  </div>
                  <h3 className="font-bold text-base text-[#241719] mb-2 font-serif">Ceiling Control</h3>
                  <p className="text-xs text-[#75676A] leading-relaxed">
                    Set clear maximums with zero surprise costs or automated overages.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7DCD7] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-[#F1E8E2] text-[#4A101C] rounded-xl flex items-center justify-center mb-4 text-xl">
                    <FaHeadset />
                  </div>
                  <h3 className="font-bold text-base text-[#241719] mb-2 font-serif">White-Glove Support</h3>
                  <p className="text-xs text-[#75676A] leading-relaxed">
                    Dedicated campaign concierge available around the clock.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl lg:text-4xl font-bold text-[#241719] mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Why Partner With Our Collective?
                </h2>
                <p className="text-[#75676A] text-sm max-w-xl mx-auto">
                  Experience bespoke marketing solutions engineered for fine crafts and couture
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-[#E7DCD7] hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#241719] mb-2 font-serif">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-[#75676A] leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <div className="border-t border-[#E7DCD7] pt-4 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#4A101C]">
                          {benefit.stat}
                        </span>
                        <span className="text-xs text-[#75676A]">
                          {benefit.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-12 bg-white border border-[#E7DCD7] rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-[#4A101C]">
                  <FaTrophy className="text-xl" />
                  <span className="font-bold text-[#241719] font-serif text-base">
                    Endorsed by Premier Ateliers
                  </span>
                </div>
                <p className="text-xs text-[#75676A]">
                  Join hundreds of established artisans scaling with elegance
                </p>
              </div>
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === "how-it-works" && (
            <div>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl lg:text-4xl font-bold text-[#241719] mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Spotlight in 3 Simple Steps
                </h2>
                <p className="text-[#75676A] text-sm">
                  Effortless onboarding designed around your atelier schedule
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {steps.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-md transition-all duration-300 border border-[#E7DCD7]">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-9 h-9 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="mt-4 mb-2">
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h3 className="text-base font-bold text-[#241719] mb-2 font-serif">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#75676A] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-[#241719] via-[#351019] to-[#4A101C] rounded-3xl p-8 text-white border border-[#812D3A]/40">
                <h3
                  className="text-xl font-bold mb-6 text-center text-[#FAF7F2]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Representative Showcase Scenario
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-[#E8D9C9]">Bespoke Piece Price</span>
                      <span className="font-bold text-[#FAF7F2]">₹4,500</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-[#E8D9C9]">Cost Per Engagement</span>
                      <span className="font-bold text-[#FAF7F2]">₹5</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-[#E8D9C9]">Daily Budget</span>
                      <span className="font-bold text-[#FAF7F2]">₹500</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-[#E8D9C9]">Estimated Qualified Views</span>
                      <span className="font-bold text-[#E8D9C9]">
                        100 connoisseurs
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-xs text-[#FAF7F2]/90 leading-relaxed">
                      💡 With a measured expenditure of ₹500/day at ₹5 per engagement, your couture piece reaches 100 qualified patrons specifically seeking your aesthetic every single day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl lg:text-4xl font-bold text-[#241719] mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Transparent, Bespoke Pricing
                </h2>
                <p className="text-[#75676A] text-sm">
                  Zero hidden dues. Settle solely for measurable results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Starter Plan */}
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border-2 border-[#812D3A]/30">
                  <div className="bg-gradient-to-r from-[#4A101C] to-[#812D3A] p-6 text-white text-center">
                    <h3 className="text-xl font-bold font-serif">Pay Per Engagement</h3>
                    <div className="text-3xl font-bold mt-2">₹5 - ₹20</div>
                    <p className="text-xs opacity-90 text-[#E8D9C9]">per qualified click</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6 text-xs text-[#75676A]">
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Zero recurring monthly retainer</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Define custom budgetary thresholds</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Pause or resume with a single click</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Full transparency & real-time telemetry</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white py-3 rounded-xl font-semibold text-xs shadow-md hover:brightness-110 transition active:scale-95"
                    >
                      Activate Spotlight
                    </button>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#E7DCD7]">
                  <div className="bg-[#FAF7F2] p-6 text-center border-b border-[#E7DCD7]">
                    <h3 className="text-xl font-bold font-serif text-[#241719]">Bespoke Daily Budget</h3>
                    <div className="text-3xl font-bold mt-2 text-[#4A101C]">₹200+</div>
                    <p className="text-xs text-[#75676A]">flexible starting baseline</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6 text-xs text-[#75676A]">
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Absolute expenditure ceiling</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Priority concierge placement review</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Advanced demographic insights</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#287653]" />
                        <span>Exclusive holiday banner inclusion</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-[#FAF7F2] text-[#4A101C] border border-[#E7DCD7] py-3 rounded-xl font-semibold text-xs hover:bg-[#F1E8E2] transition active:scale-95"
                    >
                      Inquire Custom
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-[#F1E8E2] rounded-2xl p-6 text-center border border-[#E7DCD7]">
                <p className="text-xs font-semibold text-[#4A101C]">
                  💡 Atelier Suggestion: Initiate with a modest parameter of ₹200–₹500 daily to observe conversion momentum before scaling.
                </p>
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-[#4A101C] via-[#351019] to-[#812D3A] rounded-3xl p-10 text-center text-white shadow-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3
                className="text-3xl lg:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ready to Amplify Your Atelier?
              </h3>
              <p className="text-sm lg:text-base mb-6 opacity-90 text-[#E8D9C9] max-w-xl mx-auto">
                Join our network of celebrated luxury fashion houses and handcrafted ateliers today.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#FAF7F2] text-[#4A101C] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white shadow-lg transition-all duration-300 transform active:scale-95 inline-flex items-center gap-2"
              >
                Launch First Campaign
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseProducts;
