export const ForgotPasswordActionsTypes = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  SAVE_FORGOT_PASSWORD_RESPONSE: 'SAVE_FORGOT_PASSWORD_RESPONSE',
  CLEAR_FORGOT_PASSWORD: 'CLEAR_FORGOT_PASSWORD'
}

export const ForgotActions = {
  forgotPassword: (data) => {
    return {
      type: ForgotPasswordActionsTypes.FORGOT_PASSWORD,
      payload: data
    }
  },
  saveForgotPasswordResponse: (data) => {
    return {
      type: ForgotPasswordActionsTypes.SAVE_FORGOT_PASSWORD_RESPONSE,
      data
    }
  },
  clearForgotPassword: () => ({
    type: ForgotPasswordActionsTypes.CLEAR_FORGOT_PASSWORD
  })
}

export const VerifyUserActionsTypes = {
  VERIFY_USER: 'VERIFY_USER',
  SAVE_VERIFY_USER_RESPONSE: 'SAVE_VERIFY_USER_RESPONSE',
  CLEAR_VERIFY_USER: 'CLEAR_VERIFY_USER'
}

export const VerifyActions = {
  verifyUser: (data) => {
    return {
      type: VerifyUserActionsTypes.VERIFY_USER,
      payload: data
    }
  },
  saveVerifyUserResponse: (data) => {
    return {
      type: VerifyUserActionsTypes.SAVE_VERIFY_USER_RESPONSE,
      data
    }
  },
  clearVerifyUser: () => ({
    type: VerifyUserActionsTypes.CLEAR_VERIFY_USER
  })
}

export const ResetPasswordActionsTypes = {
  RESET_PASSWORD: 'RESET_PASSWORD',
  SAVE_RESET_PASSWORD_RESPONSE: 'SAVE_RESET_PASSWORD_RESPONSE',
  CLEAR_RESET_PASSWORD: 'CLEAR_RESET_PASSWORD'
}

export const ResetPasswordActions = {
  resetPassword: (data) => {
    return {
      type: ResetPasswordActionsTypes.RESET_PASSWORD,
      payload: data
    }
  },
  saveResetPasswordResponse: (data) => {
    return {
      type: ResetPasswordActionsTypes.SAVE_RESET_PASSWORD_RESPONSE,
      data
    }
  },
  clearResetPassword: () => ({
    type: ResetPasswordActionsTypes.CLEAR_RESET_PASSWORD
  })
}
