import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Heading";
import {
  FaShoppingBag,
  FaUndo,
  FaCreditCard,
  FaUserCircle,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";

// ── Data ──
const orderQueries = [
  {
    icon: FaShoppingBag,
    label: "Track My Order",
    desc: "Check real-time status of your order",
    path: "/orders",
  },
  {
    icon: FaShoppingBag,
    label: "Cancel an Order",
    desc: "Cancel within 1 hour of placing",
    path: "/orders",
  },
  {
    icon: FaShoppingBag,
    label: "Order Not Received",
    desc: "Report a missing or delayed delivery",
    path: "/orders",
  },
  {
    icon: FaCreditCard,
    label: "Payment Issue",
    desc: "Failed payment or refund not received",
    path: "/orders",
  },
];

const nonOrderQueries = [
  {
    icon: FaUndo,
    label: "Returns & Exchange",
    desc: "Initiate a return or size exchange",
    path: "/orders",
  },
  {
    icon: FaUserCircle,
    label: "My Account",
    desc: "Update profile, password or address",
    path: "/userprofile",
  },
  {
    icon: FaCreditCard,
    label: "Refund Status",
    desc: "Check status of your pending refund",
    path: "/orders",
  },
];

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f1 { animation: fadeUp 0.5s ease 0.05s both; }
        .f2 { animation: fadeUp 0.5s ease 0.15s both; }
        .f3 { animation: fadeUp 0.5s ease 0.25s both; }
        .f4 { animation: fadeUp 0.5s ease 0.35s both; }

        .query-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border-radius: 14px;
          border: 1px solid #E7DCD7; background: #ffffff;
          cursor: pointer; transition: all 0.2s ease;
        }
        .query-row:hover {
          border-color: #812D3A;
          background: #FAF7F2;
          transform: translateX(3px);
          box-shadow: 0 4px 16px rgba(74, 16, 28, 0.05);
        }
        .query-row:hover .row-arrow { color: #4A101C; }

        .channel-btn {
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px; border-radius: 14px;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.04em; color: #ffffff;
          border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .channel-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(74, 16, 28, 0.2);
        }
        .channel-btn::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255, 255, 255, 0.1); opacity: 0; transition: opacity 0.2s;
        }
        .channel-btn:hover::after { opacity: 1; }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: "#FAF7F2",
          fontFamily: "'Inter', sans-serif",
          color: "#241719",
        }}
      >
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* ── Page header ── */}
          <div className="f1 text-center mb-10">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#812D3A] mb-2 font-serif">
              ✦ Concierge &amp; Support ✦
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#241719] mb-3">
              How May We{" "}
              <span className="italic text-[#4A101C]">
                Assist You?
              </span>
            </h1>
            <p className="text-sm text-[#75676A] max-w-md mx-auto">
              Select a concierge service topic below or contact our dedicated care team directly.
            </p>
          </div>

          {/* ── Order-related queries ── */}
          <div className="f2 mb-8">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                  }}
                />
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#75676A] font-serif">
                  Order Inquiries
                </p>
              </div>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#4A101C] hover:text-[#812D3A] transition-colors"
              >
                My Orders <FaArrowRight size={9} />
              </button>
            </div>

            <div className="space-y-2.5">
              {orderQueries.map((q) => (
                <div
                  key={q.label}
                  className="query-row"
                  onClick={() => navigate(q.path)}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#F1E8E2] text-[#4A101C]">
                      <q.icon size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#241719] font-serif">
                        {q.label}
                      </p>
                      <p className="text-xs text-[#75676A] mt-0.5">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight
                    size={11}
                    className="row-arrow text-[#E7DCD7] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Non order-related queries ── */}
          <div className="f3 mb-8">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                  }}
                />
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#75676A] font-serif">
                  Account &amp; General Support
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {nonOrderQueries.map((q) => (
                <div
                  key={q.label}
                  className="query-row"
                  onClick={() => navigate(q.path)}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#F1E8E2] text-[#4A101C]">
                      <q.icon size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#241719] font-serif">
                        {q.label}
                      </p>
                      <p className="text-xs text-[#75676A] mt-0.5">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight
                    size={11}
                    className="row-arrow text-[#E7DCD7] transition-colors"
                  />
                </div>
              ))}

              {/* FAQ row */}
              <div className="query-row" onClick={() => navigate("/faq")}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#F1E8E2] text-[#4A101C]">
                    <FaHeadset size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#241719] font-serif">
                      Browse FAQs
                    </p>
                    <p className="text-xs text-[#75676A] mt-0.5">
                      Instant answers to our most frequently asked questions
                    </p>
                  </div>
                </div>
                <FaChevronRight
                  size={11}
                  className="row-arrow text-[#E7DCD7] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* ── Reach us directly ── */}
          <div className="f4">
            <div className="flex items-center gap-2 mb-3.5">
              <div
                className="w-1 h-5 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #4A101C 0%, #812D3A 100%)",
                }}
              />
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#75676A] font-serif">
                Direct Contact
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-4">
              <a href="mailto:support@noblehouse.com" className="w-full">
                <button
                  className="channel-btn"
                  style={{
                    background:
                      "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                  }}
                >
                  <FaEnvelope size={13} />
                  Email Concierge
                </button>
              </a>
              <a href="tel:+919999999999" className="w-full">
                <button
                  className="channel-btn"
                  style={{
                    background:
                      "linear-gradient(135deg, #812D3A 0%, #351019 100%)",
                  }}
                >
                  <FaPhone size={13} />
                  Call Concierge
                </button>
              </a>
            </div>

            {/* Hours strip */}
            <div className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white border border-[#E7DCD7] shadow-xs">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                }}
              >
                <FaClock size={13} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#241719] font-serif">
                  Concierge Operating Hours
                </p>
                <p className="text-xs text-[#75676A] mt-0.5">
                  Monday – Saturday &nbsp;·&nbsp; 9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;