import Header from "../../components/Header/Heading";
import TopHeader from "../../components/TopHeader/TopHeader";
import ProductCard from "../../components/Card/CardComponent";
import { Footer } from "../../components/Footer/Footer";
import gsap from "gsap";
import FlashSaleSlider from "../../components/DashboardComponent/FlashSale";
import TrendingSection from "../../components/DashboardComponent/TrendingSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../../components/DashboardComponent/HeroSection";
import { useGSAP } from "@gsap/react";
import { useSelector } from "react-redux";
import Slider from "../../components/DashboardComponent/hero";
import ShimmerCard from "../../components/Card/ShimmerCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DashBoard = () => {
  const location = useLocation();
  const [loading, setloading] = useState(true);
  const allProducts = useSelector((state: any) => state.products.products);

  // for Card Shimmer
  useEffect(() => {
    setloading(true);
    const product = setTimeout(() => {
      setloading(false);
    }, 6000);
    return () => clearTimeout(product);
  }, []);

  // for animation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location.hash]);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".animatedText").forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const productData = allProducts.filter((p: any) => p.badge !== "TRENDING");
  const displayProducts = productData.slice(0, 10);
  const trendingProducts = allProducts.filter(
    (p: any) => p.badge === "TRENDING"
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241719]">
      <TopHeader />
      <Header />
      <HeroSection />

      <FlashSaleSlider />

      {/* Trending */}
      <TrendingSection trendingProducts={trendingProducts} />
      <Slider />

      <div className="bg-[#FAF7F2] py-12 border-t border-[#E7DCD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="animatedText text-center mb-6">
              <span className="text-xs uppercase tracking-[0.24em] text-[#812D3A] font-serif font-bold block mb-2">
                ✦ The Complete Collection ✦
              </span>

              <h2 className="text-[1.8rem] md:text-4xl font-serif text-[#241719] font-bold">
                All{" "}
                <span className="italic bg-gradient-to-r from-[#4A101C] to-[#812D3A] bg-clip-text text-transparent">
                  Creations
                </span>
              </h2>
            </div>
          </div>

          <div
            className="animatedText grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            id="allProducts"
          >
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <ShimmerCard key={i} />
                ))
              : displayProducts.map((product: any) => (
                  <ProductCard key={product.id} item={product} />
                ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashBoard;
