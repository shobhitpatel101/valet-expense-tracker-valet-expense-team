import {
  asyncActionCreator,
  asyncActionTypeCreator,
} from "../../ReduxUtils/ReduxActionHelper";
import apiPaths from "../../../Utils/ApiPaths";
import { environment } from "../../../Environments/environment";

const getCategoriesActionType = asyncActionTypeCreator("GET_CATEGORIES");
const addCategoryActionType = asyncActionTypeCreator("ADD_CATEGORY");
const manageBudgetActionType = asyncActionTypeCreator("MANAGE_BUDGET");
const getExpenseByCategoryActionType = asyncActionTypeCreator(
  "GET_EXPENSE_BY_CATEGORY"
);
const getCategoryByIdActionType = asyncActionTypeCreator("GET_CATEGORY_BY_ID");
const updateCategoryActionType = asyncActionTypeCreator("UPDATE_CATEGORY");
const deleteCategoryActionType = asyncActionTypeCreator("DELETE_CATEGORY");
const deleteTransactionsFromCategoryActionType = asyncActionTypeCreator(
  "DELETE_TRANSACTIONS_FROM_CATEGORY"
);

const getCategoriesAction = asyncActionCreator(getCategoriesActionType);
const addCategoryAction = asyncActionCreator(addCategoryActionType);
const manageBudgetAction = asyncActionCreator(manageBudgetActionType);
const getExpenseByCategoryAction = asyncActionCreator(
  getExpenseByCategoryActionType
);
const getCategoryByIdAction = asyncActionCreator(getCategoryByIdActionType);
const updateCategoryAction = asyncActionCreator(updateCategoryActionType);
const deleteCategoryAction = asyncActionCreator(deleteCategoryActionType);
const deleteTransactionsFromCategoryAction = asyncActionCreator(
  deleteTransactionsFromCategoryActionType
);

const getCategories = () => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_CATEGORY_BY_USER,
    method: "GET",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getCategoriesAction.action(axiosConfig);
};

const addCategory = (
  { categoryName, categoryType, categoryBudget },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.ADD_CATEGORY,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      categoryName,
      categoryType,
      categoryBudget,
    },
  };
  return addCategoryAction.action(axiosConfig, successCallback, errorCallback);
};

const manageBudget = (
  { categoryId, categoryBudget },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.MANGE_BUDGET,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      categoryBudget,
      categoryId,
    },
  };
  return manageBudgetAction.action(axiosConfig, successCallback, errorCallback);
};

const getExpenseByCategory = (successCallback = null, errorCallback = null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_GET_EXPENSE_BY_CATEGORY,
    method: "GET",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getExpenseByCategoryAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const getCategoryById = (
  { id },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.GET_CATEGORY_BY_ID + `/${id}`,
    method: "GET",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getCategoryByIdAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

const updateCategory = (
  { id, categoryName, categoryType, categoryBudget },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.UPDATE_CATEGORY + `/${id}`,
    method: "PUT",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      categoryBudget,
      categoryName,
      categoryType,
    },
  };
  return updateCategoryAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};
const deleteCategory = (
  { id },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.DELETE_CATEGORY + `/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return deleteCategoryAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};
const deleteTransactionsFromCategory = (
  { id },
  successCallback = null,
  errorCallback = null
) => {
  const axiosConfig = {
    url:
      environment.serverUrl +
      apiPaths.DELETE_TRANSACTIONS_FROM_CATEGORY +
      `/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return deleteTransactionsFromCategoryAction.action(
    axiosConfig,
    successCallback,
    errorCallback
  );
};

export {
  getCategoriesActionType,
  getCategories,
  addCategoryActionType,
  addCategory,
  manageBudgetActionType,
  manageBudget,
  getExpenseByCategory,
  getExpenseByCategoryActionType,
  updateCategory,
  updateCategoryActionType,
  getCategoryById,
  getCategoryByIdActionType,
  deleteCategory,
  deleteCategoryActionType,
  deleteTransactionsFromCategory,
  deleteTransactionsFromCategoryActionType,
};
