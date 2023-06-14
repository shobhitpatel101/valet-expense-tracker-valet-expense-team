import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import "../../../Styles/Components/TransactionDetails.scss";
import ReactIcons from "../../ReactIcons";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import TransactionPopup from "../../Popups/TransactionPopup";
import { getTransaction } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { deleteTransaction } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import ConfirmationDialog from "../../MuiComponents/ConfirmationDialog";
import { getTransactions } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
function TransactionDetails({
  transactionName,
  date,
  transactionAmount,
  transactiontype,
  goal,
  category,
  account,
  id,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteConfirmationOpen,setDeleteConfirmationOpen]=useState(false);
 
  const [openTransactionPopup,setOpenTransactionPopup]=useState(false);
  const [isToBeEdited,setIsToBeEdited]=useState(false);
  
  const handleOpenTransactionPopup = () => {
    setOpenTransactionPopup(true);
  };
  const handleCloseTransactionPopup = () => {
    setOpenTransactionPopup(false);
    setIsToBeEdited(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleGetTransactions = (data) => {
    dispatch(getTransactions());
    handleCloseTransactionPopup()
  };
  const handleEditTransaction = (id) => {
    setIsToBeEdited(true);
    dispatch(getTransaction({ id },handleOpenTransactionPopup));
  };


  const handleCloseConfirmationPopup = (id) => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };
  const handleConfirmationOfPopup = (id) => {
    dispatch(deleteTransaction({ id: id },handleGetTransactions));
  };
  return (
    <li className="transaction-details-list-item">
      <div className="transaction-details-basic-details">
        <div>
          <h3>{goal?.goalName || category?.categoryName}</h3>
          <span className="date-text">
            {date} {`(${account.accountName})`}
          </span>
        </div>
        <div>
          <h3 className="amount-text">
            &#8377; {transactiontype === "Income" ? "+ " : "- "}
            {transactionAmount}
          </h3>
        </div>
        <div>
          {open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )}
        </div>
        <div className="edit-delete-btn-cont">
          <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
            <MdModeEditOutline
              onClick={() => {
                handleEditTransaction(id);
              }}
            />
          </ReactIcons>
          <ReactIcons styles={{ cursor: "pointer", color: "#33333" }}>
            <MdDelete
              onClick={() => {
                handleDeleteConfirmationOpen(id);
              }}
            />
          </ReactIcons>
        </div>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="transaction-details-description">{transactionName}</div>
      </Collapse>
      {openTransactionPopup ? (
        <TransactionPopup
          open={openTransactionPopup}
          isToBeEdited={isToBeEdited}
          handleClose={handleCloseTransactionPopup}
        />
      ) : null}
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        handleYes={() => handleConfirmationOfPopup(id)}
        description={"Are you sure you want to delete this Transaction ?"}
        handleClose={handleCloseConfirmationPopup}
      />
    </li>
  );
}

export default TransactionDetails;
