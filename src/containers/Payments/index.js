import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Payments from '../../components/Payments/Payments'
import { PageTitle } from '../../theme/layout/core'

function PaymentIndex() {
  return (
    <>
      <Switch>
        <Route path='/payments'>
          <PageTitle>Payments</PageTitle>
          <Payments />
        </Route>
      </Switch>
    </>
  )
}

export default PaymentIndex