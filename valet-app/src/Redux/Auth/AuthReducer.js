import {
  doLoginActionType,
  doSignUpActionType,
  getUserDetailsActionType,
  updateUserDetailsActionType,
  validateTokenActionType,
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
  tokenValidation: {
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
    case validateTokenActionType.pending:
      return {
        ...state,
        tokenValidation: {
          ...promiseState(true, false, false, {}),
        },
      };
    case validateTokenActionType.fulfilled:
      return {
        ...state,
        tokenValidation: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case validateTokenActionType.rejected:
      return {
        ...state,
        tokenValidation: {
          ...promiseState(false, false, true, {}),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
