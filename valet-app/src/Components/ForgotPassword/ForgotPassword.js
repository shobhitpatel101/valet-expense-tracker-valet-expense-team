import React from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/ForgotPassword.scss";
import Button from "@mui/material/Button";
import { muiContainedButtonStyle, muiGoogleAuthButtonStyle } from "../../Styles/MUI/Mui";

function ForgotPassword() {
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
                document.documentElement.setAttribute('data-theme', 'dark');
              }}
              style={muiContainedButtonStyle}
            >
              Confirm
            </Button>
          </div>
          <div className="forgot-password-external-links">
            <a href="3">Back to Login</a>
            <span>Or</span>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
  );
}

export default ForgotPassword;
