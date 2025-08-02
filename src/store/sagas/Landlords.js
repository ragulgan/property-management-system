import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LandlordsTypes,
  LandlordsActions,
  LandlordsAddTypes,
  LandlordsAddAction,
  LandlordsGetIdTypes,
  LandlordsGetIdActions,
  updateLandlordsActionsTypes,
  updateLandlordsActions,
  LandlordsdeleteActions,
  LandlordsdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchlandlordslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.landlord, { params })
  if (json.status === 200) {
    yield put(LandlordsActions.savelandlordslistResponse(json.data))
  } else {
    yield put(LandlordsActions.savelandlordslistResponse([]))
  }
}

function* fetchLandlordsAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.landlord, payload)
    if (data && data.data) {
      yield put(LandlordsAddAction.saveLandlordsResponse(data.data))
    }
  } catch (error) {
    yield put(LandlordsAddAction.saveLandlordsResponse(error && error.data))
  }
}

function* fetchLandlordsUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.landlord}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(LandlordsGetIdActions.saveLandlordsIdDetailsResponse(json.data))

  } else {
    yield put(LandlordsGetIdActions.saveLandlordsIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.landlord}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updateLandlordsActions.saveupdateLandlordsResponse(json.data))
    }
  } catch (error) {
    yield put(updateLandlordsActions.saveupdateLandlordsResponse(error && error.data))
  }
}

function* fetchLandlordsdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.landlord}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(LandlordsdeleteActions.savemResponse(json.data))
    }
  }
  catch (error) {
    if(error){
      yield put(LandlordsdeleteActions.savemResponse(error && error.data))
    }else{
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: LandlordsdeleteActionsTypes.RESPONSE, data })
    }
  }
}

export function* fetchlandlordsWatcher() {
  yield all([
    yield takeLatest(LandlordsTypes.GET_LANDLORD_LIST, fetchlandlordslist),
    yield takeLatest(LandlordsAddTypes.LANDLORD_POST, fetchLandlordsAdd),
    yield takeLatest(LandlordsGetIdTypes.GET_LANDLORD_DETAILS, fetchLandlordsUser),
    yield takeLatest(updateLandlordsActionsTypes.UPDATE_LANDLORD, fetchUpdateUser),
    yield takeLatest(LandlordsdeleteActionsTypes.REQUEST, fetchLandlordsdelete),

  ])
}