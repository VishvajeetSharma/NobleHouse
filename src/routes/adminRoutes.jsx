import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminLogin from "../Pages/Admin/AdminLogin";
import PendingSellers from "../Pages/Admin/PendingSellers";
import VerifiedSellers from "../Pages/Admin/VerifiedSellers";
import SellerProductsDetail from "../Pages/Admin/SellerProductsDetail";
import SellerPaymentManagement from "../Pages/Admin/SellerPaymentManagement";
import { MonthDetailPage } from "../Pages/Admin/Payments/MonthDetailPage";

import AdminLayout from "../Pages/Admin/AdminLayout/Adminlayout";

const adminRoutes = {
  path: "/admin",
  children: [
    // Login page without layout
    { path: "", element: <AdminLogin /> },
  

    // ✅ Month detail WITHOUT layout
    {
      path: "payments/:year/:month",
      element: <MonthDetailPage />,
    },

    // ALL ADMIN PAGES WITH LAYOUT
    {
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },

        { path: "pending-sellers", element: <PendingSellers /> },

        { path: "verified-sellers", element: <VerifiedSellers /> },

        {
          path: "seller-products/:sellerId",
          element: <SellerProductsDetail />,
        },

        {
          path: "payments/*",
          element: <SellerPaymentManagement />,
        },
      ],
    },
  ],
};

export default adminRoutes;