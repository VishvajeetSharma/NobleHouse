import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHLY_DATA = [
  {
    month: "February 2025",
    short: "Feb",
    neft: "SCBLN5202503001",
    settledOn: "1 Mar 2025",
    grossSales: 15900,
    returns: 480,
    commission: 1590,
    adsCost: 390,
    netPayout: 13440,
    returnCount: 1,
    orders: [
      {
        id: "#ORD-11201",
        customer: "Priya Sharma",
        amount: 2500,
        status: "paid",
        returnStatus: null,
        date: "2025-02-05",
      },
      {
        id: "#ORD-11202",
        customer: "Amit Patel",
        amount: 1800,
        status: "paid",
        returnStatus: null,
        date: "2025-02-08",
      },
      {
        id: "#ORD-11203",
        customer: "Neha Gupta",
        amount: 3200,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-02-10",
      },
      {
        id: "#ORD-11204",
        customer: "Rajesh Kumar",
        amount: 4500,
        status: "paid",
        returnStatus: null,
        date: "2025-02-18",
      },
      {
        id: "#ORD-11205",
        customer: "Sunita Verma",
        amount: 3900,
        status: "paid",
        returnStatus: null,
        date: "2025-02-24",
      },
    ],
  },
  {
    month: "March 2025",
    short: "Mar",
    neft: "SCBLN5202504001",
    settledOn: "1 Apr 2025",
    grossSales: 19450,
    returns: 1164,
    commission: 1945,
    adsCost: 555,
    netPayout: 16286,
    returnCount: 3,
    orders: [
      {
        id: "#ORD-11301",
        customer: "Kiran Mehta",
        amount: 2100,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-03-02",
      },
      {
        id: "#ORD-11302",
        customer: "Deepak Joshi",
        amount: 5600,
        status: "paid",
        returnStatus: null,
        date: "2025-03-07",
      },
      {
        id: "#ORD-11303",
        customer: "Anita Singh",
        amount: 1800,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-03-12",
      },
      {
        id: "#ORD-11304",
        customer: "Mohit Yadav",
        amount: 3300,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-03-15",
      },
      {
        id: "#ORD-11305",
        customer: "Pooja Tiwari",
        amount: 6650,
        status: "paid",
        returnStatus: null,
        date: "2025-03-22",
      },
    ],
  },
  {
    month: "April 2025",
    short: "Apr",
    neft: "SCBLN5202505001",
    settledOn: "1 May 2025",
    grossSales: 17800,
    returns: 890,
    commission: 1780,
    adsCost: 334,
    netPayout: 15200,
    returnCount: 2,
    orders: [
      {
        id: "#ORD-11401",
        customer: "Ravi Shankar",
        amount: 3400,
        status: "paid",
        returnStatus: null,
        date: "2025-04-03",
      },
      {
        id: "#ORD-11402",
        customer: "Meena Rawat",
        amount: 890,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-04-09",
      },
      {
        id: "#ORD-11403",
        customer: "Suresh Nair",
        amount: 4200,
        status: "paid",
        returnStatus: null,
        date: "2025-04-14",
      },
      {
        id: "#ORD-11404",
        customer: "Kavita Pandey",
        amount: 5800,
        status: "paid",
        returnStatus: null,
        date: "2025-04-19",
      },
      {
        id: "#ORD-11405",
        customer: "Arjun Malhotra",
        amount: 3510,
        status: "returned",
        returnStatus: "deducted",
        date: "2025-04-25",
      },
    ],
  },
];

const fmt = (n: any) => "₹" + Math.round(n).toLocaleString("en-IN");

const fmtDate = (d: any) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BADGE = {
  paid: { bg: "#EAF3DE", color: "#3B6D11", label: "Paid" },
  returned: { bg: "#FCEBEB", color: "#A32D2D", label: "Returned" },
  hold: { bg: "#FAEEDA", color: "#854F0B", label: "On Hold" },
  deducted: { bg: "#FCEBEB", color: "#A32D2D", label: "Deducted" },
} as const;

type BadgeType = keyof typeof BADGE;

function Badge({ type }: { type: BadgeType }) {
  const s = BADGE[type] || BADGE.hold;

  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 10,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 20,
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

function TrendBadge({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: up ? "#3B6D11" : "#A32D2D",
      }}
    >
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}% vs prev
    </span>
  );
}

function SummaryRow({
  label,
  value,
  color,
  border,
}: {
  label: string;
  value: string;
  color?: string;
  border?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: border ? "1px solid #edeae2" : "none",
      }}
    >
      <span style={{ fontSize: 13, color: "#52525e" }}>{label}</span>
      <span
        style={{ fontSize: 13, fontWeight: 500, color: color || "#0d0d0f" }}
      >
        {value}
      </span>
    </div>
  );
}

function MonthCard({
  data,
  index,
}: {
  data: any;
  index: number;
  totalMonths: number;
}) {
  const [open, setOpen] = useState(false);
  const prev = index > 0 ? MONTHLY_DATA[index - 1] : null;
  const trend = prev
    ? ((data.netPayout - prev.netPayout) / prev.netPayout) * 100
    : null;

  return (
    <div
      style={{
        background: "#fdfcf8",
        border: "1px solid #edeae2",
        borderRadius: 14,
        marginBottom: 14,
        overflow: "hidden",
      }}
    >
      {/* Month Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          cursor: "pointer",
          background: open ? "#f5f3ee" : "#fdfcf8",
          borderBottom: open ? "1px solid #edeae2" : "none",
          transition: "background 0.15s",
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#0d0d0f" }}>
            {data.month}
          </div>
          <div style={{ fontSize: 11, color: "#8e8e9a", marginTop: 3 }}>
            Settled {data.settledOn} · NEFT: {data.neft}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1a7a4a" }}>
              {fmt(data.netPayout)}
            </div>
            {trend !== null && <TrendBadge value={trend} />}
          </div>
          <span
            style={{
              fontSize: 16,
              color: "#8e8e9a",
              transform: open ? "rotate(180deg)" : "none",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {open && (
        <div style={{ padding: "18px 20px" }}>
          {/* Breakdown */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <div>
              <SummaryRow
                label="Gross Sales"
                value={fmt(data.grossSales)}
                color="#0d0d0f"
                border
              />
              <SummaryRow
                label="Returns Deducted"
                value={`−${fmt(data.returns)}`}
                color="#a83232"
                border
              />
              <SummaryRow
                label="Platform Commission (10%)"
                value={`−${fmt(data.commission)}`}
                color="#a83232"
                border
              />
              <SummaryRow
                label="Ads Cost"
                value={`−${fmt(data.adsCost)}`}
                color="#a83232"
                border={false}
              />
            </div>
            <div
              style={{
                background: "#f5f3ee",
                borderRadius: 10,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#8e8e9a",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Net Settled
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#1a7a4a",
                  margin: "8px 0 4px",
                }}
              >
                {fmt(data.netPayout)}
              </div>
              <div style={{ fontSize: 11, color: "#8e8e9a" }}>
                {data.returnCount} return{data.returnCount !== 1 ? "s" : ""} in
                this period
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#0d0d0f",
              marginBottom: 10,
            }}
          >
            Orders ({data.orders.length})
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
            >
              <thead>
                <tr style={{ background: "#f5f3ee" }}>
                  {[
                    "Order ID",
                    "Customer",
                    "Date",
                    "Amount",
                    "Status",
                    "Return",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontSize: 10,
                        color: "#8e8e9a",
                        textTransform: "uppercase",
                        letterSpacing: "0.4px",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o: any) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #f5f3ee" }}>
                    <td
                      style={{
                        padding: "10px 10px",
                        fontFamily: "monospace",
                        color: "#52525e",
                      }}
                    >
                      {o.id}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        fontWeight: 500,
                        color: "#0d0d0f",
                      }}
                    >
                      {o.customer}
                    </td>
                    <td style={{ padding: "10px 10px", color: "#8e8e9a" }}>
                      {fmtDate(o.date)}
                    </td>
                    <td style={{ padding: "10px 10px", fontWeight: 500 }}>
                      {fmt(o.amount)}
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <Badge type={o.status} />
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      {o.returnStatus ? (
                        <Badge type={o.returnStatus} />
                      ) : (
                        <span style={{ color: "#c0bdb5" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const chartData = MONTHLY_DATA.map((m) => ({
  name: m.short,
  "Gross Sales": m.grossSales,
  "Net Settled": m.netPayout,
  Deductions: m.returns + m.commission + m.adsCost,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fdfcf8",
          border: "1px solid #edeae2",
          borderRadius: 10,
          padding: "12px 16px",
          fontSize: 12,
        }}
      >
        <div style={{ fontWeight: 500, marginBottom: 6, color: "#0d0d0f" }}>
          {label}
        </div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color, marginBottom: 3 }}>
            {p.name}: {fmt(p.value)}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PaymentReport3Month() {
  const totalGross = MONTHLY_DATA.reduce((s, m) => s + m.grossSales, 0);
  const totalReturns = MONTHLY_DATA.reduce((s, m) => s + m.returns, 0);
  const totalCommission = MONTHLY_DATA.reduce((s, m) => s + m.commission, 0);
  const totalNet = MONTHLY_DATA.reduce((s, m) => s + m.netPayout, 0);
  const totalReturnCount = MONTHLY_DATA.reduce((s, m) => s + m.returnCount, 0);

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
              marginBottom: 28,
              paddingBottom: 22,
              borderBottom: "1px solid #edeae2",
            }}
          >
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 26,
                letterSpacing: -0.3,
                margin: 0,
                color: "#0d0d0f",
              }}
            >
              Payment Report
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#8e8e9a",
                marginTop: 4,
                fontWeight: 300,
              }}
            >
              February 2025 – April 2025 · 15-day return hold policy
            </p>
          </div>

          {/* KPI Cards */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Total Gross Sales",
                value: fmt(totalGross),
                sub: "3 months",
                color: "#1a7a4a",
              },
              {
                label: "Returns Deducted",
                value: `−${fmt(totalReturns)}`,
                sub: `${totalReturnCount} orders`,
                color: "#a83232",
              },
              {
                label: "Commission Paid",
                value: `−${fmt(totalCommission)}`,
                sub: "10% platform fee",
                color: "#a83232",
              },
              {
                label: "Total Net Settled",
                value: fmt(totalNet),
                sub: "3 payouts",
                color: "#1a7a4a",
              },
            ].map((k) => (
              <div
                key={k.label}
                style={{
                  background: "#fdfcf8",
                  border: "1px solid #edeae2",
                  borderRadius: 13,
                  padding: "18px 16px",
                  flex: "1 1 160px",
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
                    background: k.color,
                  }}
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "#8e8e9a",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {k.label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 22,
                    color: "#0d0d0f",
                    margin: "6px 0 3px",
                  }}
                >
                  {k.value}
                </div>
                <div style={{ fontSize: 11, color: k.color }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            style={{
              background: "#fdfcf8",
              border: "1px solid #edeae2",
              borderRadius: 14,
              padding: "20px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#0d0d0f",
                marginBottom: 16,
              }}
            >
              Monthly revenue overview
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                gap: 18,
                marginBottom: 14,
                fontSize: 12,
                color: "#52525e",
                flexWrap: "wrap",
              }}
            >
              {[
                { color: "#639922", label: "Gross Sales" },
                { color: "#378ADD", label: "Net Settled" },
                { color: "#E24B4A", label: "Deductions" },
              ].map((l) => (
                <span
                  key={l.label}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: l.color,
                      display: "inline-block",
                    }}
                  />
                  {l.label}
                </span>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#edeae2"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#8e8e9a" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#8e8e9a" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#f5f3ee" }}
                />
                <Bar
                  dataKey="Gross Sales"
                  fill="#639922"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Net Settled"
                  fill="#378ADD"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Deductions"
                  fill="#E24B4A"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Month Cards */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#0d0d0f",
              marginBottom: 14,
            }}
          >
            Month-wise details (click to expand)
          </div>
          {[...MONTHLY_DATA].reverse().map((m, i) => (
            <MonthCard
              key={m.month}
              data={m}
              index={MONTHLY_DATA.length - 1 - i}
              totalMonths={MONTHLY_DATA.length}
            />
          ))}

          {/* Footer note */}
          <div
            style={{
              marginTop: 20,
              padding: "14px 18px",
              background: "#FAEEDA",
              borderLeft: "3px solid #EF9F27",
              borderRadius: "0 10px 10px 0",
              fontSize: 12,
              color: "#854F0B",
            }}
          >
            15-day return window policy: Delivered orders are held for 15 days
            before being included in the next monthly payout cycle. Returns
            initiated within this window are automatically deducted from
            settlement.
          </div>
        </div>
      </div>
    </>
  );
}
