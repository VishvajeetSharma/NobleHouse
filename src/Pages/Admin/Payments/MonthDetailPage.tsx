
import { useNavigate, useParams } from "react-router-dom";

const Users = [
  { id: "u1", name: "John Doe", email: "john@doe.com", mobile: "1234567890" },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane@smith.com",
    mobile: "0987654321",
  },
  {
    id: "u3",
    name: "Alice Johnson",
    email: "alice@johnson.com",
    mobile: "1122334455",
  },
];

const MONTH_PRODUCTS = [
  {
    name: "Premium Cotton Saree",
    orders: 12,
    revenue: 29988,
    cancelled: 1,
    returned: 1,
    commission: 2998,
    payment: 26990,
  },
  {
    name: "Designer Silk Kurta",
    orders: 8,
    revenue: 15192,
    cancelled: 0,
    returned: 1,
    commission: 1519,
    payment: 13673,
  },
];

const SELLERS = [
  {
    id: "s1",
    businessName: "Ananya Textiles",
  },
];

const ORDER_DETAILS = [
  {
    id: "o1",
    monthIndex: 4,
    date: "04 May 2026",
    product: "Premium Cotton Saree",
    customerName: Users[0].name,
    phone: Users[0].mobile,
    city: "Bangalore",
    status: "completed",
    quantity: 1,
    amount: 2499,
  },
  {
    id: "o2",
    monthIndex: 4,
    date: "03 May 2026",
    product: "Premium Cotton Saree",
    customerName: Users[1].name,
    phone: Users[1].mobile,
    city: "Pune",
    status: "cancelled",
    quantity: 1,
    amount: 2499,
  },
];

export function MonthDetailPage() {
  const navigate = useNavigate();

  const { sellerId, year, month, productName } = useParams();

  const monthIndex = Number(month) || 4;

  const isUsersPage = !!productName;

  const decodedProductName = productName
    ? decodeURIComponent(productName)
    : "";

  const seller = SELLERS.find((s) => s.id === sellerId);

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

  const monthName = MONTHS[monthIndex];

  const totalOrders = MONTH_PRODUCTS.reduce((s, p) => s + p.orders, 0);
  const totalRevenue = MONTH_PRODUCTS.reduce((s, p) => s + p.revenue, 0);
  const totalCancelled = MONTH_PRODUCTS.reduce((s, p) => s + p.cancelled, 0);
  const totalReturns = MONTH_PRODUCTS.reduce((s, p) => s + p.returned, 0);
  const totalCommission = MONTH_PRODUCTS.reduce(
    (s, p) => s + p.commission,
    0
  );
  const totalPayment = MONTH_PRODUCTS.reduce((s, p) => s + p.payment, 0);

  if (isUsersPage) {
    const orders = ORDER_DETAILS.filter(
      (o) =>
        o.product === decodedProductName && o.monthIndex === monthIndex
    );

    return (
      <div style={{ padding: "24px", background: "#F7F5F0", minHeight: "100vh" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 24,
            }}
          >
            {decodedProductName} — Order Details
          </div>

          <div style={{ color: "#A89F94", marginTop: 4 }}>
            {year} Orders for {seller?.businessName}
          </div>
        </div>

        <button
          onClick={() =>
            navigate(`/admin/payments/${sellerId}/${year}/${month}`)
          }
          style={{
            background: "#1A1510",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: 20,
                borderBottom: "1px solid #eee",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  {order.customerName}
                </div>
                <div style={{ fontSize: 12 }}>{order.phone}</div>
              </div>

              <div>{order.city}</div>

              <div>{order.date}</div>

              <div>{order.status}</div>

              <div>₹{order.amount}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", background: "#F7F5F0", minHeight: "100vh" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
          }}
        >
          {monthName} {year} — Detailed Breakdown
        </div>

        <div style={{ color: "#A89F94", marginTop: 4 }}>
          Complete analytics for {seller?.businessName}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard label="Total Orders" value={String(totalOrders)} />
        <StatCard label="Revenue" value={fmtINR(totalRevenue)} />
        <StatCard label="Cancelled" value={String(totalCancelled)} />
        <StatCard label="Returns" value={String(totalReturns)} />
        <StatCard label="Commission" value={fmtINR(totalCommission)} />
        <StatCard label="Seller Payment" value={fmtINR(totalPayment)} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {MONTH_PRODUCTS.map((p, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 600 }}>{p.name}</div>

              <div>{fmtINR(p.revenue / p.orders)} / unit</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 12,
              }}
            >
              <MiniCard label="Orders" value={String(p.orders)} />
              <MiniCard label="Revenue" value={fmtINR(p.revenue)} />
              <MiniCard label="Cancelled" value={String(p.cancelled)} />
              <MiniCard label="Returns" value={String(p.returned)} />
              <MiniCard label="Commission" value={fmtINR(p.commission)} />
              <MiniCard label="Payment" value={fmtINR(p.payment)} />
            </div>

            <button
              onClick={() =>
                navigate(
                  `/admin/payments/${sellerId}/${year}/${month}/${encodeURIComponent(
                    p.name
                  )}`
                )
              }
              style={{
                background: "#1A1510",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                cursor: "pointer",
                marginTop: 16,
                width: "100%",
              }}
            >
              View Order Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function fmtINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div style={{ color: "#A89F94", fontSize: 13 }}>{label}</div>

      <div
        style={{
          marginTop: 8,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#F9F7F3",
        borderRadius: 10,
        padding: 14,
        textAlign: "center",
      }}
    >
      <div style={{ fontWeight: 700 }}>{value}</div>

      <div
        style={{
          marginTop: 4,
          fontSize: 12,
          color: "#A89F94",
        }}
      >
        {label}
      </div>
    </div>
  );
}