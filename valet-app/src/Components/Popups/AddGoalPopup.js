import React from "react";
import MuiPopup from "../MuiComponents/MuiPopup";
import Button from "@mui/material/Button";
import {
  muiOutlinedButtonStyle,
  muiContainedButtonStyle,
} from "../../Styles/MUI/Mui";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/Popup.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addGoal } from "../../Redux/DashBoard/Goals/GoalsAction";
import { getCategories } from "../../Redux/DashBoard/Category/CategoryAction";
import { getGoals } from "../../Redux/DashBoard/Goals/GoalsAction";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { handleApiError } from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { updateGoal } from "../../Redux/DashBoard/Goals/GoalsAction";

function AddGoalPopup({ open, handleClose, isToBeEdited }) {
  const { singleGoal } = useSelector(({ goal }) => goal, shallowEqual) || {};


  const dispatch = useDispatch();
  const [goalDetails, setGoalDetails] = useState({
    goalName: "",
    goalDesc: "",
    goalAmount: "",
  });

  const handleGoalDetailsChange = (event) => {
    const { value, name } = event.target;
    setGoalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetGoals = (data) => {
    dispatch(getGoals(data));
    handleClose()
  };
  const handleAddGoalError = (data) => {
    handleApiError();
  };
  const handleGoalDetailsSubmit = () => {
    if (checkForEmptyInputs(goalDetails)) {
      if (isToBeEdited) {
        dispatch(
          updateGoal(
            { id: singleGoal.data._id, ...goalDetails },
            handleGetGoals,
            handleAddGoalError
          )
        );
      } else {
        dispatch(addGoal(goalDetails, handleGetGoals, handleAddGoalError));
      }
    } else {
      handleInputError("Check your inputs!");
    }
  };

  useEffect(() => {
    if (isToBeEdited) {
      setGoalDetails({
        goalName: singleGoal?.data?.goalName || "",
        goalDesc: singleGoal?.data?.goalDesc || "",
        goalAmount: singleGoal?.data?.goalAmount || 0,
      });
    } else {
      setGoalDetails({
        goalName: "",
        goalDesc: "",
        goalAmount: "",
      });
    }
  }, [singleGoal, isToBeEdited]);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <MuiPopup open={open} handleClose={handleClose}>
        <div className="popup-cont">
          <div className="popup-text">
            <h1>Add Goal</h1>
          </div>
          <div className="popup-inputs">
            <div>
              <TextField
                value={goalDetails.goalName}
                placeholder="Food/Grocery/General/Medical"
                variant="standard"
                label="Goal Name"
                size="medium"
                fullWidth
                sx={textFieldStyle}
                name="goalName"
                onChange={handleGoalDetailsChange}
              />
            </div>
            <div>
              <TextField
                value={goalDetails.goalDesc}
                placeholder="write your description here"
                label="Goal Description"
                variant="standard"
                size="medium"
                sx={textFieldStyle}
                onChange={handleGoalDetailsChange}
                name="goalDesc"
                fullWidth
              />
            </div>
            <div>
              <TextField
                placeholder="80000"
                label="Goal Amount"
                variant="standard"
                sx={textFieldStyle}
                value={goalDetails.goalAmount}
                size="medium"
                name="goalAmount"
                onChange={handleGoalDetailsChange}
                type="number"
                fullWidth
              />
            </div>
          </div>
          <div className="popup-button">
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={muiContainedButtonStyle}
                onClick={handleGoalDetailsSubmit}
              >
                Add Goal
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

export default AddGoalPopup;
