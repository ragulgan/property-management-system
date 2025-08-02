import {
  LandlordsTypes, LandlordsAddTypes, LandlordsGetIdTypes, updateLandlordsActionsTypes,
  LandlordsdeleteActionsTypes,
} from '../actions'

export const LandlordslistInitialState = {
  list: null
}

export const LandlordslistStoreKeys = 'LandlordslistStore'

export const LandlordslistReducers = (state = LandlordslistInitialState, action) => {
  switch (action.type) {
    case LandlordsTypes.GET_LANDLORD_LIST:
      return { ...state, loading: true }
    case LandlordsTypes.SAVE_LANDLORD_LIST_RESPONSE:
      return { ...state, getAllLandlords: action.data, loading: false }
    case LandlordsTypes.CLEAR_LANDLORD_LIST:
      return { ...state, getAllLandlords: null }
    default:
      return state
  }
}


export const LandlordsAddInitialState = {
  data: null
}

export const LandlordsAddStoreKey = 'LandlordsAddStore'

export const LandlordsAddReducer = (state = LandlordsAddInitialState, action) => {
  switch (action.type) {
    case LandlordsAddTypes.LANDLORD_POST:
      return { ...state, loading: true }
    case LandlordsAddTypes.LANDLORD_POST_RESPONSE:
      return { ...state, addLandLord: action.data, loading: false }
    case LandlordsAddTypes.LANDLORD_POST_CLEAR:
      return { ...state, addLandLord: null }
    default:
      return state
  }
}


export const editLandlordssInitialState = {
  list: null
}

export const editLandlordssStoreKey = 'editLandlordssStore'

export const editLandlordsReducer = (state = editLandlordssInitialState, action) => {
  switch (action.type) {
    case LandlordsGetIdTypes.GET_LANDLORD_DETAILS:
      return { ...state, loadingEA: true }
    case LandlordsGetIdTypes.LANDLORD_DETAILS_RESPONSE:
      return { ...state, LandlordsIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case LandlordsGetIdTypes.CLEAR_LANDLORD_DETAILS:
      return { ...state, LandlordsIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateLandlordsInitialState = {
  data: null
}

export const updateLandlordsStoreKey = 'updateLandlordsStore'

export const updateLandlordsReducer = (state = updateLandlordsInitialState, action) => {
  switch (action.type) {
    case updateLandlordsActionsTypes.UPDATE_LANDLORD:
      return { ...state, loading: true }
    case updateLandlordsActionsTypes.SAVE_UPDATE_LANDLORD_RESPONSE:
      return {
        ...state,
        saveupdateLandlordsResponse: action.data,
        loading: false
      }
    case updateLandlordsActionsTypes.CLEAR_UPDATE_LANDLORD:
      return { ...state, saveupdateLandlordsResponse: null }
    default:
      return state
  }
}

export const LandlordsdeleteStoreKey = 'LandlordsdeleteStore'

export const LandlordsdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case LandlordsdeleteActionsTypes.REQUEST:
      return { ...state, loadingLandlordsdelete: true }
    case LandlordsdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Landlordsdelete: res,
        statusLandlordsdelete: res.status,
        messageLandlordsdelete: res.message,
        loadingLandlordsdelete: false
      }
    case LandlordsdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Landlordsdelete: null,
        statusLandlordsdelete: '',
        messageLandlordsdelete: ''
      }
    default:
      return state
  }
}