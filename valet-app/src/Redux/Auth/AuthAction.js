import {
  asyncActionTypeCreator,
  asyncActionCreator,
} from "../ReduxUtils/ReduxActionHelper";
import apiPaths from "../../Utils/ApiPaths";
import { environment } from "../../Environments/environment";

const doLoginActionType = asyncActionTypeCreator("LOGIN");
const doSignUpActionType = asyncActionTypeCreator("SIGNUP");
const validateTokenActionType = asyncActionTypeCreator("VALIDATE_TOKEN")

const loginAction = asyncActionCreator(doLoginActionType);
const signupAction = asyncActionCreator(doSignUpActionType);
const validateTokenAction = asyncActionCreator(validateTokenActionType);

const getUserDetailsActionType = asyncActionTypeCreator("USER_DETAILS");
const userDetailsAction = asyncActionCreator(getUserDetailsActionType);

const updateUserDetailsActionType = asyncActionTypeCreator("UPDATE_USER_DETAILS");
const updateUserDetailsAction = asyncActionCreator(updateUserDetailsActionType);
const doLogin = ({email, password},errorCallback) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.LOGIN,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      email: email,
      password: password,
    },
  };
  return loginAction.action(axiosConfig);
};

const doSignup = (signUpDetails) => {
  const {userName,email,password} = signUpDetails;
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.SIGNUP,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      userName: userName,
      email: email,
      password: password,
    },
  };
  return signupAction.action(axiosConfig);
};

const validateToken = () =>{
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.VALIDATE_TOKEN,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return validateTokenAction.action(axiosConfig);
}

const getUserDetails = () =>{
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.GET_USER_DETAILS,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return userDetailsAction.action(axiosConfig);
}

const updateUserDetails=({userName,email,password,profileImage},successCallback=null,errorCallback=null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.UPDATE_USER_DETAILS,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data:{
      userName,
      email,
      password,
      profileImage
    }
  };
  return updateUserDetailsAction.action(axiosConfig,successCallback,errorCallback); 
}
export { doLogin, doLoginActionType,doSignup,doSignUpActionType,getUserDetails ,getUserDetailsActionType,updateUserDetails,updateUserDetailsActionType,validateToken,validateTokenActionType};
