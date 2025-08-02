
export const UserTypes = {
  GET_USER_LIST: 'GET_USER_LIST',
  SAVE_USER_LIST_RESPONSE: 'SAVE_USER_LIST_RESPONSE',
  CLEAR_USER_LIST: 'CLEAR_USER_LIST'
}

export const UsersActions = {
  getUSERlist: (params) => ({
    type: UserTypes.GET_USER_LIST,
    params
  }),
  saveUSERlistResponse: (data) => ({
    type: UserTypes.SAVE_USER_LIST_RESPONSE,
    data
  }),
  clearUSERlist: () => ({
    type: UserTypes.CLEAR_USER_LIST
  })

}


export const UserAddTypes = {
  USER_POST: 'USER_POST',
  USER_POST_RESPONSE: 'USER_POST_RESPONSE',
  USER_POST_CLEAR: 'USER_POST_CLEAR'
}

export const UserAddAction = {
  USERAdd: (data) => {
    return {
      type: UserAddTypes.USER_POST,
      payload: data
    }
  },
  saveUserResponse: data => ({
    type: UserAddTypes.USER_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: UserAddTypes.USER_POST_CLEAR
  })
}

export const UserGetIdTypes = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  USER_DETAILS_RESPONSE: 'USER_DETAILS_RESPONSE',
  CLEAR_USER_DETAILS: 'CLEAR_USER_DETAILS'
}

export const UserGetIdActions = {
  getUserIdDetails: (id) => ({
    type: UserGetIdTypes.GET_USER_DETAILS,
    id
  }),
  saveUserIdDetailsResponse: data => ({
    type: UserGetIdTypes.USER_DETAILS_RESPONSE,
    data
  }),
  clearUserIdDetails: () => ({
    type: UserGetIdTypes.CLEAR_USER_DETAILS
  })
}

export const updateUserActionsTypes = {
  UPDATE_USER: 'UPDATE_USER',
  SAVE_UPDATE_USER_RESPONSE: 'SAVE_UPDATE_USER_RESPONSE',
  CLEAR_UPDATE_USER: 'CLEAR_UPDATE_USER'
}

export const updateUserActions = {
  updateUser: (id, params) => {
    return {
      type: updateUserActionsTypes.UPDATE_USER,
      payload: { id, params }
    }
  },
  saveupdateUserResponse: data => ({
    type: updateUserActionsTypes.SAVE_UPDATE_USER_RESPONSE,
    data
  }),
  clearupdateUser: () => ({
    type: updateUserActionsTypes.CLEAR_UPDATE_USER
  })
}

export const UserdeleteActionsTypes = {
  REQUEST: 'USER_DELETE_REQUEST',
  RESPONSE: 'USER_DELETE_RESPONSE',
  ERROR: 'USER_DELETE_ERROR',
  CLEAR: 'USER_DELETE_CLEAR'
}

export const UserdeleteActions = {
  delete: (id) => ({
    type: UserdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: UserdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: UserdeleteActionsTypes.CLEAR
  })
}


export const UserDropDownGetIdTypes = {
  GET_USER_DROPDOWN_DETAILS: 'GET_USER_DROPDOWN_DETAIL',
  USER_DROPDOWN_DETAILS_RESPONSE: 'USER_DROPDOWN_DETAILS_RESPONSE',
  CLEAR_DROPDOWN_USER_DETAILS: 'CLEAR_DROPDOWN_USER_DETAILS'
}

export const UserDropDownGetActions = {
  getUserDropDownIdDetails: (params) => ({
    type: UserDropDownGetIdTypes.GET_USER_DROPDOWN_DETAILS,
    params
  }),
  saveUserDropDownIdDetailsResponse: data => ({
    type: UserDropDownGetIdTypes.USER_DROPDOWN_DETAILS_RESPONSE,
    data
  }),
  clearUserDropDownIdDetails: () => ({
    type: UserDropDownGetIdTypes.CLEAR_DROPDOWN_USER_DETAILS
  })
}

