import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landlords from '../../components/Landlords/Landlords'
import { PageTitle } from '../../theme/layout/core'

function LandLordIndex() {
  return (
    <>
      <Switch>
        <Route path='/land-lords'>
          <PageTitle>Landlords</PageTitle>
          <Landlords />
        </Route>
      </Switch>
    </>
  )
}

export default LandLordIndex