
export const CountryTypes = {
    GET_COUNTRY_LIST: 'GET_COUNTRY_LIST',
    SAVE_COUNTRY_LIST_RESPONSE: 'SAVE_COUNTRY_LIST_RESPONSE',
    CLEAR_COUNTRY_LIST: 'CLEAR_COUNTRY_LIST'
  }
  
  export const  CountryActions = {
    getcountrylist: (params) => ({
      type: CountryTypes.GET_COUNTRY_LIST,
      params
    }),
    savecountrylistResponse: (data) => ({
      type: CountryTypes.SAVE_COUNTRY_LIST_RESPONSE,
      data
    }),
    clearcountrylist: () => ({
      type: CountryTypes.CLEAR_COUNTRY_LIST
    })
    
  }


export const CountryAddTypes = {
  COUNTRY_POST: 'COUNTRY_POST',
  COUNTRY_POST_RESPONSE: 'COUNTRY_POST_RESPONSE',
  COUNTRY_POST_CLEAR: 'COUNTRY_POST_CLEAR'
}

export const CountryAddAction = {
  CountryAdd: (data) => {
    return {
      type: CountryAddTypes.COUNTRY_POST,
      payload: data
    }
  },
  saveCountryResponse: data => ({
    type: CountryAddTypes.COUNTRY_POST_RESPONSE,
    data
  }),
  clearCountry: () => ({
    type: CountryAddTypes.COUNTRY_POST_CLEAR
  })
}

export const CountryGetIdTypes = {
  GET_COUNTRY_DETAILS: 'GET_COUNTRY_DETAILS',
  COUNTRY_DETAILS_RESPONSE: 'COUNTRY_DETAILS_RESPONSE',
  CLEAR_COUNTRY_DETAILS: 'CLEAR_COUNTRY_DETAILS'
}

export const CountryGetIdActions = {
  getCountryIdDetails: (id) => ({
    type: CountryGetIdTypes.GET_COUNTRY_DETAILS,
    id
  }),
  saveCountryIdDetailsResponse: data => ({
    type: CountryGetIdTypes.COUNTRY_DETAILS_RESPONSE,
    data
  }),
  clearCountryIdDetails: () => ({
    type: CountryGetIdTypes.CLEAR_COUNTRY_DETAILS
  })
}

export const updateCountryActionsTypes = {
  UPDATE_COUNTRY: 'UPDATE_COUNTRY',
  SAVE_UPDATE_COUNTRY_RESPONSE: 'SAVE_UPDATE_COUNTRY_RESPONSE',
  CLEAR_UPDATE_COUNTRY: 'CLEAR_UPDATE_COUNTRY'
}

export const updateCountryActions = {
  updateCountry: (id, params) => {
    return {
      type: updateCountryActionsTypes.UPDATE_COUNTRY,
      payload:  { id, params }
    }
  },
  saveupdateCountryResponse: data => ({
    type: updateCountryActionsTypes.SAVE_UPDATE_COUNTRY_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateCountry: () => ({
    type: updateCountryActionsTypes.CLEAR_UPDATE_COUNTRY
  })
}
export const CountrydeleteActionsTypes = {
  REQUEST: 'COUNTRY_DELETE_REQUEST',
  RESPONSE: 'COUNTRY_DELETE_RESPONSE',
  ERROR: 'COUNTRY_DELETE_ERROR',
  CLEAR: 'COUNTRY_DELETE_CLEAR'
}

export const  CountrydeleteActions = {
  delete: (id) => ({
    type: CountrydeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: CountrydeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: CountrydeleteActionsTypes.CLEAR
  })
}