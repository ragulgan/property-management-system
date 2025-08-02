import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LeaseDocumentTypes,
  LeaseDocumentActions,
  LeaseDocumentAddTypes,
  LeaseDocumentAddAction,
  LeaseDocumentGetIdTypes,
  LeaseDocumentGetIdActions,
  updateLeaseDocumentActionsTypes,
  updateLeaseDocumentActions,
  LeaseDocumentdeleteActions,
  LeaseDocumentdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchLeaseDocumentlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.leasedocumentType, { params })
  if (json.status === 200) {
    yield put(LeaseDocumentActions.saveleaselistResponse(json.data))
  } else {
    yield put(LeaseDocumentActions.saveleaselistResponse([]))
  }
}

function* fetchLeaseDocumentAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.leasedocumentType, payload)
    if (data && data.data) {
      yield put(LeaseDocumentAddAction.saveLeaseDocumentResponse(data.data))
    }
  } catch (error) {
    yield put(LeaseDocumentAddAction.saveLeaseDocumentResponse(error && error.data))
  }
}

function* fetchLeaseDocumentUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.leasedocumentType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(LeaseDocumentGetIdActions.saveLeaseDocumentIdDetailsResponse(json.data))

  } else {
    yield put(LeaseDocumentGetIdActions.saveLeaseDocumentIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.leasedocumentType}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateLeaseDocumentActions.saveupdateLeaseDocumentResponse(json.data))
    }
  } catch (error) {
    yield put(updateLeaseDocumentActions.saveupdateLeaseDocumentResponse(error && error.data))
  }
}

function* fetchLeaseDocumentdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.leasedocumentType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(LeaseDocumentdeleteActions.savemResponse(json.data))
    } else {
      yield put(LeaseDocumentdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: LeaseDocumentdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchLeaseDocumentWatcher() {
  yield all([
    yield takeLatest(LeaseDocumentTypes.GET_DOCUMENT_LEASE_TYPE_LIST, fetchLeaseDocumentlist),
    yield takeLatest(LeaseDocumentAddTypes.DOCUMENT_LEASE_TYPE_POST, fetchLeaseDocumentAdd),
    yield takeLatest(LeaseDocumentGetIdTypes.GET_DOCUMENT_LEASE_TYPE_DETAILS, fetchLeaseDocumentUser),
    yield takeLatest(updateLeaseDocumentActionsTypes.UPDATE_DOCUMENT_LEASE_TYPE, fetchUpdateUser),
    yield takeLatest(LeaseDocumentdeleteActionsTypes.REQUEST, fetchLeaseDocumentdelete),

  ])
}