import {
  getGoalsActionType,
  addGoalActionType,
  getExpenseByGoalActionType,
  getGoalByIdActionType,
  updateGoalActionType,
  deleteGoalActionType,
  deleteTransactionsFromGoalActionType
} from "./GoalsAction";
import promiseState from "../../ReduxUtils/ReduxReducerHelper";

const initState = {
  goals: {
    ...promiseState(false, false, false, []),
  },
  addedGoal: {
    ...promiseState(false, false, false, {}),
  },
  expenseByGoal: {
    ...promiseState(false, false, false, []),
  },
  singleGoal: {
    ...promiseState(false, false, false, {}),
  },
  updatedGoal: {
    ...promiseState(false, false, false, {}),
  },
  deletedGoal:{
     ...promiseState(false, false, false, {}),
  },
  deletedTransactions: {
    ...promiseState(false, false, false, []),
  }
};

const GoalsReducer = (state = initState, action) => {
  switch (action.type) {
    case getGoalsActionType.pending:
      return {
        ...state,
        goals: {
          ...promiseState(true, false, false, []),
        },
      };
    case getGoalsActionType.fulfilled:
      const goals =
        action.payload.Status && Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      return {
        ...state,
        goals: {
          ...promiseState(false, true, false, goals),
        },
      };
    case getGoalsActionType.rejected:
      return {
        ...state,
        goals: {
          ...promiseState(false, false, true, []),
        },
      };
    case addGoalActionType.pending:
      return {
        ...state,
        addedGoal: {
          ...promiseState(true, false, false, {}),
        },
      };
    case addGoalActionType.fulfilled:
      const goal = action.payload.Status ? action.payload.data : {};
      return {
        ...state,
        addedGoal: {
          ...promiseState(false, true, false, goal),
        },
      };
    case addGoalActionType.rejected:
      return {
        ...state,
        addedGoal: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getExpenseByGoalActionType.pending:
      return {
        ...state,
        expenseByGoal: {
          ...promiseState(true, false, true, []),
        },
      };
    case getExpenseByGoalActionType.fulfilled:
      return {
        ...state,
        expenseByGoal: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getExpenseByGoalActionType.rejected:
      return {
        ...state,
        expenseByGoal: {
          ...promiseState(false, false, true, []),
        },
      };
    case getGoalByIdActionType.pending:
      return {
        ...state,
        singleGoal: {
          ...promiseState(true, false, true, {}),
        },
      };
    case getGoalByIdActionType.fulfilled:
      return {
        ...state,
        singleGoal: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getGoalByIdActionType.rejected:
      return {
        ...state,
        singleGoal: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updateGoalActionType.pending:
      return {
        ...state,
        updatedGoal: {
          ...promiseState(true, false, true, {}),
        },
      };
    case updateGoalActionType.fulfilled:
      return {
        ...state,
        updatedGoal: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case updateGoalActionType.rejected:
      return {
        ...state,
        updatedGoal: {
          ...promiseState(false, false, true, {}),
        },
      };
      case deleteGoalActionType.pending:
        return {
          ...state,
          deletedGoal: {
            ...promiseState(true, false, true, {}),
          },
        };
      case deleteGoalActionType.fulfilled:
        return {
          ...state,
          deletedGoal: {
            ...promiseState(false, true, false, action.payload.data),
          },
        };
      case deleteGoalActionType.rejected:
        return {
          ...state,
          deletedGoal: {
            ...promiseState(false, false, true, {}),
          },
        };
        case deleteTransactionsFromGoalActionType.pending:
          return {
            ...state,
            deletedTransactions: {
              ...promiseState(true, false, true, []),
            },
          };
        case deleteTransactionsFromGoalActionType.fulfilled:
          return {
            ...state,
            deletedTransactions: {
              ...promiseState(false, true, false, action.payload.data),
            },
          };
        case deleteTransactionsFromGoalActionType.rejected:
          return {
            ...state,
            deletedTransactions: {
              ...promiseState(false, false, true, []),
            },
          };
    default:
      return state;
  }
};

export default GoalsReducer;
