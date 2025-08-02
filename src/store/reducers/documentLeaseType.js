import {
  LeaseDocumentTypes, LeaseDocumentAddTypes, LeaseDocumentGetIdTypes, updateLeaseDocumentActionsTypes,
  LeaseDocumentdeleteActionsTypes,
} from '../actions'

export const LeaseDocumentlistInitialState = {
  list: null
}

export const LeaseDocumentlistStoreKeys = 'LeaseDocumentlistStore'

export const LeaseDocumentlistReducers = (state = LeaseDocumentlistInitialState, action) => {
  switch (action.type) {
    case LeaseDocumentTypes.GET_DOCUMENT_LEASE_TYPE_LIST:
      return { ...state, loading: true }
    case LeaseDocumentTypes.SAVE_DOCUMENT_LEASE_TYPE_LIST_RESPONSE:
      return { ...state, getAllLease: action.data, loading: false }
    case LeaseDocumentTypes.CLEAR_DOCUMENT_LEASE_TYPE_LIST:
      return { ...state, getAllLease: null }
    default:
      return state
  }
}


export const LeaseDocumentAddInitialState = {
  data: null
}

export const LeaseDocumentAddStoreKey = 'LeaseDocumentAddStore'

export const LeaseDocumentAddReducer = (state = LeaseDocumentAddInitialState, action) => {
  switch (action.type) {
    case LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST:
      return { ...state, loading: true }
    case LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST_RESPONSE:
      return { ...state, addLeaseDocument: action.data, loading: false }
    case LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST_CLEAR:
      return { ...state, addLeaseDocument: null }
    default:
      return state
  }
}


export const editLeaseDocumentsInitialState = {
  list: null
}

export const editLeaseDocumentsStoreKey = 'editLeaseDocumentsStore'

export const editLeaseDocumentReducer = (state = editLeaseDocumentsInitialState, action) => {
  switch (action.type) {
    case LeaseDocumentGetIdTypes.GET_DOCUMENT_LEASE_TYPE_DETAILS:
      return { ...state, loadingEA: true }
    case LeaseDocumentGetIdTypes.DOCUMENT_LEASE_TYPE_DETAILS_RESPONSE:
      return { ...state, LeaseDocumentIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case LeaseDocumentGetIdTypes.CLEAR_DOCUMENT_LEASE_TYPE_DETAILS:
      return { ...state, LeaseDocumentIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateLeaseDocumentInitialState = {
  data: null
}

export const updateLeaseDocumentStoreKey = 'updateLeaseDocumentStore'

export const updateLeaseDocumentReducer = (state = updateLeaseDocumentInitialState, action) => {
  switch (action.type) {
    case updateLeaseDocumentActionsTypes.UPDATE_DOCUMENT_LEASE_TYPE:
      return { ...state, loading: true }
    case updateLeaseDocumentActionsTypes.SAVE_UPDATE_DOCUMENT_LEASE_TYPE_RESPONSE:
      return {
        ...state,
        saveupdateLeaseDocumentResponse: action.data,
        loading: false
      }
    case updateLeaseDocumentActionsTypes.CLEAR_UPDATE_DOCUMENT_LEASE_TYPE:
      return { ...state, saveupdateLeaseDocumentResponse: null }
    default:
      return state
  }
}

export const LeaseDocumentdeleteStoreKey = 'LeaseDocumentdeleteStore'

export const LeaseDocumentdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case LeaseDocumentdeleteActionsTypes.REQUEST:
      return { ...state, loadingLeaseDocumentdelete: true }
    case LeaseDocumentdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        LeaseDocumentdelete: res,
        statusLeaseDocumentdelete: res.status,
        messageLeaseDocumentdelete: res.message,
        loadingLeaseDocumentdelete: false
      }
    case LeaseDocumentdeleteActionsTypes.CLEAR:
      return {
        ...state,
        LeaseDocumentdelete: null,
        statusLeaseDocumentdelete: '',
        messageLeaseDocumentdelete: ''
      }
    default:
      return state
  }
}