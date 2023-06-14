import React from "react";
import "../../../Styles/Components/TransactionBlock.scss";
import TransactionHeader from "./TransactionHeader";
import TransactionOperations from "./TransactionOperations";
import TransactionsList from "./TransactionsList";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTransactions } from "../../../Redux/DashBoard/Transactions/TransactionsAction";
import { useEffect, useState } from "react";
import noDataImg from '../../../assets/noDataImg.avif'
import Skeleton from '@mui/material/Skeleton';
import {v4 as uuidv4} from 'uuid';
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountsContext";
function TransactionBlock() {
  const dispatch = useDispatch();
  const { data ,isPending} =
    useSelector(({ transaction }) => transaction.transactions, shallowEqual) ||
    [];
  const {account} = useContext(AccountContext);
  const [transactionData, setTransactionData] = useState(data || []);
  const [headersValues, setHeadersValues] = useState("All");

  //? adding filters

  const handleFilteredTransactions = (filterBy, filterValue) => {
    setHeadersValues(() => {
      if (filterBy !== "none" && filterValue) return filterValue;
      return "All";
    });
    if (filterBy === "date") {
      setTransactionData((prev) => {
        return data?.filter((el) => {
          return el.accountId?.accountName === account.accountName &&  el.transactionDate === filterValue;
        });
      });
    } else if (filterBy === "month") {
      setTransactionData((prev) => {
        return data?.filter((el) => {
          return el.accountId?.accountName === account.accountName && el.transactionDate.slice(3) === filterValue;
        });
      });
    } else if (filterBy === "year") {
      setTransactionData((prev) => {
        return data?.filter((el) => {
          return el.accountId?.accountName === account.accountName && el.transactionDate.slice(6) === filterValue;
        });
      });
    } else {
      setTransactionData(data.filter((transaction)=>{
        return transaction.accountId?.accountName === account.accountName;
      }));
    }
  };

  const handlePendingTransactions=() => {
    return <div className="transactions-pending-skeleton">
         {new Array(10).fill(0).map((el)=>{
          return <Skeleton  key={uuidv4()} variant="rectangular"  height={60} />
         })}
    </div>
  }
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  useEffect(() => {
    setTransactionData(data.filter((transaction)=>{
      return transaction.accountId?.accountName === account.accountName;
    }));
  }, [data,account]);
  return (
    <div className="transaction-block-container">
      <TransactionHeader headersValues={headersValues} data={transactionData || []} />
      <hr />
      <TransactionOperations
        handleFilteredTransactions={handleFilteredTransactions}
      />
      <hr />
      {transactionData && !isPending && transactionData.length > 0 ?<TransactionsList data={transactionData || []} />:!isPending?<div className="no-data-img-container">
        <img src={noDataImg} alt="NoDataImg" />
        </div>:handlePendingTransactions()}
    </div>
  );
}

export default TransactionBlock;
