import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageTitle } from '../../theme/layout/core'



function RoleIndex () {
  return (
    <>

    <Switch>
      <Route path='/role-customer'>
        <PageTitle>Customer</PageTitle>
        {/* <Customer/> */}
      </Route>
      <Route path='/add-customers'>
        <PageTitle>Add customer</PageTitle>
        {/* <Addcustomers/> */}
      </Route>
    </Switch>
    </>
  )
}

export default RoleIndex
