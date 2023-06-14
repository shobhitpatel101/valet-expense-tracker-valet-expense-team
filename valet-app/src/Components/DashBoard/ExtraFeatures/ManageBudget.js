import React from "react";
import Button from "@mui/material/Button";
import { muiContainedButtonStyle } from "../../../Styles/MUI/Mui";
import { useState } from "react";
import ManageBudgetPopup from "../../Popups/ManageBudgetPopup";
import '../../../Styles/Components/ManageBudget.scss'
function ManageBudget() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="manage-budget-container">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{...muiContainedButtonStyle,width:"70%"}}
        onClick={handleOpen}
      >
        Manage Budget
      </Button>
      <ManageBudgetPopup open={open} handleClose={handleClose}/>
    </div>
  );
}

export default ManageBudget;
