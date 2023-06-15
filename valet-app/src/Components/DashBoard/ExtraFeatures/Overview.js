import React from "react";
import { ReactChart } from "./ReactChart";
import "../../../Styles/Components/Overview.scss";
import { useSelector, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { textFieldStyle } from "../../../Styles/MUI/Mui";
function Overview() {
  const { data } =
    useSelector(({ transaction }) => transaction.transactions, shallowEqual) ||
    {};

  const [selectedYear, setSelectedYear] = useState(dayjs("2023"));

  const getMonthlyPayload = (month, totalExpenses = 0, totalIncome = 0) => ({
    month,
    totalExpenses,
    totalIncome,
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsNum = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const handleResetMonthlyTransactions = () => {
    const tempObj = {};
    for (let item of monthsNum) {
      tempObj[item] = {
        ...getMonthlyPayload(months[monthsNum.indexOf(item)]),
      };
    }
    return tempObj;
  };
  const [monthlyTransactions, setMonthlyTransactions] = useState({
    ...handleResetMonthlyTransactions(),
  });

  const handleYearlyExpenses = (value) => {
    setMonthlyTransactions({ ...handleResetMonthlyTransactions() });
    setSelectedYear(dayjs(value));
    const filteredTransactions = data?.filter((transaction) => {
      return (
        transaction.transactionDate.slice(6) === dayjs(value).format("YYYY")
      );
    });

    if (filteredTransactions && filteredTransactions.length > 0) {
      for (let el of filteredTransactions) {
        if (el.transactiontype === "Income") {
          setMonthlyTransactions((prev) => {
            return {
              ...prev,
              [`${el.transactionDate.slice(3, 5)}`]: {
                ...prev[`${el.transactionDate.slice(3, 5)}`],
                totalIncome:
                  prev[`${el.transactionDate.slice(3, 5)}`].totalIncome +
                  Number(el.transactionAmount),
              },
            };
          });
        } else if(el.transactiontype === "Expense") {
          setMonthlyTransactions((prev) => {
            return {
              ...prev,
              [`${el.transactionDate.slice(3, 5)}`]: {
                ...prev[`${el.transactionDate.slice(3, 5)}`],
                totalExpenses:
                  prev[`${el.transactionDate.slice(3, 5)}`].totalExpenses +
                  Number(el.transactionAmount),
              },
            };
          });
        }
      }
    }
  };
  useEffect(() => {
    handleYearlyExpenses(selectedYear);
  }, [data]);

  return (
    <div className="monthly-overview">
      <h3>Yearly Overview</h3>
      <div>
        <DatePicker
          // views={["year", "month", "day"]}
          sx={textFieldStyle}
          className="year-picker"
          views={["year"]}
          value={selectedYear}
          format={"YYYY"}
          disableFuture
          onChange={handleYearlyExpenses}
          label="Select Year"
          slotProps={{ textField: { size: "small" } }}
        />
      </div>
      <ReactChart monthlyTransactions={monthlyTransactions} />
    </div>
  );
}

export default Overview;
