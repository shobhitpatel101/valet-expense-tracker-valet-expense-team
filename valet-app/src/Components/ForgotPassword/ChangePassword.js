import React from "react";
import TextField from "@mui/material/TextField";
import '../../Styles/Components/ChangePassword.scss'
import Button from "@mui/material/Button";
import { muiContainedButtonStyle, muiGoogleAuthButtonStyle } from "../../Styles/MUI/Mui";

function ChangePassword() {
  return (
      <div className="user-auth-change-password-content">
        <div className="change-password-text">
          <h1>Reset Password</h1>
        </div>
        {/* <div className="change-password-info-text">
          <p>
            We have sent you an six digit otp on your email address. Please provide that otp in given input field and verify.
          </p>
        </div> */}
        <div className="change-password-inputs">
          <div>
            <TextField
              placeholder="123456"
              variant="standard"
              label="New Password"
              size="medium"
              fullWidth
            />
          </div>
          <div>
            <TextField
              placeholder="123456"
              variant="standard"
              label="Re-enter Password"
              size="medium"
              fullWidth
            />
          </div>
        </div>
        <div className="change-password-button">
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
              Verify
            </Button>
          </div>
          <div className="change-password-external-links">
            <a href="3">Back to Login</a>
            <span>Or</span>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
  );
}

export default ChangePassword;
