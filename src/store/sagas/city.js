import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {  
    CityTypes,
    CityActions,
    CityAddTypes,
    CityAddAction,
    CityGetIdTypes,
    CityGetIdActions,
    updateCityActionsTypes,
    updateCityActions,
    CitydeleteActionsTypes,
    CitydeleteActions} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchcitylist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.city, { params })
  if (json.status === 200) {
    yield put(CityActions.savecitylistResponse(json.data))
  } else {
    yield put(CityActions.savecitylistResponse([]))
  }
}

function* fetchCityAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.city, payload)
    if (data && data.data) {
      yield put(CityAddAction.saveCityResponse(data.data))
    }
  } catch (error) {
    yield put(CityAddAction.saveCityResponse(error && error.data))
  }
}

function* fetchCity(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.city}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(CityGetIdActions.saveCityIdDetailsResponse(json.data))

  } else {  
    yield put(CityGetIdActions.saveCityIdDetailsResponse([]))
  }
}

function* fetchUpdateCity (actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.city}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  try {
      yield put(updateCityActions.saveupdateCityResponse(json.data))
  }
  catch (error) {
    yield put(updateCityActions.saveupdateCityResponse(error && error.data))
  }
}

function*  fetchCitydelete (actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.city}/${id} `
  try {
  const json = yield axiosInstance.delete(deleteUrl)
  if (json.status === 200) {
    yield put(CitydeleteActions.saveResponse(json.data))
  } else {
    yield put(CitydeleteActions.saveResponse([]))
  }
}
catch (error) {
  const data = {status: 'error', message: API_MESSAGES.SOMETHING_WRONG}
  yield put({type:  CitydeleteActionsTypes.RESPONSE, data})
}
}

export function* fetchcityWatcher() {
    yield all([
      yield takeLatest(CityTypes.GET_CITY_LIST, fetchcitylist),
      yield takeLatest(CityAddTypes.CITY_POST, fetchCityAdd),
      yield takeLatest(CityGetIdTypes.GET_CITY_DETAILS, fetchCity),
      yield takeLatest(updateCityActionsTypes.UPDATE_CITY, fetchUpdateCity),
      yield takeLatest(CitydeleteActionsTypes.REQUEST, fetchCitydelete),
    ])
  }