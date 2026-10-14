import { useState } from "react";

interface Seller {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  joinedDate: string;
  rating: number;
  pendingDays: number;
}

interface MonthData {
  month: string;
  monthIndex: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  returnRequests: number;
  revenue: number;
  commission: number;
  payment: number;
  isPaid: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  orders: number;
  revenue: number;
  cancelled: number;
  returned: number;
  rating: number;
  stock: number;
}

const SELLERS: Seller[] = [
  {
    id: "s1",
    businessName: "Ananya Textiles",
    email: "ananya@textiles.in",
    phone: "+91 98765 43210",
    initials: "AT",
    avatarBg: "#E6F1FB",
    avatarColor: "#0C447C",
    joinedDate: "Jan 2023",
    rating: 4.7,
    pendingDays: 16,
  },
  {
    id: "s2",
    businessName: "Ravi Fashion House",
    email: "ravi@fashionhouse.in",
    phone: "+91 87654 32109",
    initials: "RF",
    avatarBg: "#EAF3DE",
    avatarColor: "#27500A",
    joinedDate: "Mar 2023",
    rating: 4.8,
    pendingDays: 5,
  },
  {
    id: "s3",
    businessName: "Priya Silk Sarees",
    email: "priya@silksarees.in",
    phone: "+91 76543 21098",
    initials: "PS",
    avatarBg: "#FAEEDA",
    avatarColor: "#633806",
    joinedDate: "Jun 2023",
    rating: 4.5,
    pendingDays: 18,
  },
  {
    id: "s4",
    businessName: "Mehta & Sons",
    email: "mehta@sons.in",
    phone: "+91 65432 10987",
    initials: "MS",
    avatarBg: "#FAECE7",
    avatarColor: "#712B13",
    joinedDate: "Aug 2023",
    rating: 4.6,
    pendingDays: 3,
  },
  {
    id: "s5",
    businessName: "Lakshmi Handlooms",
    email: "lakshmi@handlooms.in",
    phone: "+91 54321 09876",
    initials: "LH",
    avatarBg: "#F1EFE8",
    avatarColor: "#444441",
    joinedDate: "Oct 2023",
    rating: 4.4,
    pendingDays: 12,
  },
  {
    id: "s6",
    businessName: "Durga Couture",
    email: "durga@couture.in",
    phone: "+91 43210 98765",
    initials: "DC",
    avatarBg: "#E6F1FB",
    avatarColor: "#185FA5",
    joinedDate: "Dec 2023",
    rating: 4.9,
    pendingDays: 20,
  },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Cotton Saree",
    price: 2499,
    orders: 45,
    revenue: 112455,
    cancelled: 3,
    returned: 2,
    rating: 4.5,
    stock: 120,
  },
  {
    id: 2,
    name: "Designer Silk Kurta",
    price: 1899,
    orders: 38,
    revenue: 72162,
    cancelled: 2,
    returned: 1,
    rating: 4.8,
    stock: 85,
  },
  {
    id: 3,
    name: "Handloom Dupatta",
    price: 999,
    orders: 52,
    revenue: 51948,
    cancelled: 4,
    returned: 3,
    rating: 4.3,
    stock: 200,
  },
  {
    id: 4,
    name: "Embroidered Lehenga",
    price: 4599,
    orders: 28,
    revenue: 128772,
    cancelled: 2,
    returned: 2,
    rating: 4.9,
    stock: 45,
  },
  {
    id: 5,
    name: "Cotton Kurti Set",
    price: 1299,
    orders: 41,
    revenue: 53259,
    cancelled: 3,
    returned: 2,
    rating: 4.6,
    stock: 150,
  },
  {
    id: 6,
    name: "Silk Blend Saree",
    price: 3499,
    orders: 32,
    revenue: 111968,
    cancelled: 1,
    returned: 2,
    rating: 4.7,
    stock: 60,
  },
  {
    id: 7,
    name: "Men Kurta Pajama",
    price: 1599,
    orders: 29,
    revenue: 46371,
    cancelled: 2,
    returned: 1,
    rating: 4.4,
    stock: 95,
  },
  {
    id: 8,
    name: "Kids Wear Set",
    price: 899,
    orders: 56,
    revenue: 50344,
    cancelled: 5,
    returned: 3,
    rating: 4.2,
    stock: 300,
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type View =
  | { page: "dashboard" }
  | { page: "seller"; sellerId: string }
  | { page: "month"; sellerId: string; monthIndex: number }
  | { page: "products"; sellerId: string };

export function SellerDetailPage({
  sellerId,
  navigate,
}: {
  sellerId: string;
  navigate: (v: View) => void;
}) {
  const seller = SELLERS.find((s) => s.id === sellerId);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeTab, setActiveTab] = useState<"yearly" | "products">("yearly");

  if (!seller) return <div style={S.content}>Seller not found</div>;

  function getMonthlyData(year: number): MonthData[] {
    const r = seedRand(year * 7 + 42);
    return MONTHS.map((month, monthIndex) => {
      const totalOrders = Math.round(20 + r() * 80);
      const cancelledOrders = Math.round(totalOrders * 0.08);
      const returnRequests = Math.round(totalOrders * 0.05);
      const completedOrders = totalOrders - cancelledOrders - returnRequests;
      const avgVal = Math.round(500 + r() * 1000);
      const revenue = completedOrders * avgVal;
      const commission = Math.round(revenue * 0.1);
      const payment = revenue - commission;
      const isPaid = monthIndex < 4 || r() > 0.35;
      return {
        month,
        monthIndex,
        totalOrders,
        completedOrders,
        cancelledOrders,
        returnRequests,
        revenue,
        commission,
        payment,
        isPaid,
      };
    });
  }

  const monthlyData = getMonthlyData(selectedYear);
  const yearlyRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
  const yearlyPayment = monthlyData.reduce((s, m) => s + m.payment, 0);
  const yearlyOrders = monthlyData.reduce((s, m) => s + m.totalOrders, 0);
  const yearlyCommission = monthlyData.reduce((s, m) => s + m.commission, 0);

  return (
    <>
      {/* Profile Band */}
      <div style={S.profileBand}>
        <div
          style={{
            ...S.avatarLg,
            background: seller.avatarBg,
            color: seller.avatarColor,
          }}
        >
          {seller.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={S.profileName}>{seller.businessName}</div>
          <div style={S.profileMeta}>
            {seller.email} · {seller.phone} · Joined {seller.joinedDate}
          </div>
          <div style={S.profileTags}>
            <Chip bg="#EAF3DE" color="#27500A">
              ✓ Payments active
            </Chip>
            <Chip bg="#E6F1FB" color="#0C447C">
              ★ {seller.rating} Rating
            </Chip>
            <Chip bg="#F1EFE8" color="#444441">
              ◫ {yearlyOrders} Orders
            </Chip>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "#A89F94", marginBottom: 4 }}>
            Annual Payment Due
          </div>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 26,
              color: "#3B6D11",
            }}
          >
            {fmtINR(yearlyPayment)}
          </div>
        </div>
      </div>

      {/* Yearly Summary Strip */}
      <div style={S.yearlyStrip}>
        <div style={S.yearlyGrid}>
          <YCard label="Yearly Revenue" value={fmtINR(yearlyRevenue)} />
          <YCard label="Total Payment" value={fmtINR(yearlyPayment)} />
          <YCard
            label="Total Orders"
            value={yearlyOrders.toLocaleString("en-IN")}
          />
          <YCard label="Commission (10%)" value={fmtINR(yearlyCommission)} />
        </div>
      </div>

      {/* Tabs */}
      <div style={S.tabsRow}>
        <TabBtn
          active={activeTab === "yearly"}
          onClick={() => setActiveTab("yearly")}
        >
          📅 Yearly Overview
        </TabBtn>
        <TabBtn
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          🛍 Products ({PRODUCTS.length})
        </TabBtn>
      </div>

      <div style={S.content}>
        {activeTab === "yearly" && (
          <>
            {/* Year Navigator */}
            <div style={S.yearNav}>
              <button
                style={S.yrBtn}
                onClick={() => setSelectedYear((y) => y - 1)}
              >
                ‹
              </button>
              <span style={S.yrLabel}>{selectedYear}</span>
              <button
                style={S.yrBtn}
                onClick={() => setSelectedYear((y) => y + 1)}
              >
                ›
              </button>
            </div>

            {/* Monthly Table */}
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead>
                  <tr>
                    {[
                      "Month",
                      "Orders",
                      "Completed",
                      "Cancelled",
                      "Returns",
                      "Revenue",
                      "Commission",
                      "Payment",
                      "Status",
                      "",
                    ].map((h) => (
                      <th key={h} style={S.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((m) => (
                    <MonthRow
                      key={m.monthIndex}
                      data={m}
                      year={selectedYear}
                      onView={() =>
                        navigate({
                          page: "month",
                          sellerId: seller.id,
                          monthIndex: m.monthIndex,
                        })
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <div style={S.productsGrid}>
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function YCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={S.yCard}>
      <div style={S.yLabel}>{label}</div>
      <div style={S.yVal}>{value}</div>
    </div>
  );
}

function Chip({
  bg,
  color,
  children,
}: {
  bg: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "3px 10px",
        borderRadius: 20,
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      style={{
        ...S.tabBtn,
        color: active ? "#3B6D11" : "#A89F94",
        borderBottom: active ? "2px solid #3B6D11" : "2px solid transparent",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function MonthRow({
  data: m,
  year,
  onView,
}: {
  data: MonthData;
  year: number;
  onView: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <tr
      style={{
        background: hov ? "#FAFAF8" : "transparent",
        cursor: "pointer",
        transition: "0.15s",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <td style={{ ...S.td, fontWeight: 500 }}>
        {m.month} {year}
      </td>
      <td style={S.td}>{m.totalOrders}</td>
      <td style={S.td}>{m.completedOrders}</td>
      <td style={{ ...S.td, color: "#D85A30" }}>{m.cancelledOrders}</td>
      <td style={{ ...S.td, color: "#BA7517" }}>{m.returnRequests}</td>
      <td style={S.td}>{fmtINR(m.revenue)}</td>
      <td style={{ ...S.td, color: "#A89F94" }}>{fmtINR(m.commission)}</td>
      <td style={{ ...S.td, color: "#3B6D11", fontWeight: 500 }}>
        {fmtINR(m.payment)}
      </td>

      <td style={S.td}>
        <button style={S.btnSm} onClick={onView}>
          Details →
        </button>
      </td>
    </tr>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const [hov, setHov] = useState(false);
  const success = Math.round(
    ((p.orders - p.cancelled - p.returned) / p.orders) * 100,
  );
  return (
    <div
      style={{
        ...S.prodCard,
        borderColor: hov ? "#C8B89A" : "#E8E4DD",
        boxShadow: hov ? "0 4px 16px rgba(0,0,0,0.07)" : "none",
        transform: hov ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.prodName}>{p.name}</div>
      <div style={S.prodPrice}>{fmtINR(p.price)} per unit</div>

      <div style={S.prodStats}>
        <ProdStat label="Orders" value={String(p.orders)} />
        <ProdStat label="Revenue" value={fmtINR(p.revenue)} />
        <ProdStat
          label="Cancelled"
          value={String(p.cancelled)}
          color="#D85A30"
        />
        <ProdStat label="Returns" value={String(p.returned)} color="#BA7517" />
      </div>

      {/* Success bar */}
      <div
        style={{
          height: 4,
          background: "#F2EFE8",
          borderRadius: 4,
          overflow: "hidden",
          margin: "10px 0 8px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${success}%`,
            background: "#3B6D11",
            borderRadius: 4,
            transition: "width 0.4s",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 11, color: "#BA7517" }}>★ {p.rating}</span>
        <span style={{ fontSize: 11, color: "#3B6D11", fontWeight: 500 }}>
          {success}% success
        </span>
        <button style={S.btnSm}>View →</button>
      </div>
    </div>
  );
}

function ProdStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      style={{ background: "#F9F7F3", borderRadius: 8, padding: "8px 10px" }}
    >
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 16,
          color: color || "#1A1510",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10, color: "#A89F94", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

function fmtINR(n: number): string {
  n = Math.round(n);
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  return "₹" + n.toLocaleString("en-IN");
}

function seedRand(seed: number) {
  let x = seed;
  return () => {
    x = (x * 1664525 + 1013904223) & 0xffffffff;
    return (x >>> 0) / 0xffffffff;
  };
}

const S: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#F7F5F0",
    color: "#1A1510",
    fontFamily: "'DM Sans', sans-serif",
  },
  // Products Grid
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 14,
  },
  prodCard: {
    background: "#fff",
    border: "1px solid #E8E4DD",
    borderRadius: 14,
    padding: "16px 18px",
    cursor: "pointer",
    transition: "all 0.18s",
  },
  prodName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1A1510",
    marginBottom: 3,
  },
  prodPrice: { fontSize: 11, color: "#A89F94", marginBottom: 12 },
  prodStats: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  tableWrap: {
    background: "#fff",
    border: "1px solid #E8E4DD",
    borderRadius: 14,
    overflow: "hidden",
  },
  table: { width: "100%", fontSize: 12 },
  th: {
    textAlign: "left" as const,
    padding: "10px 12px",
    background: "#F9F7F3",
    color: "#A89F94",
    fontWeight: 500,
    fontSize: 10,
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
    borderBottom: "1px solid #E8E4DD",
  },
  td: {
    padding: "11px 12px",
    borderBottom: "1px solid #F0ECE6",
    color: "#4A4035",
    verticalAlign: "middle" as const,
  },
  yearlyStrip: {
    background: "#F2EFE8",
    borderBottom: "1px solid #E8E4DD",
    padding: "14px 24px",
  },
  yearlyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },
  yCard: {
    background: "#fff",
    border: "1px solid #E8E4DD",
    borderRadius: 12,
    padding: "12px 16px",
  },
  yLabel: {
    fontSize: 10,
    color: "#A89F94",
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
    marginBottom: 5,
  },
  yVal: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 19,
    color: "#1A1510",
  },
  tabsRow: {
    background: "#fff",
    borderBottom: "1px solid #E8E4DD",
    padding: "0 24px",
    display: "flex",
  },
  tabBtn: {
    padding: "12px 18px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    transition: "0.15s",
    marginBottom: -1,
  },
  // Year Nav
  yearNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  yrBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1px solid #E8E4DD",
    background: "#fff",
    fontSize: 18,
    color: "#6B6257",
    transition: "0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  yrLabel: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 18,
    color: "#1A1510",
  },
  profileBand: {
    background: "#fff",
    borderBottom: "1px solid #E8E4DD",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: 18,
  },
  avatarLg: {
    width: 58,
    height: 58,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 600,
    flexShrink: 0,
  },
  profileName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: "#1A1510",
  },
  profileMeta: { fontSize: 12, color: "#A89F94", margin: "4px 0 8px" },
  profileTags: { display: "flex", gap: 8, flexWrap: "wrap" as const },
};
