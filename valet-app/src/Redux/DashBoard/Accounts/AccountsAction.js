import {
  asyncActionCreator,
  asyncActionTypeCreator,
} from "../../ReduxUtils/ReduxActionHelper";
import apiPaths from "../../../Utils/ApiPaths";
import { environment } from "../../../Environments/environment";

const getAccountsActionType = asyncActionTypeCreator("GET_ACCOUNTS");
const addAccountActionType = asyncActionTypeCreator("ADD_ACCOUNT");
const getAccountByIdActionType = asyncActionTypeCreator("GET_ACCOUNT_BY_ID");
const updateAccountActionType = asyncActionTypeCreator("UPDATE_ACCOUNT");
const deleteAccountActionType = asyncActionTypeCreator("DELETE_ACCOUNT")
const deleteTransactionsFromAccountActionType = asyncActionTypeCreator("DELETE_TRANSACTIONS_FROM_ACCOUNT")

const getAccountsAction = asyncActionCreator(getAccountsActionType);
const addAccountAction = asyncActionCreator(addAccountActionType);
const getAccountByIdAction = asyncActionCreator(getAccountByIdActionType);
const updateAccountAction = asyncActionCreator(updateAccountActionType);
const deleteAccountAction = asyncActionCreator(deleteAccountActionType);
const deleteTransactionsFromAccountAction = asyncActionCreator(deleteTransactionsFromAccountActionType)

const getAccounts = () => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.FETCH_ACCOUNT_BY_USER,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getAccountsAction.action(axiosConfig);
};

const addAccount = ({ accountName, accountDesc },successCallback=null,errorCallback=null) => {
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.ADD_ACCOUNT,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data: {
      accountName: accountName,
      accountDesc: accountDesc,
    },
  };
  return addAccountAction.action(axiosConfig,successCallback,errorCallback);
};

const getAccountById=({id},successCallback=null,errorCallback=null)=>{
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.GET_ACCOUNT_BY_ID +`/${id}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  };
  return getAccountByIdAction.action(axiosConfig,successCallback,errorCallback);
};

const updateAccount = ({id,accountName,accountDesc},successCallback,errorCallback) =>{
  const axiosConfig = {
    url: environment.serverUrl + apiPaths.UPDATE_ACCOUNT +`/${id}`,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
    data:{
      accountName,
      accountDesc
    }
  };
  return updateAccountAction.action(axiosConfig,successCallback,errorCallback);
}

const deleteAccount=({id},successCallback=null,errorCallback=null)=>{
  const axiosConfig ={
    url:environment.serverUrl+apiPaths.DELETE_ACCOUNT+`/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  }
  return deleteAccountAction.action(axiosConfig, successCallback,errorCallback)
}

const deleteTranactionsFromAccount=({id},successCallback=null,errorCallback=null)=>{
  const axiosConfig ={
    url:environment.serverUrl+apiPaths.DELETE_TRANSACTIONS_FROM_ACCOUNT+`/${id}`,
    method: "DELETE",

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      requireCreds: true,
    },
  }
  return deleteTransactionsFromAccountAction.action(axiosConfig, successCallback,errorCallback)
}
export { getAccountsActionType, getAccounts, addAccountActionType, addAccount,getAccountById,getAccountByIdActionType,updateAccount,updateAccountActionType ,deleteAccount,deleteAccountActionType,deleteTranactionsFromAccount,deleteTransactionsFromAccountActionType};
