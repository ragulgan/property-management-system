export const PropertyTypes = {
  GET_PROPERTY_LIST: 'GET_PROPERTY_LIST',
  SAVE_PROPERTY_LIST_RESPONSE: 'SAVE_PROPERTY_LIST_RESPONSE',
  CLEAR_PROPERTY_LIST: 'CLEAR_PROPERTY_LIST'
}

export const PropertyActions = {
  getpropertylist: (params) => ({
    type: PropertyTypes.GET_PROPERTY_LIST,
    params
  }),
  savepropertylistResponse: (data) => ({
    type: PropertyTypes.SAVE_PROPERTY_LIST_RESPONSE,
    data
  }),
  clearpropertylist: () => ({
    type: PropertyTypes.CLEAR_PROPERTY_LIST
  })

}


export const PropertyAddTypes = {
  PROPERTY_POST: 'PROPERTY_POST',
  PROPERTY_POST_RESPONSE: 'PROPERTY_POST_RESPONSE',
  PROPERTY_POST_CLEAR: 'PROPERTY_POST_CLEAR'
}

export const PropertyAddAction = {
  PropertyAdd: (data) => {
    return {
      type: PropertyAddTypes.PROPERTY_POST,
      payload: data
    }
  },
  savePropertyResponse: data => ({
    type: PropertyAddTypes.PROPERTY_POST_RESPONSE,
    data
  }),
  clearProperty: () => ({
    type: PropertyAddTypes.PROPERTY_POST_CLEAR
  })
}

export const PropertyGetIdTypes = {
  GET_PROPERTY_DETAILS: 'GET_PROPERTY_DETAILS',
  PROPERTY_DETAILS_RESPONSE: 'PROPERTY_DETAILS_RESPONSE',
  CLEAR_PROPERTY_DETAILS: 'CLEAR_PROPERTY_DETAILS'
}

export const PropertyGetIdActions = {
  getPropertyIdDetails: (id) => ({
    type: PropertyGetIdTypes.GET_PROPERTY_DETAILS,
    id
  }),
  savePropertyIdDetailsResponse: data => ({
    type: PropertyGetIdTypes.PROPERTY_DETAILS_RESPONSE,
    data
  }),
  clearPropertyIdDetails: () => ({
    type: PropertyGetIdTypes.CLEAR_PROPERTY_DETAILS
  })
}

export const updatePropertyActionsTypes = {
  UPDATE_PROPERTY: 'UPDATE_PROPERTY',
  SAVE_UPDATE_PROPERTY_RESPONSE: 'SAVE_UPDATE_PROPERTY_RESPONSE',
  CLEAR_UPDATE_PROPERTY: 'CLEAR_UPDATE_PROPERTY'
}

export const updatePropertyActions = {
  updateProperty: (id, params) => {
    return {
      type: updatePropertyActionsTypes.UPDATE_PROPERTY,
      payload: { id, params }
    }
  },
  saveupdatePropertyResponse: data => ({
    type: updatePropertyActionsTypes.SAVE_UPDATE_PROPERTY_RESPONSE,
    data
  }),
  clearupdateProperty: () => ({
    type: updatePropertyActionsTypes.CLEAR_UPDATE_PROPERTY
  })
}

export const PropertydeleteActionsTypes = {
  REQUEST: 'PROPERTY_DELETE_REQUEST',
  RESPONSE: 'PROPERTY_DELETE_RESPONSE',
  ERROR: 'PROPERTY_DELETE_ERROR',
  CLEAR: 'PROPERTY_DELETE_CLEAR'
}

export const PropertydeleteActions = {
  delete: (id) => ({
    type: PropertydeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: PropertydeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: PropertydeleteActionsTypes.CLEAR
  })
}