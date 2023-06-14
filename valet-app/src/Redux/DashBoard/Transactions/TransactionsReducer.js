import {
  getTransactionsActionType,
  addTransactionType,
  getTransactionByIdActionType,
  deleteTransactionActionType,
  updateTransactionActionType,
} from "./TransactionsAction";
import promiseState from "../../ReduxUtils/ReduxReducerHelper";

const initState = {
  transactions: {
    ...promiseState(false, false, false, []),
  },
  addedTransaction: {
    ...promiseState(false, false, false, {}),
  },
  singleTransaction: {
    ...promiseState(false, false, false, {}),
  },
  updatedTransaction: {
    ...promiseState(false, false, false, {}),
  },
  deleteTransaction: {
    ...promiseState(false, false, false, {}),
  },
};

const TransactionReducer = (state = initState, action) => {
  switch (action.type) {
    case getTransactionsActionType.pending:
      return {
        ...state,
        transactions: {
          ...promiseState(true, false, false, []),
        },
      };
    case getTransactionsActionType.fulfilled:
      const transactions =
        action.payload.Status && Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      return {
        ...state,
        transactions: {
          ...promiseState(false, true, false, transactions),
        },
      };
    case getTransactionsActionType.rejected:
      return {
        ...state,
        transactions: {
          ...promiseState(false, false, true, []),
        },
      };
    case addTransactionType.pending:
      return {
        ...state,
        addedTransaction: {
          ...promiseState(true, false, false, {}),
        },
      };
    case addTransactionType.fulfilled:
      const transaction = action.payload.Status ? action.payload.data : {};
      return {
        ...state,
        addedTransaction: {
          ...promiseState(false, true, false, transaction),
        },
      };
    case addTransactionType.rejected:
      return {
        ...state,
        addedTransaction: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getTransactionByIdActionType.pending:
      return {
        ...state,
        singleTransaction: {
          ...promiseState(true, false, false, {}),
        },
      };
    case getTransactionByIdActionType.fulfilled:
      return {
        ...state,
        singleTransaction: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getTransactionByIdActionType.rejected:
      return {
        ...state,
        singleTransaction: {
          ...promiseState(false, false, true, {}),
        },
      };
    case deleteTransactionActionType.pending:
      return {
        ...state,
        deleteTransaction: {
          ...promiseState(true, false, false, {}),
        },
      };
    case deleteTransactionActionType.fulfilled:
      return {
        ...state,
        deleteTransaction: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case deleteTransactionActionType.rejected:
      return {
        ...state,
        deleteTransaction: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updateTransactionActionType.pending:
      return {
        ...state,
        updatedTransaction: {
          ...promiseState(true, false, false, {}),
        },
      };
    case updateTransactionActionType.fulfilled:
      return {
        ...state,
        updatedTransaction: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case updateTransactionActionType.rejected:
      return {
        ...state,
        updatedTransaction: {
          ...promiseState(false, false, true, {}),
        },
      };

    default:
      return state;
  }
};

export default TransactionReducer;
