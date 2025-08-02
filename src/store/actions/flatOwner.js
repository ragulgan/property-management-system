
export const FlatOwnerListTypes = {
    GET_FLAT_OWNER_LIST: 'GET_FLAT_OWNER_LIST',
    SAVE_FLAT_OWNER_LIST_RESPONSE: 'SAVE_FLAT_OWNER_LIST_RESPONSE',
    CLEAR_FLAT_OWNER_LIST: 'CLEAR_FLAT_OWNER_LIST'
  }
  
  export const FlatOwnerListActions = {
    getFlatOwnerlist: (params) => ({
      type: FlatOwnerListTypes.GET_FLAT_OWNER_LIST,
      params
    }),
    saveFlatOwnerlistResponse: (data) => ({
      type: FlatOwnerListTypes.SAVE_FLAT_OWNER_LIST_RESPONSE,
      data
    }),
    clearFlatOwnerlist: () => ({
      type: FlatOwnerListTypes.CLEAR_FLAT_OWNER_LIST
    })
  
  }
  
  
  export const FlatOwnerAddTypes = {
    FLAT_OWNER_POST: 'FLAT_OWNER_POST',
    FLAT_OWNER_POST_RESPONSE: 'FLAT_OWNER_POST_RESPONSE',
    FLAT_OWNER_POST_CLEAR: 'FLAT_OWNER_POST_CLEAR'
  }
  
  export const FlatOwnerAddAction = {
    flatOwnerAdd: (data) => {
      return {
        type: FlatOwnerAddTypes.FLAT_OWNER_POST,
        payload: data
      }
    },
    saveFlatOwnerAddResponse: data => ({
      type: FlatOwnerAddTypes.FLAT_OWNER_POST_RESPONSE,
      data
    }),
    clearFlatOwnerAdd: () => ({
      type: FlatOwnerAddTypes.FLAT_OWNER_POST_CLEAR
    })
  }
  
  export const FlatOwnerGetIdTypes = {
    GET_FLAT_OWNER_DETAILS: 'GET_FLAT_OWNER_DETAILS',
    FLAT_OWNER_DETAILS_RESPONSE: 'FLAT_OWNER_DETAILS_RESPONSE',
    CLEAR_FLAT_OWNER_DETAILS: 'CLEAR_FLAT_OWNER_DETAILS'
  }
  
  export const FlatOwnerGetIdActions = {
    getFlatOwnerIdDetails: (id) => ({
      type: FlatOwnerGetIdTypes.GET_FLAT_OWNER_DETAILS,
      id
    }),
    saveFlatOwnerIdDetailsResponse: data => ({
      type: FlatOwnerGetIdTypes.FLAT_OWNER_DETAILS_RESPONSE,
      data
    }),
    clearFlatOwnerIdDetails: () => ({
      type: FlatOwnerGetIdTypes.CLEAR_FLAT_OWNER_DETAILS
    })
  }
  
  export const updateFlatOwnerActionsTypes = {
    UPDATE_FLAT_OWNER: 'UPDATE_FLAT_OWNER',
    SAVE_UPDATE_FLAT_OWNER_RESPONSE: 'SAVE_UPDATE_FLAT_OWNER_RESPONSE',
    CLEAR_UPDATE_FLAT_OWNER: 'CLEAR_UPDATE_FLAT_OWNER'
  }
  
  export const updateFlatOwnerActions = {
    updateFlatOwner: (id, params) => {
      return {
        type: updateFlatOwnerActionsTypes.UPDATE_FLAT_OWNER,
        payload: { id, params }
      }
    },
    saveupdateFlatOwnerResponse: data => ({
      type: updateFlatOwnerActionsTypes.SAVE_UPDATE_FLAT_OWNER_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateFlatOwner: () => ({
      type: updateFlatOwnerActionsTypes.CLEAR_UPDATE_FLAT_OWNER
    })
  }
  export const FlatOwnerdeleteActionsTypes = {
    REQUEST: 'FLAT_OWNER_DELETE_REQUEST',
    RESPONSE: 'FLAT_OWNER_DELETE_RESPONSE',
    ERROR: 'FLAT_OWNER_DELETE_ERROR',
    CLEAR: 'FLAT_OWNER_DELETE_CLEAR'
  }
  
  export const FlatOwnerdeleteActions = {
    delete: (id) => ({
      type: FlatOwnerdeleteActionsTypes.REQUEST,
      id
    }),
    saveResponse: (data) => ({
      type: FlatOwnerdeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: FlatOwnerdeleteActionsTypes.CLEAR
    })
  }