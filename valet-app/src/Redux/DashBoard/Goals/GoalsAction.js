import {
  asyncActionCreator,
  asyncActionTypeCreator,
} from "../../ReduxUtils/ReduxActionHelper";
import apiPaths from "../../../Utils/ApiPaths";
import { environment } from "../../../Environments/environment";

const getGoalsActionType = asyncActionTypeCreator("GET_GOALS");
const addGoalActionType = asyncActionTypeCreator("ADD_GOAL");
const getExpenseByGoalActionType = asyncActionTypeCreator(
  "GET_EXPENSE_BY_GOAL"
);
const getGoalByIdActionType = asyncActionTypeCreator("GET_GOAL_BY_ID");
const updateGoalActionType = asyncActionTypeCreator("UPDATE_GOAL");
const deleteGoalActionType = asyncActionTypeCreator("DELETE_GOAL");
const deleteTransactionsFromGoalActionType = asyncActionTypeCreator("DELETE_TRANSACTIONS_FROM_GOAL")

const getGoalsAction = asyncActionCreator(getGoalsActionType);
const addGoalAction = asyncActionCreator(addGoalActionType);
const getExpenseByGoalAction = asyncActionCreator(getExpenseByGoalActionType);
const getGoalBYIdAction = asyncActionCreator(getGoalByIdActionType);
const updateGoalAction = asyncActionCreator(updateGoalActionType);
const deleteGoalAction = asyncActionCreator(deleteGoalActionType);
const deleteTransactionsFromGoalAction = asyncActionCreator(deleteTransactionsFromGoalActionType)

const getGoals = () => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_GOAL_BY_USER,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getGoalsAction.action(axiosConfig);
};

const addGoal = (
  { goalName, goalDesc, categoryId, goalAmount },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.ADD_GOAL,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      goalName,
      goalDesc,
      categoryId,
      goalAmount,
    },
  };
  return addGoalAction.action(axiosConfig, successCallback, errorCallback);
};

const getExpenseByGoal = (successCallback = null, errorCallback = null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_GET_EXPENSE_BY_GOAL,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getExpenseByGoalAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const getGoalById = ({ id }, successCallback = null, errorCallback = null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.GET_GOAL_BY_ID + `/${id}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getGoalBYIdAction.action(axiosConfig, successCallback, errorCallback);
};

const updateGoal = ({ id, goalName, goalDesc, categoryId, goalAmount },successCallback=null, errorCallback=null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.UPDATE_GOAL + `/${id}`,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return updateGoalAction.action(axiosConfig, successCallback, errorCallback);
};

const deleteGoal=({id},successCallback=null,errorCallback=null)=>{
  const axiosConfig ={
    url:environment.serverUrl+apiPaths.DELETE_GOAL+`/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  }
  return deleteGoalAction.action(axiosConfig, successCallback,errorCallback)
}

const deleteTransactionsFromGoal=({id},successCallback=null,errorCallback=null)=>{
  const axiosConfig ={
    url:environment.serverUrl+apiPaths.DELETE_TRANSACTIONS_FROM_GOAL+`/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  }
  return deleteTransactionsFromGoalAction.action(axiosConfig, successCallback,errorCallback)
}
export {
  getGoalsActionType,
  getGoals,
  addGoalActionType,
  addGoal,
  getExpenseByGoal,
  getExpenseByGoalActionType,
  getGoalById,
  getGoalByIdActionType,
  updateGoal,
  updateGoalActionType,
  deleteGoal,
  deleteGoalActionType,
  deleteTransactionsFromGoal,
  deleteTransactionsFromGoalActionType
};
