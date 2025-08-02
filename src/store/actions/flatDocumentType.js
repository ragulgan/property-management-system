
export const FlatDocumentTypeListTypes = {
    GET_FLATDOCUMENTTYPE_LIST: 'GET_FLATDOCUMENTTYPE_LIST',
    SAVE_FLATDOCUMENTTYPE_LIST_RESPONSE: 'SAVE_FLATDOCUMENTTYPE_LIST_RESPONSE',
    CLEAR_FLATDOCUMENTTYPE_LIST: 'CLEAR_FLATDOCUMENTTYPE_LIST'
  }
  
  export const FlatDocumentTypeListActions = {
    getFlatDocumentTypelist: (params) => ({
      type: FlatDocumentTypeListTypes.GET_FLATDOCUMENTTYPE_LIST,
      params
    }),
    saveFlatDocumentTypelistResponse: (data) => ({
      type: FlatDocumentTypeListTypes.SAVE_FLATDOCUMENTTYPE_LIST_RESPONSE,
      data
    }),
    clearFlatDocumentTypelist: () => ({
      type: FlatDocumentTypeListTypes.CLEAR_FLATDOCUMENTTYPE_LIST
    })
  
  }
  
  
  export const FlatDocumentTypeAddTypes = {
    FLATDOCUMENTTYPE_POST: 'FLATDOCUMENTTYPE_POST',
    FLATDOCUMENTTYPE_POST_RESPONSE: 'FLATDOCUMENTTYPE_POST_RESPONSE',
    FLATDOCUMENTTYPE_POST_CLEAR: 'FLATDOCUMENTTYPE_POST_CLEAR'
  }
  
  export const FlatDocumentTypeAddAction = {
    flatDocumentTypeAdd: (data) => {
      return {
        type: FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST,
        payload: data
      }
    },
    saveFlatDocumentTypeAddResponse: data => ({
      type: FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST_RESPONSE,
      data
    }),
    clearFlatDocumentTypeAdd: () => ({
      type: FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST_CLEAR
    })
  }
  
  export const FlatDocumentTypeGetIdTypes = {
    GET_FLATDOCUMENTTYPE_DETAILS: 'GET_FLATDOCUMENTTYPE_DETAILS',
    FLATDOCUMENTTYPE_DETAILS_RESPONSE: 'FLATDOCUMENTTYPE_DETAILS_RESPONSE',
    CLEAR_FLATDOCUMENTTYPE_DETAILS: 'CLEAR_FLATDOCUMENTTYPE_DETAILS'
  }
  
  export const FlatDocumentTypeGetIdActions = {
    getFlatDocumentTypeIdDetails: (id) => ({
      type: FlatDocumentTypeGetIdTypes.GET_FLATDOCUMENTTYPE_DETAILS,
      id
    }),
    saveFlatDocumentTypeIdDetailsResponse: data => ({
      type: FlatDocumentTypeGetIdTypes.FLATDOCUMENTTYPE_DETAILS_RESPONSE,
      data
    }),
    clearFlatDocumentTypeIdDetails: () => ({
      type: FlatDocumentTypeGetIdTypes.CLEAR_FLATDOCUMENTTYPE_DETAILS
    })
  }
  
  export const updateFlatDocumentTypeActionsTypes = {
    UPDATE_FLATDOCUMENTTYPE: 'UPDATE_FLATDOCUMENTTYPE',
    SAVE_UPDATE_FLATDOCUMENTTYPE_RESPONSE: 'SAVE_UPDATE_FLATDOCUMENTTYPE_RESPONSE',
    CLEAR_UPDATE_FLATDOCUMENTTYPE: 'CLEAR_UPDATE_FLATDOCUMENTTYPE'
  }
  
  export const updateFlatDocumentTypeActions = {
    updateFlatDocumentType: (id, params) => {
      return {
        type: updateFlatDocumentTypeActionsTypes.UPDATE_FLATDOCUMENTTYPE,
        payload: { id, params }
      }
    },
    saveupdateFlatDocumentTypeResponse: data => ({
      type: updateFlatDocumentTypeActionsTypes.SAVE_UPDATE_FLATDOCUMENTTYPE_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateFlatDocumentType: () => ({
      type: updateFlatDocumentTypeActionsTypes.CLEAR_UPDATE_FLATDOCUMENTTYPE
    })
  }
  export const FlatDocumentTypedeleteActionsTypes = {
    REQUEST: 'FLATDOCUMENTTYPE_DELETE_REQUEST',
    RESPONSE: 'FLATDOCUMENTTYPE_DELETE_RESPONSE',
    ERROR: 'FLATDOCUMENTTYPE_DELETE_ERROR',
    CLEAR: 'FLATDOCUMENTTYPE_DELETE_CLEAR'
  }
  
  export const FlatDocumentTypedeleteActions = {
    delete: (id) => ({
      type: FlatDocumentTypedeleteActionsTypes.REQUEST,
      id
    }),
    saveResponse: (data) => ({
      type: FlatDocumentTypedeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: FlatDocumentTypedeleteActionsTypes.CLEAR
    })
  }