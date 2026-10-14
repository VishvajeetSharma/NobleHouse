import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
import { userRoutes } from "./userRoutes.jsx";
import { sellerRoutes } from "./sellerRoutes.jsx";
import adminRoutes from "./adminRoutes.jsx";

const appRouter = createBrowserRouter([
  ...authRoutes,
  ...userRoutes,
  ...sellerRoutes,
  adminRoutes,
]);

export default appRouter;
