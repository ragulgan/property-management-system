import {
  RequestListTypes, RequestListAddTypes, RequestListGetIdTypes, updateRequestListActionsTypes,
  RequestListdeleteActionsTypes
} from '../actions'

export const RequestListlistInitialState = {
  list: null
}

export const RequestListlistStoreKeys = 'RequestListlistStore'

export const RequestListlistReducers = (state = RequestListlistInitialState, action) => {
  switch (action.type) {
    case RequestListTypes.GET_REQUESTLIST_LIST:
      return { ...state, loading: true }
    case RequestListTypes.SAVE_REQUESTLIST_LIST_RESPONSE:
      return { ...state, getAllRequestList: action.data, loading: false }
    case RequestListTypes.CLEAR_REQUESTLIST_LIST:
      return { ...state, getAllRequestList: null }
    default:
      return state
  }
}

export const RequestListAddInitialState = {
  data: null
}

export const RequestListAddStoreKey = 'RequestListAddStore'

export const RequestListAddReducer = (state = RequestListAddInitialState, action) => {
  switch (action.type) {
    case RequestListAddTypes.REQUESTLIST_POST:
      return { ...state, loading: true }
    case RequestListAddTypes.REQUESTLIST_POST_RESPONSE:
      return { ...state, RequestListAdd: action.data, RequestListStatus: action.data.status, RequestListMessage: action.data.message, loading: false }
    case RequestListAddTypes.REQUESTLIST_POST_CLEAR:
      return { ...state, RequestListAdd: null }
    default:
      return state
  }
}

export const editRequestListsInitialState = {
  list: null
}

export const editRequestListsStoreKey = 'editRequestListStore'

export const editRequestListReducer = (state = editRequestListsInitialState, action) => {
  switch (action.type) {
    case RequestListGetIdTypes.GET_REQUESTLIST_DETAILS:
      return { ...state, loadingEA: true }
    case RequestListGetIdTypes.REQUESTLIST_DETAILS_RESPONSE:
      return { ...state, RequestListIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case RequestListGetIdTypes.CLEAR_REQUESTLIST_DETAILS:
      return { ...state, RequestListIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateRequestListInitialState = {
  data: null
}

export const updateRequestListStoreKey = 'updateRequestListStore'

export const updateRequestListReducer = (state = updateRequestListInitialState, action) => {
  switch (action.type) {
    case updateRequestListActionsTypes.UPDATE_REQUESTLIST:
      return { ...state, loading: true }
    case updateRequestListActionsTypes.SAVE_UPDATE_REQUESTLIST_RESPONSE:
      return {
        ...state,
        saveupdateRequestListResponse: action.data,
        loading: false
      }
    case updateRequestListActionsTypes.CLEAR_UPDATE_REQUESTLIST:
      return { ...state, saveupdateRequestListResponse: null }
    default:
      return state
  }
}

export const RequestListdeleteStoreKey = 'RequestListdeleteStore'

export const RequestListdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case RequestListdeleteActionsTypes.REQUEST:
      return { ...state, loadingRequestListdelete: true }
    case RequestListdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        RequestListdelete: res,
        statusRequestListdelete: res.status,
        messageRequestListdelete: res.message,
        loadingRequestListdelete: false
      }
    case RequestListdeleteActionsTypes.CLEAR:
      return {
        ...state,
        RequestListdelete: null,
        statusRequestListdelete: '',
        messageRequestListdelete: ''
      }
    default:
      return state
  }
}