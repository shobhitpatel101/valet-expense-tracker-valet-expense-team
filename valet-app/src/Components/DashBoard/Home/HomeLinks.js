import React from "react";
import "../../../Styles/Components/HomeLinks.scss";
import { Button } from "@material-ui/core";
import { muiContainedButtonStyle ,muiOutlinedButtonStyle} from "../../../Styles/MUI/Mui";
import { useNavigate } from "react-router-dom";
import routePaths from "../../../Utils/RoutePaths";
function HomeLinks() {
    const navigate = useNavigate();
  return (
    <div className="home-links-container">
      <div>
        <div className="home-links-heading">
          <p>
            Keep your <span>personal and group finances</span> under control
          </p>
        </div>
        <div className="home-links-btns">
          <Button onClick={()=>{
              navigate(routePaths.SIGNUP)
          }} style={{...muiContainedButtonStyle,color:'#fff'}}>Signup for free</Button>
          <Button onClick={()=>{
            navigate(routePaths.LOGIN)
          }} style={{...muiOutlinedButtonStyle}}>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default HomeLinks;
