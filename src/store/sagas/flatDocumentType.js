import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  FlatDocumentTypeListTypes,
  FlatDocumentTypeListActions,
  FlatDocumentTypeAddTypes,
  FlatDocumentTypeAddAction,
  FlatDocumentTypeGetIdTypes,
  FlatDocumentTypeGetIdActions,
  updateFlatDocumentTypeActionsTypes,
  updateFlatDocumentTypeActions,
  FlatDocumentTypedeleteActionsTypes,
  FlatDocumentTypedeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchFlatDocumentTypeList(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.flatDocumentType, { params })
  if (json.status === 200) {
    yield put(FlatDocumentTypeListActions.saveFlatDocumentTypelistResponse(json.data))
  } else {
    yield put(FlatDocumentTypeListActions.saveFlatDocumentTypelistResponse([]))
  }
}

function* fetchFlatDocumentTypeAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.flatDocumentType, payload)
    if (data && data.data) {
      yield put(FlatDocumentTypeAddAction.saveFlatDocumentTypeAddResponse(data.data))
    }
  } catch (error) {
    yield put(FlatDocumentTypeAddAction.saveFlatDocumentTypeAddResponse(error && error.data))
  }
}

function* fetchFlatDocumentType(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.flatDocumentType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(FlatDocumentTypeGetIdActions.saveFlatDocumentTypeIdDetailsResponse(json.data))

  } else {
    yield put(FlatDocumentTypeGetIdActions.saveFlatDocumentTypeIdDetailsResponse([]))
  }
}

function* fetchFlatDocumentTypeUpdate(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.flatDocumentType}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateFlatDocumentTypeActions.saveupdateFlatDocumentTypeResponse(json.data))
    }
  } catch (error) {
    yield put(updateFlatDocumentTypeActions.saveupdateFlatDocumentTypeResponse(error && error.data))
  }
}

function* fetchFlatDocumentTypedelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.flatDocumentType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(FlatDocumentTypedeleteActions.saveResponse(json.data))
    } else {
      yield put(FlatDocumentTypedeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: FlatDocumentTypedeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchFlatDocumentTypeWatcher() {
  yield all([
    yield takeLatest(FlatDocumentTypeListTypes.GET_FLATDOCUMENTTYPE_LIST, fetchFlatDocumentTypeList),
    yield takeLatest(FlatDocumentTypeAddTypes.FLATDOCUMENTTYPE_POST, fetchFlatDocumentTypeAdd),
    yield takeLatest(FlatDocumentTypeGetIdTypes.GET_FLATDOCUMENTTYPE_DETAILS, fetchFlatDocumentType),
    yield takeLatest(updateFlatDocumentTypeActionsTypes.UPDATE_FLATDOCUMENTTYPE, fetchFlatDocumentTypeUpdate),
    yield takeLatest(FlatDocumentTypedeleteActionsTypes.REQUEST, fetchFlatDocumentTypedelete)
  ])
}