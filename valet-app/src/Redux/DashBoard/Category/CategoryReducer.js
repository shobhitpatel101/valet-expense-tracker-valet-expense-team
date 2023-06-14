import {
  getCategoriesActionType,
  addCategoryActionType,
  manageBudgetActionType,
  getExpenseByCategoryActionType,
  getCategoryByIdActionType,
  updateCategoryActionType,
  deleteCategoryActionType,
  deleteTransactionsFromCategoryActionType,
} from "./CategoryAction";
import promiseState from "../../ReduxUtils/ReduxReducerHelper";

const initState = {
  categories: {
    ...promiseState(false, false, false, []),
  },
  addedCategory: {
    ...promiseState(false, false, false, {}),
  },
  manageBudget: {
    ...promiseState(false, false, false, {}),
  },
  expenseByCategory: {
    ...promiseState(false, false, false, []),
  },
  singleCategory: {
    ...promiseState(false, false, false, {}),
  },
  updatedCategory: {
    ...promiseState(false, false, false, {}),
  },
  deletedCategory: {
    ...promiseState(false, false, false, {}),
  },
  deletedTransactions: {
    ...promiseState(false, false, false, {}),
  },
};

const CategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case getCategoriesActionType.pending:
      return {
        ...state,
        categories: {
          ...promiseState(true, false, false, []),
        },
      };
    case getCategoriesActionType.fulfilled:
      const categories =
        action.payload.Status && Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      return {
        ...state,
        categories: {
          ...promiseState(false, true, false, categories),
        },
      };
    case getCategoriesActionType.rejected:
      return {
        ...state,
        categories: {
          ...promiseState(false, false, true, []),
        },
      };
    case addCategoryActionType.pending:
      return {
        ...state,
        addedCategory: {
          ...promiseState(true, false, false, {}),
        },
      };
    case addCategoryActionType.fulfilled:
      const category = action.payload.Status ? action.payload.data : {};
      return {
        ...state,
        addedCategory: {
          ...promiseState(false, true, false, category),
        },
      };
    case addCategoryActionType.rejected:
      return {
        ...state,
        addedCategory: {
          ...promiseState(false, false, true, {}),
        },
      };
    case manageBudgetActionType.pending:
      return {
        ...state,
        manageBudget: {
          ...promiseState(true, false, false, {}),
        },
      };
    case manageBudgetActionType.fulfilled:
      return {
        ...state,
        manageBudget: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case manageBudgetActionType.rejected:
      return {
        ...state,
        manageBudget: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getExpenseByCategoryActionType.pending:
      return {
        ...state,
        expenseByCategory: {
          ...promiseState(true, false, true, []),
        },
      };
    case getExpenseByCategoryActionType.fulfilled:
      return {
        ...state,
        expenseByCategory: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getExpenseByCategoryActionType.rejected:
      return {
        ...state,
        expenseByCategory: {
          ...promiseState(false, false, true, []),
        },
      };
    case getCategoryByIdActionType.pending:
      return {
        ...state,
        singleCategory: {
          ...promiseState(true, false, true, {}),
        },
      };
    case getCategoryByIdActionType.fulfilled:
      return {
        ...state,
        singleCategory: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case getCategoryByIdActionType.rejected:
      return {
        ...state,
        singleCategory: {
          ...promiseState(false, false, true, {}),
        },
      };
    case updateCategoryActionType.pending:
      return {
        ...state,
        updatedCategory: {
          ...promiseState(true, false, true, {}),
        },
      };
    case updateCategoryActionType.fulfilled:
      return {
        ...state,
        updatedCategory: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case updateCategoryActionType.rejected:
      return {
        ...state,
        updatedCategory: {
          ...promiseState(false, false, true, {}),
        },
      };
    case deleteCategoryActionType.pending:
      return {
        ...state,
        deletedCategory: {
          ...promiseState(true, false, true, {}),
        },
      };
    case deleteCategoryActionType.fulfilled:
      return {
        ...state,
        deletedCategory: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case deleteCategoryActionType.rejected:
      return {
        ...state,
        deletedCategory: {
          ...promiseState(false, false, true, {}),
        },
      };
    case deleteTransactionsFromCategoryActionType.pending:
      return {
        ...state,
        deletedTransactions: {
          ...promiseState(true, false, true, {}),
        },
      };
    case deleteTransactionsFromCategoryActionType.fulfilled:
      return {
        ...state,
        deletedTransactions: {
          ...promiseState(false, true, false, action.payload.data),
        },
      };
    case deleteTransactionsFromCategoryActionType.rejected:
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

export default CategoryReducer;
