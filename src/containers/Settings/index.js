import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageTitle } from '../../theme/layout/core'
import AddProfileSettingTab from '../../components/Settings/AddProfileSettingTab'
import SettingsRole from '../../components/Settings/Role/Rolelist'

function SettingIndex() {
  return (
    <>
      <Switch>
        <Route path='/settings'>
          <PageTitle>Settings</PageTitle>
          <AddProfileSettingTab />
        </Route>

        <Route path='/role-setting'>
          <AddProfileSettingTab />
        </Route>
      </Switch>
    </>
  )
}

export default SettingIndex