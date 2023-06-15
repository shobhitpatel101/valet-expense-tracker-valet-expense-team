import React from "react";
import "../../../Styles/Components/AppBar.scss";
import Accounts from "./Accounts";
import Categories from "./Categories";
import Goals from "./Goals";
import { GrClose } from "react-icons/gr";
import ReactIcons from "../../ReactIcons";
import { ShowAppBar } from "../../Context/ShowappbarContext";
import { useContext } from "react";
function AppBar() {
  const {show,setShow} = useContext(ShowAppBar)
  return (
    <div style={{display:show.display}} className={show.show?"app-bar-container":"disappear-app-bar-container"}>
      <div className="appbar-close-icon-cont">
        <ReactIcons
          styles={{ height: "20px", width: "20px", cursor: "pointer",color:'var(--black-icon-color) !important' }}
        >
          <GrClose  onClick={()=>{setShow(false)}}/>
        </ReactIcons>
      </div>
      <Accounts />
      <div>
        <hr />
      </div>
      <Categories />
      <div>
        <hr />
      </div>
      <Goals />
    </div>
  );
}

export default AppBar;
