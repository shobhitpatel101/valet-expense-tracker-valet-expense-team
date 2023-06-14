import React from "react";
import "../../../Styles/Components/Accounts.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import {
  deleteAccount,
  getAccounts,
} from "../../../Redux/DashBoard/Accounts/AccountsAction";
import AddAccountPopup from "../../Popups/AddAccountPopup";
import ReactIcons from "../../ReactIcons";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { muiOutlinedButtonStyle } from "../../../Styles/MUI/Mui";
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountsContext";
import { getAccountById } from "../../../Redux/DashBoard/Accounts/AccountsAction";
import ConfirmationDialog from "../../MuiComponents/ConfirmationDialog";
import { deleteTranactionsFromAccount } from "../../../Redux/DashBoard/Accounts/AccountsAction";
import { getTransactions } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import { muiContainedButtonStyle } from "../../../Styles/MUI/Mui";
export function getAccountsData(account) {
  if (account && account.accounts) {
    return account.accounts.data;
  }
  return [];
}
function Accounts() {
  const { account } = useSelector((state) => state, shallowEqual) || {};
  const { singleAccount } =
    useSelector(({ account }) => account, shallowEqual) || {};
  const dispatch = useDispatch();
  const { setAccount } = useContext(AccountContext);
  const accountsData = useMemo(() => getAccountsData(account), [account]);

  const [showMore, setShowMore] = useState(
    accountsData && accountsData.length > 3
  );
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({ accountName: "" });
  const [isToBeEdited, setIsToBeEdited] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [accountToBeDeleted, setAccountToBeDeleted] = useState("");
  const handleClose = () => {
    setOpen(false);
    setIsToBeEdited(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddAccountOpen = () => {
    setIsToBeEdited(false);
    handleOpen();
  };
  const handleShowMore = () => {
    setShowMore((prev) => {
      if (prev) {
        setSelectedAccount(
          accountsData && accountsData.length > 0
            ? accountsData[0]
            : { accountName: "" }
        );
      }
      return !prev;
    });
  };
  const handleSelectAccount = (id) => {
    setSelectedAccount(() => {
      const account = accountsData.find((el) => el._id === id);
      setAccount(account);
      return account;
    });
  };
  const handleEditAccount = (id) => {
    setIsToBeEdited(true);
    dispatch(getAccountById({ id }));
  };

  const handleCloseConfirmationPopup = (id) => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteConfirmationOpen = (id) => {
    setDeleteConfirmationOpen(true);
    setAccountToBeDeleted(id);
  };

  const handleGetAccounts = (data) => {
    dispatch(getAccounts());
    handleCloseConfirmationPopup();
  };
  const handleConfirmationOfPopup = (id) => {
    dispatch(deleteAccount({ id: id }, (data)=>{
      dispatch(deleteTranactionsFromAccount({id},(data2)=>{
        dispatch(getTransactions())
      }))
      handleGetAccounts();
    }));
  };
  useEffect(() => {
    if (singleAccount.isFulfilled) {
      handleOpen();
    }
  }, [singleAccount.isFulfilled]);

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  useEffect(() => {
    if (accountsData && accountsData.length > 0) {
      setSelectedAccount(accountsData[0]);
      setAccount(accountsData[0]);
    } else {
      setSelectedAccount({ accountName: "" });
    }
  }, [accountsData]);
  return (
    <div className="accounts-container">
      <div className="accounts-heading-text">
        <h2>ACCOUNTS</h2>
      </div>
      {accountsData && accountsData.length > 0 ? (
        <div className="accounts-selected-text">
          <h4>
            <span>{selectedAccount.accountName}</span>
          </h4>
        </div>
      ) : null}

      {accountsData && accountsData.length > 0 ? (
        <div className="accounts-list-cont">
          <ul
            className={
              !showMore
                ? "account-ulist-unscrollable"
                : "account-ulist-scrollable"
            }
          >
            {accountsData.map((account, index) => {
              return (
                <li
                  key={uuidv4()}
                  className={
                    (!showMore && index < 3) || showMore
                      ? "account-op-det-visible"
                      : "account-op-det-hidden"
                  }
                >
                  <p
                    onClick={() => {
                      handleSelectAccount(account._id);
                    }}
                    className={
                      selectedAccount._id === account._id
                        ? "selected-account-color"
                        : "unselected-account-color"
                    }
                  >
                    {account.accountName}
                  </p>
                  <div>
                    <ReactIcons
                      styles={
                        selectedAccount._id === account._id
                          ? { cursor: "pointer", color: "#33333" }
                          : { cursor: "pointer", color: "#AAAAAA" }
                      }
                    >
                      <MdModeEditOutline
                        onClick={() => {
                          handleEditAccount(account._id);
                        }}
                      />
                    </ReactIcons>
                    <ReactIcons
                      styles={
                        selectedAccount._id === account._id
                          ? { cursor: "pointer", color: "#33333" }
                          : { cursor: "pointer", color: "#AAAAAA" }
                      }
                    >
                      <MdDelete
                        onClick={() => {
                          handleDeleteConfirmationOpen(account._id);
                        }}
                      />
                    </ReactIcons>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="no-accounts-found">
          <p>No Accounts Found</p>
        </div>
      )}

      <div className="show-more-text-cont">
        {accountsData.length && accountsData.length > 3 ? (
          <p>
            <span onClick={handleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </span>
          </p>
        ) : null}
      </div>
      <div className="add-account-btn-cont">
        <Button
          onClick={handleAddAccountOpen}
          style={{ ...muiContainedButtonStyle,color:"#fff" ,width:"8rem"}}
        >
          Add Account
        </Button>
      </div>
      <AddAccountPopup
        isToBeEdited={isToBeEdited}
        open={open}
        handleClose={handleClose}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        handleYes={() => handleConfirmationOfPopup(accountToBeDeleted)}
        description={"Are you sure you want to delete this Account?  All transactions from this account will be vanished"}
        handleClose={handleCloseConfirmationPopup}
      />
    </div>
  );
}

export default Accounts;
