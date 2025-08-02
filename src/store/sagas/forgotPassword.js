import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  ForgotActions,
  ForgotPasswordActionsTypes,
  VerifyUserActionsTypes,
  VerifyActions,
  ResetPasswordActionsTypes,
  ResetPasswordActions
} from '../actions'
import serviceList from '../../services/serviceList'

function * fetchForgotPassword (action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.put(serviceList.forgotPassword, payload)
    if (data && data.data) {
      yield put(ForgotActions.saveForgotPasswordResponse(data.data))
    }
  } catch (error) {
    yield put(ForgotActions.saveForgotPasswordResponse(error))
  }
}

function * fetchVerifyUser (action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.verifyUser, payload)
    if (data && data.data) {
      yield put(VerifyActions.saveVerifyUserResponse(data.data))
    }
  } catch (error) {
    yield put(VerifyActions.saveVerifyUserResponse(error))
  }
}

function * fetchResetPassword (action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.put(serviceList.resetPassword, payload)
    if (data && data.data) {
      yield put(ResetPasswordActions.saveResetPasswordResponse(data.data))
    }
  } catch (error) {
    yield put(ResetPasswordActions.saveResetPasswordResponse(error))
  }
}

export function * fetchForgotWatcher () {
  yield all([
    yield takeLatest(
      ForgotPasswordActionsTypes.FORGOT_PASSWORD,
      fetchForgotPassword
    ),
    yield takeLatest(VerifyUserActionsTypes.VERIFY_USER, fetchVerifyUser),
    yield takeLatest(ResetPasswordActionsTypes.RESET_PASSWORD, fetchResetPassword)
  ])
}
