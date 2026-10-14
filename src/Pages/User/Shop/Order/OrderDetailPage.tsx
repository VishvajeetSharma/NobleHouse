import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { cancelOrder } from "../../../../redux/OrderSlice";
import Header from "../../../../components/Header/Heading";

// ─── Status config ────────────────────────────────────────
const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  ordered: {
    label: "Ordered",
    color: "#1d4ed8",
    bg: "#dbeafe",
    dot: "#3b82f6",
  },
  confirmed: {
    label: "Confirmed",
    color: "#1d4ed8",
    bg: "#dbeafe",
    dot: "#3b82f6",
  },
  packed: {
    label: "Packed",
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
  out_for_delivery: {
    label: "Out for Delivery",
    color: "#0c4a6e",
    bg: "#dbeafe",
    dot: "#0284c7",
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
  returned: {
    label: "Returned",
    color: "#92400e",
    bg: "#fffbeb",
    dot: "#f59e0b",
  },
  exchanged: {
    label: "Exchanged",
    color: "#92400e",
    bg: "#fef3c7",
    dot: "#d97706",
  },
};
const getStatus = (s: string) =>
  statusConfig[s?.toLowerCase()] ?? {
    label: s,
    color: "#6b7280",
    bg: "#f3f4f6",
    dot: "#9ca3af",
  };

const ORDER_FLOW = [
  "ordered",
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

const formatLabel = (status: string) =>
  status === "out_for_delivery"
    ? "Out for Delivery"
    : status === "cancelled"
      ? "Cancelled"
      : status === "returned"
        ? "Returned"
        : status === "exchanged"
          ? "Exchanged"
          : status.charAt(0).toUpperCase() + status.slice(1);

const formatDate = (date: any) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDesc = (status: string) => {
  switch (status) {
    case "ordered":
      return "Your order has been placed successfully.";
    case "confirmed":
      return "Payment verified and order confirmed.";
    case "packed":
      return "Your items are being packed for shipment.";
    case "shipped":
      return "Handed over to the courier partner.";
    case "out_for_delivery":
      return "Your package is out for delivery.";
    case "delivered":
      return "Package delivered successfully.";
    case "cancelled":
      return "Order cancelled and process stopped.";
    case "returned":
      return "Item return process started.";
    case "exchanged":
      return "Exchange process started.";
    default:
      return "Order update received.";
  }
};

const buildOrderTimeline = (order: any) => {
  const history = Array.isArray(order.trackingHistory)
    ? order.trackingHistory
    : [];
  const statusMap = new Map<string, any>();
  history.forEach((entry: any) => {
    const status = String(entry.status || "").toLowerCase();
    if (status) statusMap.set(status, entry);
  });

  const cancelled = statusMap.has("cancelled");
  const returned = statusMap.has("returned");
  const exchanged = statusMap.has("exchanged");

  let flow = ORDER_FLOW;
  if (cancelled) {
    const completedStatuses = ORDER_FLOW.filter((status) =>
      statusMap.has(status),
    );
    const lastCompleted = completedStatuses.length
      ? completedStatuses[completedStatuses.length - 1]
      : "ordered";
    const lastIndex = ORDER_FLOW.indexOf(lastCompleted);
    flow = ORDER_FLOW.slice(0, lastIndex + 1);
  }

  const steps = flow.map((status) => {
    const entry = statusMap.get(status);
    return {
      status,
      label: formatLabel(status),
      desc: entry?.note || formatDesc(status),
      date: formatDate(entry?.date),
      done: Boolean(entry),
    };
  });

  if (cancelled) {
    const cancelledEntry = statusMap.get("cancelled");
    steps.push({
      status: "cancelled",
      label: formatLabel("cancelled"),
      desc: cancelledEntry?.note || formatDesc("cancelled"),
      date: formatDate(cancelledEntry?.date),
      done: true,
    });
  }

  if (returned && !steps.some((step) => step.status === "returned")) {
    const returnedEntry = statusMap.get("returned");
    steps.push({
      status: "returned",
      label: formatLabel("returned"),
      desc: returnedEntry?.note || formatDesc("returned"),
      date: formatDate(returnedEntry?.date),
      done: true,
    });
  }

  if (exchanged && !steps.some((step) => step.status === "exchanged")) {
    const exchangedEntry = statusMap.get("exchanged");
    steps.push({
      status: "exchanged",
      label: formatLabel("exchanged"),
      desc: exchangedEntry?.note || formatDesc("exchanged"),
      date: formatDate(exchangedEntry?.date),
      done: true,
    });
  }

  return steps;
};

// ─── Return timeline steps ────────────────────────────────
const returnSteps = [
  {
    label: "Return Requested",
    desc: "Your return request has been submitted",
    date: "27 Apr 2025, 11:00 AM",
    done: true,
  },
  {
    label: "Request Approved",
    desc: "Return approved by our team",
    date: "28 Apr 2025, 09:30 AM",
    done: true,
  },
  {
    label: "Pickup Scheduled",
    desc: "Courier will pick up within 2–3 days",
    date: "Expected: 30 Apr 2025",
    done: false,
  },
  {
    label: "Item Received",
    desc: "We have received your returned item",
    date: "Expected: 2 May 2025",
    done: false,
  },
  {
    label: "Refund Initiated",
    desc: "Refund credited to original payment source",
    date: "Expected: 5 May 2025",
    done: false,
  },
];

// ─── SVG Icons ────────────────────────────────────────────
const BackIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const InvoiceIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const SupportIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const ReturnIcon = () => (
  <svg
    width="14"
    height="14"
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
);
const LocationIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const TruckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const OrderDetailPage = () => {
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state: any) => state.order?.orders);
  const order = orders?.find((o: any) => o.id === String(id));
  const selectedItem = order?.items?.find(
    (i: any) => String(i.id) === String(itemId),
  );

  const returnRequests = useSelector((state: any) => state.return?.returns);
  const statusLower = order?.status?.toLowerCase();
  const isCancelled = statusLower === "cancelled";
  const isReturned =
    returnRequests?.some(
      (r: any) =>
        String(r.orderId) === String(id) && String(r.itemId) === String(itemId),
    ) || statusLower === "returned";
  const isExchanged = statusLower === "exchanged";
  const hasShipped = ["delivered"].includes(statusLower);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-white p-8 rounded-2xl border border-[#E7DCD7] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E7DCD7] flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A101C"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-[#241719] mb-2">
            Order not found
          </h3>
          <p className="text-sm text-[#75676A] mb-5">
            We couldn't find this couture order in your history.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white text-sm rounded-xl font-medium shadow-sm hover:opacity-95 transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const dispatch = useDispatch();

  const st = getStatus(order.status);
  const subtotal = selectedItem
    ? selectedItem.price * (selectedItem.quantity ?? 1)
    : 0;
  const shipping = 49;
  const discount = order.discount ?? 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax - discount;

  const canCancel =
    !["cancelled", "returned", "exchanged"].includes(statusLower) &&
    !hasShipped;

  const canReturnExchange =
    statusLower === "delivered" && !isReturned && !isCancelled && !isExchanged;

  const steps = buildOrderTimeline(order);

  const handleCancelOrder = () => {
    if (!canCancel) return;
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(
        cancelOrder({ orderId: order.orderId, reason: "User cancelled" }),
      );
    }
  };

  const handleExportPDF = async () => {
    const response = await fetch(
      "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf",
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
  };

  return (
    <>
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Animations ── */
        @keyframes returnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
          50%       { box-shadow: 0 0 0 7px rgba(245,158,11,0); }
        }
        @keyframes returnSlideIn {
          from { opacity: 0; transform: translateY(5px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmerReturn {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes badgeFadeIn {
          from { opacity: 0; transform: scale(.9); }
          to   { opacity: 1; transform: scale(1); }
        }

        .return-badge-wrap {
          margin-top: 8px;
          animation: returnSlideIn .45s cubic-bezier(.34,1.2,.64,1) both;
        }
        .return-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          color: #92400e;
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1px solid #fcd34d;
          padding: 5px 12px; border-radius: 20px;
        }
        .return-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f59e0b; flex-shrink: 0;
          animation: returnPulse 1.8s ease infinite;
        }
        .return-shimmer-text {
          background: linear-gradient(90deg, #92400e 0%, #b45309 30%, #d97706 50%, #b45309 70%, #92400e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerReturn 2.5s linear infinite;
        }

        /* ── Return timeline card ── */
        .return-timeline-card {
          background: #fff; border-radius: 14px;
          border: 1px solid #fde68a;
          box-shadow: 0 2px 16px rgba(245,158,11,.08);
          margin-bottom: 14px; overflow: hidden;
          animation: badgeFadeIn .4s ease both;
        }
        .rtc-hdr {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px; background: #fffbeb;
          border-bottom: 1px solid #fde68a;
        }
        .rtc-title {
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #b45309;
          display: flex; align-items: center; gap: 7px;
        }
        .rtc-refund-chip {
          font-size: 9px; font-weight: 700; letter-spacing: .08em;
          color: #15803d; background: #dcfce7;
          border: 1px solid #bbf7d0; padding: 3px 9px; border-radius: 20px;
        }
        .rtc-body { padding: 16px 18px; }

        /* ── Shared styles (same as before) ── */
        .odp-wrap { min-height:100vh; background:#FAF7F2; padding:32px 16px 60px; }
        .odp-inner { max-width:860px; margin:0 auto; }
        .odp-back { align-items:center; gap:7px; font-size:12px; font-weight:600; color:#4A101C; background:none; border:none; cursor:pointer; padding:0; margin-bottom:20px; transition:gap .2s; }
        .odp-back:hover { gap:11px; }
        .odp-page-hdr { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:24px; }
        .odp-left { display:flex; align-items:center; gap:12px; }
        .odp-accent { width:3.5px; height:44px; background:linear-gradient(180deg,#4A101C,#812D3A); border-radius:3px; flex-shrink:0; }
        .odp-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#241719; line-height:1.1; }
        .odp-title span { font-weight:400; }
        .odp-sub { font-size:11px; color:#75676A; font-weight:500; margin-top:3px; letter-spacing:.05em; }
        .odp-status-pill { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:6px 14px; border-radius:20px; }
        .odp-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .odp-card { background:#fff; border-radius:16px; border:1px solid #E7DCD7; box-shadow:0 2px 12px rgba(74,16,28,.04); margin-bottom:16px; overflow:hidden; }
        .odp-card-hdr { display:flex; align-items:center; justify-content:space-between; padding:13px 20px; background:#FAF7F2; border-bottom:1px solid #E7DCD7; }
        .odp-card-title { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#4A101C; display:flex; align-items:center; gap:7px; }
        .odp-card-body { padding:18px 20px; }
        .odp-track { display:flex; flex-direction:column; gap:0; }
        .odp-track-step { display:flex; gap:14px; }
        .odp-track-line { display:flex; flex-direction:column; align-items:center; flex-shrink:0; }
        .odp-track-circle { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .3s; }
        .odp-track-circle.done { background:linear-gradient(135deg,#4A101C,#812D3A); box-shadow:0 0 0 4px rgba(74,16,28,.15); }
        .odp-track-circle.pending { background:#f3f4f6; border:2px solid #e5e7eb; }
        .odp-track-circle.amber { background:linear-gradient(135deg,#f59e0b,#d97706); box-shadow:0 0 0 4px rgba(245,158,11,.12); }
        .odp-track-circle.cancelled { background:linear-gradient(135deg,#dc2626,#b91c1c); box-shadow:0 0 0 4px rgba(220,38,38,.14); }
        .odp-track-connector { width:2px; flex:1; min-height:24px; margin:3px 0; }
        .odp-track-connector.done { background:linear-gradient(180deg,#4A101C,#812D3A); }
        .odp-track-connector.amber { background:linear-gradient(180deg,#f59e0b,#d97706); }
        .odp-track-connector.cancelled { background:linear-gradient(180deg,#dc2626,#b91c1c); }
        .odp-track-connector.pending { background:#e5e7eb; border-left:2px dashed #e5e7eb; width:0; }
        .odp-track-content { padding-bottom:22px; padding-top:3px; }
        .odp-track-label { font-size:13px; font-weight:600; color:#241719; margin-bottom:2px; }
        .odp-track-label.pending { color:#9ca3af; }
        .odp-track-label.cancelled { color:#991b1b; }
        .odp-track-desc { font-size:11px; color:#75676A; margin-bottom:2px; }
        .odp-track-date { font-size:10px; color:#75676A; font-weight:500; }
        .odp-item { display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid #E7DCD7; }
        .odp-item:last-child { border-bottom:none; padding-bottom:0; }
        .odp-item-img { width:64px; height:64px; border-radius:10px; object-fit:cover; border:1px solid #E7DCD7; flex-shrink:0; }
        .odp-item-img-ph { width:64px; height:64px; border-radius:10px; flex-shrink:0; background:#FAF7F2; border:1px solid #E7DCD7; display:flex; align-items:center; justify-content:center; }
        .odp-item-name { font-size:13px; font-weight:600; color:#241719; margin-bottom:3px; }
        .odp-item-cat { font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#4A101C; background:#FAF7F2; border:1px solid #E7DCD7; padding:2px 7px; border-radius:4px; display:inline-block; }
        .odp-item-qty { font-size:11px; color:#75676A; margin-top:2px; }
        .odp-item-prices { text-align:right; flex-shrink:0; }
        .odp-item-price { font-size:15px; font-weight:700; color:#4A101C; display:block; font-family:'Playfair Display',serif; }
        .odp-item-orig { font-size:11px; color:#75676A; text-decoration:line-through; display:block; }
        .odp-price-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:13px; color:#75676A; }
        .odp-price-row.total { font-size:15px; font-weight:700; color:#241719; margin-top:10px; padding-top:10px; border-top:1px dashed #E7DCD7; }
        .odp-price-val { font-weight:500; }
        .odp-price-val.green { color:#287653; font-weight:600; }
        .odp-price-val.pink { color:#4A101C; font-weight:700; font-size:16px; font-family:'Playfair Display',serif; }
        .odp-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:560px){ .odp-info-grid { grid-template-columns:1fr; } }
        .odp-info-box { background:#FAF7F2; border:1px solid #E7DCD7; border-radius:12px; padding:14px; }
        .odp-info-box-title { font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#4A101C; margin-bottom:8px; }
        .odp-info-line { font-size:12px; color:#75676A; line-height:1.6; }
        .odp-info-line b { color:#241719; }
        .odp-actions { display:flex; flex-wrap:wrap; gap:10px; }
        .odp-btn { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:9px 18px; border-radius:8px; cursor:pointer; transition:all .2s; border:none; }
        .odp-btn-outline { background:#fff; color:#4A101C; border:1.5px solid #E7DCD7; }
        .odp-btn-outline:hover { background:#FAF7F2; border-color:#4A101C; }
        .odp-btn-danger { background:#fff; color:#b91c1c; border:1.5px solid #fecaca; }
        .odp-btn-danger:hover { background:#fef2f2; border-color:#ef4444; }
        .odp-btn-primary { background:linear-gradient(135deg,#4A101C,#812D3A); color:#fff; border:none; box-shadow:0 4px 14px rgba(74,16,28,.2); }
        .odp-btn-primary:hover { opacity:.94; transform:translateY(-1px); }
        .odp-tracking-id { display:inline-flex; align-items:center; gap:7px; background:#FAF7F2; border:1px solid #E7DCD7; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:600; color:#4A101C; letter-spacing:.04em; }
        .odp-copy-btn { font-size:9px; background:#E8D9C9; color:#4A101C; border:none; padding:2px 7px; border-radius:4px; cursor:pointer; font-weight:700; transition:background .2s; }
        .odp-copy-btn:hover { background:#4A101C; color:#fff; }
        .odp-two-col { display:grid; grid-template-columns:1fr 340px; gap:14px; align-items:start; }
        @media(max-width:720px){ .odp-two-col { grid-template-columns:1fr; } }
      `}</style>

      <div className="odp-wrap">
        <div className="odp-inner">
          {/* Back */}
          <button
            className="odp-back md:hidden"
            onClick={() => navigate("/orders")}
          >
            <BackIcon /> Back to Orders
          </button>

          {/* Page header */}
          <div className="odp-page-hdr">
            <div className="odp-left">
              <div className="odp-accent" />
              <div>
                <h1 className="odp-title">
                  <span>Order </span>#{String(order.id).padStart(6, "0")}
                </h1>
                <p className="odp-sub">
                  Placed on{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "24 April 2025"}
                  {order.paymentMethod && ` · Paid via ${order.paymentMethod}`}
                </p>
              </div>
            </div>
            <span
              className="odp-status-pill"
              style={{ color: st.color, background: st.bg }}
            >
              <span className="odp-dot" style={{ background: st.dot }} />
              {st.label}
            </span>
          </div>

          {/* Two column layout */}
          <div className="odp-two-col">
            {/* ── LEFT col ── */}
            <div>
              {/* Items */}
              <div className="odp-card">
                <div className="odp-card-hdr">
                  <span className="odp-card-title">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    Order Items
                  </span>
                </div>
                <div className="odp-card-body">
                  {selectedItem ? (
                    <div className="odp-item">
                      {selectedItem.image ? (
                        <img
                          className="odp-item-img"
                          src={selectedItem.image}
                          alt={selectedItem.name}
                        />
                      ) : (
                        <div className="odp-item-img-ph">No Image</div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div className="odp-item-name">{selectedItem.name}</div>
                        {selectedItem.category && (
                          <span className="odp-item-cat">
                            {selectedItem.category}
                          </span>
                        )}
                        <div className="odp-item-qty">
                          Qty: {selectedItem.quantity ?? 1}
                        </div>
                        {selectedItem.size && (
                          <div className="odp-item-qty">
                            Size: {selectedItem.size}
                          </div>
                        )}

                        {/* ── Animated return badge ── */}
                        {isReturned && (
                          <div className="return-badge-wrap">
                            <span className="return-badge">
                              <span className="return-dot" />
                              <span className="return-shimmer-text">
                                Return Requested
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="odp-item-prices">
                        <span className="odp-item-price">
                          ₹{Number(selectedItem.price).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p>No item found</p>
                  )}
                </div>
              </div>

              {/* ── TRACKING — hidden when returned ── */}
              {!isReturned && (
                <div className="odp-card">
                  <div className="odp-card-hdr">
                    <span className="odp-card-title">
                      <TruckIcon /> Shipment Tracking
                    </span>
                    <div className="odp-tracking-id">
                      <span>AWB: IN4829301745</span>
                      <button className="odp-copy-btn">COPY</button>
                    </div>
                  </div>
                  <div className="odp-card-body">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "20px",
                        padding: "10px 14px",
                        background: "#f5f0ff",
                        borderRadius: "10px",
                        border: "1px solid #e9d5ff",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "8px",
                          background: "linear-gradient(135deg,#4A101C,#812D3A)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <TruckIcon />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#241719",
                          }}
                        >
                          Delhivery Express
                        </p>
                        <p style={{ fontSize: "10px", color: "#75676A" }}>
                          Estimated delivery:{" "}
                          <b style={{ color: "#4A101C" }}>26 April 2025</b>
                        </p>
                      </div>
                      <a
                        href="#"
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#4A101C",
                          textDecoration: "none",
                        }}
                      >
                        Track on courier →
                      </a>
                    </div>
                    <div className="odp-track">
                      {steps.map((step, i) => {
                        const cancelledStep = step.status === "cancelled";
                        const circleClass = cancelledStep
                          ? "cancelled"
                          : step.done
                            ? "done"
                            : "pending";
                        const connectorClass = cancelledStep
                          ? "cancelled"
                          : step.done && steps[i + 1]?.done
                            ? "done"
                            : "pending";
                        return (
                          <div className="odp-track-step" key={i}>
                            <div className="odp-track-line">
                              <div
                                className={`odp-track-circle ${circleClass}`}
                              >
                                {step.done || cancelledStep ? (
                                  <CheckIcon />
                                ) : (
                                  <span
                                    style={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      background: "#d1d5db",
                                      display: "block",
                                    }}
                                  />
                                )}
                              </div>
                              {i < steps.length - 1 && (
                                <div
                                  className={`odp-track-connector ${connectorClass}`}
                                />
                              )}
                            </div>
                            <div className="odp-track-content">
                              <p
                                className={`odp-track-label ${cancelledStep ? "cancelled" : ""}`}
                              >
                                {step.label}
                              </p>
                              <p className="odp-track-desc">{step.desc}</p>
                              <p className="odp-track-date">{step.date}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── RETURN TIMELINE — shown when returned (fills the space) ── */}
              {isReturned && (
                <div className="return-timeline-card">
                  <div className="rtc-hdr">
                    <span className="rtc-title">
                      <ReturnIcon /> Return Timeline
                    </span>
                    <span className="rtc-refund-chip">
                      Refund: ₹
                      {Number(selectedItem?.price ?? 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="odp-card-body">
                    {/* Courier pickup info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "20px",
                        padding: "10px 14px",
                        background: "#fffbeb",
                        borderRadius: "10px",
                        border: "1px solid #fde68a",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "8px",
                          background: "linear-gradient(135deg,#f59e0b,#d97706)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <TruckIcon />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#0a1628",
                          }}
                        >
                          Pickup by Delhivery
                        </p>
                        <p style={{ fontSize: "10px", color: "#92400e" }}>
                          Expected pickup:{" "}
                          <b style={{ color: "#b45309" }}>30 April 2025</b>
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "#b45309",
                          background: "#fef3c7",
                          border: "1px solid #fcd34d",
                          padding: "3px 8px",
                          borderRadius: "20px",
                        }}
                      >
                        Scheduled
                      </span>
                    </div>

                    {/* Return steps */}
                    <div className="odp-track">
                      {returnSteps.map((step, i) => (
                        <div className="odp-track-step" key={i}>
                          <div className="odp-track-line">
                            <div
                              className={`odp-track-circle ${step.done ? "amber" : "pending"}`}
                            >
                              {step.done ? (
                                <CheckIcon />
                              ) : (
                                <span
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#d1d5db",
                                    display: "block",
                                  }}
                                />
                              )}
                            </div>
                            {i < returnSteps.length - 1 && (
                              <div
                                className={`odp-track-connector ${step.done ? "amber" : "pending"}`}
                              />
                            )}
                          </div>
                          <div className="odp-track-content">
                            <p
                              className={`odp-track-label ${!step.done ? "pending" : ""}`}
                              style={step.done ? { color: "#92400e" } : {}}
                            >
                              {step.label}
                            </p>
                            <p className="odp-track-desc">{step.desc}</p>
                            <p className="odp-track-date">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="odp-card">
                <div className="odp-card-hdr">
                  <span className="odp-card-title">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Actions
                  </span>
                </div>
                <div className="odp-card-body">
                  <div className="odp-actions">
                    <button
                      className="odp-btn odp-btn-outline"
                      onClick={handleExportPDF}
                    >
                      <InvoiceIcon /> Download Invoice
                    </button>
                    <button
                      className="odp-btn odp-btn-outline"
                      onClick={() => {
                        navigate("/faq");
                        window.scrollTo(0, 0);
                      }}
                    >
                      <SupportIcon /> Contact Support
                    </button>
                    {canReturnExchange && (
                      <button
                        className="odp-btn odp-btn-outline"
                        onClick={() => {
                          navigate(
                            `/return/${order.id}/${selectedItem.id}/${selectedItem.sellerId}`,
                          );
                        }}
                      >
                        <ReturnIcon />
                        Return / Exchange
                      </button>
                    )}
                    {canCancel && (
                      <button
                        className="odp-btn odp-btn-danger"
                        disabled={isReturned}
                        style={{
                          opacity: isReturned ? 0.5 : 1,
                          cursor: isReturned ? "not-allowed" : "pointer",
                        }}
                        onClick={handleCancelOrder}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="odp-card">
                <div className="odp-card-hdr">
                  <span className="odp-card-title">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                    Price Details
                  </span>
                </div>
                <div className="odp-card-body">
                  <div className="odp-price-row">
                    <span>Subtotal</span>
                    <span className="odp-price-val">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="odp-price-row">
                    <span>Shipping</span>
                    <span className="odp-price-val green">₹{shipping}</span>
                  </div>
                  {discount > 0 && (
                    <div className="odp-price-row">
                      <span>Discount</span>
                      <span className="odp-price-val green">−₹{discount}</span>
                    </div>
                  )}
                  <div className="odp-price-row">
                    <span>Taxes & Fees</span>
                    <span className="odp-price-val">₹{tax}</span>
                  </div>
                  <div className="odp-price-row total">
                    <span>Total Paid</span>
                    <span className="odp-price-val pink">₹{total}</span>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      padding: "10px 12px",
                      background: "#FAF7F2",
                      borderRadius: "8px",
                      border: "1px solid #E7DCD7",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4A101C"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          marginBottom: "1px",
                        }}
                      >
                        Payment Method
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#0a1628",
                        }}
                      >
                        {order.paymentMethod ?? "Online Payment"}
                      </p>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#16a34a",
                        background: "#dcfce7",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      PAID
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery & Address */}
              <div className="odp-card">
                <div className="odp-card-hdr">
                  <span className="odp-card-title">
                    <LocationIcon /> Delivery Info
                  </span>
                </div>
                <div className="odp-card-body">
                  <div className="odp-info-grid">
                    <div className="odp-info-box">
                      <p className="odp-info-box-title">Deliver To</p>
                      <p className="odp-info-line">
                        <b>Riya Sharma</b>
                      </p>
                      <p className="odp-info-line">
                        42, Linking Road, Bandra West
                      </p>
                      <p className="odp-info-line">
                        Mumbai, Maharashtra — 400050
                      </p>
                      <p className="odp-info-line" style={{ marginTop: "4px" }}>
                        📞 +91 98765 43210
                      </p>
                    </div>
                    <div className="odp-info-box">
                      <p className="odp-info-box-title">Delivery Window</p>
                      <p className="odp-info-line">
                        <b>Expected By</b>
                      </p>
                      <p
                        className="odp-info-line"
                        style={{ color: "#7c3aed", fontWeight: 600 }}
                      >
                        26 April 2025
                      </p>
                      <p className="odp-info-line" style={{ marginTop: "6px" }}>
                        <b>Courier</b>
                      </p>
                      <p className="odp-info-line">Delhivery Express</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate order (only delivered) */}
              {order.status?.toLowerCase() === "delivered" && (
                <div className="odp-card">
                  <div className="odp-card-hdr">
                    <span className="odp-card-title">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Rate this Order
                    </span>
                  </div>
                  <div
                    className="odp-card-body"
                    style={{ textAlign: "center" }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "12px",
                      }}
                    >
                      How was your experience with this order?
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                        marginBottom: "14px",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          style={{
                            width: 32,
                            height: 32,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="#fde68a"
                            stroke="#f59e0b"
                            strokeWidth="1.3"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <button
                      className="odp-btn odp-btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;
