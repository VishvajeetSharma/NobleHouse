import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

interface SizeStock {
  size: string;
  stock: number;
}

interface ProductRecord {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  b2bPrice?: number;
  category: string;
  mainCategory: string;
  gender?: string;
  rating: number;
  ratingCount?: number;
  soldCount: number;
  image: string;
  images: string[];
  badge?: string;
  discount?: string;
  status: "active" | "inactive" | "out_of_stock";
  isB2B?: boolean;
  sellerId?: string;
  subCategory?: string;
  sizeAvailability?: SizeStock[];
  stock?: number;
}

// ─── Design Tokens ────────────────────────────────────────────────────────────

const TOKEN = {
  bg: "#fff",
  surface: "#fff",
  surfaceHover: "#f0f0f0",
  surfaceRaised: "#e8e8e8",
  border: "rgba(0,0,0,0.07)",
  borderHover: "rgba(0,0,0,0.13)",
  gold: "#c9a84c",
  goldLight: "#e8c97a",
  goldDim: "rgba(201,168,76,0.12)",
  text: "#0f0f0f",
  textMuted: "#8a8680",
  textDim: "#5a5754",
  red: "#e05252",
  redDim: "rgba(224,82,82,0.12)",
  green: "#52c97a",
  greenDim: "rgba(82,201,122,0.1)",
  amber: "#e0a352",
  amberDim: "rgba(224,163,82,0.12)",
};

// ─── Category / Size Helpers ──────────────────────────────────────────────────

const categoryOptions = [
  "Clothing",
  "Electronics",
  "Jewelry",
  "Home & Living",
  "Beauty",
  "Accessories",
];

const getTotalStock = (product: ProductRecord): number =>
  product.sizeAvailability?.reduce((sum, s) => sum + (s.stock || 0), 0) ??
  product.stock ??
  0;

// ─── CSS ─────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sp-root {
    min-height: 100vh;
    background: ${TOKEN.bg};
    font-family: 'DM Sans', sans-serif;
    color: ${TOKEN.text};
    padding: 40px 32px;
  }

  .sp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 48px;
    border-bottom: 0.5px solid ${TOKEN.border};
    padding-bottom: 32px;
  }

  .sp-header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 500;
    letter-spacing: -0.5px;
    color: ${TOKEN.text};
    line-height: 1;
  }

  .sp-header-sub {
    margin-top: 8px;
    font-size: 13px;
    color: ${TOKEN.textMuted};
    font-weight: 300;
    letter-spacing: 0.3px;
  }

  .sp-add-btn {
    background: ${TOKEN.gold};
    color: #0f0f0f;
    border: none;
    padding: 10px 22px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.4px;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
  }
  .sp-add-btn:hover { background: ${TOKEN.goldLight}; }
  .sp-add-btn:active { transform: scale(0.98); }

  .sp-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: ${TOKEN.border};
    border: 0.5px solid ${TOKEN.border};
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .sp-stat {
    background: ${TOKEN.surface};
    padding: 24px 28px;
    position: relative;
  }

  .sp-stat-label {
    font-size: 11px;
    font-weight: 400;
    color: ${TOKEN.textDim};
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 10px;
  }

  .sp-stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 500;
    color: ${TOKEN.text};
    line-height: 1;
  }

  .sp-stat-sub {
    margin-top: 6px;
    font-size: 11px;
    color: ${TOKEN.textMuted};
  }

  .sp-stat-accent {
    position: absolute;
    top: 0; left: 0;
    width: 2px;
    height: 100%;
    background: ${TOKEN.gold};
    opacity: 0.6;
  }

  .sp-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .sp-search {
    flex: 1;
    min-width: 220px;
    position: relative;
  }

  .sp-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${TOKEN.textDim};
    pointer-events: none;
  }

  .sp-input {
    width: 100%;
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    color: ${TOKEN.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 10px 14px 10px 40px;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s;
  }
  .sp-input::placeholder { color: ${TOKEN.textDim}; }
  .sp-input:focus { border-color: ${TOKEN.gold}; }

  .sp-add-form {
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    border-radius: 24px;
    padding: 22px;
  }

  .sp-add-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .sp-form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    color: ${TOKEN.textDim};
  }

  .sp-form-field input,
  .sp-form-field select,
  .sp-form-field textarea {
    width: 100%;
    border: 0.5px solid ${TOKEN.border};
    border-radius: 8px;
    padding: 10px 12px;
    background: ${TOKEN.surface};
    color: ${TOKEN.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
  }
  .sp-form-field input:focus,
  .sp-form-field select:focus,
  .sp-form-field textarea:focus { border-color: ${TOKEN.gold}; }

  .sp-select {
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    color: ${TOKEN.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
    appearance: none;
    padding-right: 32px;
  }
  .sp-select:focus { border-color: ${TOKEN.gold}; }

  .sp-select-wrap { position: relative; }
  .sp-select-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${TOKEN.textDim};
    font-size: 10px;
  }

  .sp-sort-btn {
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    color: ${TOKEN.textMuted};
    font-size: 14px;
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .sp-sort-btn:hover { border-color: ${TOKEN.gold}; color: ${TOKEN.gold}; }

  .sp-results-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .sp-results-count {
    font-size: 12px;
    color: ${TOKEN.textDim};
    letter-spacing: 0.5px;
  }

  .sp-products {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: ${TOKEN.border};
    border: 0.5px solid ${TOKEN.border};
    border-radius: 8px;
    overflow: hidden;
  }

  .sp-product-row {
    background: ${TOKEN.surface};
    transition: background 0.2s;
  }
  .sp-product-row:hover { background: ${TOKEN.surfaceHover}; }

  .sp-product-inner {
    display: flex;
    gap: 0;
  }

  .sp-product-img-wrap {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    overflow: hidden;
    border-right: 0.5px solid ${TOKEN.border};
    background: ${TOKEN.surfaceRaised};
  }

  .sp-product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.9;
    transition: opacity 0.3s, transform 0.4s;
  }
  .sp-product-row:hover .sp-product-img { opacity: 1; transform: scale(1.04); }

  .sp-product-body {
    flex: 1;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    gap: 24px;
      justify-content: space-between;
    min-width: 0;
  }

  .sp-product-info { flex: 1; min-width: 0; }

  .sp-product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 500;
    color: ${TOKEN.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sp-product-cat {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: ${TOKEN.gold};
    margin-top: 2px;
    font-weight: 400;
  }

  .sp-product-desc {
    font-size: 12px;
    color: ${TOKEN.textMuted};
    margin-top: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 300;
  }

.sp-product-metrics {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
}

  .sp-metric { min-width: 200px; justify-content: space-between; }

  .sp-metric-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${TOKEN.textDim};
    margin-bottom: 4px;
  }

  .sp-metric-value {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    color: ${TOKEN.text};
  }

  .sp-metric-value.low { color: ${TOKEN.red}; }
  .sp-metric-value.gold { color: ${TOKEN.gold}; }

  .sp-size-chips {
    display: flex;
  
    gap: 4px;
    text-align: center;
    justify-content: center;
    max-width: 160px;
  }

  .sp-size-chip {
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    padding: 2px 6px;
    border-radius: 3px;
    letter-spacing: 0.3px;
  }

  .sp-size-chip.ok { background: rgba(82,201,122,0.1); color: #2a8a50; }
  .sp-size-chip.low { background: ${TOKEN.amberDim}; color: #a06820; }
  .sp-size-chip.out { background: ${TOKEN.redDim}; color: ${TOKEN.red}; }

  .sp-price-block { text-align: right; }

  .sp-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 500;
    color: ${TOKEN.text};
    line-height: 1;
  }

  .sp-price.discounted { color: ${TOKEN.gold}; }

  .sp-price-original {
    font-size: 12px;
    color: ${TOKEN.textDim};
    text-decoration: line-through;
    font-family: 'DM Mono', monospace;
    margin-bottom: 1px;
  }

  .sp-discount-badge {
    display: inline-block;
    background: ${TOKEN.goldDim};
    color: ${TOKEN.gold};
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    padding: 2px 6px;
    border-radius: 2px;
    margin-top: 3px;
    letter-spacing: 0.5px;
  }

  .sp-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
  }

  .sp-status-badge.active { background: ${TOKEN.greenDim}; color: ${TOKEN.green}; }
  .sp-status-badge.inactive { background: rgba(0,0,0,0.04); color: ${TOKEN.textMuted}; }
  .sp-status-badge.out_of_stock { background: ${TOKEN.redDim}; color: ${TOKEN.red}; }

  .sp-status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .sp-actions {
    display: flex;
    flex-direction: column;
    border-left: 0.5px solid ${TOKEN.border};
    flex-shrink: 0;
  }

  .sp-action-btn {
    flex: 1;
    padding: 0 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: ${TOKEN.textMuted};
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .sp-action-btn:hover { background: ${TOKEN.surfaceRaised}; color: ${TOKEN.text}; }
  .sp-action-btn.edit:hover { color: ${TOKEN.gold}; }
  .sp-action-btn.delete:hover { color: ${TOKEN.red}; }
  .sp-action-btn + .sp-action-btn { border-top: 0.5px solid ${TOKEN.border}; }

  .sp-edit-panel {
    background: ${TOKEN.surfaceRaised};
    border-top: 0.5px solid ${TOKEN.border};
    padding: 16px 24px;
    display: flex;
    gap: 16px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .sp-edit-field { flex: 1; min-width: 120px; }

  .sp-edit-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${TOKEN.textDim};
    margin-bottom: 6px;
    display: block;
  }

  .sp-edit-input {
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    color: ${TOKEN.text};
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 4px;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }
  .sp-edit-input:focus { border-color: ${TOKEN.gold}; }

  .sp-size-edit-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .sp-size-edit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: ${TOKEN.textDim};
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .sp-size-edit-input {
    width: 60px;
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.gold};
    color: ${TOKEN.text};
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 5px 6px;
    border-radius: 4px;
    text-align: center;
    outline: none;
  }

  .sp-save-btn {
    background: ${TOKEN.gold};
    color: #0f0f0f;
    border: none;
    padding: 9px 20px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.4px;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .sp-save-btn:hover { background: ${TOKEN.goldLight}; }

  .sp-cancel-btn {
    background: transparent;
    color: ${TOKEN.textMuted};
    border: 0.5px solid ${TOKEN.border};
    padding: 9px 16px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .sp-cancel-btn:hover { border-color: ${TOKEN.borderHover}; color: ${TOKEN.text}; }

  .sp-toggle-btn {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 11px;
    color: ${TOKEN.textDim};
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.3px;
    margin-top: 4px;
    display: block;
    transition: color 0.15s;
  }
  .sp-toggle-btn:hover { color: ${TOKEN.textMuted}; }

  .sp-empty {
    background: ${TOKEN.surface};
    padding: 80px 24px;
    text-align: center;
  }

  .sp-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 500;
    color: ${TOKEN.textMuted};
    margin-bottom: 8px;
  }

  .sp-empty-sub {
    font-size: 13px;
    color: ${TOKEN.textDim};
    font-weight: 300;
  }

  .sp-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(4px);
  }

  .sp-modal {
    background: ${TOKEN.surface};
    border: 0.5px solid ${TOKEN.border};
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    padding: 32px;
  }

  .sp-modal-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${TOKEN.redDim};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .sp-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 500;
    color: ${TOKEN.text};
    text-align: center;
    margin-bottom: 8px;
  }

  .sp-modal-body {
    font-size: 13px;
    color: ${TOKEN.textMuted};
    text-align: center;
    line-height: 1.6;
    font-weight: 300;
    margin-bottom: 28px;
  }

  .sp-modal-actions { display: flex; gap: 10px; }

  .sp-modal-cancel {
    flex: 1;
    background: transparent;
    border: 0.5px solid ${TOKEN.border};
    color: ${TOKEN.textMuted};
    padding: 10px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .sp-modal-cancel:hover { border-color: ${TOKEN.borderHover}; color: ${TOKEN.text}; }

  .sp-modal-confirm {
    flex: 1;
    background: ${TOKEN.red};
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .sp-modal-confirm:hover { opacity: 1; }

  @media (max-width: 900px) {
    .sp-stats { grid-template-columns: repeat(2, 1fr); }
    .sp-product-metrics { gap: 16px; }
  }

  @media (max-width: 640px) {
    .sp-root { padding: 20px 16px; }
    .sp-stats { grid-template-columns: 1fr 1fr; }
    .sp-product-body { flex-wrap: wrap; gap: 16px; }
    .sp-add-grid { grid-template-columns: 1fr; }
  }
`;

const SellerProductsComponent: React.FC = () => {
  const products: ProductRecord[] = useSelector(
    (state: any) => state.products.products,
  );

  const currentSeller =
    localStorage.getItem("currentSeller") || "default_seller";
  const sellerProducts = products.filter((p) => p.sellerId === currentSeller);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock" | "sold">(
    "name",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories = ["all", ...categoryOptions];

  const filteredProducts = useMemo(() => {
    return sellerProducts
      .filter((p) => {
        const s = searchTerm.toLowerCase();
        const matchSearch =
          p.name.toLowerCase().includes(s) ||
          (p.description?.toLowerCase() ?? "").includes(s) ||
          p.category.toLowerCase().includes(s);
        const matchCat =
          selectedCategory === "all" || p.category === selectedCategory;
        const matchStatus =
          selectedStatus === "all" || p.status === selectedStatus;
        return matchSearch && matchCat && matchStatus;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortBy === "name") cmp = a.name.localeCompare(b.name);
        if (sortBy === "price") cmp = a.price - b.price;
        if (sortBy === "stock") cmp = getTotalStock(a) - getTotalStock(b);
        if (sortBy === "sold") cmp = a.soldCount - b.soldCount;
        return sortOrder === "asc" ? cmp : -cmp;
      });
  }, [
    sellerProducts,
    searchTerm,
    selectedCategory,
    selectedStatus,
    sortBy,
    sortOrder,
  ]);

  const stats = useMemo(
    () => ({
      totalProducts: sellerProducts.length,
      activeProducts: sellerProducts.filter((p) => p.status === "active")
        .length,
      outOfStock: sellerProducts.filter((p) => p.status === "out_of_stock")
        .length,
      totalValue: sellerProducts.reduce(
        (s, p) => s + p.price * getTotalStock(p),
        0,
      ),
      totalSold: sellerProducts.reduce((s, p) => s + p.soldCount, 0),
      averagePrice: sellerProducts.length
        ? Math.round(
            sellerProducts.reduce((s, p) => s + p.price, 0) /
              sellerProducts.length,
          )
        : 0,
    }),
    [sellerProducts],
  );

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <header className="sp-header">
            <div>
              <h1 className="sp-header-title">My Products</h1>
              <p className="sp-header-sub">
                Manage inventory, pricing & listings
              </p>
            </div>
          </header>

          <div className="sp-stats">
            <div className="sp-stat">
              <div className="sp-stat-accent" />
              <div className="sp-stat-label">Total Products</div>
              <div className="sp-stat-value">{stats.totalProducts}</div>
              <div className="sp-stat-sub">
                {stats.activeProducts} active · {stats.outOfStock} out of stock
              </div>
            </div>
            <div className="sp-stat">
              <div
                className="sp-stat-accent"
                style={{ background: TOKEN.green }}
              />
              <div className="sp-stat-label">Inventory Value</div>
              <div className="sp-stat-value" style={{ fontSize: 28 }}>
                {fmt(stats.totalValue)}
              </div>
              <div className="sp-stat-sub">Current stock valuation</div>
            </div>
            <div className="sp-stat">
              <div
                className="sp-stat-accent"
                style={{ background: "#8a6fd4" }}
              />
              <div className="sp-stat-label">Units Sold</div>
              <div className="sp-stat-value">{stats.totalSold}</div>
              <div className="sp-stat-sub">All time</div>
            </div>
            <div className="sp-stat">
              <div
                className="sp-stat-accent"
                style={{ background: TOKEN.amber }}
              />
              <div className="sp-stat-label">Avg. Price</div>
              <div className="sp-stat-value" style={{ fontSize: 28 }}>
                {fmt(stats.averagePrice)}
              </div>
              <div className="sp-stat-sub">Across all listings</div>
            </div>
          </div>

          <div className="sp-filters">
            <div className="sp-search">
              <svg
                className="sp-search-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="sp-input"
                type="text"
                placeholder="Search by name, category or description…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sp-select-wrap">
              <select
                className="sp-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All Categories" : c}
                  </option>
                ))}
              </select>
              <span className="sp-select-arrow">▾</span>
            </div>

            <div className="sp-select-wrap">
              <select
                className="sp-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <span className="sp-select-arrow">▾</span>
            </div>

            <div className="sp-select-wrap">
              <select
                className="sp-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
              <span className="sp-select-arrow">▾</span>
            </div>

            <button
              className="sp-sort-btn"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </div>

          <div className="sp-results-bar">
            <span className="sp-results-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} shown
            </span>
          </div>

          <div className="sp-products">
            {filteredProducts.length === 0 && (
              <div className="sp-empty">
                <div className="sp-empty-title">No products found</div>
                <div className="sp-empty-sub">
                  Try adjusting your search or filters
                </div>
              </div>
            )}

            {filteredProducts.map((product) => {
              const totalStock = getTotalStock(product);

              return (
                <div key={product.id} className="sp-product-row">
                  <div className="sp-product-inner">
                    {/* Image */}
                    <div className="sp-product-img-wrap">
                      <img
                        src={product.images?.[0] ?? product.image}
                        alt={product.name}
                        className="sp-product-img"
                      />
                    </div>

                    <div className="sp-product-body">
                      <div className="sp-product-info">
                        <div className="sp-product-name">{product.name}</div>
                        <div className="sp-product-cat">{product.category}</div>
                        <div className="sp-product-desc">
                          {product.description}
                        </div>
                      </div>

                      <div className="sp-product-metrics">
                        <div className="sp-metric">
                          {product.sizeAvailability &&
                          product.sizeAvailability.length > 0 ? (
                            <div className="sp-size-chips ">
                              {product.sizeAvailability.map((s) => (
                                <span
                                  key={s.size}
                                  className={`sp-size-chip ${
                                    s.stock === 0
                                      ? "out"
                                      : s.stock <= 10
                                        ? "low"
                                        : "ok"
                                  }`}
                                >
                                  {s.size}:{s.stock}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div
                              className={`sp-metric-value${totalStock < 10 ? " low" : ""}`}
                            >
                              {totalStock}
                            </div>
                          )}
                          {totalStock < 10 && totalStock > 0 && (
                            <div
                              style={{
                                fontSize: 10,
                                color: TOKEN.amber,
                                marginTop: 2,
                              }}
                            >
                              Low stock
                            </div>
                          )}
                        </div>

                        <div className="sp-metric">
                          <div className="sp-metric-label">Rating</div>
                          <div className="sp-metric-value gold">
                            {product.rating} ★
                          </div>
                        </div>

                        <div className="sp-price-block">
                          {product.discount ? (
                            <>
                              <div className="sp-price-original">
                                {fmt(product.originalPrice!)}
                              </div>
                              <div className="sp-price discounted">
                                {fmt(product.price)}
                              </div>
                              <div className="sp-discount-badge">
                                −{product.discount}%
                              </div>
                            </>
                          ) : (
                            <div className="sp-price">{fmt(product.price)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProductsComponent;
