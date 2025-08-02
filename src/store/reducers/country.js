import {
  CountryTypes, CountryAddTypes, CountryGetIdTypes, updateCountryActionsTypes,
  CountrydeleteActionsTypes
} from '../actions'

export const CountrylistInitialState = {
  list: null
}

export const CountrylistStoreKeys = 'CountrylistStore'

export const CountrylistReducers = (state = CountrylistInitialState, action) => {
  switch (action.type) {
    case CountryTypes.GET_COUNTRY_LIST:
      return { ...state, loading: true }
    case CountryTypes.SAVE_COUNTRY_LIST_RESPONSE:
      return { ...state, Countrylists: action.data, loading: false }
    case CountryTypes.CLEAR_COUNTRY_LIST:
      return { ...state, Countrylists: null }
    default:
      return state
  }
}

export const CountryAddInitialState = {
  data: null
}

export const CountryAddStoreKey = 'CountryAddStoreKey'

export const CountryAddReducer = (state = CountryAddInitialState, action) => {
  switch (action.type) {
    case CountryAddTypes.COUNTRY_POST:
      return { ...state, loading: true }
    case CountryAddTypes.COUNTRY_POST_RESPONSE:
      return { ...state, CountryAdd: action.data, CountryStatus: action.data.status, CountryMessage: action.data.message, loading: false }
    case CountryAddTypes.COUNTRY_POST_CLEAR:
      return { ...state, CountryAdd: null }
    default:
      return state
  }
}

export const editCountryInitialState = {
  list: null
}

export const editCountryStoreKey = 'editCountryStore'

export const editCountryReducer = (state = editCountryInitialState, action) => {
  switch (action.type) {
    case CountryGetIdTypes.GET_COUNTRY_DETAILS:
      return { ...state, loadingEA: true }
    case CountryGetIdTypes.COUNTRY_DETAILS_RESPONSE:
      return { ...state, CountryIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case CountryGetIdTypes.CLEAR_COUNTRY_DETAILS:
      return { ...state, CountryIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateCountryInitialState = {
  data: null
}

export const updateCountryStoreKey = 'updateCountryStore'

export const updateCountryReducer = (state = updateCountryInitialState, action) => {
  switch (action.type) {
    case updateCountryActionsTypes.UPDATE_COUNTRY:
      return { ...state, loading: true }
    case updateCountryActionsTypes.SAVE_UPDATE_COUNTRY_RESPONSE:
      return {
        ...state,
        saveupdateCountryResponse: action.data,
        loading: false
      }
    case updateCountryActionsTypes.CLEAR_UPDATE_COUNTRY:
      return { ...state, saveupdateCountryResponse: null }
    default:
      return state
  }
}

export const CountrydeleteStoreKey = 'CountrydeleteStore'

export const CountrydeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case CountrydeleteActionsTypes.REQUEST:
      return { ...state, loadingCountrydelete: true }
    case CountrydeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Countrydelete: res,
        statusCountrydelete: res.status,
        messageCountrydelete: res.message,
        loadingCountrydelete: false
      }
    case CountrydeleteActionsTypes.CLEAR:
      return {
        ...state,
        Countrydelete: null,
        statusCountrydelete: '',
        messageCountrydelete: ''
      }
    default:
      return state
  }
}