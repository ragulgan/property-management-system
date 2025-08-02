import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LeaseTypes,
  LeaseActions,
  LeaseAddTypes,
  LeaseAddAction,
  LeaseGetIdTypes,
  LeaseGetIdActions,
  updateLeaseActionsTypes,
  updateLeaseActions,
  LeasedeleteActions,
  LeasedeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchleaselist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.leaseType, { params })
  if (json.status === 200) {
    yield put(LeaseActions.saveleaselistResponse(json.data))
  } else {
    yield put(LeaseActions.saveleaselistResponse([]))
  }
}

function* fetchLeaseAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.leaseType, payload)
    if (data && data.data) {
      yield put(LeaseAddAction.saveLeaseResponse(data.data))
    }
  } catch (error) {
    yield put(LeaseAddAction.saveLeaseResponse(error && error.data))
  }
}

function* fetchLeaseUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.leaseType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(LeaseGetIdActions.saveLeaseIdDetailsResponse(json.data))

  } else {
    yield put(LeaseGetIdActions.saveLeaseIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.leaseType}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateLeaseActions.saveupdateLeaseResponse(json.data))
    }
  } catch (error) {
    yield put(updateLeaseActions.saveupdateLeaseResponse(error && error.data))
  }
}

function* fetchLeasedelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.leaseType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(LeasedeleteActions.savemResponse(json.data))
    } else {
      yield put(LeasedeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: LeasedeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchleaseWatcher() {
  yield all([
    yield takeLatest(LeaseTypes.GET_LEASE_TYPE_LIST, fetchleaselist),
    yield takeLatest(LeaseAddTypes.LEASE_TYPE_POST, fetchLeaseAdd),
    yield takeLatest(LeaseGetIdTypes.GET_LEASE_TYPE_DETAILS, fetchLeaseUser),
    yield takeLatest(updateLeaseActionsTypes.UPDATE_LEASE_TYPE, fetchUpdateUser),
    yield takeLatest(LeasedeleteActionsTypes.REQUEST, fetchLeasedelete),

  ])
}