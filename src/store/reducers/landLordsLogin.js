import { LoginActionsTypes, RegisterActionsTypes, OtpActionsTypes } from '../actions'

export const loginInitialState = {
  data: null
}

export const loginStoreKey = 'loginStore'

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LoginActionsTypes.LOGIN:
      return { ...state, loading: true }
    case LoginActionsTypes.SAVE_LOGIN_RESPONSE:
      return { ...state, login: action.data, loading: false }
    case LoginActionsTypes.CLEAR_LOGIN:
      return { ...state, login: null }
    default:
      return state
  }
}

export const registeritialState = {
  data: null
}

export const registerStoreKey = 'registerStore'

export const registerReducer = (state = registeritialState, action) => {
  switch (action.type) {
    case RegisterActionsTypes.REGISTER:
      return { ...state, loading: true }
    case RegisterActionsTypes.SAVE_REGISTER_RESPONSE:
      return { ...state, registerData: action.data, loading: false }
    case RegisterActionsTypes.CLEAR_REGISTER:
      return { ...state, registerData: null }
    default:
      return state
  }
}

export const otpIntialState = {
  data: null
}

export const otpStoreKey = 'otpStore'

export const otpReducer = (state = otpIntialState, action) => {
  switch (action.type) {
    case OtpActionsTypes.OTP:
      return { ...state, loading: true }
    case OtpActionsTypes.SAVE_OTP_RESPONSE:
      return { ...state, otpData: action.data, loading: false }
    case OtpActionsTypes.CLEAR_OTP:
      return { ...state, otpData: null }
    default:
      return state
  }
}