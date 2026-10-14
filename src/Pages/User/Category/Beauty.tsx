// Beauty.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../../components/Card/CardComponent";
import {
  FaStar,
  FaLeaf,
  FaSpa,
  FaGem,
  FaFire,
  FaSnowflake,
  FaSun,
  FaMoon,
  FaQuoteLeft,
} from "react-icons/fa";

import Header from "../../../components/Header/Heading";

import { AnimatedTestimonials } from "../../../components/acertunity/animated-testimonials";
import ShuffleHero from "../../../components/acertunity/shufflehero";
import Horizontalscroll from "../../../components/acertunity/Horizontalscroll";
import { ConfettiButton } from "../../../components/acertunity/confettiButtonVariants";
import { Sparkles } from "lucide-react";
import { Footer } from "../../../components/Footer/Footer";

const testimonial = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Beauty Products Data Array
const beautyProducts = [
  {
    id: 1,
    name: "Luminous Glow Serum",
    category: "Skincare",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 1247,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    badge: "Bestseller",
    badgeColor: "yellow",
    icon: FaGem,
    description: "Vitamin C infused serum for radiant skin",
    inStock: true,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 29.99,
    originalPrice: 45.99,
    rating: 4.9,
    reviews: 3245,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop",
    badge: "Trending",
    badgeColor: "burgundy",
    icon: FaFire,
    description: "Long-lasting matte finish with moisturizing formula",
    inStock: true,
  },
  {
    id: 3,
    name: "Hydrating Face Mist",
    category: "Skincare",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
    badge: "New",
    badgeColor: "green",
    icon: FaLeaf,
    description: "Refreshing mist with rose water and aloe vera",
    inStock: true,
  },
  {
    id: 4,
    name: "Volumizing Mascara",
    category: "Makeup",
    price: 19.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviews: 2156,
    image:
      "https://images.unsplash.com/photo-1631730360945-d732c0e5c760?w=500&h=500&fit=crop",
    badge: "Sale",
    badgeColor: "red",
    icon: FaSpa,
    description: "Lash-defining mascara for dramatic volume",
    inStock: true,
  },
  {
    id: 5,
    name: "Rose Gold Highlighter",
    category: "Makeup",
    price: 34.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviews: 1876,
    image:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb0b?w=500&h=500&fit=crop",
    badge: "Bestseller",
    badgeColor: "yellow",
    icon: FaSun,
    description: "Buildable shimmer for a natural glow",
    inStock: true,
  },
  {
    id: 6,
    name: "Nourishing Hair Oil",
    category: "Hair Care",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 945,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=500&fit=crop",
    badge: "Eco-Friendly",
    badgeColor: "green",
    icon: FaLeaf,
    description: "Argan oil blend for damaged hair",
    inStock: true,
  },
  {
    id: 7,
    name: "Charcoal Face Mask",
    category: "Skincare",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.5,
    reviews: 672,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    badge: "Popular",
    badgeColor: "oxblood",
    icon: FaMoon,
    description: "Deep cleansing mask for clear pores",
    inStock: true,
  },
  {
    id: 8,
    name: "Silk Hair Scrunchie Set",
    category: "Accessories",
    price: 15.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=500&h=500&fit=crop",
    badge: "Limited",
    badgeColor: "orange",
    icon: FaSnowflake,
    description: "Premium silk scrunchies in 3 colors",
    inStock: true,
  },
];

// Categories Array
const categories = [
  { id: "all", name: "All Products", icon: FaSpa },
  { id: "skincare", name: "Skincare", icon: FaLeaf },
  { id: "makeup", name: "Makeup", icon: FaGem },
  { id: "haircare", name: "Hair Care", icon: FaSnowflake },
  { id: "accessories", name: "Accessories", icon: FaSun },
];

// Testimonials Array
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Beauty Enthusiast",
    content:
      "Absolutely love the quality of these products! My skin has never looked better.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Makeup Artist",
    content:
      "The lipstick collection is incredible. Long-lasting and pigmented!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Skincare Junkie",
    content: "The face mist is a game-changer. So refreshing and hydrating.",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
];

// Main Beauty Component
const Beauty: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(beautyProducts);

  useEffect(() => {
    let filtered = beautyProducts;
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === activeCategory,
      );
    }
    setFilteredProducts(filtered);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241719]">
      <Header />
      <ShuffleHero />

      {/* Main Content */}
      <div className="relative">
        {/* Categories Section */}
        <section className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 z-10">
          <div className="text-center mb-12">
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
              }}
              className="inline-block px-4 py-1 rounded-full text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm"
            >
              Shop by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#241719]">
              Explore Our Collections
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveCategory(category.id)}
                  style={
                    isActive
                      ? {
                        background:
                          "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                      }
                      : undefined
                  }
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${isActive
                      ? "text-white shadow-md shadow-[#4A101C]/20 font-semibold"
                      : "bg-white text-[#241719] hover:bg-[#F1E8E2] border border-[#E7DCD7]"
                    }`}
                >
                  <category.icon size={15} /> {category.name}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Products Section */}
        <section className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#75676A] text-lg font-serif">
                No products found in this category.
              </p>
            </div>
          )}
        </section>

        {/* Featured Banner */}
        <section className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                "linear-gradient(135deg, #4A101C 0%, #812D3A 50%, #4A101C 100%)",
            }}
            className="rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-[#812D3A]/40 text-[#FAF7F2] relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <span className="inline-block bg-white/15 border border-white/20 px-4 py-1 rounded-full text-[#E8D9C9] text-xs font-semibold uppercase tracking-wider mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] mb-2">
              Get 20% Off on First Order
            </h2>
            <p className="text-[#E8D9C9] mb-6 font-medium">
              Use code: <span className="text-white font-bold tracking-wider">BEAUTY20</span> at checkout
            </p>
          </motion.div>
        </section>

        <Horizontalscroll />

        <div className="py-8">
          <h1 className="text-3xl font-serif font-bold text-[#4A101C] text-center tracking-wide">
            Our Esteemed Partners
          </h1>
        </div>

        <AnimatedTestimonials testimonials={testimonial} />

        {/* Testimonials Section */}
        <section className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 z-10">
          <div className="text-center mb-12">
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
              }}
              className="inline-block px-4 py-1 rounded-full text-white text-xs font-semibold uppercase tracking-widest mb-4"
            >
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241719]">
              What Our Patrons Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 border border-[#E7DCD7] shadow-sm hover:border-[#812D3A]/40 transition-all duration-300"
              >
                <FaQuoteLeft className="text-[#E8D9C9] text-3xl mb-4" />
                <p className="text-[#75676A] leading-relaxed mb-6">
                  {test.content}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#E7DCD7]"
                  />
                  <div>
                    <h4 className="text-[#241719] font-serif font-semibold">
                      {test.name}
                    </h4>
                    <p className="text-[#75676A] text-xs">{test.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${i < test.rating ? "text-amber-500" : "text-[#E7DCD7]"
                        }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#FAF7F2] to-[#F1E8E2] rounded-3xl p-8 sm:p-12 text-center border border-[#E7DCD7] shadow-sm max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241719] mb-4">
              Subscribe to the Noble House Journal
            </h2>
            <p className="text-[#75676A] mb-8 max-w-lg mx-auto">
              Receive curated seasonal lookbooks, exclusive VIP preview access, and editorial stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white text-[#241719] placeholder-[#75676A] border border-[#E7DCD7] focus:outline-none focus:ring-2 focus:ring-[#A66A75] text-sm"
              />
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                }}
                className="text-white px-7 py-3 rounded-full font-semibold hover:brightness-110 shadow-sm transition-all duration-300 transform hover:scale-[1.02] text-sm"
              >
                <ConfettiButton
                  icon={<Sparkles className="h-4 w-4" />}
                  confettiOptions={{
                    particleCount: 80,
                    spread: 60,
                  }}
                >
                  Subscribe
                </ConfettiButton>
              </button>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Beauty;
