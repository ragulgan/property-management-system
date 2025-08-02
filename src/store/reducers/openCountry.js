import {
    OpenCountryTypes, OpenStateTypes, OpenCityTypes
  } from '../actions'
  
  export const OpenCountrylistInitialState = {
    list: null
  }
  
  export const OpenCountrylistStoreKeys = 'OpenCountrylistStore'
  
  export const OpenCountrylistReducers = (state = OpenCountrylistInitialState, action) => {
    switch (action.type) {
      case OpenCountryTypes.GET_OPEN_COUNTRY_LIST:
        return { ...state, loading: true }
      case OpenCountryTypes.SAVE_OPEN_COUNTRY_LIST_RESPONSE:
        return { ...state, OpenCountrylists: action.data, loading: false }
      case OpenCountryTypes.CLEAR_OPEN_COUNTRY_LIST:
        return { ...state, OpenCountrylists: null }
      default:
        return state
    }
  }

  export const OpenStatelistInitialState = {
    list: null
  }
  
  export const OpenStatelistStoreKeys = 'OpenStatelistStore'
  
  export const OpenStatelistReducers = (state = OpenStatelistInitialState, action) => {
    switch (action.type) {
      case OpenStateTypes.GET_OPEN_STATE_LIST:
        return { ...state, loading: true }
      case OpenStateTypes.SAVE_OPEN_STATE_LIST_RESPONSE:
        return { ...state, OpenStatelists: action.data, loading: false }
      case OpenStateTypes.CLEAR_OPEN_STATE_LIST:
        return { ...state, OpenStatelists: null }
      default:
        return state
    }
  }

  export const OpenCitylistInitialState = {
    list: null
  }
  
  export const OpenCitylistStoreKeys = 'OpenCitylistStore'
  
  export const OpenCitylistReducers = (state = OpenCitylistInitialState, action) => {
    switch (action.type) {
      case OpenCityTypes.GET_OPEN_CITY_LIST:
        return { ...state, loading: true }
      case OpenCityTypes.SAVE_OPEN_CITY_LIST_RESPONSE:
        return { ...state, OpenCitylists: action.data, loading: false }
      case OpenCityTypes.CLEAR_OPEN_CITY_LIST:
        return { ...state, OpenCitylists: null }
      default:
        return state
    }
  }