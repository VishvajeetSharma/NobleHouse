import SellerReturnsComponent from "../Pages/seller/dashboard/Return";
import AdvertiseProducts from "../Pages/seller/GrowBusiness";
import SellerPartnerPortal from "../Pages/seller/Loginpage";
import { SellerDashboard } from "../Pages/seller/seller-dashboard";
import ShippingPolicy from "../Pages/seller/shippingandcommision";
import SignupPage from "../Pages/seller/SignupScreen";
import ListProduct from "../Pages/seller/dashboard/ListProduct";
import { element } from "three/src/nodes/tsl/TSLCore.js";


export const sellerRoutes = [
  {
    path: "/sellersignup",
    element: <SignupPage />,
  },
  {
    path: "/seller/shippingandcommission",
    element: <ShippingPolicy />,
  },
  {
    path: "/seller/growbusiness",
    element: <AdvertiseProducts />,
  },
  {
    path: "/seller/login",
    element: <SellerPartnerPortal />,
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
  },
  // Add these new routes for dashboard sub-pages
  {
    path: "/seller/orders",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/returns",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/products",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/catalog",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/inventory",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/payment",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/setting",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/members",
    element: <SellerDashboard />,
  },
  {
    path:"/listProducts",
    element:<ListProduct/>
  }
];
