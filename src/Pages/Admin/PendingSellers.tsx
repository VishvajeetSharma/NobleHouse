import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { acceptSeller, rejectSeller } from "../../redux/sellerManagementSlice";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const s: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "1.5rem 0",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  pageTop: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  pageTitle: { fontSize: 20, fontWeight: 600, color: "#241719", fontFamily: "'Cormorant Garamond', serif" },
  countBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    background: "#F1E8E2",
    color: "#4A101C",
    border: "1px solid #E7DCD7",
  },
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: {
    background: "#fff",
    border: "1px solid #E7DCD7",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(74, 16, 28, 0.04)",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #E7DCD7",
    background: "#FAF7F2",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#F1E8E2",
    color: "#4A101C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
    border: "1px solid #E7DCD7",
  },
  headText: { flex: 1, minWidth: 0 },
  storeName: { fontSize: 15, fontWeight: 600, color: "#241719" },
  regDate: { fontSize: 12, color: "#75676A", marginTop: 2 },
  expandBtn: {
    fontSize: 18,
    lineHeight: 1,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    padding: "4px 8px",
    borderRadius: 6,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px 16px",
    padding: "1rem 1.25rem",
  },
  infoLabel: {
    fontSize: 11,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    display: "block",
    marginBottom: 2,
  },
  infoValue: { fontSize: 13, color: "#222", margin: 0 },
  expanded: {
    padding: "0 1.25rem 1rem",
    borderTop: "0.5px solid rgba(0,0,0,0.07)",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "1rem 0 6px",
  },
  sectionLabelDanger: {
    fontSize: 11,
    fontWeight: 500,
    color: "#b91c1c",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "1rem 0 6px",
  },
  description: { fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 },
  address: { fontSize: 13, color: "#777", marginTop: 6, lineHeight: 1.5 },
  link: { color: "#4A101C", textDecoration: "underline", fontWeight: 600 },
  docs: { display: "flex", flexWrap: "wrap", gap: 6 },
  docPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    border: "1px solid #E7DCD7",
    background: "#F1E8E2",
    borderRadius: 20,
    fontSize: 12,
    color: "#4A101C",
    fontWeight: 500,
  },
  rejectForm: { marginTop: 12 },
  textarea: {
    width: "100%",
    fontSize: 13,
    padding: "8px 10px",
    border: "1px solid #E7DCD7",
    borderRadius: 8,
    fontFamily: "inherit",
    color: "#241719",
    background: "#fff",
    resize: "none",
    marginBottom: 8,
    boxSizing: "border-box",
  },
  textareaError: {
    width: "100%",
    fontSize: 13,
    padding: "8px 10px",
    border: "1px solid #B54745",
    borderRadius: 8,
    fontFamily: "inherit",
    color: "#241719",
    background: "#fff",
    resize: "none",
    marginBottom: 8,
    boxSizing: "border-box",
  },
  rejectActions: { display: "flex", gap: 8 },
  cardFoot: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0.75rem 1.25rem",
    background: "#FAF7F2",
    borderTop: "1px solid #E7DCD7",
  },
  btnAccept: {
    fontSize: 13,
    fontWeight: 600,
    padding: "6px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: "1px solid #287653",
    background: "#287653",
    color: "#FAF7F2",
    fontFamily: "inherit",
  },
  btnReject: {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: "1px solid #E7DCD7",
    background: "#fff",
    color: "#B54745",
    fontFamily: "inherit",
  },
  btnConfirm: {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: "0.5px solid #fca5a5",
    background: "#fef2f2",
    color: "#b91c1c",
    fontFamily: "inherit",
  },
  btnCancel: {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: "0.5px solid rgba(0,0,0,0.15)",
    background: "none",
    color: "#777",
    fontFamily: "inherit",
  },
  empty: {
    textAlign: "center",
    padding: "3rem 1rem",
    color: "#aaa",
    fontSize: 14,
  },
};

const PendingSellers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pendingSellers } = useSelector(
    (state: any) => state.sellerManagement,
  );

  const [expandedSeller, setExpandedSeller] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/admin/login");
  }, [navigate]);

  const handleAccept = (sellerId: string) => {
    dispatch(acceptSeller(sellerId));
  };

  const handleStartReject = (sellerId: string) => {
    setRejectingId(sellerId);
    if (expandedSeller !== sellerId) setExpandedSeller(sellerId);
    setRejectionReason("");
    setReasonError(false);
  };

  const handleCancelReject = () => {
    setRejectingId(null);
    setRejectionReason("");
    setReasonError(false);
  };

  const handleConfirmReject = (sellerId: string) => {
    if (!rejectionReason.trim()) {
      setReasonError(true);
      return;
    }
    dispatch(rejectSeller({ sellerId, reason: rejectionReason }));
    setRejectingId(null);
    setRejectionReason("");
    setExpandedSeller(null);
  };

  const toggleExpand = (sellerId: string) => {
    setExpandedSeller((prev) => (prev === sellerId ? null : sellerId));
    if (rejectingId && rejectingId !== sellerId) {
      setRejectingId(null);
      setRejectionReason("");
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.pageTop}>
        <span style={s.pageTitle}>Pending seller approvals</span>
        {pendingSellers.length > 0 && (
          <span style={s.countBadge}>{pendingSellers.length} pending</span>
        )}
      </div>

      {pendingSellers.length === 0 ? (
        <div style={s.empty}>All applications have been reviewed</div>
      ) : (
        <div style={s.list}>
          {pendingSellers.map((seller: any) => {
            const isExp = expandedSeller === seller.id;
            const isRej = rejectingId === seller.id;

            return (
              <div key={seller.id} style={s.card}>
                {/* Header */}
                <div style={s.cardHead}>
                  <div style={s.avatar}>{getInitials(seller.fullName)}</div>
                  <div style={s.headText}>
                    <div style={s.storeName}>{seller.storeName}</div>
                    <div style={s.regDate}>
                      Registered {seller.registrationDate}
                    </div>
                  </div>
                  <button
                    style={s.expandBtn}
                    onClick={() => toggleExpand(seller.id)}
                    aria-label={isExp ? "Collapse" : "Expand"}
                  >
                    {isExp ? "−" : "+"}
                  </button>
                </div>

                {/* Info grid */}
                <div style={s.infoGrid}>
                  {[
                    { label: "Owner", value: seller.fullName },
                    { label: "Email", value: seller.email },
                    { label: "Phone", value: seller.phone },
                    { label: "Category", value: seller.category },
                    { label: "GST", value: seller.gstNumber },
                    { label: "PAN", value: seller.panNumber },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span style={s.infoLabel}>{label}</span>
                      <p style={s.infoValue}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Expanded details */}
                {isExp && (
                  <div style={s.expanded}>
                    <div style={s.sectionLabel}>Store details</div>
                    <p style={s.description}>{seller.storeDescription}</p>
                    <p style={s.address}>
                      {seller.address}, {seller.city}, {seller.state} —{" "}
                      {seller.pincode}
                      {seller.website && (
                        <>
                          {" · "}
                          <a
                            href={seller.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={s.link}
                          >
                            {seller.website}
                          </a>
                        </>
                      )}
                    </p>

                    {seller.documents?.length > 0 && (
                      <>
                        <div style={{ ...s.sectionLabel, marginTop: 12 }}>
                          Documents
                        </div>
                        <div style={s.docs}>
                          {seller.documents.map((doc: any, idx: number) => (
                            <span key={idx} style={s.docPill}>
                              📄 {doc.type}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Rejection form */}
                    {isRej && (
                      <div style={s.rejectForm}>
                        <div style={s.sectionLabelDanger}>Rejection reason</div>
                        <textarea
                          style={reasonError ? s.textareaError : s.textarea}
                          rows={3}
                          placeholder="Describe why this application is being rejected..."
                          value={rejectionReason}
                          onChange={(e) => {
                            setRejectionReason(e.target.value);
                            if (e.target.value.trim()) setReasonError(false);
                          }}
                        />
                        <div style={s.rejectActions}>
                          <button
                            style={s.btnConfirm}
                            onClick={() => handleConfirmReject(seller.id)}
                          >
                            Confirm rejection
                          </button>
                          <button
                            style={s.btnCancel}
                            onClick={handleCancelReject}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div style={s.cardFoot}>
                  <button
                    style={s.btnAccept}
                    onClick={() => handleAccept(seller.id)}
                  >
                    ✓ Accept
                  </button>
                  {!isRej && (
                    <button
                      style={s.btnReject}
                      onClick={() => handleStartReject(seller.id)}
                    >
                      ✗ Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PendingSellers;
