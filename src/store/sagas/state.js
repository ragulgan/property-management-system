import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    StateTypes,
    StateActions,
    StateAddTypes,
    StateAddAction,
    StateGetIdTypes,
    StateGetIdActions,
    updateStateActionsTypes,
    updateStateActions,
    StatedeleteActionsTypes,
    StatedeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchstatelist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.state, { params })
  if (json.status === 200) {
    yield put(StateActions.saveStatelistResponse(json.data))
  } else {
    yield put(StateActions.saveStatelistResponse([]))
  }
}

function* fetchStateAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.state, payload)
    if (data && data.data) {
      yield put(StateAddAction.saveStateResponse(data.data))
    }
  } catch (error) {
    yield put(StateAddAction.saveStateResponse(error && error.data))
  }
}

function* fetchState(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.state}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  try {
    if (json.status === 200) {
      yield put(StateGetIdActions.saveStateIdDetailsResponse(json.data))
    }
  }
  catch (error) {
    yield put(StateGetIdActions.saveStateIdDetailsResponse(error && error.data))
  }
}

function* fetchUpdateState (actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.state}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  try {
    if (json.status === 200) {
      yield put(updateStateActions.saveupdateStateResponse(json.data))
    }
  }
  catch (error) {
    yield put(updateStateActions.saveupdateStateResponse(error && error.data))
  }
}

function*  fetchStatedelete (actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.state}/${id} `
  try {
  const json = yield axiosInstance.delete(deleteUrl)
  if (json.status === 200) {
    yield put(StatedeleteActions.saveResponse(json.data))
  } else {
    yield put(StatedeleteActions.saveResponse([]))
  }
}
catch (error) {
  const data = {status: 'error', message: API_MESSAGES.SOMETHING_WRONG}
  yield put({type:  StatedeleteActionsTypes.RESPONSE, data})
}
}

export function* fetchstateWatcher() {
    yield all([
      yield takeLatest(StateTypes.GET_STATE_LIST, fetchstatelist),
      yield takeLatest(StateAddTypes.STATE_POST, fetchStateAdd),
      yield takeLatest(StateGetIdTypes.GET_STATE_DETAILS, fetchState),
      yield takeLatest(updateStateActionsTypes.UPDATE_STATE, fetchUpdateState),
      yield takeLatest(StatedeleteActionsTypes.REQUEST, fetchStatedelete),
    ])
  }