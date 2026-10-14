import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingSellers: [
    {
      id: "seller_001",
      fullName: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91-9876543210",
      storeName: "Kumar Fashion Store",
      storeDescription: "Premium clothing and fashion accessories",
      gstNumber: "18AABCT1234H1Z0",
      panNumber: "AABCT1234H",
      address: "123, Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      category: "Fashion",
      secondaryCategories: ["Men", "Clothing"],
      website: "www.kumarfashion.com",
      registrationDate: "2024-05-01",
      status: "pending",
      documents: [
        { type: "GST Certificate", url: "doc1.pdf" },
        { type: "PAN Card", url: "doc2.pdf" },
      ],
    },
    {
      id: "seller_002",
      fullName: "Priya Electronics",
      email: "priya@electronics.com",
      phone: "+91-9123456789",
      storeName: "Priya Electronics Hub",
      storeDescription: "Latest electronics and gadgets",
      gstNumber: "27AABCE5678K1Z9",
      panNumber: "AABCE5678K",
      address: "456, Tech Park",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      category: "Electronics",
      secondaryCategories: ["Mobile", "Laptops"],
      website: "www.priyaelectronics.com",
      registrationDate: "2024-05-02",
      status: "pending",
      documents: [
        { type: "GST Certificate", url: "doc3.pdf" },
        { type: "PAN Card", url: "doc4.pdf" },
      ],
    },
  ],
  verifiedSellers: [
    {
      id: "seller_verified_001",
      fullName: "Amit Sharma",
      email: "amit@shop.com",
      phone: "+91-8765432109",
      storeName: "Amit's General Store",
      storeDescription: "Quality products at affordable prices",
      gstNumber: "06AABCT9999H1Z5",
      panNumber: "AABCT9999H",
      address: "789, Market Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      category: "General",
      secondaryCategories: ["Groceries", "Household"],
      website: "www.amitstore.com",
      registrationDate: "2024-04-01",
      verificationDate: "2024-04-10",
      status: "verified",
      totalProducts: 45,
      totalOrders: 230,
      rating: 4.5,
      instagram: "amitsharma",
      facebook: "amitsharma123",
    },
    {
      id: "seller_verified_002",
      fullName: "Sneha Home Decor",
      email: "sneha@homedecor.com",
      phone: "+91-7654321098",
      storeName: "Sneha's Home Decor",
      storeDescription: "Beautiful home decoration items",
      gstNumber: "33AABCE1111K2Z7",
      panNumber: "AABCE1111K",
      address: "321, Design Street",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      category: "Home & Decor",
      secondaryCategories: ["Furniture", "Wall Art"],
      website: "www.snehahomedecor.com",
      registrationDate: "2024-03-15",
      verificationDate: "2024-03-25",
      status: "verified",
      totalProducts: 78,
      totalOrders: 456,
      rating: 4.8,
      instagram: "snehahomedecor",
      facebook: "sneha.decor",
    },
  ],
  rejectedSellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
};

const sellerManagementSlice = createSlice({
  name: "sellerManagement",
  initialState,
  reducers: {
    acceptSeller: (state, action) => {
      const sellerId = action.payload;
      const sellerIndex = state.pendingSellers.findIndex(
        (s) => s.id === sellerId,
      );

      if (sellerIndex !== -1) {
        const seller = state.pendingSellers[sellerIndex];
        seller.status = "verified";
        seller.verificationDate = new Date().toISOString().split("T")[0];
        state.verifiedSellers.push(seller);
        state.pendingSellers.splice(sellerIndex, 1);
      }
    },

    rejectSeller: (state, action) => {
      const { sellerId, reason } = action.payload;
      const sellerIndex = state.pendingSellers.findIndex(
        (s) => s.id === sellerId,
      );

      if (sellerIndex !== -1) {
        const seller = state.pendingSellers[sellerIndex];
        seller.status = "rejected";
        seller.rejectionReason = reason;
        state.rejectedSellers.push(seller);
        state.pendingSellers.splice(sellerIndex, 1);
      }
    },

    selectSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },

    addPendingSeller: (state, action) => {
      state.pendingSellers.push({
        ...action.payload,
        status: "pending",
        registrationDate: new Date().toISOString().split("T")[0],
      });
    },

    suspendSeller: (state, action) => {
      const { sellerId, reason } = action.payload;
      const seller = state.verifiedSellers.find((s) => s.id === sellerId);
      if (seller) {
        seller.status = "suspended";
        seller.suspensionReason = reason;
      }
    },

    reactivateSeller: (state, action) => {
      const sellerId = action.payload;
      const seller = state.verifiedSellers.find((s) => s.id === sellerId);
      if (seller) {
        seller.status = "verified";
        delete seller.suspensionReason;
      }
    },

    updateSellerStats: (state, action) => {
      const { sellerId, stats } = action.payload;
      const seller = state.verifiedSellers.find((s) => s.id === sellerId);
      if (seller) {
        Object.assign(seller, stats);
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  acceptSeller,
  rejectSeller,
  selectSeller,
  addPendingSeller,
  suspendSeller,
  reactivateSeller,
  updateSellerStats,
  setLoading,
  setError,
} = sellerManagementSlice.actions;

export default sellerManagementSlice.reducer;
