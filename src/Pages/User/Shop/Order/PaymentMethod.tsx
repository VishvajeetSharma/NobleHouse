import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Heading";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiInfo,
  FiCheckCircle,
  FiCreditCard,
  FiSmartphone,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { useDispatch,useSelector } from "react-redux";
import { addReturnRequest } from "../../../../redux/returnSlice";

import { RiWalletLine, RiBankLine } from "react-icons/ri";

// ─── Types ───────────────────────────────────────────────
type Method = "wallet" | "bank" | "upi" |"cod"| null;

// ─── Main ────────────────────────────────────────────────
const RefundMethodPage = () => {
  const dispatch = useDispatch();
  const {id,itemId} = useParams();
  const location = useLocation();
  const returnData = location.state;
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Method>(null);

  // Bank form
  const [bank, setBank] = useState({
    accountHolder: "",
    accountNumber: "",
    confirmAccount: "",
    ifsc: "",
    bankName: "",
  });

  // UPI
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);

  const refundAmount = 1499; // static for demo

  const handleVerifyUpi = () => {
    if (!upiId.includes("@")) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setUpiVerified(true);
    }, 1400);
  };

  const bankValid =
    bank.accountHolder.trim() &&
    bank.accountNumber.trim().length >= 9 &&
    bank.accountNumber === bank.confirmAccount &&
    bank.ifsc.trim().length === 11 &&
    bank.bankName.trim();

  const canSubmit =
    selected === "wallet" ||
    (selected === "bank" && bankValid) ||
    (selected === "upi" && upiVerified);

    // fetch order data 
  const orders = useSelector((state: any) => state.order?.orders);
  const order = orders?.find((o: any) => o.id === String(id));
  const selectedItem = order?.items?.find(
    (i: any) => String(i.id) === String(itemId)
  );
console.log("SelectedIem",selectedItem)
console.log("id from params:", id);
console.log("itemId from params:", itemId);
console.log("orders:", orders);
console.log("order found:", order);
console.log("order items:", order?.items);
const handleRefund = ()=>{

     const finalData = {
  ...returnData,
      returnid: "RET-" + Date.now(), 
  paymentMethod: selected,
  status: "pending",
  createdAt: new Date().toISOString(),

  };

  dispatch(addReturnRequest(finalData));
  console.log("return Data",finalData)
  Swal.fire({
    title:"Requested Successfully",
    icon:"success"
  })

  navigate(`/orderDetail/${id}/${itemId}`);


}

  return (
    <>
    <Header/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rfm-wrap {
          min-height: 100vh;
          background: #FAF7F2;
          padding: 32px 16px 64px;
          position: relative; overflow: hidden;
        }
        .rfm-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .rfm-inner { max-width: 580px; margin: 0 auto; position: relative; z-index: 1; }

        /* back */
        .rfm-back {
          align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; color: #4A101C;
          background: none; border: none; cursor: pointer; padding: 0;
          margin-bottom: 24px; transition: gap .2s;
        }
        .rfm-back:hover { gap: 11px; }

        /* header */
        .rfm-hdr { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .rfm-accent { width: 3.5px; height: 44px; background: linear-gradient(180deg,#4A101C,#812D3A); border-radius: 3px; flex-shrink: 0; }
        .rfm-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #241719; line-height: 1.1; }
        .rfm-title span { font-weight: 400; }
        .rfm-sub { font-size: 11px; color: #75676A; margin-top: 3px; }

        /* refund summary chip */
        .rfm-summary {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; margin-bottom: 16px;
          background: #ffffff;
          border-radius: 16px; border: 1px solid #E7DCD7;
          box-shadow: 0 2px 14px rgba(74,16,28,.04);
        }
        .rfm-summary-label { font-size: 11px; color: #75676A; font-weight: 500; margin-bottom: 3px; }
        .rfm-summary-amt {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700;
          color: #4A101C;
        }
        .rfm-summary-right { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #4A101C; font-weight: 600; }
        .rfm-summary-right svg { opacity: .7; }

        /* info note */
        .rfm-note {
          display: flex; align-items: flex-start; gap: 9px;
          padding: 12px 16px; background: #FAF7F2; border: 1px solid #E7DCD7;
          border-radius: 12px; font-size: 11px; color: #75676A;
          line-height: 1.7; margin-bottom: 16px;
        }

        /* card */
        .rfm-card {
          background: #ffffff;
          border-radius: 18px; border: 1px solid #E7DCD7;
          box-shadow: 0 4px 20px rgba(74,16,28,.04);
          overflow: hidden; margin-bottom: 14px;
        }
        .rfm-card-hdr {
          padding: 14px 18px; background: #FAF7F2; border-bottom: 1px solid #E7DCD7;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #4A101C;
          display: flex; align-items: center; gap: 7px;
        }
        .rfm-card-body { padding: 16px 18px; }

        /* method option */
        .rfm-method {
          display: flex; align-items: center; gap: 14px;
          padding: 15px 16px; border-radius: 14px;
          border: 1.5px solid #E7DCD7; background: #fff;
          cursor: pointer; transition: all .22s;
          position: relative; overflow: hidden; margin-bottom: 10px;
        }
        .rfm-method:last-child { margin-bottom: 0; }
        .rfm-method:hover { border-color: #812D3A; background: #FAF7F2; transform: translateY(-1px); }
        .rfm-method.active {
          border-color: #4A101C;
          background: #FAF7F2;
          box-shadow: 0 0 0 3px rgba(74,16,28,.08), 0 4px 14px rgba(74,16,28,.06);
          transform: translateY(-1px);
        }

        .rfm-method-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #ffffff; border: 1px solid #E7DCD7;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .22s; color: #4A101C;
        }
        .rfm-method.active .rfm-method-icon {
          background: #FAF7F2; border-color: #4A101C; color: #4A101C;
        }

        .rfm-method-text { flex: 1; min-width: 0; }
        .rfm-method-label { font-size: 13px; font-weight: 600; color: #241719; margin-bottom: 2px; transition: color .2s; }
        .rfm-method.active .rfm-method-label { color: #4A101C; }
        .rfm-method-desc { font-size: 11px; color: #75676A; }

        .rfm-method-badge {
          font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 20px; flex-shrink: 0;
        }
        .rfm-badge-instant { background: #fef9c3; color: #a16207; border: 1px solid #fde68a; }
        .rfm-badge-secure  { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }

        /* radio */
        .rfm-radio {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid #E7DCD7; background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .22s;
        }
        .rfm-method.active .rfm-radio {
          border-color: #4A101C;
          background: linear-gradient(135deg,#4A101C,#812D3A);
          box-shadow: 0 2px 8px rgba(74,16,28,.25);
        }

        /* expandable form area */
        .rfm-expand {
          overflow: hidden; max-height: 0; opacity: 0;
          transition: max-height .4s ease, opacity .3s ease, margin .3s ease;
          margin-top: 0;
        }
        .rfm-expand.open { max-height: 600px; opacity: 1; margin-top: 14px; }

        /* form */
        .rfm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media(max-width:480px){ .rfm-form-grid { grid-template-columns: 1fr; } }
        .rfm-form-full { grid-column: 1 / -1; }

        .rfm-field { display: flex; flex-direction: column; gap: 5px; }
        .rfm-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #4A101C; }
        .rfm-input {
          padding: 11px 14px;
          font-size: 13px; color: #241719; background: #fff;
          border: 1.5px solid #E7DCD7; border-radius: 12px;
          outline: none; transition: border-color .2s, box-shadow .2s;
        }
        .rfm-input:focus { border-color: #4A101C; box-shadow: 0 0 0 3px rgba(74,16,28,.08); }
        .rfm-input::placeholder { color: #75676A; opacity: 0.6; }
        .rfm-input.error { border-color: #fca5a5; }
        .rfm-input.success { border-color: #86efac; }
        .rfm-hint { font-size: 10px; color: #75676A; margin-top: 1px; }
        .rfm-hint.err { color: #f87171; }
        .rfm-hint.ok  { color: #16a34a; }

        /* upi row */
        .rfm-upi-row { display: flex; gap: 8px; align-items: flex-end; }
        .rfm-verify-btn {
          height: 42px; padding: 0 18px; flex-shrink: 0;
          border-radius: 12px; border: none; cursor: pointer;
          font-size: 11px; font-weight: 700;
          letter-spacing: .07em; text-transform: uppercase;
          background: linear-gradient(135deg,#4A101C,#812D3A); color: #fff;
          transition: all .2s; display: flex; align-items: center; gap: 6px;
          box-shadow: 0 3px 12px rgba(74,16,28,.2);
        }
        .rfm-verify-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
        .rfm-verify-btn:not(:disabled):hover { opacity: .92; transform: translateY(-1px); }

        /* wallet info box */
        .rfm-wallet-box {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          background: #FAF7F2;
          border: 1.5px dashed #E7DCD7;
        }
        .rfm-wallet-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg,#4A101C,#812D3A);
          display: flex; align-items: center; justify-content: center;
          color: #fff; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(74,16,28,.25);
        }
        .rfm-wallet-bal { font-size: 10px; color: #75676A; margin-bottom: 2px; }
        .rfm-wallet-amt { font-size: 16px; font-weight: 700; color: #4A101C; font-family: 'Playfair Display', serif; }
        .rfm-wallet-note { font-size: 10px; color: #75676A; margin-top: 2px; }

        /* footer */
        .rfm-footer { display: flex; gap: 10px; margin-top: 10px; }
        .rfm-btn-cancel {
          flex: 1; padding: 13px; border-radius: 12px;
          border: 1.5px solid #E7DCD7; background: #fff; color: #75676A;
          font-size: 12px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .2s;
        }
        .rfm-btn-cancel:hover { border-color: #4A101C; color: #4A101C; background: #FAF7F2; }
        .rfm-btn-submit {
          flex: 2; padding: 13px; border-radius: 12px; border: none;
          background: linear-gradient(135deg,#4A101C,#812D3A); color: #fff;
          font-size: 12px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          transition: all .22s; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(74,16,28,.25);
        }
        .rfm-btn-submit:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
        .rfm-btn-submit:not(:disabled):hover { opacity: .94; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,16,28,.3); }
      `}</style>

      <div className="rfm-wrap">
        {/* blobs */}
        <div className="rfm-blob" style={{ width: 260, height: 260, background: "rgba(74,16,28,0.03)", top: -90, left: -90 }} />
        <div className="rfm-blob" style={{ width: 200, height: 200, background: "rgba(129,45,58,0.03)", bottom: 20, right: -80 }} />
        <div className="rfm-blob" style={{ width: 110, height: 110, background: "rgba(74,16,28,0.02)", top: "38%", right: 40 }} />

        <div className="rfm-inner">

          {/* Back */}
          <button className="rfm-back block md:hidden" onClick={() => navigate(-1)}>
            <FiArrowLeft size={15} /> Back
          </button>

          {/* Header */}
          <div className="rfm-hdr">
            <div className="rfm-accent" />
            <div>
              <h1 className="rfm-title"><span>Select </span>Refund Method</h1>
              <p className="rfm-sub">Choose where you'd like to receive your refund</p>
            </div>
          </div>

          {/* Refund amount summary */}
          <div className="rfm-summary">
            <div>
              <p className="rfm-summary-label">Refund Amount</p>
              <p className="rfm-summary-amt">₹{refundAmount.toLocaleString("en-IN")}</p>
            </div>
            <div className="rfm-summary-right">
              <FiShield size={13} />
              Secured Refund
            </div>
          </div>

          {/* Info note */}
          <div className="rfm-note">
            <FiInfo size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            Refund will be processed within <strong style={{ margin: "0 3px" }}>5–7 business days</strong>
            after your return is picked up and verified by our team.
          </div>

          {/* Method selection */}
          <div className="rfm-card">
            <div className="rfm-card-hdr">
              <FiCreditCard size={13} /> Choose Refund Method
            </div>
            <div className="rfm-card-body">

              {/* ── Wallet ── */}
              <div
                className={`rfm-method${selected === "wallet" ? " active" : ""}`}
                onClick={() => setSelected("wallet")}
              >
                <div className="rfm-method-icon"><RiWalletLine size={20} /></div>
                <div className="rfm-method-text">
                  <p className="rfm-method-label">Store Wallet</p>
                  <p className="rfm-method-desc">Credited instantly to your in-app wallet</p>
                </div>
                <span className="rfm-method-badge rfm-badge-instant">
                  <FiZap size={8} style={{ display: "inline", marginRight: 3 }} />Instant
                </span>
                <div className="rfm-radio">
                  {selected === "wallet" && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Wallet expand */}
              <div className={`rfm-expand${selected === "wallet" ? " open" : ""}`}>
                <div className="rfm-wallet-box">
                  <div className="rfm-wallet-icon"><RiWalletLine size={20} /></div>
                  <div>
                    <p className="rfm-wallet-bal">Current Wallet Balance</p>
                    <p className="rfm-wallet-amt">₹240.00</p>
                    <p className="rfm-wallet-note">+ ₹{refundAmount.toLocaleString("en-IN")} will be added after approval</p>
                  </div>
                </div>
              </div>

              {/* ── Bank Transfer ── */}
              <div
                className={`rfm-method${selected === "bank" ? " active" : ""}`}
                onClick={() => setSelected("bank")}
              >
                <div className="rfm-method-icon"><RiBankLine size={20} /></div>
                <div className="rfm-method-text">
                  <p className="rfm-method-label">Bank Transfer</p>
                  <p className="rfm-method-desc">Direct transfer to your bank account</p>
                </div>
                <span className="rfm-method-badge rfm-badge-secure">
                  <FiShield size={8} style={{ display: "inline", marginRight: 3 }} />Secure
                </span>
                <div className="rfm-radio">
                  {selected === "bank" && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Bank form expand */}
              <div className={`rfm-expand${selected === "bank" ? " open" : ""}`}>
                <div className="rfm-form-grid">
                  <div className="rfm-field rfm-form-full">
                    <label className="rfm-label">Account Holder Name</label>
                    <input
                      className="rfm-input"
                      placeholder="As per bank records"
                      value={bank.accountHolder}
                      onChange={(e) => setBank({ ...bank, accountHolder: e.target.value })}
                    />
                  </div>
                  <div className="rfm-field">
                    <label className="rfm-label">Account Number</label>
                    <input
                      className={`rfm-input${bank.accountNumber && bank.accountNumber.length < 9 ? " error" : ""}`}
                      placeholder="Enter account number"
                      value={bank.accountNumber}
                      onChange={(e) => setBank({ ...bank, accountNumber: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>
                  <div className="rfm-field">
                    <label className="rfm-label">Confirm Account Number</label>
                    <input
                      className={`rfm-input${bank.confirmAccount && bank.confirmAccount !== bank.accountNumber ? " error" : bank.confirmAccount && bank.confirmAccount === bank.accountNumber ? " success" : ""}`}
                      placeholder="Re-enter account number"
                      value={bank.confirmAccount}
                      onChange={(e) => setBank({ ...bank, confirmAccount: e.target.value.replace(/\D/g, "") })}
                    />
                    {bank.confirmAccount && bank.confirmAccount !== bank.accountNumber && (
                      <span className="rfm-hint err">Account numbers do not match</span>
                    )}
                    {bank.confirmAccount && bank.confirmAccount === bank.accountNumber && (
                      <span className="rfm-hint ok">✓ Numbers match</span>
                    )}
                  </div>
                  <div className="rfm-field">
                    <label className="rfm-label">IFSC Code</label>
                    <input
                      className={`rfm-input${bank.ifsc && bank.ifsc.length !== 11 ? " error" : bank.ifsc.length === 11 ? " success" : ""}`}
                      placeholder="e.g. SBIN0001234"
                      maxLength={11}
                      value={bank.ifsc}
                      onChange={(e) => setBank({ ...bank, ifsc: e.target.value.toUpperCase() })}
                    />
                    <span className="rfm-hint">11-character code</span>
                  </div>
                  <div className="rfm-field rfm-form-full">
                    <label className="rfm-label">Bank Name</label>
                    <input
                      className="rfm-input"
                      placeholder="e.g. State Bank of India"
                      value={bank.bankName}
                      onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* ── UPI ── */}
              <div
                className={`rfm-method${selected === "upi" ? " active" : ""}`}
                onClick={() => setSelected("upi")}
              >
                <div className="rfm-method-icon"><FiSmartphone size={20} /></div>
                <div className="rfm-method-text">
                  <p className="rfm-method-label">UPI</p>
                  <p className="rfm-method-desc">Transfer directly to your UPI ID</p>
                </div>
                <span className="rfm-method-badge rfm-badge-instant">
                  <FiZap size={8} style={{ display: "inline", marginRight: 3 }} />Fast
                </span>
                <div className="rfm-radio">
                  {selected === "upi" && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* UPI expand */}
              <div className={`rfm-expand${selected === "upi" ? " open" : ""}`}>
                <div className="rfm-field">
                  <label className="rfm-label">UPI ID</label>
                  <div className="rfm-upi-row">
                    <input
                      className={`rfm-input${upiVerified === false ? " error" : upiVerified === true ? " success" : ""}`}
                      style={{ flex: 1 }}
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setUpiVerified(null);
                      }}
                    />
                    <button
                      className="rfm-verify-btn"
                      disabled={!upiId.includes("@") || verifying || upiVerified === true}
                      onClick={handleVerifyUpi}
                    >
                      {verifying ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur=".8s" repeatCount="indefinite"/>
                            </path>
                          </svg>
                          Verifying
                        </>
                      ) : upiVerified ? (
                        <><FiCheckCircle size={13} /> Verified</>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                  {upiVerified === true && (
                    <span className="rfm-hint ok">✓ UPI ID verified successfully</span>
                  )}
                  {upiVerified === false && (
                    <span className="rfm-hint err">Invalid UPI ID. Please check and try again.</span>
                  )}
                  {!upiVerified && (
                    <span className="rfm-hint">Supported: GPay, PhonePe, Paytm, BHIM & all UPI apps</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="rfm-footer">
            <button className="rfm-btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className="rfm-btn-submit"
              disabled={!canSubmit}
              onClick={handleRefund}
            >
              <FiCheckCircle size={15} />
              Confirm Refund Method
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default RefundMethodPage;