import { FlatDocumentTypeListTypes, FlatDocumentTypeAddTypes, FlatDocumentTypeGetIdTypes, updateFlatDocumentTypeActionsTypes, FlatDocumentTypedeleteActionsTypes } from '../actions'

export const FlatDocumentTypelistInitialState = {
  list: null
}

export const FlatDocumentTypelistStoreKeys = 'FlatDocumentTypelistStore'

export const FlatDocumentTypelistReducers = (state = FlatDocumentTypelistInitialState, action) => {
  switch (action.type) {
    case FlatDocumentTypeListTypes.GET_FLATDOCUMENTTYPE_LIST:
      return { ...state, loading: true }
    case FlatDocumentTypeListTypes.SAVE_FLATDOCUMENTTYPE_LIST_RESPONSE:
      return { ...state, getAllFlatDocumentType: action.data, loading: false }
    case FlatDocumentTypeListTypes.CLEAR_FLATDOCUMENTTYPE_LIST:
      return { ...state, getAllFlatDocumentType: null }
    default:
      return state
  }
}

export const FlatDocumentTypeAddInitialState = {
  data: null
}

export const FlatDocumentTypeAddStoreKey = 'FlatDocumentTypeAddStore'

export const FlatDocumentTypeAddReducer = (state = FlatDocumentTypeAddInitialState, action) => {
  switch (action.type) {
    case FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST:
      return { ...state, loading: true }
    case FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST_RESPONSE:
      return { ...state, addFlatDocumentType: action.data, loading: false }
    case FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST_CLEAR:
      return { ...state, addFlatDocumentType: null }
    default:
      return state
  }
}

export const editFlatDocumentTypeInitialState = {
  list: null
}

export const editFlatDocumentTypeStoreKey = 'editFlatDocumentTypeStore'

export const editFlatDocumentTypeReducer = (state = editFlatDocumentTypeInitialState, action) => {
  switch (action.type) {
    case FlatDocumentTypeGetIdTypes.GET_FLATDOCUMENTTYPE_DETAILS:
      return { ...state, loadingEA: true }
    case FlatDocumentTypeGetIdTypes.FLATDOCUMENTTYPE_DETAILS_RESPONSE:
      return { ...state, FlatDocumentTypeIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case FlatDocumentTypeGetIdTypes.CLEAR_FLATDOCUMENTTYPE_DETAILS:
      return { ...state, FlatDocumentTypeIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateFlatDocumentTypeInitialState = {
  data: null
}

export const updateFlatDocumentTypeStoreKey = 'updateFlatDocumentTypeStore'

export const updateFlatDocumentTypeReducer = (state = updateFlatDocumentTypeInitialState, action) => {
  switch (action.type) {
    case updateFlatDocumentTypeActionsTypes.UPDATE_FLATDOCUMENTTYPE:
      return { ...state, loading: true }
    case updateFlatDocumentTypeActionsTypes.SAVE_UPDATE_FLATDOCUMENTTYPE_RESPONSE:
      return {
        ...state,
        updateFlatDocumentTypeResponce: action.data,
        loading: false
      }
    case updateFlatDocumentTypeActionsTypes.CLEAR_UPDATE_FLATDOCUMENTTYPE:
      return { ...state, updateFlatDocumentTypeResponce: null }
    default:
      return state
  }
}

export const FlatDocumentTypedeleteStoreKey = 'FlatDocumentTypedeleteStore'

export const FlatDocumentTypedeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case FlatDocumentTypedeleteActionsTypes.REQUEST:
      return { ...state, loadingFlatDocumentTypedelete: true }
    case FlatDocumentTypedeleteActionsTypes.RESPONSE:
      return {
        ...state,
        FlatDocumentTypedelete: res,
        statusFlatDocumentTypedelete: res.status,
        messageFlatDocumentTypedelete: res.message,
        loadingFlatDocumentTypedelete: false
      }
    case FlatDocumentTypedeleteActionsTypes.CLEAR:
      return {
        ...state,
        FlatDocumentTypedelete: null,
        statusFlatDocumentTypedelete: '',
        messageFlatDocumentTypedelete: ''
      }
    default:
      return state
  }
}
