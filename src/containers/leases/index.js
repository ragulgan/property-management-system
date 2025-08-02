import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddLeasesTab from '../../components/leases/AddLeasesTab'
import Leases from '../../components/leases/Leases'
import { PageTitle } from '../../theme/layout/core'

function LeasesList () {
  return (
    <>
      <Switch>
        <Route path='/leases'>
          <PageTitle>Leases</PageTitle>
          <Leases />
        </Route>
        <Route path='/add-leases'>
          <AddLeasesTab />
        </Route>
        <Route path='/edit-leases/:id'>
          <AddLeasesTab />
        </Route>
      </Switch>
    </>
  )
}

export default LeasesList