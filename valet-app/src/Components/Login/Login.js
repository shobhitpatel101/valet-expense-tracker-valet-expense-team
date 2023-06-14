import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/Login.scss";
import Button from "@mui/material/Button";
import {
  muiContainedButtonStyle,
  muiGoogleAuthButtonStyle,
} from "../../Styles/MUI/Mui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useState } from "react";
import { doLogin } from "../../Redux/Auth/AuthAction";
import PasswordInput from "../PasswordInput";
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { useNavigate } from "react-router-dom";
function Login() {
  const { auth } = useSelector(({ auth }) => auth, shallowEqual) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleLoginFormChange = (event) => {
    const { value, name } = event.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if ((auth.isFulfilled && auth.data.Status) && localStorage.getItem('valet-auth-token')) {
      if (window.innerWidth > 900) {
        navigate("/dashboard");
      } else {
        navigate("/mobile-dashboard");
      }
    }
  }, [auth]);

  const handleSubmitLoginForm = () => {
    if (checkForEmptyInputs(loginDetails)) {
      dispatch(doLogin(loginDetails));
    }
  };
  return (
    <div className="user-auth-login-cont">
      <div className="login-text">
        <h1>Log in</h1>
      </div>
      <div className="login-inputs">
        <div>
          <TextField
            name="email"
            placeholder="valet@example.com"
            variant="standard"
            label="Email"
            sx={textFieldStyle}
            size="medium"
            fullWidth
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          <PasswordInput onChange={handleLoginFormChange} />
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
      <div className="login-button">
        <div>
          <Button
            onClick={handleSubmitLoginForm}
            variant="contained"
            color="primary"
            fullWidth
            style={muiContainedButtonStyle}
          >
            Log In
          </Button>
        </div>
        <div>
          <a href="#">Don't have an account? Register</a>
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

export default Login;
