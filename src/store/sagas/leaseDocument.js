import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LeaseDocTypes,
  LeaseDocumentListActions,
  LeaseDocAddTypes,
  LeaseDocumentListAddAction,
  LeaseDocGetIdTypes,
  LeaseDocumentListGetIdActions,
  updateLeaseDocActionsTypes,
  updateLeaseDocumentListActions,
  LeaseDocdeleteActionsTypes,
  LeaseDocumentListdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchleasedoclist(actions) {
  const { params } = actions
  try {
    const json = yield axiosInstance.get(serviceList.leaseDocument, { params })
    if (json.status === 200) {
      yield put(LeaseDocumentListActions.saveLeaseDoclistResponse(json.data))
    }
  } catch (error) {
    yield put(LeaseDocumentListActions.saveLeaseDoclistResponse(error && error.data))
  }
}

function* fetchLeaseDocAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.leaseDocument, payload)
    if (data && data.data) {
      yield put(LeaseDocumentListAddAction.saveLeaseDocResponse(data.data))
    }
  } catch (error) {
    yield put(LeaseDocumentListAddAction.saveLeaseDocResponse(error && error.data))
  }
}

function* fetchLeaseDoc(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.leaseDocument}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(LeaseDocumentListGetIdActions.saveLeaseDocIdDetailsResponse(json.data))
  } else {
    yield put(LeaseDocumentListGetIdActions.saveLeaseDocIdDetailsResponse([]))
  }
}

function* fetchUpdateLeaseDoc(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.leaseDocument}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updateLeaseDocumentListActions.saveupdateLeaseDocResponse(json.data))
    }
  } catch (error) {
    yield put(updateLeaseDocumentListActions.saveupdateLeaseDocResponse(error && error.data))
  }
}
function* fetchLeasedeleteDoc(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.leaseDocument}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(LeaseDocumentListdeleteActions.saveResponse(json.data))
    }
  }
  catch (error) {
    if (error) {
      yield put(LeaseDocumentListdeleteActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: LeaseDocdeleteActionsTypes.RESPONSE, data })
    }
  }
}

export function* fetchleaseDocWatcher() {
  yield all([
    yield takeLatest(LeaseDocTypes.GET_LEASE_DOC_LIST, fetchleasedoclist),
    yield takeLatest(LeaseDocAddTypes.LEASE_DOC_POST, fetchLeaseDocAdd),
    yield takeLatest(LeaseDocGetIdTypes.GET_LEASE_DOC_DETAILS, fetchLeaseDoc),
    yield takeLatest(updateLeaseDocActionsTypes.UPDATE_LEASE_DOC, fetchUpdateLeaseDoc),
    yield takeLatest(LeaseDocdeleteActionsTypes.REQUEST, fetchLeasedeleteDoc),
  ])
}