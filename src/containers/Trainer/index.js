import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserList from '../../components/user/UserList'
import UserAdd from '../../components/user/UserAdd'
import { PageTitle } from '../../theme/layout/core'

function StaffIndex() {
  return (
    <>
      <Switch>
        <Route path='/users-management'>
          <PageTitle>User</PageTitle>
          <UserList />
        </Route>
        <Route path='/add-user'>
          <UserAdd />
        </Route>
        <Route path='/edit-user/:id'>
          <UserAdd />
        </Route>
      </Switch>
    </>
  )
}

export default StaffIndex
