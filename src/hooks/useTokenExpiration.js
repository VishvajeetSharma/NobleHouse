// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetStore } from "../store/slices/resetSlice";

// const useTokenExpiration = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const { exp } = jwtDecode(token);
//         const expiryTime = exp * 1000;
//         const timeRemaining = expiryTime - Date.now();

//         if (timeRemaining <= 0) {
//           dispatch(resetStore());
//           localStorage.clear();
//           navigate("/login");
//         } else {
//           setTimeout(() => {
//             dispatch(resetStore());
//             localStorage.clear();
//             navigate("/login");
//           }, timeRemaining);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         dispatch(resetStore());
//         localStorage.clear();
//         navigate("/login");
//       }
//     };

//     checkTokenExpiration();

//     return () => {};
//   }, [dispatch, navigate]);
// };

// export default useTokenExpiration;
