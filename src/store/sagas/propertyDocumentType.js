import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  PropertyDocumentTypeTypes,
  PropertyDocumentTypeActions,
  PropertyDocumentTypeAddTypes,
  PropertyDocumentTypeAddAction,
  PropertyDocumentTypeGetIdTypes,
  PropertyDocumentTypeGetIdActions,
  updatePropertyDocumentTypeActionsTypes,
  updatePropertyDocumentTypeActions,
  PropertyDocumentTypedeleteActions,
  PropertyDocumentTypedeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchpropertyDocumentTypelist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.propertyDocumentType, { params })
  if (json.status === 200) {
    yield put(PropertyDocumentTypeActions.savepropertyDocumentTypelistResponse(json.data))
  } else {
    yield put(PropertyDocumentTypeActions.savepropertyDocumentTypelistResponse([]))
  }
}

function* fetchPropertyDocumentTypeAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.propertyDocumentType, payload)
    if (data && data.data) {
      yield put(PropertyDocumentTypeAddAction.savePropertyDocumentTypeResponse(data.data))
    }
  } catch (error) {
    yield put(PropertyDocumentTypeAddAction.savePropertyDocumentTypeResponse(error && error.data))
  }
}

function* fetchPropertyDocumentTypeUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.propertyDocumentType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(PropertyDocumentTypeGetIdActions.savePropertyDocumentTypeIdDetailsResponse(json.data))

  } else {
    yield put(PropertyDocumentTypeGetIdActions.savePropertyDocumentTypeIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.propertyDocumentType}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updatePropertyDocumentTypeActions.saveupdatePropertyDocumentTypeResponse(json.data))
    }
  } catch (error) {
    yield put(updatePropertyDocumentTypeActions.saveupdatePropertyDocumentTypeResponse(error && error.data))
  }
}

function* fetchPropertyDocumentTypedelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.propertyDocumentType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(PropertyDocumentTypedeleteActions.savemResponse(json.data))
    } else {
      yield put(PropertyDocumentTypedeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: PropertyDocumentTypedeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchpropertyDocumentTypeWatcher() {
  yield all([
    yield takeLatest(PropertyDocumentTypeTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_LIST, fetchpropertyDocumentTypelist),
    yield takeLatest(PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST, fetchPropertyDocumentTypeAdd),
    yield takeLatest(PropertyDocumentTypeGetIdTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS, fetchPropertyDocumentTypeUser),
    yield takeLatest(updatePropertyDocumentTypeActionsTypes.UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE, fetchUpdateUser),
    yield takeLatest(PropertyDocumentTypedeleteActionsTypes.REQUEST, fetchPropertyDocumentTypedelete),
  ])
}