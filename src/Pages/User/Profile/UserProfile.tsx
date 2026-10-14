import { useState, useEffect } from "react";
import Header from "../../../components/Header/Heading";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface Coupon {
  code: string;
  discount: string;
  expiry: string;
  used: boolean;
  min: string;
}

interface Review {
  id: number;
  product: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
}

interface Transaction {
  id: number;
  label: string;
  amount: number; // positive = credit, negative = debit
  date: string;
  type: "credit" | "debit";
}

const MOCK_USER = {
  name: "Riya Sharma",
  email: "riya.sharma@noblehouse.com",
  phone: "+91 98765 43210",
  dob: "June 15, 1995",
  gender: "Female",
  username: "riya_sharma",
};

const MOCK_WALLET = {
  balance: 1250,
  transactions: [
    {
      id: 1,
      label: "Refund (Order #123)",
      amount: 800,
      date: "20 Apr 2025",
      type: "credit" as const,
    },
    {
      id: 2,
      label: "Cashback Reward",
      amount: 100,
      date: "15 Apr 2025",
      type: "credit" as const,
    },
    {
      id: 3,
      label: "Payment for Order",
      amount: -300,
      date: "10 Apr 2025",
      type: "debit" as const,
    },
    {
      id: 4,
      label: "Refund (Order #118)",
      amount: 650,
      date: "2 Apr 2025",
      type: "credit" as const,
    },
  ] as Transaction[],
};

const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    type: "Home",
    address: "42, Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    address: "WeWork, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    isDefault: false,
  },
];

const MOCK_COUPONS: Coupon[] = [
  {
    code: "RIYA20",
    discount: "20% OFF",
    expiry: "31 May 2025",
    used: false,
    min: "₹999",
  },
  {
    code: "FIRST50",
    discount: "₹50 OFF",
    expiry: "15 Jun 2025",
    used: false,
    min: "₹500",
  },
  {
    code: "SUMMER10",
    discount: "10% OFF",
    expiry: "30 Apr 2025",
    used: true,
    min: "₹1499",
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    product: "Silver Necklace",
    rating: 5,
    comment: "Absolutely love it! Great quality.",
    date: "12 Apr 2025",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    product: "Skincare Set",
    rating: 4,
    comment: "Good product, packaging could be better.",
    date: "3 Mar 2025",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop",
  },
];

const NAV_ITEMS = [
  { id: "wallet", label: "Wallet" },
  { id: "addresses", label: "Addresses" },
  { id: "coupons", label: "Coupons" },
  { id: "reviews", label: "Reviews" },
  { id: "settings", label: "Settings" },
  { id: "seller", label: "Become a Seller" },
];

// Shows user initials in a luxury oxblood-to-burgundy gradient circle
const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
      }}
      className="rounded-full flex items-center justify-center text-[#FAF7F2] font-serif font-bold shrink-0 shadow-sm border border-[#E8D9C9]/30"
    >
      {initials}
    </div>
  );
};

// Warm gold star rating
const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill={s <= rating ? "#d97706" : "none"}
        stroke="#d97706"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

// Clickable/editable field row used in Settings
const FieldRow = ({
  label,
  value,
  isEditing,
  onClick,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onClick: () => void;
  onChange: (v: string) => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-2 cursor-pointer transition-all
      ${isEditing
        ? "border-[#4A101C] bg-[#F1E8E2]/60 ring-1 ring-[#A66A75]"
        : "border-[#E7DCD7] bg-white hover:border-[#812D3A] hover:bg-[#FAF7F2]"
      }`}
  >
    <div className="flex-1">
      <p className="text-xs text-[#75676A] mb-1">{label}</p>
      {isEditing && label !== "Password" ? (
        <input
          autoFocus
          value={value}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm text-[#241719] bg-transparent border-none outline-none w-full font-medium"
        />
      ) : (
        <p className="text-sm text-[#241719] font-medium">{value}</p>
      )}
    </div>
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#812D3A"
      strokeWidth="2"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  </div>
);

const WalletTab = () => {
  const wallet = MOCK_WALLET;

  return (
    <div>
      <h2 className="text-xl font-serif text-[#241719] mb-5">My Wallet</h2>

      {/* Luxury Balance card */}
      <div
        style={{
          background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
        }}
        className="rounded-2xl p-6 mb-5 text-[#FAF7F2] shadow-lg border border-[#812D3A]/40 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <p className="text-xs font-semibold tracking-widest uppercase text-[#E8D9C9] mb-1">
          Available Balance
        </p>
        <p className="text-4xl font-serif font-bold mb-4 tracking-tight">
          ₹{wallet.balance.toLocaleString("en-IN")}
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold tracking-wide transition border border-white/20 text-[#FAF7F2]">
            Add Money
          </button>
          <button className="flex-1 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold tracking-wide transition border border-white/20 text-[#FAF7F2]">
            Withdraw
          </button>
        </div>
      </div>

      {/* Transaction list */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-[#4A101C] uppercase tracking-wider font-serif">
          Transactions
        </p>
        <span className="text-xs text-[#75676A]">
          {wallet.transactions.length} recent
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {wallet.transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E7DCD7] hover:border-[#812D3A]/40 hover:shadow-xs transition"
          >
            {/* Green circle = credit, red = debit */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-[#287653]/15" : "bg-[#B54745]/15"
                }`}
            >
              <span
                className={`text-sm font-bold ${tx.type === "credit" ? "text-[#287653]" : "text-[#B54745]"
                  }`}
              >
                {tx.type === "credit" ? "+" : "−"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#241719] truncate">
                {tx.label}
              </p>
              <p className="text-xs text-[#75676A]">{tx.date}</p>
            </div>
            <span
              className={`text-sm font-bold font-serif shrink-0 ${tx.type === "credit" ? "text-[#287653]" : "text-[#B54745]"
                }`}
            >
              {tx.type === "credit" ? "+" : "−"}₹
              {Math.abs(tx.amount).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ADDRESSES TAB */
const AddressesTab = () => {
  const addresses = MOCK_ADDRESSES;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-serif text-[#241719]">Saved Addresses</h2>
        <button
          style={{
            background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
          }}
          className="px-3.5 py-1.5 text-white rounded-lg text-xs font-medium hover:brightness-110 shadow-sm transition flex items-center gap-1.5"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-xl p-4 transition-all ${addr.isDefault
                ? "border-[#4A101C] bg-[#F1E8E2]/50 shadow-xs ring-1 ring-[#4A101C]/20"
                : "border-[#E7DCD7] bg-white hover:border-[#812D3A]"
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[#241719] text-sm">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="text-xs bg-[#287653]/15 text-[#287653] px-2 py-0.5 rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-[#4A101C] hover:underline font-medium">
                  Edit
                </button>
                <button className="text-xs text-[#B54745] hover:underline">
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm text-[#75676A]">{addr.address}</p>
            <p className="text-sm text-[#75676A]">
              {addr.city}, {addr.state} — {addr.pincode}
            </p>
            {!addr.isDefault && (
              <button className="mt-3 text-xs text-[#4A101C] border border-[#E7DCD7] px-2.5 py-1 rounded-lg hover:bg-[#F1E8E2] transition font-medium">
                Set as Default
              </button>
            )}
          </div>
        ))}

        {/* Dashed "add new" card */}
        <div className="border-2 border-dashed border-[#E7DCD7] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#4A101C] hover:bg-[#FAF7F2] transition min-h-25">
          <div className="w-8 h-8 rounded-full bg-[#F1E8E2] flex items-center justify-center text-[#4A101C]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A101C"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <p className="text-xs text-[#4A101C] font-semibold">
            Add New Address
          </p>
        </div>
      </div>
    </div>
  );
};

/* COUPONS TAB */
const CouponsTab = () => {
  const coupons = MOCK_COUPONS;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-serif text-[#241719]">My Coupons</h2>
        <span className="text-xs text-[#75676A]">
          {coupons.filter((c) => !c.used).length} active
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {coupons.map((c, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-xl border overflow-hidden transition-all
            ${c.used
                ? "border-[#E7DCD7] bg-[#F1E8E2]/50 opacity-60"
                : "border-[#E7DCD7] bg-white hover:border-[#812D3A] hover:shadow-xs"
              }`}
          >
            <div
              style={{
                background: c.used
                  ? "#E7DCD7"
                  : "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
              }}
              className="w-14 flex items-center justify-center py-5 shrink-0 text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div className="w-px h-10 border-l-2 border-dashed border-[#E7DCD7] shrink-0" />
            <div className="flex-1 py-3 pr-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-[#241719] text-sm tracking-wider">
                    {c.code}
                  </p>
                  <p className="text-xs text-[#75676A] mt-0.5">
                    Min. {c.min} · Expires {c.expiry}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif font-bold text-[#4A101C] text-sm">
                    {c.discount}
                  </p>
                  {c.used ? (
                    <span className="text-[10px] text-[#75676A]">Used</span>
                  ) : (
                    <button className="mt-1 text-[10px] bg-[#F1E8E2] text-[#4A101C] border border-[#E7DCD7] px-2.5 py-0.5 rounded-full font-semibold hover:bg-[#E8D9C9]/50 transition">
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* REVIEWS TAB */
const ReviewsTab = () => {
  const reviews = MOCK_REVIEWS;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-serif text-[#241719]">My Reviews</h2>
        <span className="text-xs text-[#75676A]">{reviews.length} reviews</span>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border border-[#E7DCD7] rounded-xl p-4 bg-white hover:border-[#812D3A]/40 hover:shadow-xs transition"
          >
            <div className="flex items-start gap-3">
              <img
                src={r.image}
                alt={r.product}
                className="w-14 h-14 rounded-lg object-cover border border-[#E7DCD7] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[#241719] text-sm">
                    {r.product}
                  </p>
                  <p className="text-[10px] text-[#75676A]">{r.date}</p>
                </div>
                <Stars rating={r.rating} />
                <p className="text-sm text-[#75676A] mt-1.5 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3 justify-end">
              <button className="text-xs text-[#4A101C] border border-[#E7DCD7] px-3 py-1 rounded-lg hover:bg-[#F1E8E2] transition font-medium">
                Edit
              </button>
              <button className="text-xs text-[#B54745] border border-[#B54745]/20 px-3 py-1 rounded-lg hover:bg-[#B54745]/10 transition font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Pending review nudge */}
        <div className="border-2 border-dashed border-[#E7DCD7] rounded-xl p-4 flex items-center gap-4 bg-[#FAF7F2]">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#241719]">
              Pending Reviews
            </p>
            <p className="text-xs text-[#75676A]">
              You have 3 recent purchases waiting for your review.
            </p>
          </div>
          <button
            style={{
              background: "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
            }}
            className="text-xs text-white px-3.5 py-1.5 rounded-lg font-medium hover:brightness-110 transition shrink-0 shadow-xs"
          >
            Review Now
          </button>
        </div>
      </div>
    </div>
  );
};

/* SETTINGS TAB */
const SettingsTab = () => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [values, setValues] = useState({
    "Full Name": MOCK_USER.name,
    Email: MOCK_USER.email,
    Phone: MOCK_USER.phone,
    "Date of Birth": MOCK_USER.dob,
    Gender: MOCK_USER.gender,
    Username: MOCK_USER.username,
    Password: "••••••••••",
  });

  return (
    <div>
      <h2 className="text-xl font-serif text-[#241719] mb-5">
        Account Settings
      </h2>

      <p className="text-xs font-bold text-[#4A101C] uppercase tracking-wider font-serif mb-3">
        Basic Information
      </p>

      {/* Profile picture row */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#E7DCD7] bg-[#FAF7F2] mb-3">
        <span className="text-xs text-[#75676A]">Profile Picture</span>
        <div className="flex items-center gap-3">
          <button className="text-xs text-[#4A101C] font-semibold hover:underline">
            Upload photo
          </button>
          <Avatar name={values["Full Name"]} size={36} />
        </div>
      </div>

      {["Full Name", "Email", "Phone", "Date of Birth", "Gender"].map(
        (field) => (
          <FieldRow
            key={field}
            label={field}
            value={values[field as keyof typeof values]}
            isEditing={editingField === field}
            onClick={() =>
              setEditingField(editingField === field ? null : field)
            }
            onChange={(val) => setValues((p) => ({ ...p, [field]: val }))}
          />
        ),
      )}

      <p className="text-xs font-bold text-[#4A101C] uppercase tracking-wider font-serif mt-6 mb-3">
        Account Security
      </p>
      {["Username", "Password"].map((field) => (
        <FieldRow
          key={field}
          label={field}
          value={values[field as keyof typeof values]}
          isEditing={editingField === field}
          onClick={() => setEditingField(editingField === field ? null : field)}
          onChange={(val) => setValues((p) => ({ ...p, [field]: val }))}
        />
      ))}

      <p className="text-xs font-bold text-[#4A101C] uppercase tracking-wider font-serif mt-6 mb-3">
        Notifications
      </p>
      {[
        { label: "Order updates via SMS", on: true },
        { label: "Order updates via Email", on: true },
        { label: "Promotional offers", on: false },
        { label: "New arrivals & sales", on: true },
      ].map((pref) => (
        <div
          key={pref.label}
          className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#E7DCD7] bg-white mb-2"
        >
          <p className="text-sm text-[#241719]">{pref.label}</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={pref.on}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#E7DCD7] rounded-full peer peer-checked:bg-[#4A101C] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
          </label>
        </div>
      ))}

      <div className="mt-6 p-4 rounded-2xl border-2 border-dashed border-[#B54745]/30 bg-[#B54745]/5 text-center">
        <p className="text-xs text-[#B54745] font-semibold">
          Delete this account
        </p>
        <p className="text-[10px] text-[#75676A] mt-1">
          This action is permanent and cannot be undone
        </p>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [activeNav, setActiveNav] = useState("settings");

  // Read tab from URL: /account?tab=coupons
  useEffect(() => {
    const tab = searchparams.get("tab");
    if (tab) setActiveNav(tab);
  }, [searchparams]);

  const TAB_COMPONENTS: Record<string, React.ReactNode> = {
    wallet: <WalletTab />,
    addresses: <AddressesTab />,
    coupons: <CouponsTab />,
    reviews: <ReviewsTab />,
    settings: <SettingsTab />,
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Luxury subtle decorative ambient glows */}
        <div className="absolute w-72 h-72 rounded-full bg-[#E8D9C9]/40 -top-20 -left-20 pointer-events-none blur-3xl" />
        <div className="absolute w-60 h-60 rounded-full bg-[#812D3A]/10 bottom-10 -right-10 pointer-events-none blur-3xl" />

        <div className="w-full max-w-5xl relative z-10">
          <div className="rounded-3xl border border-[#E7DCD7] bg-white/95 backdrop-blur-2xl shadow-[0_12px_40px_rgba(74,16,28,0.06)] overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-145">
              {/* ── SIDEBAR ── */}
              <div className="md:w-56 px-4 py-6 border-r border-[#E7DCD7] bg-[#FAF7F2]/80 flex flex-col">
                {/* User info at top */}
                <div className="flex items-center gap-3 mb-6 px-2">
                  <Avatar name={MOCK_USER.name} size={40} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#241719] truncate font-serif">
                      {MOCK_USER.name}
                    </p>
                    <p className="text-[10px] text-[#75676A] truncate">
                      {MOCK_USER.email}
                    </p>
                  </div>
                </div>

                <p className="text-[10px] font-bold text-[#812D3A] uppercase tracking-widest mb-2 px-2 font-serif">
                  My Account
                </p>

                {/* Orders — goes to a separate page */}
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm mb-1 text-[#241719] hover:bg-[#F1E8E2] hover:text-[#4A101C] group transition-all"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#75676A] group-hover:text-[#4A101C] transition-colors"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span className="font-medium">My Orders</span>
                  <svg
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#4A101C]"
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M5 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Tab nav buttons */}
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "seller") {
                          navigate("/seller");
                        } else {
                          setActiveNav(item.id);
                        }
                      }}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm mb-1 transition-all ${isActive
                          ? "text-white font-semibold shadow-xs"
                          : "text-[#241719] hover:bg-[#F1E8E2] hover:text-[#4A101C]"
                        }`}
                      style={
                        isActive
                          ? {
                            background:
                              "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                          }
                          : undefined
                      }
                    >
                      <span className="font-medium">{item.label}</span>
                      {/* Show balance badge next to Wallet */}
                      {item.id === "wallet" && (
                        <span
                          className={`ml-auto text-[10px] font-bold font-serif px-2 py-0.5 rounded-full ${isActive
                              ? "bg-white/20 text-[#FAF7F2]"
                              : "text-[#4A101C] bg-[#F1E8E2]"
                            }`}
                        >
                          ₹{MOCK_WALLET.balance.toLocaleString("en-IN")}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Logout at bottom */}
                <div className="mt-auto pt-4 border-t border-[#E7DCD7]">
                  <button className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#B54745] hover:bg-[#B54745]/10 transition-all font-medium">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              {/* ── MAIN CONTENT ── */}
              <div
                className="flex-1 p-6 md:p-8 overflow-y-auto"
                style={{ maxHeight: "580px" }}
              >
                {TAB_COMPONENTS[activeNav] ?? (
                  <p className="text-[#75676A] text-sm">Page not found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
