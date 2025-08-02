
export const getPropertyListTypes = {
  REQUEST: 'GET_PROPERTY_LIST',
  RESPONSE: 'RESPONSE_PROPERTY_LIST',
  CLEAR: 'CLEAR_PROPERTY_LIST'
}

export const getPropertyListActions = {
  get: (params) => ({
    type: getPropertyListTypes.REQUEST,
    params
  }),
  saveResponse: (data) => ({
    type: getPropertyListTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: getPropertyListTypes.CLEAR
  })
}

export const postPropertyTypes = {
  REQUEST: 'POST_PROPERTY_REQUEST',
  RESPONSE: 'POST_PROPERTY_RESPONSE',
  CLEAR: 'POST_PROPERTY_CLEAR'
}

export const postPropertyAction = {
  add: (data) => {
    return {
      type: postPropertyTypes.REQUEST,
      payload: data
    }
  },
  saveResponse: data => ({
    type: postPropertyTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: postPropertyTypes.CLEAR
  })
}

export const getPropertytDetialsTypes = {
  REQUEST: 'GET_PROPERTY_DETAILS',
  RESPONSE: 'GET_PROPERTY_DETAILS_RESPONSE',
  CLEAR: 'CLEAR_PROPERTY_DETAILS'
}

export const getPropertytDetialsActions = {
  getDetails: (id) => ({
    type: getPropertytDetialsTypes.GET_DOCUMENT_LEASE_TYPE_DETAILS,
    id
  }),
  saveResponse: data => ({
    type: getPropertytDetialsTypes.DOCUMENT_LEASE_TYPE_DETAILS_RESPONSE,
    data
  }),
  clear: () => ({
    type: getPropertytDetialsTypes.CLEAR_DOCUMENT_LEASE_TYPE_DETAILS
  })
}

export const updatePropertytActionsTypes = {
  REQUEST: 'UPDATE_PROPERTY_TYPE',
  RESPONSE: 'SAVE_UPDATE_PROPERTY_TYPE_RESPONSE',
  CLEAR: 'CLEAR_UPDATE_PROPERTY_TYPE'
}

export const updatePropertytActions = {
  update: (id, params) => {
    return {
      type: updatePropertytActionsTypes.REQUEST,
      payload: { id, params }
    }
  },
  saveResponse: data => ({
    type: updatePropertytActionsTypes.RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clear: () => ({
    type: updatePropertytActionsTypes.CLEAR
  })
}
export const deletePropertytActionsTypes = {
  REQUEST: 'DELETE_PROPERTY_REQUEST',
  RESPONSE: 'DELETE_PROPERTY_RESPONSE',
  ERROR: 'DELETE_PROPERTY_ERROR',
  CLEAR: 'DELETE_PROPERTY_CLEAR'
}

export const deletePropertytActions = {
  delete: (id) => ({
    type: deletePropertytActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: deletePropertytActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: deletePropertytActionsTypes.CLEAR
  })
}