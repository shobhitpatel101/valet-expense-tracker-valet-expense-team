import React from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/ChangePassword.scss";
import Button from "@mui/material/Button";
import {
  muiContainedButtonStyle,
  muiGoogleAuthButtonStyle,
} from "../../Styles/MUI/Mui";
import PasswordInput from "../PasswordInput";
function ChangePassword({
  password,
  setPassword,
  confirmedPassword,
  setConfirmedPassword,
  handlePasswordResetRequest,
}) {
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
          <PasswordInput
            label="New Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <PasswordInput
            label="Re-enter Password"
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="change-password-button">
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              if (password === confirmedPassword) {
                handlePasswordResetRequest();
              }
            }}
            style={muiContainedButtonStyle}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
