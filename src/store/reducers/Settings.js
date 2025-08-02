import {
  SettingsTypes, SettingsAddTypes, SettingsGetIdTypes, updateSettingsActionsTypes,
  SettingsdeleteActionsTypes,
} from '../actions'

export const SettingslistInitialState = {
  list: null
}

export const SettingslistStoreKeys = 'SettingslistStore'

export const SettingslistReducers = (state = SettingslistInitialState, action) => {
  switch (action.type) {
    case SettingsTypes.GET_SETTING_LIST:
      return { ...state, loading: true }
    case SettingsTypes.SAVE_SETTING_LIST_RESPONSE:
      return { ...state, getAllSettings: action.data, loading: false }
    case SettingsTypes.CLEAR_SETTING_LIST:
      return { ...state, getAllSettings: null }
    default:
      return state
  }
}


export const SettingsAddInitialState = {
  data: null
}

export const SettingsAddStoreKey = 'SettingsAddStore'

export const SettingsAddReducer = (state = SettingsAddInitialState, action) => {
  switch (action.type) {
    case SettingsAddTypes.SETTING_POST:
      return { ...state, loading: true }
    case SettingsAddTypes.SETTING_POST_RESPONSE:
      return { ...state, addLandLord: action.data, loading: false }
    case SettingsAddTypes.SETTING_POST_CLEAR:
      return { ...state, addLandLord: null }
    default:
      return state
  }
}


export const editSettingssInitialState = {
  list: null
}

export const editSettingssStoreKey = 'editSettingssStore'

export const editSettingsReducer = (state = editSettingssInitialState, action) => {
  switch (action.type) {
    case SettingsGetIdTypes.GET_SETTING_DETAILS:
      return { ...state, loadingEA: true }
    case SettingsGetIdTypes.SETTING_DETAILS_RESPONSE:
      return { ...state, SettingsIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case SettingsGetIdTypes.CLEAR_SETTING_DETAILS:
      return { ...state, SettingsIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateSettingsInitialState = {
  data: null
}

export const updateSettingsStoreKey = 'updateSettingsStore'

export const updateSettingsReducer = (state = updateSettingsInitialState, action) => {
  switch (action.type) {
    case updateSettingsActionsTypes.UPDATE_SETTING:
      return { ...state, loading: true }
    case updateSettingsActionsTypes.SAVE_UPDATE_SETTING_RESPONSE:
      return {
        ...state,
        saveupdateSettingsResponse: action.data,
        loading: false
      }
    case updateSettingsActionsTypes.CLEAR_UPDATE_SETTING:
      return { ...state, saveupdateSettingsResponse: null }
    default:
      return state
  }
}

export const SettingsdeleteStoreKey = 'SettingsdeleteStore'

export const SettingsdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case SettingsdeleteActionsTypes.REQUEST:
      return { ...state, loadingSettingsdelete: true }
    case SettingsdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Settingsdelete: res,
        statusSettingsdelete: res.status,
        messageSettingsdelete: res.message,
        loadingSettingsdelete: false
      }
    case SettingsdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Settingsdelete: null,
        statusSettingsdelete: '',
        messageSettingsdelete: ''
      }
    default:
      return state
  }
}