import appRouter from "./routes/appRouter";
import { RouterProvider } from "react-router-dom";

const App = () => <RouterProvider router={appRouter} />;

export default App;
