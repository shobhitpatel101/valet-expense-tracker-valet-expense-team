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
import { checkForEmptyInputs } from "../../Utils/HelperFunction";
import { textFieldStyle } from "../../Styles/MUI/Mui";
import { useNavigate } from "react-router-dom";
import { getAuthTokenStatus } from "../../Routes/AppRoutes";
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRef } from "react";
function Login() {
  const { auth } = useSelector(({ auth }) => auth, shallowEqual) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toShowInfo = useRef(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loginDetails, setLoginDetails] = useState({
    email: "pestoproject@gmail.com",
    password: "123456",
  });

  const handleLoginFormChange = (event) => {
    const { value, name } = event.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if ((auth.isFulfilled && auth.data.Status) && getAuthTokenStatus()) {
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
  useEffect(()=>{
    if(toShowInfo.current){
      toShowInfo.current = false;
      toast.info('Please Note, We have given dummy login credentials for hussle free login. ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  },[])
  return (
    <div className="user-auth-login-cont">
      <div className="login-text">
        <h1>Log in</h1>
      </div>
      <div className="login-inputs">
        <div>
          <TextField
            name="email"
            value={loginDetails.email}
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
        <TextField
        name="password"
        sx={textFieldStyle}
        placeholder="abc@123"
        label={"Password"}
        value={loginDetails.password}
        type={showPassword ?"text":"password"}
        style={{paddingLeft:"-4rem"}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="standard"
        size="medium"
        fullWidth
        onChange={handleLoginFormChange}
      />
          <div>
            <Link to="/forgotpassword">Forgot Password?</Link>
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
          <Link to="/signup">Don't have an account? Register</Link>
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
