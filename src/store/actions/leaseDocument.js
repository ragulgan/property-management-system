
export const LeaseDocTypes = {
    GET_LEASE_DOC_LIST: 'GET_LEASE_DOC_LIST',
    SAVE_LEASE_DOC_LIST_RESPONSE: 'SAVE_LEASE_DOC_LIST_RESPONSE',
    CLEAR_LEASE_DOC_LIST: 'CLEAR_LEASE_DOC_LIST'
  }
  
  export const  LeaseDocumentListActions = {
    getLeaseDoclist: (params) => ({
      type: LeaseDocTypes.GET_LEASE_DOC_LIST,
      params
    }),
    saveLeaseDoclistResponse: (data) => ({
      type: LeaseDocTypes.SAVE_LEASE_DOC_LIST_RESPONSE,
      data
    }),
    clearLeaseDoclist: () => ({
      type: LeaseDocTypes.CLEAR_LEASE_DOC_LIST
    })
    
  }


export const LeaseDocAddTypes = {
  LEASE_DOC_POST: 'LEASE_DOC_POST',
  LEASE_POST_DOC_RESPONSE: 'LEASE_POST_DOC_RESPONSE',
  LEASE_POST_DOC_CLEAR: 'LEASE_POST_DOC_CLEAR'
}

export const LeaseDocumentListAddAction = {
  LeaseDocAdd: (data) => {
    return {
      type: LeaseDocAddTypes.LEASE_DOC_POST,
      payload: data
    }
  },
  saveLeaseDocResponse: data => ({
    type: LeaseDocAddTypes.LEASE_POST_DOC_RESPONSE,
    data
  }),
  clearLeaseDoc: () => ({
    type: LeaseDocAddTypes.LEASE_POST_DOC_CLEAR
  })
}

export const LeaseDocGetIdTypes = {
  GET_LEASE_DOC_DETAILS: 'GET_LEASE_DOC_DETAILS',
  LEASE_DETAILS_DOC_RESPONSE: 'LEASE_DETAILS_DOC_RESPONSE',
  CLEAR_LEASE_DOC_DETAILS: 'CLEAR_LEASE_DOC_DETAILS'
}

export const LeaseDocumentListGetIdActions = {
  getLeaseDocIdDetails: (id) => ({
    type: LeaseDocGetIdTypes.GET_LEASE_DOC_DETAILS,
    id
  }),
  saveLeaseDocIdDetailsResponse: data => ({
    type: LeaseDocGetIdTypes.LEASE_DETAILS_DOC_RESPONSE,
    data
  }),
  clearLeaseDocIdDetails: () => ({
    type: LeaseDocGetIdTypes.CLEAR_LEASE_DOC_DETAILS
  })
}

export const updateLeaseDocActionsTypes = {
  UPDATE_LEASE_DOC: 'UPDATE_LEASE_DOC',
  SAVE_UPDATE_LEASE_DOC_RESPONSE: 'SAVE_UPDATE_LEASE_DOC_RESPONSE',
  CLEAR_UPDATE_LEASE_DOC: 'CLEAR_UPDATE_LEASE_DOC'
}

export const updateLeaseDocumentListActions = {
  updateLeaseDoc: (id, params) => {
    return {
      type: updateLeaseDocActionsTypes.UPDATE_LEASE_DOC,
      payload:  { id, params }
    }
  },
  saveupdateLeaseDocResponse: data => ({
    type: updateLeaseDocActionsTypes.SAVE_UPDATE_LEASE_DOC_RESPONSE,
    data
  }),
  clearupdateLeaseDoc: () => ({
    type: updateLeaseDocActionsTypes.CLEAR_UPDATE_LEASE_DOC
  })
}
export const LeaseDocdeleteActionsTypes = {
  REQUEST: 'LEASE_DOC_DELETE_REQUEST',
  RESPONSE: 'LEASE_DOC_DELETE_RESPONSE',
  ERROR: 'LEASE_DOC_DELETE_ERROR',
  CLEAR: 'LEASE_DOC_DELETE_CLEAR'
}

export const  LeaseDocumentListdeleteActions = {
  delete: (id) => ({
    type: LeaseDocdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: LeaseDocdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LeaseDocdeleteActionsTypes.CLEAR
  })
}