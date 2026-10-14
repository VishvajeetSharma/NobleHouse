// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";

// const useRoleRedirect = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathname = location.pathname;
//   const user = useSelector((state) => state.user);
//   const token = user?.token;
//   const userRole = user?.user?.role;

//   useEffect(() => {
//     if (
//       (pathname === "/" ||
//         pathname === "/login" ||
//         pathname === "/register" ||
//         pathname === "/send-otp" ||
//         pathname === "/forget-password/:emailId") &&
//       token &&
//       userRole
//     ) {
//       const roleRoutes = {
//         admin: "/admin/dashboard",
//         user: "/user/product-catalog",
//         outlet: "/outlet/customer-order",
//         warehouse: "/warehouse/customer-order",
//         vendor: "/vendor/product-catalog",
//       };

//       const redirectPath = roleRoutes[userRole] || "/login";
//       navigate(redirectPath);
//     }
//   }, [pathname, token, userRole, navigate]);
// };

// export default useRoleRedirect;
