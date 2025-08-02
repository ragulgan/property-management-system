import { CityTypes,CityAddTypes,CityGetIdTypes,updateCityActionsTypes,
    CitydeleteActionsTypes} from '../actions'
  
  export const CitylistInitialState = {
    list: null
  }
  
  export const CitylistStoreKeys = 'CitylistStore'
  
  export const CitylistReducers = (state = CitylistInitialState, action) => {
    switch (action.type) {
      case CityTypes.GET_CITY_LIST:
        return { ...state, loading: true }
      case CityTypes.SAVE_CITY_LIST_RESPONSE:
        return { ...state, Citylists: action.data, loading: false }
      case CityTypes.CLEAR_CITY_LIST:
        return { ...state, Citylists: null }
      default:
        return state
    }
  }
  
  export const CityAddInitialState = {
    data: null
  } 
  
  export const CityAddStoreKey = 'CityAddStore'
  
  export const CityAddReducer = (state = CityAddInitialState, action) => {
    switch (action.type) {
      case CityAddTypes.CITY_POST:
        return { ...state, loading: true }
      case CityAddTypes.CITY_POST_RESPONSE:
        return { ...state, CityAdd: action.data, CityStatus:  action.data.status, CityMessage:  action.data.message, loading: false }
      case CityAddTypes.CITY_POST_CLEAR:
        return { ...state, CityAdd: null }
      default:
        return state
    }
  }
  
  export const editCityInitialState = {
    list: null
  }
  
  export const editCityStoreKey = 'editCityStore'
  
  export const editCityReducer = (state = editCityInitialState, action) => {
    switch (action.type) {
      case CityGetIdTypes.GET_CITY_DETAILS:
        return { ...state, loadingEA: true }
      case CityGetIdTypes.CITY_DETAILS_RESPONSE:
        return { ...state, CityIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case CityGetIdTypes.CLEAR_CITY_DETAILS:
        return { ...state, CityIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updateCityInitialState = {
    data: null
  }
  
  export const updateCityStoreKey = 'updateCityStore'
  
  export const updateCityReducer = (state = updateCityInitialState, action) => {
    switch (action.type) {
      case updateCityActionsTypes.UPDATE_CITY:
        return { ...state, loading: true }
      case updateCityActionsTypes.SAVE_UPDATE_CITY_RESPONSE:
        return {
          ...state,
          saveupdateCityResponse: action,
          loading: false
        }
      case updateCityActionsTypes.CLEAR_UPDATE_CITY:
        return { ...state, saveupdateCityResponse: null }
      default:
        return state
    }
  }
  
  export const  CitydeleteStoreKey = 'CitydeleteStore'
  
  export const  CitydeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case  CitydeleteActionsTypes.REQUEST:
        return { ...state, loadingCitydelete: true }
      case  CitydeleteActionsTypes.RESPONSE:
        return {
          ...state,
          Citydelete: res,
          statusCitydelete: res.status,
          messageCitydelete: res.message,
          loadingCitydelete: false
        }
      case  CitydeleteActionsTypes.CLEAR:
        return {
          ...state,
          Citydelete: null,
          statusCitydelete: '',
          messageCitydelete: ''
        }
      default:
        return state
    }
  }