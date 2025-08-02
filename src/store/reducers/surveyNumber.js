import { PropertySurveyNoTypes } from '../actions'

export const PropertySurveyNolistInitialState = {
  list: null
}

export const PropertySurveyNolistStoreKeys = 'PropertySurveyNolistStore'

export const PropertySurveyNolistReducers = (state = PropertySurveyNolistInitialState, action) => {
  switch (action.type) {
    case PropertySurveyNoTypes.GET_PROPERTY_SURVEY_NO_LIST:
      return { ...state, loading: true }
    case PropertySurveyNoTypes.SAVE_PROPERTY_SURVEY_NO_LIST_RESPONSE:
      return { ...state, PropertySurveyNolists: action.data, loading: false }
    case PropertySurveyNoTypes.CLEAR_PROPERTY_SURVEY_NO_LIST:
      return { ...state, PropertySurveyNolists: null }
    default:
      return state
  }
}