import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  SettingsTypes,
  SettingsActions,
  SettingsAddTypes,
  SettingsAddAction,
  SettingsGetIdTypes,
  SettingsGetIdActions,
  updateSettingsActionsTypes,
  updateSettingsActions,
  SettingsdeleteActions,
  SettingsdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchsettingslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.setting, { params })
  if (json.status === 200) {
    yield put(SettingsActions.savesettingslistResponse(json.data))
  } else {
    yield put(SettingsActions.savesettingslistResponse([]))
  }
}

function* fetchSettingsAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.setting, payload)
    if (data && data.data) {
      yield put(SettingsAddAction.saveSettingsResponse(data.data))
    }
  } catch (error) {
    yield put(SettingsAddAction.saveSettingsResponse(error && error.data))
  }
}

function* fetchSettingsUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.setting}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(SettingsGetIdActions.saveSettingsIdDetailsResponse(json.data))

  } else {
    yield put(SettingsGetIdActions.saveSettingsIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.setting}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateSettingsActions.saveupdateSettingsResponse(json.data))
    }
  } catch (error) {
    yield put(updateSettingsActions.saveupdateSettingsResponse(error && error.data))
  }
}

function* fetchSettingsdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.setting}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(SettingsdeleteActions.savemResponse(json.data))
    } else {
      yield put(SettingsdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: SettingsdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchsettingsWatcher() {
  yield all([
    yield takeLatest(SettingsTypes.GET_SETTING_LIST, fetchsettingslist),
    yield takeLatest(SettingsAddTypes.SETTING_POST, fetchSettingsAdd),
    yield takeLatest(SettingsGetIdTypes.GET_SETTING_DETAILS, fetchSettingsUser),
    yield takeLatest(updateSettingsActionsTypes.UPDATE_SETTING, fetchUpdateUser),
    yield takeLatest(SettingsdeleteActionsTypes.REQUEST, fetchSettingsdelete),

  ])
}