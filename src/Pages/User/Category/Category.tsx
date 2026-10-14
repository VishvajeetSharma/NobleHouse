import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../../data/products";
import ProductCard from "../../../components/Card/CardComponent";
import Header from "../../../components/Header/Heading";
import ShimmerCardSoft from "../../../components/Card/ShimmerCard";
import {
  FaShoppingBag,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
} from "react-icons/fa";

const FilterAccordion = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span
          className="text-xs font-bold tracking-[0.14em] uppercase text-gray-700"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </span>
        {open ? (
          <FaChevronUp size={10} className="text-gray-400" />
        ) : (
          <FaChevronDown size={10} className="text-gray-400" />
        )}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
};

const Category = () => {
  const [loading, setloading] = useState(true);
  const { gender } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setloading(true);
    const timer = setTimeout(() => setloading(false), 1000);
    return () => clearTimeout(timer);
  }, [gender]);

  const [sortBy, setSortBy] = useState<"popularity" | "low" | "high">("popularity");

  const genderProducts = products.filter((item) => item.gender === gender);

  const groupedCategories = genderProducts.reduce((acc: any, item) => {
    if (!acc[item.mainCategory]) acc[item.mainCategory] = new Set();
    acc[item.mainCategory].add(item.category);
    return acc;
  }, {});

  const categoryFiltered =
    activeFilter === "all"
      ? genderProducts
      : genderProducts.filter(
        (item) =>
          item.mainCategory.toLowerCase() === activeFilter.toLowerCase() ||
          item.category.toLowerCase() === activeFilter.toLowerCase()
      );

  const displayedProducts = [...categoryFiltered].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  const collectionTitle =
    gender === "men"
      ? "Men's Collection"
      : gender === "women"
        ? "Women's Collection"
        : gender === "kids"
          ? "Kids' Collection"
          : "Collection";

  const FilterContent = ({ onSelect }: { onSelect?: () => void }) => (
    <>
      {activeFilter !== "all" && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#4A101C] border border-[#E7DCD7] bg-[#F1E8E2]">
            {activeFilter}
            <button onClick={() => { setActiveFilter("all"); onSelect?.(); }}>
              <FaTimes size={8} />
            </button>
          </span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-1">
        <FilterAccordion label="Categories">
          <div className="space-y-0.5">
            <button
              onClick={() => { setActiveFilter("all"); onSelect?.(); }}
              className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${activeFilter === "all" ? "font-semibold text-[#4A101C]" : "text-gray-600 hover:text-[#812D3A]"
                }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              All Items
            </button>
            {Object.entries(groupedCategories).map(([mainCat, subCats]: any) => (
              <div key={mainCat} className="mb-2">
                <button
                  onClick={() => { setActiveFilter(mainCat); onSelect?.(); }}
                  className={`w-full text-left px-2 py-1.5 font-semibold text-sm ${activeFilter === mainCat ? "text-[#4A101C]" : "text-gray-700"
                    }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {mainCat}
                </button>
                <div className="ml-4 mt-1 space-y-1">
                  {[...subCats].map((sub: string) => (
                    <button
                      key={sub}
                      onClick={() => { setActiveFilter(sub); onSelect?.(); }}
                      className={`block text-left text-sm px-2 py-1 ${activeFilter === sub ? "text-[#4A101C] font-medium" : "text-gray-500 hover:text-[#812D3A]"
                        }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ‹ {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FilterAccordion>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241719]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Page title ── */}
        <div className="mb-4">
          <h1 className="text-xl font-bold font-serif text-[#241719] mb-0.5">
            {collectionTitle}
            {activeFilter !== "all" && <span className="text-[#812D3A]"> — {activeFilter}</span>}
          </h1>
          <p className="text-xs text-[#75676A]">
            Showing {displayedProducts.length} creations
          </p>
        </div>

        {/* ── Sort + Filter bar — full width, above layout ── */}
        <div
          className="flex items-center gap-2 border-b border-gray-200 mb-5 overflow-x-auto hide-scrollbar"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Filter button — only mobile, lives inside sort bar */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 mb-2.5 rounded-2xl text-xs font-semibold border transition-all shrink-0 ${activeFilter !== "all"
                ? "border-[#4A101C] text-[#4A101C] bg-[#F1E8E2]"
                : "border-gray-400 text-gray-600 bg-white"
              }`}
          >
            <FaSlidersH size={10} />
            Filter
            {activeFilter !== "all" && (
              <span className="w-3.5 h-3.5 rounded-full bg-[#4A101C] text-white text-[8px] font-bold flex items-center justify-center">
                1
              </span>
            )}
          </button>

          {/* Separator */}
          <div className="lg:hidden w-px h-4 bg-gray-300 mb-2.5 shrink-0" />

          <span className="text-xs text-gray-700 font-semibold mb-2.5 whitespace-nowrap shrink-0 uppercase px-1 py-1">
            Sort By —
          </span>

          {[
            { id: "popularity", label: "Popularity" },
            { id: "low", label: "Price: Low to High" },
            { id: "high", label: "Price: High to Low" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id as typeof sortBy)}
              className={`pb-2.5 px-3 mb-2 text-xs border rounded-2xl py-2 font-medium whitespace-nowrap transition-all shrink-0 ${sortBy === opt.id
                  ? "border-[#4A101C] text-[#4A101C] font-semibold bg-[#F1E8E2]"
                  : "border-gray-400 text-gray-500 hover:text-gray-700 bg-white"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* ── Main layout: sidebar + products ── */}
        <div className="flex gap-0">

          {/* Desktop sidebar */}
          <div
            className="hidden lg:flex flex-col shrink-0 sticky top-20 self-start"
            style={{ width: 240, maxHeight: "calc(100vh - 88px)", overflowY: "auto" }}
          >
            <div className="flex items-center justify-between mb-4 pr-4">
              <span className="text-sm font-bold font-serif text-[#241719] tracking-wide">
                Filters
              </span>
              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="text-[11px] font-semibold text-[#4A101C] hover:text-[#812D3A] tracking-wide uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="pr-4">
              <FilterContent />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px bg-gray-200 mx-6 self-stretch" />

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => <ShimmerCardSoft key={i} />)
                  : displayedProducts.map((product: any) => <ProductCard key={product.id} item={product} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaShoppingBag size={22} className="text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  No products found
                </p>
                <button onClick={() => setActiveFilter("all")} className="text-[#4A101C] text-xs font-semibold hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ Mobile bottom drawer ══ */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-200 bg-black/30 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-201 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-gray-200" />
        </div>
        <div className="px-5 pb-10 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Filters
            </span>
            <div className="flex items-center gap-3">
              {activeFilter !== "all" && (
                <button
                  onClick={() => { setActiveFilter("all"); setMobileOpen(false); }}
                  className="text-[11px] font-semibold text-[#4A101C] uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Clear All
                </button>
              )}
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <FaTimes size={13} />
              </button>
            </div>
          </div>
          <FilterContent onSelect={() => setMobileOpen(false)} />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Category;