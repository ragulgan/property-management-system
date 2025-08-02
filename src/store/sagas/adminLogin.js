import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LoginAdminActions,
  LoginAdminActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'

function* fetchLoginAdmin(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.login, payload)
    if (data && data.data) {
      yield put(LoginAdminActions.saveLoginAdminResponse(data.data))
    }
  } catch (error) {
    yield put(LoginAdminActions.saveLoginAdminResponse(error && error.data))
  }
}

export function* fetchLoginAdminWatcher() {
    yield all([yield takeLatest(LoginAdminActionsTypes.LOGIN_ADMIN, fetchLoginAdmin)])
  }