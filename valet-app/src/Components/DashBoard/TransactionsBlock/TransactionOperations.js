import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../../Styles/Components/TransactionsOperations.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import dayjs from "dayjs";
import { muiOutlinedButtonStyle } from "../../../Styles/MUI/Mui";
import Button from "@mui/material/Button";
import { textFieldStyle } from "../../../Styles/MUI/Mui";
import { nativeSelectStyle } from "../../../Styles/MUI/Mui";
function TransactionOperations({ handleFilteredTransactions }) {
  const [filterBy, setFilterBy] = useState("none");
  const [filterValue, setFilterValue] = useState(dayjs(new Date()));
  
  const handleResetFilters = () => {
    setFilterBy("none");
    setFilterValue(dayjs(new Date()));
    handleFilteredTransactions("none")
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
    if(event.target.value === "none"){
      handleResetFilters()
    }else if(event.target.value === "year"){
      handleFilteredTransactions("year",dayjs(filterValue).format("YYYY"))
    }else if(event.target.value === 'month'){
      handleFilteredTransactions("month",dayjs(filterValue).format("MM/YYYY"))
    }else {
      handleFilteredTransactions("date",dayjs(filterValue).format("DD/MM/YYYY"))
    };
  };
  const handleOnFilterValueChange = (value) => {
    setFilterValue(dayjs(value));
    if (filterBy === "date") {
      handleFilteredTransactions("date", dayjs(value).format("DD/MM/YYYY"));
  
    } else if (filterBy === "month") {
      handleFilteredTransactions("month", dayjs(value).format("MM/YYYY"));
    } else if (filterBy === "year") {
      handleFilteredTransactions("year", dayjs(value).format("YYYY"));
    } else {
      setFilterBy("none");
      handleFilteredTransactions("none");
    }
  };

  return (
    <div className="transaction-filter-inputs-cont">
      <div className="transaction-filter-text">
        <h2>Filters</h2>
      </div>
      <div className="transaction-filter-date-picker">
        <div>
          <FormControl fullWidth variant="standard">
            <InputLabel id="filter-by">Filter By</InputLabel>
            <Select
              sx={nativeSelectStyle}
              labelId="category-or-goal"
              id="category-goal-select"
              value={filterBy}
              name="filterBy"
              onChange={handleFilterByChange}
              label="Filter By"
              fullWidth
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <div>
            <DatePicker
              // views={["year", "month", "day"]}
              sx={textFieldStyle}
              value={filterValue}
              disabled={filterBy === "none"}
              className="filter-date-picker"
              views={
                filterBy === "month"
                  ? ["year", "month"]
                  : filterBy === "date"
                  ? ["year", "month", "day"]
                  : ["year"]
              }
              format={
                filterBy === "date"
                  ? "DD-MM-YYYY"
                  : filterBy === "month"
                  ? "MM-YYYY"
                  : "YYYY"
              }
              disableFuture
              onChange={handleOnFilterValueChange}
              label={`Filter by ${filterBy}`}
            />
          </div>
        </div>
        <div>
          <Button
            onClick={handleResetFilters}
            style={{ ...muiOutlinedButtonStyle, backgroundColor: "transparent" }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionOperations;
