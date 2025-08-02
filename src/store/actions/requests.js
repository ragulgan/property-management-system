export const RequestListTypes = {
  GET_REQUESTLIST_LIST: 'GET_REQUESTLIST_LIST',
  SAVE_REQUESTLIST_LIST_RESPONSE: 'SAVE_REQUESTLIST_LIST_RESPONSE',
  CLEAR_REQUESTLIST_LIST: 'CLEAR_REQUESTLIST_LIST'
}

export const RequestListActions = {
  getrequestList: (params) => ({
    type: RequestListTypes.GET_REQUESTLIST_LIST,
    params
  }),
  saverequestListResponse: (data) => ({
    type: RequestListTypes.SAVE_REQUESTLIST_LIST_RESPONSE,
    data
  }),
  clearrequestList: () => ({
    type: RequestListTypes.CLEAR_REQUESTLIST_LIST
  })

}


export const RequestListAddTypes = {
  REQUESTLIST_POST: 'REQUESTLIST_POST',
  REQUESTLIST_POST_RESPONSE: 'REQUESTLIST_POST_RESPONSE',
  REQUESTLIST_POST_CLEAR: 'REQUESTLIST_POST_CLEAR'
}

export const RequestListAddAction = {
  RequestListAdd: (data) => {
    return {
      type: RequestListAddTypes.REQUESTLIST_POST,
      payload: data
    }
  },
  saveRequestListResponse: data => ({
    type: RequestListAddTypes.REQUESTLIST_POST_RESPONSE,
    data
  }),
  clearRequestList: () => ({
    type: RequestListAddTypes.REQUESTLIST_POST_CLEAR
  })
}

export const RequestListGetIdTypes = {
  GET_REQUESTLIST_DETAILS: 'GET_REQUESTLIST_DETAILS',
  REQUESTLIST_DETAILS_RESPONSE: 'REQUESTLIST_DETAILS_RESPONSE',
  CLEAR_REQUESTLIST_DETAILS: 'CLEAR_REQUESTLIST_DETAILS'
}

export const RequestListGetIdActions = {
  getRequestListIdDetails: (id) => ({
    type: RequestListGetIdTypes.GET_REQUESTLIST_DETAILS,
    id
  }),
  saveRequestListIdDetailsResponse: data => ({
    type: RequestListGetIdTypes.REQUESTLIST_DETAILS_RESPONSE,
    data
  }),
  clearRequestListIdDetails: () => ({
    type: RequestListGetIdTypes.CLEAR_REQUESTLIST_DETAILS
  })
}

export const updateRequestListActionsTypes = {
  UPDATE_REQUESTLIST: 'UPDATE_REQUESTLIST',
  SAVE_UPDATE_REQUESTLIST_RESPONSE: 'SAVE_UPDATE_REQUESTLIST_RESPONSE',
  CLEAR_UPDATE_REQUESTLIST: 'CLEAR_UPDATE_REQUESTLIST'
}

export const updateRequestListActions = {
  updateRequestList: (id, params) => {
    return {
      type: updateRequestListActionsTypes.UPDATE_REQUESTLIST,
      payload: { id, params }
    }
  },
  saveupdateRequestListResponse: data => ({
    type: updateRequestListActionsTypes.SAVE_UPDATE_REQUESTLIST_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateRequestList: () => ({
    type: updateRequestListActionsTypes.CLEAR_UPDATE_REQUESTLIST
  })
}

export const RequestListdeleteActionsTypes = {
  REQUEST: 'REQUESTLIST_DELETE_REQUEST',
  RESPONSE: 'REQUESTLIST_DELETE_RESPONSE',
  ERROR: 'REQUESTLIST_DELETE_ERROR',
  CLEAR: 'REQUESTLIST_DELETE_CLEAR'
}

export const RequestListdeleteActions = {
  delete: (id) => ({
    type: RequestListdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: RequestListdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: RequestListdeleteActionsTypes.CLEAR
  })
}