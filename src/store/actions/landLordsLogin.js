

export const LoginActionsTypes = {
  LOGIN: 'LOGIN',
  SAVE_LOGIN_RESPONSE: 'SAVE_LOGIN_RESPONSE',
  CLEAR_LOGIN: 'CLEAR_LOGIN'
}

export const LoginActions = {
  login: (data) => {
    return {
      type: LoginActionsTypes.LOGIN,
      payload: data
    }
  },
  
  saveLoginResponse: data => ({
    type: LoginActionsTypes.SAVE_LOGIN_RESPONSE,
    data
  }),

  
  clearLogin: () => ({
    type: LoginActionsTypes.CLEAR_LOGIN
  })
}

export const RegisterActionsTypes = {
  REGISTER: 'REGISTER',
  SAVE_REGISTER_RESPONSE: 'SAVE_REGISTER_RESPONSE',
  CLEAR_REGISTER: 'CLEAR_REGISTER'
}

export const RegisterActions = {
  Register: (data) => {
    return {
      type: RegisterActionsTypes.REGISTER,
      payload: data
    }
  },
  
  saveRegisterResponse: data => ({
    type: RegisterActionsTypes.SAVE_REGISTER_RESPONSE,
    data
  }),

  
  clearRegister: () => ({
    type: RegisterActionsTypes.CLEAR_REGISTER
  })
}

export const OtpActionsTypes = {
  OTP: 'OTP',
  SAVE_OTP_RESPONSE: 'SAVE_OTP_RESPONSE',
  CLEAR_OTP: 'CLEAR_OTP'
}

export const OtpActions = {
  Otp: (data) => {
    return {
      type: OtpActionsTypes.OTP,
      payload: data
    }
  },
  
  saveOtpResponse: data => ({
    type: OtpActionsTypes.SAVE_OTP_RESPONSE,
    data
  }),

  clearOtp: () => ({
    type: OtpActionsTypes.CLEAR_OTP
  })
}
