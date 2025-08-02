import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  FlatDocumentListTypes,
  FlatDocumentListActions,
  FlatDocumentAddTypes,
  FlatDocumentAddAction,
  FlatDocumentGetIdTypes,
  FlatDocumentGetIdActions,
  updateFlatDocumentActionsTypes,
  updateFlatDocumentActions,
  FlatDocumentdeleteActionsTypes,
  FlatDocumentdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchFlatDocumentList(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.flatDocument, { params })
  if (json.status === 200) {
    yield put(FlatDocumentListActions.saveFlatDocumentlistResponse(json.data))
  } else {
    yield put(FlatDocumentListActions.saveFlatDocumentlistResponse([]))
  }
}

function* fetchFlatDocumentAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.flatDocument, payload)
    if (data && data.data) {
      yield put(FlatDocumentAddAction.saveFlatDocumentAddResponse(data.data))
    }
  } catch (error) {
    yield put(FlatDocumentAddAction.saveFlatDocumentAddResponse(error && error.data))
  }
}

function* fetchFlatDocument(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.flatDocument}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(FlatDocumentGetIdActions.saveFlatDocumentIdDetailsResponse(json.data))

  } else {
    yield put(FlatDocumentGetIdActions.saveFlatDocumentIdDetailsResponse([]))
  }
}

function* fetchFlatDocumentUpdate(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.flatDocument}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateFlatDocumentActions.saveupdateFlatDocumentResponse(json.data))
    }
  } catch (error) {
    yield put(updateFlatDocumentActions.saveupdateFlatDocumentResponse(error && error.data))
  }
}

function* fetchFlatDocumentdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.flatDocument}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(FlatDocumentdeleteActions.saveResponse(json.data))
    } else {
      yield put(FlatDocumentdeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: FlatDocumentdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchFlatDocumentWatcher() {
  yield all([
    yield takeLatest(FlatDocumentListTypes.GET_FLATDOCUMENT_LIST, fetchFlatDocumentList),
    yield takeLatest(FlatDocumentAddTypes.FLATDOCUMENT_POST, fetchFlatDocumentAdd),
    yield takeLatest(FlatDocumentGetIdTypes.GET_FLATDOCUMENT_DETAILS, fetchFlatDocument),
    yield takeLatest(updateFlatDocumentActionsTypes.UPDATE_FLATDOCUMENT, fetchFlatDocumentUpdate),
    yield takeLatest(FlatDocumentdeleteActionsTypes.REQUEST, fetchFlatDocumentdelete)
  ])
}