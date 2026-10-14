"use client";

import React, { useState } from "react";

type TabType =
  | "Shipping & Delivery Charges"
  | "How Shipping Works"
  | "Shipping Timeline"
  | "Return Policy"
  | "Cancellation Policy";

const tabs: TabType[] = [
  "Shipping & Delivery Charges",
  "How Shipping Works",
  "Shipping Timeline",
  "Return Policy",
  "Cancellation Policy",
];

const ShippingPolicy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  return (
    <>
      <div className="bg-[#FAF7F2] min-h-screen">
        {/* HERO */}
        <section className="bg-gradient-to-r from-[#F1E8E2] via-[#FAF7F2] to-[#E8D9C9] py-16 border-b border-[#E7DCD7]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#812D3A] mb-3">
                Logistics & Atelier Standards
              </p>
              <h1
                className="text-3xl md:text-5xl font-bold text-[#241719] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Noble House Shipping, Delivery & Returns Policy
              </h1>

              <p className="mt-4 text-[#75676A] text-base md:text-lg">
                Deliver your bespoke creations across India with white-glove, reliable logistics.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="border border-[#E7DCD7] rounded-xl px-4 py-3 w-full outline-none focus:border-[#4A101C] focus:ring-1 focus:ring-[#A66A75] text-sm text-[#241719] bg-white"
                />

                <button className="bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md hover:brightness-110 transition active:scale-95 whitespace-nowrap">
                  Start Selling
                </button>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
              className="rounded-3xl shadow-xl max-w-md w-full border border-[#E7DCD7]"
              alt="shipping"
            />
          </div>
        </section>

        {/* MAIN SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7DCD7] p-5 h-fit">
            <h3
              className="font-bold mb-4 text-[#241719] text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Atelier Policies
            </h3>

            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-3.5 py-2.5 rounded-xl mb-2 text-xs font-semibold transition ${activeTab === tab
                    ? "bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white shadow-sm"
                    : "text-[#75676A] hover:bg-[#FAF7F2] hover:text-[#4A101C]"
                  }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-[#E7DCD7] p-8">
            <h2
              className="text-2xl font-bold mb-4 text-[#241719]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {activeTab}
            </h2>

            {/* SHIPPING CHARGES */}
            {activeTab === "Shipping & Delivery Charges" && (
              <>
                <p className="text-[#75676A] mb-6 text-sm">
                  Cost-effective, premium shipping with trusted courier partners across
                  India.
                </p>

                <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DCD7]">
                  <h3 className="font-semibold mb-4 text-sm text-[#241719]">
                    Ship Your Creations in 3 Steps
                  </h3>

                  <ul className="space-y-2.5 text-xs text-[#75676A]">
                    <li>• Manage orders directly from your Atelier dashboard</li>
                    <li>• Pack products securely in signature presentation boxes</li>
                    <li>• Hand over to our authorized courier partner</li>
                  </ul>
                </div>
              </>
            )}

            {/* HOW SHIPPING WORKS */}
            {activeTab === "How Shipping Works" && (
              <p className="text-[#75676A] text-sm leading-relaxed">
                Orders are received in your dashboard. Pack them in luxury packaging and hand over
                to our logistics partner for prompt delivery to the client's doorstep.
              </p>
            )}

            {/* SHIPPING TIMELINE */}
            {activeTab === "Shipping Timeline" && (
              <div className="text-[#75676A] text-sm space-y-4">
                <p>
                  Orders must be dispatched within <b className="text-[#241719]">2–3 days</b> of receiving
                  them.
                </p>
                <p>
                  Delivery usually takes <b className="text-[#241719]">3–7 business days</b> depending on
                  client location.
                </p>
              </div>
            )}

            {/* RETURN POLICY */}
            {activeTab === "Return Policy" && (
              <div className="space-y-6 text-[#75676A] text-sm">
                <p>
                  Patrons can request returns within <b className="text-[#241719]">7 days</b> of
                  delivery for eligible items.
                </p>

                <h3 className="font-semibold text-base text-[#241719]">
                  Return Logistics Fee
                </h3>

                <ul className="space-y-2 text-xs">
                  <li>
                    • Atelier covers return shipping fee if product is returned by customer
                  </li>
                  <li>• Zero fee if order is not delivered (RTO)</li>
                  <li>• Track all returns via atelier dashboard</li>
                  <li>• Exceptional quality discrepancies may waive return fee</li>
                </ul>
              </div>
            )}

            {/* CANCELLATION POLICY */}
            {activeTab === "Cancellation Policy" && (
              <div className="space-y-4 text-[#75676A] text-sm">
                <h3 className="font-semibold text-base text-[#241719]">
                  No Cancellation Penalty
                </h3>

                <p>
                  Orders can be cancelled before dispatch without any charges.
                </p>

                <p>
                  Ensure boutique creations are in stock to avoid late cancellations and
                  maintain a five-star patron experience.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-[#4A101C] via-[#351019] to-[#812D3A] text-center text-white">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Start Presenting on Noble House
          </h2>

          <button
            onClick={() => window.location.href = "/sellersignup"}
            className="bg-[#FAF7F2] text-[#4A101C] px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white shadow-lg transition active:scale-95"
          >
            Create Atelier Account
          </button>
        </section>
      </div>
    </>
  );
};

export default ShippingPolicy;
