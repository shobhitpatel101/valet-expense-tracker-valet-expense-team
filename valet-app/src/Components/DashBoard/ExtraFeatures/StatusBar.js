import React from "react";
import "../../../Styles/Components/StatusBar.scss";
import CircularProgress from "@mui/material/CircularProgress";
function StatusBar({color,background,name,percentage, budget,transactions}) {
  return (
    <div className="status-bar-cont" style={{background:background}}>
      <div>
        <CircularProgress
          variant="determinate"
          value={Number(percentage)}
          size="40%"
          color={color}
        />
      </div>
      <div>
        <p>{name}</p>
        <h5>{transactions} &#8377;/{budget} &#8377;</h5>
      </div>
      <div>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}

export default StatusBar;
