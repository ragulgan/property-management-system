import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  RolesTypes,
  RolesConfigActions,
  RolesConfigTypes,
  RolesActions,
  RolesAddTypes,
  RolesAddAction,
  RolesGetIdTypes,
  RolesGetIdActions,
  updateRolesActionsTypes,
  updateRolesActions,
  RolesdeleteActions,
  RolesdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchroleslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.role, { params })
  if (json.status === 200) {
    yield put(RolesActions.saveroleslistResponse(json.data))
  } else {
    yield put(RolesActions.saveroleslistResponse([]))
  }
}

function* fetchrolesconfiglist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.config, { params })
  if (json.status === 200) {
    yield put(RolesConfigActions.saverolesconfiglistResponse(json.data))
  } else {
    yield put(RolesConfigActions.saverolesconfiglistResponse([]))
  }
}

function* fetchRolesAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.role, payload)
    if (data && data.data) {
      yield put(RolesAddAction.saveRolesResponse(data.data))
    }
  } catch (error) {
    yield put(RolesAddAction.saveRolesResponse(error && error.data))
  }
}

function* fetchRolesUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.role}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(RolesGetIdActions.saveRolesIdDetailsResponse(json.data))

  } else {
    yield put(RolesGetIdActions.saveRolesIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.role}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateRolesActions.saveupdateRolesResponse(json.data))
    }
  } catch (error) {
    yield put(updateRolesActions.saveupdateRolesResponse(error && error.data))
  }
}

function* fetchRolesdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.role}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(RolesdeleteActions.savemResponse(json.data))
    } else {
      yield put(RolesdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: RolesdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchrolesWatcher() {
  yield all([
    yield takeLatest(RolesTypes.GET_ROLE_LIST, fetchroleslist),
    yield takeLatest(RolesConfigTypes.GET_ROLE_CONFIG_LIST, fetchrolesconfiglist),
    yield takeLatest(RolesAddTypes.ROLE_POST, fetchRolesAdd),
    yield takeLatest(RolesGetIdTypes.GET_ROLE_DETAILS, fetchRolesUser),
    yield takeLatest(updateRolesActionsTypes.UPDATE_ROLE, fetchUpdateUser),
    yield takeLatest(RolesdeleteActionsTypes.REQUEST, fetchRolesdelete),

  ])
}