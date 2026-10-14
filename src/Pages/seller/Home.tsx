import NavMegaMenu from "../../components/Header/SellerHeader";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Truck,
  Megaphone,
  Eye,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "../../components/acertunity/animated-testimonials";
import { Footer } from "../../components/Footer/Footer";

const categories = [
  "Sell Sarees Online",
  "Sell Fine Jewellery Online",
  "Sell Haute Couture Online",
  "Sell Shirts Online",
  "Sell Luxury Timepieces Online",
  "Sell Premium Accessories Online",
  "Sell Designer Apparel Online",
  "Sell Footwear Online",
];

const features = [
  {
    icon: Truck,
    title: "Bespoke Logistics",
    desc: "Deliver across India with insured, fast, and white-glove logistics.",
  },
  {
    icon: Megaphone,
    title: "Atelier Showcase",
    desc: "Feature your collections in curated campaigns to reach VIP clientele.",
  },
  {
    icon: TrendingUp,
    title: "Expedited Fulfillment",
    desc: "Priority dispatch pathways with premium packaging standards.",
  },
  {
    icon: Eye,
    title: "Business Intelligence",
    desc: "Track client acquisition and sales trends with real-time analytics.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Zero Commission",
    desc: "Retain 100% of your earnings with completely transparent terms.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Partnership",
    desc: "Protected seller policies with zero arbitrary cancellation penalties.",
  },
  {
    icon: TrendingUp,
    title: "Scale Your Atelier",
    desc: "Elevate your designer label to thousands of discerning buyers.",
  },
  {
    icon: Truck,
    title: "Effortless Fulfillment",
    desc: "Seamless pickup, doorstep inspection, and reliable delivery.",
  },
];

const steps = [
  {
    title: "Register Atelier",
    desc: "Apply with your business credentials and atelier profile.",
  },
  {
    title: "Curate Catalog",
    desc: "Upload high-resolution photography and bespoke garment details.",
  },
  {
    title: "Receive Orders",
    desc: "Connect directly with luxury shoppers seeking exclusive pieces.",
  },
  {
    title: "Insured Transit",
    desc: "Benefit from our reliable, door-to-door insured logistics.",
  },
  {
    title: "Expedited Payouts",
    desc: "Direct-to-bank settlement within 48 hours of order delivery.",
  },
];

const rewards = [
  {
    icon: Megaphone,
    title: "₹600 Promotional Credit",
    desc: "Boost your debut collections to reach top-tier shoppers instantly.",
  },
  {
    icon: Sparkles,
    title: "Dedicated Account Concierge",
    desc: "Direct support from luxury fashion category managers.",
  },
];

const testimonial = [
  {
    quote:
      "Partnering with Noble House expanded our atelier's reach ten-fold while keeping our brand heritage elevated and protected.",
    name: "Sarah Chen",
    designation: "Founder at Chen Couture",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  },
  {
    quote:
      "The zero-commission model coupled with insured logistics makes selling luxury apparel seamless.",
    name: "Michael Rodriguez",
    designation: "Managing Director at Rodriguez Tailors",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
];

const Home = () => {
  return (
    <div className="bg-[#FAF7F2] text-[#241719] min-h-screen font-sans">
      <NavMegaMenu />

      <div className="max-w-7xl mx-auto text-center z-10 mt-16 px-4">
        <span
          style={{
            background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
          }}
          className="inline-block px-4 py-1 rounded-full text-white text-xs font-semibold uppercase tracking-widest mb-4 shadow-xs"
        >
          Partner Ateliers
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#241719]">
          Our Esteemed{" "}
          <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
            Atelier Partners
          </span>
        </h2>
      </div>

      <AnimatedTestimonials testimonials={testimonial} />

      <section className="relative px-6 py-20 overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-white to-[#F1E8E2]">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#E8D9C9]/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#812D3A]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── Why Sellers Love ── */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#812D3A] mb-3 font-serif">
                Why Partner With Us
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#241719] leading-tight">
                Why Designers Choose{" "}
                <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
                  Noble House
                </span>
              </h2>
              <p className="mt-5 text-[#75676A] max-w-md text-sm md:text-base leading-relaxed">
                Everything required to scale your luxury fashion brand — from zero commission to bespoke white-glove logistics and expedited 48-hour settlements.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-serif font-bold text-[#241719]">4,800+</p>
                  <p className="text-xs text-[#75676A] mt-0.5">Verified Ateliers</p>
                </div>
                <div className="w-px h-10 bg-[#E7DCD7]" />
                <div>
                  <p className="text-2xl font-serif font-bold text-[#241719]">0%</p>
                  <p className="text-xs text-[#75676A] mt-0.5">Listing Commission</p>
                </div>
                <div className="w-px h-10 bg-[#E7DCD7]" />
                <div>
                  <p className="text-2xl font-serif font-bold text-[#241719]">48h</p>
                  <p className="text-xs text-[#75676A] mt-0.5">Settlement Cycle</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border border-[#E7DCD7] shadow-xs hover:shadow-md hover:border-[#812D3A]/40 transition-all hover:-translate-y-1"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#F1E8E2] text-[#4A101C] mb-4 group-hover:bg-[#4A101C] group-hover:text-white transition-colors">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#241719]">{b.title}</h4>
                  <p className="text-xs text-[#75676A] mt-2 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-20 h-px bg-gradient-to-r from-transparent via-[#E7DCD7] to-transparent" />

          {/* ── Exclusive Seller Rewards ── */}
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:sticky md:top-28">
              <p className="text-xs font-bold uppercase tracking-widest text-[#812D3A] mb-3 font-serif">
                Exclusive Privileges
              </p>
              <h3 className="text-3xl font-serif font-bold text-[#241719] leading-tight">
                Atelier Welcome Privileges
              </h3>
              <p className="text-[#75676A] mt-3 text-sm leading-relaxed">
                Special growth incentives for your first 30 days as a verified Noble House partner.
              </p>
              <button
                style={{
                  background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                }}
                className="mt-6 px-6 py-3 text-white text-xs font-semibold rounded-xl hover:brightness-110 shadow-sm transition"
              >
                Claim Privileges →
              </button>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {rewards.map((r, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border border-[#E7DCD7] shadow-xs hover:shadow-md hover:border-[#812D3A]/40 hover:-translate-y-1 transition-all"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#F1E8E2] text-[#4A101C] mb-4 group-hover:bg-[#4A101C] group-hover:text-white transition-colors">
                    <r.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#241719]">{r.title}</h4>
                  <p className="text-xs text-[#75676A] mt-2 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden border-t border-[#E7DCD7]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-120 h-40 bg-[#E8D9C9]/20 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#241719] mb-16">
            The Onboarding{" "}
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
              Journey
            </span>
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A101C] via-[#812D3A] to-[#4A101C]" />

            <div className="grid md:grid-cols-5 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                    }}
                    className="z-10 w-12 h-12 flex items-center justify-center rounded-full text-white font-serif font-bold shadow-md border-2 border-white"
                  >
                    {i + 1}
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DCD7] shadow-xs hover:border-[#812D3A]/40 transition-all w-full">
                    <h4 className="font-serif font-bold text-[#241719] text-sm">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#75676A] mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grow Section ── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#FAF7F2] to-[#F1E8E2] border-t border-[#E7DCD7] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#241719] leading-tight">
              Scale Your Brand With{" "}
              <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#4A101C] to-[#812D3A]">
                Noble House
              </span>
            </h2>
            <p className="mt-6 text-[#75676A] max-w-md text-sm md:text-base leading-relaxed">
              Curated visibility and sophisticated business intelligence designed to expand your customer footprint among luxury shoppers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-3xl bg-white border border-[#E7DCD7] shadow-sm hover:shadow-md hover:border-[#812D3A]/40 transition-all hover:-translate-y-1"
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-white mb-4 shadow-xs"
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#241719]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#75676A] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="bg-white py-24 px-6 border-t border-[#E7DCD7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#241719]">
              High-Demand Atelier Categories
            </h2>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="cursor-pointer text-xs md:text-sm font-medium text-[#75676A] hover:text-[#4A101C] p-3 rounded-xl border border-[#E7DCD7] hover:border-[#4A101C] hover:bg-[#FAF7F2] transition"
                >
                  {cat}
                </div>
              ))}
            </div>

            <button className="mt-8 inline-flex items-center justify-center text-[#4A101C] font-semibold text-sm hover:underline font-serif">
              Explore All Categories <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-[#FAF7F2] border border-[#E7DCD7] rounded-3xl p-10 shadow-xs">
            <div>
              <h3 className="text-3xl font-serif font-bold text-[#241719]">
                Concierge Atelier Support
              </h3>
              <p className="mt-3 text-[#75676A] text-sm leading-relaxed">
                Our merchant support desk is available to assist your atelier throughout verification, inventory ingestion, and fulfillment.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div
                style={{
                  background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                }}
                className="w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-xs shrink-0"
              >
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-[#75676A]">Atelier Relations Desk</p>
                <p className="font-serif font-bold text-base text-[#4A101C]">
                  ateliers@noblehouse.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
