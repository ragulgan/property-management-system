import { FlatOwnerListTypes, FlatOwnerAddTypes, FlatOwnerGetIdTypes, updateFlatOwnerActionsTypes, FlatOwnerdeleteActionsTypes } from '../actions'

export const FlatOwnerlistInitialState = {
  list: null
}

export const FlatOwnerlistStoreKeys = 'FlatOwnerlistStore'

export const FlatOwnerlistReducers = (state = FlatOwnerlistInitialState, action) => {
  switch (action.type) {
    case FlatOwnerListTypes.GET_FLAT_OWNER_LIST:
      return { ...state, loading: true }
    case FlatOwnerListTypes.SAVE_FLAT_OWNER_LIST_RESPONSE:
      return { ...state, getAllFlatOwner: action.data, loading: false }
    case FlatOwnerListTypes.CLEAR_FLAT_OWNER_LIST:
      return { ...state, getAllFlatOwner: null }
    default:
      return state
  }
}

export const FlatOwnerAddInitialState = {
  data: null
}

export const FlatOwnerAddStoreKey = 'FlatOwnerAddStore'

export const FlatOwnerAddReducer = (state = FlatOwnerAddInitialState, action) => {
  switch (action.type) {
    case FlatOwnerAddTypes.FLAT_OWNER_POST:
      return { ...state, loading: true }
    case FlatOwnerAddTypes.FLAT_OWNER_POST_RESPONSE:
      return { ...state, addFlatOwner: action.data, loading: false }
    case FlatOwnerAddTypes.FLAT_OWNER_POST_CLEAR:
      return { ...state, addFlatOwner: null }
    default:
      return state
  }
}

export const editFlatOwnerInitialState = {
  list: null
}

export const editFlatOwnerStoreKey = 'editFlatOwnerStore'

export const editFlatOwnerReducer = (state = editFlatOwnerInitialState, action) => {
  switch (action.type) {
    case FlatOwnerGetIdTypes.GET_FLAT_OWNER_DETAILS:
      return { ...state, loadingEA: true }
    case FlatOwnerGetIdTypes.FLAT_OWNER_DETAILS_RESPONSE:
      return { ...state, FlatOwnerIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case FlatOwnerGetIdTypes.CLEAR_FLAT_OWNER_DETAILS:
      return { ...state, FlatOwnerIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateFlatOwnerInitialState = {
  data: null
}

export const updateFlatOwnerStoreKey = 'updateFlatOwnerStore'

export const updateFlatOwnerReducer = (state = updateFlatOwnerInitialState, action) => {
  switch (action.type) {
    case updateFlatOwnerActionsTypes.UPDATE_FLAT_OWNER:
      return { ...state, loading: true }
    case updateFlatOwnerActionsTypes.SAVE_UPDATE_FLAT_OWNER_RESPONSE:
      return {
        ...state,
        updateFlatOwnerResponce: action.data,
        loading: false
      }
    case updateFlatOwnerActionsTypes.CLEAR_UPDATE_FLAT_OWNER:
      return { ...state, updateFlatOwnerResponce: null }
    default:
      return state
  }
}

export const FlatOwnerdeleteStoreKey = 'FlatOwnerdeleteStore'

export const FlatOwnerdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case FlatOwnerdeleteActionsTypes.REQUEST:
      return { ...state, loadingFlatdelete: true }
    case FlatOwnerdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        FlatOwnerdelete: res,
        statusFlatOwnerdelete: res.status,
        messageFlatOwnerdelete: res.message,
        loadingFlatOwnerdelete: false
      }
    case FlatOwnerdeleteActionsTypes.CLEAR:
      return {
        ...state,
        FlatOwnerdelete: null,
        statusFlatOwnerdelete: '',
        messageFlatOwnerdelete: ''
      }
    default:
      return state
  }
}
