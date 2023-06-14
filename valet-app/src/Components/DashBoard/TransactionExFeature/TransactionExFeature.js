import React from 'react'
import TransactionBlock from '../TransactionsBlock/TransactionBlock';
import '../../../Styles/Components/TransactionExFeature.scss';
import { ShowAppBar } from '../../Context/ShowappbarContext';
import { useContext } from 'react';
function TransactionExFeature() {
  const {show}=useContext(ShowAppBar);
  return (
    <div className={show.show?"mini-transaction-ex-feature-cont transaction-ex-feature-cont":"max-transaction-ex-feature-cont transaction-ex-feature-cont"}>
        <TransactionBlock/>
    </div>
  )
}

export default TransactionExFeature