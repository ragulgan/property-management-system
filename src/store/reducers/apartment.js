import {
  getApartmentList,
  postApartmentTypes,
  getApartmentDetialsTypes,
  updateApartmentActionsTypes,
  deleteApartmentActionsTypes,
} from '../actions'

export const getApartmentlistStoreKeys = 'getApartmentlistStore'

export const getApartmentListReducers = (state = {}, action) => {
  switch (action.type) {
    case getApartmentList.REQUEST:
      return { ...state, loading: true }
    case getApartmentList.RESPONSE:
      return { ...state, getAllApartment: action.data, loading: false }
    case getApartmentList.CLEAR:
      return { ...state, getAllApartment: null }
    default:
      return state
  }
}

export const postApartmentInitialState = {
  data: null
}

export const postApartmentStoreKey = 'postApartmentStore'

export const postApartmentReducer = (state = postApartmentInitialState, action) => {
  switch (action.type) {
    case postApartmentTypes.REQUEST:
      return { ...state, loading: true }
    case postApartmentTypes.RESPONSE:
      return { ...state, addApartment: action.data, loading: false }
    case postApartmentTypes.CLEAR:
      return { ...state, addApartment: null }
    default:
      return state
  }
}

export const getApartmentDetialsInitialState = {
  list: null
}

export const getApartmentDetialsStoreKey = 'getApartmentDetialsStore'

export const getApartmentDetialsReducer = (state = getApartmentDetialsInitialState, action) => {
  switch (action.type) {
    case getApartmentDetialsTypes.REQUEST:
      return { ...state, loadingEA: true }
    case getApartmentDetialsTypes.RESPONSE:
      return { ...state, getApartmentDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case getApartmentDetialsTypes.CLEAR:
      return { ...state, getApartmentDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateApartmentInitialState = {
  data: null
}

export const updateApartmentStoreKey = 'updateApartmentStore'

export const updateApartmentReducer = (state = updateApartmentInitialState, action) => {
  switch (action.type) {
    case updateApartmentActionsTypes.REQUEST:
      return { ...state, loading: true }
    case updateApartmentActionsTypes.RESPONSE:
      return {
        ...state,
        updtedResponse: action.data,
        loading: false
      }
    case updateApartmentActionsTypes.CLEAR:
      return { ...state, updtedResponse: null }
    default:
      return state
  }
}

export const deleteApartmentStoreKey = 'deleteApartmentStore'

export const deleteApartmentReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case deleteApartmentActionsTypes.REQUEST:
      return { ...state, loadingDelete: true }
    case deleteApartmentActionsTypes.RESPONSE:
      return {
        ...state,
        deleteApartment: res,
        statusdelete: res.status,
        messageDelete: res.message,
        loadingDelete: false
      }
    case deleteApartmentActionsTypes.CLEAR:
      return {
        ...state,
        deleteApartment: null,
        statusdelete: '',
        messageDelete: ''
      }
    default:
      return state
  }
}