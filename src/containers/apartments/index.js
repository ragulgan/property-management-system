import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddApartmentsTab from '../../components/apartments/AddApartmentsTab'
import ApartmentType from '../../components/apartments/ApartmentType'
import { PageTitle } from '../../theme/layout/core'
import ApartmentAdminList from '../../components/apartmentAdmin/apartmentAdminList'
import ApartmentAdminAdd from '../../components/apartmentAdmin/newApartmentAdminAdd'
import FlatsList from '../../components/flats/flatsList'
import AddPropertyTab from '../../components/flats/AddFlatTab'
import ApartmentSelection from '../../components/flats/apartmentSelection'
import FlatOwnersList from '../../components/flatOwner/flatOwnerList'
import AddFlatOwnerTab from '../../components/flatOwner/AddFlatOwnerTab'


function ApartmentContainer () {
  return (
    <>
      <Switch>
        <Route exact path='/apartments'>
          <PageTitle>Apartments</PageTitle>
          <ApartmentType />
        </Route>
        <Route exact path='/add-apartments'>
          <AddApartmentsTab />
        </Route>
        <Route exact path='/edit-apartments/:id'>
          <AddApartmentsTab />
        </Route>
        <Route exact path='/apartmentadmin'>
          <ApartmentAdminList />
        </Route>
        <Route exact path='/add-apartmentadmin'>
          <ApartmentAdminAdd />
        </Route>
        <Route exact path='/edit-apartmentadmin/:id'>
          <ApartmentAdminAdd />
        </Route>
        <Route exact path='/flats'>
          <ApartmentSelection />
        </Route>
        <Route exact path='/flatList'>
          <FlatsList />
        </Route>
        <Route exact path='/add-flat'>
          <AddPropertyTab />
        </Route>
        <Route exact path='/edit-flat/:id'>
          <AddPropertyTab />
        </Route>
        <Route exact path='/flatOwnerList'>
          <FlatOwnersList />
        </Route>
        <Route exact path='/add-flatOwner'>
          <AddFlatOwnerTab />
        </Route>
        <Route exact path='/edit-flatOwner/:id'>
          <AddFlatOwnerTab />
        </Route>
      </Switch>
    </>
  )
}

export default ApartmentContainer