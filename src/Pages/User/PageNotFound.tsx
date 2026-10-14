import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 font-sans text-[#241719]">
      <div className="text-center max-w-md bg-white p-8 md:p-10 rounded-3xl border border-[#E7DCD7] shadow-sm">
        {/* Animated 404 */}
        <div className="relative mb-6">
          <div className="text-9xl font-black font-serif text-[#4A101C]/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaSearch className="text-5xl text-[#812D3A]/40" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#241719] mb-3">
          Page Not Found
        </h1>
        <p className="text-[#75676A] text-sm mb-8 leading-relaxed">
          The atelier piece or page you are seeking might have been moved, renamed, or is currently unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 border border-[#E7DCD7] text-[#241719] text-sm font-medium rounded-xl hover:bg-[#F1E8E2] transition cursor-pointer"
          >
            <FaArrowLeft size={13} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
            }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl hover:brightness-110 shadow-sm transition cursor-pointer"
          >
            <FaHome size={14} />
            Back to Home
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-8 pt-6 border-t border-[#E7DCD7]">
          <p className="text-xs text-[#75676A] mb-3 font-medium">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 justify-center text-xs">
            <button
              onClick={() => navigate("/")}
              className="text-[#75676A] hover:text-[#4A101C] px-2 py-1 font-medium transition-colors"
            >
              Home
            </button>
            <span className="text-[#E7DCD7]">•</span>
            <button
              onClick={() => navigate("/products")}
              className="text-[#75676A] hover:text-[#4A101C] px-2 py-1 font-medium transition-colors"
            >
              Collections
            </button>
            <span className="text-[#E7DCD7]">•</span>
            <button
              onClick={() => navigate("/contact")}
              className="text-[#75676A] hover:text-[#4A101C] px-2 py-1 font-medium transition-colors"
            >
              Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;