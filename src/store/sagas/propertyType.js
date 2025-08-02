import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  propertiesTypes,
  PropertiesActions,
  PropertiesAddTypes,
  PropertiesAddAction,
  PropertiesGetIdTypes,
  PropertiesGetIdActions,
  updatePropertiesActionsTypes,
  updatePropertiesActions,
  PropertiesdeleteActionsTypes,
  PropertiesdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchpropertieslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.propertyType, { params })
  if (json.status === 200) {
    yield put(PropertiesActions.savepropertyTypelistResponse(json.data))
  } else {
    yield put(PropertiesActions.savepropertyTypelistResponse([]))
  }
}

function* fetchPropertiesAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.propertyType, payload)
    if (data && data.data) {
      yield put(PropertiesAddAction.savePropertiesResponse(data.data))
    }
  } catch (error) {
    yield put(PropertiesAddAction.savePropertiesResponse(error && error.data))
  }
}

function* fetchProperties(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.propertyType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(PropertiesGetIdActions.savePropertiesIdDetailsResponse(json.data))

  } else {
    yield put(PropertiesGetIdActions.savePropertiesIdDetailsResponse([]))
  }
}

function* fetchUpdateProperties(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.propertyType}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updatePropertiesActions.saveupdatePropertiesResponse(json.data))
  } else {
    yield put(updatePropertiesActions.saveupdatePropertiesResponse([]))
  }
}
function* fetchPropertiesdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.propertyType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(PropertiesdeleteActions.saveResponse(json.data))
    } else {
      yield put(PropertiesdeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: PropertiesdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchpropertiesWatcher() {
  yield all([
    yield takeLatest(propertiesTypes.GET_PROPERTY_TYPE_LIST, fetchpropertieslist),
    yield takeLatest(PropertiesAddTypes.PROPERTY_TYPE_POST, fetchPropertiesAdd),
    yield takeLatest(PropertiesGetIdTypes.GET_PROPERTY_TYPE_DETAILS, fetchProperties),
    yield takeLatest(updatePropertiesActionsTypes.UPDATE_PROPERTY_TYPE, fetchUpdateProperties),
    yield takeLatest(PropertiesdeleteActionsTypes.REQUEST, fetchPropertiesdelete),
  ])
}