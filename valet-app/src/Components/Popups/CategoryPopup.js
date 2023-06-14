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
import { useDispatch } from "react-redux";
import { getAccounts } from "../../Redux/DashBoard/Accounts/AccountsAction";
import {
  addCategory,
  getCategories,
} from "../../Redux/DashBoard/Category/CategoryAction";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { handleApiError } from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { useSelector, shallowEqual } from "react-redux";
import { updateCategory } from "../../Redux/DashBoard/Category/CategoryAction";
function CategoryPopup({ open, handleClose, isToBeEdited }) {
  const dispatch = useDispatch();
  // console.log(accounts)
  const { singleCategory } =
    useSelector(({ category }) => category, shallowEqual) || {};
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    categoryType: "",
    categoryBudget: 0,
  });

  const handleCategoryDetailsChange = (event) => {
    const { value, name } = event.target;
    setCategoryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetCategories = (data) => {
    dispatch(getCategories());
  };
  const handleAddCategoryError = (data) => {
    handleApiError();
  };
  const handleCategoryDetailsSubmit = (event) => {
    if (checkForEmptyInputs(categoryDetails)) {
      if (!isToBeEdited) {
        dispatch(
          addCategory(
            categoryDetails,
            handleGetCategories,
            handleAddCategoryError
          )
        );
      } else {
        dispatch(
          updateCategory(
            { id: singleCategory.data._id, ...categoryDetails },
            handleGetCategories,
            handleAddCategoryError
          )
        );
      }
    } else {
      handleInputError("Check your inputs!");
    }
  };

  useEffect(() => {
    if (isToBeEdited) {
      setCategoryDetails({
        categoryName: singleCategory?.data?.categoryName || "",
        categoryType: singleCategory?.data?.categoryType || "",
        categoryBudget: singleCategory?.data?.categoryBudget || 0,
      });
    } else {
      setCategoryDetails({
        categoryName: "",
        categoryType: "",
        categoryBudget: 0,
      });
    }
  }, [singleCategory, isToBeEdited]);

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  return (
    <>
      <MuiPopup open={open} handleClose={handleClose}>
        <div className="popup-cont">
          <div className="popup-text">
            <h1>Category</h1>
          </div>
          <div className="popup-inputs">
            <div>
              <TextField
                sx={textFieldStyle}
                value={categoryDetails.categoryName}
                placeholder="Food/Grocery/General/Medical"
                variant="standard"
                label="Category Name"
                size="medium"
                onChange={handleCategoryDetailsChange}
                fullWidth
                name="categoryName"
              />
            </div>
            <div>
              <TextField
                sx={textFieldStyle}
                value={categoryDetails.categoryType}
                placeholder="Expense/Income/Savings"
                label="Category Type"
                name="categoryType"
                variant="standard"
                onChange={handleCategoryDetailsChange}
                size="medium"
                fullWidth
              />
            </div>
            <div>
              <TextField
                sx={textFieldStyle}
                value={categoryDetails.categoryBudget}
                placeholder="10000"
                label="Category Budget"
                name="categoryBudget"
                variant="standard"
                onChange={handleCategoryDetailsChange}
                size="medium"
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
                onClick={handleCategoryDetailsSubmit}
              >
                Add Category
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

export default CategoryPopup;
