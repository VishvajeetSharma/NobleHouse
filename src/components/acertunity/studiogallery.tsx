"use client";

import React, { useState } from "react";
import {
  Maximize2,
  Heart,
  Share2,
  ExternalLink,
  LayoutGrid,
  ImageIcon,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Abstract Flow",
    category: "Web Design",
    image:
      "https://images.unsplash.com/photo-1730727384555-35318cb80600?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBjbG90aGVzfGVufDB8fDB8fHww",
    size: "tall",
  },
  {
    id: 2,
    title: "Cyberpunk City",
    category: "3D Art",
    image: "https://images.pexels.com/photos/3784391/pexels-photo-3784391.jpeg",
    size: "small",
  },
  {
    id: 3,
    title: "Modern Minimal",
    category: "Branding",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    size: "wide",
  },
  {
    id: 4,
    title: "Oceanic Patterns",
    category: "UI/UX",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    size: "small",
  },
  {
    id: 5,
    title: "Global Network",
    category: "Analytics",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    size: "tall",
  },
  {
    id: 6,
    title: "Future Office",
    category: "Architecture",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    size: "small",
  },
  {
    id: 7,
    title: "Tech Stack",
    category: "Development",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    size: "wide",
  },
  {
    id: 8,
    title: "Creative Workspace",
    category: "Interior",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    size: "tall",
  },
  {
    id: 7,
    title: "Tech Stack",
    category: "Development",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    size: "wide",
  },
  {
    id: 6,
    title: "Future Office",
    category: "Architecture",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    size: "small",
  },
];

const categories = [
  "All",
  "Web Design",
  "3D Art",
  "Branding",
  "UI/UX",
  "Analytics",
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <section className="w-full py-24 bg-gradient-to-r from-black via-[#063B4A] to-black ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-amber-500 leading-tight">
              A Selection of Our{" "}
              <span className="text-primary italic">Finest</span> Digital
              Creations
            </h2>
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5 border border-border/50
                  ${item.size === "tall" ? "row-span-2" : ""}
                  ${item.size === "wide" ? "col-span-1 lg:col-span-2" : ""}
                `}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="h-10  w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md ml-auto">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Indicator Tag (Static) */}
                <div className="absolute top-6 right-6 opacity-100 group-hover:opacity-0 transition-opacity">
                  <div className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-white/50" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
