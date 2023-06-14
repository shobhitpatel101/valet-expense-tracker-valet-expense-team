import React from "react";
import StatusBar from "./StatusBar";
import "../../../Styles/Components/ExpenseByCategory.scss";
import { useEffect } from "react";
import { useDispatch,useSelector,shallowEqual } from "react-redux";
import { getExpenseByCategory } from "../../../Redux/DashBoard/Category/CategoryAction";
import noDataImg from '../../../assets/noDataImg.avif'

function ExpenseByCategory() {
  const dispatch = useDispatch();
  const {data} = useSelector(({category}) => category.expenseByCategory, shallowEqual) || {};
  //   const categoryData = category?.categories?.data?.data || [];
  useEffect(()=>{
     dispatch(getExpenseByCategory())
  },[])
  return (
    <div className="expense-by-category-cont">
        <h3>Expense By Category</h3>
      <div>
        {data && data.length > 0 ? data.map((category)=>{
        return <StatusBar name={category.categoryName} percentage={category.percentage.toFixed(2)} budget={category.categoryBudget} transactions={category.totalTransactions} color="secondary" background='rgba(156, 39, 176, 0.1)'/>
        }):(
          <div className="no-data-img-container">
        <img src={noDataImg} alt="NoDataImg" />
        </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseByCategory;
