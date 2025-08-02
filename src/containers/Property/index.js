import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddPropertyTab from '../../components/Property/AddPropertyTab'
import Property from '../../components/Property/PropertyList'
import { PageTitle } from '../../theme/layout/core'
import PropertyDetails from '../../components/Property/PropertyDetails'

function PropertyIndex() {
  return (
    <>
      <Switch>
        <Route exact path='/properties'>
          <PageTitle>Property</PageTitle>
          <Property />
        </Route>
        <Route exact path='/properties/details/:id'>
          <PageTitle>Property Details</PageTitle>
          <PropertyDetails />
        </Route>
        <Route exact path='/add-property'>
          <AddPropertyTab />
        </Route>
        <Route exact path='/edit-property/:id'>
          <AddPropertyTab />
        </Route>
      </Switch>
    </>
  )
}

export default PropertyIndex