import {
  LeaseTypes, LeaseAddTypes, LeaseGetIdTypes, updateLeaseActionsTypes,
  LeasedeleteActionsTypes,
} from '../actions'

export const LeaselistInitialState = {
  list: null
}

export const LeaselistStoreKeys = 'LeaselistStore'

export const LeaselistReducers = (state = LeaselistInitialState, action) => {
  switch (action.type) {
    case LeaseTypes.GET_LEASE_TYPE_LIST:
      return { ...state, loading: true }
    case LeaseTypes.SAVE_LEASE_TYPE_LIST_RESPONSE:
      return { ...state, getAllLease: action.data, loading: false }
    case LeaseTypes.CLEAR_LEASE_TYPE_LIST:
      return { ...state, getAllLease: null }
    default:
      return state
  }
}


export const LeaseAddInitialState = {
  data: null
}

export const LeaseAddStoreKey = 'LeaseAddStore'

export const LeaseAddReducer = (state = LeaseAddInitialState, action) => {
  switch (action.type) {
    case LeaseAddTypes.LEASE_TYPE_POST:
      return { ...state, loading: true }
    case LeaseAddTypes.LEASE_TYPE_POST_RESPONSE:
      return { ...state, addLease: action.data, loading: false }
    case LeaseAddTypes.LEASE_TYPE_POST_CLEAR:
      return { ...state, addLease: null }
    default:
      return state
  }
}


export const editLeasesInitialState = {
  list: null
}

export const editLeasesStoreKey = 'editLeaseTypeStore'

export const editLeaseReducer = (state = editLeasesInitialState, action) => {
  switch (action.type) {
    case LeaseGetIdTypes.GET_LEASE_TYPE_DETAILS:
      return { ...state, loadingEA: true }
    case LeaseGetIdTypes.LEASE_TYPE_DETAILS_RESPONSE:
      return { ...state, LeaseIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case LeaseGetIdTypes.CLEAR_LEASE_TYPE_DETAILS:
      return { ...state, LeaseIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateLeaseInitialState = {
  data: null
}

export const updateLeaseStoreKey = 'updateLeaseStore'

export const updateLeaseReducer = (state = updateLeaseInitialState, action) => {
  switch (action.type) {
    case updateLeaseActionsTypes.UPDATE_LEASE_TYPE:
      return { ...state, loading: true }
    case updateLeaseActionsTypes.SAVE_UPDATE_LEASE_TYPE_RESPONSE:
      return {
        ...state,
        saveupdateLeaseResponse: action.data,
        loading: false
      }
    case updateLeaseActionsTypes.CLEAR_UPDATE_LEASE_TYPE:
      return { ...state, saveupdateLeaseResponse: null }
    default:
      return state
  }
}

export const LeasedeleteStoreKey = 'LeasedeleteStore'

export const LeasedeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case LeasedeleteActionsTypes.REQUEST:
      return { ...state, loadingLeasedelete: true }
    case LeasedeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Leasedelete: res,
        statusLeasedelete: res.status,
        messageLeasedelete: res.message,
        loadingLeasedelete: false
      }
    case LeasedeleteActionsTypes.CLEAR:
      return {
        ...state,
        Leasedelete: null,
        statusLeasedelete: '',
        messageLeasedelete: ''
      }
    default:
      return state
  }
}