import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FiClock, FiCheckCircle, FiPackage, FiShoppingBag, 
  FiBell, FiCalendar, FiSearch, FiLogOut, FiGrid,
  FiDollarSign, FiSettings, FiTrendingUp, FiTrendingDown,
  FiBarChart2, FiArrowRight
} from "react-icons/fi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  .adm-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .adm-root {
    font-family: 'Instrument Sans', sans-serif;
    background: #FAF7F2;
    min-height: 100vh;
    display: flex;
  }

  /* ── Sidebar ── */
  .adm-sidebar {
    width: 200px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-right: 1px solid #E7DCD7;
    display: flex;
    flex-direction: column;
    padding: 20px 12px;
    gap: 6px;
    flex-shrink: 0;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
  }

  .adm-logo {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #4A101C, #812D3A);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    margin-left: 8px;
    letter-spacing: -0.5px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(74, 16, 28, 0.2);
  }

  .adm-nav-icon {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.18s ease;
    color: #75676A;
    font-size: 13px;
    border: none;
    background: transparent;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 500;
  }

  .adm-nav-icon:hover { 
    background: #F1E8E2; 
    color: #4A101C; 
  }

  .adm-nav-icon.active { 
    background: #F1E8E2; 
    color: #4A101C; 
    font-weight: 600;
  }

  .adm-nav-icon.danger { 
    color: #B54745; 
  }

  .adm-nav-icon.danger:hover { 
    background: #faece7; 
  }

  /* ── Main ── */
  .adm-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── Topbar ── */
  .adm-topbar {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #E7DCD7;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .adm-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 700;
    color: #241719;
    letter-spacing: -0.3px;
  }

  .adm-page-sub {
    font-size: 12px; color: #75676A;
    margin-top: 2px; font-weight: 400;
    letter-spacing: 0.1px;
  }

  .adm-topbar-right {
    display: flex; align-items: center; gap: 10px;
  }

  .adm-search {
    background: #FAF7F2;
    border: 1px solid #E7DCD7;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 12px; color: #241719;
    font-family: 'Instrument Sans', sans-serif;
    width: 170px; outline: none;
    transition: all 0.18s;
  }
  .adm-search:focus { border-color: #4A101C; background: #fff; box-shadow: 0 0 0 2px rgba(74,16,28,0.1); }
  .adm-search::placeholder { color: #75676A; }

  .adm-icon-btn {
    width: 36px; height: 36px;
    background: #FAF7F2;
    border: 1px solid #E7DCD7;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px;
    position: relative;
    transition: all 0.18s;
    color: #75676A;
  }
  .adm-icon-btn:hover { background: #F1E8E2; border-color: #A66A75; color: #4A101C; }

  .adm-notif-dot {
    position: absolute; top: 7px; right: 8px;
    width: 6px; height: 6px;
    background: #B54745;
    border-radius: 50%;
    border: 1.5px solid #fff;
  }

  .adm-avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #4A101C, #812D3A);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600;
    color: #fff; cursor: pointer;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(74,16,28,0.2);
  }

  .adm-logout-btn {
    background: #F1E8E2;
    border: 1px solid #E7DCD7;
    border-radius: 8px;
    padding: 7px 14px;
    color: #4A101C;
    font-size: 11px; font-weight: 600;
    cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    letter-spacing: 0.2px;
    transition: all 0.18s;
  }
  .adm-logout-btn:hover { background: #E8D9C9; }

  /* ── Content ── */
  .adm-content {
    padding: 24px 32px;
    flex: 1;
  }

  /* ── Stats Grid ── */
  .adm-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }

  .adm-stat-card {
    background: #fff;
    border: 1px solid #E7DCD7;
    border-radius: 14px;
    padding: 20px 20px 18px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }
  .adm-stat-card:hover { border-color: #A66A75; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(74,16,28,0.08); }

  .adm-card-stripe {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 14px 14px 0 0;
  }

  .adm-stat-top {
    display: flex; align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
    margin-top: 8px;
  }

  .adm-stat-icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  .adm-stat-tag {
    font-size: 10px; font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    letter-spacing: 0.3px;
  }
  .adm-tag-up { background: #dcfce7; color: #287653; }
  .adm-tag-dn { background: #fee2e2; color: #B54745; }

  .adm-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700;
    color: #241719;
    letter-spacing: -0.5px;
    line-height: 1;
  }

  .adm-stat-label {
    font-size: 11px; color: #75676A;
    margin-top: 4px; font-weight: 500;
    letter-spacing: 0.2px;
  }

  .adm-sparkline {
    display: flex; align-items: flex-end;
    gap: 2px; height: 24px;
    margin-top: 12px;
  }

  .adm-spark-bar {
    flex: 1;
    border-radius: 2px 2px 0 0;
    min-height: 3px;
    transition: opacity 0.2s;
    opacity: 0.55;
  }
  .adm-spark-bar:hover { opacity: 1; }

  /* ── Bottom Grid ── */
  .adm-bottom-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 16px;
  }

  /* ── Panel ── */
  .adm-panel {
    background: #fff;
    border: 1px solid #E7DCD7;
    border-radius: 14px;
    overflow: hidden;
  }

  .adm-panel-header {
    padding: 18px 22px 14px;
    border-bottom: 1px solid #E7DCD7;
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .adm-panel-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 700;
    color: #241719;
  }

  .adm-view-all {
    font-size: 11px; color: #812D3A;
    cursor: pointer; font-weight: 600;
    letter-spacing: 0.1px;
    background: none; border: none;
    font-family: 'Instrument Sans', sans-serif;
    transition: color 0.15s;
  }
  .adm-view-all:hover { color: #4A101C; }

  /* ── Seller Rows ── */
  .adm-seller-row {
    display: flex; align-items: center;
    padding: 12px 22px;
    border-bottom: 1px solid #F1E8E2;
    gap: 12px;
    cursor: pointer;
    transition: background 0.15s;
  }
  .adm-seller-row:hover { background: #FAF7F2; }
  .adm-seller-row:last-child { border-bottom: none; }

  .adm-seller-avatar {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600;
    flex-shrink: 0;
  }

  .adm-seller-info { flex: 1; min-width: 0; }

  .adm-seller-name {
    font-size: 12px; font-weight: 600;
    color: #241719;
    white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis;
  }

  .adm-seller-meta {
    font-size: 10px; color: #75676A;
    margin-top: 1px; font-weight: 400;
  }

  .adm-status-pill {
    font-size: 9px; font-weight: 700;
    padding: 3px 9px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .adm-pill-pending { background: #fef3c7; color: #b45309; }
  .adm-pill-verified { background: #dcfce7; color: #287653; }

  .adm-review-btn {
    font-size: 10px; padding: 5px 12px;
    border-radius: 7px;
    background: #FAF7F2;
    border: 1px solid #E7DCD7;
    color: #4A101C;
    cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 600;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .adm-review-btn:hover { background: #F1E8E2; border-color: #A66A75; }

  /* ── Right Panel ── */
  .adm-right-panel { display: flex; flex-direction: column; gap: 14px; }

  .adm-action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .adm-action-tile {
    background: #fff;
    border: 1px solid #E7DCD7;
    border-radius: 12px;
    padding: 16px 14px;
    cursor: pointer;
    transition: all 0.18s;
    position: relative;
    overflow: hidden;
  }
  .adm-action-tile:hover { border-color: #A66A75; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(74,16,28,0.06); }

  .adm-tile-icon { font-size: 18px; margin-bottom: 8px; }
  .adm-tile-name { font-size: 11px; font-weight: 600; color: #241719; margin-bottom: 2px; }
  .adm-tile-desc { font-size: 10px; color: #75676A; line-height: 1.4; }

  .adm-mini-count {
    position: absolute; top: 12px; right: 12px;
    background: #F1E8E2; color: #4A101C;
    font-size: 9px; font-weight: 700;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Activity Feed ── */
  .adm-activity-panel { flex: 1; }

  .adm-activity-item {
    display: flex; align-items: flex-start;
    gap: 10px; padding: 11px 18px;
    border-bottom: 1px solid #F1E8E2;
    transition: background 0.15s;
    cursor: pointer;
  }
  .adm-activity-item:hover { background: #FAF7F2; }
  .adm-activity-item:last-child { border-bottom: none; }

  .adm-activity-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }

  .adm-activity-text { font-size: 11px; color: #75676A; line-height: 1.4; }
  .adm-activity-text strong { color: #241719; font-weight: 600; }
  .adm-activity-time { font-size: 9px; color: #75676A; opacity: 0.8; margin-top: 1px; }

  .adm-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%; background: #287653;
    animation: adm-pulse 2s infinite;
  }

  @keyframes adm-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .adm-live-stamp {
    display: flex; align-items: center; gap: 6px;
  }

  .adm-live-label {
    font-size: 10px; color: #287653;
    font-weight: 600; letter-spacing: 0.3px;
  }

  @media (max-width: 1024px) {
    .adm-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .adm-bottom-grid { grid-template-columns: 1fr; }
    .adm-right-panel { flex-direction: row; flex-wrap: wrap; }
  }

  @media (max-width: 640px) {
    .adm-content { padding: 16px; }
    .adm-topbar { padding: 12px 16px; }
    .adm-search { display: none; }
    .adm-stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  }
`;

// Updated STATS with icon types
const STATS = [
  {
    title: "Pending Sellers",
    iconType: "pending",
    iconBg: "#F1E8E2",
    stripe: "#E7DCD7",
    barColor: "#4A101C",
    tag: "+3 today",
    tagClass: "adm-tag-dn",
    route: "/admin/pending-sellers",
    bars: [40, 60, 50, 80, 55, 75, 100],
  },
  {
    title: "Verified Sellers",
    iconType: "verified",
    iconBg: "#f0fdf4",
    stripe: "#dcfce7",
    barColor: "#287653",
    tag: "+18%",
    tagClass: "adm-tag-up",
    route: "/admin/verified-sellers",
    bars: [30, 45, 65, 55, 78, 88, 100],
  },
  {
    title: "Total Products",
    iconType: "products",
    iconBg: "#FAF7F2",
    stripe: "#E7DCD7",
    barColor: "#812D3A",
    tag: "+5.2%",
    tagClass: "adm-tag-up",
    route: "/admin/verified-sellers",
    bars: [50, 40, 65, 75, 60, 90, 100],
  },
  {
    title: "Total Orders",
    iconType: "orders",
    iconBg: "#F1E8E2",
    stripe: "#E8D9C9",
    barColor: "#B54745",
    tag: "+12%",
    tagClass: "adm-tag-up",
    route: "/admin/verified-sellers",
    bars: [45, 65, 50, 70, 80, 95, 100],
  },
];

const MOCK_SELLERS = [
  {
    initials: "ZS",
    bg: "#F1E8E2",
    color: "#4A101C",
    name: "Zenith Store",
    owner: "Ali Hassan",
    date: "3 Jan 2025",
    status: "pending",
  },
  {
    initials: "MB",
    bg: "#F1E8E2",
    color: "#4A101C",
    name: "Maple Bazaar",
    owner: "Sara Malik",
    date: "2 Jan 2025",
    status: "pending",
  },
  {
    initials: "TK",
    bg: "#F1E8E2",
    color: "#287653",
    name: "TechKart",
    owner: "Raza Khan",
    date: "1 Jan 2025",
    status: "verified",
  },
  {
    initials: "NX",
    bg: "#F1E8E2",
    color: "#4A101C",
    name: "NextGen Exports",
    owner: "Nadia Shah",
    date: "31 Dec 2024",
    status: "pending",
  },
  {
    initials: "PS",
    bg: "#F1E8E2",
    color: "#4A101C",
    name: "Prime Shop",
    owner: "Usman Faiq",
    date: "30 Dec 2024",
    status: "pending",
  },
];

const ACTIVITIES = [
  {
    dot: "#4A101C",
    text: "Zenith Store",
    action: "submitted registration",
    time: "2 min ago",
  },
  {
    dot: "#10b981",
    text: "Maple Bazaar",
    action: "was verified",
    time: "18 min ago",
  },
  {
    dot: "#f59e0b",
    text: "TechKart",
    action: "added 24 products",
    time: "1 hr ago",
  },
  {
    dot: "#3b82f6",
    text: "Prime Shop",
    action: "placed 8 orders",
    time: "2 hr ago",
  },
  {
    dot: "#ef4444",
    text: "NovaMart",
    action: "was rejected",
    time: "3 hr ago",
  },
];

const NAV_ICONS = [
  { icon: FiGrid, label: "Dashboard", active: true, route: "/admin/dashboard" },
  { icon: FiClock, label: "Pending Sellers", route: "/admin/pending-sellers" },
  { icon: FiDollarSign, label: "Payments", route: "/admin/payments" },
  { icon: FiCheckCircle, label: "Verified Sellers", route: "/admin/verified-sellers" },
  { icon: FiSettings, label: "Settings", route: "/admin/settings" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { pendingSellers = [], verifiedSellers = [] } = useSelector(
    (state: any) => state.sellerManagement || {},
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const statCounts = [
    pendingSellers.length || 12,
    verifiedSellers.length || 248,
    verifiedSellers.reduce((s: any, x: any) => s + (x.totalProducts || 0), 0) ||
      4821,
    verifiedSellers.reduce((s: any, x: any) => s + (x.totalOrders || 0), 0) ||
      1392,
  ];

  const displaySellers =
    pendingSellers.length > 0 ? pendingSellers.slice(0, 5) : MOCK_SELLERS;

  // Function to render icon based on type
  const renderStatIcon = (type: string) => {
    switch(type) {
      case 'pending':
        return <FiClock size={16} color="#4A101C" />;
      case 'verified':
        return <FiCheckCircle size={16} color="#287653" />;
      case 'products':
        return <FiPackage size={16} color="#812D3A" />;
      case 'orders':
        return <FiShoppingBag size={16} color="#B54745" />;
      default:
        return <FiGrid size={16} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
   
   
        {/* Sidebar */}
    
{/* <nav className="adm-sidebar">
  <div className="adm-logo border border-[#812D3A] text-[#4A101C]">A</div>
  {NAV_ICONS.map((n, i) => (
    <button
      key={i}
      className={`adm-nav-icon${n.active ? " active" : ""}`}
      title={n.label}
      onClick={() => n.route && navigate(n.route)}
    >
      <n.icon size={18} />
      <span>{n.label}</span>
    </button>
  ))}
  <div style={{ flex: 1 }} />
  <button
    className="adm-nav-icon danger"
    title="Logout"
    onClick={handleLogout}
  >
    <FiLogOut size={18} />
    <span>Logout</span>
  </button>
</nav> */}

        {/* Main */}
        <div className="adm-main">
          {/* Topbar */}
          {/* <header className="adm-topbar">
            <div>
              <div className="adm-page-title font-google ">Admin Dashboard</div>
              <div className="adm-page-sub">
                Manage sellers · Monitor sales activity
              </div>
            </div>
     
          </header> */}

          {/* Content */}
          <main className="adm-content">
            {/* Stats */}
            <div className="adm-stats-grid">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="adm-stat-card font-google"
                  onClick={() => navigate(s.route)}
                >
                  <div
                    className="adm-card-stripe"
                    style={{ background: s.stripe }}
                  />
                  <div className="adm-stat-top">
                    <div
                      className="adm-stat-icon"
                      style={{ background: s.iconBg }}
                    >
                      {renderStatIcon(s.iconType)}
                    </div>
                    <div className={`adm-stat-tag ${s.tagClass}`}>
                      {s.tag === "+3 today" && <FiTrendingDown size={8} className="inline mr-0.5" />}
                      {s.tag === "+18%" && <FiTrendingUp size={8} className="inline mr-0.5" />}
                      {s.tag === "+5.2%" && <FiTrendingUp size={8} className="inline mr-0.5" />}
                      {s.tag === "+12%" && <FiTrendingUp size={8} className="inline mr-0.5" />}
                      {s.tag}
                    </div>
                  </div>
                  <div className="adm-stat-num">
                    {statCounts[i].toLocaleString()}
                  </div>
                  <div className="adm-stat-label">{s.title}</div>
                  <div className="adm-sparkline">
                    {s.bars.map((h, j) => (
                      <div
                        key={j}
                        className="adm-spark-bar"
                        style={{
                          height: `${h}%`,
                          background: s.barColor,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Grid */}
            <div className="adm-bottom-grid">
              {/* Seller Table */}
              <div className="adm-panel">
                <div className="adm-panel-header">
                  <div className="adm-panel-title font-google">
                    Recent Pending Approvals
                  </div>
                  <button
                    className="adm-view-all"
                    onClick={() => navigate("/admin/pending-sellers")}
                  >
                    View all <FiArrowRight size={10} className="inline ml-1" />
                  </button>
                </div>
                {displaySellers.map((seller: any, i: number) => (
                  <div
                    key={seller.id || i}
                    className="adm-seller-row"
                    onClick={() => navigate("/admin/pending-sellers")}
                  >
                    <div
                      className="adm-seller-avatar"
                      style={{
                        background: seller.bg || "#F1E8E2",
                        color: seller.color || "#4A101C",
                      }}
                    >
                      {seller.initials ||
                        (seller.storeName || "").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="adm-seller-info">
                      <div className="adm-seller-name">
                        {seller.name || seller.storeName}
                      </div>
                      <div className="adm-seller-meta">
                        {seller.owner || seller.fullName} ·{" "}
                        {seller.date || seller.registrationDate}
                      </div>
                    </div>
                    <div
                      className={`adm-status-pill ${
                        seller.status === "verified"
                          ? "adm-pill-verified"
                          : "adm-pill-pending"
                      }`}
                    >
                      {seller.status === "verified" ? "Verified" : "Pending"}
                    </div>
                    <button
                      className="adm-review-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/admin/pending-sellers");
                      }}
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="adm-right-panel">
                {/* Action Tiles */}
                <div className="adm-action-grid">
                  <div
                    className="adm-action-tile"
                    onClick={() => navigate("/admin/pending-sellers")}
                  >
                    {pendingSellers.length > 0 && (
                      <div className="adm-mini-count">
                        {pendingSellers.length}
                      </div>
                    )}
                    <div className="adm-tile-icon">
                      <FiClock size={16} color="#4A101C" />
                    </div>
                    <div className="adm-tile-name font-google ">Pending Sellers</div>
                    <div className="adm-tile-desc">Review registrations</div>
                  </div>
                  <div
                    className="adm-action-tile"
                    onClick={() => navigate("/admin/verified-sellers")}
                  >
                    <div className="adm-tile-icon">
                      <FiCheckCircle size={16} color="#10b981" />
                    </div>
                    <div className="adm-tile-name">Verified Sellers</div>
                    <div className="adm-tile-desc">Manage active sellers</div>
                  </div>
                  <div className="adm-action-tile">
                    <div className="adm-tile-icon">
                      <FiBarChart2 size={16} color="#3b82f6" />
                    </div>
                    <div className="adm-tile-name">Analytics</div>
                    <div className="adm-tile-desc">View detailed reports</div>
                  </div>
                  <div className="adm-action-tile">
                    <div className="adm-tile-icon">
                      <FiSettings size={16} color="#6b7280" />
                    </div>
                    <div className="adm-tile-name">Settings</div>
                    <div className="adm-tile-desc">Configure platform</div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="adm-panel adm-activity-panel">
                  <div className="adm-panel-header">
                    <div className="adm-panel-title">Live Activity</div>
                    <div className="adm-live-stamp">
                      <div className="adm-live-dot" />
                      <span className="adm-live-label">Live</span>
                    </div>
                  </div>
                  {ACTIVITIES.map((a, i) => (
                    <div key={i} className="adm-activity-item">
                      <div
                        className="adm-activity-dot"
                        style={{ background: a.dot }}
                      />
                      <div>
                        <div className="adm-activity-text">
                          <strong>{a.text}</strong> {a.action}
                        </div>
                        <div className="adm-activity-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
     
    </>
  );
};

export default AdminDashboard;