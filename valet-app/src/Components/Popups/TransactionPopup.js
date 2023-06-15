import React from "react";
import MuiPopup from "../MuiComponents/MuiPopup";
import Button from "@mui/material/Button";
import {
  muiOutlinedButtonStyle,
  muiContainedButtonStyle,
} from "../../Styles/MUI/Mui";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/Popup.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import dayjs from "dayjs";
import { getCategories } from "../../Redux/DashBoard/Category/CategoryAction";
import { getGoals } from "../../Redux/DashBoard/Goals/GoalsAction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { nativeSelectStyle } from "../../Styles/MUI/Mui";
import { updateTransaction } from "../../Redux/DashBoard/Transactions/TransactionsAction";
import { deleteTransaction } from "../../Redux/DashBoard/Transactions/TransactionsAction";
import ConfirmationDialog from "../MuiComponents/ConfirmationDialog";
import { getExpenseByGoal } from "../../Redux/DashBoard/Goals/GoalsAction";
import { getExpenseByCategory } from "../../Redux/DashBoard/Category/CategoryAction";
import {
  addTransaction,
  getTransactions,
} from "../../Redux/DashBoard/Transactions/TransactionsAction";
import {
  checkForEmptyInputs,
  handleApiError,
} from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { useContext } from "react";
import { AccountContext } from "../Context/AccountsContext";
function TransactionPopup({ open, handleClose, isToBeEdited = false }) {
  const { goal, category } = useSelector((state) => state, shallowEqual) || {};
  const { singleTransaction } =
    useSelector(({ transaction }) => transaction, shallowEqual) || {};
  const { addedTransaction } =
    useSelector(({ transaction }) => transaction, shallowEqual) || {};
  const categoryData = category?.categories?.data || [];
  const goalData = goal?.goals?.data || [];
  const { account } = useContext(AccountContext);
  const dispatch = useDispatch();

  const [transactionDetails, setTransactionDetails] = useState({
    transactionName: "",
    categoryOrGoal: "Category",
    transactionAmount: "",
    transactionDate: dayjs(new Date()),
    transactiontype: "",
    categoryId: "",
    goalId: "",
    accountId: account._id ? account._id : "",
  });

  const handleTransactionDetailsChange = (event) => {
    const { value, name } = event.target;
    setTransactionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetTransactions = (data) => {
    dispatch(getTransactions());
    dispatch(getExpenseByCategory());
    dispatch(getExpenseByGoal());
    handleClose();
  };
  const handleAddTransactionError = (data) => {
    handleApiError();
  };
  const handleTransactionDetailsSubmit = () => {
    if (transactionDetails.categoryOrGoal.toLowerCase() === "goal") {
      delete transactionDetails.categoryId;
    } else {
      delete transactionDetails.goalId;
    }

    if (checkForEmptyInputs(transactionDetails)) {
      if (isToBeEdited) {
        dispatch(
          updateTransaction(
            { id: singleTransaction.data._id, ...transactionDetails },
            handleGetTransactions,
            handleAddTransactionError
          )
        );
      } else {
        dispatch(
          addTransaction(
            transactionDetails,
            handleGetTransactions,
            handleAddTransactionError
          )
        );
      }
    } else {
      handleInputError("Check your inputs!");
    }
  };

  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return {
      year: parseInt(year, 10),
      month: parseInt(month, 10) - 1,
      day: parseInt(day, 10),
    };
  };
  const handleOnDateChange = (value) => {
    setTransactionDetails((prev) => ({
      ...prev,
      transactionDate: value,
    }));
  };

  useEffect(() => {
    if (addedTransaction.isFulfilled) {
      setTransactionDetails({
        transactionName: "",
        categoryOrGoal: "Category",
        transactionAmount: "",
        transactionDate: dayjs(new Date()),
        transactiontype: "",
        categoryId: "",
        goalId: "",
        accountId: account._id ? account._id : "",
      });
    }
  }, [addedTransaction.isFulfilled]);

  useEffect(() => {
    if (isToBeEdited && singleTransaction.isFulfilled) {
      const { year, month, day } = parseDateString(
        singleTransaction.data.transactionDate
      );

      const updatedTransactionDetails = {
        transactionName: singleTransaction?.data.transactionName || "",
        categoryOrGoal: singleTransaction?.data.categoryOrGoal || "",
        transactionAmount: singleTransaction?.data.transactionAmount || 0,
        transactiontype: singleTransaction?.data.transactiontype || "",
        categoryId: singleTransaction?.data?.categoryId?._id || "",
        goalId: singleTransaction?.data?.goalId?._id || "",
        accountId: account._id ? account._id : "",
        transactionDate: dayjs(new Date(year, month, day)),
      };

      setTransactionDetails(updatedTransactionDetails);
    }
  }, [isToBeEdited, singleTransaction]);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getGoals());
  }, []);

  useEffect(() => {
    setTransactionDetails((prev) => ({
      ...prev,
      accountId: account._id,
    }));
  }, [account]);
  return (
    <>
      <MuiPopup open={open} handleClose={handleClose}>
        <div className="popup-cont">
          <div className="popup-text">
            <h1>Add Transaction</h1>
          </div>
          <div className="popup-inputs">
            <TransactionStyledDiv>
              <TextField
                sx={textFieldStyle}
                value={transactionDetails.transactionName}
                placeholder="Food/Grocery/General/Medical"
                variant="standard"
                label="Transaction Name"
                name="transactionName"
                size="medium"
                fullWidth
            
                onChange={handleTransactionDetailsChange}
              />
            </TransactionStyledDiv>
            <TransactionStyledDiv>
              <TextField
                value={transactionDetails.transactionAmount}
                sx={textFieldStyle}
                className="transaction-amount-input"
                placeholder="80000"
                label="Amount"
                inputProps={{ min: 0 }}
                variant="standard"
                size="medium"
                name="transactionAmount"
                type="number"
                fullWidth
                onChange={handleTransactionDetailsChange}
              />
              <DatePicker
                sx={textFieldStyle}
                className="transaction-date"
                views={["year", "month", "day"]}
                format="DD-MM-YYYY"
                label="Date"
                value={transactionDetails.transactionDate}
                disableFuture
                onChange={handleOnDateChange}
              />
            </TransactionStyledDiv>
            <TransactionStyledDiv>
              <FormControl fullWidth variant="standard">
                <InputLabel id="category-or-goal">Category/Goal</InputLabel>
                <Select
                  sx={nativeSelectStyle}
                  labelId="category-or-goal"
                  id="category-goal-select"
                  value={transactionDetails.categoryOrGoal}
                  name="categoryOrGoal"
                  onChange={handleTransactionDetailsChange}
                  label="Account"
                  fullWidth
                >
                  <MenuItem key={uuidv4()} value="Category">
                    Category
                  </MenuItem>
                  <MenuItem key={uuidv4()} value="Goal">
                    Goal
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel id="select-goal-category">
                  {transactionDetails.categoryOrGoal}
                </InputLabel>
                <Select
                  sx={nativeSelectStyle}
                  labelId="select-goal-category"
                  id="goal_or_category"
                  value={
                    transactionDetails.categoryOrGoal.toLowerCase() === "goal"
                      ? transactionDetails.goalId
                      : transactionDetails.categoryId
                  }
                  name={
                    transactionDetails.categoryOrGoal.toLowerCase() === "goal"
                      ? "goalId"
                      : "categoryId"
                  }
                  onChange={handleTransactionDetailsChange}
                  label={`${transactionDetails.categoryOrGoal}`}
                  fullWidth
                >
                  {transactionDetails.categoryOrGoal.toLowerCase() === "goal" &&
                  goalData &&
                  goalData.length > 0
                    ? goalData.map((el) => {
                        return (
                          <MenuItem key={uuidv4()} value={el._id}>
                            {el.goalName}
                          </MenuItem>
                        );
                      })
                    : transactionDetails.categoryOrGoal.toLowerCase() ===
                        "category" &&
                      categoryData &&
                      categoryData.length > 0
                    ? categoryData.map((el) => {
                        return (
                          <MenuItem key={uuidv4()} value={el._id}>
                            {el.categoryName}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </TransactionStyledDiv>
            <TransactionStyledDiv>
              <FormControl fullWidth variant="standard">
                <InputLabel id="transaction-type">Income/Expense</InputLabel>
                <Select
                  sx={nativeSelectStyle}
                  labelId="transaction-type"
                  id="transaction-type-select"
                  value={transactionDetails.transactiontype}
                  name="transactiontype"
                  onChange={handleTransactionDetailsChange}
                  fullWidth
                >
                  {transactionDetails.categoryOrGoal.toLowerCase() ===
                  "goal" ? (
                    <MenuItem value="Transfer">Transfer</MenuItem>
                  ) : (
                    <MenuItem value="Income">Income</MenuItem>
                  )}

                  {transactionDetails.categoryOrGoal.toLowerCase() ===
                  "category" ? (
                    <MenuItem value="Expense">Expense</MenuItem>
                  ) : null}
                </Select>
              </FormControl>
            </TransactionStyledDiv>
          </div>
          <div className="popup-button">
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={muiContainedButtonStyle}
                onClick={handleTransactionDetailsSubmit}
              >
                Add Transaction
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={muiOutlinedButtonStyle}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </MuiPopup>
    </>
    //  <UserAuthPage/>
  );
}

const TransactionStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: row !important;
  & > .transaction-date,
  & > .transaction-amount-input {
    width: 50%;
  }
`;
export default TransactionPopup;
