import {
  propertiesTypes, PropertiesAddTypes, PropertiesGetIdTypes, updatePropertiesActionsTypes,
  PropertiesdeleteActionsTypes
} from '../actions'

export const PropertieslistInitialState = {
  list: null
}

export const PropertieslistStoreKeys = 'PropertieslistStore'

export const PropertieslistReducers = (state = PropertieslistInitialState, action) => {
  switch (action.type) {
    case propertiesTypes.GET_PROPERTY_TYPE_LIST:
      return { ...state, loading: true }
    case propertiesTypes.SAVE_PROPERTY_TYPE_LIST_RESPONSE:
      return { ...state, Propertieslists: action.data, loading: false }
    case propertiesTypes.CLEAR_PROPERTY_TYPE_LIST:
      return { ...state, Propertieslists: null }
    default:
      return state
  }
}

export const PropertiesAddInitialState = {
  data: null
}

export const PropertiesAddStoreKey = 'PropertiesAddStore'

export const PropertiesAddReducer = (state = PropertiesAddInitialState, action) => {
  switch (action.type) {
    case PropertiesAddTypes.PROPERTY_TYPE_POST:
      return { ...state, loading: true }
    case PropertiesAddTypes.PROPERTY_TYPE_POST_RESPONSE:
      return { ...state, PropertiesAdd: action.data, PropertiesStatus: action.data.status, PropertiesMessage: action.data.message, loading: false }
    case PropertiesAddTypes.PROPERTY_TYPE_POST_CLEAR:
      return { ...state, PropertiesAdd: null }
    default:
      return state
  }
}

export const editPerpertiesInitialState = {
  list: null
}

export const editPerpertiesStoreKey = 'editPropertiesStore'

export const editPerpertiesReducer = (state = editPerpertiesInitialState, action) => {
  switch (action.type) {
    case PropertiesGetIdTypes.GET_PROPERTY_TYPE_DETAILS:
      return { ...state, loadingEA: true }
    case PropertiesGetIdTypes.PROPERTY_TYPE_DETAILS_RESPONSE:
      return { ...state, PropertiesIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case PropertiesGetIdTypes.CLEAR_PROPERTY_TYPE_DETAILS:
      return { ...state, PropertiesIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updatePropertiesInitialState = {
  data: null
}

export const updatePropertiesStoreKey = 'updatePropertiesStore'

export const updatePropertiesReducer = (state = updatePropertiesInitialState, action) => {
  switch (action.type) {
    case updatePropertiesActionsTypes.UPDATE_PROPERTY_TYPE:
      return { ...state, loading: true }
    case updatePropertiesActionsTypes.SAVE_UPDATE_PROPERTY_TYPE_RESPONSE:
      return {
        ...state,
        saveupdatePropertiesResponse: action.data,
        loading: false
      }
    case updatePropertiesActionsTypes.CLEAR_UPDATE_PROPERTY_TYPE:
      return { ...state, saveupdatePropertiesResponse: null }
    default:
      return state
  }
}

export const PropertiesdeleteStoreKey = 'PropertiesdeleteStore'

export const PropertiesdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case PropertiesdeleteActionsTypes.REQUEST:
      return { ...state, loadingPropertiesdelete: true }
    case PropertiesdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Propertiesdelete: res,
        statusPropertiesdelete: res.status,
        messagePropertiesdelete: res.message,
        loadingPropertiesdelete: false
      }
    case PropertiesdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Propertiesdelete: null,
        statusPropertiesdelete: '',
        messagePropertiesdelete: ''
      }
    default:
      return state
  }
}