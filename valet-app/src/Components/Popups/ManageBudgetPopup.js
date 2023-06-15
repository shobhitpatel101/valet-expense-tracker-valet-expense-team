import React from "react";
import MuiPopup from "../MuiComponents/MuiPopup";
import Button from "@mui/material/Button";
import {
  muiOutlinedButtonStyle,
  muiContainedButtonStyle,
} from "../../Styles/MUI/Mui";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/ManageBudgetPopup.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import {v1 as uuidv4} from 'uuid';
import { useSelector,useDispatch,shallowEqual } from "react-redux";
import { manageBudget } from "../../Redux/DashBoard/Category/CategoryAction";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { nativeSelectStyle } from "../../Styles/MUI/Mui";
import { getExpenseByCategory } from "../../Redux/DashBoard/Category/CategoryAction";
function ManageBudgetPopup({ open, handleClose }) {
  const {category } = useSelector((state) => state, shallowEqual) || {};
  const categoryData = category?.categories?.data || [];
  const dispatch = useDispatch()
  const [manageBudgetPayload,setManageBudgetPayload] = useState({
      categoryBudget:0,
      categoryId:""
  })

  const handleMangeBudgetChange = (event) => {
    const {name,value} = event.target;
    setManageBudgetPayload((prev)=>({
       ...prev,
       [name]:value
    }));
  };

  const handleManageBudgetSubmit=()=>{
    if(!checkForEmptyInputs(manageBudgetPayload)){
       handleInputError("Check your inputs!")
    }else{
      dispatch(manageBudget(manageBudgetPayload,()=>{
        dispatch(getExpenseByCategory())
        handleClose()
      }))
    }
  }
  return (
    <>
      <MuiPopup open={open} handleClose={handleClose}>
        <div className="manage-budget-popup-cont">
          <div className="manage-budget-popup-text">
            <h1>Manage Budget</h1>
          </div>
          <div className="manage-budget-popup-inputs">
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={nativeSelectStyle}
                  value={manageBudgetPayload.categoryId}
                  label="Category"
                  name="categoryId"
                    onChange={handleMangeBudgetChange}
                >
                  {categoryData && categoryData.length > 0 ? categoryData.map((category)=>{
                    return <MenuItem key={uuidv4()} value={category._id}>{category.categoryName}</MenuItem>
                  }):null}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                placeholder="25000"
                variant="standard"
                sx={textFieldStyle}
                label="Category Budget"
                type="number"
                size="medium"
                name="categoryBudget"
                onChange={handleMangeBudgetChange}
                fullWidth
              />
            </div>
          </div>
          <div className="manage-budget-popup-button">
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleManageBudgetSubmit}
                style={muiContainedButtonStyle}
              >
                Add Budget
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

export default ManageBudgetPopup;
