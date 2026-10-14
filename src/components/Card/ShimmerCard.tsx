import React from "react";

// Skeleton loader that exactly mirrors ProductCard layout:
// aspect-square image | badge top-left | badge top-right | wishlist bottom-right
// name | stars | price+original | CTA button
const ShimmerCard: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }

        .sk {
          position: relative;
          overflow: hidden;
          background: #e5e7eb;
        }
        .sk::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent            0%,
            rgba(255,255,255,0.55) 50%,
            transparent           100%
          );
          animation: shimmerSlide 1.5s ease-in-out infinite;
        }
        
        /* Slightly darker variant for specific elements */
        .sk-darker {
          background: #d1d5db;
        }
        
        .sk-darker::after {
          background: linear-gradient(
            90deg,
            transparent            0%,
            rgba(255,255,255,0.45) 50%,
            transparent           100%
          );
        }
      `}</style>

      {/* card-root — bg-white overflow-hidden */}
      <div className="relative bg-white overflow-hidden rounded-2xl shadow-sm">

        {/* Image — aspect-square, matches card-img-wrap */}
        <div className="relative aspect-square sk">

          {/* Discount badge — top-2.5 left-2.5 (pill shape) */}
          <div
            className="sk-darker absolute z-10"
            style={{ top: 10, left: 10, width: 48, height: 20, borderRadius: 20 }}
          />

          {/* Product badge — top-2.5 right-2.5 (pill shape) */}
          <div
            className="sk-darker absolute z-10"
            style={{ top: 10, right: 10, width: 58, height: 20, borderRadius: 20 }}
          />

          {/* Wishlist btn — bottom-2.5 right-2.5 (circle) */}
          <div
            className="sk-darker absolute z-10"
            style={{ bottom: 10, right: 10, width: 32, height: 32, borderRadius: "50%" }}
          />
        </div>

        {/* p-3 body */}
        <div className="p-3">

          {/* Product name — text-sm line-clamp-1 mb-1.5 */}
          <div className="sk mb-1.5" style={{ height: 14, width: "78%", borderRadius: 6 }} />

          {/* Rating row — FaStar × 5 + number + count — mb-2 */}
          <div className="flex items-center gap-1 mb-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="sk"
                style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0 }}
              />
            ))}
            <div className="sk" style={{ width: 24, height: 10, borderRadius: 4, marginLeft: 2 }} />
            <div className="sk" style={{ width: 30, height: 10, borderRadius: 4 }} />
          </div>

          {/* Price row — current price + original price — mb-3 */}
          <div className="flex items-baseline gap-1.5 mb-3">
            <div className="sk" style={{ height: 16, width: "40%", borderRadius: 5 }} />
            <div className="sk" style={{ height: 10, width: "23%", borderRadius: 4 }} />
          </div>

          {/* CTA button — w-full py-2 rounded-xl */}
          <div className="sk w-full" style={{ height: 34, borderRadius: 12 }} />
        </div>
      </div>
    </>
  );
};

export default ShimmerCard;