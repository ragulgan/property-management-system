
export const PropertyDocumentTypeTypes = {
    GET_PROPERTY_DOCUMENT_TYPE_TYPE_LIST: 'GET_PROPERTY_DOCUMENT_TYPE_TYPE_LIST',
    SAVE_PROPERTY_DOCUMENT_TYPE_TYPE_LIST_RESPONSE: 'SAVE_PROPERTY_DOCUMENT_TYPE_TYPE_LIST_RESPONSE',
    CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_LIST: 'CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_LIST'
  }
  
  export const PropertyDocumentTypeActions = {
    getpropertyDocumentTypelist: (params) => ({
      type: PropertyDocumentTypeTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_LIST,
      params
    }),
    savepropertyDocumentTypelistResponse: (data) => ({
      type: PropertyDocumentTypeTypes.SAVE_PROPERTY_DOCUMENT_TYPE_TYPE_LIST_RESPONSE,
      data
    }),
    clearpropertyDocumentTypelist: () => ({
      type: PropertyDocumentTypeTypes.CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_LIST
    })
  
  }
  
  export const PropertyDocumentTypeAddTypes = {
    PROPERTY_DOCUMENT_TYPE_TYPE_POST: 'PROPERTY_DOCUMENT_TYPE_TYPE_POST',
    PROPERTY_DOCUMENT_TYPE_TYPE_POST_RESPONSE: 'PROPERTY_DOCUMENT_TYPE_TYPE_POST_RESPONSE',
    PROPERTY_DOCUMENT_TYPE_TYPE_POST_CLEAR: 'PROPERTY_DOCUMENT_TYPE_TYPE_POST_CLEAR'
  }
  
  export const PropertyDocumentTypeAddAction = {
    PropertyDocumentTypeAdd: (data) => {
      return {
        type: PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST,
        payload: data
      }
    },
    savePropertyDocumentTypeResponse: data => ({
      type: PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST_RESPONSE,
      data
    }),
    clearUSER: () => ({
      type: PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST_CLEAR
    })
  }
  
  export const PropertyDocumentTypeGetIdTypes = {
    GET_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS: 'GET_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS',
    PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS_RESPONSE: 'PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS_RESPONSE',
    CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS: 'CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS'
  }
  
  export const PropertyDocumentTypeGetIdActions = {
    getPropertyDocumentTypeIdDetails: (id) => ({
      type: PropertyDocumentTypeGetIdTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS,
      id
    }),
    savePropertyDocumentTypeIdDetailsResponse: data => ({
      type: PropertyDocumentTypeGetIdTypes.PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS_RESPONSE,
      data
    }),
    clearPropertyDocumentTypeIdDetails: () => ({
      type: PropertyDocumentTypeGetIdTypes.CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS
    })
  }
  
  export const updatePropertyDocumentTypeActionsTypes = {
    UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE: 'UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE',
    SAVE_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE_RESPONSE: 'SAVE_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE_RESPONSE',
    CLEAR_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE: 'CLEAR_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE'
  }
  
  export const updatePropertyDocumentTypeActions = {
    updatePropertyDocumentType: (id, params) => {
      return {
        type: updatePropertyDocumentTypeActionsTypes.UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE,
        payload: { id, params }
      }
    },
    saveupdatePropertyDocumentTypeResponse: data => ({
      type: updatePropertyDocumentTypeActionsTypes.SAVE_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdatePropertyDocumentType: () => ({
      type: updatePropertyDocumentTypeActionsTypes.CLEAR_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE
    })
  }
  export const PropertyDocumentTypedeleteActionsTypes = {
    REQUEST: 'PROPERTY_DOCUMENT_TYPE_TYPE_DELETE_REQUEST',
    RESPONSE: 'PROPERTY_DOCUMENT_TYPE_TYPE_DELETE_RESPONSE',
    ERROR: 'PROPERTY_DOCUMENT_TYPE_TYPE_DELETE_ERROR',
    CLEAR: 'PROPERTY_DOCUMENT_TYPE_TYPE_DELETE_CLEAR'
  }
  
  export const PropertyDocumentTypedeleteActions = {
    delete: (id) => ({
      type: PropertyDocumentTypedeleteActionsTypes.REQUEST,
      id
    }),
    savemResponse: (data) => ({
      type: PropertyDocumentTypedeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: PropertyDocumentTypedeleteActionsTypes.CLEAR
    })
  }