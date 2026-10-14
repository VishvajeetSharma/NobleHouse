import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSeller,
  suspendSeller,
  reactivateSeller,
} from "../../redux/sellerManagementSlice";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w: string) => w[0])
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
    flexWrap: "wrap",
    gap: 8,
  },
  pageTitle: { fontSize: 20, fontWeight: 600, color: "#241719", margin: 0, fontFamily: "'Cormorant Garamond', serif" },
  countBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    background: "#F1E8E2",
    color: "#4A101C",
    border: "1px solid #E7DCD7",
  },
  filtersRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    marginBottom: "1.25rem",
  },
  searchWrap: { position: "relative" as const },
  searchIcon: {
    position: "absolute" as const,
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 13,
    color: "#75676A",
    pointerEvents: "none" as const,
  },
  searchInput: {
    width: "100%",
    fontSize: 13,
    padding: "8px 12px 8px 34px",
    border: "1px solid #E7DCD7",
    borderRadius: 8,
    fontFamily: "inherit",
    color: "#241719",
    background: "#fff",
    boxSizing: "border-box" as const,
    outline: "none",
  },
  filterPills: { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  pill: {
    fontSize: 12,
    fontWeight: 400,
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid #E7DCD7",
    background: "#fff",
    color: "#75676A",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.12s",
  },
  pillActive: {
    fontSize: 12,
    fontWeight: 600,
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid #4A101C",
    background: "#4A101C",
    color: "#FAF7F2",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  resultCount: {
    fontSize: 12,
    color: "#75676A",
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    border: "1px solid #E7DCD7",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "0 2px 8px rgba(74, 16, 28, 0.04)",
  },
  cardSuspended: {
    background: "#fff",
    border: "1px solid #E7DCD7",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    opacity: 0.75,
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
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "#F1E8E2",
    color: "#4A101C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 600,
    flexShrink: 0,
    border: "1px solid #E7DCD7",
  },
  avatarSuspended: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "#f9fafb",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 600,
    flexShrink: 0,
  },
  headText: { flex: 1, minWidth: 0 },
  storeName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#111",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ownerName: { fontSize: 12, color: "#888", marginTop: 2 },
  badgeVerified: {
    fontSize: 10,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 20,
    background: "#f0fdf4",
    color: "#166534",
    border: "0.5px solid #86efac",
    flexShrink: 0,
    letterSpacing: "0.02em",
  },
  badgeSuspended: {
    fontSize: 10,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 20,
    background: "#fef2f2",
    color: "#b91c1c",
    border: "0.5px solid #fca5a5",
    flexShrink: 0,
    letterSpacing: "0.02em",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    borderBottom: "0.5px solid rgba(0,0,0,0.07)",
  },
  stat: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "10px 8px",
    borderRight: "0.5px solid rgba(0,0,0,0.07)",
  },
  statLast: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "10px 8px",
  },
  statValue: { fontSize: 16, fontWeight: 500, color: "#111" },
  statLabel: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 2,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  cardBody: { padding: "0.875rem 1.25rem", flex: 1 },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  infoKey: {
    color: "#aaa",
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  infoVal: {
    fontSize: 12,
    color: "#333",
    textAlign: "right" as const,
    maxWidth: "60%",
  },
  description: {
    fontSize: 12,
    color: "#888",
    lineHeight: 1.5,
    marginTop: 8,
    borderTop: "0.5px solid rgba(0,0,0,0.07)",
    paddingTop: 8,
  },
  suspendForm: {
    margin: "0 1.25rem 0.75rem",
    background: "#fef2f2",
    border: "0.5px solid #fca5a5",
    borderRadius: 8,
    padding: "0.75rem",
  },
  suspendLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#b91c1c",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    marginBottom: 6,
    display: "block",
  },
  suspendTextarea: {
    width: "100%",
    fontSize: 12,
    padding: "7px 9px",
    border: "0.5px solid #fca5a5",
    borderRadius: 6,
    fontFamily: "inherit",
    color: "#111",
    background: "#fff",
    resize: "none" as const,
    marginBottom: 8,
    boxSizing: "border-box" as const,
    outline: "none",
  },
  suspendTextareaError: {
    width: "100%",
    fontSize: 12,
    padding: "7px 9px",
    border: "0.5px solid #dc2626",
    borderRadius: 6,
    fontFamily: "inherit",
    color: "#111",
    background: "#fff",
    resize: "none" as const,
    marginBottom: 8,
    boxSizing: "border-box" as const,
    outline: "none",
  },
  suspendActions: { display: "flex", gap: 6 },
  cardFoot: {
    display: "flex",
    gap: 8,
    padding: "0.75rem 1.25rem",
    borderTop: "1px solid #E7DCD7",
    background: "#FAF7F2",
  },
  btnPrimary: {
    flex: 1,
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 12px",
    borderRadius: 8,
    cursor: "pointer",
    border: "1px solid #E7DCD7",
    background: "#fff",
    color: "#4A101C",
    fontFamily: "inherit",
    boxShadow: "0 1px 3px rgba(74, 16, 28, 0.05)",
  },
  btnDanger: {
    flex: 1,
    fontSize: 12,
    fontWeight: 500,
    padding: "7px 12px",
    borderRadius: 8,
    cursor: "pointer",
    border: "1px solid #E7DCD7",
    background: "#fff",
    color: "#B54745",
    fontFamily: "inherit",
  },
  btnSuccess: {
    flex: 1,
    fontSize: 12,
    fontWeight: 500,
    padding: "7px 12px",
    borderRadius: 8,
    cursor: "pointer",
    border: "0.5px solid #86efac",
    background: "#f0fdf4",
    color: "#166534",
    fontFamily: "inherit",
  },
  btnConfirm: {
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    border: "0.5px solid #fca5a5",
    background: "#fef2f2",
    color: "#b91c1c",
    fontFamily: "inherit",
  },
  btnCancel: {
    fontSize: 12,
    fontWeight: 400,
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    border: "0.5px solid rgba(0,0,0,0.12)",
    background: "none",
    color: "#777",
    fontFamily: "inherit",
  },
  empty: {
    textAlign: "center" as const,
    padding: "3rem 1rem",
    color: "#aaa",
    fontSize: 14,
  },
  emptyIcon: { fontSize: 28, marginBottom: 8 },
};

const VerifiedSellers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { verifiedSellers } = useSelector(
    (state: any) => state.sellerManagement,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [actionSellerId, setActionSellerId] = useState<string | null>(null);
  const [suspensionReason, setSuspensionReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/admin/login");
  }, [navigate]);

  const categories = [
    "all",
    ...Array.from(new Set(verifiedSellers.map((s: any) => s.category))),
  ];

  const filteredSellers = verifiedSellers.filter((seller: any) => {
    const matchesSearch =
      seller.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || seller.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewProducts = (seller: any) => {
    dispatch(selectSeller(seller));
    navigate(`/admin/seller-products/${seller.id}`);
  };

  const handleSuspend = (sellerId: string) => {
    if (!suspensionReason.trim()) {
      setReasonError(true);
      return;
    }
    dispatch(suspendSeller({ sellerId, reason: suspensionReason }));
    setSuspensionReason("");
    setActionSellerId(null);
    setReasonError(false);
  };

  const handleReactivate = (sellerId: string) => {
    dispatch(reactivateSeller(sellerId));
  };

  const startSuspend = (sellerId: string) => {
    setActionSellerId(sellerId);
    setSuspensionReason("");
    setReasonError(false);
  };

  const cancelSuspend = () => {
    setActionSellerId(null);
    setSuspensionReason("");
    setReasonError(false);
  };

  return (
    <div style={s.wrap}>
      {/* Page top */}
      <div style={s.pageTop}>
        <span style={s.pageTitle}>Verified sellers</span>
        {filteredSellers.length > 0 && (
          <span style={s.countBadge}>{filteredSellers.length} shown</span>
        )}
      </div>

      {/* Filters */}
      <div style={s.filtersRow}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            style={s.searchInput}
            type="text"
            placeholder="Search by store name or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={s.filterPills}>
          {categories.map((cat: any) => (
            <button
              key={cat}
              style={selectedCategory === cat ? s.pillActive : s.pill}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filteredSellers.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>🔍</div>
          <div>No sellers found — try adjusting your filters</div>
        </div>
      ) : (
        <div style={s.grid}>
          {filteredSellers.map((seller: any) => {
            const isSuspended = seller.status === "suspended";
            const isActioning = actionSellerId === seller.id;

            return (
              <div
                key={seller.id}
                style={isSuspended ? s.cardSuspended : s.card}
              >
                {/* Card header */}
                <div style={s.cardHead}>
                  <div style={isSuspended ? s.avatarSuspended : s.avatar}>
                    {getInitials(seller.storeName)}
                  </div>
                  <div style={s.headText}>
                    <div style={s.storeName}>{seller.storeName}</div>
                    <div style={s.ownerName}>{seller.fullName}</div>
                  </div>
                  <span
                    style={isSuspended ? s.badgeSuspended : s.badgeVerified}
                  >
                    {isSuspended ? "Suspended" : "Verified"}
                  </span>
                </div>

                {/* Stats */}
                <div style={s.statsRow}>
                  <div style={s.stat}>
                    <span style={s.statValue}>{seller.totalProducts || 0}</span>
                    <span style={s.statLabel}>Products</span>
                  </div>
                  <div style={s.stat}>
                    <span style={s.statValue}>{seller.totalOrders || 0}</span>
                    <span style={s.statLabel}>Orders</span>
                  </div>
                  <div style={s.statLast}>
                    <span style={s.statValue}>{seller.rating || "—"}</span>
                    <span style={s.statLabel}>Rating</span>
                  </div>
                </div>

                {/* Body */}
                <div style={s.cardBody}>
                  {[
                    { k: "Email", v: seller.email },
                    { k: "Phone", v: seller.phone },
                    { k: "Category", v: seller.category },
                  ].map(({ k, v }) => (
                    <div key={k} style={s.infoRow}>
                      <span style={s.infoKey}>{k}</span>
                      <span style={s.infoVal}>{v}</span>
                    </div>
                  ))}
                  {seller.storeDescription && (
                    <p style={s.description}>{seller.storeDescription}</p>
                  )}
                </div>

                {/* Suspension form */}
                {isActioning && (
                  <div style={s.suspendForm}>
                    <span style={s.suspendLabel}>Suspension reason</span>
                    <textarea
                      style={
                        reasonError ? s.suspendTextareaError : s.suspendTextarea
                      }
                      rows={3}
                      placeholder="Describe why this seller is being suspended..."
                      value={suspensionReason}
                      onChange={(e) => {
                        setSuspensionReason(e.target.value);
                        if (e.target.value.trim()) setReasonError(false);
                      }}
                    />
                    <div style={s.suspendActions}>
                      <button
                        style={s.btnConfirm}
                        onClick={() => handleSuspend(seller.id)}
                      >
                        Confirm suspension
                      </button>
                      <button style={s.btnCancel} onClick={cancelSuspend}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer actions */}
                <div style={s.cardFoot}>
                  {isSuspended ? (
                    <button
                      style={s.btnSuccess}
                      onClick={() => handleReactivate(seller.id)}
                    >
                      ✓ Reactivate
                    </button>
                  ) : (
                    <>
                      <button
                        style={s.btnPrimary}
                        onClick={() => handleViewProducts(seller)}
                      >
                        📦 View products
                      </button>
                      {!isActioning && (
                        <button
                          style={s.btnDanger}
                          onClick={() => startSuspend(seller.id)}
                        >
                          Suspend
                        </button>
                      )}
                    </>
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

export default VerifiedSellers;
