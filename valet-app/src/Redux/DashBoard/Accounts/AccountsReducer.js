import {
  getAccountsActionType,
  addAccountActionType,
  getAccountByIdActionType,
  updateAccountActionType,
  deleteAccountActionType,
  deleteTransactionsFromAccountActionType
} from "./AccountsAction";
import promiseState from "../../ReduxUtils/ReduxReducerHelper";

const initState = {
  accounts: {
    ...promiseState(false, false, false, []),
  },
  addedAccount: {
    ...promiseState(false, false, false, {}),
  },
  singleAccount: {
    ...promiseState(false, false, false, {}),
  },
  updatedAccount: {
    ...promiseState(false, false, false, {}),
  },
  deletedAccount: {
    ...promiseState(false, false, false, {}),
  },
  deletedTransactions:{
    ...promiseState(false, false, false, []),
  }
};

const AccountReducer = (state = initState, action) => {
  switch (action.type) {
    case getAccountsActionType.pending:
      return {
        ...state,
        accounts: {
          ...promiseState(true, false, false, []),
        },
      };
    case getAccountsActionType.fulfilled:
      const accounts =
        action.payload.Status && Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      return {
        ...state,
        accounts: {
          ...promiseState(false, true, false, accounts),
        },
      };
    case getAccountsActionType.rejected:
      return {
        ...state,
        accounts: {
          ...promiseState(false, false, true, []),
        },
      };
    case addAccountActionType.pending:
      return {
        ...state,
        addedAccount: {
          ...promiseState(true, false, false, {}),
        },
      };
    case addAccountActionType.fulfilled:
      const addedAccount = action.payload.Status ? action.payload.data : {};
      return {
        ...state,
        addedAccount: {
          ...promiseState(false, true, false, addedAccount),
        },
      };
    case addAccountActionType.rejected:
      return {
        ...state,
        addedAccount: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getAccountByIdActionType.pending:
      return {
        ...state,
        singleAccount: {
          ...promiseState(true, false, false, {}),
        },
      };
    case getAccountByIdActionType.fulfilled:
      return {
        ...state,
        singleAccount: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getAccountByIdActionType.rejected:
      return {
        ...state,
        singleAccount: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updateAccountActionType.pending:
      return {
        ...state,
        updatedAccount: {
          ...promiseState(true, false, false, {}),
        },
      };
    case updateAccountActionType.fulfilled:
      return {
        ...state,
        updatedAccount: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case updateAccountActionType.rejected:
      return {
        ...state,
        updatedAccount: {
          ...promiseState(false, false, true, {}),
        },
      };
    case deleteAccountActionType.pending:
      return {
        ...state,
        deletedAccount: {
          ...promiseState(true, false, false, {}),
        },
      };
    case deleteAccountActionType.fulfilled:
      return {
        ...state,
        deletedAccount: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case deleteAccountActionType.rejected:
      return {
        ...state,
        deletedAccount: {
          ...promiseState(false, false, true, {}),
        },
      };
      case deleteTransactionsFromAccountActionType.pending:
        return {
          ...state,
          deletedTransactions: {
            ...promiseState(true, false, false, {}),
          },
        };
      case deleteTransactionsFromAccountActionType.fulfilled:
        return {
          ...state,
          deletedTransactions: {
            ...promiseState(false, true, false, action.payload.data),
          },
        };
      case deleteTransactionsFromAccountActionType.rejected:
        return {
          ...state,
          deletedTransactions: {
            ...promiseState(false, false, true, {}),
          },
        };
    default:
      return state;
  }
};

export default AccountReducer;
