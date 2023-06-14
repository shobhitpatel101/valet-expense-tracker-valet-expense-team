import React from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/SignUp.scss";
import Button from "@mui/material/Button";
import {
  muiContainedButtonStyle,
  muiGoogleAuthButtonStyle,
} from "../../Styles/MUI/Mui";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { doSignup } from "../../Redux/Auth/AuthAction";
import PasswordInput from "../PasswordInput";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
function SignUp() {
  const { auth } = useSelector((state) => state, shallowEqual) || {};
  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleSignUpFormChange = (event) => {
    const { value, name } = event.target;
    setSignUpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitSignupForm = () => {
    const { password, confirmedPassword } = signUpDetails;
    if (password === confirmedPassword && checkForEmptyInputs(signUpDetails)) {
      dispatch(doSignup(signUpDetails));
    } else {
      return;
    }
  };

  return (
    <div className="user-auth-signup-cont">
      <div className="signup-text">
        <h1>Sign Up</h1>
      </div>
      <div className="signup-inputs">
        <div>
          <TextField
            placeholder="Joe Dean"
            sx={textFieldStyle}
            label="User Name"
            variant="standard"
            size="medium"
            fullWidth
            name="userName"
            value={signUpDetails.userName}
            onChange={handleSignUpFormChange}
          />
        </div>
        <div>
          <TextField
            placeholder="joe@example.com"
            variant="standard"
            label="Email"
            size="medium"
            sx={textFieldStyle}
            name="email"
            fullWidth
            value={signUpDetails.email}
            onChange={handleSignUpFormChange}
          />
        </div>

        <div>
          <PasswordInput onChange={handleSignUpFormChange} />
        </div>
        <div>
          <TextField
            sx={textFieldStyle}
            placeholder="abc@123"
            label="Re-enter Password"
            type="password"
            name="confirmedPassword"
            variant="standard"
            size="medium"
            fullWidth
            value={signUpDetails.confirmedPassword}
            onChange={handleSignUpFormChange}
          />
        </div>
      </div>
      <div className="signup-button">
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={muiContainedButtonStyle}
            onClick={handleSubmitSignupForm}
          >
            Sign Up
          </Button>
        </div>
        <div>
          <a href="#">Have an account? Login</a>
        </div>
      </div>
      <div className="google-auth-cont">
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          style={muiGoogleAuthButtonStyle}
        >
          Connect With Google
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
