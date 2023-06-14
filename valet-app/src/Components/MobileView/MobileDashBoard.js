import React from "react";
import MobAppBar from "./MobAppBar";
import "../../Styles/MobileView/MobileDashBoard.scss";
import { AccountsContext } from "../Context/AccountsContext";

function MobileDashBoard({ children }) {
  return (
    <AccountsContext>
      <div className="dashboard-page-main-container-mobile-view">
        <MobAppBar />
        <div>{children}</div>
      </div>
    </AccountsContext>
  );
}

export default MobileDashBoard;
