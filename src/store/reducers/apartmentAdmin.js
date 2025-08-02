import { ApartmentAdminTypes, ApartmentAdminAddTypes, ApartmentAdminGetIdTypes, updateApartmentAdminActionsTypes, ApartmentAdmindeleteActionsTypes } from '../actions'

export const ApartmentAdminlistInitialState = {
  list: null
}

export const ApartmentAdminlistStoreKeys = 'ApartmentAdminlistStore'

export const ApartmentAdminlistReducers = (state = ApartmentAdminlistInitialState, action) => {
  switch (action.type) {
    case ApartmentAdminTypes.GET_APARTMENTADMIN_LIST:
      return { ...state, loading: true }
    case ApartmentAdminTypes.SAVE_APARTMENTADMIN_LIST_RESPONSE:
      return { ...state, getAllapartmentAdmins: action.data, loading: false }
    case ApartmentAdminTypes.CLEAR_APARTMENTADMIN_LIST:
      return { ...state, getAllapartmentAdmins: null }
    default:
      return state
  }
}

export const ApartmentAdminAddInitialState = {
  data: null
}

export const ApartmentAdminAddStoreKey = 'ApartmentAdminAddStore'

export const ApartmentAdminAddReducer = (state = ApartmentAdminAddInitialState, action) => {
  switch (action.type) {
    case ApartmentAdminAddTypes.APARTMENTADMIN_POST:
      return { ...state, loading: true }
    case ApartmentAdminAddTypes.APARTMENTADMIN_POST_RESPONSE:
      return { ...state, addApartmentAdmin: action.data, loading: false }
    case ApartmentAdminAddTypes.APARTMENTADMIN_POST_CLEAR:
      return { ...state, addApartmentAdmin: null }
    default:
      return state
  }
}

export const editApartmentAdminInitialState = {
  list: null
}

export const editApartmentAdminStoreKey = 'editApartmentAdminStore'

export const editApartmentAdminReducer = (state = editApartmentAdminInitialState, action) => {
  switch (action.type) {
    case ApartmentAdminGetIdTypes.GET_APARTMENTADMIN_DETAILS:
      return { ...state, loadingEA: true }
    case ApartmentAdminGetIdTypes.APARTMENTADMIN_DETAILS_RESPONSE:
      return { ...state, ApartmentAdminIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case ApartmentAdminGetIdTypes.CLEAR_APARTMENTADMIN_DETAILS:
      return { ...state, ApartmentAdminIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateApartmentAdminInitialState = {
  data: null
}

export const updateApartmentAdminStoreKey = 'updateApartmentAdminStore'

export const updateApartmentAdminReducer = (state = updateApartmentAdminInitialState, action) => {
  switch (action.type) {
    case updateApartmentAdminActionsTypes.UPDATE_APARTMENTADMIN:
      return { ...state, loading: true }
    case updateApartmentAdminActionsTypes.SAVE_UPDATE_APARTMENTADMIN_RESPONSE:
      return {
        ...state,
        updateApartmentAdminResponce: action.data,
        loading: false
      }
    case updateApartmentAdminActionsTypes.CLEAR_UPDATE_APARTMENTADMIN:
      return { ...state, updateApartmentAdminResponce: null }
    default:
      return state
  }
}

export const ApartmentAdmindeleteStoreKey = 'ApartmentAdmindeleteStore'

export const ApartmentAdmindeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case ApartmentAdmindeleteActionsTypes.REQUEST:
      return { ...state, loadingApartmentAdmindelete: true }
    case ApartmentAdmindeleteActionsTypes.RESPONSE:
      return {
        ...state,
        ApartmentAdmindelete: res,
        statusApartmentAdmindelete: res.status,
        messageApartmentAdmindelete: res.message,
        loadingApartmentAdmindelete: false
      }
    case ApartmentAdmindeleteActionsTypes.CLEAR:
      return {
        ...state,
        ApartmentAdmindelete: null,
        statusApartmentAdmindelete: '',
        messageApartmentAdmindelete: ''
      }
    default:
      return state
  }
}
