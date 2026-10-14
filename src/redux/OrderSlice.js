import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // 🟢 Place Order
    placeOrder: (state, action) => {
      const order = {
        id: action.payload.id || Date.now().toString(),
        orderId: action.payload.orderId || `ORD-${Date.now()}`,
        customerName: action.payload.customerName || "Unknown",
        customerEmail: action.payload.customerEmail || "",
        customerPhone: action.payload.customerPhone || "",
        amount: action.payload.amount ?? 0,
        status: action.payload.status || "ordered",
        paymentStatus: action.payload.paymentStatus || "pending",
        items: action.payload.items || [],
        date: action.payload.date || new Date().toISOString(),
        estimatedDelivery: action.payload.estimatedDelivery || null,
        trackingId: action.payload.trackingId || `TRK-${Date.now()}`,
        trackingHistory: [
          {
            status: "ordered",
            date: new Date().toISOString(),
            note: "Order placed successfully",
          },
        ],
      };

      state.orders.unshift(order);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status, note } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.status = status;
        order.trackingHistory.push({
          status,
          date: new Date().toISOString(),
          note: note || `Status updated to ${status}`,
        });
      }
    },
    cancelOrder: (state, action) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (
        order &&
        ![
          "shipped",
          "out_for_delivery",
          "delivered",
          "returned",
          "exchanged",
          "cancelled",
        ].includes(order.status)
      ) {
        order.status = "cancelled";
        order.trackingHistory.push({
          status: "cancelled",
          date: new Date().toISOString(),
          note: `Order cancelled: ${reason || "User requested cancellation"}`,
        });
      }
    },
    returnOrder: (state, action) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order && order.status === "delivered") {
        order.status = "returned";
        order.trackingHistory.push({
          status: "returned",
          date: new Date().toISOString(),
          note: `Return initiated: ${reason || "User requested return"}`,
        });
      }
    },
    exchangeOrder: (state, action) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order && order.status === "delivered") {
        order.status = "exchanged";
        order.trackingHistory.push({
          status: "exchanged",
          date: new Date().toISOString(),
          note: `Exchange initiated: ${reason || "User requested exchange"}`,
        });
      }
    },
  },
});

export const {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  returnOrder,
  exchangeOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
