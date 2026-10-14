import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../../components/Card/CardComponent";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  ratingCount: number;
  badge: string;
  discount: string;
  gender: string;
}

interface TrendingSectionProps {
  trendingProducts: Product[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ trendingProducts }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedProducts = showAll ? trendingProducts : trendingProducts.slice(0, 4);

  return (
    <div className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block">
            <span className="text-xs uppercase tracking-[0.24em] text-[#812D3A] font-serif font-bold">
              ✦ Handpicked Curation ✦
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#241719] mt-2 font-bold">
            Trending{" "}
            <span className="italic bg-gradient-to-r from-[#4A101C] to-[#812D3A] bg-clip-text text-transparent">
              Creations
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-px bg-[#E7DCD7]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4A101C]"></div>
            <div className="w-8 h-px bg-[#E7DCD7]"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>

        {/* View All Button */}
        {trendingProducts.length > 2 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-7 py-2.5 border border-[#E7DCD7] bg-[#FAF7F2] text-[#241719] text-xs font-semibold rounded-full hover:border-[#4A101C] hover:text-[#4A101C] hover:bg-white transition-all duration-300 shadow-2xs group"
            >
              <span>{showAll ? "Show Less" : "Discover All Curations"}</span>
              <FaArrowRight
                size={11}
                className={`transition-transform duration-300 text-[#4A101C] ${
                  showAll ? "rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSection;