import React from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/ForgotPassword.scss";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom'
import { muiContainedButtonStyle } from "../../Styles/MUI/Mui";

function ForgotPassword({email,setEmail,handleSendForgotPasswordRequest}) {
  return (
      <div className="user-auth-forgot-password-content">
        <div className="forgot-password-text">
          <h1>Forgot Password</h1>
        </div>
        <div className="forgot-password-info-text">
          <p>
            Enter the email address you used to register, and we will send you
            an email to recover your password in no time.
          </p>
        </div>
        <div className="forgot-password-inputs">
          <div>
            <TextField
              placeholder="valet@example.com"
              variant="standard"
              label="Email"
              size="medium"
              fullWidth
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
        </div>
        <div className="forgot-password-button">
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={()=>{
                handleSendForgotPasswordRequest()
              }}
              style={muiContainedButtonStyle}
            >
              Confirm
            </Button>
          </div>
          <div className="forgot-password-external-links">
            <Link to="/login">Back to Login</Link>
            <span>Or</span>
            <Link to="/signup">Register</Link>
          </div>
        </div>
      </div>
  );
}

export default ForgotPassword;
