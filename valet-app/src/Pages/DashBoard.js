import React from "react";
import SideBar from "../Components/DashBoard/SideBar/SideBar";
import "../Styles/Pages/DashBoardPage.scss";
import AppBar from "../Components/DashBoard/AppBar/AppBar";
import { ShowappbarContext } from "../Components/Context/ShowappbarContext";
import TransactionExFeature from "../Components/DashBoard/TransactionExFeature/TransactionExFeature";
import ExtraFeatures from "../Components/DashBoard/ExtraFeatures/ExtraFeatures";
import { AccountsContext } from "../Components/Context/AccountsContext";
import '../Styles/base/_base.scss'
function DashBoard() {
  return (
    <ShowappbarContext>
      <AccountsContext>
        <div className="dashboard-page-main-container">
          <SideBar />
          <AppBar />
          <TransactionExFeature />
          <ExtraFeatures />
        </div>
      </AccountsContext>
    </ShowappbarContext>
  );
}

export default DashBoard;
