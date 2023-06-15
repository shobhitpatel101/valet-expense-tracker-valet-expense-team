import React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "../../Styles/Components/Profile.scss";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { muiOutlinedButtonStyle } from "../../Styles/MUI/Mui";
import { useState, useEffect } from "react";
import { getUserDetails } from "../../Redux/Auth/AuthAction";
import Skeleton from "@mui/material/Skeleton";
import {
  checkForEmptyInputs,
  handleApiError,
  checkForSameProfileDetails,
} from "../../Utils/HelperFunction";
import { updateUserDetails } from "../../Redux/Auth/AuthAction";
import { handleInputError } from "../../Utils/HelperFunction";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { textFieldStyle } from "../../Styles/MUI/Mui";
function Profile() {
  const dispatch = useDispatch();
  const { data } =
    useSelector(({ auth }) => auth.userDetails, shallowEqual) || {};

  const { isFulfilled } =
    useSelector(({ auth }) => auth.updatedProfile, shallowEqual) || false;

  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isImageAvailable, setIsImageAvailable] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({
    userName: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "yoinbch9");
      const options = {
        method: "POST",
        body: formData,
      };
      setIsImageAvailable(false);
      try {
        const response = await fetch(
          `https://api.Cloudinary.com/v1_1/dud2sa5mg/image/upload`,
          options
        );
        const imageUrl = await response.json();
        setIsImageAvailable(true);
        setUserProfileDetails((prev) => ({
          ...prev,
          profileImage: imageUrl.url,
        }));
      } catch (err) {
        handleApiError();
      }
    }
  };

  const handleUpdateDetailsSuccess = (data) => {
    dispatch(getUserDetails());
  };

  const handleUserProfileDetailsChange = (event) => {
    const { name, value } = event.target;
    setUserProfileDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserProfileDetailsUpdate = () => {
    if (
      checkForEmptyInputs(userProfileDetails,'profiledetails') &&
      !checkForSameProfileDetails(userProfileDetails, data)
    ) {
      dispatch(
        updateUserDetails(userProfileDetails, handleUpdateDetailsSuccess)
      );
    } else {
      handleInputError("Check your inputs!");
    }
  };

  useEffect(() => {
    if (isFulfilled) {
      setIsEditEnabled(false);
      setIsImageAvailable(true);
    }
  }, [isFulfilled]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setIsImageAvailable(true);
      setUserProfileDetails((prev) => ({
        userName: data?.userName || "",
        email: data?.email || "",
        password:"",
        profileImage: data?.profileImage || "",
      }));
    }
  }, [data]);

  return (
    <div className="user-profile-container">
      <div className="user-profile-avatar">
        {isImageAvailable ? (
          <Avatar
            alt="Remy Sharp"
            src={userProfileDetails.profileImage}
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Skeleton variant="circular" width={100} height={100} />
        )}
        {isEditEnabled ? (
          <div className="upload-photo-icon">
            <IconButton variant="contained" component="label">
              <PhotoCameraIcon />
              <input type="file" hidden onChange={handleImageChange} />
            </IconButton>
          </div>
        ) : null}
      </div>
      <div className="user-profile-username">
        <TextField
          sx={textFieldStyle}
          type="text"
          id="user-name"
          label="User Name"
          variant="outlined"
          name="userName"
          onChange={handleUserProfileDetailsChange}
          value={userProfileDetails.userName}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: isEditEnabled ? false : true,
          }}
        />
      </div>
      <div className="user-profile-email">
        <TextField
          sx={textFieldStyle}
          id="user-email"
          type="text"
          label="Email"
          name="email"
          onChange={handleUserProfileDetailsChange}
          value={userProfileDetails.email}
          variant="outlined"
          InputProps={{
            readOnly: isEditEnabled ? false : true,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div className="user-profile-password">
        <TextField
          sx={textFieldStyle}
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          style={{ paddingLeft: "-4rem" }}
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
            readOnly: isEditEnabled ? false : true,
          }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="medium"
          fullWidth
          onChange={handleUserProfileDetailsChange}
          value={userProfileDetails.password}
        />
      </div>
      <div>
        <div className="edit-and-save-btn">
          <Button
            onClick={() => {
              setIsEditEnabled((prev) => !prev);
            }}
            style={{ ...muiOutlinedButtonStyle, backgroundColor: "#fff" }}
          >
            {isEditEnabled ? "Cancel" : "Edit"}
          </Button>
          {isEditEnabled ? (
            <Button
              onClick={handleUserProfileDetailsUpdate}
              style={{ ...muiOutlinedButtonStyle, backgroundColor: "#fff" }}
            >
              Save
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
