import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../../redux/OrderSlice";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header/Heading";

import {
  FiArrowLeft,
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiCreditCard,
  FiShoppingBag,
  FiClock,
  FiThumbsDown,
  FiRefreshCw,
  FiEdit3,

  FiX,
} from "react-icons/fi";

// ── Cancel reasons ──
const REASONS = [
  {
    id: "changed_mind",
    icon: <FiThumbsDown size={17} />,
    label: "Changed My Mind",
    desc: "I no longer want this item",
  },
  {
    id: "wrong_item",
    icon: <FiShoppingBag size={17} />,
    label: "Ordered by Mistake",
    desc: "I accidentally ordered the wrong product",
  },
  {
    id: "found_cheaper",
    icon: <FiCreditCard size={17} />,
    label: "Found a Better Price",
    desc: "I found the same product at a lower price",
  },
  {
    id: "delivery_late",
    icon: <FiClock size={17} />,
    label: "Delivery Taking Too Long",
    desc: "Expected delivery date is too far",
  },
  {
    id: "wrong_address",
    icon: <FiRefreshCw size={17} />,
    label: "Shipping Address is Wrong",
    desc: "I want to change the delivery address",
  },
  {
    id: "payment_issue",
    icon: <FiAlertTriangle size={17} />,
    label: "Payment Issue",
    desc: "I want to pay using a different method",
  },
  {
    id: "other",
    icon: <FiEdit3 size={17} />,
    label: "Other Reason",
    desc: "Something else — please specify below",
  },
];

// ── Refund info based on payment method ──
const REFUND_INFO = {
  timeline: "5–7 business days",
  method: "Original payment source",
};

const CancelOrderPage = () => {
  const dispatch = useDispatch();
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [step, setStep] = useState<"reason" | "confirm" | "success">("reason");

  const canProceed =
    selected !== null && (selected !== "other" || otherText.trim().length > 0);

  const selectedLabel = REASONS.find((r) => r.id === selected)?.label ?? "";
  const orders = useSelector((state: any) => state.order.orders);
  const order = orders?.find((o: any) => o.id === String(id));
  const selectedItem = order?.items?.find(
    (i: any) => String(i.id) === String(itemId)
  );
  // cancel order
const handleCancel = () => {
  if (!order || !selectedItem) return;

  const payload = {
    orderId: order.id,
    itemId: selectedItem.id,
    status: "cancelled",
    reason: selected === "other" ? otherText : selectedLabel,
    cancelledAt: new Date().toISOString(),
  };

  console.log("Dispatch payload 👉", payload);

  dispatch(updateOrderStatus(payload));
  setStep("success");
};
  return (
    <>
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cop-wrap {
          min-height: 100vh;
          background: #FAF7F2;
          padding: 32px 16px 64px;
          position: relative;
          overflow: hidden;
        }
        .cop-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .cop-inner { max-width: 580px; margin: 0 auto; position: relative; z-index: 1; }

        .cop-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; color: #4A101C;
          background: none; border: none; cursor: pointer; padding: 0;
          margin-bottom: 22px; transition: gap .2s;
        }
        .cop-back:hover { gap: 11px; }

        .cop-hdr { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .cop-accent { width: 3.5px; height: 44px; background: linear-gradient(180deg,#B54745,#812D3A); border-radius: 3px; flex-shrink: 0; }
        .cop-title { font-family:'Playfair Display',serif; font-size: 26px; font-weight: 700; color: #241719; line-height: 1.1; }
        .cop-title span { font-weight: 400; }
        .cop-sub { font-size: 11px; color: #75676A; margin-top: 3px; }

        /* order strip */
        .cop-order {
          display: flex; align-items: center; gap: 13px;
          background: #ffffff;
          border-radius: 16px; border: 1px solid #E7DCD7;
          padding: 14px 18px; margin-bottom: 14px;
          box-shadow: 0 2px 14px rgba(74,16,28,.04);
        }
        .cop-order-img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; border: 1px solid #E7DCD7; flex-shrink: 0; }
        .cop-order-name { font-size: 13px; font-weight: 600; color: #241719; margin-bottom: 2px; }
        .cop-order-meta { font-size: 11px; color: #75676A; }
        .cop-order-meta b { color: #B54745; }
        .cop-order-tag { margin-left: auto; font-size: 9px; font-weight: 700; letter-spacing: .08em; color: #4A101C; background: #FAF7F2; border: 1px solid #E7DCD7; padding: 3px 9px; border-radius: 20px; flex-shrink: 0; }

        /* warning note */
        .cop-warn {
          display: flex; align-items: flex-start; gap: 9px;
          padding: 12px 16px; background: #FAF7F2; border: 1px solid #E7DCD7;
          border-radius: 12px; font-size: 11px; color: #B54745;
          line-height: 1.7; margin-bottom: 14px;
        }

        /* refund note */
        .cop-refund {
          display: flex; align-items: flex-start; gap: 9px;
          padding: 12px 16px; background: #FAF7F2; border: 1px solid #E7DCD7;
          border-radius: 12px; font-size: 11px; color: #287653;
          line-height: 1.7; margin-bottom: 14px;
        }

        /* card */
        .cop-card {
          background: #ffffff;
          border-radius: 18px; border: 1px solid #E7DCD7;
          box-shadow: 0 4px 20px rgba(74,16,28,.04);
          overflow: hidden; margin-bottom: 14px;
        }
        .cop-card-hdr {
          padding: 14px 18px; background: #FAF7F2; border-bottom: 1px solid #E7DCD7;
          font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
          color: #B54745; display: flex; align-items: center; gap: 7px;
        }
        .cop-card-body { padding: 16px 18px; }

        /* reason option */
        .cop-reason {
          display: flex; align-items: center; gap: 13px;
          padding: 14px 16px; border-radius: 12px;
          border: 1.5px solid #E7DCD7; background: #fff;
          cursor: pointer; transition: all .2s;
          position: relative; margin-bottom: 9px;
        }
        .cop-reason:last-child { margin-bottom: 0; }
        .cop-reason:hover { border-color: #B54745; background: #FAF7F2; transform: translateY(-1px); }
        .cop-reason.sel {
          border-color: #B54745;
          background: #FAF7F2;
          box-shadow: 0 0 0 3px rgba(181,71,69,.1), 0 3px 12px rgba(181,71,69,.08);
          transform: translateY(-1px);
        }

        .cop-reason-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: #FAF7F2; border: 1px solid #E7DCD7;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .2s; color: #B54745;
        }
        .cop-reason.sel .cop-reason-icon { background: #fff; border-color: #B54745; }

        .cop-reason-text { flex: 1; min-width: 0; }
        .cop-reason-label { font-size: 13px; font-weight: 600; color: #241719; margin-bottom: 1px; transition: color .2s; }
        .cop-reason.sel .cop-reason-label { color: #B54745; }
        .cop-reason-desc { font-size: 11px; color: #75676A; }

        .cop-radio {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid #E7DCD7; background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .22s;
        }
        .cop-reason.sel .cop-radio {
          border-color: #B54745;
          background: linear-gradient(135deg,#B54745,#812D3A);
          box-shadow: 0 2px 8px rgba(181,71,69,.3);
        }

        /* other textarea */
        .cop-other { overflow: hidden; max-height: 0; opacity: 0; margin-top: 0; transition: max-height .35s ease, opacity .3s ease, margin .3s ease; }
        .cop-other.open { max-height: 160px; opacity: 1; margin-top: 10px; }
        .cop-textarea {
          width: 100%; min-height: 100px; padding: 12px 14px;
          font-size: 13px; color: #241719;
          background: #fff; border: 1.5px solid #E7DCD7; border-radius: 11px;
          resize: vertical; outline: none; box-sizing: border-box; line-height: 1.6;
          transition: border-color .2s, box-shadow .2s;
        }
        .cop-textarea:focus { border-color: #B54745; box-shadow: 0 0 0 3px rgba(181,71,69,.1); }
        .cop-textarea::placeholder { color: #75676A; opacity: 0.6; }
        .cop-char { font-size: 10px; color: #75676A; text-align: right; margin-top: 4px; }

        /* confirm card */
        .cop-confirm-row { display: flex; justify-content: space-between; font-size: 12.5px; padding: 8px 0; border-bottom: 1px solid #E7DCD7; }
        .cop-confirm-row:last-child { border-bottom: none; }
        .cop-confirm-row span:first-child { color: #75676A; }
        .cop-confirm-row span:last-child { font-weight: 600; color: #241719; }
        .cop-confirm-row span.red { color: #B54745; font-weight: 700; }

        /* footer */
        .cop-footer { display: flex; gap: 10px; margin-top: 8px; }
        .cop-btn-back {
          flex: 1; padding: 13px; border-radius: 12px;
          border: 1.5px solid #E7DCD7; background: #fff; color: #75676A;
          font-size: 12px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .2s;
        }
        .cop-btn-back:hover { border-color: #4A101C; color: #4A101C; background: #FAF7F2; }
        .cop-btn-cancel {
          flex: 2; padding: 13px; border-radius: 12px; border: none;
          background: linear-gradient(135deg,#B54745,#812D3A); color: #fff;
          font-size: 12px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          transition: all .22s; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(181,71,69,.25);
        }
        .cop-btn-cancel:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
        .cop-btn-cancel:not(:disabled):hover { opacity: .94; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(181,71,69,.3); }

        /* success */
        @keyframes scaleIn { from{transform:scale(.5);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ring    { 0%,100%{box-shadow:0 0 0 0 rgba(181,71,69,.4)} 50%{box-shadow:0 0 0 16px rgba(181,71,69,0)} }

        .cop-success { text-align: center; padding: 40px 20px 20px; }
        .cop-success-ring {
          width: 84px; height: 84px; border-radius: 50%;
          background: linear-gradient(135deg,#B54745,#812D3A);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 22px;
          animation: scaleIn .5s cubic-bezier(.34,1.3,.64,1) both, ring 2s ease .5s infinite;
          box-shadow: 0 8px 28px rgba(181,71,69,.3);
        }
        .cop-success-title { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#241719; margin-bottom:7px; animation:fadeUp .5s ease .2s both; }
        .cop-success-sub { font-size:13px; color:#75676A; line-height:1.65; margin-bottom:22px; animation:fadeUp .5s ease .3s both; }
        .cop-success-card { background:#ffffff; border-radius:16px; border:1px solid #E7DCD7; padding:16px 18px; text-align:left; margin-bottom:18px; animation:fadeUp .5s ease .4s both; }
        .cop-done-btn { width:100%; padding:13px; border-radius:12px; border:none; background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; transition:all .22s; box-shadow:0 4px 18px rgba(74,16,28,.25); animation:fadeUp .5s ease .5s both; }
        .cop-done-btn:hover { opacity:.94; transform:translateY(-1px); }
      `}</style>

      <div className="cop-wrap">
        <div
          className="cop-blob"
          style={{
            width: 260,
            height: 260,
            background: "rgba(239,68,68,0.05)",
            top: -80,
            left: -80,
          }}
        />
        <div
          className="cop-blob"
          style={{
            width: 180,
            height: 180,
            background: "rgba(220,38,38,0.05)",
            bottom: 20,
            right: -70,
          }}
        />
        <div
          className="cop-blob"
          style={{
            width: 100,
            height: 100,
            background: "rgba(239,68,68,0.04)",
            top: "40%",
            right: 40,
          }}
        />

        <div className="cop-inner">
          {/* ── STEP: REASON ── */}
          {step === "reason" && (
            <>
              <button className="cop-back" onClick={() => navigate(-1)}>
                <FiArrowLeft size={15} /> Back to Order
              </button>

              <div className="cop-hdr">
                <div className="cop-accent" />
                <div>
                  <h1 className="cop-title">
                    <span>Cancel </span>Order
                  </h1>
                </div>
              </div>

              {/* Product strip */}
              <div className="my-3">
                {selectedItem ? (
                  <div className="w-full max-w-[600px] mx-auto p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      {/* LEFT SECTION */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Image */}
                        {selectedItem?.image ? (
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.name || "product"}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400 border flex-shrink-0">
                            No Image
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {selectedItem?.name || "Unnamed Product"}
                          </p>

                          {selectedItem?.category && (
                            <span className="inline-block text-[10px] px-2 py-[3px] mt-1 rounded-full bg-gray-100 text-gray-500">
                              {selectedItem.category}
                            </span>
                          )}

                          <div className="flex gap-3 mt-2 text-[11px] text-gray-500 flex-wrap">
                            <span className="bg-gray-100 px-2 py-[2px] rounded">
                              Qty: {selectedItem?.quantity ?? 1}
                            </span>

                            {selectedItem?.size && (
                              <span className="bg-gray-100 px-2 py-[2px] rounded">
                                Size: {selectedItem.size}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SECTION */}
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-gray-400 mb-1">Price</p>
                        <p className="text-base font-bold text-[#4A101C] font-serif whitespace-nowrap">
                          ₹
                          {Number(selectedItem?.price ?? 0).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-[600px] mx-auto p-6 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 text-sm shadow-sm">
                    No item found
                  </div>
                )}
              </div>

              {/* Warning note */}
              <div className="cop-warn">
                <FiAlertTriangle
                  size={14}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                Once cancelled, this action{" "}
                <strong style={{ margin: "0 3px" }}>cannot be undone.</strong>
                If your order is already shipped, cancellation may not be
                possible.
              </div>

              {/* Refund note */}
              <div className="cop-refund">
                <FiInfo size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                Refund of{" "}
                <strong style={{ margin: "0 3px" }}>₹{order.amount}</strong>
                will be credited to your {order.paymentMethod} within{" "}
                {REFUND_INFO.timeline}.
              </div>

              {/* Reasons card */}
              <div className="cop-card">
                <div className="cop-card-hdr">
                  <FiEdit3 size={13} /> Reason for Cancellation
                </div>
                <div className="cop-card-body">
                  {REASONS.map((reason) => (
                    <div key={reason.id}>
                      <div
                        className={`cop-reason${
                          selected === reason.id ? " sel" : ""
                        }`}
                        onClick={() => setSelected(reason.id)}
                      >
                        <div className="cop-reason-icon">{reason.icon}</div>
                        <div className="cop-reason-text">
                          <p className="cop-reason-label">{reason.label}</p>
                          <p className="cop-reason-desc">{reason.desc}</p>
                        </div>
                        <div className="cop-radio">
                          {selected === reason.id && (
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="#fff"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Other textarea — slides in */}
                      {reason.id === "other" && (
                        <div
                          className={`cop-other${
                            selected === "other" ? " open" : ""
                          }`}
                        >
                          <textarea
                            className="cop-textarea"
                            placeholder="Please describe your reason in detail..."
                            value={otherText}
                            maxLength={300}
                            onChange={(e) => setOtherText(e.target.value)}
                            autoFocus={selected === "other"}
                          />
                          <p className="cop-char">{otherText.length} / 300</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cop-footer">
                <button className="cop-btn-back" onClick={() => navigate(-1)}>
                  Keep Order
                </button>
                <button
                  className="cop-btn-cancel"
                  disabled={!canProceed}
                  onClick={() => setStep("confirm")}
                >
                  <FiX size={14} /> Continue
                </button>
              </div>
            </>
          )}

          {/* ── STEP: CONFIRM ── */}
          {step === "confirm" && (
            <>
              <button className="cop-back" onClick={() => setStep("reason")}>
                <FiArrowLeft size={15} /> Back
              </button>

              <div className="cop-hdr">
                <div className="cop-accent" />
                <div>
                  <h1 className="cop-title">
                    <button>
                      {" "}
                      <span>Confirm </span>Cancellation
                    </button>
                  </h1>
                  <p className="cop-sub">Please review before confirming</p>
                </div>
              </div>

              {/* Summary card */}
              <div className="cop-card">
                <div className="cop-card-hdr">
                  <FiCheckCircle size={13} /> Cancellation Summary
                </div>
                <div className="cop-card-body">
                  {/* Product row */}
                  <div className="my-3">
                    {selectedItem ? (
                      <div className="w-full max-w-150 mx-auto p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          {/* LEFT SECTION */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Image */}
                            {selectedItem?.image ? (
                              <img
                                src={selectedItem.image}
                                alt={selectedItem.name || "product"}
                                className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400 border flex-shrink-0">
                                No Image
                              </div>
                            )}

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {selectedItem?.name || "Unnamed Product"}
                              </p>

                              {selectedItem?.category && (
                                <span className="inline-block text-[10px] px-2 py-[3px] mt-1 rounded-full bg-gray-100 text-gray-500">
                                  {selectedItem.category}
                                </span>
                              )}

                              <div className="flex gap-3 mt-2 text-[11px] text-gray-500 flex-wrap">
                                <span className="bg-gray-100 px-2 py-[2px] rounded">
                                  Qty: {selectedItem?.quantity ?? 1}
                                </span>

                                {selectedItem?.size && (
                                  <span className="bg-gray-100 px-2 py-[2px] rounded">
                                    Size: {selectedItem.size}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* RIGHT SECTION */}
                          <div className="shrink-0 text-right">
                            <p className="text-xs text-gray-400 mb-1">Price</p>
                            <p className="text-base font-bold text-[#4A101C] font-serif whitespace-nowrap">
                              ₹
                              {Number(selectedItem?.price ?? 0).toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-150 mx-auto p-6 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 text-sm shadow-sm">
                        No item found
                      </div>
                    )}
                  </div>

                  <div className="cop-confirm-row">
                    <span>Order ID</span>
                    <span>{order.id}</span>
                  </div>
                  <div className="cop-confirm-row">
                    <span>Cancellation Reason</span>
                    <span className="red">
                      {selectedLabel}
                      {selected === "other"
                        ? ` — "${otherText.slice(0, 30)}${
                            otherText.length > 30 ? "…" : ""
                          }"`
                        : ""}
                    </span>
                  </div>
                  <div className="cop-confirm-row">
                    <span>Refund Amount</span>
                    <span>₹{order.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="cop-confirm-row">
                    <span>Refund To</span>
                    <span>{order.customerName}</span>
                  </div>
                  <div className="cop-confirm-row">
                    <span>Refund Timeline</span>
                    <span>{REFUND_INFO.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Final warning */}
              <div className="cop-warn" style={{ marginBottom: 12 }}>
                <FiAlertTriangle
                  size={14}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                This will permanently cancel your order. This action{" "}
                <strong style={{ margin: "0 3px" }}>cannot be reversed.</strong>
              </div>

              <div className="cop-footer">
                <button
                  className="cop-btn-back"
                  onClick={() => setStep("reason")}
                >
                  Go Back
                </button>
                <button className="cop-btn-cancel" onClick={handleCancel}>
                  <FiX size={14} /> Yes, Cancel Order
                </button>
              </div>
            </>
          )}

          {/* ── STEP: SUCCESS ── */}
          {step === "success" && (
            <div className="cop-success">
              <div className="cop-success-ring">
                <FiX size={36} color="#fff" />
              </div>
              <h2 className="cop-success-title">Order Cancelled</h2>
              <p className="cop-success-sub">
                Your order has been successfully cancelled.
                <br />
                Refund will be processed within {REFUND_INFO.timeline}.
              </p>

              <div className="cop-success-card">
                {[
                  { label: "Order ID", val: order.id, red: false },
                  { label: "Product", val: selectedItem.name, red: false },
                  { label: "Reason", val: selectedLabel, red: true },
                  {
                    label: "Refund",
                    val: `₹${order.amount.toLocaleString("en-IN")}`,
                    red: false,
                  },
                  { label: "Refund To", val: order.customerName, red: false },
                  { label: "Timeline", val: REFUND_INFO.timeline, red: false },
                ].map((row) => (
                  <div key={row.label} className="cop-confirm-row">
                    <span>{row.label}</span>
                    <span className={row.red ? "red" : ""}>{row.val}</span>
                  </div>
                ))}
              </div>

              <button
                className="cop-done-btn"
                onClick={() => navigate("/orders")}
              >
                Back to Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CancelOrderPage;
