
export const CityTypes = {
    GET_CITY_LIST: 'GET_CITY_LIST',
    SAVE_CITY_LIST_RESPONSE: 'SAVE_CITY_LIST_RESPONSE',
    CLEAR_CITY_LIST: 'CLEAR_CITY_LIST'
  }
  
  export const  CityActions = {
    getcitylist: (params) => ({
      type: CityTypes.GET_CITY_LIST,
      params
    }),
    savecitylistResponse: (data) => ({
      type: CityTypes.SAVE_CITY_LIST_RESPONSE,
      data
    }),
    clearcitylist: () => ({
      type: CityTypes.CLEAR_CITY_LIST
    })
    
  }


export const CityAddTypes = {
  CITY_POST: 'CITY_POST',
  CITY_POST_RESPONSE: 'CITY_POST_RESPONSE',
  CITY_POST_CLEAR: 'CITY_POST_CLEAR'
}

export const CityAddAction = {
  CityAdd: (data) => {
    return {
      type: CityAddTypes.CITY_POST,
      payload: data
    }
  },
  saveCityResponse: data => ({
    type: CityAddTypes.CITY_POST_RESPONSE,
    data
  }),
  clearCity: () => ({
    type: CityAddTypes.CITY_POST_CLEAR
  })
}

export const CityGetIdTypes = {
  GET_CITY_DETAILS: 'GET_CITY_DETAILS',
  CITY_DETAILS_RESPONSE: 'CITY_DETAILS_RESPONSE',
  CLEAR_CITY_DETAILS: 'CLEAR_CITY_DETAILS'
}

export const CityGetIdActions = {
  getCityIdDetails: (id) => ({
    type: CityGetIdTypes.GET_CITY_DETAILS,
    id
  }),
  saveCityIdDetailsResponse: data => ({
    type: CityGetIdTypes.CITY_DETAILS_RESPONSE,
    data
  }),
  clearCityIdDetails: () => ({
    type: CityGetIdTypes.CLEAR_CITY_DETAILS
  })
}

export const updateCityActionsTypes = {
  UPDATE_CITY: 'UPDATE_CITY',
  SAVE_UPDATE_CITY_RESPONSE: 'SAVE_UPDATE_CITY_RESPONSE',
  CLEAR_UPDATE_CITY: 'CLEAR_UPDATE_CITY'
}

export const updateCityActions = {
  updateCity: (id, params) => {
    return {
      type: updateCityActionsTypes.UPDATE_CITY,
      payload:  { id, params }
    }
  },
  saveupdateCityResponse: data => ({
    type: updateCityActionsTypes.SAVE_UPDATE_CITY_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateCity: () => ({
    type: updateCityActionsTypes.CLEAR_UPDATE_CITY
  })
}
export const CitydeleteActionsTypes = {
  REQUEST: 'CITY_DELETE_REQUEST',
  RESPONSE: 'CITY_DELETE_RESPONSE',
  ERROR: 'CITY_DELETE_ERROR',
  CLEAR: 'CITY_DELETE_CLEAR'
}

export const  CitydeleteActions = {
  delete: (id) => ({
    type: CitydeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: CitydeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: CitydeleteActionsTypes.CLEAR
  })
}