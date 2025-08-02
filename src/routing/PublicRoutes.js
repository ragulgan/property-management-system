import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthPage } from '../containers/auth'

export function PublicRoutes () {
  useEffect(() => {
    localStorage.removeItem('isAuthorized')
  }, [])

  return (
    <Switch>
      <Route path='/' component={AuthPage} />
      <Route path='/forgotPassword' component={AuthPage} />
      <Route path='/registration' component={AuthPage} />
      {/* <Route path='/admin' component={AuthPage} /> */}
    </Switch>
  )
}
