import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../../components/dashboard/Dashboard'
import { PageTitle } from '../../theme/layout/core'
import ApartmentAdminHome from '../../components/dashboard/ApartmentAdminHome'

function DashboardIndex() {
  return (
    <>
      <Switch>
        <Route exact path='/dashboard'>
          <PageTitle>Dashboard</PageTitle>
          <Dashboard />
        </Route>
        <Route exact path='/apartmentHome'>
          <ApartmentAdminHome />
        </Route>
      </Switch>
    </>
  )
}

export default DashboardIndex