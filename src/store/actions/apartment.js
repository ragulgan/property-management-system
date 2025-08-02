
export const getApartmentList = {
  REQUEST: 'GET_APARTMENT_LIST',
  RESPONSE: 'RESPONSE_APARTENT_LIST',
  CLEAR: 'CLEAR_APARTMENT_LIST'
}

export const getApartmentListActions = {
  get: (params) => ({
    type: getApartmentList.REQUEST,
    params
  }),
  saveResponse: (data) => ({
    type: getApartmentList.RESPONSE,
    data
  }),
  clear: () => ({
    type: getApartmentList.CLEAR
  })
}


export const postApartmentTypes = {
  REQUEST: 'POST_APARTMENT_REQUEST',
  RESPONSE: 'POST_APARTMENT_RESPONSE',
  CLEAR: 'POST_APARTMENT_CLEAR'
}

export const postApartmentAction = {
  add: (data) => {
    return {
      type: postApartmentTypes.REQUEST,
      payload: data
    }
  },
  saveResponse: data => ({
    type: postApartmentTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: postApartmentTypes.CLEAR
  })
}

export const getApartmentDetialsTypes = {
  REQUEST: 'GET_APARTMENT_DETAILS',
  RESPONSE: 'GET_APARTMENT_DETAILS_RESPONSE',
  CLEAR: 'CLEAR_APARTMENT_DETAILS'
}

export const getApartmentDetialsActions = {
  getDetails: (id) => ({
    type: getApartmentDetialsTypes.REQUEST,
    id
  }),
  saveResponse: data => ({
    type: getApartmentDetialsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: getApartmentDetialsTypes.CLEAR
  })
}

export const updateApartmentActionsTypes = {
  REQUEST: 'UPDATE_APARTMENT',
  RESPONSE: 'SAVE_UPDATE_APARTMENT_RESPONSE',
  CLEAR: 'CLEAR_UPDATE_APARTMENT'
}

export const updateApartmentActions = {
  update: (id, params) => {
    return {
      type: updateApartmentActionsTypes.REQUEST,
      payload: { id, params }
    }
  },
  saveResponse: data => ({
    type: updateApartmentActionsTypes.RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clear: () => ({
    type: updateApartmentActionsTypes.CLEAR
  })
}
export const deleteApartmentActionsTypes = {
  REQUEST: 'DELETE_APARTMENT_REQUEST',
  RESPONSE: 'DELETE_APARTMENT_RESPONSE',
  ERROR: 'DELETE_APARTMENT_ERROR',
  CLEAR: 'DELETE_APARTMENT_CLEAR'
}

export const deleteApartmentActions = {
  delete: (id) => ({
    type: deleteApartmentActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: deleteApartmentActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: deleteApartmentActionsTypes.CLEAR
  })
}