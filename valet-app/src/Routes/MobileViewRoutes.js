import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthContext';
import UserAuthPage from '../Pages/UserAuthPage';
import Login from '../Components/Login/Login';
import SignUp from '../Components/SignUp/SignUp';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import HomePage from '../Pages/HomePage';
import routePaths from '../Utils/RoutePaths';
import MobileDashBoard from '../Components/MobileView/MobileDashBoard';
import MobLayout from '../Components/MobileView/MobLayout';
import Accounts from '../Components/DashBoard/AppBar/Accounts';
import Categories from '../Components/DashBoard/AppBar/Categories';
import Goals from '../Components/DashBoard/AppBar/Goals';
import ExpenseByCategory from '../Components/DashBoard/ExtraFeatures/ExpenseByCategory';
import MobTransactions from '../Components/MobileView/MobTransactions';
import SavingGoals from '../Components/DashBoard/ExtraFeatures/SavingGoals';
import ManageBudget from '../Components/DashBoard/ExtraFeatures/ManageBudget';
import Overview from '../Components/DashBoard/ExtraFeatures/Overview';
import Profile from '../Components/Profile/Profile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function MobileViewRoutes() {
  const { isVerified } = useContext(AuthContext);
  const navigate=useNavigate()
  useEffect(()=>{
    if(!isVerified){
      navigate(routePaths.LOGIN)
    }
  },[isVerified])
  return (
    <Routes>
      <Route path={routePaths.ROOT} element={<HomePage />} />
      <Route path={routePaths.LOGIN} element={<UserAuthPage><Login /></UserAuthPage>} />
      <Route path={routePaths.SIGNUP} element={<UserAuthPage><SignUp /></UserAuthPage>} />
      <Route path={routePaths.FORGOTRPASSWORD} element={<UserAuthPage><ForgotPassword /></UserAuthPage>} />
      {isVerified ? (
        <>
          <Route path={routePaths.MOBILE_DASHBOARD} element={<MobileDashBoard><MobTransactions /></MobileDashBoard>} />
          <Route path={routePaths.MOBILE_ACCOUNTS} element={<MobileDashBoard><Accounts /></MobileDashBoard>} />
          <Route path={routePaths.MOBILE_CATEGORIES} element={<MobileDashBoard><Categories /><ManageBudget /><ExpenseByCategory /></MobileDashBoard>} />
          <Route path={routePaths.MOBILE_GOALS} element={<MobileDashBoard><Goals /><SavingGoals /></MobileDashBoard>} />
          <Route path={routePaths.MOBILE_YEARLY_OVERVIEW} element={<MobileDashBoard><Overview /></MobileDashBoard>} />
          <Route path={routePaths.MOBILE_PROFILE} element={<MobileDashBoard><Profile /></MobileDashBoard>} />
        </>
      ) : (
       null
      )}
    </Routes>
  );
}

export default MobileViewRoutes;
