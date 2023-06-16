import React from "react";
import "../../../Styles/Components/FeaturesUserLove.scss";
import accounting from "../../../assets/accounting.png";
import cloudService from "../../../assets/cloudService.png";
import goals from "../../../assets/goals.png";
import report from "../../../assets/report.png";
function FeaturesUserLove() {
  return (
    <div className="features-user-love-container">
      <div>
        <div className="features-user-love-heading">
          <h1>Features our user love</h1>
        </div>
        <div className="features-user-love-content">
          <div>
            <img src={cloudService} alt="cloudservice" />
            <div>
              <p>Cloud based solution</p>
            </div>
          </div>
          <div>
            <img src={accounting} alt="accounting" />
            <div>
              {" "}
              <p>Multiple Accounts</p>
            </div>
          </div>
          <div>
            <img src={goals} alt="goals" />
            <div>
              <p>Categories & Goals</p>
            </div>
          </div>
          <div>
            <img src={report} alt="report" />
            <div>
              <p>Quick Reporting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesUserLove;
