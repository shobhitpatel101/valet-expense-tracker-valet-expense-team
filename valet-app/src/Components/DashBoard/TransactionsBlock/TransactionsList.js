import React from "react";
import "../../../Styles/Components/TransactionsList.scss";
import TransactionDetails from "./TransactionDetails";
import { v4 as uuidv4 } from "uuid";

function TransactionsList({data}) {
  return (
    <div className="transactions-list-container">
      <ul style={{listStyle:"none"}}>
        {data && data.length > 0
          ? data.map((transaction) => {
              return (
                <TransactionDetails
                  key={uuidv4()}
                  transactionName={transaction.transactionName}
                  date={transaction.transactionDate}
                  transactionAmount={transaction.transactionAmount}
                  transactiontype={transaction.transactiontype}
                  category={transaction.categoryId}
                  account={transaction.accountId}
                  goal={transaction.goalId}
                  id={transaction._id}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default TransactionsList;
