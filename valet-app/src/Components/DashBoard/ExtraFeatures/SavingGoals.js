import React from "react";
import StatusBar from "./StatusBar";
import "../../../Styles/Components/SavingGoals.scss";
import { useDispatch,useSelector,shallowEqual } from "react-redux";
import { getExpenseByGoal } from "../../../Redux/DashBoard/Goals/GoalsAction";
import { useEffect } from "react";
import noDataImg from '../../../assets/noDataImg.avif'

function SavingGoals() {
  const dispatch = useDispatch();
  const {data} = useSelector(({goal}) => goal.expenseByGoal, shallowEqual) || {};
  //   const categoryData = category?.categories?.data?.data || [];
  useEffect(()=>{
     dispatch(getExpenseByGoal())
  },[])
  return (
    <div className="expense-by-savinggoals-cont">
      <h3>Saving Goals</h3>
      <div>
        {data && data.length > 0 ? (
          data.map((goal) => {
            return (
              <StatusBar
                name={goal.goalName}
                percentage={goal.percentage.toFixed(2)}
                budget={goal.goalBudget}
                transactions={goal.totalTransactions}
                color="primary"
                background="rgba(39, 217, 78, 0.1)"
              />
            );
          })
        ) : (
          <div className="no-data-img-container">
        <img src={noDataImg} alt="NoDataImg" />
        </div>
        )}
      </div>
    </div>
  );
}

export default SavingGoals;
