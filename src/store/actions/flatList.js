
export const FlatListTypes = {
    GET_FLAT_LIST: 'GET_FLAT_LIST',
    SAVE_FLAT_LIST_RESPONSE: 'SAVE_FLAT_LIST_RESPONSE',
    CLEAR_FLAT_LIST: 'CLEAR_FLAT_LIST'
  }
  
  export const FlatListActions = {
    getFlatlist: (params) => ({
      type: FlatListTypes.GET_FLAT_LIST,
      params
    }),
    saveFlatlistResponse: (data) => ({
      type: FlatListTypes.SAVE_FLAT_LIST_RESPONSE,
      data
    }),
    clearFlatlist: () => ({
      type: FlatListTypes.CLEAR_FLAT_LIST
    })
  
  }
  
  
  export const FlatAddTypes = {
    FLAT_POST: 'FLAT_POST',
    FLAT_POST_RESPONSE: 'FLAT_POST_RESPONSE',
    FLAT_POST_CLEAR: 'FLAT_POST_CLEAR'
  }
  
  export const FlatAddAction = {
    flatAdd: (data) => {
      return {
        type: FlatAddTypes.FLAT_POST,
        payload: data
      }
    },
    saveFlatAddResponse: data => ({
      type: FlatAddTypes.FLAT_POST_RESPONSE,
      data
    }),
    clearFlatAdd: () => ({
      type: FlatAddTypes.FLAT_POST_CLEAR
    })
  }
  
  export const FlatGetIdTypes = {
    GET_FLAT_DETAILS: 'GET_FLAT_DETAILS',
    FLAT_DETAILS_RESPONSE: 'FLAT_DETAILS_RESPONSE',
    CLEAR_FLAT_DETAILS: 'CLEAR_FLAT_DETAILS'
  }
  
  export const FlatGetIdActions = {
    getFlatIdDetails: (id) => ({
      type: FlatGetIdTypes.GET_FLAT_DETAILS,
      id
    }),
    saveFlatIdDetailsResponse: data => ({
      type: FlatGetIdTypes.FLAT_DETAILS_RESPONSE,
      data
    }),
    clearFlatIdDetails: () => ({
      type: FlatGetIdTypes.CLEAR_FLAT_DETAILS
    })
  }
  
  export const updateFlatActionsTypes = {
    UPDATE_FLAT: 'UPDATE_FLAT',
    SAVE_UPDATE_FLAT_RESPONSE: 'SAVE_UPDATE_FLAT_RESPONSE',
    CLEAR_UPDATE_FLAT: 'CLEAR_UPDATE_FLAT'
  }
  
  export const updateFlatActions = {
    updateFlat: (id, params) => {
      return {
        type: updateFlatActionsTypes.UPDATE_FLAT,
        payload: { id, params }
      }
    },
    saveupdateFlatResponse: data => ({
      type: updateFlatActionsTypes.SAVE_UPDATE_FLAT_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateFlat: () => ({
      type: updateFlatActionsTypes.CLEAR_UPDATE_FLAT
    })
  }
  export const FlatdeleteActionsTypes = {
    REQUEST: 'FLAT_DELETE_REQUEST',
    RESPONSE: 'FLAT_DELETE_RESPONSE',
    ERROR: 'FLAT_DELETE_ERROR',
    CLEAR: 'FLAT_DELETE_CLEAR'
  }
  
  export const FlatdeleteActions = {
    delete: (id) => ({
      type: FlatdeleteActionsTypes.REQUEST,
      id
    }),
    savemResponse: (data) => ({
      type: FlatdeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: FlatdeleteActionsTypes.CLEAR
    })
  }