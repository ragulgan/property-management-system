import { FlatDocumentListTypes, FlatDocumentAddTypes, FlatDocumentGetIdTypes, updateFlatDocumentActionsTypes, FlatDocumentdeleteActionsTypes } from '../actions'

export const FlatDocumentlistInitialState = {
  list: null
}

export const FlatDocumentlistStoreKeys = 'FlatDocumentlistStore'

export const FlatDocumentlistReducers = (state = FlatDocumentlistInitialState, action) => {
  switch (action.type) {
    case FlatDocumentListTypes.GET_FLATDOCUMENT_LIST:
      return { ...state, loading: true }
    case FlatDocumentListTypes.SAVE_FLATDOCUMENT_LIST_RESPONSE:
      return { ...state, getAllFlatDocument: action.data, loading: false }
    case FlatDocumentListTypes.CLEAR_FLATDOCUMENT_LIST:
      return { ...state, getAllFlatDocument: null }
    default:
      return state
  }
}

export const FlatDocumentAddInitialState = {
  data: null
}

export const FlatDocumentAddStoreKey = 'FlatDocumentAddStore'

export const FlatDocumentAddReducer = (state = FlatDocumentAddInitialState, action) => {
  switch (action.type) {
    case FlatDocumentAddTypes.FLATDOCUMENT_POST:
      return { ...state, loading: true }
    case FlatDocumentAddTypes.FLATDOCUMENT_POST_RESPONSE:
      return { ...state, addFlatDocument: action.data, loading: false }
    case FlatDocumentAddTypes.FLATDOCUMENT_POST_CLEAR:
      return { ...state, addFlatDocument: null }
    default:
      return state
  }
}

export const editFlatDocumentInitialState = {
  list: null
}

export const editFlatDocumentStoreKey = 'editFlatDocumentStore'

export const editFlatDocumentReducer = (state = editFlatDocumentInitialState, action) => {
  switch (action.type) {
    case FlatDocumentGetIdTypes.GET_FLATDOCUMENT_DETAILS:
      return { ...state, loadingEA: true }
    case FlatDocumentGetIdTypes.FLATDOCUMENT_DETAILS_RESPONSE:
      return { ...state, FlatDocumentIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case FlatDocumentGetIdTypes.CLEAR_FLATDOCUMENT_DETAILS:
      return { ...state, FlatDocumentIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateFlatDocumentInitialState = {
  data: null
}

export const updateFlatDocumentStoreKey = 'updateFlatDocumentStore'

export const updateFlatDocumentReducer = (state = updateFlatDocumentInitialState, action) => {
  switch (action.type) {
    case updateFlatDocumentActionsTypes.UPDATE_FLATDOCUMENT:
      return { ...state, loading: true }
    case updateFlatDocumentActionsTypes.SAVE_UPDATE_FLATDOCUMENT_RESPONSE:
      return {
        ...state,
        updateFlatDocumentResponce: action.data,
        loading: false
      }
    case updateFlatDocumentActionsTypes.CLEAR_UPDATE_FLATDOCUMENT:
      return { ...state, updateFlatDocumentResponce: null }
    default:
      return state
  }
}

export const FlatDocumentdeleteStoreKey = 'FlatDocumentdeleteStore'

export const FlatDocumentdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case FlatDocumentdeleteActionsTypes.REQUEST:
      return { ...state, loadingFlatDocumentdelete: true }
    case FlatDocumentdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        FlatDocumentdelete: res,
        statusFlatDocumentdelete: res.status,
        messageFlatDocumentdelete: res.message,
        loadingFlatDocumentdelete: false
      }
    case FlatDocumentdeleteActionsTypes.CLEAR:
      return {
        ...state,
        FlatDocumentdelete: null,
        statusFlatDocumentdelete: '',
        messageFlatDocumentdelete: ''
      }
    default:
      return state
  }
}
