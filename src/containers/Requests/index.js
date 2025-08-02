import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RequestList from '../../components/Request/RequestList'
import { PageTitle } from '../../theme/layout/core'

function RequestIndex() {
  return (
    <>
      <Switch>
        <Route path='/request'>
          <PageTitle>Request</PageTitle>
          <RequestList />
        </Route>
      </Switch>
    </>
  )
}

export default RequestIndex