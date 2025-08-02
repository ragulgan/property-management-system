import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  getPropertyListTypes,
  getPropertyListActions,
  postPropertyTypes,
  postPropertyAction,
  getPropertytDetialsTypes,
  getPropertytDetialsActions,
  updatePropertytActionsTypes,
  updatePropertytActions,
  deletePropertytActionsTypes,
  deletePropertytActions,
} from '../actions'

import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchPropertyManagementlist(actions) {
  const { params } = actions
  try {
    const json = yield axiosInstance.get(serviceList.apartment, { params })
    if (json.status === 200) {
      yield put(getPropertyListActions.saveResponse(json.data))
    }
  } catch (error) {
    yield put(getPropertyListActions.saveResponse(error && error.data))
  }
}

function* postPropertyManagement(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.apartment, payload)
    if (data && data.data) {
      yield put(postPropertyAction.saveResponse(data.data))
    }
  } catch (error) {
    yield put(postPropertyAction.saveResponse(error && error.data))
  }
}

function* getPropertyManagementDetails(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.apartment}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(getPropertytDetialsActions.saveResponse(json.data))
  } else {
    yield put(getPropertytDetialsActions.saveResponse([]))
  }
}

function* updatePropertyManagement(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.apartment}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updatePropertytActions.saveResponse(json.data))
    }
  } catch (error) {
    yield put(updatePropertytActions.saveResponse(error && error.data))
  }
}
function* deletePropertyManagement(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.apartment}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(deletePropertytActions.saveResponse(json.data))
    }
  }
  catch (error) {
    if (error) {
      yield put(deletePropertytActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: deletePropertytActionsTypes.RESPONSE, data })
    }
  }
}

export function*  propertyManagementWatcher() {
  yield all([
    yield takeLatest(getPropertyListTypes.REQUEST, fetchPropertyManagementlist),
    yield takeLatest(postPropertyTypes.REQUEST, postPropertyManagement),
    yield takeLatest(getPropertytDetialsTypes.REQUEST, getPropertyManagementDetails),
    yield takeLatest(updatePropertytActionsTypes.REQUEST, updatePropertyManagement),
    yield takeLatest(deletePropertytActionsTypes.REQUEST, deletePropertyManagement),
  ])
}