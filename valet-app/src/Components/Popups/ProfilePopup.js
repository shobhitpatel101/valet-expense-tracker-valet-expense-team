import React from "react";
import MuiPopup from "../MuiComponents/MuiPopup";
import Profile from "../Profile/Profile";
import styled from "styled-components";
function ProfilePopup({ open, handleClose }) {
  return (
    <MuiPopup open={open} handleClose={handleClose}>
      <ProfileHeadingStyled className="profile-details-heading">
        <h1>Profile Details</h1>
      </ProfileHeadingStyled>
      <Profile />
    </MuiPopup>
  );
}

const ProfileHeadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:3rem ;
`;
export default ProfilePopup;
