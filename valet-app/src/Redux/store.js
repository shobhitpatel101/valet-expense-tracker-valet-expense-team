import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import LoginReducer from "./Auth/AuthReducer";
import AccountReducer from "./DashBoard/Accounts/AccountsReducer";
import GoalsReducer from "./DashBoard/Goals/GoalsReducer";
import CategoryReducer from "./DashBoard/Category/CategoryReducer";
import TransactionReducer from "./DashBoard/Transactions/TransactionsReducer";
const rootReducer = combineReducers({
    auth:LoginReducer,
    account:AccountReducer,
    goal:GoalsReducer,
    category:CategoryReducer,
    transaction:TransactionReducer
});

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);