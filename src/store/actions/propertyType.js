
export const propertiesTypes = {
    GET_PROPERTY_TYPE_LIST: 'GET_PROPERTY_TYPE_LIST',
    SAVE_PROPERTY_TYPE_LIST_RESPONSE: 'SAVE_PROPERTY_TYPE_LIST_RESPONSE',
    CLEAR_PROPERTY_TYPE_LIST: 'CLEAR_PROPERTY_TYPE_LIST'
  }
  
  export const PropertiesActions = {
    getpropertyTypelist: (params) => ({
      type: propertiesTypes.GET_PROPERTY_TYPE_LIST,
      params
    }),
    savepropertyTypelistResponse: (data) => ({
      type: propertiesTypes.SAVE_PROPERTY_TYPE_LIST_RESPONSE,
      data
    }),
    clearpropertyTypelist: () => ({
      type: propertiesTypes.CLEAR_PROPERTY_TYPE_LIST
    })
    
  }


export const PropertiesAddTypes = {
  PROPERTY_TYPE_POST: 'PROPERTY_TYPE_POST',
  PROPERTY_TYPE_POST_RESPONSE: 'PROPERTY_TYPE_POST_RESPONSE',
  PROPERTY_TYPE_POST_CLEAR: 'PROPERTY_TYPE_POST_CLEAR'
}

export const PropertiesAddAction = {
  PropertiesAdd: (data) => {
    return {
      type: PropertiesAddTypes.PROPERTY_TYPE_POST,
      payload: data
    }
  },
  savePropertiesResponse: data => ({
    type: PropertiesAddTypes.PROPERTY_TYPE_POST_RESPONSE,
    data
  }),
  clearProperties: () => ({
    type: PropertiesAddTypes.PROPERTY_TYPE_POST_CLEAR
  })
}

export const PropertiesGetIdTypes = {
  GET_PROPERTY_TYPE_DETAILS: 'GET_PROPERTY_TYPE_DETAILS',
  PROPERTY_TYPE_DETAILS_RESPONSE: 'PROPERTY_TYPE_DETAILS_RESPONSE',
  CLEAR_PROPERTY_TYPE_DETAILS: 'CLEAR_PROPERTY_TYPE_DETAILS'
}

export const PropertiesGetIdActions = {
  getPropertiesIdDetails: (id) => ({
    type: PropertiesGetIdTypes.GET_PROPERTY_TYPE_DETAILS,
    id
  }),
  savePropertiesIdDetailsResponse: data => ({
    type: PropertiesGetIdTypes.PROPERTY_TYPE_DETAILS_RESPONSE,
    data
  }),
  clearPropertiesIdDetails: () => ({
    type: PropertiesGetIdTypes.CLEAR_PROPERTY_TYPE_DETAILS
  })
}

export const updatePropertiesActionsTypes = {
  UPDATE_PROPERTY_TYPE: 'UPDATE_PROPERTY_TYPE',
  SAVE_UPDATE_PROPERTY_TYPE_RESPONSE: 'SAVE_UPDATE_PROPERTY_TYPE_RESPONSE',
  CLEAR_UPDATE_PROPERTY_TYPE: 'CLEAR_UPDATE_PROPERTY_TYPE'
}

export const updatePropertiesActions = {
  updateProperties: (id, params) => {
    return {
      type: updatePropertiesActionsTypes.UPDATE_PROPERTY_TYPE,
      payload:  { id, params }
    }
  },
  saveupdatePropertiesResponse: data => ({
    type: updatePropertiesActionsTypes.SAVE_UPDATE_PROPERTY_TYPE_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateProperties: () => ({
    type: updatePropertiesActionsTypes.CLEAR_UPDATE_PROPERTY_TYPE
  })
}
export const PropertiesdeleteActionsTypes = {
  REQUEST: 'PROPERTY_TYPE_DELETE_REQUEST',
  RESPONSE: 'PROPERTY_TYPE_DELETE_RESPONSE',
  ERROR: 'PROPERTY_TYPE_DELETE_ERROR',
  CLEAR: 'PROPERTY_TYPE_DELETE_CLEAR'
}

export const  PropertiesdeleteActions = {
  delete: (id) => ({
    type: PropertiesdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: PropertiesdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: PropertiesdeleteActionsTypes.CLEAR
  })
}