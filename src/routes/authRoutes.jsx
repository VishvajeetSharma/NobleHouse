import Welcome from "../layout/Welcome.jsx";
import LoginPage from "../Pages/User/Auth/Login.js"
import OtpVerificationPage from "../Pages/User/Auth/VerifyOTP.js";
 export const authRoutes = [
 { 
  path: "/",
  element: <Welcome />,
},
{
  path:"/login",
  element:<LoginPage/>
},
{
  path:"/otp",
  element:<OtpVerificationPage/>
}

]




