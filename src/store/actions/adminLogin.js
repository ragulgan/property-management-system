export const LoginAdminActionsTypes = {
    LOGIN_ADMIN: 'LOGIN_ADMIN',
    SAVE_LOGIN_ADMIN_RESPONSE: 'SAVE_LOGIN_ADMIN_RESPONSE',
    CLEAR_LOGIN_ADMIN: 'CLEAR_LOGIN_ADMIN'
  }
  
  export const LoginAdminActions = {
    loginAdmin: (data) => {
      return {
        type: LoginAdminActionsTypes.LOGIN_ADMIN,
        payload: data
      }
    },
    saveLoginAdminResponse: data => ({
      type: LoginAdminActionsTypes.SAVE_LOGIN_ADMIN_RESPONSE,
      data
    }),
    clearLoginAdmin: () => ({
      type: LoginAdminActionsTypes.CLEAR_LOGIN_ADMIN
    })
  }