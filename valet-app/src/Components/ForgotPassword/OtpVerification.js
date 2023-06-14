import React from "react";
import TextField from "@mui/material/TextField";
import '../../Styles/Components/OtpVerification.scss'
import Button from "@mui/material/Button";
import { muiContainedButtonStyle, muiGoogleAuthButtonStyle } from "../../Styles/MUI/Mui";

function OtpVerification() {
  return (
      <div className="user-auth-otp-verification-content">
        <div className="otp-verification-text">
          <h1>OTP Verification</h1>
        </div>
        <div className="otp-verification-info-text">
          <p>
            We have sent you an six digit otp on your email address. Please provide that otp in given input field and verify.
          </p>
        </div>
        <div className="otp-verification-inputs">
          <div>
            <TextField
              placeholder="123456"
              variant="standard"
              label="OTP"
              size="medium"
              fullWidth
            />
          </div>
        </div>
        <div className="otp-verification-button">
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
          <div className="otp-verification-external-links">
            <a href="3">Back to Login</a>
            <span>Or</span>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
  );
}

export default OtpVerification;
