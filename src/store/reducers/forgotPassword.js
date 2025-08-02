import { ForgotPasswordActionsTypes, ResetPasswordActionsTypes, VerifyUserActionsTypes } from '../actions'

export const forgotPasswordInitialState = {
  forgotPassword: null
}

export const forgotPasswordStoreKey = 'forgotPasswordStore'

export const forgotPasswordReducer = (state = forgotPasswordInitialState, action) => {
  switch (action.type) {
    case ForgotPasswordActionsTypes.FORGOT_PASSWORD:
      return { ...state, loading: true }
    case ForgotPasswordActionsTypes.SAVE_FORGOT_PASSWORD_RESPONSE:
      return { ...state, forgotPassword: action.data, loading: false }
    case ForgotPasswordActionsTypes.CLEAR_FORGOT_PASSWORD:
      return { ...state, forgotPassword: null }
    default:
      return state
  }
}

export const verifyUserInitialState = {
  verifyUser: null
}

export const verifyUserStoreKey = 'verifyUserStore'

export const verifyUserReducer = (state = verifyUserInitialState, action) => {
  switch (action.type) {
    case VerifyUserActionsTypes.VERIFY_USER:
      return { ...state, loading: true }
    case VerifyUserActionsTypes.SAVE_VERIFY_USER_RESPONSE:
      return { ...state, verifyUser: action.data, loading: false }
    case VerifyUserActionsTypes.CLEAR_VERIFY_USER:
      return { ...state, verifyUser: null }
    default:
      return state
  }
}

export const resetPasseordInitialState = {
  resetPassword: null
}

export const resetPasswordStoreKey = 'resetPasswordStore'

export const resetPasswordReducer = (state = resetPasseordInitialState, action) => {
  switch (action.type) {
    case ResetPasswordActionsTypes.RESET_PASSWORD:
      return { ...state, loading: true }
    case ResetPasswordActionsTypes.SAVE_RESET_PASSWORD_RESPONSE:
      return { ...state, resetPassword: action.data, loading: false }
    case ResetPasswordActionsTypes.CLEAR_RESET_PASSWORD:
      return { ...state, resetPassword: null }
    default:
      return state
  }
}
