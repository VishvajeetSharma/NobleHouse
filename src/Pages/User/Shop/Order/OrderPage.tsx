import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../../../components/Header/Heading";
const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  pending: {
    label: "Pending",
    color: "#b45309",
    bg: "#fef3c7",
    dot: "#f59e0b",
  },
  confirmed: {
    label: "Confirmed",
    color: "#1d4ed8",
    bg: "#dbeafe",
    dot: "#3b82f6",
  },
  processing: {
    label: "Processing",
    color: "#7c3aed",
    bg: "#ede9fe",
    dot: "#8b5cf6",
  },
  shipped: {
    label: "Shipped",
    color: "#0369a1",
    bg: "#e0f2fe",
    dot: "#0ea5e9",
  },
  delivered: {
    label: "Delivered",
    color: "#15803d",
    bg: "#dcfce7",
    dot: "#22c55e",
  },
  cancelled: {
    label: "Cancelled",
    color: "#b91c1c",
    bg: "#fee2e2",
    dot: "#ef4444",
  },
};

const getStatus = (s: string) =>
  statusConfig[s?.toLowerCase()] ?? {
    label: s,
    color: "#6b7280",
    bg: "#f3f4f6",
    dot: "#9ca3af",
  };

const OrdersPage = () => {
  const navigate = useNavigate();
  const orders = useSelector((state: any) => state.order.orders);
  console.log("orders", orders);

  return (
    <>
      <style>{`
        .op-wrap {
          min-height: 100vh;
          background: #FAF7F2;
          padding: 36px 20px 60px;
        }

        /* ── Header ── */
        .op-header {
          max-width: 900px;
          margin: 0 auto 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .op-header-left { display: flex; align-items: center; gap: 12px; }
        .op-accent { width: 3.5px; height: 44px; background: linear-gradient(180deg, #4A101C, #812D3A); border-radius: 3px; flex-shrink: 0; }
        .op-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; color: #241719; line-height: 1.1;
        }
        .op-title span { font-weight: 400; }
        .op-sub { font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #75676A; margin-top: 4px; }
        .op-count-chip {
          background: linear-gradient(135deg, #4A101C, #812D3A);
          color: #fff; font-size: 11px; font-weight: 700;
          padding: 5px 14px; border-radius: 20px;
          letter-spacing: .04em;
          box-shadow: 0 2px 8px rgba(74,16,28,.2);
        }

        /* ── Empty ── */
        .op-empty {
          max-width: 420px; margin: 80px auto 0;
          text-align: center;
          background: #ffffff;
          padding: 40px 24px;
          border-radius: 20px;
          border: 1px solid #E7DCD7;
          box-shadow: 0 4px 20px rgba(74,16,28,.04);
        }
        .op-empty-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: #FAF7F2; border: 1px solid #E7DCD7;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .op-empty h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: #241719; margin-bottom: 8px;
        }
        .op-empty p { font-size: 13px; color: #75676A; line-height: 1.6; }
        .op-shop-btn {
          margin-top: 20px; display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #4A101C, #812D3A);
          color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; padding: 12px 24px; border-radius: 12px;
          border: none; cursor: pointer;
          transition: all .2s;
          box-shadow: 0 4px 14px rgba(74,16,28,.25);
        }
        .op-shop-btn:hover { opacity: .94; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(74,16,28,.32); }

        /* ── Order card ── */
        .op-list { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }

        .op-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #E7DCD7;
          box-shadow: 0 2px 12px rgba(74,16,28,.04);
          overflow: hidden;
          transition: box-shadow .25s, transform .25s;
        }
        .op-card:hover {
          box-shadow: 0 8px 28px rgba(74,16,28,.08);
          transform: translateY(-2px);
        }

        /* top strip */
        .op-card-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 20px;
          background: #FAF7F2;
          border-bottom: 1px solid #E7DCD7;
          flex-wrap: wrap; gap: 8px;
        }
        .op-id { font-size: 12px; font-weight: 700; color: #241719; letter-spacing: .06em; text-transform: uppercase; }
        .op-id span { color: #75676A; font-weight: 500; }
        .op-top-right { display: flex; align-items: center; gap: 10px; }
        .op-date { font-size: 11px; color: #75676A; font-weight: 500; }

        .op-status {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 20px;
        }
        .op-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* items area */
        .op-items { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }

        .op-item {
          display: flex; align-items: center; gap: 14px;
        }
        .op-item-img {
          width: 64px; height: 64px; border-radius: 10px;
          object-fit: cover; flex-shrink: 0;
          border: 1px solid #E7DCD7;
          background: #FAF7F2;
        }
        .op-item-img-placeholder {
          width: 64px; height: 64px; border-radius: 10px; flex-shrink: 0;
          background: #FAF7F2;
          border: 1px solid #E7DCD7;
          display: flex; align-items: center; justify-content: center;
        }
        .op-item-info { flex: 1; min-width: 0; }
        .op-item-name {
          font-size: 14px; font-weight: 600; color: #241719;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .op-item-cat {
          font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
          color: #4A101C; background: #FAF7F2; border: 1px solid #E7DCD7;
          padding: 2.5px 8px; border-radius: 6px; display: inline-block;
        }
        .op-item-size {
          font-size: 11px; color: #75676A; font-weight: 500; margin-top: 3px;
        }
        .op-item-prices { text-align: right; flex-shrink: 0; }
        .op-item-price { font-size: 15px; font-weight: 700; color: #4A101C; display: block; font-family: 'Playfair Display', serif; }
        .op-item-orig { font-size: 11px; color: #75676A; text-decoration: line-through; display: block; }
        .op-item-qty { font-size: 11px; color: #75676A; margin-top: 2px; }

        /* divider inside items */
        .op-item-divider { height: 1px; background: #E7DCD7; }

        /* card footer */
        .op-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 20px;
          background: #FAF7F2;
          border-top: 1px solid #E7DCD7;
          flex-wrap: wrap; gap: 8px;
        }
        .op-footer-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .op-meta-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #75676A; }
        .op-meta-item svg { opacity: .7; }
        .op-total-row { display: flex; align-items: baseline; gap: 6px; }
        .op-total-label { font-size: 11px; color: #75676A; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
        .op-total {
          font-size: 18px; font-weight: 700; color: #4A101C;
          font-family: 'Playfair Display', serif;
        }

        /* Track btn */
        .op-track-btn {
          font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          color: #4A101C; background: #ffffff;
          border: 1.5px solid #4A101C; padding: 5px 12px; border-radius: 8px;
          cursor: pointer; display: flex; align-items: center; gap: 3px;
          transition: all .2s;
        }
        .op-track-btn:hover { background: #4A101C; color: #ffffff; }

        /* responsive */
        @media (max-width: 600px) {
          .op-header { flex-direction: column; align-items: flex-start; }
          .op-card-top { flex-direction: column; align-items: flex-start; }
          .op-card-footer { flex-direction: column; align-items: flex-start; }
          .op-item-img, .op-item-img-placeholder { width: 50px; height: 50px; }
        }
      `}</style>
      <Header />
      <div className="op-wrap">
        {/* Header */}
        <div className="op-header">
          <div className="op-header-left">
            <div className="op-accent" />
            <div>
              <h1 className="op-title">
                <span>My </span>Orders
              </h1>
              <p className="op-sub">Order history &amp; tracking</p>
            </div>
          </div>
          {orders.length > 0 && (
            <span className="op-count-chip">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="op-empty">
            <div className="op-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="#c4d0e8"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6h18M16 10a4 4 0 01-8 0"
                  stroke="#c4d0e8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>No orders yet</h3>
            <p>
              Your order history will appear here once you make your first
              purchase.
            </p>
            <button
              className="op-shop-btn"
              onClick={() => navigate("/DashBoard")}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 3l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="op-list">
            {orders.map((order: any) => {
              const st = getStatus(order.status);
              const items: any[] = order.items ?? [];
              const itemCount = items.reduce(
                (s: number, i: any) => s + (i.quantity ?? 1),
                0
              );

              return (
                <div className="op-card" key={order.id}>
                  {/* Top strip */}
                  <div className="op-card-top">
                    <div className="op-id">
                      Order <span>#</span>
                      {String(order.id).padStart(6, "0")}
                    </div>
                    <div className="op-top-right">
                      {order.date && (
                        <span className="op-date">
                          {new Date(order.date).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      )}

                      <span
                        className="op-status"
                        style={{ color: st.color, background: st.bg }}
                      >
                        <span
                          className="op-status-dot"
                          style={{ background: st.dot }}
                        />
                        {st.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="op-items">
                    {items.length > 0 ? (
                      items.map((item: any, idx: number) => (
                        <div key={item.id ?? idx}>
                          <div className="op-item">
                            {item.image ? (
                              <img
                                className="op-item-img"
                                src={item.image}
                                alt={item.name}
                              />
                            ) : (
                              <div className="op-item-img-placeholder">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="3"
                                    stroke="#c4d0e8"
                                    strokeWidth="1.5"
                                  />
                                  <circle
                                    cx="8.5"
                                    cy="8.5"
                                    r="1.5"
                                    stroke="#c4d0e8"
                                    strokeWidth="1.3"
                                  />
                                  <path
                                    d="M21 15l-5-5L5 21"
                                    stroke="#c4d0e8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            )}
                            <div className="op-item-info">
                              <div className="op-item-name">
                                {item.name ?? "Product"}
                              </div>
                              {item.status && (
                                <span className="op-item-cat">
                                  {item.status}
                                </span>
                              )}
                              {item.category && (
                                <span className="op-item-cat">
                                  {item.category}
                                </span>
                              )}

                              {item.size && (
                                <div className="op-item-size">
                                  Size: {item.size}
                                </div>
                              )}
                              {item.quantity && item.quantity > 1 && (
                                <div className="op-item-qty">
                                  Qty: {item.quantity}
                                </div>
                              )}
                            </div>
                            <button
                              className="op-track-btn"
                              onClick={() =>
                                navigate(`/orderDetail/${order.id}/${item.id}`)
                              }
                            >
                              Track
                              <svg
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
                            <div className="op-item-prices">
                              <span className="op-item-price">
                                ₹{Number(item.price).toLocaleString("en-IN")}
                              </span>
                              {item.originalPrice &&
                                item.originalPrice !== item.price && (
                                  <span className="op-item-orig">
                                    ₹
                                    {Number(item.originalPrice).toLocaleString(
                                      "en-IN"
                                    )}
                                  </span>
                                )}
                            </div>
                          </div>
                          {idx < items.length - 1 && (
                            <div className="op-item-divider" />
                          )}
                        </div>
                      ))
                    ) : (
                      /* fallback if no items array */
                      <div className="op-item">
                        <div className="op-item-img-placeholder">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="3"
                              stroke="#c4d0e8"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <div className="op-item-info">
                          <div className="op-item-name">
                            Order #{String(order.id).padStart(6, "0")}
                          </div>
                        </div>
                        <div className="op-item-prices">
                          <span className="op-item-price">
                            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="op-card-footer">
                    <div className="op-footer-meta">
                      {itemCount > 0 && (
                        <div className="op-meta-item">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M1 1h1.5l1 5h5.5l1-3.5H4"
                              stroke="#1d3461"
                              strokeWidth="1.1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="5.5" cy="10" r="1" fill="#1d3461" />
                            <circle cx="9" cy="10" r="1" fill="#1d3461" />
                          </svg>
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </div>
                      )}
                      {order.paymentMethod && (
                        <div className="op-meta-item">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <rect
                              x="1"
                              y="2.5"
                              width="10"
                              height="7"
                              rx="1.5"
                              stroke="#1d3461"
                              strokeWidth="1.1"
                            />
                            <path
                              d="M1 5h10"
                              stroke="#1d3461"
                              strokeWidth="1.1"
                            />
                          </svg>
                          {order.paymentMethod}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div className="op-total-row">
                        <span className="op-total-label">Total</span>
                        <span className="op-total">
                          ₹{Number(order.amount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
