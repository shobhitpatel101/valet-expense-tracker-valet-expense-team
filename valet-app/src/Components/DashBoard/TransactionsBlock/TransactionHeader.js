import React, { useEffect } from "react";
import "../../../Styles/Components/TransactionHeader.scss";
import { muiOutlinedButtonStyle } from "../../../Styles/MUI/Mui";
import Button from "@mui/material/Button";
import { useState } from "react";
import TransactionPopup from "../../Popups/TransactionPopup";
import { AccountContext } from "../../Context/AccountsContext";
import { useContext } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { handleInputError } from "../../../Utils/HelperFunction";
function TransactionHeader({ headersValues, data = [] }) {
  const { goal, category } = useSelector((state) => state, shallowEqual) || {};
  const categoryData = category?.categories?.data || [];
  const goalData = goal?.goals?.data || [];
  const [open, setOpen] = useState(false);
  const { account } = useContext(AccountContext);
  const [totalIncomeExpense, setTotalIncomeExpense] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalInvestments: 0,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    if (!account.accountName)
      return handleInputError("Add account for proceeding with transaction!");

    if (goalData.length === 0 && categoryData.length === 0) {
      handleInputError("Add goal or category for proceeding with transaction!");
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    setTotalIncomeExpense({
      totalIncome: 0,
      totalExpense: 0,
      totalInvestments: 0,
    });
    data?.forEach((transaction) => {
      if (transaction.transactiontype === "Income") {
        setTotalIncomeExpense((prev) => ({
          ...prev,
          totalIncome: prev.totalIncome + Number(transaction.transactionAmount),
        }));
      } else if (transaction.transactiontype === "Expense") {
        setTotalIncomeExpense((prev) => ({
          ...prev,
          totalExpense:
            prev.totalExpense + Number(transaction.transactionAmount),
        }));
      } else {
        setTotalIncomeExpense((prev) => ({
          ...prev,
          totalInvestments:
            prev.totalInvestments + Number(transaction.transactionAmount),
        }));
      }
    });
  }, [data]);

  return (
    <div className="transaction-header-cont">
      <div className="transaction-header-text">
        <div>
          <h1>Transactions</h1>
        </div>
        <div>
          <Button
            onClick={handleOpen}
            style={{
              ...muiOutlinedButtonStyle,
              backgroundColor: "transperent",
            }}
          >
            Add Transaction
          </Button>
        </div>
      </div>
      <div className="transaction-header-day">
        <span>
          {headersValues}{" "}
          {account.accountName ? `(${account.accountName} account)` : null}
        </span>
      </div>
      <div className="transaction-header-summary">
        <div>
          <div>
            <p>Total Expense</p>
            <h2>&#8377; {totalIncomeExpense.totalExpense || 0}</h2>
          </div>
        </div>
        <div>
          <div>
            {" "}
            <p>Total Income</p>
            <h2>&#8377; {totalIncomeExpense.totalIncome || 0}</h2>
          </div>
        </div>
        <div>
          <div>
            {" "}
            <p>Total Investements</p>
            <h2>&#8377; {totalIncomeExpense.totalInvestments || 0}</h2>
          </div>
        </div>
        <div>
          <div>
            <p>Balance</p>
            <h2>
              &#8377;{" "}
              {totalIncomeExpense.totalIncome -
                (totalIncomeExpense.totalExpense +
                  totalIncomeExpense.totalInvestments) || 0}
            </h2>
          </div>
        </div>
      </div>
      <TransactionPopup open={open} handleClose={handleClose} />
    </div>
  );
}

export default TransactionHeader;
