import { useNavigate } from "react-router-dom";


import Header from "../../../../components/Header/Heading";
import {
  FaShoppingBag,
  FaHome,
  FaUser,
  FaChevronRight,

  FaTruck,
} from "react-icons/fa";

interface OrderSuccessProps {
  deliveryDate?: string;
  orderId?: string;
  phone?: string;
  address?: string;
  userName?: string;
}

// ── Mini confetti canvas ──────────────────────────────




// ── Main Component ────────────────────────────────────
const OrderSuccess = ({
  deliveryDate = "Thu, Apr 30th '26",
  orderId      = "DD2026041200001",
  phone        = "98XXXXXX12",
  address      = "123, Green Park, New Delhi...",
  userName     = "Shruti",
}: OrderSuccessProps) => {
  const navigate = useNavigate();
// const returns = useSelector((state: any) => state.return?.returns);
// const cancels = useSelector((state: any) => state.cancel?.cancellations);
  return (
    <>
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          65%  { transform: scale(1.12); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,16,28,0.4); }
          50%     { box-shadow: 0 0 0 20px rgba(74,16,28,0);  }
        }

        .check-icon  { animation: popIn 0.6s cubic-bezier(.34,1.4,.64,1) 0.25s both; }
        .ring-pulse  { animation: ringPulse 2.2s ease 0.8s infinite; }

        .f1 { animation: fadeUp 0.5s ease 0.35s both; }
        .f2 { animation: fadeUp 0.5s ease 0.48s both; }
        .f3 { animation: fadeUp 0.5s ease 0.58s both; }
        .f4 { animation: fadeUp 0.5s ease 0.68s both; }
        .f5 { animation: fadeUp 0.5s ease 0.78s both; }
        .f6 { animation: fadeUp 0.5s ease 0.88s both; }
        .f7 { animation: fadeUp 0.5s ease 0.98s both; }

        .os-btn-primary {
          width: 100%; padding: 10px 14px;
          border-radius: 12px; border: none;
          background: linear-gradient(135deg, #4A101C, #812D3A);
          color: #ffffff; font-size: 13px; font-weight: 600;
          letter-spacing: .04em; cursor: pointer;
          transition: all .2s;
          box-shadow: 0 4px 14px rgba(74,16,28,.25);
        }
        .os-btn-primary:hover { opacity:.94; transform:translateY(-1px); box-shadow:0 6px 20px rgba(74,16,28,.32); }

        .os-btn-outline {
          width: 100%; padding: 10px 14px;
          border-radius: 12px;
          background: #ffffff; color: #4A101C;
          font-size: 13px; font-weight: 600;
          letter-spacing: .03em; cursor: pointer;
          border: 1.5px solid #E7DCD7;
          transition: all .2s;
        }
        .os-btn-outline:hover { border-color: #4A101C; background: #FAF7F2; }

        .os-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 15px; border-radius: 12px;
          border: 1px solid #E7DCD7; background: #ffffff;
          cursor: pointer; transition: all .18s;
        }
        .os-row:hover { border-color: #812D3A; background: #FAF7F2; }

        .os-icon-circle {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: #FAF7F2; border: 1px solid #E7DCD7;
        }
      `}</style>

      <div className="min-h-screen bg-[#FAF7F2]">
        <Header />

        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ══════════════ LEFT ══════════════ */}
          <div className="lg:col-span-2 space-y-5">

            {/* ── Main success card ── */}
            <div className="bg-white rounded-3xl border border-[#E7DCD7] shadow-xs overflow-hidden">

              {/* Top hero — confetti + icon */}
              <div className="relative flex flex-col items-center pt-4 pb-8 px-6">
                <video
                  src="/check.mp4"
                  autoPlay
                  muted
                  playsInline
                  className="mx-auto h-28"
                ></video>

                {/* Text */}
                <span
                  className="f1 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.18em] uppercase px-3.5 py-1 rounded-full mt-4 mb-3 border border-[#287653]/30 bg-[#287653]/10 text-[#287653]"
                >
                  Order Confirmed
                </span>

                <h1
                  className="f2 text-2xl md:text-3xl font-serif font-bold text-[#241719] text-center mb-1.5"
                >
                  Congratulations, {userName}!
                </h1>
                <p className="f3 text-sm text-[#75676A] text-center">
                  Your luxury order has been placed with NOBLE HOUSE.
                </p>
                <p className="f3 text-xs text-[#75676A] text-center mt-1">
                  Order <span className="text-[#4A101C] font-semibold">#{orderId}</span>
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-4 border-t border-[#E7DCD7]">

                {/* Delivery banner */}
                <div
                  className="f3 flex items-center justify-between px-5 py-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DCD7]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="os-icon-circle">
                      <FaTruck size={14} className="text-[#4A101C]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[.15em] uppercase text-[#75676A] mb-0.5">
                        Estimated Delivery
                      </p>
                      <p
                        className="text-base font-serif font-bold text-[#241719]"
                      >
                        {deliveryDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SMS note */}
                <p className="f5 text-center text-xs text-[#75676A]">
                  Confirmation & tracking link sent to{" "}
                  <span className="text-[#241719] font-medium">{phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT ══════════════ */}
          <div className="space-y-5">

            {/* My orders card */}
            <div className="f6 bg-white rounded-3xl border border-[#E7DCD7] p-6 shadow-xs text-center">
              <div
                className="w-14 h-14 rounded-full border border-[#E7DCD7] bg-[#FAF7F2] flex items-center justify-center mx-auto mb-4"
              >
                <FaShoppingBag size={20} className="text-[#4A101C]" />
              </div>
              <p className="text-[11px] font-bold tracking-[.18em] uppercase text-[#75676A] mb-1">
                Manage Orders
              </p>
              <p className="text-xs text-[#75676A] mb-5 leading-relaxed">
                Track, return or exchange your couture items anytime.
              </p>
              <button className="os-btn-primary" onClick={() => navigate("/orders")}>
                Go to My Orders
              </button>
              <button className="os-btn-outline mt-2.5" onClick={() => navigate("/dashboard")}>
                Continue Shopping
              </button>
            </div>

            {/* Delivery details */}
            <div className="f6 bg-white rounded-3xl border border-[#E7DCD7] p-6 shadow-xs">
              <p className="text-[11px] font-bold tracking-[.18em] uppercase text-[#75676A] mb-4 flex items-center gap-2">
                <span
                  className="w-1 h-4 rounded-full inline-block bg-gradient-to-b from-[#4A101C] to-[#812D3A]"
                />
                Delivery Destination
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: FaHome, label: "Address", value: address },
                  { icon: FaUser, label: "Contact", value: `${userName} · ${phone}` },
                ].map((row) => (
                  <div key={row.label} className="os-row">
                    <div className="flex items-center gap-3">
                      <div className="os-icon-circle" style={{ width: 34, height: 34 }}>
                        <row.icon size={12} className="text-[#4A101C]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#75676A] uppercase tracking-wider">{row.label}</p>
                        <p className="text-xs font-medium text-[#241719] truncate max-w-44">
                          {row.value}
                        </p>
                      </div>
                    </div>
                    <FaChevronRight size={10} className="text-[#75676A]/50 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
