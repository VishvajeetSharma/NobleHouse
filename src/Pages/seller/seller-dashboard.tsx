import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Import your existing premium components ───────────────────────────────
import DashboardComponent from "./dashboard/Home";
import OrdersComponent from "./dashboard/Orders";
import SellerReturnsComponent from "./dashboard/Return";
import SellerProductsComponent from "./dashboard/Product";
import SellerPaymentsComponent from "./dashboard/Payment";
import SellerProfileDashboard from "./dashboard/Profilesetting";
import CatalogComponent from "./dashboard/Catalog";
import InventoryComponent from "./dashboard/Inventory";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

interface Member {
  name: string;
  role: "Admin" | "Manager" | "Staff";
  email: string;
  status: "Active" | "Inactive";
  joined: string;
}

// ─── Shared Styles ────────────────────────────────────────────────────────────
const F = {
  serif: { fontFamily: "'DM Serif Display', serif" } as React.CSSProperties,
  mono: { fontFamily: "'JetBrains Mono', monospace" } as React.CSSProperties,
  sans: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
};

// ─── SVG Icons (no external deps) ────────────────────────────────────────────
const icons = {
  home: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  orders: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  returns: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  ),
  products: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  payments: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  settings: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  members: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  chevron: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  collapse: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
  ),
  expand: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  ),
};

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: icons.home,
    path: "/seller/dashboard",
  },
  {
    id: "orders",
    label: "Orders",
    icon: icons.orders,
    path: "/seller/orders",
    badge: 3,
  },
  {
    id: "returns",
    label: "Returns",
    icon: icons.returns,
    path: "/seller/returns",
  },
  {
    id: "products",
    label: "Products",
    icon: icons.products,
    path: "/seller/products",
  },
  {
    id: "payment",
    label: "Payments",
    icon: icons.payments,
    path: "/seller/payment",
  },

  {
    id: "inventory",
    label: "Inventory",
    icon: icons.members,
    path: "/seller/inventory",
  },
  {
    id: "catalog",
    label: "Catalog",
    icon: icons.members,
    path: "/seller/catalog",
  },
  {
    id: "setting",
    label: "Settings",
    icon: icons.settings,
    path: "/seller/setting",
  },
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const activeId =
    NAV_ITEMS.find((n) => location.pathname.includes(n.id))?.id ?? "dashboard";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .nav-btn { transition: background 0.15s, color 0.15s; }
        .nav-btn:hover { background: #f5f3ee !important; }
      `}</style>

      <motion.div
        layout
        animate={{ width: open ? 220 : 64 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          flexShrink: 0,
          background: "#fdfcf8",
          borderRight: "1px solid #edeae2",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...F.sans,
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            padding: "16px 12px 14px",
            borderBottom: "1px solid #edeae2",
          }}
        >
          <div
            onClick={() => navigate("/seller/dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              padding: "4px 2px",
              borderRadius: 10,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#f5f3ee")
            }
            onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "transparent")
            }
          >
            {/* logo mark */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#0d0d0f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 50 39"
                fill="#c9a84c"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
                <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
              </svg>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#0d0d0f",
                      lineHeight: 1.2,
                    }}
                  >
                    Noble House
                  </div>
                  <div style={{ fontSize: 11, color: "#8e8e9a", marginTop: 1 }}>
                    Premium Seller
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nav Items */}
        <div
          style={{
            flex: 1,
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                layout
                className="nav-btn"
                onClick={() => navigate(item.path)}
                style={{
                  width: "100%",
                  height: 40,
                  border: "none",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0 10px",
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                  background: active ? "#fdf6ea" : "transparent",
                  color: active ? "#8a5e1a" : "#52525e",
                  ...F.sans,
                }}
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "#c9a84c",
                      borderRadius: "0 3px 3px 0",
                    }}
                  />
                )}
                <span style={{ flexShrink: 0, display: "flex" }}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.08 },
                      }}
                      exit={{ opacity: 0, x: -4 }}
                      style={{
                        fontSize: 13,
                        fontWeight: active ? 500 : 400,
                        flex: 1,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && open && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      minWidth: 18,
                      height: 18,
                      background: "#c9a84c",
                      color: "#fff",
                      borderRadius: 99,
                      fontSize: 10,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 5px",
                    }}
                  >
                    {item.badge}
                  </motion.span>
                )}
                {item.badge && !open && (
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 7,
                      height: 7,
                      background: "#c9a84c",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Seller quick info (expanded only) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                margin: "0 8px 8px",
                padding: "12px 14px",
                background: "#f5f3ee",
                borderRadius: 12,
                border: "1px solid #edeae2",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#c9a84c22,#c9a84c55)",
                    border: "1px solid #c9a84c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#c9a84c",
                    flexShrink: 0,
                  }}
                >
                  R
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#0d0d0f",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Rajesh Mehta
                  </div>
                  <div style={{ fontSize: 10, color: "#8e8e9a" }}>
                    ★ 4.7 · 3,420 orders
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((p) => !p)}
          style={
            {
              height: 44,
              borderTop: "1px solid #edeae2",
              background: "transparent",
              border: "none",

              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-end" : "center",
              padding: "0 14px",
              color: "#8e8e9a",
              transition: "color 0.15s",
            } as React.CSSProperties
          }
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#f5f3ee")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="collapse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span style={{ fontSize: 11, color: "#8e8e9a" }}>Collapse</span>
                {icons.collapse}
              </motion.div>
            ) : (
              <motion.div
                key="expand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {icons.expand}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </>
  );
}

// ─── MEMBERS COMPONENT (redesigned) ──────────────────────────────────────────
function MembersComponent() {
  const [members, setMembers] = useState<Member[]>([
    {
      name: "Rajesh Kumar",
      role: "Admin",
      email: "rajesh@noblehouse.in",
      status: "Active",
      joined: "Jan 2024",
    },
    {
      name: "Priya Singh",
      role: "Manager",
      email: "priya@noblehouse.in",
      status: "Active",
      joined: "Dec 2023",
    },
    {
      name: "Amit Sharma",
      role: "Staff",
      email: "amit@noblehouse.in",
      status: "Inactive",
      joined: "Feb 2024",
    },
    {
      name: "Neha Gupta",
      role: "Staff",
      email: "neha@noblehouse.in",
      status: "Active",
      joined: "Mar 2024",
    },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Manager" | "Staff">("Staff");

  const toggleStatus = (i: number) =>
    setMembers((prev) =>
      prev.map((m, idx) =>
        idx === i
          ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
          : m,
      ),
    );
  const removeMember = (i: number) =>
    setMembers((prev) => prev.filter((_, idx) => idx !== i));

  const roleAccent: Record<string, { bg: string; color: string }> = {
    Admin: { bg: "#fdf6ea", color: "#8a5e1a" },
    Manager: { bg: "#eef3fb", color: "#1a4d8a" },
    Staff: { bg: "#f5f3ee", color: "#52525e" },
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #edeae2",
    borderRadius: 9,
    fontSize: 13,
    color: "#0d0d0f",
    background: "#f5f3ee",
    ...F.sans,
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f3ee",
        ...F.sans,
        color: "#0d0d0f",
      }}
    >
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

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 28,
            paddingBottom: 24,
            borderBottom: "1px solid #edeae2",
          }}
        >
          <div>
            <h1
              style={{
                ...F.serif,
                fontSize: 28,
                letterSpacing: -0.3,
                margin: 0,
              }}
            >
              Team Members
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#8e8e9a",
                marginTop: 4,
                fontWeight: 300,
              }}
            >
              Manage your team access and roles
            </p>
          </div>
          <button
            onClick={() => setShowInvite((s) => !s)}
            style={{
              padding: "9px 18px",
              background: "#0d0d0f",
              color: "#fdfcf8",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              ...F.sans,
            }}
          >
            + Invite Member
          </button>
        </div>

        {/* Invite form */}
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#fdfcf8",
              border: "1px solid #edeae2",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
            }}
          >
            <div style={{ ...F.serif, fontSize: 16, marginBottom: 16 }}>
              Invite new member
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px auto",
                gap: 10,
              }}
            >
              <input
                style={inputStyle}
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Email address"
              />
              <select
                style={inputStyle}
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
              >
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
              <button
                onClick={() => {
                  if (inviteEmail) {
                    setMembers((p) => [
                      ...p,
                      {
                        name: inviteEmail.split("@")[0],
                        role: inviteRole,
                        email: inviteEmail,
                        status: "Active",
                        joined: "Apr 2026",
                      },
                    ]);
                    setInviteEmail("");
                    setShowInvite(false);
                  }
                }}
                style={{
                  padding: "9px 20px",
                  background: "#c9a84c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  ...F.sans,
                  whiteSpace: "nowrap",
                }}
              >
                Send invite
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total", value: members.length },
            {
              label: "Active",
              value: members.filter((m) => m.status === "Active").length,
            },
            {
              label: "Inactive",
              value: members.filter((m) => m.status === "Inactive").length,
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 12,
                padding: "12px 18px",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#8e8e9a",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  ...F.serif,
                  fontSize: 24,
                  color: "#0d0d0f",
                  marginTop: 4,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Members list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {members.map((m, i) => (
            <motion.div
              key={m.email + i}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                background: "#fdfcf8",
                border: "1px solid #edeae2",
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#c9a84c18,#c9a84c33)",
                  border: "1px solid #c9a84c66",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#c9a84c",
                  flexShrink: 0,
                }}
              >
                {m.name.charAt(0)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 500, color: "#0d0d0f" }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 20,
                      fontWeight: 500,
                      ...roleAccent[m.role],
                      letterSpacing: "0.3px",
                    }}
                  >
                    {m.role}
                  </span>
                </div>
                <div style={{ ...F.mono, fontSize: 11, color: "#8e8e9a" }}>
                  {m.email}
                </div>
                <div style={{ fontSize: 11, color: "#8e8e9a", marginTop: 2 }}>
                  Joined {m.joined}
                </div>
              </div>

              {/* Status toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <div
                  onClick={() => toggleStatus(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: m.status === "Active" ? "#edf7f2" : "#f5f3ee",
                    border: `1px solid ${m.status === "Active" ? "#4ab47a44" : "#edeae2"}`,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: m.status === "Active" ? "#4ab47a" : "#8e8e9a",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: m.status === "Active" ? "#1a7a4a" : "#52525e",
                    }}
                  >
                    {m.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => removeMember(i)}
                  style={{
                    padding: "6px 12px",
                    background: "transparent",
                    border: "1px solid #edeae2",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#a83232",
                    cursor: "pointer",
                    ...F.sans,
                  }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT ROUTER ───────────────────────────────────────────────────────────
function DashboardContent() {
  const location = useLocation();

  const views: Record<string, React.ReactNode> = {
    "/seller/dashboard": <DashboardComponent />,
    "/seller/orders": <OrdersComponent />,
    "/seller/returns": <SellerReturnsComponent />,
    "/seller/products": <SellerProductsComponent />,
    "/seller/catalog": <CatalogComponent />,
    "/seller/inventory": <InventoryComponent />,
    "/seller/payment": <SellerPaymentsComponent />,
    "/seller/setting": <SellerProfileDashboard />,
    "/seller/members": <MembersComponent />,
  };

  const content = views[location.pathname] ?? <DashboardComponent />;

  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export const SellerDashboard: React.FC = () => (
  <div style={{ display: "flex", background: "#f5f3ee", minHeight: "100vh" }}>
    <Sidebar />
    <DashboardContent />
  </div>
);

export default SellerDashboard;
