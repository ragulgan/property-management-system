import {
  getPropertyListTypes,
  postPropertyTypes,
  getPropertytDetialsTypes,
  updatePropertytActionsTypes,
  deletePropertytActionsTypes,
} from '../actions'

export const getPropertylistStoreKeys = 'getPropertylistStore'

export const getPropertyListReducers = (state = {}, action) => {
  switch (action.type) {
    case getPropertyListTypes.REQUEST:
      return { ...state, loading: true }
    case getPropertyListTypes.RESPONSE:
      return { ...state, getAllProperty: action.data, loading: false }
    case getPropertyListTypes.CLEAR:
      return { ...state, getAllProperty: null }
    default:
      return state
  }
}

export const postPropertyInitialState = {
  data: null
}

export const postPropertyStoreKey = 'postPropertyStore'

export const postPropertyReducer = (state = postPropertyInitialState, action) => {
  switch (action.type) {
    case postPropertyTypes.REQUEST:
      return { ...state, loading: true }
    case postPropertyTypes.RESPONSE:
      return { ...state, addProperty: action.data, loading: false }
    case postPropertyTypes.CLEAR:
      return { ...state, addProperty: null }
    default:
      return state
  }
}

export const getProprtDetialsInitialState = {
  list: null
}

export const getProprtDetialsStoreKey = 'getProprtDetialsStore'

export const getProprtDetialsReducer = (state = getProprtDetialsInitialState, action) => {
  switch (action.type) {
    case getPropertytDetialsTypes.REQUEST:
      return { ...state, loadingEA: true }
    case getPropertytDetialsTypes.RESPONSE:
      return { ...state, getProprtDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case getPropertytDetialsTypes.CLEAR:
      return { ...state, getProprtDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updatePropertyInitialState = {
  data: null
}

export const updatePropertyManagementStoreKey = 'updatePropertyStore'

export const updatePropertyManagementReducer = (state = updatePropertyInitialState, action) => {
  switch (action.type) {
    case updatePropertytActionsTypes.REQUEST:
      return { ...state, loading: true }
    case updatePropertytActionsTypes.RESPONSE:
      return {
        ...state,
        updtedResponse: action.data,
        loading: false
      }
    case updatePropertytActionsTypes.CLEAR:
      return { ...state, updtedResponse: null }
    default:
      return state
  }
}

export const deletePropertyStoreKey = 'deletePropertyStore'

export const deletePropertyReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case deletePropertytActionsTypes.REQUEST:
      return { ...state, loadingDelete: true }
    case deletePropertytActionsTypes.RESPONSE:
      return {
        ...state,
        deleteProperty: res,
        statusdelete: res.status,
        messageDelete: res.message,
        loadingDelete: false
      }
    case deletePropertytActionsTypes.CLEAR:
      return {
        ...state,
        deleteProperty: null,
        statusdelete: '',
        messageDelete: ''
      }
    default:
      return state
  }
}