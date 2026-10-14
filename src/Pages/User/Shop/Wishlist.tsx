import { FaHeart, FaArrowRight, FaRegHeart } from "react-icons/fa";
import ProductCard from "../../../components/Card/CardComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(
    (state: any) => state.wishlist.wishlistItems
  );
  const isEmpty = wishlistItems.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes heartBeat {
          0%,100% { transform:scale(1); }
          50%      { transform:scale(1.2); }
        }
        .f1 { animation: fadeUp 0.5s ease 0.05s both; }
        .f2 { animation: fadeUp 0.5s ease 0.15s both; }
        .f3 { animation: fadeUp 0.5s ease 0.25s both; }
        .heart-pulse { animation: heartBeat 1.8s ease infinite; }

        .shop-btn {
          position:relative; overflow:hidden;
          background:linear-gradient(135deg,#4A101C,#812D3A);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .shop-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,#351019,#4A101C);
          opacity:0; transition:opacity 0.3s;
        }
        .shop-btn:hover::after { opacity:1; }
        .shop-btn:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(74,16,28,0.25); }
        .shop-btn > * { position:relative; z-index:1; }
      `}</style>

      <div className="min-h-screen bg-[#FAF7F2]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Page header ── */}
          <div className="f1 flex items-center justify-between mb-6">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#812D3A] mb-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                ✦ My Wishlist
              </p>
              <h1
                className="text-2xl md:text-3xl font-semibold text-[#241719]"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                Saved{" "}
                <em
                  className="not-italic"
                  style={{
                    background: "linear-gradient(135deg,#4A101C,#812D3A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Favourites
                </em>
              </h1>
            </div>

            {!isEmpty && (
              <button
                onClick={() => navigate("/dashboard")}
                className="shop-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold cursor-pointer"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                <span>Continue Shopping</span>
                <FaArrowRight size={10} />
              </button>
            )}
          </div>

          {/* ── Stats bar ── */}
          {!isEmpty && (
            <div
              className="f2 flex items-center gap-4 px-5 py-3.5 rounded-2xl mb-6 bg-white border border-[#E7DCD7] shadow-xs"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg,#4A101C,#812D3A)",
                }}
              >
                <FaHeart size={12} color="#fff" className="heart-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <p
                  className="text-sm font-semibold text-[#241719]"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"} saved
                </p>
                <div className="w-px h-4 bg-[#E7DCD7]" />
                <p
                  className="text-xs text-[#75676A]"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Items are saved until you remove them
                </p>
              </div>
            </div>
          )}

          {/* ── Products grid ── */}
          {!isEmpty ? (
            <div className="f3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {wishlistItems.map((product: any) => (
                <ProductCard
                  key={product.id}
                  item={product}
                  isWishlistPage={true}
                />
              ))}
            </div>
          ) : (
            /* ── Empty state ── */
            <div className="f2 flex flex-col items-center justify-center py-10 text-center">
              <video
                src="/wishlist.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="mx-auto"
              ></video>

              <p
                className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#812D3A] mb-2"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                Nothing saved yet
              </p>
              <h2
                className="text-2xl font-semibold text-[#241719] mb-2"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                Your wishlist is empty
              </h2>
              <p
                className="text-sm text-[#75676A] max-w-xs mb-4 leading-relaxed"
                style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}
              >
                Save items you love by tapping the heart icon on any product.
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="shop-btn flex items-center gap-2 px-7 py-2.5 rounded-full text-white text-xs font-semibold shadow-md cursor-pointer"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                <span>Start Shopping</span>
                <FaArrowRight size={11} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
