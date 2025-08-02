import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  LoginActions,
  LoginActionsTypes,
  RegisterActions,
  RegisterActionsTypes,
  OtpActions,
  OtpActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'

function* fetchLogin(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.login, payload)
    if (data && data.data) {
      yield put(LoginActions.saveLoginResponse(data.data))
    }
  } catch (error) {
    yield put(LoginActions.saveLoginResponse(error))
  }
}

function* fetchRegister(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.login, payload)
    if (data && data.data) {
      yield put(RegisterActions.saveRegisterResponse(data.data))
    }
  } catch (error) {
    yield put(RegisterActions.saveRegisterResponse(error))
  }
}

function* fetchOtp(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.login, payload)
    if (data && data.data) {
      yield put(OtpActions.saveOtpResponse(data.data))
    }
  } catch (error) {
    yield put(OtpActions.saveOtpResponse(error))
  }
}

export function* fetchLoginWatcher() {
  yield all([yield takeLatest(OtpActionsTypes.OTP, fetchOtp)])
  yield all([yield takeLatest(LoginActionsTypes.LOGIN, fetchLogin)])
  yield all([yield takeLatest(RegisterActionsTypes.REGISTER, fetchRegister)])
}
