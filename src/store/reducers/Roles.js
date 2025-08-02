import {
  RolesTypes, RolesConfigTypes, RolesAddTypes, RolesGetIdTypes, updateRolesActionsTypes,
  RolesdeleteActionsTypes,
} from '../actions'

export const RoleslistInitialState = {
  list: null
}

export const RoleslistStoreKeys = 'RoleslistStore'

export const RoleslistReducers = (state = RoleslistInitialState, action) => {
  switch (action.type) {
    case RolesTypes.GET_ROLE_LIST:
      return { ...state, loading: true }
    case RolesTypes.SAVE_ROLE_LIST_RESPONSE:
      return { ...state, getAllRoles: action.data, loading: false }
    case RolesTypes.CLEAR_ROLE_LIST:
      return { ...state, getAllRoles: null }
    default:
      return state
  }
}

export const RoleslistConfigInitialState = {
  list: null
}

export const RoleslistConfigStoreKeys = 'RoleslistConfigStore'

export const RoleslistConfigReducers = (state = RoleslistConfigInitialState, action) => {
  switch (action.type) {
    case RolesConfigTypes.GET_ROLE_CONFIG_LIST:
      return { ...state, loading: true }
    case RolesConfigTypes.SAVE_ROLE_CONFIG_LIST_RESPONSE:
      return { ...state, getAllConfigRoles: action.data, loading: false }
    case RolesConfigTypes.CLEAR_ROLE_CONFIG_LIST:
      return { ...state, getAllConfigRoles: null }
    default:
      return state
  }
}


export const RolesAddInitialState = {
  data: null
}

export const RolesAddStoreKey = 'RolesAddStore'

export const RolesAddReducer = (state = RolesAddInitialState, action) => {
  switch (action.type) {
    case RolesAddTypes.ROLE_POST:
      return { ...state, loading: true }
    case RolesAddTypes.ROLE_POST_RESPONSE:
      return { ...state, addRole: action.data, loading: false }
    case RolesAddTypes.ROLE_POST_CLEAR:
      return { ...state, addRole: null }
    default:
      return state
  }
}


export const editRolessInitialState = {
  list: null
}

export const editRolessStoreKey = 'editRolessStore'

export const editRolesReducer = (state = editRolessInitialState, action) => {
  switch (action.type) {
    case RolesGetIdTypes.GET_ROLE_DETAILS:
      return { ...state, loadingEA: true }
    case RolesGetIdTypes.ROLE_DETAILS_RESPONSE:
      return { ...state, RolesIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case RolesGetIdTypes.CLEAR_ROLE_DETAILS:
      return { ...state, RolesIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateRolesInitialState = {
  data: null
}

export const updateRolesStoreKey = 'updateRolesStore'

export const updateRolesReducer = (state = updateRolesInitialState, action) => {
  switch (action.type) {
    case updateRolesActionsTypes.UPDATE_ROLE:
      return { ...state, loading: true }
    case updateRolesActionsTypes.SAVE_UPDATE_ROLE_RESPONSE:
      return {
        ...state,
        saveupdateRolesResponse: action.data,
        loading: false
      }
    case updateRolesActionsTypes.CLEAR_UPDATE_ROLE:
      return { ...state, saveupdateRolesResponse: null }
    default:
      return state
  }
}

export const RolesdeleteStoreKey = 'RolesdeleteStore'

export const RolesdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case RolesdeleteActionsTypes.REQUEST:
      return { ...state, loadingRolesdelete: true }
    case RolesdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Rolesdelete: res,
        statusRolesdelete: res.status,
        messageRolesdelete: res.message,
        loadingRolesdelete: false
      }
    case RolesdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Rolesdelete: null,
        statusRolesdelete: '',
        messageRolesdelete: ''
      }
    default:
      return state
  }
}