
export const ApartmentTypeListTypes = {
    GET_APARTMENT_TYPE_LIST: 'GET_APARTMENT_TYPE_LIST',
    SAVE_APARTMENT_TYPE_LIST_RESPONSE: 'SAVE_APARTMENT_TYPE_LIST_RESPONSE',
    CLEAR_APARTMENT_TYPE_LIST: 'CLEAR_APARTMENT_TYPE_LIST'
  }
  
  export const ApartmentTypeActions = {
    getApartmentTypelist: (params) => ({
      type: ApartmentTypeListTypes.GET_APARTMENT_TYPE_LIST,
      params
    }),
    saveApartmentTypelistResponse: (data) => ({
      type: ApartmentTypeListTypes.SAVE_APARTMENT_TYPE_LIST_RESPONSE,
      data
    }),
    clearApartmentTypelist: () => ({
      type: ApartmentTypeListTypes.CLEAR_APARTMENT_TYPE_LIST
    })
  
  }
  
  export const ApartmentTypeAddTypes = {
    APARTMENT_TYPE_POST: 'APARTMENT_TYPE_POST',
    APARTMENT_TYPE_POST_RESPONSE: 'APARTMENT_TYPE_POST_RESPONSE',
    APARTMENT_TYPE_POST_CLEAR: 'APARTMENT_TYPE_POST_CLEAR'
  }
  
  export const ApartmentTypeAddAction = {
    PostApartmentType: (data) => {
      return {
        type: ApartmentTypeAddTypes.APARTMENT_TYPE_POST,
        payload: data
      }
    },
    saveApartmentTypeResponse: data => ({
      type: ApartmentTypeAddTypes.APARTMENT_TYPE_POST_RESPONSE,
      data
    }),
    clearApartmentType: () => ({
      type: ApartmentTypeAddTypes.APARTMENT_TYPE_POST_CLEAR
    })
  }
  
  export const ApartmentTypeGetIdTypes = {
    GET_APARTMENT_TYPE_DETAILS: 'GET_APARTMENT_TYPE_DETAILS',
    APARTMENT_TYPE_DETAILS_RESPONSE: 'APARTMENT_TYPE_DETAILS_RESPONSE',
    CLEAR_APARTMENT_TYPE_DETAILS: 'CLEAR_APARTMENT_TYPE_DETAILS'
  }
  
  export const ApartmentTypeGetIdActions = {
    getApartmentTypeIdDetails: (id) => ({
      type: ApartmentTypeGetIdTypes.GET_APARTMENT_TYPE_DETAILS,
      id
    }),
    saveApartmentTypeIdDetailsResponse: data => ({
      type: ApartmentTypeGetIdTypes.APARTMENT_TYPE_DETAILS_RESPONSE,
      data
    }),
    clearApartmentTypeIdDetails: () => ({
      type: ApartmentTypeGetIdTypes.CLEAR_APARTMENT_TYPE_DETAILS
    })
  }
  
  export const updateApartmentTypeActionTypes = {
    UPDATE_APARTMENT_TYPE: 'UPDATE_APARTMENT_TYPE',
    SAVE_UPDATE_APARTMENT_TYPE_RESPONSE: 'SAVE_UPDATE_APARTMENT_TYPE_RESPONSE',
    CLEAR_UPDATE_APARTMENT_TYPE: 'CLEAR_UPDATE_APARTMENT_TYPE'
  }
  
  export const updateApartmentTypeActions = {
    updateApartmentType: (id, params) => {
      return {
        type: updateApartmentTypeActionTypes.UPDATE_APARTMENT_TYPE,
        payload: { id, params }
      }
    },
    saveupdateApartmentTypeResponse: data => ({
      type: updateApartmentTypeActionTypes.SAVE_UPDATE_APARTMENT_TYPE_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateApartmentType: () => ({
      type: updateApartmentTypeActionTypes.CLEAR_UPDATE_APARTMENT_TYPE
    })
  }
  export const ApartmentTypedeleteActionsTypes = {
    REQUEST: 'APARTMENT_TYPE_DELETE_REQUEST',
    RESPONSE: 'APARTMENT_TYPE_DELETE_RESPONSE',
    ERROR: 'APARTMENT_TYPE_DELETE_ERROR',
    CLEAR: 'APARTMENT_TYPE_DELETE_CLEAR'
  }
  
  export const ApartmentTypedeleteActions = {
    delete: (id) => ({
      type: ApartmentTypedeleteActionsTypes.REQUEST,
      id
    }),
    saveResponse: (data) => ({
      type: ApartmentTypedeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: ApartmentTypedeleteActionsTypes.CLEAR
    })
  }