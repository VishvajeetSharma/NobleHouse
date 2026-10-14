import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";
import {
  FiCamera,
  FiCheck,
  FiStar,
  FiArrowLeft,
} from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

// ── Data ──
const PRODUCT = {
  name: "Floral Wrap Midi Dress",
  brand: "Noble House",
  image:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop",
  totalReviews: 163,
  avgRating: 4.1,
  ratingBreakdown: [
    { star: 5, count: 84 },
    { star: 4, count: 41 },
    { star: 3, count: 17 },
    { star: 2, count: 7 },
    { star: 1, count: 14 },
  ],
  attributes: [
    { label: "Fit", value: "True to Size", pct: 100 },
    { label: "Quality", value: "High", pct: 82 },
    { label: "Comfort", value: "Very Good", pct: 78 },
    { label: "Value", value: "Worth It", pct: 90 },
  ],
};

const REVIEWS = [
  {
    id: 1,
    name: "Harbin Youtube",
    date: "7 Oct 2024",
    rating: 5,
    title: "Absolutely loving every bit of it",
    body: "I recently purchased this and I'm absolutely loving it! The comfort level is exceptional, and the fabric quality is top-notch.",
    verified: true,
    size: "M",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=120&h=120&fit=crop",
    avatar: "https://i.pravatar.cc/40?img=47",
  },
  {
    id: 2,
    name: "Priya R.",
    date: "4 Nov 2024",
    rating: 4,
    title: "Material quality is good",
    body: "The colour is exactly as shown. Overall I'm quite satisfied with the purchase.",
    verified: true,
    size: "S",
    image: null,
    avatar: "https://i.pravatar.cc/40?img=32",
  },
  {
    id: 3,
    name: "Safeerah M.",
    date: "9 Oct 2024",
    rating: 5,
    title: "Perfect fit, exactly as shown",
    body: "Worth every penny. Fabric feels premium and stitching quality is excellent.",
    verified: true,
    size: "L",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 4,
    name: "Sujoy Roy",
    date: "6 Feb 2025",
    rating: 4,
    title: "Good quality for the price",
    body: "Excellent value for money. The fit is good and material feels soft.",
    verified: false,
    size: "XL",
    image: null,
    avatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: 5,
    name: "Ankita J.",
    date: "31 Jul 2024",
    rating: 3,
    title: "Nice fit, value for money",
    body: "Decent product. Colour is accurate and shipping was fast.",
    verified: true,
    size: "M",
    image: null,
    avatar: "https://i.pravatar.cc/40?img=56",
  },
];

// ── Helpers ──
const starColor = (r: number) =>
  r >= 4 ? "#287653" : r === 3 ? "#c27803" : "#B54745";
const starBg = (r: number) =>
  r >= 4 ? "#eef8f3" : r === 3 ? "#fefce8" : "#fdf2f2";
const barColor = (s: number) =>
  s >= 4 ? "#287653" : s === 3 ? "#c27803" : "#B54745";

const StarRow = ({
  rating,
  size = 12,
}: {
  rating: number;
  size?: number;
}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        size={size}
        fill={s <= Math.round(rating) ? "#b45309" : "none"}
        stroke={s <= Math.round(rating) ? "#b45309" : "#d1d5db"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

// ── Component ──
const ProductReviewPage = () => {
  const navigate = useNavigate();
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const total = PRODUCT.ratingBreakdown.reduce((s, r) => s + r.count, 0);
  const filtered = REVIEWS.filter((r) =>
    filterRating ? r.rating === filterRating : true,
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.4s ease both; }

        .rev-card {
          background: #ffffff;
          border: 1px solid #E7DCD7;
          border-radius: 18px;
          transition: all 0.2s ease;
        }
        .rev-card:hover {
          box-shadow: 0 8px 24px rgba(74, 16, 28, 0.05);
          border-color: #812D3A30;
        }

        .bar-row {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer; padding: 5px 8px; border-radius: 8px;
          transition: background 0.15s;
        }
        .bar-row:hover { background: #FAF7F2; }
        .bar-row.active { background: #F1E8E2; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back — mobile only */}
          <button
            onClick={() => navigate(-1)}
            className="md:hidden flex items-center gap-2 text-[#75676A] hover:text-[#4A101C] mb-5 text-sm font-medium transition-colors"
          >
            <FiArrowLeft size={15} /> Back to Product
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── LEFT ── */}
            <div className="space-y-4">
              {/* Product mini card */}
              <div className="rev-card p-4">
                <div className="flex gap-3">
                  <img
                    src={PRODUCT.image}
                    alt={PRODUCT.name}
                    className="w-16 h-20 rounded-xl object-cover shrink-0 border border-[#E7DCD7]"
                  />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-[#812D3A]">
                      {PRODUCT.brand}
                    </p>
                    <p className="text-base font-semibold text-[#241719] leading-snug font-serif">
                      {PRODUCT.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating summary */}
              <div className="rev-card p-5">
                {/* Big number */}
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-5xl font-black text-[#241719] leading-none font-serif">
                      {PRODUCT.avgRating}
                    </p>
                    <div className="mt-2 mb-1">
                      <StarRow rating={PRODUCT.avgRating} size={15} />
                    </div>
                    <p className="text-xs text-[#75676A]">
                      {PRODUCT.totalReviews} verified buyers
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    {[5, 4].map((s) => {
                      const r = PRODUCT.ratingBreakdown.find(
                        (rb) => rb.star === s,
                      )!;
                      return (
                        <div key={s} className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#75676A]">
                            {s}★
                          </span>
                          <span className="text-[11px] font-semibold text-[#241719]">
                            {r.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#E7DCD7] pt-4">
                  {/* Rating bars */}
                  <div className="space-y-1">
                    {PRODUCT.ratingBreakdown.map((r) => {
                      const pct = Math.round((r.count / total) * 100);
                      const active = filterRating === r.star;
                      return (
                        <div
                          key={r.star}
                          className={`bar-row ${active ? "active" : ""}`}
                          onClick={() =>
                            setFilterRating(active ? null : r.star)
                          }
                        >
                          <span className="text-[11px] font-medium text-[#75676A] w-4 text-right shrink-0">
                            {r.star}
                          </span>
                          <FiStar
                            size={10}
                            fill={barColor(r.star)}
                            stroke={barColor(r.star)}
                            className="shrink-0"
                          />
                          <div className="flex-1 h-1.5 rounded-full bg-[#E7DCD7]/60 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                background: barColor(r.star),
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-[#75676A] w-6 text-right shrink-0">
                            {r.count}
                          </span>
                          {active && (
                            <FiCheck
                              size={12}
                              className="text-[#4A101C] shrink-0"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {filterRating && (
                    <button
                      onClick={() => setFilterRating(null)}
                      className="w-full mt-3 py-1.5 text-xs font-semibold rounded-lg transition-all bg-[#F1E8E2] text-[#4A101C] border border-[#E7DCD7] hover:bg-[#E8D9C9]/50"
                    >
                      Clear {filterRating}★ Filter ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Buyer attributes */}
              <div className="rev-card p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#75676A] mb-4 flex items-center gap-2 font-serif">
                  <span
                    className="w-1 h-3.5 rounded-full inline-block"
                    style={{
                      background:
                        "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                    }}
                  />
                  Buyer Attributes
                </p>
                <div className="space-y-4">
                  {PRODUCT.attributes.map((a) => (
                    <div key={a.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-[#241719] font-medium">
                          {a.label}
                        </span>
                        <span className="text-[10px] font-semibold text-[#287653]">
                          {a.value} ({a.pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#E7DCD7]/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${a.pct}%`,
                            background:
                              "linear-gradient(90deg, #812D3A, #4A101C)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="lg:col-span-2">
              {/* Header row */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#812D3A] mb-0.5">
                    ✦ Verified Reviews
                  </p>
                  <h2 className="text-2xl font-semibold text-[#241719] font-serif">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-[#75676A] mt-0.5">
                    {filterRating
                      ? `${filtered.length} reviews with ${filterRating}★`
                      : `${REVIEWS.length} total reviews`}
                  </p>
                </div>
              </div>

              {/* Customer photos */}
              {REVIEWS.filter((r) => r.image).length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#75676A] mb-3">
                    Customer Photos ({REVIEWS.filter((r) => r.image).length})
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                    {REVIEWS.filter((r) => r.image).map((r) => (
                      <img
                        key={r.id}
                        src={r.image!}
                        alt="customer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E7DCD7] hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                    <div className="w-16 h-16 rounded-xl shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all border border-dashed border-[#E7DCD7] hover:border-[#812D3A] hover:bg-[#F1E8E2]/50">
                      <FiCamera size={14} className="text-[#75676A]" />
                      <span className="text-[10px] text-[#75676A] mt-1 font-medium">
                        +12
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Review list */}
              {filtered.length === 0 ? (
                <div className="rev-card text-center py-14">
                  <FiStar size={32} className="text-[#E7DCD7] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#75676A]">
                    No reviews found
                  </p>
                  <p className="text-xs text-[#75676A]/80 mt-1">
                    Try clearing the filter
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((rev, idx) => (
                    <div
                      key={rev.id}
                      className="rev-card fade-in p-5"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#E7DCD7] shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#241719] font-serif">
                              {rev.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              {rev.verified && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#287653] bg-[#287653]/10 px-2 py-0.5 rounded-full border border-[#287653]/20">
                                  <FaCheck size={7} /> Verified
                                </span>
                              )}
                              <span className="text-[9px] text-[#75676A] bg-[#F1E8E2] px-2 py-0.5 rounded-full">
                                Size {rev.size}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#75676A] shrink-0">
                          {rev.date}
                        </span>
                      </div>

                      {/* Rating badge + title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold"
                          style={{
                            background: starBg(rev.rating),
                            color: starColor(rev.rating),
                          }}
                        >
                          <FiStar
                            size={9}
                            fill={starColor(rev.rating)}
                            stroke={starColor(rev.rating)}
                          />
                          {rev.rating}.0
                        </span>
                        <p className="text-sm font-semibold text-[#241719]">
                          {rev.title}
                        </p>
                      </div>

                      {/* Body */}
                      <p className="text-sm text-[#75676A] leading-relaxed mb-3 font-normal">
                        {rev.body}
                      </p>

                      {/* Review image */}
                      {rev.image && (
                        <img
                          src={rev.image}
                          alt="review"
                          className="w-16 h-16 rounded-xl object-cover border border-[#E7DCD7] hover:scale-105 transition-transform cursor-pointer"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewPage;