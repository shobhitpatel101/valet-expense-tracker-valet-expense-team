import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../Components/Context/AuthContext";
import { useMediaQuery } from "react-responsive";

import UserAuthPage from "../Pages/UserAuthPage";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import HomePage from "../Pages/HomePage";
import routePaths from "../Utils/RoutePaths";
import DashBoard from "../Pages/DashBoard";
import MobileDashBoard from "../Components/MobileView/MobileDashBoard";
import Accounts from "../Components/DashBoard/AppBar/Accounts";
import Categories from "../Components/DashBoard/AppBar/Categories";
import Goals from "../Components/DashBoard/AppBar/Goals";
import ExpenseByCategory from "../Components/DashBoard/ExtraFeatures/ExpenseByCategory";
import MobTransactions from "../Components/MobileView/MobTransactions";
import SavingGoals from "../Components/DashBoard/ExtraFeatures/SavingGoals";
import ManageBudget from "../Components/DashBoard/ExtraFeatures/ManageBudget";
import Overview from "../Components/DashBoard/ExtraFeatures/Overview";
import Profile from "../Components/Profile/Profile";
import NotFoundPage from "../Pages/NotFoundPage";
import OtpVerification from "../Components/ForgotPassword/OtpVerification";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangePassword from "../Components/ForgotPassword/ChangePassword";
const AppRoutes = () => {
  const isDesktop = useMediaQuery({ minWidth: 900 });
  const location = useLocation();
  const navigate = useNavigate();
  const [authNotNeededRoutes, setAuthNotNeededRoutes] = useState([
    routePaths.LOGIN,
    routePaths.SIGNUP,
    routePaths.FORGOTRPASSWORD,
    routePaths.ROOT,
    routePaths.CHANGE_PASSWORD,
    routePaths.OTPVERIFICATION
  ]);
  useEffect(() => {
    if (
      localStorage.getItem("valet-auth-token") &&
      authNotNeededRoutes.includes(location.pathname)
    ) {
      if (window.innerWidth > 900) {
        navigate("/dashboard");
      } else {
        navigate("/mobile-dashboard");
      }
    }
  }, [location, navigate]);
  return (
    <Routes>
      <Route path={routePaths.ROOT} element={<HomePage />} />
      <Route
        path={routePaths.LOGIN}
        element={
          <UserAuthPage>
            <Login />
          </UserAuthPage>
        }
      />
      <Route
        path={routePaths.SIGNUP}
        element={
          <UserAuthPage>
            <SignUp />
          </UserAuthPage>
        }
      />
      <Route
        path={routePaths.FORGOTRPASSWORD}
        element={
          <UserAuthPage>
            <ForgotPassword />
          </UserAuthPage>
        }
      />
      <Route
        path={routePaths.OTPVERIFICATION}
        element={
          <UserAuthPage>
            <OtpVerification />
          </UserAuthPage>
        }
      />
      <Route
        path={routePaths.CHANGE_PASSWORD}
        element={
          <UserAuthPage>
            <ChangePassword />
          </UserAuthPage>
        }
      />

      {/* Desktop Routes */}
      {isDesktop && localStorage.getItem("valet-auth-token") && (
        <Route path={routePaths.DASHBOARD} element={<DashBoard />} />
      )}

      {/* Mobile Routes */}
      {!isDesktop && localStorage.getItem("valet-auth-token") && (
        <>
          <Route
            path={routePaths.MOBILE_DASHBOARD}
            element={
              <MobileDashBoard>
                <MobTransactions />
              </MobileDashBoard>
            }
          />
          <Route
            path={routePaths.MOBILE_ACCOUNTS}
            element={
              <MobileDashBoard>
                <Accounts />
              </MobileDashBoard>
            }
          />
          <Route
            path={routePaths.MOBILE_CATEGORIES}
            element={
              <MobileDashBoard>
                <Categories />
                <ManageBudget />
                <ExpenseByCategory />
              </MobileDashBoard>
            }
          />
          <Route
            path={routePaths.MOBILE_GOALS}
            element={
              <MobileDashBoard>
                <Goals />
                <SavingGoals />
              </MobileDashBoard>
            }
          />
          <Route
            path={routePaths.MOBILE_YEARLY_OVERVIEW}
            element={
              <MobileDashBoard>
                <Overview />
              </MobileDashBoard>
            }
          />
          <Route
            path={routePaths.MOBILE_PROFILE}
            element={
              <MobileDashBoard>
                <Profile />
              </MobileDashBoard>
            }
          />
        </>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
