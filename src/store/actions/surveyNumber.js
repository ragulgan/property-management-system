export const PropertySurveyNoTypes = {
    GET_PROPERTY_SURVEY_NO_LIST: 'GET_PROPERTY_SURVEY_NO_LIST',
    SAVE_PROPERTY_SURVEY_NO_LIST_RESPONSE: 'SAVE_PROPERTY_SURVEY_NO_LIST_RESPONSE',
    CLEAR_PROPERTY_SURVEY_NO_LIST: 'CLEAR_PROPERTY_SURVEY_NO_LIST'
  }
  
  export const PropertySurveyNoActions = {
    getPropertySurveyNolist: (params) => ({
      type: PropertySurveyNoTypes.GET_PROPERTY_SURVEY_NO_LIST,
      params
    }),
    savePropertySurveyNolistResponse: (data) => ({
      type: PropertySurveyNoTypes.SAVE_PROPERTY_SURVEY_NO_LIST_RESPONSE,
      data
    }),
    clearPropertySurveyNolist: () => ({
      type: PropertySurveyNoTypes.CLEAR_PROPERTY_SURVEY_NO_LIST
    })
  
  }