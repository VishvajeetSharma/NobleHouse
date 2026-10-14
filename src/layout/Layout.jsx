// import "../assets/css/table.css";

// import useOnline from "../hooks/useOnline";
// import Heading from "../components/Header/Heading";
// import Sidebar from "../components/Sidebar/Sidebar";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NAVBAR_TITLES } from "../constants/navbarConfig";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { setIsMobile, setSidebarOpen } from "../store/slices/sidebarSlice";

// const Layout = () => {
//   const isOnline = useOnline();
//   const location = useLocation();
//   const pathname = location.pathname;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isSidebarOpen, showModal } = useSelector((state) => state.sidebar);
//   const user = useSelector((state) => state.user);
//   const token = user?.token;

//   // Get navbar title dynamically from constants
//   const navbarTitle = Object.keys(NAVBAR_TITLES).find((key) =>
//     pathname.startsWith(key)
//   )
//     ? NAVBAR_TITLES[
//         Object.keys(NAVBAR_TITLES).find((key) => pathname.startsWith(key))
//       ]
//     : "Error[]";

//   useEffect(() => {
//     const handleResize = () => {
//       const isMobile = window.innerWidth < 768;
//       dispatch(setIsMobile(isMobile));
//       dispatch(setSidebarOpen(!isMobile));
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [dispatch]);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   if (!token) {
//     return null;
//   }

//   if (!isOnline)
//     return (
//       <h1 className="flex justify-center text-4xl text-[#fe7d31]">
//         🔴 Offline, Please check your internet
//       </h1>
//     );

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <div
//         className={`bg-slate-900 transition-all duration-300 relative ${
//           isSidebarOpen ? "w-64" : "w-0"
//         } md:w-64`}
//       >
//         <Sidebar showModal={showModal} />
//       </div>

//       <div className="flex-1 flex flex-col overflow-auto transition-all duration-300">
//         <div className="bg-white px-6 py-2 border-b-[2px] border-[#fe7d31] shadow-lg">
//           <Heading title={navbarTitle} />
//         </div>

//         <div className="px-4 sm:px-6 md:px-10 py-6 flex-1 overflow-auto bg-gradient-to-br from-[#fff7f0] to-[#ffeee4]">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
