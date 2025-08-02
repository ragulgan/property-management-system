
export const StateTypes = {
    GET_STATE_LIST: 'GET_STATE_LIST',
    SAVE_STATE_LIST_RESPONSE: 'SAVE_STATE_LIST_RESPONSE',
    CLEAR_STATE_LIST: 'CLEAR_STATE_LIST'
  }
  
  export const  StateActions = {
    getStatelist: (params) => ({
      type: StateTypes.GET_STATE_LIST,
      params
    }),
    saveStatelistResponse: (data) => ({
      type: StateTypes.SAVE_STATE_LIST_RESPONSE,
      data
    }),
    clearStatelist: () => ({
      type: StateTypes.CLEAR_STATE_LIST
    })
    
  }


export const StateAddTypes = {
  STATE_POST: 'STATE_POST',
  STATE_POST_RESPONSE: 'STATE_POST_RESPONSE',
  STATE_POST_CLEAR: 'STATE_POST_CLEAR'
}

export const StateAddAction = {
  StateAdd: (data) => {
    return {
      type: StateAddTypes.STATE_POST,
      payload: data
    }
  },
  saveStateResponse: data => ({
    type: StateAddTypes.STATE_POST_RESPONSE,
    data
  }),
  clearState: () => ({
    type: StateAddTypes.STATE_POST_CLEAR
  })
}

export const StateGetIdTypes = {
  GET_STATE_DETAILS: 'GET_STATE_DETAILS',
  STATE_DETAILS_RESPONSE: 'STATE_DETAILS_RESPONSE',
  CLEAR_STATE_DETAILS: 'CLEAR_STATE_DETAILS'
}

export const StateGetIdActions = {
  getStateIdDetails: (id) => ({
    type: StateGetIdTypes.GET_STATE_DETAILS,
    id
  }),
  saveStateIdDetailsResponse: data => ({
    type: StateGetIdTypes.STATE_DETAILS_RESPONSE,
    data
  }),
  clearStateIdDetails: () => ({
    type: StateGetIdTypes.CLEAR_STATE_DETAILS
  })
}

export const updateStateActionsTypes = {
  UPDATE_STATE: 'UPDATE_STATE',
  SAVE_UPDATE_STATE_RESPONSE: 'SAVE_UPDATE_STATE_RESPONSE',
  CLEAR_UPDATE_STATE: 'CLEAR_UPDATE_STATE'
}

export const updateStateActions = {
  updateState: (id, params) => {
    return {
      type: updateStateActionsTypes.UPDATE_STATE,
      payload:  { id, params }
    }
  },
  saveupdateStateResponse: data => ({
    type: updateStateActionsTypes.SAVE_UPDATE_STATE_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateState: () => ({
    type: updateStateActionsTypes.CLEAR_UPDATE_STATE
  })
}
export const StatedeleteActionsTypes = {
  REQUEST: 'STATE_DELETE_REQUEST',
  RESPONSE: 'STATE_DELETE_RESPONSE',
  ERROR: 'STATE_DELETE_ERROR',
  CLEAR: 'STATE_DELETE_CLEAR'
}

export const  StatedeleteActions = {
  delete: (id) => ({
    type: StatedeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: StatedeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: StatedeleteActionsTypes.CLEAR
  })
}