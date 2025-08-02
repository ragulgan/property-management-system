import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  getApartmentList,
  getApartmentListActions,
  postApartmentTypes,
  postApartmentAction,
  getApartmentDetialsTypes,
  getApartmentDetialsActions,
  updateApartmentActionsTypes,
  updateApartmentActions,
  deleteApartmentActionsTypes,
  deleteApartmentActions,
} from '../actions'

import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchApartmentlist(actions) {
  const { params } = actions
  try {
    const json = yield axiosInstance.get(serviceList.apartment, { params })
    if (json.status === 200) {
      yield put(getApartmentListActions.saveResponse(json.data))
    }
  } catch (error) {
    yield put(getApartmentListActions.saveResponse(error && error.data))
  }
}

function* postApartment(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.apartment, payload)
    if (data && data.data) {
      yield put(postApartmentAction.saveResponse(data.data))
    }
  } catch (error) {
    yield put(postApartmentAction.saveResponse(error && error.data))
  }
}

function* getApartmentDetials(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.apartment}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(getApartmentDetialsActions.saveResponse(json.data))
  } else {
    yield put(getApartmentDetialsActions.saveResponse([]))
  }
}

function* updateApartment(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.apartment}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updateApartmentActions.saveResponse(json.data))
    }
  } catch (error) {
    yield put(updateApartmentActions.saveResponse(error && error.data))
  }
}
function* deleteApartment(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.apartment}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(deleteApartmentActions.saveResponse(json.data))
    }
  }
  catch (error) {
    if (error) {
      yield put(deleteApartmentActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: deleteApartmentActionsTypes.RESPONSE, data })
    }
  }
}

export function* apartmentWatcher() {
  yield all([
    yield takeLatest(getApartmentList.REQUEST, fetchApartmentlist),
    yield takeLatest(postApartmentTypes.REQUEST, postApartment),
    yield takeLatest(getApartmentDetialsTypes.REQUEST, getApartmentDetials),
    yield takeLatest(updateApartmentActionsTypes.REQUEST, updateApartment),
    yield takeLatest(deleteApartmentActionsTypes.REQUEST, deleteApartment),
  ])
}