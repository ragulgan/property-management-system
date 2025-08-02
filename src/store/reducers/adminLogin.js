import { LoginAdminActionsTypes } from '../actions'

export const loginAdminInitialState = {
  data: null
}

export const loginAdminStoreKey = 'loginAdminStore'

export const loginAdminReducer = (state = loginAdminStoreKey, action) => {
  switch (action.type) {
    case LoginAdminActionsTypes.LOGIN_ADMIN:
      return { ...state, loading: true }
    case LoginAdminActionsTypes.SAVE_LOGIN_ADMIN_RESPONSE:
      return { ...state, loginAdmin: action.data, loading: false }
    case LoginAdminActionsTypes.CLEAR_LOGIN_ADMIN:
      return { ...state, loginAdmin: null }
    default:
      return state
  }
}