export const OpenCountryTypes = {
    GET_OPEN_COUNTRY_LIST: 'GET_OPEN_COUNTRY_LIST',
    SAVE_OPEN_COUNTRY_LIST_RESPONSE: 'SAVE_OPEN_COUNTRY_LIST_RESPONSE',
    CLEAR_OPEN_COUNTRY_LIST: 'CLEAR_OPEN_COUNTRY_LIST'
  }
  
  export const  OpenCountryActions = {
    getopencountrylist: (params) => ({
      type: OpenCountryTypes.GET_OPEN_COUNTRY_LIST,
      params
    }),
    saveopencountrylistResponse: (data) => ({
      type: OpenCountryTypes.SAVE_OPEN_COUNTRY_LIST_RESPONSE,
      data
    }),
    clearopencountrylist: () => ({
      type: OpenCountryTypes.CLEAR_OPEN_COUNTRY_LIST
    }) 
  }

  export const OpenStateTypes = {
    GET_OPEN_STATE_LIST: 'GET_OPEN_STATE_LIST',
    SAVE_OPEN_STATE_LIST_RESPONSE: 'SAVE_OPEN_STATE_LIST_RESPONSE',
    CLEAR_OPEN_STATE_LIST: 'CLEAR_OPEN_STATE_LIST'
  }
  
  export const  OpenStateActions = {
    getopenstatelist: (params) => ({
      type: OpenStateTypes.GET_OPEN_STATE_LIST,
      params
    }),
    saveopenstatelistResponse: (data) => ({
      type: OpenStateTypes.SAVE_OPEN_STATE_LIST_RESPONSE,
      data
    }),
    clearopenstatelist: () => ({
      type: OpenStateTypes.CLEAR_OPEN_STATE_LIST
    }) 
  }

  export const OpenCityTypes = {
    GET_OPEN_CITY_LIST: 'GET_OPEN_CITY_LIST',
    SAVE_OPEN_CITY_LIST_RESPONSE: 'SAVE_OPEN_CITY_LIST_RESPONSE',
    CLEAR_OPEN_CITY_LIST: 'CLEAR_OPEN_CITY_LIST'
  }
  
  export const  OpenCityActions = {
    getopencitylist: (params) => ({
      type: OpenCityTypes.GET_OPEN_CITY_LIST,
      params
    }),
    saveopencitylistResponse: (data) => ({
      type: OpenCityTypes.SAVE_OPEN_CITY_LIST_RESPONSE,
      data
    }),
    clearopencitylist: () => ({
      type: OpenCityTypes.CLEAR_OPEN_CITY_LIST
    }) 
  }
  