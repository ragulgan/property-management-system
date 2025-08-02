
export const PropertyDocTypes = {
    GET_PROPERTY_DOC_LIST: 'GET_PROPERTY_DOC_LIST',
    SAVE_PROPERTY_DOC_LIST_RESPONSE: 'SAVE_PROPERTY_DOC_LIST_RESPONSE',
    CLEAR_PROPERTY_DOC_LIST: 'CLEAR_PROPERTY_DOC_LIST'
  }
  
  export const  PropertyDocumentActions = {
    getpropertyDoclist: (params) => ({
      type: PropertyDocTypes.GET_PROPERTY_DOC_LIST,
      params
    }),
    savepropertyDoclistResponse: (data) => ({
      type: PropertyDocTypes.SAVE_PROPERTY_DOC_LIST_RESPONSE,
      data
    }),
    clearpropertyDoclist: () => ({
      type: PropertyDocTypes.CLEAR_PROPERTY_DOC_LIST
    })
    
  }


export const PropertyDocAddTypes = {
  PROPERTY_DOC_POST: 'PROPERTY_DOC_POST',
  PROPERTY_POST_DOC_RESPONSE: 'PROPERTY_POST_DOC_RESPONSE',
  PROPERTY_POST_DOC_CLEAR: 'PROPERTY_POST_DOC_CLEAR'
}

export const PropertyDocumentAddAction = {
  PropertyDocAdd: (data) => {
    return {
      type: PropertyDocAddTypes.PROPERTY_DOC_POST,
      payload: data
    }
  },
  savePropertyDocResponse: data => ({
    type: PropertyDocAddTypes.PROPERTY_POST_DOC_RESPONSE,
    data
  }),
  clearPropertyDoc: () => ({
    type: PropertyDocAddTypes.PROPERTY_POST_DOC_CLEAR
  })
}

export const PropertyDocGetIdTypes = {
  GET_PROPERTY_DOC_DETAILS: 'GET_PROPERTY_DOC_DETAILS',
  PROPERTY_DETAILS_DOC_RESPONSE: 'PROPERTY_DETAILS_DOC_RESPONSE',
  CLEAR_PROPERTY_DOC_DETAILS: 'CLEAR_PROPERTY_DOC_DETAILS'
}

export const PropertyDocumentGetIdActions = {
  getPropertyDocIdDetails: (id) => ({
    type: PropertyDocGetIdTypes.GET_PROPERTY_DOC_DETAILS,
    id
  }),
  savePropertyDocIdDetailsResponse: data => ({
    type: PropertyDocGetIdTypes.PROPERTY_DETAILS_DOC_RESPONSE,
    data
  }),
  clearPropertyDocIdDetails: () => ({
    type: PropertyDocGetIdTypes.CLEAR_PROPERTY_DOC_DETAILS
  })
}

export const updatePropertyDocActionsTypes = {
  UPDATE_PROPERTY_DOC: 'UPDATE_PROPERTY_DOC',
  SAVE_UPDATE_PROPERTY_DOC_RESPONSE: 'SAVE_UPDATE_PROPERTY_DOC_RESPONSE',
  CLEAR_UPDATE_PROPERTY_DOC: 'CLEAR_UPDATE_PROPERTY_DOC'
}

export const updatePropertyDocumentActions = {
  updatePropertyDoc: (id, params) => {
    return {
      type: updatePropertyDocActionsTypes.UPDATE_PROPERTY_DOC,
      payload:  { id, params }
    }
  },
  saveupdatePropertyDocResponse: data => ({
    type: updatePropertyDocActionsTypes.SAVE_UPDATE_PROPERTY_DOC_RESPONSE,
    data
  }),
  clearupdatePropertyDoc: () => ({
    type: updatePropertyDocActionsTypes.CLEAR_UPDATE_PROPERTY_DOC
  })
}
export const PropertyDocdeleteActionsTypes = {
  REQUEST: 'PROPERTY_DOC_DELETE_REQUEST',
  RESPONSE: 'PROPERTY_DOC_DELETE_RESPONSE',
  ERROR: 'PROPERTY_DOC_DELETE_ERROR',
  CLEAR: 'PROPERTY_DOC_DELETE_CLEAR'
}

export const  PropertyDocumentdeleteActions = {
  delete: (id) => ({
    type: PropertyDocdeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: PropertyDocdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: PropertyDocdeleteActionsTypes.CLEAR
  })
}