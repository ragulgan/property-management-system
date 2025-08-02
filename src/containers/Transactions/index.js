import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Transactions from '../../components/Transactions/Transactions'
import { PageTitle } from '../../theme/layout/core'

function TransactionIndex() {
  return (
    <>
      <Switch>
        <Route path='/transaction'>
          <PageTitle>Transactions</PageTitle>
          <Transactions />
        </Route>
      </Switch>
    </>
  )
}

export default TransactionIndex