import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  .spd-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .spd-root {
    font-family: 'Instrument Sans', sans-serif;
    background: #f5f3ef;
    min-height: 100vh;
  }

  /* ── Topbar ── */
  .spd-topbar {
    background: #fff;
    border-bottom: 1px solid #e8e4dd;
    padding: 14px 32px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .spd-back {
    display: flex; align-items: center; gap: 6px;
    background: #f5f3ef;
    border: 1px solid #e8e4dd;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12px; font-weight: 500;
    color: #4a4035;
    cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    transition: all 0.18s;
    flex-shrink: 0;
  }
  .spd-back:hover { background: #edeae4; border-color: #c8b89a; }

  .spd-breadcrumb {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: #9e9589;
  }
  .spd-breadcrumb span { color: #c8b89a; }
  .spd-breadcrumb strong { color: #1a1510; font-weight: 500; }

  /* ── Seller Hero Card ── */
  .spd-hero {
    margin: 24px 32px 0;
    background: #fff;
    border: 1px solid #e8e4dd;
    border-radius: 16px;
    overflow: hidden;
  }

  .spd-hero-stripe {
    height: 4px;
    background: linear-gradient(90deg, #c8a87a 0%, #e8d5b8 50%, #c8b89a 100%);
  }

  .spd-hero-inner {
    padding: 24px 28px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 24px;
    align-items: start;
  }

  .spd-seller-avatar {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: #1a1510;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 26px; font-weight: 600;
    color: #f0e8d8;
    flex-shrink: 0;
  }

  .spd-seller-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 600;
    color: #1a1510; letter-spacing: -0.3px;
    margin-bottom: 3px;
  }
  .spd-seller-owner {
    font-size: 12px; color: #9e9589;
    margin-bottom: 10px; font-weight: 300;
  }
  .spd-seller-desc {
    font-size: 12px; color: #6a6055;
    line-height: 1.5; margin-bottom: 12px;
    max-width: 480px;
  }

  .spd-contact-row {
    display: flex; flex-wrap: wrap; gap: 8px;
  }

  .spd-contact-chip {
    background: #f5f3ef;
    border: 1px solid #e8e4dd;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 11px; color: #4a4035;
    display: flex; align-items: center; gap: 5px;
  }

  .spd-quick-stats {
    display: flex; flex-direction: column; gap: 12px;
    padding-left: 24px;
    border-left: 1px solid #f0ece6;
    min-width: 140px;
  }

  .spd-qs-item { display: flex; flex-direction: column; gap: 2px; }
  .spd-qs-label { font-size: 10px; color: #b8b0a4; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500; }
  .spd-qs-value { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #1a1510; }

  /* ── Controls Bar ── */
  .spd-controls {
    margin: 20px 32px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .spd-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px; font-weight: 600;
    color: #1a1510;
  }
  .spd-count-badge {
    display: inline-block;
    background: #f0ebe3;
    color: #6a5c4a;
    font-size: 11px; font-weight: 600;
    padding: 2px 9px; border-radius: 20px;
    margin-left: 8px;
    font-family: 'Instrument Sans', sans-serif;
  }

  .spd-controls-right { display: flex; gap: 10px; }

  .spd-select {
    background: #fff;
    border: 1px solid #e8e4dd;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 11px; font-weight: 500;
    color: #4a4035;
    font-family: 'Instrument Sans', sans-serif;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
    appearance: none;
    padding-right: 28px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239e9589'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }
  .spd-select:focus { border-color: #c8b89a; }

  /* ── Products Grid ── */
  .spd-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    margin: 16px 32px 32px;
  }

  .spd-card {
    background: #fff;
    border: 1px solid #e8e4dd;
    border-radius: 14px;
    overflow: hidden;
    transition: all 0.22s ease;
    display: flex;
    flex-direction: column;
  }
  .spd-card:hover {
    border-color: #c8b89a;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  .spd-img-wrap {
    position: relative;
    background: #f9f7f4;
    aspect-ratio: 4/3;
    overflow: hidden;
  }

  .spd-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  .spd-card:hover .spd-img { transform: scale(1.04); }

  .spd-badge {
    position: absolute; top: 10px; left: 10px;
    background: #1a1510;
    color: #f0e8d8;
    font-size: 9px; font-weight: 700;
    padding: 3px 9px; border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .spd-discount {
    position: absolute; top: 10px; right: 10px;
    background: #faece7;
    color: #712B13;
    font-size: 10px; font-weight: 700;
    padding: 3px 9px; border-radius: 20px;
    letter-spacing: 0.3px;
  }

  .spd-inactive-overlay {
    position: absolute; inset: 0;
    background: rgba(245,243,239,0.6);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600;
    color: #9e9589; letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .spd-card-body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; gap: 8px; }

  .spd-cat-row { display: flex; align-items: center; justify-content: space-between; }
  .spd-cat {
    font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.6px;
    color: #c8a87a;
  }
  .spd-gender-pill {
    font-size: 9px; font-weight: 600;
    background: #f5f3ef;
    color: #6a6055;
    padding: 2px 8px; border-radius: 20px;
    letter-spacing: 0.3px;
  }

  .spd-product-name {
    font-family: 'Playfair Display', serif;
    font-size: 14px; font-weight: 600;
    color: #1a1510; line-height: 1.3;
  }

  .spd-price-row { display: flex; align-items: baseline; gap: 7px; }
  .spd-price {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600;
    color: #1a1510;
  }
  .spd-original-price {
    font-size: 12px; color: #b8b0a4;
    text-decoration: line-through;
  }

  .spd-rating-row { display: flex; align-items: center; gap: 6px; }
  .spd-stars { font-size: 11px; color: #BA7517; font-weight: 600; }
  .spd-review-count { font-size: 10px; color: #b8b0a4; font-weight: 300; }

  .spd-sizes {
    display: flex; flex-wrap: wrap; gap: 4px;
    margin-top: 2px;
  }
  .spd-size-chip {
    background: #f5f3ef;
    border: 1px solid #e8e4dd;
    border-radius: 5px;
    padding: 2px 8px;
    font-size: 9px; font-weight: 600;
    color: #4a4035;
  }
  .spd-size-chip.low { background: #faece7; border-color: #f5c4b3; color: #712B13; }

  .spd-features { display: flex; gap: 6px; flex-wrap: wrap; }
  .spd-feat {
    font-size: 9px; font-weight: 500;
    background: #eaf3de; color: #3B6D11;
    padding: 2px 8px; border-radius: 20px;
  }

  .spd-card-footer {
    padding: 12px 16px;
    border-top: 1px solid #f5f2ee;
  }

  .spd-view-btn {
    width: 100%;
    padding: 9px;
    background: #f5f3ef;
    border: 1px solid #e8e4dd;
    border-radius: 8px;
    font-size: 11px; font-weight: 600;
    color: #4a4035;
    cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    letter-spacing: 0.2px;
    transition: all 0.18s;
  }
  .spd-view-btn:hover { background: #1a1510; color: #f0e8d8; border-color: #1a1510; }

  /* ── Empty State ── */
  .spd-empty {
    margin: 48px 32px;
    text-align: center;
    padding: 60px;
    background: #fff;
    border: 1px solid #e8e4dd;
    border-radius: 16px;
  }
  .spd-empty-icon { font-size: 40px; margin-bottom: 16px; }
  .spd-empty h2 { font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1510; margin-bottom: 8px; }
  .spd-empty p { font-size: 13px; color: #9e9589; }

  /* ── Not Found ── */
  .spd-not-found {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 100vh; gap: 16px; text-align: center;
  }
  .spd-not-found h1 { font-family: 'Playfair Display', serif; font-size: 28px; color: #1a1510; }
  .spd-not-found p { font-size: 14px; color: #9e9589; }
  .spd-not-found button {
    background: #1a1510; color: #f0e8d8;
    border: none; border-radius: 10px;
    padding: 10px 24px; font-size: 13px;
    cursor: pointer; font-family: 'Instrument Sans', sans-serif;
    font-weight: 500; margin-top: 8px;
    transition: opacity 0.18s;
  }
  .spd-not-found button:hover { opacity: 0.8; }

  @media (max-width: 768px) {
    .spd-hero-inner { grid-template-columns: auto 1fr; }
    .spd-quick-stats { display: none; }
    .spd-grid { margin: 16px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
    .spd-controls { margin: 16px; flex-direction: column; align-items: flex-start; gap: 12px; }
    .spd-topbar, .spd-hero { margin-left: 0; }
  }
`;

// ── Dummy Data ──────────────────────────────────────────────
const DUMMY_SELLER = {
  id: "dummy-1",
  storeName: "Zenith Fashion",
  fullName: "Ali Hassan",
  storeDescription:
    "Premium ethnic and western wear curated for modern sensibilities. Quality fabrics, timeless designs.",
  email: "ali@zenithfashion.in",
  phone: "+91 98765 43210",
  city: "Mumbai",
  state: "Maharashtra",
  verificationDate: "12 Jan 2025",
  totalOrders: 1284,
  rating: 4.8,
};

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Embroidered Anarkali Kurta",
    mainCategory: "Ethnic Wear",
    gender: "Women",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.7,
    ratingCount: 312,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    status: "active",
    sizeAvailability: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 6 },
    ],
    exchangeAvailable: true,
    returnAvailable: true,
    description:
      "Hand-embroidered georgette anarkali with intricate threadwork.",
  },
  {
    id: "p2",
    name: "Slim Fit Linen Blazer",
    mainCategory: "Formal Wear",
    gender: "Men",
    price: 3799,
    originalPrice: 5200,
    discount: 27,
    rating: 4.5,
    ratingCount: 187,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b1e58?w=400&q=80",
    status: "active",
    sizeAvailability: [
      { size: "S", stock: 5 },
      { size: "M", stock: 11 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 2 },
    ],
    exchangeAvailable: true,
    returnAvailable: false,
    description: "Premium linen blazer with a contemporary slim silhouette.",
  },
  {
    id: "p3",
    name: "Banarasi Silk Saree",
    mainCategory: "Sarees",
    gender: "Women",
    price: 8999,
    originalPrice: 13500,
    discount: 33,
    rating: 4.9,
    ratingCount: 542,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&q=80",
    status: "active",
    sizeAvailability: [{ size: "Free Size", stock: 18 }],
    exchangeAvailable: false,
    returnAvailable: true,
    description: "Authentic handwoven Banarasi silk with gold zari borders.",
  },
  {
    id: "p4",
    name: "Oversized Graphic Hoodie",
    mainCategory: "Casual Wear",
    gender: "Unisex",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.3,
    ratingCount: 98,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    status: "active",
    sizeAvailability: [
      { size: "S", stock: 20 },
      { size: "M", stock: 25 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 10 },
      { size: "XXL", stock: 5 },
    ],
    exchangeAvailable: true,
    returnAvailable: true,
    description: "Heavyweight fleece hoodie with original graphic prints.",
  },
  {
    id: "p5",
    name: "Handblock Printed Kurti",
    mainCategory: "Ethnic Wear",
    gender: "Women",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.6,
    ratingCount: 274,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80",
    status: "inactive",
    sizeAvailability: [],
    exchangeAvailable: false,
    returnAvailable: false,
    description: "Jaipur block-printed cotton kurti — breathable and vibrant.",
  },
  {
    id: "p6",
    name: "Wool Blend Overcoat",
    mainCategory: "Winter Wear",
    gender: "Men",
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    rating: 4.4,
    ratingCount: 61,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400&q=80",
    status: "active",
    sizeAvailability: [
      { size: "M", stock: 4 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
    ],
    exchangeAvailable: false,
    returnAvailable: true,
    description: "Italian-inspired wool blend overcoat for the modern man.",
  },
];

const SellerProductsDetail = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams();

  const { verifiedSellers = [] } = useSelector(
    (state: any) => state.sellerManagement || {},
  );
  const { products = [] } = useSelector((state: any) => state.products || {});

  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/admin/login");
  }, [navigate]);

  // Use real data if available, else fallback to dummy
  const seller =
    verifiedSellers.find((s: any) => s.id === sellerId) || DUMMY_SELLER;

  const rawProducts =
    products.filter(
      (p: any) => p.sellerId === sellerId || p.sellerId === seller?.id,
    ).length > 0
      ? products.filter(
          (p: any) => p.sellerId === sellerId || p.sellerId === seller?.id,
        )
      : DUMMY_PRODUCTS;

  if (!seller && verifiedSellers.length > 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="spd-root">
          <div className="spd-not-found">
            <div style={{ fontSize: 48 }}>🔍</div>
            <h1>Seller not found</h1>
            <p>This seller does not exist or has been removed.</p>
            <button onClick={() => navigate("/admin/verified-sellers")}>
              Back to Sellers
            </button>
          </div>
        </div>
      </>
    );
  }

  const filteredProducts = rawProducts.filter((p: any) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return p.status !== "inactive";
    if (filterStatus === "inactive") return p.status === "inactive";
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="spd-root">
        {/* Topbar */}
        <div className="spd-topbar">
          <button
            className="spd-back"
            onClick={() => navigate("/admin/verified-sellers")}
          >
            ← Back
          </button>
          <div className="spd-breadcrumb">
            <span>Sellers</span>
            <span>›</span>
            <strong>{seller.storeName}</strong>
            <span>›</span>
            <span>Products</span>
          </div>
        </div>

        {/* Seller Hero */}
        <div className="spd-hero">
          <div className="spd-hero-stripe" />
          <div className="spd-hero-inner">
            <div className="spd-seller-avatar">
              {seller.storeName.charAt(0)}
            </div>

            <div>
              <div className="spd-seller-name">{seller.storeName}</div>
              <div className="spd-seller-owner">Owner: {seller.fullName}</div>
              {seller.storeDescription && (
                <div className="spd-seller-desc">{seller.storeDescription}</div>
              )}
              <div className="spd-contact-row">
                <div className="spd-contact-chip">📧 {seller.email}</div>
                <div className="spd-contact-chip">📱 {seller.phone}</div>
                <div className="spd-contact-chip">
                  📍 {seller.city}, {seller.state}
                </div>
              </div>
            </div>

            <div className="spd-quick-stats">
              <div className="spd-qs-item">
                <span className="spd-qs-label">Verified</span>
                <span
                  className="spd-qs-value"
                  style={{
                    fontSize: 13,
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {seller.verificationDate}
                </span>
              </div>
              <div className="spd-qs-item">
                <span className="spd-qs-label">Orders</span>
                <span className="spd-qs-value">
                  {(seller.totalOrders || 0).toLocaleString()}
                </span>
              </div>
              <div className="spd-qs-item">
                <span className="spd-qs-label">Rating</span>
                <span className="spd-qs-value">⭐ {seller.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="spd-controls">
          <div>
            <span className="spd-section-title">Products</span>
            <span className="spd-count-badge">{sortedProducts.length}</span>
          </div>
          <div className="spd-controls-right">
            <select
              className="spd-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <select
              className="spd-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Sort: Rating</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {sortedProducts.length === 0 ? (
          <div className="spd-empty">
            <div className="spd-empty-icon">📦</div>
            <h2>No Products Found</h2>
            <p>No products match the selected filter.</p>
          </div>
        ) : (
          <div className="spd-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="spd-card">
                {/* Image */}
                <div className="spd-img-wrap">
                  <img
                    className="spd-img"
                    src={product.image}
                    alt={product.name}
                    onError={(e: any) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80";
                    }}
                  />
                  {product.badge && (
                    <div className="spd-badge">{product.badge}</div>
                  )}
                  {product.discount && (
                    <div className="spd-discount">−{product.discount}%</div>
                  )}
                  {product.status === "inactive" && (
                    <div className="spd-inactive-overlay">Inactive</div>
                  )}
                </div>

                {/* Body */}
                <div className="spd-card-body">
                  <div className="spd-cat-row">
                    <div className="spd-cat">{product.mainCategory}</div>
                    <div className="spd-gender-pill">{product.gender}</div>
                  </div>

                  <div className="spd-product-name">{product.name}</div>

                  <div className="spd-price-row">
                    <div className="spd-price">
                      ₹{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="spd-original-price">
                        ₹{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {product.rating && (
                    <div className="spd-rating-row">
                      <div className="spd-stars">★ {product.rating}</div>
                      <div className="spd-review-count">
                        ({product.ratingCount || 0} reviews)
                      </div>
                    </div>
                  )}

                  {product.sizeAvailability &&
                  product.sizeAvailability.length > 0 ? (
                    <div className="spd-sizes">
                      {product.sizeAvailability.map((item: any, idx: any) => (
                        <div
                          key={idx}
                          className={`spd-size-chip ${
                            item.stock <= 3 ? "low" : ""
                          }`}
                          title={`${item.stock} left`}
                        >
                          {item.size}
                          {item.stock <= 3 && " ·" + item.stock}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#b8b0a4",
                        fontStyle: "italic",
                      }}
                    >
                      Out of stock
                    </div>
                  )}

                  {(product.exchangeAvailable || product.returnAvailable) && (
                    <div className="spd-features">
                      {product.exchangeAvailable && (
                        <div className="spd-feat">Exchange</div>
                      )}
                      {product.returnAvailable && (
                        <div className="spd-feat">Returns</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="spd-card-footer">
                  <button className="spd-view-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProductsDetail;
