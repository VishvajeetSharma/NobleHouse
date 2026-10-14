import { useState } from "react";
import { SellerDetailPage } from "./Payments/SellerDetailPage";
import { MonthDetailPage } from "./Payments/MonthDetailPage";

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface PaymentData {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  returnRequests: number;
  monthlyRevenue: number;
  monthlyCommission: number;
  monthlyPayment: number;
  pendingDays: number;
  isPending: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

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
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function seedRand(seed: number) {
  let x = seed;

  return () => {
    x = (x * 1664525 + 1013904223) & 0xffffffff;
    return (x >>> 0) / 0xffffffff;
  };
}

function getPaymentData(seller: Seller): PaymentData {
  const r = seedRand(seller.id.charCodeAt(1) * 13);

  const totalOrders = Math.round(50 + r() * 100);
  const cancelledOrders = Math.round(totalOrders * 0.08);
  const returnRequests = Math.round(totalOrders * 0.05);
  const completedOrders =
    totalOrders - cancelledOrders - returnRequests;

  const avgVal = Math.round(900 + r() * 700);

  const monthlyRevenue = completedOrders * avgVal;
  const monthlyCommission = Math.round(monthlyRevenue * 0.1);
  const monthlyPayment =
    monthlyRevenue - monthlyCommission;

  return {
    totalOrders,
    completedOrders,
    cancelledOrders,
    returnRequests,
    monthlyRevenue,
    monthlyCommission,
    monthlyPayment,
    pendingDays: seller.pendingDays,
    isPending: seller.pendingDays >= 15,
  };
}

function fmtINR(n: number): string {
  n = Math.round(n);

  if (n >= 10000000)
    return "₹" + (n / 10000000).toFixed(1) + "Cr";

  if (n >= 100000)
    return "₹" + (n / 100000).toFixed(1) + "L";

  return "₹" + n.toLocaleString("en-IN");
}

// ─── Route Types ──────────────────────────────────────────────────────────────

type View =
  | { page: "dashboard" }
  | { page: "seller"; sellerId: string }
  | { page: "month"; sellerId: string; monthIndex: number }
  | { page: "products"; sellerId: string };

// ─── Dashboard Page ───────────────────────────────────────────────────────────

function DashboardPage({
  navigate,
}: {
  navigate: (v: View) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("all");

  const filtered = SELLERS.filter((s) => {
    const match =
      s.businessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      s.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (!match) return false;

    const d = getPaymentData(s);

    if (filterStatus === "pending")
      return d.isPending;

    if (filterStatus === "active")
      return !d.isPending;

    return true;
  });

  return (
    <div style={S.content}>
      <div style={S.sectionHead}>
        <div style={S.sectionTitle}>
          Payment Management
        </div>
      </div>

      <div style={S.topFilters}>
        <input
          style={S.searchInput}
          placeholder="Search sellers..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          style={S.filterSel}
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
        >
          <option value="all">All Sellers</option>
          <option value="active">Active</option>
          <option value="pending">
            15+ Days Pending
          </option>
        </select>
      </div>

      <div style={S.sellersList}>
        {filtered.map((seller) => (
          <SellerCard
            key={seller.id}
            seller={seller}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Seller Card ──────────────────────────────────────────────────────────────

function SellerCard({
  seller,
  navigate,
}: {
  seller: Seller;
  navigate: (v: View) => void;
}) {
  const d = getPaymentData(seller);

  return (
    <div style={S.sellerCard}>
      <div style={S.scTop}>
        <div
          style={{
            ...S.avatar,
            background: seller.avatarBg,
            color: seller.avatarColor,
          }}
        >
          {seller.initials}
        </div>

        <div style={{ flex: 1 }}>
          <div style={S.scName}>
            {seller.businessName}
          </div>

          <div style={S.scMeta}>
            {seller.email}
          </div>
        </div>

        <button
          style={S.btnView}
          onClick={() =>
            navigate({
              page: "seller",
              sellerId: seller.id,
            })
          }
        >
          View Details
        </button>
      </div>

      <div style={S.scBody}>
        <div>
          Orders: {d.totalOrders}
        </div>

        <div>
          Payment: {fmtINR(d.monthlyPayment)}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SellerPaymentManagement() {
  const [view, setView] = useState<any>({
    page: "dashboard",
  });

  const navigate = (v: View) => {
    setView(v);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #F7F5F0;
        }

        button {
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }

        input, select {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <>
        {view.page === "dashboard" && (
          <DashboardPage navigate={navigate} />
        )}

        {view.page === "seller" && (
          <SellerDetailPage
            sellerId={view.sellerId}
            navigate={navigate}
          />
        )}

        {view.page === "month" && <MonthDetailPage />}
      </>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  content: {
    padding: "24px",
  },

  sectionHead: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#1A1510",
  },

  topFilters: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
  },

  searchInput: {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: 10,
    width: 240,
  },

  filterSel: {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: 10,
  },

  sellersList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  sellerCard: {
    background: "#fff",
    border: "1px solid #E8E4DD",
    borderRadius: 16,
    overflow: "hidden",
  },

  scTop: {
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  scName: {
    fontSize: 16,
    fontWeight: 600,
  },

  scMeta: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  scBody: {
    padding: "0 18px 18px",
    display: "flex",
    justifyContent: "space-between",
  },

  btnView: {
    padding: "10px 16px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },
};