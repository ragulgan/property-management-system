
export const LeaseDocumentTypes = {
  GET_DOCUMENT_LEASE_TYPE_LIST: 'GET_DOCUMENT_LEASE_TYPE_LIST',
  SAVE_DOCUMENT_LEASE_TYPE_LIST_RESPONSE: 'SAVE_DOCUMENT_LEASE_TYPE_LIST_RESPONSE',
  CLEAR_DOCUMENT_LEASE_TYPE_LIST: 'CLEAR_DOCUMENT_LEASE_TYPE_LIST'
}

export const LeaseDocumentActions = {
  getleaselist: (params) => ({
    type: LeaseDocumentTypes.GET_DOCUMENT_LEASE_TYPE_LIST,
    params
  }),
  saveleaselistResponse: (data) => ({
    type: LeaseDocumentTypes.SAVE_DOCUMENT_LEASE_TYPE_LIST_RESPONSE,
    data
  }),
  clearleaselist: () => ({
    type: LeaseDocumentTypes.CLEAR_DOCUMENT_LEASE_TYPE_LIST
  })

}

export const LeaseDocumentAddTypes = {
  DOCUMENT_LEASE_TYPE_POST: 'DOCUMENT_LEASE_TYPE_POST',
  DOCUMENT_LEASE_TYPE_POST_RESPONSE: 'DOCUMENT_LEASE_TYPE_POST_RESPONSE',
  DOCUMENT_LEASE_TYPE_POST_CLEAR: 'DOCUMENT_LEASE_TYPE_POST_CLEAR'
}

export const LeaseDocumentAddAction = {
  LeaseDocumentAdd: (data) => {
    return {
      type: LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST,
      payload: data
    }
  },
  saveLeaseDocumentResponse: data => ({
    type: LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST_CLEAR
  })
}

export const LeaseDocumentGetIdTypes = {
  GET_DOCUMENT_LEASE_TYPE_DETAILS: 'GET_DOCUMENT_LEASE_TYPE_DETAILS',
  DOCUMENT_LEASE_TYPE_DETAILS_RESPONSE: 'DOCUMENT_LEASE_TYPE_DETAILS_RESPONSE',
  CLEAR_DOCUMENT_LEASE_TYPE_DETAILS: 'CLEAR_DOCUMENT_LEASE_TYPE_DETAILS'
}

export const LeaseDocumentGetIdActions = {
  getLeaseDocumentIdDetails: (id) => ({
    type: LeaseDocumentGetIdTypes.GET_DOCUMENT_LEASE_TYPE_DETAILS,
    id
  }),
  saveLeaseDocumentIdDetailsResponse: data => ({
    type: LeaseDocumentGetIdTypes.DOCUMENT_LEASE_TYPE_DETAILS_RESPONSE,
    data
  }),
  clearLeaseDocumentIdDetails: () => ({
    type: LeaseDocumentGetIdTypes.CLEAR_DOCUMENT_LEASE_TYPE_DETAILS
  })
}

export const updateLeaseDocumentActionsTypes = {
  UPDATE_DOCUMENT_LEASE_TYPE: 'UPDATE_DOCUMENT_LEASE_TYPE',
  SAVE_UPDATE_DOCUMENT_LEASE_TYPE_RESPONSE: 'SAVE_UPDATE_DOCUMENT_LEASE_TYPE_RESPONSE',
  CLEAR_UPDATE_DOCUMENT_LEASE_TYPE: 'CLEAR_UPDATE_DOCUMENT_LEASE_TYPE'
}

export const updateLeaseDocumentActions = {
  updateLeaseDocument: (id, params) => {
    return {
      type: updateLeaseDocumentActionsTypes.UPDATE_DOCUMENT_LEASE_TYPE,
      payload: { id, params }
    }
  },
  saveupdateLeaseDocumentResponse: data => ({
    type: updateLeaseDocumentActionsTypes.SAVE_UPDATE_DOCUMENT_LEASE_TYPE_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateLeaseDocument: () => ({
    type: updateLeaseDocumentActionsTypes.CLEAR_UPDATE_DOCUMENT_LEASE_TYPE
  })
}
export const LeaseDocumentdeleteActionsTypes = {
  REQUEST: 'DOCUMENT_LEASE_TYPE_DELETE_REQUEST',
  RESPONSE: 'DOCUMENT_LEASE_TYPE_DELETE_RESPONSE',
  ERROR: 'DOCUMENT_LEASE_TYPE_DELETE_ERROR',
  CLEAR: 'DOCUMENT_LEASE_TYPE_DELETE_CLEAR'
}

export const LeaseDocumentdeleteActions = {
  delete: (id) => ({
    type: LeaseDocumentdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: LeaseDocumentdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LeaseDocumentdeleteActionsTypes.CLEAR
  })
}