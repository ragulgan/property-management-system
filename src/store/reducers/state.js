import { StateTypes,StateAddTypes,StateGetIdTypes,updateStateActionsTypes,
    StatedeleteActionsTypes} from '../actions'
  
  export const StatelistInitialState = {
    list: null
  }
  
  export const StatelistStoreKeys = 'StatelistStore'
  
  export const StatelistReducers = (state = StatelistInitialState, action) => {
    switch (action.type) {
      case StateTypes.GET_STATE_LIST:
        return { ...state, loading: true }
      case StateTypes.SAVE_STATE_LIST_RESPONSE:
        return { ...state, Statelists: action.data, loading: false }
      case StateTypes.CLEAR_STATE_LIST:
        return { ...state, Statelists: null }
      default:
        return state
    }
  }
  
  export const StateAddInitialState = {
    data: null
  } 
  
  export const StateAddStoreKey = 'StateAddStore'
  
  export const StateAddReducer = (state = StateAddInitialState, action) => {
    switch (action.type) {
      case StateAddTypes.STATE_POST:
        return { ...state, loading: true }
      case StateAddTypes.STATE_POST_RESPONSE:
        return { ...state, StateAdd: action.data, StateStatus:  action.data.status, StateMessage:  action.data.message, loading: false }
      case StateAddTypes.STATE_POST_CLEAR:
        return { ...state, StateAdd: null }
      default:
        return state
    }
  }
  
  export const editStateInitialState = {
    list: null
  }
  
  export const editStateStoreKey = 'editStateStore'
  
  export const editStateReducer = (state = editStateInitialState, action) => {
    switch (action.type) {
      case StateGetIdTypes.GET_STATE_DETAILS:
        return { ...state, loadingEA: true }
      case StateGetIdTypes.STATE_DETAILS_RESPONSE:
        return { ...state, StateIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case StateGetIdTypes.CLEAR_STATE_DETAILS:
        return { ...state, StateIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updateStateInitialState = {
    data: null
  }
  
  export const updateStateStoreKey = 'updateStateStore'
  
  export const updateStateReducer = (state = updateStateInitialState, action) => {
    switch (action.type) {
      case updateStateActionsTypes.UPDATE_STATE:
        return { ...state, loading: true }
      case updateStateActionsTypes.SAVE_UPDATE_STATE_RESPONSE:
        return {
          ...state,
          saveupdateStateResponse: action.data,
          loading: false
        }
      case updateStateActionsTypes.CLEAR_UPDATE_STATE:
        return { ...state, saveupdateStateResponse: null }
      default:
        return state
    }
  }
  
  export const  StatedeleteStoreKey = 'StatedeleteStore'
  
  export const  StatedeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case  StatedeleteActionsTypes.REQUEST:
        return { ...state, loadingStatedelete: true }
      case  StatedeleteActionsTypes.RESPONSE:
        return {
          ...state,
          Statedelete: res,
          statusStatedelete: res.status,
          messageStatedelete: res.message,
          loadingStatedelete: false
        }
      case  StatedeleteActionsTypes.CLEAR:
        return {
          ...state,
          Statedelete: null,
          statusStatedelete: '',
          messageStatedelete: ''
        }
      default:
        return state
    }
  }