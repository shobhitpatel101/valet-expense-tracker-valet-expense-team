import React from "react";
import MuiPopup from "../MuiComponents/MuiPopup";
import Button from "@mui/material/Button";
import { muiOutlinedButtonStyle, muiContainedButtonStyle } from "../../Styles/MUI/Mui";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/Popup.scss";
import { useDispatch } from "react-redux";
import { getAccounts } from "../../Redux/DashBoard/Accounts/AccountsAction";
import { addAccount } from "../../Redux/DashBoard/Accounts/AccountsAction";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { handleApiError } from "../../Utils/HelperFunction";
import { handleInputError } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { useSelector,shallowEqual } from "react-redux";
import { useEffect } from "react";
import { updateAccount } from "../../Redux/DashBoard/Accounts/AccountsAction";
function AddAccountPopup({open,handleClose,isToBeEdited}) {
  const {singleAccount} = useSelector(({account}) => account, shallowEqual) || {};
  const dispatch = useDispatch();
  const [addAccountDetails,setAddAccountDetails] = useState({
    accountName:"",
    accountDesc:"",
  })

  const handleAccountDetailsChange=(event)=>{
    const { value, name } = event.target;
    setAddAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleGetAccounts=(data)=>{
    dispatch(getAccounts())
    handleClose();
  }
  const handleAddAccountError=(data)=>{
    handleApiError();
  }
  const handleAccountDetailsSubmit=()=>{
    if(checkForEmptyInputs(addAccountDetails)){
      if(!isToBeEdited){
        dispatch(addAccount(addAccountDetails,handleGetAccounts ,handleAddAccountError))
      }else{
        dispatch(updateAccount({id:singleAccount.data._id,...addAccountDetails},handleGetAccounts,handleAddAccountError))
      }
    }else{
      handleInputError("Check your inputs!")
    }
  }
  useEffect(()=>{
    if(isToBeEdited){
      setAddAccountDetails({
        accountName:singleAccount?.data?.accountName || "",
        accountDesc:singleAccount?.data?.accountDesc || "",
      })
    }else{
      setAddAccountDetails({
        accountName:"",
        accountDesc:"",
      })
    }
  },[singleAccount,isToBeEdited])
  return (
    <>
      <MuiPopup open={open} handleClose={handleClose}>
        <div className="popup-cont">
          <div className="popup-text">
            <h1>Add Account</h1>
          </div>
          <div className="popup-inputs">
            <div>
              <TextField
              sx={textFieldStyle}
                placeholder="Personal/Business"
                variant="standard"
                value={addAccountDetails.accountName}
                label="Account Name"
                size="medium"
                fullWidth
                name="accountName"
                onChange={handleAccountDetailsChange}
              />
            </div>
            <div>
              <TextField
               sx={textFieldStyle}
                placeholder="write your description here"
                label="Account Description"
                variant="standard"
                size="medium"
                value={addAccountDetails.accountDesc}
                fullWidth
                name="accountDesc"
                onChange={handleAccountDetailsChange}
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
                onClick={handleAccountDetailsSubmit}
              >
                Add Account
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

export default AddAccountPopup;
