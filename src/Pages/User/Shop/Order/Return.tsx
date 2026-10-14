import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  FiPackage,
  FiRefreshCw,
  FiSliders,
  FiAlertCircle,
  FiSearch,
  FiThumbsDown,
  FiEdit3,
  FiArrowLeft,
  FiInfo,
} from "react-icons/fi";

const returnReasons = [
  {
    id: "damaged",
    icon: <FiPackage size={16} />,
    label: "Damaged / Defective",
    desc: "Item arrived broken or not working",
  },
  {
    id: "wrong",
    icon: <FiRefreshCw size={16} />,
    label: "Wrong Item Delivered",
    desc: "Received a different product than ordered",
  },
  {
    id: "size",
    icon: <FiSliders size={16} />,
    label: "Size / Fit Issue",
    desc: "Item doesn't fit as expected",
  },
  {
    id: "quality",
    icon: <FiAlertCircle size={16} />,
    label: "Quality Not as Expected",
    desc: "Product quality is below expectations",
  },
  {
    id: "missing",
    icon: <FiSearch size={16} />,
    label: "Missing Parts",
    desc: "Some parts or accessories are missing",
  },
  {
    id: "changed_mind",
    icon: <FiThumbsDown size={16} />,
    label: "Changed My Mind",
    desc: "No longer need this item",
  },
  {
    id: "other",
    icon: <FiEdit3 size={16} />,
    label: "Other",
    desc: "Something else — tell us what happened",
  },
];

const exchangeReasons = [
  {
    id: "size_change",
    icon: <FiSliders size={16} />,
    label: "Wrong Size Ordered",
    desc: "Want a different size",
  },
  {
    id: "color",
    icon: <FiPackage size={16} />,
    label: "Want Different Color",
    desc: "Prefer a different colour variant",
  },
  {
    id: "damaged_ex",
    icon: <FiAlertCircle size={16} />,
    label: "Item is Damaged",
    desc: "Received a damaged product",
  },
  {
    id: "wrong_ex",
    icon: <FiRefreshCw size={16} />,
    label: "Wrong Item Received",
    desc: "Got a different product than ordered",
  },
  {
    id: "other_ex",
    icon: <FiEdit3 size={16} />,
    label: "Other",
    desc: "Something else — tell us what happened",
  },
];

const ReturnPage = () => {
  const navigate = useNavigate();
  const { id, itemId ,sellerId} = useParams();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [requestType, setRequestType] = useState<"return" | "exchange">(
    "return"
  );
 const activeReasons =
    requestType === "return" ? returnReasons : exchangeReasons;
  const isOtherSelected =
    selectedReason === "other" || selectedReason === "other_ex";
  const canSubmit =
    selectedReason !== null &&
    (!isOtherSelected || otherText.trim().length > 0);

  // Reset reason when tab changes
  const handleTabChange = (type: "return" | "exchange") => {
    setRequestType(type);
    setSelectedReason(null);
    setOtherText("");
  };
  // order data fetch
  const orderData = useSelector((state: any) => state.order?.orders);
  // fetch Data by id
  const orderProduct = orderData.find((o: any) => String(o.id) === String(id));
  // selected item data
  const selectedItem = orderProduct?.items.find(
    (i: any) => String(i.id) === String(itemId)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .f1 { animation: fadeUp 0.45s ease 0.05s both; }
        .f2 { animation: fadeUp 0.45s ease 0.12s both; }
        .f3 { animation: fadeUp 0.45s ease 0.2s both; }
        .f4 { animation: fadeUp 0.45s ease 0.28s both; }

        .reason-row {
          display:flex; align-items:center; gap:12px;
          padding:11px 14px; border-radius:14px;
          border:1.5px solid #f3f4f6; background:#fff;
          cursor:pointer; transition:all 0.2s;
          position:relative; overflow:hidden;
        }
        .reason-row::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(219,39,119,.04),rgba(147,51,234,.04));
          opacity:0; transition:opacity 0.2s;
        }
        .reason-row:hover { border-color:#812D3A; background:#FAF7F2; transform:translateY(-1px); }
        .reason-row.active {
          border-color:#4A101C;
          background:#FAF7F2;
          box-shadow:0 0 0 3px rgba(74,16,28,.08);
          transform:translateY(-1px);
        }

        .other-expand {
          max-height:0; opacity:0; overflow:hidden;
          transition:max-height 0.35s ease, opacity 0.3s ease;
        }
        .other-expand.open { max-height:160px; opacity:1; }

        .rp-textarea {
          width:100%; min-height:90px; padding:10px 14px;
          font-size:12.5px; color:#241719;
          background:#fff; border:1.5px solid #E7DCD7; border-radius:12px;
          resize:none; outline:none; box-sizing:border-box; line-height:1.6;
          transition:border-color .2s, box-shadow .2s;
        }
        .rp-textarea:focus { border-color:#4A101C; box-shadow:0 0 0 3px rgba(74,16,28,.08); }
        .rp-textarea::placeholder { color:#75676A; opacity: 0.6; }

        .submit-btn {
          position:relative; overflow:hidden;
          background:linear-gradient(135deg,#4A101C,#812D3A);
          border:none; cursor:pointer;
          transition:transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow:0 4px 18px rgba(74,16,28,.25);
        }
        .submit-btn:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(74,16,28,.32); opacity: 0.95; }
        .submit-btn:disabled { opacity:0.45; cursor:not-allowed; box-shadow: none; }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#FAF7F2" }}
      >
        {/* Blobs */}
        <div
          className="absolute w-64 h-64 rounded-full pointer-events-none -top-20 -left-20"
          style={{ background: "rgba(74,16,28,0.03)" }}
        />
        <div
          className="absolute w-44 h-44 rounded-full pointer-events-none bottom-10 -right-16"
          style={{ background: "rgba(129,45,58,0.03)" }}
        />

        <div className="max-w-xl mx-auto px-4 py-8 relative z-10">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="f1 flex items-center gap-2 text-xs font-semibold text-[#4A101C] hover:text-[#351019] transition-colors mb-5 md:hidden"
          >
            <FiArrowLeft size={13} /> Back to Order
          </button>

          {/* Page heading */}
          <div className="f1 flex items-center gap-3 mb-5">
            <div
              className="w-[3.5px] h-10 rounded-full shrink-0"
              style={{ background: "linear-gradient(180deg,#4A101C,#812D3A)" }}
            />
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#75676A] mb-0.5">
                ✦ Order #{id}
              </p>
              <h1
                className="text-2xl font-serif font-bold text-[#241719]"
              >
                Return / Exchange
              </h1>
            </div>
          </div>

          {/* Info note */}
          <div
            className="f2 flex items-start gap-2.5 px-4 py-3 rounded-2xl mb-4 text-xs leading-relaxed"
            style={{
              background: "#ffffff",
              border: "1px solid #E7DCD7",
              color: "#75676A",
            }}
          >
            <FiInfo size={14} className="text-[#4A101C] shrink-0 mt-0.5" />
            <span>
              Returns &amp; exchanges accepted within{" "}
              <strong className="text-[#241719]">7 days of delivery.</strong> Pickup scheduled in 2–3 days,
              complimentary authentic inspection.
            </span>
          </div>

          {/* Order items — compact */}
          {selectedItem && (
            <div className="f2 bg-white rounded-2xl border border-[#E7DCD7] overflow-hidden mb-4">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7DCD7] bg-[#FAF7F2]">
                <div className="flex items-center gap-2">
                  <div
                    className="w-[3px] h-4 rounded-full"
                    style={{
                      background: "linear-gradient(180deg,#4A101C,#812D3A)",
                    }}
                  />
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#75676A]">
                    Items in this Order
                  </p>
                </div>
                <span className="text-[10px] text-[#75676A]">
                  {selectedItem.length} item
                  {selectedItem.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="divide-y divide-[#E7DCD7] px-4">
                {selectedItem ? (
                  <div className="flex items-center gap-3 py-3">
                    {/* Image */}
                    {selectedItem?.image ? (
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name || "product"}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E7DCD7]"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#FAF7F2] text-xs text-[#75676A] border border-[#E7DCD7]">
                        No Image
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#241719] truncate">
                        {selectedItem?.name || "Unnamed Product"}
                      </p>

                      {selectedItem?.category && (
                        <span className="inline-block text-[10px] px-2 py-[2px] mt-1 rounded-full bg-[#FAF7F2] border border-[#E7DCD7] text-[#4A101C] font-medium">
                          {selectedItem.category}
                        </span>
                      )}

                      <div className="flex gap-2 mt-1 text-[11px] text-[#75676A] flex-wrap">
                        <span>Qty: {selectedItem?.quantity ?? 1}</span>

                        {selectedItem?.size && (
                          <span>Size: {selectedItem.size}</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-base font-serif font-bold text-[#4A101C]">
                        ₹
                        {Number(selectedItem?.price ?? 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-[#75676A] py-4 text-sm">
                    No item found
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Request type toggle ── */}
          <div className="f3 flex gap-2 mb-4 p-1.5 bg-white rounded-2xl border border-[#E7DCD7]">
            {(["return", "exchange"] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleTabChange(type)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    requestType === type
                      ? "linear-gradient(135deg,#4A101C,#812D3A)"
                      : "transparent",
                  color: requestType === type ? "#fff" : "#75676A",
                  boxShadow:
                    requestType === type
                      ? "0 4px 14px rgba(74,16,28,0.25)"
                      : "none",
                }}
              >
                {type === "return" ? "↩ Return" : "↔ Exchange"}
              </button>
            ))}
          </div>

          {/* ── Reasons ── */}
          <div className="f4 bg-white rounded-2xl border border-[#E7DCD7] overflow-hidden mb-4 shadow-xs">
            <div
              className="flex items-center gap-2 px-4 py-3.5 border-b border-[#E7DCD7] bg-[#FAF7F2]"
            >
              <FiRefreshCw size={12} className="text-[#4A101C]" />
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4A101C]">
                Reason for {requestType === "return" ? "Return" : "Exchange"}
              </p>
            </div>

            <div className="p-3.5 space-y-2">
              {activeReasons.map((reason) => (
                <div key={reason.id}>
                  <div
                    className={`reason-row ${
                      selectedReason === reason.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedReason(reason.id)}
                  >
                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background:
                          selectedReason === reason.id
                            ? "#FAF7F2"
                            : "#fff",
                        border:
                          selectedReason === reason.id
                            ? "1px solid #4A101C"
                            : "1px solid #E7DCD7",
                        color:
                          selectedReason === reason.id ? "#4A101C" : "#75676A",
                      }}
                    >
                      {reason.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12.5px] font-semibold leading-none mb-0.5"
                        style={{
                          color:
                            selectedReason === reason.id
                              ? "#4A101C"
                              : "#241719",
                        }}
                      >
                        {reason.label}
                      </p>
                      <p className="text-[10px] text-[#75676A]">{reason.desc}</p>
                    </div>

                    {/* Custom checkmark */}
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background:
                          selectedReason === reason.id
                            ? "linear-gradient(135deg,#4A101C,#812D3A)"
                            : "#fff",
                        border:
                          selectedReason === reason.id
                            ? "none"
                            : "1.5px solid #E7DCD7",
                      }}
                    >
                      {selectedReason === reason.id && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <polyline
                            points="2,6 5,9 10,3"
                            stroke="#fff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Other textarea */}
                  {(reason.id === "other" || reason.id === "other_ex") && (
                    <div
                      className={`other-expand ${
                        selectedReason === reason.id ? "open" : ""
                      }`}
                    >
                      <div className="pt-2 pb-1">
                        <textarea
                          className="rp-textarea"
                          placeholder="Please describe your reason in detail..."
                          value={otherText}
                          maxLength={300}
                          onChange={(e) => setOtherText(e.target.value)}
                        />
                        <p className="text-[10px] text-[#75676A] text-right mt-1">
                          {otherText.length} / 300
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer buttons ── */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3.5 rounded-2xl border border-[#E7DCD7] text-xs font-bold uppercase tracking-wide text-[#75676A] hover:border-[#4A101C] hover:text-[#4A101C] hover:bg-[#FAF7F2] transition-all duration-200 bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (requestType === "return") {
                  navigate(`/return/refund/${id}/${itemId}`, {
                    state: {
                      orderId: id,
                      itemId: itemId,
                      sellerId:sellerId,
                      reason: selectedReason,
                      description: otherText,
                      type: requestType,
                    },
                  });
                  window.scrollTo(0, 0);
                }
                if (requestType === "exchange") {
                  navigate(`/exchange/${id}`);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={!canSubmit}
              className="submit-btn flex-[2] py-3.5 rounded-2xl text-white text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiRefreshCw size={12} />
              {requestType === "return" ? "Submit Return" : "Submit Exchange"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPage;
