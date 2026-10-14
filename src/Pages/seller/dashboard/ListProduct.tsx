import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPackage, FiTruck, FiDollarSign, FiStar } from "react-icons/fi";

const STATS = [
  { num: "2Cr+", label: "Customers" },
  { num: "₹0", label: "Commission" },
  { num: "48h", label: "Fast Payout" },
  { num: "19000+", label: "Pincodes" },
];

const STEPS = [
  { icon: FiPackage, title: "List your products", desc: "Upload products in minutes with our easy seller dashboard." },
  { icon: FiTruck, title: "We handle delivery", desc: "Pan-India logistics handled by our trusted delivery partners." },
  { icon: FiDollarSign, title: "Get paid fast", desc: "Receive payments directly to your bank within 48 hours." },
  { icon: FiStar, title: "Grow your brand", desc: "Access tools, analytics and promotions to scale faster." },
];

const ListProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-google">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* bg blob */}
        <div className="absolute right-0 top-0 w-[55%] h-full bg-[#F1E8E2]/60 rounded-bl-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-[#F1E8E2] text-[#812D3A] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5 border border-[#E7DCD7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A101C] animate-pulse" />
                Now open for curated designers
              </span>

              <h1
                className="text-4xl md:text-5xl font-black text-[#241719] leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Sell Online to Crores<br /> of Patrons at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#B54745]">
                  0% Commission
                </span>
              </h1>

              <p className="text-[#75676A] text-sm md:text-base leading-relaxed mb-3 max-w-md">
                Become a <span className="font-semibold text-[#241719]">Noble House</span> atelier and present your collection across India with zero listing fees and fast payouts.
              </p>

              <p className="text-xs text-[#75676A] mb-8 flex items-center gap-2">
                <span className="bg-[#4A101C] text-white text-[9px] font-bold px-2 py-0.5 rounded">NEW</span>
                Don't have a GSTIN? You can still sell.{" "}
                <span className="text-[#812D3A] font-semibold cursor-pointer hover:underline">Know more</span>
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/sellersignup")}
                  className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white text-sm font-semibold rounded-full shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  Start Selling <FiArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate("/seller/growbusiness")}
                  className="px-6 py-3.5 border border-[#E7DCD7] text-[#4A101C] text-sm font-semibold rounded-full hover:bg-[#F1E8E2] transition"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Right — illustration + chart */}
            <div className="relative flex justify-center items-end">
              {/* chart bars */}
              <div className="absolute bottom-6 left-6 flex items-end gap-2 z-0">
                {[40, 60, 45, 75, 55, 90, 100].map((h, i) => (
                  <div
                    key={i}
                    className="w-5 rounded-t-md bg-gradient-to-t from-[#4A101C]/30 to-[#812D3A]/50"
                    style={{ height: `${h}px` }}
                  />
                ))}
                {/* growth line */}
                <svg className="absolute bottom-0 left-0 w-full" height="110" viewBox="0 0 160 110" fill="none">
                  <polyline
                    points="10,95 33,70 56,80 79,45 102,60 125,20 148,5"
                    stroke="#812D3A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="148" cy="5" r="3.5" fill="#4A101C" />
                </svg>
              </div>

              {/* seller image */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80"
                alt="Seller"
                className="relative z-10 w-64 md:w-80 rounded-3xl shadow-xl object-cover border border-[#E7DCD7]"
              />

              {/* floating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#E7DCD7] z-20">
                <div className="w-8 h-8 rounded-xl bg-[#F1E8E2] flex items-center justify-center">
                  <FiDollarSign size={14} className="text-[#287653]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#75676A] font-medium">This month</p>
                  <p className="text-sm font-black text-[#241719]">₹1,28,400</p>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#E7DCD7] z-20">
                <div className="w-8 h-8 rounded-xl bg-[#F1E8E2] flex items-center justify-center">
                  <FiPackage size={14} className="text-[#4A101C]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#75676A] font-medium">Orders today</p>
                  <p className="text-sm font-black text-[#241719]">248 orders</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-[#E7DCD7]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E7DCD7]">
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-6 py-2">
              <p
                className="text-2xl md:text-3xl font-bold text-[#4A101C]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {s.num}
              </p>
              <p className="text-xs text-[#75676A] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#F1E8E2] text-[#4A101C] border border-[#E7DCD7] mb-4">
            How it works
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#241719]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Start presenting in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
              3 simple steps
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white border border-[#E7DCD7] shadow-sm hover:shadow-md hover:border-[#A66A75] hover:-translate-y-1 transition-all"
            >
              <span className="absolute top-4 right-4 text-[11px] font-bold text-[#E7DCD7] group-hover:text-[#812D3A] transition-colors">
                0{i + 1}
              </span>
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#F1E8E2] text-[#4A101C] mb-4 group-hover:bg-gradient-to-r group-hover:from-[#4A101C] group-hover:to-[#812D3A] group-hover:text-white transition-all">
                <s.icon size={18} />
              </div>
              <h4 className="font-bold text-sm text-[#241719] mb-1.5">{s.title}</h4>
              <p className="text-xs text-[#75676A] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4A101C] via-[#351019] to-[#812D3A] p-10 md:p-14 text-center text-white shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 relative z-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready to present your collection?
          </h2>
          <p className="text-[#E8D9C9] text-sm mb-8 max-w-md mx-auto relative z-10">
            Join 4,800+ artisans and couture designers already growing with Noble House. Zero commission, fast payouts.
          </p>
          <button
            onClick={() => navigate("/sellersignup")}
            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF7F2] text-[#4A101C] font-bold text-sm rounded-full shadow-md hover:bg-white active:scale-95 transition-all"
          >
            Start Selling Free <FiArrowRight size={15} />
          </button>
        </div>
      </section>

    </div>
  );
};

export default ListProduct;