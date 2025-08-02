
export const RolesTypes = {
  GET_ROLE_LIST: 'GET_ROLE_LIST',
  SAVE_ROLE_LIST_RESPONSE: 'SAVE_ROLE_LIST_RESPONSE',
  CLEAR_ROLE_LIST: 'CLEAR_ROLE_LIST'
}

export const RolesActions = {
  getroleslist: (params) => ({
    type: RolesTypes.GET_ROLE_LIST,
    params
  }),
  saveroleslistResponse: (data) => ({
    type: RolesTypes.SAVE_ROLE_LIST_RESPONSE,
    data
  }),
  clearroleslist: () => ({
    type: RolesTypes.CLEAR_ROLE_LIST
  })

}

export const RolesConfigTypes = {
  GET_ROLE_CONFIG_LIST: 'GET_ROLE_CONFIG_LIST',
  SAVE_ROLE_CONFIG_LIST_RESPONSE: 'SAVE_ROLE_CONFIG_LIST_RESPONSE',
  CLEAR_ROLE_CONFIG_LIST: 'CLEAR_ROLE_CONFIG_LIST'
}

export const RolesConfigActions = {
  getrolesconfiglist: (params) => ({
    type: RolesConfigTypes.GET_ROLE_CONFIG_LIST,
    params
  }),
  saverolesconfiglistResponse: (data) => ({
    type: RolesConfigTypes.SAVE_ROLE_CONFIG_LIST_RESPONSE,
    data
  }),
  clearrolesconfiglist: () => ({
    type: RolesConfigTypes.CLEAR_ROLE_CONFIG_LIST
  })

}


export const RolesAddTypes = {
  ROLE_POST: 'ROLE_POST',
  ROLE_POST_RESPONSE: 'ROLE_POST_RESPONSE',
  ROLE_POST_CLEAR: 'ROLE_POST_CLEAR'
}

export const RolesAddAction = {
  RolesAdd: (data) => {
    return {
      type: RolesAddTypes.ROLE_POST,
      payload: data
    }
  },
  saveRolesResponse: data => ({
    type: RolesAddTypes.ROLE_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: RolesAddTypes.ROLE_POST_CLEAR
  })
}

export const RolesGetIdTypes = {
  GET_ROLE_DETAILS: 'GET_ROLE_DETAILS',
  ROLE_DETAILS_RESPONSE: 'ROLE_DETAILS_RESPONSE',
  CLEAR_ROLE_DETAILS: 'CLEAR_ROLE_DETAILS'
}

export const RolesGetIdActions = {
  getRolesIdDetails: (id) => ({
    type: RolesGetIdTypes.GET_ROLE_DETAILS,
    id
  }),
  saveRolesIdDetailsResponse: data => ({
    type: RolesGetIdTypes.ROLE_DETAILS_RESPONSE,
    data
  }),
  clearRolesIdDetails: () => ({
    type: RolesGetIdTypes.CLEAR_ROLE_DETAILS
  })
}

export const updateRolesActionsTypes = {
  UPDATE_ROLE: 'UPDATE_ROLE',
  SAVE_UPDATE_ROLE_RESPONSE: 'SAVE_UPDATE_ROLE_RESPONSE',
  CLEAR_UPDATE_ROLE: 'CLEAR_UPDATE_ROLE'
}

export const updateRolesActions = {
  updateRoles: (id, params) => {
    return {
      type: updateRolesActionsTypes.UPDATE_ROLE,
      payload: { id, params }
    }
  },
  saveupdateRolesResponse: data => ({
    type: updateRolesActionsTypes.SAVE_UPDATE_ROLE_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateRoles: () => ({
    type: updateRolesActionsTypes.CLEAR_UPDATE_ROLE
  })
}
export const RolesdeleteActionsTypes = {
  REQUEST: 'ROLE_DELETE_REQUEST',
  RESPONSE: 'ROLE_DELETE_RESPONSE',
  ERROR: 'ROLE_DELETE_ERROR',
  CLEAR: 'ROLE_DELETE_CLEAR'
}

export const RolesdeleteActions = {
  delete: (id) => ({
    type: RolesdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: RolesdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: RolesdeleteActionsTypes.CLEAR
  })
}