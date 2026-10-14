import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    console.log("Get Started clicked");
    navigate("/dashBoard")

  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-linear-to-br from-amber-100 to-orange-200">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Noble House
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
          Welcome to Noble House!
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default Welcome;
