import { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dress from "../../assets/Images/dress.png";
import shoes from "../../assets/Images/shoes.png";
import men from "../../assets/Images/men.png";
import makeup from "../../assets/Images/makeup.png";
import kids from "../../assets/Images/kid.png";
import both from "../../assets/Images/both.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Women's Fashion",
    subtitle: "Privé Archive Selection",
    price: 9999,
    originalPrice: 24999,
    discount: 60,
    image: dress,
  },
  {
    id: 2,
    title: "Men's Sartorial",
    subtitle: "Limited Atelier Allocation",
    price: 2999,
    originalPrice: 9999,
    discount: 70,
    image: shoes,
  },
  {
    id: 3,
    title: "Kids Collection",
    subtitle: "Exclusive Petite Pieces",
    price: 4999,
    originalPrice: 15999,
    discount: 68,
    image: makeup,
  },
  {
    id: 4,
    title: "Haute Beauty",
    subtitle: "Artisan Formulation Release",
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    image: kids,
  },
  {
    id: 5,
    title: "Winter Essentials",
    subtitle: "Pure Cashmere & Wool",
    price: 15999,
    originalPrice: 21999,
    discount: 27,
    image: men,
  },
  {
    id: 6,
    title: "Eveningwear Collection",
    subtitle: "Bespoke Silhouettes",
    price: 7499,
    originalPrice: 9999,
    discount: 25,
    image: both,
  },
  {
    id: 7,
    title: "Winter Essentials",
    subtitle: "Fine Italian Leather",
    price: 15999,
    originalPrice: 21999,
    discount: 27,
    image: shoes,
  },
];

const useVisible = () => {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      if (width < 640) setVisible(1);
      else if (width < 768) setVisible(2);
      else setVisible(3);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return visible;
};

const SlideCard = ({ slide }: { slide: Slide }) => (
  <div className="bg-white overflow-hidden border border-[#E7DCD7] rounded-2xl shadow-xs hover:shadow-md hover:border-[#812D3A]/40 transition-all duration-300">
    <div className="px-4 py-2 text-center border-b border-[#E7DCD7] bg-[#FAF7F2]">
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#4A101C] relative inline-block shimmer-luxury font-serif">
        {slide.subtitle}
      </p>
    </div>

    <div className="relative overflow-hidden" style={{ height: "300px" }}>
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
      />
    </div>
  </div>
);

const FlashSaleSlider = () => {
  const [cur, setCur] = useState(0);
  const visible = useVisible();
  const maxIdx = Math.max(0, slides.length - visible);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (n: number) => setCur(Math.max(0, Math.min(n, maxIdx))),
    [maxIdx]
  );

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(
      () => setCur((p) => (p >= maxIdx ? 0 : p + 1)),
      5000
    );
  }, [maxIdx]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAuto]);

  useEffect(() => {
    goTo(cur);
  }, [visible, goTo]);

  const offset = cur * (100 / visible);

  return (
    <>
      <style>{`
        @keyframes shimmerLuxury {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer-luxury {
          background: linear-gradient(90deg, #4A101C 0%, #812D3A 30%, #b45309 50%, #812D3A 70%, #4A101C 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmerLuxury 3s linear infinite;
        }
      `}</style>

      <div className="py-10 bg-[#FAF7F2] border-y border-[#E7DCD7]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 mx-auto text-center">
            <div className="flex items-center gap-3.5 md:px-6 mt-2">
              <div
                className="w-1 h-9 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                }}
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#241719] text-left">
                  Curated Deals of the{" "}
                  <span className="italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
                    Moment
                  </span>
                </h2>
                <p className="text-xs text-[#75676A] font-medium tracking-wide hidden md:block mt-0.5 text-left">
                  Limited atelier pieces &bull; Refreshed every 24 hours
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative group"
            onMouseEnter={() => {
              if (autoRef.current) clearInterval(autoRef.current);
            }}
            onMouseLeave={startAuto}
          >
            <div className="overflow-hidden">
              <div
                className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${offset}%)` }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="shrink-0"
                    style={{ width: `calc(${100 / visible}% - 8px)` }}
                  >
                    <SlideCard slide={slide} />
                  </div>
                ))}
              </div>
            </div>

            {maxIdx > 0 && (
              <>
                <button
                  onClick={() => goTo(cur - 1)}
                  disabled={cur === 0}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E7DCD7] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 shadow-md hover:border-[#812D3A] text-[#241719]"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() => goTo(cur + 1)}
                  disabled={cur >= maxIdx}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E7DCD7] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 shadow-md hover:border-[#812D3A] text-[#241719]"
                >
                  <FaChevronRight size={12} />
                </button>
              </>
            )}
          </div>

          {maxIdx > 0 && (
            <div className="flex justify-center gap-1.5 mt-6">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === cur ? "24px" : "6px",
                    background:
                      i === cur
                        ? "linear-gradient(90deg, #4A101C, #812D3A)"
                        : "#E7DCD7",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlashSaleSlider;