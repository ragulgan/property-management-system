import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import { PropertySurveyNoTypes, PropertySurveyNoActions } from '../actions'
import serviceList from '../../services/serviceList'

function* fetchPropertySurveyNolist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.surveyNo, { params })
  if (json.status === 200) {
    yield put(PropertySurveyNoActions.savePropertySurveyNolistResponse(json.data))
  } else {
    yield put(PropertySurveyNoActions.savePropertySurveyNolistResponse([]))
  }
}

export function* fetchPropertySurveyNoWatcher() {
    yield all([
      yield takeLatest(PropertySurveyNoTypes.GET_PROPERTY_SURVEY_NO_LIST, fetchPropertySurveyNolist)
    ])
  }