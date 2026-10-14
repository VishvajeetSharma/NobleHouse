import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Period = "week" | "month" | "year";
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Stats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  conversionRate: number;
  averageOrderValue: number;
  growthRate: {
    sales: number;
    orders: number;
    products: number;
    customers: number;
  };
}
interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
  items: number;
  paymentMethod: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const INITIAL_STATS: Stats = {
  totalSales: 1250000,
  totalOrders: 1234,
  totalProducts: 567,
  totalCustomers: 890,
  todaySales: 4200,
  todayOrders: 32,
  pendingOrders: 45,
  deliveredOrders: 1120,
  cancelledOrders: 69,
  conversionRate: 2.4,
  averageOrderValue: 1045,
  growthRate: { sales: 12, orders: 8, products: 5, customers: 18 },
};

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "#ORD-12345",
    customer: "Priya Sharma",
    amount: 2500,
    status: "delivered",
    date: "2024-01-15",
    items: 3,
    paymentMethod: "UPI",
  },
  {
    id: "#ORD-12346",
    customer: "Rajesh Kumar",
    amount: 1800,
    status: "shipped",
    date: "2024-01-14",
    items: 2,
    paymentMethod: "Card",
  },
  {
    id: "#ORD-12347",
    customer: "Anita Singh",
    amount: 3200,
    status: "processing",
    date: "2024-01-14",
    items: 4,
    paymentMethod: "COD",
  },
  {
    id: "#ORD-12348",
    customer: "Neha Gupta",
    amount: 4500,
    status: "pending",
    date: "2024-01-13",
    items: 5,
    paymentMethod: "UPI",
  },
  {
    id: "#ORD-12349",
    customer: "Amit Patel",
    amount: 1200,
    status: "delivered",
    date: "2024-01-13",
    items: 1,
    paymentMethod: "Card",
  },
];

const WEEKLY_DATA = [
  { d: "Mon", sales: 12500, orders: 42 },
  { d: "Tue", sales: 15200, orders: 48 },
  { d: "Wed", sales: 11800, orders: 38 },
  { d: "Thu", sales: 16800, orders: 52 },
  { d: "Fri", sales: 19200, orders: 58 },
  { d: "Sat", sales: 22500, orders: 65 },
  { d: "Sun", sales: 20800, orders: 60 },
];
const MONTHLY_DATA = [
  { d: "Oct", sales: 85000, orders: 280 },
  { d: "Nov", sales: 92000, orders: 310 },
  { d: "Dec", sales: 125000, orders: 420 },
  { d: "Jan", sales: 145000, orders: 480 },
];
const YEARLY_DATA = [
  { d: "Jan", sales: 95000, orders: 320 },
  { d: "Feb", sales: 88000, orders: 290 },
  { d: "Mar", sales: 102000, orders: 340 },
  { d: "Apr", sales: 115000, orders: 380 },
  { d: "May", sales: 125000, orders: 420 },
  { d: "Jun", sales: 118000, orders: 390 },
];
const CATEGORY_DATA = [
  { name: "Clothing", value: 45, color: "#c9a84c" },
  { name: "Electronics", value: 25, color: "#4a7fd4" },
  { name: "Jewelry", value: 15, color: "#9a6dd4" },
  { name: "Accessories", value: 15, color: "#4ab47a" },
];

const STATUS_META: Record<
  OrderStatus,
  { label: string; bg: string; color: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "#fdf6ea",
    color: "#8a5e1a",
    dot: "#c9a84c",
  },
  processing: {
    label: "Processing",
    bg: "#eef3fb",
    color: "#1a4d8a",
    dot: "#4a7fd4",
  },
  shipped: {
    label: "Shipped",
    bg: "#f3eefb",
    color: "#4a1a8a",
    dot: "#9a6dd4",
  },
  delivered: {
    label: "Delivered",
    bg: "#edf7f2",
    color: "#1a7a4a",
    dot: "#4ab47a",
  },
  cancelled: {
    label: "Cancelled",
    bg: "#fdf0f0",
    color: "#a83232",
    dot: "#d44a4a",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

const S = {
  serif: { fontFamily: "'DM Serif Display', serif" } as React.CSSProperties,
  mono: { fontFamily: "'JetBrains Mono', monospace" } as React.CSSProperties,
  sans: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
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
        style={{ width: 5, height: 5, borderRadius: "50%", background: m.dot }}
      />
      {m.label}
    </span>
  );
}

function GrowthTag({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        fontWeight: 600,
        color: up ? "#1a7a4a" : "#a83232",
      }}
    >
      {up ? "↑" : "↓"}
      {Math.abs(value)}%
      <span style={{ fontSize: 10, color: "#8e8e9a", fontWeight: 400 }}>
        vs last month
      </span>
    </span>
  );
}

// Main KPI Card
function KpiCard({
  label,
  value,
  growth,
  accent,
  sub,
  onClick,
}: {
  label: string;
  value: string | number;
  growth?: number;
  accent: string;
  sub?: string;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fdfcf8",
        border: "1px solid #edeae2",
        borderRadius: 16,
        padding: "22px 20px",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: hov
          ? "0 8px 32px rgba(0,0,0,0.1)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-2px)" : "none",
      }}
    >
      {/* accent bar */}
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
      {/* hover glow */}
      <div
        style={{
          position: "absolute",
          bottom: -30,
          right: -30,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `${accent}18`,
          transition: "opacity 0.2s",
          opacity: hov ? 1 : 0,
        }}
      />
      <div
        style={{
          fontSize: 10,
          color: "#8e8e9a",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...S.serif,
          fontSize: 28,
          color: "#0d0d0f",
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "#8e8e9a", marginBottom: 4 }}>
          {sub}
        </div>
      )}
      {growth !== undefined && <GrowthTag value={growth} />}
    </div>
  );
}

// Today highlight card (colored)
function TodayCard({
  label,
  value,
  sub,
  gradient,
}: {
  label: string;
  value: string;
  sub: string;
  gradient: string;
}) {
  return (
    <div
      style={{
        background: gradient,
        borderRadius: 14,
        padding: "18px 20px",
        color: "#0d0d0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.06)",
        }}
      />
      <div
        style={{
          fontSize: 10,
          color: "rgba(0,0,0,0.5)",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...S.serif,
          fontSize: 24,
          color: "#0d0d0f",
          letterSpacing: -0.3,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", marginTop: 6 }}>
        {sub}
      </div>
    </div>
  );
}

// Custom chart tooltip
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d0d0f",
        border: "none",
        borderRadius: 10,
        padding: "10px 14px",
      }}
    >
      <div style={{ fontSize: 10, color: "#8e8e9a", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ ...S.serif, fontSize: 18, color: "#c9a84c" }}>
        {fmt(payload[0].value)}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardComponent() {
  const [period, setPeriod] = useState<Period>("month");
  const [showBalance, setShowBalance] = useState(true);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);

  // simulate live data
  useEffect(() => {
    const id = setInterval(() => {
      setStats((p) => ({
        ...p,
        todaySales: p.todaySales + Math.floor(Math.random() * 100),
        todayOrders: p.todayOrders + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const salesData =
    period === "week"
      ? WEEKLY_DATA
      : period === "month"
        ? MONTHLY_DATA
        : YEARLY_DATA;
  const completionRate = (
    (stats.deliveredOrders / stats.totalOrders) *
    100
  ).toFixed(1);

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

      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .dash-page { animation: fadeSlideUp 0.4s ease both; }
        .row-hover:hover { background:#f5f3ee !important; }
        .action-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.08); }
        .action-btn { transition: transform 0.18s, box-shadow 0.18s; }
      `}</style>

      <div
        className="dash-page"
        style={{
          minHeight: "100vh",
          background: "#f5f3ee",
          ...S.sans,
          color: "#0d0d0f",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 20px" }}>
          {/* ── Header ── */}
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
              <div
                style={{
                  fontSize: 11,
                  color: "#8e8e9a",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Seller Dashboard
              </div>
              <h1
                style={{
                  ...S.serif,
                  fontSize: 30,
                  letterSpacing: -0.4,
                  margin: 0,
                }}
              >
                Welcome back,{" "}
                <span style={{ color: "#c9a84c" }}>Viraj</span>{" "}
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: "#8e8e9a",
                  marginTop: 4,
                  fontWeight: 300,
                }}
              >
                Here's what's happening with your store today
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* period selector */}
              <div
                style={{
                  display: "flex",
                  background: "#edeae2",
                  borderRadius: 10,
                  padding: 3,
                }}
              >
                {(["week", "month", "year"] as Period[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      ...S.sans,
                      fontSize: 12,
                      fontWeight: period === p ? 500 : 400,
                      background: period === p ? "#fdfcf8" : "transparent",
                      color: period === p ? "#0d0d0f" : "#8e8e9a",
                      boxShadow:
                        period === p ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.15s",
                      textTransform: "capitalize",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  background: "#fdfcf8",
                  border: "1px solid #edeae2",
                  borderRadius: 9,
                  fontSize: 12,
                  color: "#52525e",
                  cursor: "pointer",
                  ...S.sans,
                }}
              >
                ↓ Export
              </button>
            </div>
          </div>

          {/* ── KPI Row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <KpiCard
              label="Total Sales"
              value={showBalance ? fmt(stats.totalSales) : "₹ ••••••"}
              growth={stats.growthRate.sales}
              accent="#c9a84c"
              sub={
                (
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: 11,
                      color: "#8e8e9a",
                    }}
                    onClick={() => setShowBalance((s) => !s)}
                  >
                    {showBalance ? "Hide" : "Show"}
                  </span>
                ) as any
              }
            />
            <KpiCard
              label="Total Orders"
              value={stats.totalOrders}
              growth={stats.growthRate.orders}
              accent="#4a7fd4"
            />
            <KpiCard
              label="Products"
              value={stats.totalProducts}
              growth={stats.growthRate.products}
              accent="#4ab47a"
            />
            <KpiCard
              label="Customers"
              value={stats.totalCustomers}
              growth={stats.growthRate.customers}
              accent="#9a6dd4"
            />
          </div>

          {/* ── Today strip ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <TodayCard
              label="Today's Sales"
              value={fmt(stats.todaySales)}
              sub="↑ 12% from yesterday"
              gradient="linear-gradient(135deg,#fdf6ea,#fce8b6)"
            />
            <TodayCard
              label="Today's Orders"
              value={String(stats.todayOrders)}
              sub="↑ 8% from yesterday"
              gradient="linear-gradient(135deg,#eef3fb,#c8daf5)"
            />
            <TodayCard
              label="Avg. Order Value"
              value={fmt(stats.averageOrderValue)}
              sub="↑ 5% from last month"
              gradient="linear-gradient(135deg,#edf7f2,#b8e8cc)"
            />
            <TodayCard
              label="Conversion Rate"
              value={`${stats.conversionRate}%`}
              sub="Target: 3%"
              gradient="linear-gradient(135deg,#f3eefb,#d8c8f0)"
            />
          </div>

          {/* ── Charts Row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Area chart */}
            <div
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div>
                  <div style={{ ...S.serif, fontSize: 18, color: "#0d0d0f" }}>
                    Sales Overview
                  </div>
                  <div style={{ fontSize: 12, color: "#8e8e9a", marginTop: 2 }}>
                    Revenue trends for selected period
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart
                  data={salesData}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#c9a84c"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#edeae2"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="d"
                    tick={{ fontSize: 10, fill: "#8e8e9a" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#8e8e9a" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#c9a84c"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#grad)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#c9a84c", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  ...S.serif,
                  fontSize: 18,
                  color: "#0d0d0f",
                  marginBottom: 4,
                }}
              >
                By Category
              </div>
              <div style={{ fontSize: 12, color: "#8e8e9a", marginBottom: 16 }}>
                Sales distribution
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {CATEGORY_DATA.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [`${v}%`, ""]}
                    contentStyle={{
                      background: "#0d0d0f",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {CATEGORY_DATA.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: c.color,
                        }}
                      />
                      <span style={{ color: "#52525e" }}>{c.name}</span>
                    </div>
                    <span
                      style={{
                        ...S.mono,
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#0d0d0f",
                      }}
                    >
                      {c.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Order Status */}
            <div
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  ...S.serif,
                  fontSize: 18,
                  color: "#0d0d0f",
                  marginBottom: 20,
                }}
              >
                Order Status
              </div>
              {[
                {
                  label: "Delivered",
                  count: stats.deliveredOrders,
                  dot: "#4ab47a",
                  pct: "+12%",
                },
                {
                  label: "Pending",
                  count: stats.pendingOrders,
                  dot: "#c9a84c",
                  pct: "+5%",
                },
                {
                  label: "Cancelled",
                  count: stats.cancelledOrders,
                  dot: "#d44a4a",
                  pct: "-2%",
                },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: r.dot,
                      }}
                    />
                    <span style={{ fontSize: 13, color: "#52525e" }}>
                      {r.label}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ ...S.serif, fontSize: 16 }}>{r.count}</span>
                    <span
                      style={{
                        fontSize: 10,
                        color: r.pct.startsWith("-") ? "#a83232" : "#1a7a4a",
                      }}
                    >
                      {r.pct}
                    </span>
                  </div>
                </div>
              ))}
              {/* completion bar */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid #edeae2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#8e8e9a",
                    marginBottom: 6,
                  }}
                >
                  <span>Completion rate</span>
                  <span style={{ fontWeight: 600, color: "#1a7a4a" }}>
                    {completionRate}%
                  </span>
                </div>
                <div
                  style={{ background: "#edeae2", borderRadius: 99, height: 3 }}
                >
                  <div
                    style={{
                      width: `${completionRate}%`,
                      background: "#4ab47a",
                      height: 3,
                      borderRadius: 99,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #edeae2",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ ...S.serif, fontSize: 18, color: "#0d0d0f" }}>
                  Recent Orders
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "#c9a84c",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  View All →
                </span>
              </div>
              {RECENT_ORDERS.map((o, i) => (
                <div
                  key={o.id}
                  className="row-hover"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr auto auto",
                    gap: 16,
                    alignItems: "center",
                    padding: "14px 24px",
                    borderBottom:
                      i < RECENT_ORDERS.length - 1
                        ? "1px solid #f5f3ee"
                        : "none",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      ...S.mono,
                      fontSize: 11,
                      color: "#0d0d0f",
                      fontWeight: 500,
                    }}
                  >
                    {o.id}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#0d0d0f",
                      }}
                    >
                      {o.customer}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#8e8e9a", marginTop: 1 }}
                    >
                      {o.items} items · {o.paymentMethod}
                    </div>
                  </div>
                  <div>
                    <StatusBadge status={o.status} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ ...S.serif, fontSize: 17, color: "#0d0d0f" }}>
                      {fmt(o.amount)}
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#8e8e9a", marginTop: 1 }}
                    >
                      {fmtDate(o.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Live indicator ── */}
    </>
  );
}
