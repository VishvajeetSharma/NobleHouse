import {
  IoLocationOutline,
  IoChevronDown,
  IoCubeOutline,
} from "react-icons/io5";

const TopHeader = () => {
  const offers = [
    "Complimentary Insured Shipping on Orders Above ₹2,999",
    "Welcome Privé Privilege: 20% Off First Acquisition | Code: LUXE20",
    "Hassle-Free 15-Day Boutique Returns & Exchanges",
    "Bespoke Packaging with Complimentary Gift Signature",
    "Join the NOBLE HOUSE Atelier Circle for VIP Previews",
  ];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-wrapper {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
        
        @keyframes pulse-light {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .pulse-icon {
          animation: pulse-light 2.5s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(90deg, #351019 0%, #4A101C 25%, #812D3A 50%, #4A101C 75%, #351019 100%)",
        }}
        className="relative overflow-hidden py-1.5 border-b border-[#812D3A]/40 text-[#FAF7F2]"
      >
        {/* Location Badge - Floating Left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs cursor-pointer hover:bg-white/15 transition">
            <IoLocationOutline size={13} className="text-[#E8D9C9]" />
            <span className="text-[#FAF7F2] text-[0.7rem] font-semibold tracking-tight">
              Mumbai Atelier, MH
            </span>
            <IoChevronDown size={10} className="text-[#E8D9C9]/80" />
          </div>
        </div>

        {/* Marquee Scrolling Text */}
        <div className="marquee-wrapper w-full">
          <div className="marquee-content">
            {[...offers, ...offers].map((offer, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2.5 mx-8 text-[#FAF7F2] text-[0.75rem] lg:text-[0.82rem] font-medium tracking-wide"
              >
                <IoCubeOutline size={13} className="text-[#E8D9C9] pulse-icon" />
                <span className="text-[#FAF7F2] font-normal">
                  {offer}
                </span>
                <span className="text-[#E8D9C9]/40 text-xs">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for smooth edge fade */}
        <div
          style={{ background: "linear-gradient(90deg, #351019 0%, transparent 100%)" }}
          className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
        />
        <div
          style={{ background: "linear-gradient(270deg, #351019 0%, transparent 100%)" }}
          className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        />
      </div>
    </>
  );
};

export default TopHeader;