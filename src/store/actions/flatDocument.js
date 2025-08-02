
export const FlatDocumentListTypes = {
    GET_FLATDOCUMENT_LIST: 'GET_FLATDOCUMENT_LIST',
    SAVE_FLATDOCUMENT_LIST_RESPONSE: 'SAVE_FLATDOCUMENT_LIST_RESPONSE',
    CLEAR_FLATDOCUMENT_LIST: 'CLEAR_FLATDOCUMENT_LIST'
  }
  
  export const FlatDocumentListActions = {
    getFlatDocumentlist: (params) => ({
      type: FlatDocumentListTypes.GET_FLATDOCUMENT_LIST,
      params
    }),
    saveFlatDocumentlistResponse: (data) => ({
      type: FlatDocumentListTypes.SAVE_FLATDOCUMENT_LIST_RESPONSE,
      data
    }),
    clearFlatDocumentlist: () => ({
      type: FlatDocumentListTypes.CLEAR_FLATDOCUMENT_LIST
    })
  
  }
  
  
  export const FlatDocumentAddTypes = {
    FLATDOCUMENT_POST: 'FLATDOCUMENT_POST',
    FLATDOCUMENT_POST_RESPONSE: 'FLATDOCUMENT_POST_RESPONSE',
    FLATDOCUMENT_POST_CLEAR: 'FLATDOCUMENT_POST_CLEAR'
  }
  
  export const FlatDocumentAddAction = {
    flatDocumentAdd: (data) => {
      return {
        type: FlatDocumentAddTypes.FLATDOCUMENT_POST,
        payload: data
      }
    },
    saveFlatDocumentAddResponse: data => ({
      type: FlatDocumentAddTypes.FLATDOCUMENT_POST_RESPONSE,
      data
    }),
    clearFlatDocumentAdd: () => ({
      type: FlatDocumentAddTypes.FLATDOCUMENT_POST_CLEAR
    })
  }
  
  export const FlatDocumentGetIdTypes = {
    GET_FLATDOCUMENT_DETAILS: 'GET_FLATDOCUMENT_DETAILS',
    FLATDOCUMENT_DETAILS_RESPONSE: 'FLATDOCUMENT_DETAILS_RESPONSE',
    CLEAR_FLATDOCUMENT_DETAILS: 'CLEAR_FLATDOCUMENT_DETAILS'
  }
  
  export const FlatDocumentGetIdActions = {
    getFlatDocumentIdDetails: (id) => ({
      type: FlatDocumentGetIdTypes.GET_FLATDOCUMENT_DETAILS,
      id
    }),
    saveFlatDocumentIdDetailsResponse: data => ({
      type: FlatDocumentGetIdTypes.FLATDOCUMENT_DETAILS_RESPONSE,
      data
    }),
    clearFlatDocumentIdDetails: () => ({
      type: FlatDocumentGetIdTypes.CLEAR_FLATDOCUMENT_DETAILS
    })
  }
  
  export const updateFlatDocumentActionsTypes = {
    UPDATE_FLATDOCUMENT: 'UPDATE_FLATDOCUMENT',
    SAVE_UPDATE_FLATDOCUMENT_RESPONSE: 'SAVE_UPDATE_FLATDOCUMENT_RESPONSE',
    CLEAR_UPDATE_FLATDOCUMENT: 'CLEAR_UPDATE_FLATDOCUMENT'
  }
  
  export const updateFlatDocumentActions = {
    updateFlatDocument: (id, params) => {
      return {
        type: updateFlatDocumentActionsTypes.UPDATE_FLATDOCUMENT,
        payload: { id, params }
      }
    },
    saveupdateFlatDocumentResponse: data => ({
      type: updateFlatDocumentActionsTypes.SAVE_UPDATE_FLATDOCUMENT_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateFlatDocument: () => ({
      type: updateFlatDocumentActionsTypes.CLEAR_UPDATE_FLATDOCUMENT
    })
  }
  export const FlatDocumentdeleteActionsTypes = {
    REQUEST: 'FLATDOCUMENT_DELETE_REQUEST',
    RESPONSE: 'FLATDOCUMENT_DELETE_RESPONSE',
    ERROR: 'FLATDOCUMENT_DELETE_ERROR',
    CLEAR: 'FLATDOCUMENT_DELETE_CLEAR'
  }
  
  export const FlatDocumentdeleteActions = {
    delete: (id) => ({
      type: FlatDocumentdeleteActionsTypes.REQUEST,
      id
    }),
    saveResponse: (data) => ({
      type: FlatDocumentdeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: FlatDocumentdeleteActionsTypes.CLEAR
    })
  }