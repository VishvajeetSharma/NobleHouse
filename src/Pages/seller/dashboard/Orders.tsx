import { useState } from "react";
import { useSelector } from "react-redux";

type OrderStatus =
  | "placed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
type PaymentStatus = "paid" | "pending" | "failed";
type TabKey = "all" | OrderStatus;

interface Order {
  id: string;
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  amount?: number;
  totalAmount?: number;
  orderStatus?: OrderStatus;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  items?: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    quantity: number;
    size?: string;
  }[];
  date: string;
  createdAt?: string;
  estimatedDelivery?: string;
  trackingId?: string;
  tracking?: {
    currentLocation: string;
    timeline: any[];
  };
}

const STATUS_META: Record<
  OrderStatus,
  { label: string; bg: string; color: string; dot: string; accent: string }
> = {
  placed: {
    label: "Placed",
    bg: "#eef3fb",
    color: "#1a4d8a",
    dot: "#4a7fd4",
    accent: "#4a7fd4",
  },
  processing: {
    label: "Processing",
    bg: "#fdf6ea",
    color: "#8a5e1a",
    dot: "#c9a84c",
    accent: "#c9a84c",
  },
  shipped: {
    label: "Shipped",
    bg: "#f3eefb",
    color: "#4a1a8a",
    dot: "#9a6dd4",
    accent: "#9a6dd4",
  },
  delivered: {
    label: "Delivered",
    bg: "#edf7f2",
    color: "#1a7a4a",
    dot: "#4ab47a",
    accent: "#1a7a4a",
  },
  cancelled: {
    label: "Cancelled",
    bg: "#fdf0f0",
    color: "#a83232",
    dot: "#d44a4a",
    accent: "#a83232",
  },
};

const PAYMENT_META: Record<
  PaymentStatus,
  { label: string; bg: string; color: string }
> = {
  paid: { label: "Paid", bg: "#edf7f2", color: "#1a7a4a" },
  pending: { label: "Pending", bg: "#fdf6ea", color: "#8a5e1a" },
  failed: { label: "Failed", bg: "#fdf0f0", color: "#a83232" },
};

const TABS: TabKey[] = [
  "all",
  "placed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const fmtTime = (d: string) =>
  new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const S = {
  surface: {
    background: "#fdfcf8",
    border: "1px solid #edeae2",
  } as React.CSSProperties,
  mono: { fontFamily: "'JetBrains Mono', monospace" } as React.CSSProperties,
  serif: { fontFamily: "'DM Serif Display', serif" } as React.CSSProperties,
  sans: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const normalized = (status?.toLowerCase() ?? "placed") as OrderStatus;
  const m = STATUS_META[normalized] ?? STATUS_META["placed"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 9,
        padding: "2px 8px",
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

function PayBadge({ status }: { status: PaymentStatus }) {
  const normalized = (status?.toLowerCase() ?? "pending") as PaymentStatus;
  const m = PAYMENT_META[normalized] ?? PAYMENT_META["pending"];
  return (
    <span
      style={{
        fontSize: 9,
        padding: "2px 8px",
        borderRadius: 20,
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: m.bg,
        color: m.color,
      }}
    >
      {m.label}
    </span>
  );
}

const getOrderStatus = (order: Order): OrderStatus => {
  return (order.orderStatus || order.status || "placed") as OrderStatus;
};

const getTotalAmount = (order: Order): number => {
  return order.totalAmount || order.amount || 0;
};

const getCustomerName = (order: Order): string => {
  if (order.customerName) return order.customerName;

  if (order.items && order.items.length > 0) {
    return order.items[0].name.split(" ")[0] + "'s Order";
  }
  return "Customer";
};

const getCustomerPhone = (order: Order): string => {
  return order.customerPhone || "Not provided";
};

const getOrderDate = (order: Order): string => {
  return order.createdAt || order.date;
};

const getOrderId = (order: Order): string => {
  return order.orderId || order.id;
};

export default function OrdersComponent() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const ORDERS: Order[] = useSelector((state: any) => state.order.orders);
  console.log("ORDERS from Redux:", ORDERS);

  const COL_WIDTHS = "110px 160px 110px 100px 110px 80px 100px 90px";

  // Filter orders by tab + search
  const filteredOrders = (ORDERS || []).filter((order) => {
    const orderStatus = getOrderStatus(order);
    const matchesTab = activeTab === "all" || orderStatus === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      getOrderId(order).toLowerCase().includes(q) ||
      getCustomerName(order).toLowerCase().includes(q) ||
      getCustomerPhone(order).toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const countFor = (tab: TabKey) =>
    tab === "all"
      ? (ORDERS || []).length
      : (ORDERS || []).filter((o) => getOrderStatus(o) === tab).length;

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
          ...S.sans,
          color: "#0d0d0f",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>
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
                  ...S.serif,
                  fontSize: 28,
                  letterSpacing: -0.3,
                  margin: 0,
                  color: "#0d0d0f",
                }}
              >
                Orders Management
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: "#8e8e9a",
                  marginTop: 4,
                  fontWeight: 300,
                }}
              >
                Track and manage all your customer orders
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              ...S.surface,
              borderRadius: 14,
              padding: "16px 20px",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 14,
                alignItems: "center",
              }}
            >
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
                  placeholder="Search by Order ID, Customer name or phone..."
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 34px",
                    border: "1px solid #edeae2",
                    borderRadius: 9,
                    fontSize: 13,
                    color: "#0d0d0f",
                    background: "#f5f3ee",
                    ...S.sans,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

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
                const m = t !== "all" ? STATUS_META[t as OrderStatus] : null;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      ...S.sans,
                      fontSize: 12,
                      fontWeight: active ? 500 : 400,
                      whiteSpace: "nowrap",
                      transition: "all 0.15s",
                      background: active
                        ? t === "all"
                          ? "#0d0d0f"
                          : m!.bg
                        : "#f5f3ee",
                      color: active
                        ? t === "all"
                          ? "#fff"
                          : m!.color
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
                          background: m!.dot,
                        }}
                      />
                    )}
                    {t === "all" ? "All" : STATUS_META[t as OrderStatus].label}
                    <span
                      style={{
                        fontSize: 10,
                        padding: "1px 6px",
                        borderRadius: 20,
                        background: active
                          ? t === "all"
                            ? "rgba(255,255,255,0.2)"
                            : `${m!.dot}33`
                          : "#edeae2",
                        color: active
                          ? t === "all"
                            ? "#fff"
                            : m!.color
                          : "#8e8e9a",
                      }}
                    >
                      {countFor(t)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div style={{ ...S.surface, borderRadius: 14, overflow: "hidden" }}>
            {/* Table Head */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: COL_WIDTHS,
                padding: "12px 20px",
                background: "#f5f3ee",
                borderBottom: "1px solid #edeae2",
              }}
            >
              {[
                "Image",
                "Order ID",
                "Customer",
                "Date & Time",
                "Items",
                "Amount",
                "Payment",
                "Status",
                "",
              ].map((h) => (
                <div
                  key={h}
                  style={{
                    fontSize: 10,
                    color: "#8e8e9a",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table Body */}
            {filteredOrders.length === 0 ? (
              <div
                style={{
                  padding: "48px 20px",
                  textAlign: "center",
                  color: "#8e8e9a",
                  fontSize: 13,
                }}
              >
                No orders found
              </div>
            ) : (
              filteredOrders.map((order, i) => (
                <div
                  key={order.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: COL_WIDTHS,
                    padding: "14px 20px",
                    alignItems: "center",
                    borderBottom:
                      i < filteredOrders.length - 1
                        ? "1px solid #edeae2"
                        : "none",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background =
                      "#faf9f5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background =
                      "transparent")
                  }
                >
                  {/* Order ID */}
                  <div>
                    <img
                      src={
                        order.items && order.items.length > 0
                          ? order.items[0].image
                          : "https://via.placeholder.com/40"
                      }
                      alt="Product"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ ...S.mono, fontSize: 11, color: "#52525e" }}>
                    {getOrderId(order)}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#0d0d0f",
                      }}
                    >
                      {getCustomerName(order)}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#8e8e9a", marginTop: 1 }}
                    >
                      {getCustomerPhone(order)}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, color: "#0d0d0f" }}>
                      {fmtDate(getOrderDate(order))}
                    </div>
                    <div
                      style={{
                        ...S.mono,
                        fontSize: 10,
                        color: "#8e8e9a",
                        marginTop: 1,
                      }}
                    >
                      {fmtTime(getOrderDate(order))}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#0d0d0f",
                      }}
                    >
                      {order.items?.length || 1}
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div
                        style={{
                          fontSize: 10,
                          color: "#8e8e9a",
                          marginTop: 2,
                          maxWidth: 100,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={order.items[0].name}
                      >
                        {order.items[0].name}
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#8a5e1a",
                    }}
                  >
                    ₹{getTotalAmount(order).toLocaleString("en-IN")}
                  </div>

                  {/* Payment */}
                  <div>
                    <PayBadge status={order.paymentStatus || "pending"} />
                  </div>

                  {/* Status */}
                  <div>
                    <StatusBadge status={getOrderStatus(order)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
