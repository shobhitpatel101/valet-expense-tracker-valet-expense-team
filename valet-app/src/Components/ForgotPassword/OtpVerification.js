import React from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/OtpVerification.scss";
import Button from "@mui/material/Button";
import {
  muiContainedButtonStyle,
} from "../../Styles/MUI/Mui";

function OtpVerification({otp,setOtp,handleOtpVerificationRequest}) {
  return (
    <div className="user-auth-otp-verification-content">
      <div className="otp-verification-text">
        <h1>OTP Verification</h1>
      </div>
      <div className="otp-verification-info-text">
        <p>
          We have sent you an six digit otp on your email address. Please
          provide that otp in given input field and verify.
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
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="otp-verification-button">
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleOtpVerificationRequest()
            }}
            style={muiContainedButtonStyle}
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
