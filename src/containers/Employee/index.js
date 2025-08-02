import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageTitle } from '../../theme/layout/core'
// import Customer from '../../components/Customer/Customer'
// import Addcustomers from '../../components/Customer/Addcustomer'


function Homes () {
  return (
    <>

    <Switch>
      <Route path='role-employee'>
        <PageTitle>Customer</PageTitle>
        {/* <Customer/> */}
      </Route>
      
    </Switch>
    </>
  )
}

export default Homes
