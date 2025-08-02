export const LeasesListTypes = {
    GET_LEASESLIST_LIST: 'GET_LEASESLIST_LIST',
    SAVE_LEASESLIST_LIST_RESPONSE: 'SAVE_LEASESLIST_LIST_RESPONSE',
    CLEAR_LEASESLIST_LIST: 'CLEAR_LEASESLIST_LIST'
  }
  
  export const  LeasesListActions = {
    getleasesListlist: (params) => ({
      type: LeasesListTypes.GET_LEASESLIST_LIST,
      params
    }),
    saveleasesListlistResponse: (data) => ({
      type: LeasesListTypes.SAVE_LEASESLIST_LIST_RESPONSE,
      data
    }),
    clearleasesListlist: () => ({
      type: LeasesListTypes.CLEAR_LEASESLIST_LIST
    })
    
  }


export const LeasesListAddTypes = {
  LEASESLIST_POST: 'LEASESLIST_POST',
  LEASESLIST_POST_RESPONSE: 'LEASESLIST_POST_RESPONSE',
  LEASESLIST_POST_CLEAR: 'LEASESLIST_POST_CLEAR'
}

export const LeasesListAddAction = {
  LeasesListAdd: (data) => {
    return {
      type: LeasesListAddTypes.LEASESLIST_POST,
      payload: data
    }
  },
  saveLeasesListResponse: data => ({
    type: LeasesListAddTypes.LEASESLIST_POST_RESPONSE,
    data
  }),
  clearLeasesList: () => ({
    type: LeasesListAddTypes.LEASESLIST_POST_CLEAR
  })
}

export const LeasesListGetIdTypes = {
  GET_LEASESLIST_DETAILS: 'GET_LEASESLIST_DETAILS',
  LEASESLIST_DETAILS_RESPONSE: 'LEASESLIST_DETAILS_RESPONSE',
  CLEAR_LEASESLIST_DETAILS: 'CLEAR_LEASESLIST_DETAILS'
}

export const LeasesListGetIdActions = {
  getLeasesListIdDetails: (id) => ({
    type: LeasesListGetIdTypes.GET_LEASESLIST_DETAILS,
    id
  }),
  saveLeasesListIdDetailsResponse: data => ({
    type: LeasesListGetIdTypes.LEASESLIST_DETAILS_RESPONSE,
    data
  }),
  clearLeasesListIdDetails: () => ({
    type: LeasesListGetIdTypes.CLEAR_LEASESLIST_DETAILS
  })
}

export const updateLeasesListActionsTypes = {
  UPDATE_LEASESLIST: 'UPDATE_LEASESLIST',
  SAVE_UPDATE_LEASESLIST_RESPONSE: 'SAVE_UPDATE_LEASESLIST_RESPONSE',
  CLEAR_UPDATE_LEASESLIST: 'CLEAR_UPDATE_LEASESLIST'
}

export const updateLeasesListActions = {
  updateLeasesList: (id, params) => {
    return {
      type: updateLeasesListActionsTypes.UPDATE_LEASESLIST,
      payload:  { id, params }
    }
  },
  saveupdateLeasesListResponse: data => ({
    type: updateLeasesListActionsTypes.SAVE_UPDATE_LEASESLIST_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateLeasesList: () => ({
    type: updateLeasesListActionsTypes.CLEAR_UPDATE_LEASESLIST
  })
}

export const LeasesListdeleteActionsTypes = {
  REQUEST: 'LEASESLIST_DELETE_REQUEST',
  RESPONSE: 'LEASESLIST_DELETE_RESPONSE',
  ERROR: 'LEASESLIST_DELETE_ERROR',
  CLEAR: 'LEASESLIST_DELETE_CLEAR'
}

export const  LeasesListdeleteActions = {
  delete: (id) => ({
    type: LeasesListdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: LeasesListdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LeasesListdeleteActionsTypes.CLEAR
  })
}