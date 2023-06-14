import {
  doLoginActionType,
  doSignUpActionType,
  getUserDetailsActionType,
  updateUserDetailsActionType,
  validateOtpActionType,
  forgotPasswordActionType,
  updatePasswordActionType,
} from "./AuthAction";
import promiseState from "../ReduxUtils/ReduxReducerHelper";
const initState = {
  auth: {
    ...promiseState(false, false, false, {}),
  },
  userDetails: {
    ...promiseState(false, false, false, {}),
  },
  updatedProfile: {
    ...promiseState(false, false, false, {}),
  },
  otpVerification: {
    ...promiseState(false, false, false, {}),
  },
  forgotPassword: {
    ...promiseState(false, false, false, {}),
  },
  changedPassword: {
    ...promiseState(false, false, false, {}),
  },
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case doLoginActionType.pending:
    case doSignUpActionType.pending:
      return {
        ...state,
        auth: {
          ...promiseState(true, false, false, {}),
        },
      };
    case doLoginActionType.fulfilled:
    case doSignUpActionType.fulfilled:
      localStorage.setItem(
        "userDetails",
        JSON.stringify(action.payload["Users Details"])
      );
      localStorage.setItem("valet-auth-token", action.payload["Bearer Token"]);
      return {
        ...state,
        auth: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case doLoginActionType.rejected:
    case doSignUpActionType.rejected:
      return {
        ...state,
        auth: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getUserDetailsActionType.pending:
      return {
        ...state,
        userDetails: {
          ...promiseState(true, false, false, {}),
        },
      };
    case getUserDetailsActionType.fulfilled:
      return {
        ...state,
        userDetails: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getUserDetailsActionType.rejected:
      return {
        ...state,
        userDetails: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updateUserDetailsActionType.pending:
      return {
        ...state,
        updatedProfile: {
          ...promiseState(true, false, false, {}),
        },
      };
    case updateUserDetailsActionType.fulfilled:
      return {
        ...state,
        updatedProfile: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case updateUserDetailsActionType.rejected:
      return {
        ...state,
        updatedProfile: {
          ...promiseState(false, false, true, {}),
        },
      };
    case forgotPasswordActionType.pending:
      return {
        ...state,
        forgotPassword: {
          ...promiseState(true, false, false, {}),
        },
      };
    case forgotPasswordActionType.fulfilled:
      return {
        ...state,
        forgotPassword: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case forgotPasswordActionType.rejected:
      return {
        ...state,
        forgotPassword: {
          ...promiseState(false, false, true, {}),
        },
      };
    case validateOtpActionType.pending:
      return {
        ...state,
        otpVerification: {
          ...promiseState(true, false, false, {}),
        },
      };
    case validateOtpActionType.fulfilled:
      return {
        ...state,
        otpVerification: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case validateOtpActionType.rejected:
      return {
        ...state,
        otpVerification: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updatePasswordActionType.pending:
      return {
        ...state,
        changedPassword: {
          ...promiseState(true, false, false, {}),
        },
      };
    case updatePasswordActionType.fulfilled:
      return {
        ...state,
        changedPassword: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case updatePasswordActionType.rejected:
      return {
        ...state,
        changedPassword: {
          ...promiseState(false, false, true, {}),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
