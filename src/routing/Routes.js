/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
import React, {useEffect} from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { MasterLayout } from '../theme/layout/MasterLayout'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { MasterInit } from '../theme/layout/MasterInit'
import { PageTitle } from '../theme/layout/core'
import { SESSION } from '../utils/constants'
import { getLocalStorage } from '../utils/helper'
import { RequestForToken } from '../../src/components/FCMToken/FCM'


const Routes = () => {
  const isAuthorized = getLocalStorage(SESSION.TOKEN)
  const pathName = useLocation().pathname
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const paramField = query.get('bank_id')

  useEffect(()=> {
    RequestForToken()
  },[])

  return (
    <>
      <Switch>
        {isAuthorized
          ? (
            <>
              <MasterLayout>
                <PrivateRoutes />
              </MasterLayout>
            </>
          )
          : (
            <>
              <PublicRoutes />
            </>
          )}
      </Switch>
      <MasterInit />
    </>
  )
}

export { Routes }
