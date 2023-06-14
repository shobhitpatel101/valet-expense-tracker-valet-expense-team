import {
  asyncActionCreator,
  asyncActionTypeCreator,
} from "../../ReduxUtils/ReduxActionHelper";
import apiPaths from "../../../Utils/ApiPaths";
import { environment } from "../../../Environments/environment";
import dayjs from "dayjs";
const getTransactionsActionType = asyncActionTypeCreator("GET_TRANSACTIONS");
const addTransactionType = asyncActionTypeCreator("ADD_TRANSACTION");
const getTransactionByIdActionType = asyncActionTypeCreator(
  "GET_TRANSACTION_BY_ID"
);
const updateTransactionActionType =
  asyncActionTypeCreator("UPDATE_TRANSACTION");
const deleteTransactionActionType =
  asyncActionTypeCreator("DELETE_TRANSACTION");

const getTransactionsAction = asyncActionCreator(getTransactionsActionType);
const addTransactionAction = asyncActionCreator(addTransactionType);
const getTransactionByIdAction = asyncActionCreator(
  getTransactionByIdActionType
);
const updateTransactionAction = asyncActionCreator(updateTransactionActionType);
const deleteTransactionAction = asyncActionCreator(deleteTransactionActionType);

const getTransactions = () => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_TRANSACTION_BY_USER,
    method: "GET",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getTransactionsAction.action(axiosConfig);
};

const addTransaction = (
  {
    transactionName,
    categoryOrGoal,
    goalId,
    categoryId,
    accountId,
    transactionAmount,
    transactiontype,
    transactionDate,
  },
  successCallback = null,
  errorCallback = null
) => {
  let payload = {
    transactionName,
    categoryOrGoal,
    goalId,
    categoryId,
    accountId,
    transactionAmount,
    transactiontype,
    transactionDate: dayjs(transactionDate).format("DD/MM/YYYY"),
  };
  if (categoryOrGoal === "Goal") {
    delete payload.categoryId;
  } else {
    delete payload.goalId;
  }
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.ADD_TRANSACTION,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: payload,
  };
  return addTransactionAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const getTransaction = (
  { id },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.GET_TRANSACTION_BY_ID + `/${id}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getTransactionByIdAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const updateTransaction = (
  {
    id,
    transactionName,
    categoryOrGoal,
    goalId,
    categoryId,
    accountId,
    transactionAmount,
    transactiontype,
    transactionDate,
  },
  successCallback = null,
  errorCallback = null
) => {
  let payload = {
    transactionName,
    categoryOrGoal,
    goalId,
    categoryId,
    accountId,
    transactionAmount,
    transactiontype,
    transactionDate: dayjs(transactionDate).format("DD/MM/YYYY"),
  };
  if (categoryOrGoal === "Goal") {
    delete payload.categoryId;
  } else {
    delete payload.goalId;
  }
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.UPDATE_TRANSACTION + `/${id}`,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: payload,
  };
  return updateTransactionAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const deleteTransaction = (
  { id },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.DELETE_TRANSACTION + `/${id}`,
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return deleteTransactionAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

export {
  getTransactionsActionType,
  getTransactions,
  addTransactionType,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
  getTransactionByIdActionType,
  deleteTransactionActionType,
  updateTransactionActionType,
};
