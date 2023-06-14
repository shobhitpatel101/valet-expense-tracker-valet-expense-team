// export const muiButtonTextTheme = createMuiTheme({
//     typography: {
//         button: {
//           textTransform: 'none'
//         }
//       }
// })
import { makeStyles } from "@material-ui/core";
import variables from "../base/_base.scss";
export const muiContainedButtonStyle = {
  backgroundColor: "#2E65F5",
  textTransform: "none",
  fontWeight: "bold",
};

export const muiOutlinedButtonStyle = {
  color: "#2E65F5",
  textTransform: "none",
  fontWeight: "bold",
};
export const muiGoogleAuthButtonStyle = {
  color: "#FA5D5D",
  textTransform: "none",
  fontWeight: "bold",
  border: "1px solid #FA5D5D",
};

export const muiPopupStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth > 900 ? "30%" : "70%",
  minHeight: "30%",
  height: "auto",
  bgcolor: `${variables.bgColor}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50px",
  boxShadow: "0 0 50px 0 var(--box-shadow-primary-color)",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export const textFieldStyle = {
  "& .MuiInputBase-root": {
    color: `${variables.muiTextFieldFontColor}`,
  },
  "& input": {
    color: `${variables.muiTextFieldFontColor}`,
  },
  "& .MuiFormLabel-root": {
    color: `${variables.muiTextFieldFontColor}`,
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: `${variables.muiTextFieldFontColor}`,
  },
};
export const nativeSelectStyle ={
  color: `${variables.muiTextFieldFontColor}`,
  borderBottom:`1px solid ${variables.muiTextFieldFontColor}`,
  // '&:hover': {
  //   backgroundColor: 'gray',
  // },
}

const handleResize = () => {
  muiPopupStyle.width = window.innerWidth > 900 ? "30%" : "70%";
};
window.addEventListener("resize", handleResize);
