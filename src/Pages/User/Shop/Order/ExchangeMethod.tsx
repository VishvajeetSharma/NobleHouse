import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiCheckCircle,
  FiMapPin,
  FiPlus,
  FiPackage,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";

// ── Static Data ──────────────────────────────────────────
const PRODUCT = {
  name: "Floral Wrap Midi Dress",
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop",
  currentSize: "M",
  currentColor: "Rose Pink",
  price: 2499,
  orderId: "ORD-004821",
  category: "Topwear",
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const OUT_OF_STOCK = ["XS"];

const COLORS = [
  { name: "Rose Pink",   hex: "#f9a8d4" },
  { name: "Ivory White", hex: "#f5f0eb" },
  { name: "Deep Plum",   hex: "#6b21a8" },
  { name: "Sage Green",  hex: "#86a789" },
  { name: "Midnight",    hex: "#1e1b4b" },
  { name: "Coral",       hex: "#fb923c" },
];

const ADDRESSES = [
  { id: 1, name: "Riya Sharma",   type: "Home", line1: "42, Linking Road, Bandra West", city: "Mumbai", state: "Maharashtra", pin: "400050", phone: "+91 98765 43210", default: true  },
  { id: 2, name: "Riya Sharma",   type: "Work", line1: "WeWork, Andheri East",           city: "Mumbai", state: "Maharashtra", pin: "400093", phone: "+91 98765 43210", default: false },
];

// ── Step indicator ───────────────────────────────────────
const steps = ["Exchange Details", "Confirm Address", "Done"];

// ── Main Component ───────────────────────────────────────
const ExchangePage = () => {
  const navigate = useNavigate();

  const [step, setStep]               = useState(0);         // 0 = details, 1 = address, 2 = success
  const [selSize, setSelSize]         = useState("");
  const [selColor, setSelColor]       = useState("");
  const [selAddress, setSelAddress]   = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr]         = useState({ name: "", line1: "", city: "", state: "", pin: "", phone: "" });

  const step1Valid = selSize !== "" && selSize !== PRODUCT.currentSize || selColor !== "" && selColor !== PRODUCT.currentColor;
  const sameAsOriginal = selSize === PRODUCT.currentSize && selColor === PRODUCT.currentColor && selSize !== "" && selColor !== "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ep-wrap {
          min-height: 100vh;
          background: #FAF7F2;
          padding: 32px 16px 72px;
          position: relative; overflow: hidden;
        }
        .ep-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .ep-inner { max-width: 580px; margin: 0 auto; position: relative; z-index: 1; }

        /* back */
        .ep-back {
          align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; color: #4A101C;
          background: none; border: none; cursor: pointer; padding: 0;
          margin-bottom: 22px; transition: gap .2s;
        }
        .ep-back:hover { gap: 11px; }

        /* header */
        .ep-hdr { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .ep-accent { width: 3.5px; height: 44px; background: linear-gradient(180deg,#4A101C,#812D3A); border-radius: 3px; flex-shrink: 0; }
        .ep-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#241719; line-height:1.1; }
        .ep-title span { font-weight:400; }
        .ep-sub { font-size:11px; color:#75676A; margin-top:3px; }

        /* stepper */
        .ep-stepper { display:flex; align-items:center; margin-bottom:24px; }
        .ep-step-item { display:flex; flex-direction:column; align-items:center; gap:5px; flex:1; }
        .ep-step-circle {
          width:28px; height:28px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:11px; font-weight:700; transition:all .3s; flex-shrink:0;
        }
        .ep-step-circle.done { background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff; box-shadow:0 3px 10px rgba(74,16,28,.25); }
        .ep-step-circle.active { background:#fff; color:#4A101C; border:2px solid #4A101C; box-shadow:0 0 0 4px rgba(74,16,28,.1); }
        .ep-step-circle.pending { background:#fff; color:#75676A; border:2px solid #E7DCD7; }
        .ep-step-label { font-size:9.5px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; white-space:nowrap; }
        .ep-step-label.done { color:#4A101C; }
        .ep-step-label.active { color:#4A101C; font-weight:700; }
        .ep-step-label.pending { color:#75676A; }
        .ep-step-line { flex:1; height:2px; margin-bottom:16px; border-radius:2px; transition:background .4s; }
        .ep-step-line.done { background:linear-gradient(90deg,#4A101C,#812D3A); }
        .ep-step-line.pending { background:#E7DCD7; }

        /* card */
        .ep-card {
          background:#ffffff;
          border-radius:18px; border:1px solid #E7DCD7;
          box-shadow:0 4px 20px rgba(74,16,28,.04);
          overflow:hidden; margin-bottom:14px;
        }
        .ep-card-hdr {
          padding:14px 18px; background:#FAF7F2; border-bottom:1px solid #E7DCD7;
          font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          color:#4A101C; display:flex; align-items:center; gap:7px;
        }
        .ep-card-body { padding:16px 18px; }

        /* product strip */
        .ep-product {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px; background:#fff;
          border-radius:14px; border:1px solid #E7DCD7; margin-bottom:12px;
        }
        .ep-product-img { width:58px; height:58px; border-radius:10px; object-fit:cover; border:1px solid #E7DCD7; flex-shrink:0; }
        .ep-product-name { font-size:13px; font-weight:600; color:#241719; margin-bottom:2px; }
        .ep-product-meta { font-size:10px; color:#75676A; }
        .ep-product-meta b { color:#4A101C; }
        .ep-order-tag {
          margin-left:auto; font-size:9px; font-weight:700; letter-spacing:.08em;
          color:#4A101C; background:#FAF7F2; border:1px solid #E7DCD7;
          padding:3px 9px; border-radius:20px; flex-shrink:0;
        }

        /* section label */
        .ep-sec-label {
          font-size:9.5px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
          color:#4A101C; margin-bottom:10px;
        }

        /* size grid */
        .ep-size-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
        .ep-size-btn {
          min-width:44px; padding:8px 12px; border-radius:10px;
          font-size:12px; font-weight:600;
          border:1.5px solid #E7DCD7; background:#fff; color:#241719;
          cursor:pointer; transition:all .2s; position:relative; text-align:center;
        }
        .ep-size-btn:hover:not(:disabled):not(.ep-current) { border-color:#812D3A; color:#4A101C; }
        .ep-size-btn.ep-selected {
          background:linear-gradient(135deg,#4A101C,#812D3A);
          color:#fff; border-color:transparent;
          box-shadow:0 3px 12px rgba(74,16,28,.28);
          transform:translateY(-1px);
        }
        .ep-size-btn.ep-current {
          border-color:#E7DCD7; background:#FAF7F2; color:#75676A; cursor:default;
        }
        .ep-size-btn:disabled {
          color:#d1d5db; background:#fafafa; cursor:not-allowed;
          text-decoration:line-through; border-color:#f3f4f6;
        }
        .ep-current-tag {
          position:absolute; top:-7px; left:50%; transform:translateX(-50%);
          font-size:7px; font-weight:700; letter-spacing:.08em;
          background:#FAF7F2; color:#4A101C; border:1px solid #E7DCD7; padding:1px 5px; border-radius:4px; white-space:nowrap;
        }

        /* color grid */
        .ep-color-grid { display:flex; flex-wrap:wrap; gap:10px; }
        .ep-color-item { display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; }
        .ep-color-swatch {
          width:36px; height:36px; border-radius:50%;
          border:2.5px solid transparent;
          transition:all .22s; position:relative;
          box-shadow:0 2px 8px rgba(0,0,0,.1);
        }
        .ep-color-swatch.ep-color-selected {
          border-color:#4A101C;
          box-shadow:0 0 0 3px rgba(74,16,28,.2), 0 3px 10px rgba(0,0,0,.12);
          transform:translateY(-2px);
        }
        .ep-color-swatch.ep-color-current { border-color:#E7DCD7; opacity:.55; cursor:default; }
        .ep-color-check {
          position:absolute; inset:0; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,.15);
        }
        .ep-color-name {
          font-size:9px; font-weight:500; color:#75676A; text-align:center;
          max-width:44px; line-height:1.2;
        }
        .ep-color-name.active { color:#4A101C; font-weight:600; }

        /* same-as-original warning */
        .ep-warn {
          display:flex; align-items:center; gap:8px;
          padding:10px 14px; background:#fef9c3; border:1px solid #fde68a;
          border-radius:10px; font-size:11px; color:#92400e; margin-top:10px;
        }

        /* address */
        .ep-addr-card {
          border-radius:14px; border:1.5px solid #E7DCD7; background:#fff;
          padding:14px 16px; cursor:pointer; transition:all .22s; margin-bottom:10px;
          position:relative;
        }
        .ep-addr-card:hover { border-color:#812D3A; background:#FAF7F2; }
        .ep-addr-card.ep-addr-selected {
          border-color:#4A101C;
          background:#FAF7F2;
          box-shadow:0 0 0 3px rgba(74,16,28,.08);
        }
        .ep-addr-top { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .ep-addr-type {
          font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
          color:#4A101C; background:#FAF7F2; border:1px solid #E7DCD7;
          padding:2px 8px; border-radius:4px;
        }
        .ep-addr-name { font-size:13px; font-weight:600; color:#241719; flex:1; }
        .ep-addr-default {
          font-size:8.5px; font-weight:700; color:#16a34a;
          background:#dcfce7; border:1px solid #bbf7d0; padding:2px 7px; border-radius:4px;
        }
        .ep-addr-line { font-size:11.5px; color:#75676A; line-height:1.65; }
        .ep-addr-phone { font-size:10px; color:#75676A; margin-top:3px; }
        .ep-addr-radio {
          position:absolute; top:14px; right:14px;
          width:20px; height:20px; border-radius:50%;
          border:2px solid #E7DCD7; background:#fff;
          display:flex; align-items:center; justify-content:center;
          transition:all .22s; flex-shrink:0;
        }
        .ep-addr-card.ep-addr-selected .ep-addr-radio {
          border-color:#4A101C;
          background:linear-gradient(135deg,#4A101C,#812D3A);
          box-shadow:0 2px 8px rgba(74,16,28,.25);
        }

        /* add address form */
        .ep-add-form {
          border:1.5px dashed #E7DCD7; border-radius:12px;
          background:#FAF7F2; overflow:hidden;
          transition:all .3s;
        }
        .ep-add-toggle {
          width:100%; padding:12px 16px;
          display:flex; align-items:center; gap:9px;
          font-size:12px; font-weight:600; color:#4A101C;
          background:none; border:none; cursor:pointer;
        }
        .ep-form-fields { padding:0 16px 14px; display:flex; flex-direction:column; gap:10px; }
        .ep-form-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media(max-width:480px){ .ep-form-grid2 { grid-template-columns:1fr; } }
        .ep-field { display:flex; flex-direction:column; gap:4px; }
        .ep-field-label { font-size:9.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#4A101C; }
        .ep-input {
          padding:9px 12px;
          font-size:12.5px; color:#241719; background:#fff;
          border:1.5px solid #E7DCD7; border-radius:9px;
          outline:none; transition:border-color .2s, box-shadow .2s;
        }
        .ep-input:focus { border-color:#4A101C; box-shadow:0 0 0 3px rgba(74,16,28,.08); }
        .ep-input::placeholder { color:#75676A; opacity: 0.6; }

        /* footer buttons */
        .ep-footer { display:flex; gap:10px; margin-top:8px; }
        .ep-btn-back {
          flex:1; padding:13px; border-radius:12px;
          border:1.5px solid #E7DCD7; background:#fff; color:#75676A;
          font-size:12px; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; cursor:pointer; transition:all .2s;
        }
        .ep-btn-back:hover { border-color:#4A101C; color:#4A101C; background:#FAF7F2; }
        .ep-btn-next {
          flex:2; padding:13px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff;
          font-size:12px; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; cursor:pointer;
          transition:all .22s; display:flex; align-items:center; justify-content:center; gap:8px;
          box-shadow:0 4px 18px rgba(74,16,28,.25);
        }
        .ep-btn-next:disabled { opacity:.38; cursor:not-allowed; box-shadow:none; }
        .ep-btn-next:not(:disabled):hover { opacity:.94; transform:translateY(-2px); box-shadow:0 8px 24px rgba(74,16,28,.3); }

        /* ── SUCCESS ── */
        @keyframes scaleIn { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes ringPulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,16,28,.4)} 50%{box-shadow:0 0 0 18px rgba(74,16,28,.0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .ep-success { text-align:center; padding:40px 20px 20px; }
        .ep-success-ring {
          width:88px; height:88px; border-radius:50%;
          background:linear-gradient(135deg,#4A101C,#812D3A);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 24px;
          animation:scaleIn .5s cubic-bezier(.34,1.3,.64,1) both, ringPulse 2s ease 0.5s infinite;
          box-shadow:0 8px 32px rgba(74,16,28,.35);
        }
        .ep-success-title {
          font-family:'Playfair Display',serif;
          font-size:26px; font-weight:700; color:#241719; margin-bottom:8px;
          animation:fadeUp .5s ease .2s both;
        }
        .ep-success-sub { font-size:13px; color:#75676A; line-height:1.6; margin-bottom:24px; animation:fadeUp .5s ease .3s both; }

        .ep-success-card {
          background:#ffffff; border-radius:16px;
          border:1px solid #E7DCD7; padding:16px 18px;
          text-align:left; margin-bottom:20px;
          animation:fadeUp .5s ease .4s both;
          box-shadow:0 4px 20px rgba(74,16,28,.04);
        }
        .ep-success-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #E7DCD7; font-size:12px; }
        .ep-success-row:last-child { border-bottom:none; }
        .ep-success-row span:first-child { color:#75676A; }
        .ep-success-row span:last-child { font-weight:600; color:#241719; }
        .ep-success-row span.pink { color:#4A101C; font-weight:700; }

        .ep-done-btn {
          width:100%; padding:13px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff;
          font-size:12px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase; cursor:pointer;
          transition:all .22s; box-shadow:0 4px 18px rgba(74,16,28,.25);
          animation:fadeUp .5s ease .5s both;
        }
        .ep-done-btn:hover { opacity:.9; transform:translateY(-1px); }
      `}</style>

      <div className="ep-wrap">
        <div className="ep-blob" style={{ width:260,height:260,background:"rgba(219,39,119,0.06)",top:-90,left:-90 }} />
        <div className="ep-blob" style={{ width:200,height:200,background:"rgba(147,51,234,0.06)",bottom:20,right:-80 }} />

        <div className="ep-inner">

          {/* Back */}
          {step < 2 && (
            <button className="ep-back block md:hidden" onClick={() => step === 0 ? navigate(-1) : setStep(0)}>
              <FiArrowLeft size={15} />
              {step === 0 ? "Back to Order" : "Back"}
            </button>
          )}
           
          {/* Header */}
          {step < 2 && (
            <div className="ep-hdr">
              <div className="ep-accent" />
              <div>
                <h1 className="ep-title"><span>Exchange </span>Item</h1>
                <p className="ep-sub">Order #{PRODUCT.orderId}</p>
              </div>
            </div>
          )}

          {/* Stepper */}
          {step < 2 && (
            <div className="ep-stepper">
              {steps.map((label, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", flex: i < steps.length - 1 ? 1 : 0 }}>
                  <div className="ep-step-item">
                    <div className={`ep-step-circle ${i < step ? "done" : i === step ? "active" : "pending"}`}>
                      {i < step ? <FiCheck size={12} /> : i + 1}
                    </div>
                    <span className={`ep-step-label ${i < step ? "done" : i === step ? "active" : "pending"}`}>{label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`ep-step-line ${i < step ? "done" : "pending"}`} style={{ flex:1, marginBottom:16 }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ══ STEP 0 — Exchange Details ══ */}
          {step === 0 && (
            <>
              {/* Product strip */}
              <div className="ep-product">
                <img src={PRODUCT.image} alt={PRODUCT.name} className="ep-product-img" />
                <div style={{ flex:1, minWidth:0 }}>
                  <p className="ep-product-name">{PRODUCT.name}</p>
                  <p className="ep-product-meta">
                    Current: <b>Size {PRODUCT.currentSize}</b> · <b>{PRODUCT.currentColor}</b>
                  </p>
                </div>
                <span className="ep-order-tag">{PRODUCT.orderId}</span>
              </div>

              {/* Size */}
              <div className="ep-card">
                <div className="ep-card-hdr"><FiPackage size={13} />Select New Size</div>
                <div className="ep-card-body">
                  <div className="ep-size-grid">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        disabled={OUT_OF_STOCK.includes(s)}
                        className={`ep-size-btn
                          ${s === PRODUCT.currentSize ? "ep-current" : ""}
                          ${selSize === s && s !== PRODUCT.currentSize ? "ep-selected" : ""}
                        `}
                        onClick={() => s !== PRODUCT.currentSize && !OUT_OF_STOCK.includes(s) && setSelSize(s)}
                      >
                        {s === PRODUCT.currentSize && <span className="ep-current-tag">Current</span>}
                        {s}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize:10, color:"#c4b5d0", marginTop:4 }}>Strikethrough = out of stock</p>
                </div>
              </div>

              {/* Color */}
              <div className="ep-card">
                <div className="ep-card-hdr"><FiRefreshCw size={13} />Select New Color</div>
                <div className="ep-card-body">
                  <div className="ep-color-grid">
                    {COLORS.map((c) => {
                      const isCurrent = c.name === PRODUCT.currentColor;
                      const isSelected = selColor === c.name && !isCurrent;
                      return (
                        <div key={c.name} className="ep-color-item" onClick={() => !isCurrent && setSelColor(c.name)}>
                          <div
                            className={`ep-color-swatch ${isSelected ? "ep-color-selected" : ""} ${isCurrent ? "ep-color-current" : ""}`}
                            style={{ background: c.hex }}
                          >
                            {isSelected && (
                              <div className="ep-color-check">
                                <FiCheck size={13} color={c.name === "Ivory White" ? "#374151" : "#fff"} />
                              </div>
                            )}
                          </div>
                          <span className={`ep-color-name ${isSelected ? "active" : ""}`}>
                            {isCurrent ? `${c.name} ✦` : c.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {sameAsOriginal && (
                    <div className="ep-warn">
                      <FiCheckCircle size={13} />
                      You've selected the same size and color as your current item. Please change at least one.
                    </div>
                  )}
                </div>
              </div>

              <div className="ep-footer">
                <button className="ep-btn-back" onClick={() => navigate(-1)}>Cancel</button>
                <button
                  className="ep-btn-next"
                  disabled={!(selSize || selColor) || sameAsOriginal}
                  onClick={() => setStep(1)}
                >
                  Continue <FiChevronRight size={14} />
                </button>
              </div>
            </>
          )}

          {/* ══ STEP 1 — Confirm Address ══ */}
          {step === 1 && (
            <>
              <div className="ep-card">
                <div className="ep-card-hdr"><FiMapPin size={13} />Pickup Address</div>
                <div className="ep-card-body">

                  {ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      className={`ep-addr-card ${selAddress === addr.id ? "ep-addr-selected" : ""}`}
                      onClick={() => setSelAddress(addr.id)}
                    >
                      <div className="ep-addr-top">
                        <span className="ep-addr-type">{addr.type}</span>
                        <span className="ep-addr-name">{addr.name}</span>
                        {addr.default && <span className="ep-addr-default">Default</span>}
                      </div>
                      <p className="ep-addr-line">{addr.line1}</p>
                      <p className="ep-addr-line">{addr.city}, {addr.state} — {addr.pin}</p>
                      <p className="ep-addr-phone">{addr.phone}</p>
                      <div className="ep-addr-radio">
                        {selAddress === addr.id && (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add new address */}
                  <div className="ep-add-form">
                    <button className="ep-add-toggle" onClick={() => setShowAddForm((p) => !p)}>
                      <FiPlus size={14} />
                      {showAddForm ? "Cancel" : "Add New Address"}
                    </button>
                    {showAddForm && (
                      <div className="ep-form-fields">
                        <div className="ep-field">
                          <label className="ep-field-label">Full Name</label>
                          <input className="ep-input" placeholder="Name on address" value={newAddr.name} onChange={(e) => setNewAddr({...newAddr, name: e.target.value})} />
                        </div>
                        <div className="ep-field">
                          <label className="ep-field-label">Address Line</label>
                          <input className="ep-input" placeholder="Street, building, locality" value={newAddr.line1} onChange={(e) => setNewAddr({...newAddr, line1: e.target.value})} />
                        </div>
                        <div className="ep-form-grid2">
                          <div className="ep-field">
                            <label className="ep-field-label">City</label>
                            <input className="ep-input" placeholder="City" value={newAddr.city} onChange={(e) => setNewAddr({...newAddr, city: e.target.value})} />
                          </div>
                          <div className="ep-field">
                            <label className="ep-field-label">State</label>
                            <input className="ep-input" placeholder="State" value={newAddr.state} onChange={(e) => setNewAddr({...newAddr, state: e.target.value})} />
                          </div>
                          <div className="ep-field">
                            <label className="ep-field-label">Pincode</label>
                            <input className="ep-input" placeholder="6-digit PIN" maxLength={6} value={newAddr.pin} onChange={(e) => setNewAddr({...newAddr, pin: e.target.value.replace(/\D/g,"")})} />
                          </div>
                          <div className="ep-field">
                            <label className="ep-field-label">Phone</label>
                            <input className="ep-input" placeholder="+91 XXXXX XXXXX" value={newAddr.phone} onChange={(e) => setNewAddr({...newAddr, phone: e.target.value})} />
                          </div>
                        </div>
                        <button
                          className="ep-btn-next"
                          style={{ flex:"unset", width:"100%" }}
                          disabled={!newAddr.name || !newAddr.line1 || !newAddr.city || newAddr.pin.length < 6}
                          onClick={() => { setShowAddForm(false); }}
                        >
                          Save Address
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Exchange summary */}
              <div className="ep-card">
                <div className="ep-card-hdr"><FiRefreshCw size={13} />Exchange Summary</div>
                <div className="ep-card-body">
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[
                      { label:"Product",      val: PRODUCT.name },
                      { label:"Current Size", val: PRODUCT.currentSize },
                      selSize  && { label:"New Size",    val: selSize,  highlight: true },
                      { label:"Current Color",val: PRODUCT.currentColor },
                      selColor && { label:"New Color",   val: selColor, highlight: true },
                    ].filter(Boolean).map((row: any, i) => (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"6px 0", borderBottom:"1px solid #E7DCD7" }}>
                        <span style={{ color:"#75676A" }}>{row.label}</span>
                        <span style={{ fontWeight:600, color: row.highlight ? "#4A101C" : "#241719" }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ep-footer">
                <button className="ep-btn-back" onClick={() => setStep(0)}>Back</button>
                <button className="ep-btn-next" onClick={() => setStep(2)}>
                  <FiCheckCircle size={14} /> Confirm Exchange
                </button>
              </div>
            </>
          )}

          {/* ══ STEP 2 — Success ══ */}
          {step === 2 && (
            <div className="ep-success">
              <div className="ep-success-ring">
                <FiCheckCircle size={38} color="#fff" />
              </div>
              <h2 className="ep-success-title">Exchange Requested!</h2>
              <p className="ep-success-sub">
                Your exchange request has been placed successfully.<br />
                Our team will arrange a pickup within 2–3 business days.
              </p>

              <div className="ep-success-card">
                <div className="ep-success-row">
                  <span>Order ID</span><span>{PRODUCT.orderId}</span>
                </div>
                <div className="ep-success-row">
                  <span>Product</span><span>{PRODUCT.name}</span>
                </div>
                {selSize && (
                  <div className="ep-success-row">
                    <span>New Size</span><span className="pink">{selSize}</span>
                  </div>
                )}
                {selColor && (
                  <div className="ep-success-row">
                    <span>New Color</span><span className="pink">{selColor}</span>
                  </div>
                )}
                <div className="ep-success-row">
                  <span>Pickup Address</span>
                  <span>{ADDRESSES.find(a => a.id === selAddress)?.city ?? "Mumbai"}</span>
                </div>
                <div className="ep-success-row">
                  <span>Pickup By</span><span>2–3 Business Days</span>
                </div>
                <div className="ep-success-row">
                  <span>Exchange ID</span><span className="pink">EXC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </div>

              <button className="ep-done-btn" onClick={() => navigate("/orders")}>
                Back to Orders
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ExchangePage;