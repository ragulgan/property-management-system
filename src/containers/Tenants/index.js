import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TenantList from '../../components/Tenant/TenantList'
import AddLesseeDetail from '../../components/Tenant/TenantAdd'
import { PageTitle } from '../../theme/layout/core'

function TenantIndex() {
  return (
    <>
      <Switch>
        <Route path='/Tenants'>
          <PageTitle>Tenant</PageTitle>
          <TenantList />
        </Route>
        <Route path='/add-tenants'>
          <AddLesseeDetail />
        </Route>
        <Route path='/edit-tenants/:id'>
          <AddLesseeDetail />
        </Route>
      </Switch>
    </>
  )
}

export default TenantIndex    