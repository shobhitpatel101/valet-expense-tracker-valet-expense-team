import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "../Styles/MUI/Mui";
function PasswordInput({ onChange,label="" }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {" "}
      <TextField
        name="password"
        sx={textFieldStyle}
        placeholder="abc@123"
        label={label ? label:"Password"}
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
        onChange={onChange}
      />
    </>
  );
}

export default PasswordInput;
