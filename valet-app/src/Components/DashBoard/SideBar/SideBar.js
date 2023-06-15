import React from "react";
import "../../../Styles/Components/SideBar.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { ShowAppBar } from "../../Context/ShowappbarContext";
import Avatar from "@mui/material/Avatar";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../../Redux/Auth/AuthAction";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ProfilePopup from "../../Popups/ProfilePopup";
import MuiSwitch from "../../MuiComponents/MuiSwitch";
import { AuthContext } from "../../Context/AuthContext";
import ConfirmationDialog from "../../MuiComponents/ConfirmationDialog";

function SideBar() {
  const dispatch = useDispatch();
  const { data } =
    useSelector(({ auth }) => auth.userDetails, shallowEqual) || {};
  const { setShow } = useContext(ShowAppBar);
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogoutConfirmationOpen = () => {
    setLogoutConfirmationOpen(true);
  };
  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };
  const handleLogout = () => {
    logout();
  };
  const handleShowAppBar = () => {
    setShow((prev) => ({
      display: "",
      show: !prev.show,
    }));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <div className="sidebar-container">
      <div className="sidebar-valetdashboard-cont">
        <div>
          <h3>Valet</h3>
        </div>
        <div>
          <IconButton onClick={handleOpen} sx={{ p: 0 }}>
            <Avatar alt={data?.userName} src={data?.profileImage} />
          </IconButton>
        </div>
        <div>
          <SpaceDashboardIcon onClick={handleShowAppBar} fontSize="large" />
        </div>
        <div className="mui-switch-container">
          <MuiSwitch />
        </div>
      </div>
      <div className="sidebar-logout-cont">
        <LogoutIcon
          onClick={handleLogoutConfirmationOpen}
          fontSize="large"
        />
      </div>
      <ProfilePopup open={open} handleClose={handleClose} />
      <ConfirmationDialog
        description="Are you sure you want to log out ?"
        open={logoutConfirmationOpen}
        handleClose={handleLogoutConfirmationClose}
        handleYes={handleLogout}
      />
    </div>
  );
}

export default SideBar;
