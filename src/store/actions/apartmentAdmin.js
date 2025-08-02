
export const ApartmentAdminTypes = {
    GET_APARTMENTADMIN_LIST: 'GET_APARTMENTADMIN_LIST',
    SAVE_APARTMENTADMIN_LIST_RESPONSE: 'SAVE_APARTMENTADMIN_LIST_RESPONSE',
    CLEAR_APARTMENTADMIN_LIST: 'CLEAR_APARTMENTADMIN_LIST'
  }
  
  export const ApartmentAdminActions = {
    getApartmentAdminlist: (params) => ({
      type: ApartmentAdminTypes.GET_APARTMENTADMIN_LIST,
      params
    }),
    saveApartmentAdminlistResponse: (data) => ({
      type: ApartmentAdminTypes.SAVE_APARTMENTADMIN_LIST_RESPONSE,
      data
    }),
    clearApartmentAdminlist: () => ({
      type: ApartmentAdminTypes.CLEAR_APARTMENTADMIN_LIST
    })
  
  }
  
  
  export const ApartmentAdminAddTypes = {
    APARTMENTADMIN_POST: 'APARTMENTADMIN_POST',
    APARTMENTADMIN_POST_RESPONSE: 'APARTMENTADMIN_POST_RESPONSE',
    APARTMENTADMIN_POST_CLEAR: 'APARTMENTADMIN_POST_CLEAR'
  }
  
  export const ApartmentAdminAddAction = {
    apartmentAdminAdd: (data) => {
      return {
        type: ApartmentAdminAddTypes.APARTMENTADMIN_POST,
        payload: data
      }
    },
    saveApartmentAdminResponse: data => ({
      type: ApartmentAdminAddTypes.APARTMENTADMIN_POST_RESPONSE,
      data
    }),
    clearApartmentAdmin: () => ({
      type: ApartmentAdminAddTypes.APARTMENTADMIN_POST_CLEAR
    })
  }
  
  export const ApartmentAdminGetIdTypes = {
    GET_APARTMENTADMIN_DETAILS: 'GET_APARTMENTADMIN_DETAILS',
    APARTMENTADMIN_DETAILS_RESPONSE: 'APARTMENTADMIN_DETAILS_RESPONSE',
    CLEAR_APARTMENTADMIN_DETAILS: 'CLEAR_APARTMENTADMIN_DETAILS'
  }
  
  export const ApartmentAdminGetIdActions = {
    getApartmentAdminIdDetails: (id) => ({
      type: ApartmentAdminGetIdTypes.GET_APARTMENTADMIN_DETAILS,
      id
    }),
    saveApartmentAdminIdDetailsResponse: data => ({
      type: ApartmentAdminGetIdTypes.APARTMENTADMIN_DETAILS_RESPONSE,
      data
    }),
    clearApartmentAdminIdDetails: () => ({
      type: ApartmentAdminGetIdTypes.CLEAR_APARTMENTADMIN_DETAILS
    })
  }
  
  export const updateApartmentAdminActionsTypes = {
    UPDATE_APARTMENTADMIN: 'UPDATE_APARTMENTADMIN',
    SAVE_UPDATE_APARTMENTADMIN_RESPONSE: 'SAVE_UPDATE_APARTMENTADMIN_RESPONSE',
    CLEAR_UPDATE_APARTMENTADMIN: 'CLEAR_UPDATE_APARTMENTADMIN'
  }
  
  export const updateApartmentAdminActions = {
    updateApartmentAdmin: (id, params) => {
      return {
        type: updateApartmentAdminActionsTypes.UPDATE_APARTMENTADMIN,
        payload: { id, params }
      }
    },
    saveupdateApartmentAdminResponse: data => ({
      type: updateApartmentAdminActionsTypes.SAVE_UPDATE_APARTMENTADMIN_RESPONSE,
      data,
      status: data.status,
      message: data.message
    }),
    clearupdateApartmentAdmin: () => ({
      type: updateApartmentAdminActionsTypes.CLEAR_UPDATE_APARTMENTADMIN
    })
  }
  export const ApartmentAdmindeleteActionsTypes = {
    REQUEST: 'APARTMENTADMIN_DELETE_REQUEST',
    RESPONSE: 'APARTMENTADMIN_DELETE_RESPONSE',
    ERROR: 'APARTMENTADMIN_DELETE_ERROR',
    CLEAR: 'APARTMENTADMIN_DELETE_CLEAR'
  }
  
  export const ApartmentAdmindeleteActions = {
    delete: (id) => ({
      type: ApartmentAdmindeleteActionsTypes.REQUEST,
      id
    }),
    savemResponse: (data) => ({
      type: ApartmentAdmindeleteActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: ApartmentAdmindeleteActionsTypes.CLEAR
    })
  }