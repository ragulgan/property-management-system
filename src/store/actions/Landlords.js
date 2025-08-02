
export const LandlordsTypes = {
  GET_LANDLORD_LIST: 'GET_LANDLORD_LIST',
  SAVE_LANDLORD_LIST_RESPONSE: 'SAVE_LANDLORD_LIST_RESPONSE',
  CLEAR_LANDLORD_LIST: 'CLEAR_LANDLORD_LIST'
}

export const LandlordsActions = {
  getlandlordslist: (params) => ({
    type: LandlordsTypes.GET_LANDLORD_LIST,
    params
  }),
  savelandlordslistResponse: (data) => ({
    type: LandlordsTypes.SAVE_LANDLORD_LIST_RESPONSE,
    data
  }),
  clearlandlordslist: () => ({
    type: LandlordsTypes.CLEAR_LANDLORD_LIST
  })

}

export const LandlordsAddTypes = {
  LANDLORD_POST: 'LANDLORD_POST',
  LANDLORD_POST_RESPONSE: 'LANDLORD_POST_RESPONSE',
  LANDLORD_POST_CLEAR: 'LANDLORD_POST_CLEAR'
}

export const LandlordsAddAction = {
  LandlordsAdd: (data) => {
    return {
      type: LandlordsAddTypes.LANDLORD_POST,
      payload: data
    }
  },
  saveLandlordsResponse: data => ({
    type: LandlordsAddTypes.LANDLORD_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: LandlordsAddTypes.LANDLORD_POST_CLEAR
  })
}

export const LandlordsGetIdTypes = {
  GET_LANDLORD_DETAILS: 'GET_LANDLORD_DETAILS',
  LANDLORD_DETAILS_RESPONSE: 'LANDLORD_DETAILS_RESPONSE',
  CLEAR_LANDLORD_DETAILS: 'CLEAR_LANDLORD_DETAILS'
}

export const LandlordsGetIdActions = {
  getLandlordsIdDetails: (id) => ({
    type: LandlordsGetIdTypes.GET_LANDLORD_DETAILS,
    id
  }),
  saveLandlordsIdDetailsResponse: data => ({
    type: LandlordsGetIdTypes.LANDLORD_DETAILS_RESPONSE,
    data
  }),
  clearLandlordsIdDetails: () => ({
    type: LandlordsGetIdTypes.CLEAR_LANDLORD_DETAILS
  })
}

export const updateLandlordsActionsTypes = {
  UPDATE_LANDLORD: 'UPDATE_LANDLORD',
  SAVE_UPDATE_LANDLORD_RESPONSE: 'SAVE_UPDATE_LANDLORD_RESPONSE',
  CLEAR_UPDATE_LANDLORD: 'CLEAR_UPDATE_LANDLORD'
}

export const updateLandlordsActions = {
  updateLandlords: (id, params) => {
    return {
      type: updateLandlordsActionsTypes.UPDATE_LANDLORD,
      payload: { id, params }
    }
  },
  saveupdateLandlordsResponse: data => ({
    type: updateLandlordsActionsTypes.SAVE_UPDATE_LANDLORD_RESPONSE,
    data
  }),
  clearupdateLandlords: () => ({
    type: updateLandlordsActionsTypes.CLEAR_UPDATE_LANDLORD
  })
}
export const LandlordsdeleteActionsTypes = {
  REQUEST: 'LANDLORD_DELETE_REQUEST',
  RESPONSE: 'LANDLORD_DELETE_RESPONSE',
  ERROR: 'LANDLORD_DELETE_ERROR',
  CLEAR: 'LANDLORD_DELETE_CLEAR'
}

export const LandlordsdeleteActions = {
  delete: (id) => ({
    type: LandlordsdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: LandlordsdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: LandlordsdeleteActionsTypes.CLEAR
  })
}