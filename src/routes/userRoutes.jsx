import ProductDetail from "../Pages/User/Shop/ProductDetail";
import DashBoard from "../Pages/User/DashBoard";
import BuyNow from "../Pages/User/Shop/BuyNow";
import NotFound from "../Pages/User/PageNotFound";
import Category from "../Pages/User/Category/Category";
import StudioScreen from "../Pages/User/Category/Studio";
import BeautyScreen from "../Pages/User/Category/Beauty";
import CartPage from "../Pages/User/Shop/AddToCart";
import PaymentSection from "../Pages/User/Shop/PaymentPage";
import Wishlist from "../Pages/User/Shop/Wishlist";
import UserProfile from "../Pages/User/Profile/UserProfile";
import OrderSuccess from "../Pages/User/Shop/Order/OrderPlaced";
import FAQPage from "../Pages/Support/FAQ";
import OrderDetailPage from "../Pages/User/Shop/Order/OrderDetailPage";
import ContactPage from "../Pages/Support/ContactUs";
import OrdersPage from "../Pages/User/Shop/Order/OrderPage";
import ReturnPage from "../Pages/User/Shop/Order/Return";
import Home from "../Pages/seller/Home";
import RefundMethodPage from "../Pages/User/Shop/Order/PaymentMethod";
import ExchangePage from "../Pages/User/Shop/Order/ExchangeMethod";
import CancelOrderPage from "../Pages/User/Shop/Order/CancelOrder";
import ProductReviewPage from "../Pages/User/Shop/ReviewPage";
export const userRoutes = [
  {
    path: "/dashboard",
    element: <DashBoard />,
  },

  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/buynow",
    element: <BuyNow />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/studio",
    element: <StudioScreen />,
  },
  {
    path: "/beauty",
    element: <BeautyScreen />,
  },
  {
    path: "/category/:gender",
    element: <Category />,
  },
  {
    path: "/payment",
    element: <PaymentSection />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/userprofile",
    element: <UserProfile />,
  },
  {
    path: "/seller",
    element: <Home />,
  },

  {
    path: "/userprofile",
    element: <UserProfile />,
  },
  {
    path: "/orderPlaced",
    element: <OrderSuccess />,
  },
  {
    path: `/faq`,
    element: <FAQPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/orderDetail/:id/:itemId",
    element: <OrderDetailPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/return/:id/:itemId/:sellerId",
    element: <ReturnPage />,
  },{
    path:"/return/refund/:id/:itemId",
    element:<RefundMethodPage/>
  },{
    path:"/exchange/:id",
    element:<ExchangePage/>
  },{
    path:"/cancel/:id/:itemId",
    element:<CancelOrderPage/>
  },{
    path:'/productReview',
    element:<ProductReviewPage/>
  }
];
