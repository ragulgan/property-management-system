
export const LeaseTypes = {
  GET_LEASE_TYPE_LIST: 'GET_LEASE_TYPE_LIST',
  SAVE_LEASE_TYPE_LIST_RESPONSE: 'SAVE_LEASE_TYPE_LIST_RESPONSE',
  CLEAR_LEASE_TYPE_LIST: 'CLEAR_LEASE_TYPE_LIST'
}

export const LeaseActions = {
  getleaselist: (params) => ({
    type: LeaseTypes.GET_LEASE_TYPE_LIST,
    params
  }),
  saveleaselistResponse: (data) => ({
    type: LeaseTypes.SAVE_LEASE_TYPE_LIST_RESPONSE,
    data
  }),
  clearleaselist: () => ({
    type: LeaseTypes.CLEAR_LEASE_TYPE_LIST
  })

}

export const LeaseAddTypes = {
  LEASE_TYPE_POST: 'LEASE_TYPE_POST',
  LEASE_TYPE_POST_RESPONSE: 'LEASE_TYPE_POST_RESPONSE',
  LEASE_TYPE_POST_CLEAR: 'LEASE_TYPE_POST_CLEAR'
}

export const LeaseAddAction = {
  LeaseAdd: (data) => {
    return {
      type: LeaseAddTypes.LEASE_TYPE_POST,
      payload: data
    }
  },
  saveLeaseResponse: data => ({
    type: LeaseAddTypes.LEASE_TYPE_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: LeaseAddTypes.LEASE_TYPE_POST_CLEAR
  })
}

export const LeaseGetIdTypes = {
  GET_LEASE_TYPE_DETAILS: 'GET_LEASE_TYPE_DETAILS',
  LEASE_TYPE_DETAILS_RESPONSE: 'LEASE_TYPE_DETAILS_RESPONSE',
  CLEAR_LEASE_TYPE_DETAILS: 'CLEAR_LEASE_TYPE_DETAILS'
}

export const LeaseGetIdActions = {
  getLeaseIdDetails: (id) => ({
    type: LeaseGetIdTypes.GET_LEASE_TYPE_DETAILS,
    id
  }),
  saveLeaseIdDetailsResponse: data => ({
    type: LeaseGetIdTypes.LEASE_TYPE_DETAILS_RESPONSE,
    data
  }),
  clearLeaseIdDetails: () => ({
    type: LeaseGetIdTypes.CLEAR_LEASE_TYPE_DETAILS
  })
}

export const updateLeaseActionsTypes = {
  UPDATE_LEASE_TYPE: 'UPDATE_LEASE_TYPE',
  SAVE_UPDATE_LEASE_TYPE_RESPONSE: 'SAVE_UPDATE_LEASE_TYPE_RESPONSE',
  CLEAR_UPDATE_LEASE_TYPE: 'CLEAR_UPDATE_LEASE_TYPE'
}

export const updateLeaseActions = {
  updateLease: (id, params) => {
    return {
      type: updateLeaseActionsTypes.UPDATE_LEASE_TYPE,
      payload: { id, params }
    }
  },
  saveupdateLeaseResponse: data => ({
    type: updateLeaseActionsTypes.SAVE_UPDATE_LEASE_TYPE_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateLease: () => ({
    type: updateLeaseActionsTypes.CLEAR_UPDATE_LEASE_TYPE
  })
}
export const LeasedeleteActionsTypes = {
  REQUEST: 'LEASE_TYPE_DELETE_REQUEST',
  RESPONSE: 'LEASE_TYPE_DELETE_RESPONSE',
  ERROR: 'LEASE_TYPE_DELETE_ERROR',
  CLEAR: 'LEASE_TYPE_DELETE_CLEAR'
}

export const LeasedeleteActions = {
  delete: (id) => ({
    type: LeasedeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: LeasedeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LeasedeleteActionsTypes.CLEAR
  })
}