export const LesseeListTypes = {
    GET_LESSEELIST_LIST: 'GET_LESSEELIST_LIST',
    SAVE_LESSEELIST_LIST_RESPONSE: 'SAVE_LESSEELIST_LIST_RESPONSE',
    CLEAR_LESSEELIST_LIST: 'CLEAR_LESSEELIST_LIST'
  }
  
  export const  LesseeListActions = {
    getlesseeList: (params) => ({
      type: LesseeListTypes.GET_LESSEELIST_LIST,
      params
    }),
    savelesseeListResponse: (data) => ({
      type: LesseeListTypes.SAVE_LESSEELIST_LIST_RESPONSE,
      data
    }),
    clearlesseeList: () => ({
      type: LesseeListTypes.CLEAR_LESSEELIST_LIST
    })
    
  }


export const LesseeListAddTypes = {
  LESSEELIST_POST: 'LESSEELIST_POST',
  LESSEELIST_POST_RESPONSE: 'LESSEELIST_POST_RESPONSE',
  LESSEELIST_POST_CLEAR: 'LESSEELIST_POST_CLEAR'
}

export const LesseeListAddAction = {
  LesseeListAdd: (data) => {
    return {
      type: LesseeListAddTypes.LESSEELIST_POST,
      payload: data
    }
  },
  saveLesseeListResponse: data => ({
    type: LesseeListAddTypes.LESSEELIST_POST_RESPONSE,
    data
  }),
  clearLesseeList: () => ({
    type: LesseeListAddTypes.LESSEELIST_POST_CLEAR
  })
}

export const LesseeListGetIdTypes = {
  GET_LESSEELIST_DETAILS: 'GET_LESSEELIST_DETAILS',
  LESSEELIST_DETAILS_RESPONSE: 'LESSEELIST_DETAILS_RESPONSE',
  CLEAR_LESSEELIST_DETAILS: 'CLEAR_LESSEELIST_DETAILS'
}

export const LesseeListGetIdActions = {
  getLesseeListIdDetails: (id) => ({
    type: LesseeListGetIdTypes.GET_LESSEELIST_DETAILS,
    id
  }),
  saveLesseeListIdDetailsResponse: data => ({
    type: LesseeListGetIdTypes.LESSEELIST_DETAILS_RESPONSE,
    data
  }),
  clearLesseeListIdDetails: () => ({
    type: LesseeListGetIdTypes.CLEAR_LESSEELIST_DETAILS
  })
}

export const updateLesseeListActionsTypes = {
  UPDATE_LESSEELIST: 'UPDATE_LESSEELIST',
  SAVE_UPDATE_LESSEELIST_RESPONSE: 'SAVE_UPDATE_LESSEELIST_RESPONSE',
  CLEAR_UPDATE_LESSEELIST: 'CLEAR_UPDATE_LESSEELIST'
}

export const updateLesseeListActions = {
  updateLesseeList: (id, params) => {
    return {
      type: updateLesseeListActionsTypes.UPDATE_LESSEELIST,
      payload:  { id, params }
    }
  },
  saveupdateLesseeListResponse: data => ({
    type: updateLesseeListActionsTypes.SAVE_UPDATE_LESSEELIST_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateLesseeList: () => ({
    type: updateLesseeListActionsTypes.CLEAR_UPDATE_LESSEELIST
  })
}

export const LesseeListdeleteActionsTypes = {
  REQUEST: 'LESSEELIST_DELETE_REQUEST',
  RESPONSE: 'LESSEELIST_DELETE_RESPONSE',
  ERROR: 'LESSEELIST_DELETE_ERROR',
  CLEAR: 'LESSEELIST_DELETE_CLEAR'
}

export const  LesseeListdeleteActions = {
  delete: (id) => ({
    type: LesseeListdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: LesseeListdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LesseeListdeleteActionsTypes.CLEAR
  })
}