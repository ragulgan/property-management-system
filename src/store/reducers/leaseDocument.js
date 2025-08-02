import { LeaseDocTypes,LeaseDocAddTypes,LeaseDocGetIdTypes,updateLeaseDocActionsTypes,
    LeaseDocdeleteActionsTypes} from '../actions'
  
  export const LeaseDoclistInitialState = {
    list: null
  }
  
  export const LeaseDoclistStoreKeys = 'LeaseDoclistStore'
  
  export const LeaseDoclistReducers = (state = LeaseDoclistInitialState, action) => {
    switch (action.type) {
      case LeaseDocTypes.GET_LEASE_DOC_LIST:
        return { ...state, loading: true }
      case LeaseDocTypes.SAVE_LEASE_DOC_LIST_RESPONSE:
        return { ...state, LeaseDoclists: action.data, loading: false }
      case LeaseDocTypes.CLEAR_LEASE_DOC_LIST:
        return { ...state, LeaseDoclists: null }
      default:
        return state
    }
  }
  
  export const LeaseDocAddInitialState = {
    data: null
  } 
  
  export const LeaseDocAddStoreKey = 'LeaseDocAddStore'
  
  export const LeaseDocAddReducer = (state = LeaseDocAddInitialState, action) => {
    switch (action.type) {
      case LeaseDocAddTypes.LEASE_DOC_POST:
        return { ...state, loading: true }
      case LeaseDocAddTypes.LEASE_POST_DOC_RESPONSE:
        return { ...state, LeaseDocAdd: action.data, loading: false }
      case LeaseDocAddTypes.LEASE_POST_DOC_CLEAR:
        return { ...state, LeaseDocAdd: null }
      default:
        return state
    }
  }
  
  export const editLeasesDocInitialState = {
    list: null
  }
  
  export const editLeasesDocStoreKey = 'editLeasesDocStore'
  
  export const editLeaseDocReducer = (state = editLeasesDocInitialState, action) => {
    switch (action.type) {
      case LeaseDocGetIdTypes.GET_LEASE_DOC_DETAILS:
        return { ...state, loadingEA: true }
      case LeaseDocGetIdTypes.LEASE_DETAILS_DOC_RESPONSE:
        return { ...state, LeaseDocIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case LeaseDocGetIdTypes.CLEAR_LEASE_DOC_DETAILS:
        return { ...state, LeaseDocIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updateLeaseDocInitialState = {
    data: null
  }
  
  export const updateLeaseDocStoreKey = 'updateLeaseDocStore'
  
  export const updateLeaseDocReducer = (state = updateLeaseDocInitialState, action) => {
    switch (action.type) {
      case updateLeaseDocActionsTypes.UPDATE_LEASE_DOC:
        return { ...state, loading: true }
      case updateLeaseDocActionsTypes.SAVE_UPDATE_LEASE_DOC_RESPONSE:
        return {
          ...state,
          saveupdateLeaseDocResponse: action.data,
          loading: false
        }
      case updateLeaseDocActionsTypes.CLEAR_UPDATE_LEASE_DOC:
        return { ...state, saveupdateLeaseDocResponse: null }
      default:
        return state
    }
  }
  
  export const  LeaseDocdeleteStoreKey = 'LeaseDocdeleteStore'
  
  export const  LeaseDocdeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case  LeaseDocdeleteActionsTypes.REQUEST:
        return { ...state, loadingLeasedelete: true }
      case  LeaseDocdeleteActionsTypes.RESPONSE:
        return {
          ...state,
          LeaseDocdelete: res,
          statusLeaseDocdelete: res.status,
          messageLeaseDocdelete: res.message,
          loadingLeaseDocdelete: false
        }
      case  LeaseDocdeleteActionsTypes.CLEAR:
        return {
          ...state,
          LeaseDocdelete: null,
          statusLeaseDocdelete: '',
          messageLeaseDocdelete: ''
        }
      default:
        return state
    }
  }