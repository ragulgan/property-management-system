import {
  ApartmentTypeListTypes,
  ApartmentTypeAddTypes,
  ApartmentTypeGetIdTypes,
  updateApartmentTypeActionTypes,
  ApartmentTypedeleteActionsTypes,
  } from '../actions'
  
  export const ApartmentTypelistInitialState = {
    list: null
  }
  
  export const ApartmentTypelistStoreKeys = 'ApartmentTypelistStore'
  
  export const ApartmentTypelistReducers = (state = ApartmentTypelistInitialState, action) => {
    switch (action.type) {
      case ApartmentTypeListTypes.GET_APARTMENT_TYPE_LIST:
        return { ...state, loading: true }
      case ApartmentTypeListTypes.SAVE_APARTMENT_TYPE_LIST_RESPONSE:
        return { ...state, getAllApartmentType: action.data, loading: false }
      case ApartmentTypeListTypes.CLEAR_APARTMENT_TYPE_LIST:
        return { ...state, getAllApartmentType: null }
      default:
        return state
    }
  }
  
  
  export const ApartmentTypeAddInitialState = {
    data: null
  }
  
  export const ApartmentTypeAddStoreKey = 'ApartmentTypeAddStore'
  
  export const ApartmentTypeAddReducer = (state = ApartmentTypeAddInitialState, action) => {
    switch (action.type) {
      case ApartmentTypeAddTypes.APARTMENT_TYPE_POST:
        return { ...state, loading: true }
      case ApartmentTypeAddTypes.APARTMENT_TYPE_POST_RESPONSE:
        return { ...state, addApartmentType: action.data, loading: false }
      case ApartmentTypeAddTypes.APARTMENT_TYPE_POST_CLEAR:
        return { ...state, addApartmentType: null }
      default:
        return state
    }
  }
  
  
  export const editApartmentTypeInitialState = {
    list: null
  }
  
  export const editApartmentTypeStoreKey = 'editApartmentTypeStore'
  
  export const editApartmentTypeReducer = (state = editApartmentTypeInitialState, action) => {
    switch (action.type) {
      case ApartmentTypeGetIdTypes.GET_APARTMENT_TYPE_DETAILS:
        return { ...state, loadingEA: true }
      case ApartmentTypeGetIdTypes.APARTMENT_TYPE_DETAILS_RESPONSE:
        return { ...state, ApartmentTypeIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case ApartmentTypeGetIdTypes.CLEAR_APARTMENT_TYPE_DETAILS:
        return { ...state, ApartmentTypeIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updateApartmentTypeInitialState = {
    data: null
  }
  
  export const updateApartmentTypeStoreKey = 'updateApartmentTypeStore'
  
  export const updateApartmentTypeReducer = (state = updateApartmentTypeInitialState, action) => {
    switch (action.type) {
      case updateApartmentTypeActionTypes.UPDATE_APARTMENT_TYPE:
        return { ...state, loading: true }
      case updateApartmentTypeActionTypes.SAVE_UPDATE_APARTMENT_TYPE_RESPONSE:
        return {
          ...state,
          saveupdateApartmentTypeResponse: action.data,
          loading: false
        }
      case updateApartmentTypeActionTypes.CLEAR_UPDATE_APARTMENT_TYPE:
        return { ...state, saveupdateApartmentTypeResponse: null }
      default:
        return state
    }
  }
  
  export const ApartmentTypedeleteStoreKey = 'ApartmentTypedeleteStore'
  
  export const ApartmentTypedeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case ApartmentTypedeleteActionsTypes.REQUEST:
        return { ...state, loadingApartmentTypedelete: true }
      case ApartmentTypedeleteActionsTypes.RESPONSE:
        return {
          ...state,
          ApartmentTypedelete: res,
          statusApartmentTypedelete: res.status,
          messageApartmentTypedelete: res.message,
          loadingApartmentTypedelete: false
        }
      case ApartmentTypedeleteActionsTypes.CLEAR:
        return {
          ...state,
          ApartmentTypedelete: null,
          statusApartmentTypedelete: '',
          messageApartmentTypedelete: ''
        }
      default:
        return state
    }
  }