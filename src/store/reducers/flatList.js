import { FlatListTypes, FlatAddTypes, FlatGetIdTypes, updateFlatActionsTypes, FlatdeleteActionsTypes } from '../actions'

export const FlatlistInitialState = {
  list: null
}

export const FlatlistStoreKeys = 'FlatlistStore'

export const FlatlistReducers = (state = FlatlistInitialState, action) => {
  switch (action.type) {
    case FlatListTypes.GET_FLAT_LIST:
      return { ...state, loading: true }
    case FlatListTypes.SAVE_FLAT_LIST_RESPONSE:
      return { ...state, getAllFlat: action.data, loading: false }
    case FlatListTypes.CLEAR_FLAT_LIST:
      return { ...state, getAllFlat: null }
    default:
      return state
  }
}

export const FlatAddInitialState = {
  data: null
}

export const FlatAddStoreKey = 'FlatAddStore'

export const FlatAddReducer = (state = FlatAddInitialState, action) => {
  switch (action.type) {
    case FlatAddTypes.FLAT_POST:
      return { ...state, loading: true }
    case FlatAddTypes.FLAT_POST_RESPONSE:
      return { ...state, addFlat: action.data, loading: false }
    case FlatAddTypes.FLAT_POST_CLEAR:
      return { ...state, addFlat: null }
    default:
      return state
  }
}

export const editFlatInitialState = {
  list: null
}

export const editFlatStoreKey = 'editFlatStore'

export const editFlatReducer = (state = editFlatInitialState, action) => {
  switch (action.type) {
    case FlatGetIdTypes.GET_FLAT_DETAILS:
      return { ...state, loadingEA: true }
    case FlatGetIdTypes.FLAT_DETAILS_RESPONSE:
      return { ...state, FlatIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case FlatGetIdTypes.CLEAR_FLAT_DETAILS:
      return { ...state, FlatIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateFlatInitialState = {
  data: null
}

export const updateFlatStoreKey = 'updateFlatStore'

export const updateFlatReducer = (state = updateFlatInitialState, action) => {
  switch (action.type) {
    case updateFlatActionsTypes.UPDATE_FLAT:
      return { ...state, loading: true }
    case updateFlatActionsTypes.SAVE_UPDATE_FLAT_RESPONSE:
      return {
        ...state,
        updateFlatResponce: action.data,
        loading: false
      }
    case updateFlatActionsTypes.CLEAR_UPDATE_FLAT:
      return { ...state, updateFlatResponce: null }
    default:
      return state
  }
}

export const FlatdeleteStoreKey = 'FlatdeleteStore'

export const FlatdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case FlatdeleteActionsTypes.REQUEST:
      return { ...state, loadingFlatdelete: true }
    case FlatdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Flatdelete: res,
        statusFlatdelete: res.status,
        messageFlatdelete: res.message,
        loadingFlatdelete: false
      }
    case FlatdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Flatdelete: null,
        statusFlatdelete: '',
        messageFlatdelete: ''
      }
    default:
      return state
  }
}
