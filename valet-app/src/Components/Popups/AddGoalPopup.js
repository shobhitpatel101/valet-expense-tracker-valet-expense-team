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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { v4 as uuidv4 } from "uuid";
import Select from "@mui/material/Select";
import { getGoals } from "../../Redux/DashBoard/Goals/GoalsAction";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { handleApiError } from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { nativeSelectStyle } from "../../Styles/MUI/Mui";
import { updateGoal } from "../../Redux/DashBoard/Goals/GoalsAction";

function AddGoalPopup({ open, handleClose, isToBeEdited }) {
  const { category } = useSelector((state) => state, shallowEqual) || {};
  const { singleGoal } = useSelector(({ goal }) => goal, shallowEqual) || {};

  const categoryData = category?.categories?.data || [];

  const dispatch = useDispatch();
  const [goalDetails, setGoalDetails] = useState({
    goalName: "",
    goalDesc: "",
    categoryId: "",
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
        categoryId: singleGoal?.data?.categoryId || "",
      });
    } else {
      setGoalDetails({
        goalName: "",
        goalDesc: "",
        categoryId: "",
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
              <FormControl fullWidth variant="standard">
                <InputLabel id="account-for-category">Category</InputLabel>
                <Select
                  labelId="category-for-goal"
                  id="category-select"
                  sx={nativeSelectStyle}
                  value={goalDetails.categoryId}
                  name="categoryId"
                  onChange={handleGoalDetailsChange}
                  label="Category"
                  fullWidth
                >
                  {categoryData && categoryData.length
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
