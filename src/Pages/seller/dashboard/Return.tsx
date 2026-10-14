import { useState } from "react";

type ReturnStatus =
  | "pending"
  | "approved"
  | "picked_up"
  | "completed"
  | "rejected";
type ReturnType = "refund" | "replacement";
type ReturnReason =
  | "damaged"
  | "wrong_item"
  | "size_issue"
  | "quality_issue"
  | "changed_mind"
  | "other";

interface ReturnData {
  id: string;
  orderId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnReason: ReturnReason;
  returnReasonText?: string;
  quantity: number;
  amount: number;
  refundAmount: number;
  requestDate: string;
  status: ReturnStatus;
  returnType: ReturnType;
  remarks?: string;
  pickupDate?: string;
}

interface StatusMeta {
  label: string;
  bg: string;
  color: string;
  dot: string;
}

const RETURNS: ReturnData[] = [
  {
    id: "RET-1001",
    orderId: "#ORD-12345",
    productName: "Premium Cotton Kurti",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    customerPhone: "+91 98765 43210",
    returnReason: "size_issue",
    quantity: 1,
    amount: 2500,
    refundAmount: 2500,
    requestDate: "2024-01-15T10:30:00",
    status: "pending",
    returnType: "replacement",
    remarks: "Size M is too small, need L size",
  },
  {
    id: "RET-1002",
    orderId: "#ORD-12346",
    productName: "Men's Denim Jacket",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@example.com",
    customerPhone: "+91 98765 43211",
    returnReason: "damaged",
    quantity: 1,
    amount: 3500,
    refundAmount: 3500,
    requestDate: "2024-01-14T14:20:00",
    status: "approved",
    returnType: "refund",
    remarks: "Product arrived damaged",
    pickupDate: "2024-01-16",
  },
  {
    id: "RET-1003",
    orderId: "#ORD-12347",
    productName: "Silver Earrings Set",
    customerName: "Anita Singh",
    customerEmail: "anita@example.com",
    customerPhone: "+91 98765 43212",
    returnReason: "quality_issue",
    quantity: 2,
    amount: 1800,
    refundAmount: 1800,
    requestDate: "2024-01-13T09:15:00",
    status: "picked_up",
    returnType: "refund",
    pickupDate: "2024-01-15",
  },
  {
    id: "RET-1004",
    orderId: "#ORD-12348",
    productName: "Handmade Woolen Scarf",
    customerName: "Neha Gupta",
    customerEmail: "neha@example.com",
    customerPhone: "+91 98765 43213",
    returnReason: "changed_mind",
    quantity: 1,
    amount: 1200,
    refundAmount: 1080,
    requestDate: "2024-01-12T16:45:00",
    status: "completed",
    returnType: "refund",
    remarks: "Changed mind — 10% policy deduction applied",
  },
  {
    id: "RET-1005",
    orderId: "#ORD-12349",
    productName: "Leather Wallet",
    customerName: "Amit Patel",
    customerEmail: "amit@example.com",
    customerPhone: "+91 98765 43214",
    returnReason: "wrong_item",
    quantity: 1,
    amount: 899,
    refundAmount: 899,
    requestDate: "2024-01-11T11:00:00",
    status: "rejected",
    returnType: "replacement",
    remarks: "Return period expired",
  },
  {
    id: "RET-1006",
    orderId: "#ORD-12350",
    productName: "Cotton Bedsheet Set",
    customerName: "Sneha Reddy",
    customerEmail: "sneha@example.com",
    customerPhone: "+91 98765 43215",
    returnReason: "other",
    returnReasonText: "Color is different from images",
    quantity: 1,
    amount: 1499,
    refundAmount: 1499,
    requestDate: "2024-01-16T08:20:00",
    status: "pending",
    returnType: "refund",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number): string => `₹${Math.round(n).toLocaleString("en-IN")}`;
const fmtDate = (d: string): string =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const fmtDT = (d: string): string =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS_META: Record<ReturnStatus, StatusMeta> = {
  pending: {
    label: "Pending Review",
    bg: "#fdf6ea",
    color: "#8a5e1a",
    dot: "#c9a84c",
  },
  approved: {
    label: "Approved",
    bg: "#eef3fb",
    color: "#1a4d8a",
    dot: "#4a7fd4",
  },
  picked_up: {
    label: "Picked Up",
    bg: "#f3eefb",
    color: "#4a1a8a",
    dot: "#9a6dd4",
  },
  completed: {
    label: "Completed",
    bg: "#edf7f2",
    color: "#1a7a4a",
    dot: "#4ab47a",
  },
  rejected: {
    label: "Rejected",
    bg: "#fdf0f0",
    color: "#a83232",
    dot: "#d44a4a",
  },
};

const REASON_LABELS: Record<ReturnReason, string> = {
  damaged: "Product Damaged",
  wrong_item: "Wrong Item Received",
  size_issue: "Size Issue",
  quality_issue: "Quality Issue",
  changed_mind: "Changed Mind",
  other: "Other",
};

const TABS: (ReturnStatus | "all")[] = [
  "all",
  "pending",
  "approved",
  "picked_up",
  "completed",
  "rejected",
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function Badge({ status, small }: { status: ReturnStatus; small?: boolean }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: small ? 9 : 10,
        padding: small ? "2px 7px" : "3px 9px",
        borderRadius: 20,
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: m.bg,
        color: m.color,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: m.dot,
          flexShrink: 0,
        }}
      />
      {m.label}
    </span>
  );
}

function TypePill({ type }: { type: ReturnType }) {
  const isRefund = type === "refund";
  return (
    <span
      style={{
        fontSize: 9,
        padding: "2px 8px",
        borderRadius: 20,
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: isRefund ? "#f3eefb" : "#eef3fb",
        color: isRefund ? "#4a1a8a" : "#1a4d8a",
      }}
    >
      {type}
    </span>
  );
}

function KpiCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "#fdfcf8",
        border: "1px solid #edeae2",
        borderRadius: 14,
        padding: "20px 18px",
        flex: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: accent,
        }}
      />
      <div
        style={{
          fontSize: 10,
          color: "#8e8e9a",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: "#0d0d0f",
          margin: "6px 0 3px",
          letterSpacing: -0.5,
        }}
      >
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: "#8e8e9a" }}>{sub}</div>}
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 10,
          color: "#8e8e9a",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: highlight ? 22 : 13,
          fontWeight: highlight ? 400 : 500,
          color: highlight ? "#8a5e1a" : "#0d0d0f",
          fontFamily: highlight
            ? "'DM Serif Display', serif"
            : mono
              ? "'JetBrains Mono', monospace"
              : "'DM Sans', sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({
  ret,
  onClose,
}: {
  ret: ReturnData;
  onClose: () => void;
}) {
  const m = STATUS_META[ret.status];
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fdfcf8",
          borderRadius: 20,
          width: 680,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #edeae2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                color: "#0d0d0f",
              }}
            >
              Return Request Details
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#8e8e9a",
                marginTop: 3,
              }}
            >
              {ret.id} · {ret.orderId}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f5f3ee",
              border: "none",
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 15,
              color: "#52525e",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: 24 }}>
          {/* Status Banner */}
          <div
            style={{
              background: m.bg,
              border: `1px solid ${m.dot}44`,
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: m.color }}>
                Status: {m.label}
              </div>
              {ret.status === "pending" && (
                <div style={{ fontSize: 11, color: "#8e8e9a", marginTop: 2 }}>
                  Review this request and take action below
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {ret.status === "pending" && (
                <>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#1a7a4a",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#a83232",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Reject
                  </button>
                </>
              )}
              {ret.status === "approved" && (
                <button
                  style={{
                    padding: "8px 16px",
                    background: "#1a4d8a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Mark as Picked Up
                </button>
              )}
            </div>
          </div>

          {/* Two columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#8e8e9a",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 16,
                }}
              >
                Return Info
              </div>
              <InfoRow label="Return ID" value={ret.id} mono />
              <InfoRow label="Request Date" value={fmtDT(ret.requestDate)} />
              <InfoRow
                label="Return Reason"
                value={REASON_LABELS[ret.returnReason]}
              />
              {ret.returnReasonText && (
                <InfoRow label="Details" value={`"${ret.returnReasonText}"`} />
              )}
              <InfoRow
                label="Return Type"
                value={
                  ret.returnType.charAt(0).toUpperCase() +
                  ret.returnType.slice(1)
                }
              />
              {ret.remarks && <InfoRow label="Remarks" value={ret.remarks} />}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#8e8e9a",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 16,
                }}
              >
                Product & Amount
              </div>
              <InfoRow label="Product" value={ret.productName} />
              <InfoRow label="Order ID" value={ret.orderId} mono />
              <InfoRow
                label="Quantity"
                value={`${ret.quantity} unit${ret.quantity > 1 ? "s" : ""}`}
              />
              <InfoRow label="Original Amount" value={fmt(ret.amount)} />
              <InfoRow
                label="Refund Amount"
                value={fmt(ret.refundAmount)}
                highlight
              />
            </div>
          </div>

          {/* Customer */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#8e8e9a",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: 12,
              }}
            >
              Customer
            </div>
            <div
              style={{
                background: "#f5f3ee",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#c9a84c22,#c9a84c44)",
                  border: "1px solid #c9a84c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#c9a84c",
                  flexShrink: 0,
                }}
              >
                {ret.customerName.charAt(0)}
              </div>
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: "#0d0d0f" }}
                >
                  {ret.customerName}
                </div>
                <div style={{ fontSize: 12, color: "#52525e", marginTop: 2 }}>
                  {ret.customerEmail}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#8e8e9a",
                    marginTop: 2,
                  }}
                >
                  {ret.customerPhone}
                </div>
              </div>
            </div>
          </div>

          {/* Pickup */}
          {ret.pickupDate && (
            <div
              style={{
                background: "#eef3fb",
                border: "1px solid #4a7fd422",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1a4d8a",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 6,
                }}
              >
                Pickup Scheduled
              </div>
              <div style={{ fontSize: 14, color: "#0d0d0f" }}>
                📦 {fmtDate(ret.pickupDate)}
              </div>
            </div>
          )}

          <button
            style={{
              width: "100%",
              padding: 11,
              background: "#f5f3ee",
              border: "1px solid #edeae2",
              borderRadius: 10,
              fontSize: 13,
              color: "#52525e",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View Complete Timeline
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Return Card ──────────────────────────────────────────────────────────────
function ReturnCard({
  ret,
  onClick,
}: {
  ret: ReturnData;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        background: "#fdfcf8",
        border: "1px solid #edeae2",
        borderRadius: 14,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "box-shadow 0.18s",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                color: "#0d0d0f",
              }}
            >
              {ret.id}
            </span>
            <Badge status={ret.status} small />
            <TypePill type={ret.returnType} />
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#0d0d0f",
              marginBottom: 4,
            }}
          >
            {ret.productName}
          </div>
          <div style={{ fontSize: 12, color: "#8e8e9a", marginBottom: 2 }}>
            Order:{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {ret.orderId}
            </span>
            <span style={{ margin: "0 6px", color: "#edeae2" }}>·</span>
            {ret.customerName} · {ret.customerPhone}
          </div>
          <div style={{ fontSize: 12, color: "#52525e", marginTop: 4 }}>
            {REASON_LABELS[ret.returnReason]}
            {ret.returnReason === "other" && ret.returnReasonText
              ? ` — ${ret.returnReasonText}`
              : ""}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 22,
              color: "#8a5e1a",
            }}
          >
            {fmt(ret.refundAmount)}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#8e8e9a",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginTop: 2,
            }}
          >
            Refund Amount
          </div>
          <div style={{ fontSize: 11, color: "#8e8e9a", marginTop: 6 }}>
            {fmtDate(ret.requestDate)}
          </div>
          <div
            onClick={onClick}
            style={{
              fontSize: 12,
              color: "#c9a84c",
              marginTop: 6,
              fontWeight: 500,
            }}
          >
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SellerReturns() {
  const [activeTab, setActiveTab] = useState<ReturnStatus | "all">("all");
  const [selected, setSelected] = useState<ReturnData | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<ReturnType | "all">("all");

  const counts = TABS.reduce(
    (acc, t) => {
      acc[t] =
        t === "all"
          ? RETURNS.length
          : RETURNS.filter((r) => r.status === t).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalRefund = RETURNS.filter((r) => r.status !== "rejected").reduce(
    (s, r) => s + r.refundAmount,
    0,
  );
  const pendingRefund = RETURNS.filter((r) => r.status === "pending").reduce(
    (s, r) => s + r.refundAmount,
    0,
  );

  const filtered = RETURNS.filter((r) => {
    const tabOk = activeTab === "all" || r.status === activeTab;
    const typeOk = filterType === "all" || r.returnType === filterType;
    const q = search.toLowerCase();
    const srchOk =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.orderId.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q) ||
      r.customerPhone.includes(q);
    return tabOk && typeOk && srchOk;
  });

  const tabLabel = (t: string) => {
    if (t === "all") return "All";
    return STATUS_META[t as ReturnStatus]?.label || t;
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100vh",
          background: "#f5f3ee",
          fontFamily: "'DM Sans', sans-serif",
          color: "#0d0d0f",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 32,
              paddingBottom: 24,
              borderBottom: "1px solid #edeae2",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 28,
                  letterSpacing: -0.3,
                  margin: 0,
                }}
              >
                Returns &amp; Refunds
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: "#8e8e9a",
                  marginTop: 4,
                  fontWeight: 300,
                }}
              >
                Manage customer return requests and refunds
              </p>
            </div>
          </div>

          {/* KPI Row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <KpiCard
              label="Total Returns"
              value={counts.all}
              accent="#c9a84c"
            />
            <KpiCard
              label="Pending Requests"
              value={counts.pending}
              sub={fmt(pendingRefund)}
              accent="#a83232"
            />
            <KpiCard
              label="Completed"
              value={counts.completed}
              accent="#1a7a4a"
            />
            <KpiCard
              label="Total Refund Value"
              value={fmt(totalRefund)}
              accent="#1a4d8a"
            />
          </div>

          {/* Filters Bar */}
          <div
            style={{
              background: "#fdfcf8",
              border: "1px solid #edeae2",
              borderRadius: 14,
              padding: "16px 20px",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {/* Search */}
              <div style={{ flex: 1, position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 14,
                    color: "#8e8e9a",
                  }}
                >
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Return ID, Order, Customer, Product..."
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 34px",
                    border: "1px solid #edeae2",
                    borderRadius: 9,
                    fontSize: 13,
                    color: "#0d0d0f",
                    background: "#f5f3ee",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              {/* Type filter */}
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as ReturnType | "all")
                }
                style={{
                  padding: "9px 14px",
                  border: "1px solid #edeae2",
                  borderRadius: 9,
                  fontSize: 13,
                  color: "#0d0d0f",
                  background: "#f5f3ee",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Types</option>
                <option value="refund">Refund</option>
                <option value="replacement">Replacement</option>
              </select>
            </div>

            {/* Status Tabs */}
            <div
              style={{
                display: "flex",
                gap: 6,
                overflowX: "auto",
                paddingBottom: 2,
              }}
            >
              {TABS.map((t) => {
                const active = activeTab === t;
                const m = t !== "all" ? STATUS_META[t as ReturnStatus] : null;
                return (
                  <div
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: active ? 500 : 400,
                      whiteSpace: "nowrap",
                      transition: "all 0.15s",
                      background: active
                        ? t === "all"
                          ? "#0d0d0f"
                          : m?.bg
                        : "#f5f3ee",
                      color: active
                        ? t === "all"
                          ? "#fff"
                          : m?.color
                        : "#8e8e9a",
                      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    {t !== "all" && active && (
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: m?.dot,
                        }}
                      />
                    )}
                    {tabLabel(t)}
                    <span
                      style={{
                        fontSize: 10,
                        padding: "1px 6px",
                        borderRadius: 20,
                        background: active
                          ? t === "all"
                            ? "rgba(255,255,255,0.2)"
                            : `${m?.dot}33`
                          : "#edeae2",
                        color: active
                          ? t === "all"
                            ? "#fff"
                            : m?.color
                          : "#8e8e9a",
                      }}
                    >
                      {counts[t]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Return Cards */}
          {filtered.length > 0 ? (
            filtered.map((r) => (
              <ReturnCard key={r.id} ret={r} onClick={() => setSelected(r)} />
            ))
          ) : (
            <div
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 14,
                padding: 48,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 20,
                  color: "#52525e",
                  marginBottom: 6,
                }}
              >
                No return requests found
              </div>
              <div style={{ fontSize: 13, color: "#8e8e9a" }}>
                Try adjusting your filters or search term
              </div>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <DetailModal ret={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
