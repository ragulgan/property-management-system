export const SettingsTypes = {
  GET_SETTING_LIST: 'GET_SETTING_LIST',
  SAVE_SETTING_LIST_RESPONSE: 'SAVE_SETTING_LIST_RESPONSE',
  CLEAR_SETTING_LIST: 'CLEAR_SETTING_LIST'
}

export const SettingsActions = {
  getsettingslist: (params) => ({
    type: SettingsTypes.GET_SETTING_LIST,
    params
  }),
  savesettingslistResponse: (data) => ({
    type: SettingsTypes.SAVE_SETTING_LIST_RESPONSE,
    data
  }),
  clearsettingslist: () => ({
    type: SettingsTypes.CLEAR_SETTING_LIST
  })

}

export const SettingsAddTypes = {
  SETTING_POST: 'SETTING_POST',
  SETTING_POST_RESPONSE: 'SETTING_POST_RESPONSE',
  SETTING_POST_CLEAR: 'SETTING_POST_CLEAR'
}

export const SettingsAddAction = {
  SettingsAdd: (data) => {
    return {
      type: SettingsAddTypes.SETTING_POST,
      payload: data
    }
  },
  saveSettingsResponse: data => ({
    type: SettingsAddTypes.SETTING_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: SettingsAddTypes.SETTING_POST_CLEAR
  })
}

export const SettingsGetIdTypes = {
  GET_SETTING_DETAILS: 'GET_SETTING_DETAILS',
  SETTING_DETAILS_RESPONSE: 'SETTING_DETAILS_RESPONSE',
  CLEAR_SETTING_DETAILS: 'CLEAR_SETTING_DETAILS'
}

export const SettingsGetIdActions = {
  getSettingsIdDetails: (id) => ({
    type: SettingsGetIdTypes.GET_SETTING_DETAILS,
    id
  }),
  saveSettingsIdDetailsResponse: data => ({
    type: SettingsGetIdTypes.SETTING_DETAILS_RESPONSE,
    data
  }),
  clearSettingsIdDetails: () => ({
    type: SettingsGetIdTypes.CLEAR_SETTING_DETAILS
  })
}

export const updateSettingsActionsTypes = {
  UPDATE_SETTING: 'UPDATE_SETTING',
  SAVE_UPDATE_SETTING_RESPONSE: 'SAVE_UPDATE_SETTING_RESPONSE',
  CLEAR_UPDATE_SETTING: 'CLEAR_UPDATE_SETTING'
}

export const updateSettingsActions = {
  updateSettings: (id, params) => {
    return {
      type: updateSettingsActionsTypes.UPDATE_SETTING,
      payload: { id, params }
    }
  },
  saveupdateSettingsResponse: data => ({
    type: updateSettingsActionsTypes.SAVE_UPDATE_SETTING_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateSettings: () => ({
    type: updateSettingsActionsTypes.CLEAR_UPDATE_SETTING
  })
}
export const SettingsdeleteActionsTypes = {
  REQUEST: 'SETTING_DELETE_REQUEST',
  RESPONSE: 'SETTING_DELETE_RESPONSE',
  ERROR: 'SETTING_DELETE_ERROR',
  CLEAR: 'SETTING_DELETE_CLEAR'
}

export const SettingsdeleteActions = {
  delete: (id) => ({
    type: SettingsdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: SettingsdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: SettingsdeleteActionsTypes.CLEAR
  })
}