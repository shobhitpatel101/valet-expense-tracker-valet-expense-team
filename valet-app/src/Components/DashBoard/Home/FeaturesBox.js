import React from "react";
import "../../../Styles/Components/FeaturesBox.scss";
import DailyTransactions from "../../../assets/DailyTransactions.png";
import ExpenseByCategory from "../../../assets/ExpenseByCategory.png";
import MonthlyOverview from "../../../assets/MonthlyOverview.png";
function FeaturesBox() {
  return (
    <div className="features-box-container">
      <div>
        <div className="features-box-simple-money-tracker">
          <div>
            <img src={DailyTransactions} alt="" />
          </div>
          <div>
            <div>
              <h1>Simple money tracker</h1>
            </div>
            <div>
              <p>
                It takes seconds to record daily transactions. Put them into
                clear and visualized categories such as Expense: Food, Shopping
                or Income: Salary, Gift.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="features-box-painless-budgeting">
          <div>
            <img src={ExpenseByCategory} alt="" />
          </div>
          <div>
            <div>
              <h1>Painless budgeting</h1>
            </div>
            <div>
              <p>
                It takes seconds to record daily transactions. Put them into
                clear and visualized categories such as Expense: Food, Shopping
                or Income: Salary, Gift.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="features-box-whole-picture">
          <div>
            <img src={MonthlyOverview} alt="" />
          </div>
          <div>
            <div>
              <h1>The whole picture in one place</h1>
            </div>
            <div>
              <p>
                One report to give a clear view on your spending patterns.
                Understand where your money comes and goes with easy-to-read
                graphs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesBox;
