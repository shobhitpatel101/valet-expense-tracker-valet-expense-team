import "./Styles/base/_base.scss";
import AppRoutes from "./Routes/AppRoutes";
import ShowNotification from "./Utils/ShowNotification";
import MobileViewRoutes from "./Routes/MobileViewRoutes";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import { AuthProvider } from "./Components/Context/AuthContext";
function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 900 && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      } else if (
        window.innerWidth <= 900 &&
        location.pathname === "/dashboard"
      ) {
        navigate("/mobile-dashboard");
      } else if (
        window.innerWidth <= 900 &&
        location.pathname !== "/dashboard"
      ) {
        navigate(location.pathname);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, location]);
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ShowNotification />
    </ThemeProvider>
  );
}

export default App;
