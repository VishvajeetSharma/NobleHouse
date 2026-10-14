import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


// ── Slide data ──
const slides = [
  {
    image: "https://i.pinimg.com/1200x/24/a2/e8/24a2e813cc22498afe98e2786799bcda.jpg",
    leftTag: "NEW SEASON",
    leftTitle1: "Women's",
    leftTitle2: "Collection",
    leftSub: "Fresh arrivals just dropped",
    rightTag: "UP TO",
    rightOffer: "50% OFF",
    rightSub: "Shop Like You've Earned It!",
    cta: "Shop Women",
    ctaPath: "/category/women",
    endDate: "Ends 10th May",
    accent: "#812D3A",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1706807135365-ad66909cfca7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    leftTag: "TRENDING NOW",
    leftTitle1: "Men's",
    leftTitle2: "Edit",
    leftSub: "Premium styles for him",
    rightTag: "UPTO",
    rightOffer: "40% OFF",
    rightSub: "Exclusive Member Deals",
    cta: "Shop Men",
    ctaPath: "/category/men",
    endDate: "Ends 15th May",
    accent: "#4A101C",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1770372314849-c915c7496ec5?q=80&w=948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    leftTag: "MEGA SALE",
    leftTitle1: "Kids'",
    leftTitle2: "World",
    leftSub: "Fun styles for little ones",
    rightTag: "FLAT",
    rightOffer: "60% OFF",
    rightSub: "Best Prices Guaranteed",
    cta: "Shop Kids",
    ctaPath: "/category/kids",
    endDate: "Ends 8th May",
    accent: "#B54745",
  },
  {
    image: "https://images.unsplash.com/photo-1723150512429-bfa92988d845?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    leftTag: "MEGA SALE",
    leftTitle1: "makeup'",
    leftTitle2: "World",
    leftSub: "Fun styles for little ones",
    rightTag: "FLAT",
    rightOffer: "60% OFF",
    rightSub: "Best Prices Guaranteed",
    cta: "Shop Kids",
    ctaPath: "/category/kids",
    endDate: "Ends 8th May",
    accent: "#A66A75",
  },
];

// const trustBadges = [
//   { icon: FaTruck,     label: "Free Shipping",  sub: "On orders above ₹2,999" },
//   { icon: FaShieldAlt, label: "100% Authentic", sub: "Verified products only"  },
//   { icon: FaUndo,      label: "Easy Returns",   sub: "15-day return policy"    },
//   { icon: FaHeadset,   label: "24/7 Support",   sub: "We're here to help"      },
// ];

const Slider = () => {

  // const navigate  = useNavigate();
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCur((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setCur((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCur((p) => (p + 1) % slides.length);

  const slide = slides[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Slide fade ── */
     @keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px); /* right side se start */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* original position */
  }
}

.slide-in {
  animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) both;
}
        /* ── Text reveal ── */
        @keyframes revealUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .r1 { animation: revealUp 0.5s ease 0.15s both; }
        .r2 { animation: revealUp 0.5s ease 0.28s both; }
        .r3 { animation: revealUp 0.5s ease 0.40s both; }
        .r4 { animation: revealUp 0.5s ease 0.52s both; }
        .r5 { animation: revealUp 0.5s ease 0.60s both; }

        /* ── Offer number pulse ── */
        @keyframes offerPulse {
          0%,100% { transform:scale(1); }
          50%      { transform:scale(1.04); }
        }
        .offer-num { animation: offerPulse 2.5s ease-in-out infinite; }

        /* ── Arrow btn ── */
        .arrow-btn {
          position:absolute; top:50%; transform:translateY(-50%);
          width:40px; height:40px; border-radius:50%;
          background:rgba(255,255,255,0.15);
          backdrop-filter:blur(8px);
          border:1.5px solid rgba(255,255,255,0.25);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all 0.2s; z-index:20;
          color:#fff;
        }
        .arrow-btn:hover {
          background:rgba(255,255,255,0.28);
          transform:translateY(-50%) scale(1.08);
        }

        /* ── Ticker ── */
        @keyframes ticker {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        .ticker-track {
          animation: ticker 22s linear infinite;
          display:flex; gap:3rem; white-space:nowrap;
        }
        .ticker-track:hover { animation-play-state:paused; }

        /* ── Progress bar ── */
        @keyframes progress {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        .progress-bar {
          transform-origin:left;
          animation: progress 4s linear both;
        }

        /* ── Trust hover line ── */
        .trust-cell::before {
          content:''; position:absolute; top:0; left:50%;
          transform:translateX(-50%);
          width:0; height:2px; border-radius:99px;
          background:linear-gradient(90deg,#4A101C,#812D3A);
          transition:width 0.3s ease;
        }
        .trust-cell:hover::before { width:32px; }
      `}</style>

      {/* ════ BANNER SLIDER ════ */}
      {/* ════ BANNER SLIDER ════ */}
      <div
        className="relative w-[90vw] rounded-4xl overflow-hidden mx-auto mt-5"
        style={{ background: "#0a0a0a" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Slide ── */}
        <div
          key={cur}
          className="slide-in relative w-full flex items-center"
          style={{ height: "clamp(200px, 40vw, 420px)" }}
        >
          {/* Background tint */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${slide.accent}22, #00000088)`,
            }}
          />

          {/* ── IMAGE (LEFT SIDE) ── */}
          <div className="relative z-10 h-full flex items-start justify-start w-[60%] ">
            <img
              src={slide.image}
              alt={slide.leftTitle1}
              className="h-full w-full object-cover object-top"
              style={{
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
              }}
            />
          </div>

          {/* ── RIGHT TEXT ── */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center items-end pr-8 sm:pr-12 lg:pr-16 z-10 w-[40%] text-right">

            <p
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {slide.rightTag}
            </p>

            <p
              className="font-black leading-none"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(1.6rem,5vw,4rem)",
                background: `linear-gradient(135deg, #fff, ${slide.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {slide.rightOffer}
            </p>

            <p
              className="text-white/60 mt-1 hidden sm:block"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(9px,1vw,12px)",
              }}
            >
              {slide.rightSub}
            </p>

            {/* End date */}
            <div className="flex items-center gap-1.5 mt-3 justify-end">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: slide.accent }}
              />
              <p
                className="text-[9px] sm:text-[10px] text-white/40"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                {slide.endDate}
              </p>
            </div>
          </div>

          {/* Side fades */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-5 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #0a0a0a, transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-5 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #0a0a0a, transparent)",
            }}
          />
        </div>

        {/* ── Left arrow ── */}
        <button className="arrow-btn left-3 sm:left-4" onClick={prev}>
          <FaChevronLeft size={14} />
        </button>

        {/* ── Right arrow ── */}
        <button className="arrow-btn right-3 sm:right-4" onClick={next}>
          <FaChevronRight size={14} />
        </button>

        {/* ── Dots ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="flex items-center justify-center gap-1.5 py-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: cur === i ? "20px" : "6px",
                  height: "6px",
                  background:
                    cur === i ? slide.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════ TICKER STRIP ════ */}
      {/* <div className="overflow-hidden py-2.5"
        style={{ background: `linear-gradient(135deg, ${slide.accent}dd, #812D3A)` }}>
        <div className="ticker-track text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
          {[...Array(2)].map((_,i) => (
            <span key={i} className="flex gap-12 items-center">
              {["New Arrivals 2026","✦","Free Delivery Over ₹999","✦","Easy 30-Day Returns","✦","Exclusive Member Offers","✦","Premium Fashion Curated","✦"].map((t,j) => (
                <span key={j} style={{ fontFamily: "'DM Sans',sans-serif" }}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div> */}

    </>
  );
};

export default Slider;