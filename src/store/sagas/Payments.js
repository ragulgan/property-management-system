import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  PaymentsTypes,
  PaymentsActions,
  // PaymentsAddTypes,
  // PaymentsAddAction,
  PaymentsGetIdTypes,
  PaymentsGetIdActions,
  updatePaymentsActionsTypes,
  updatePaymentsActions,
  PaymentsdeleteActions,
  PaymentsdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchpaymentslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.payment, { params })
  if (json.status === 200) {
    yield put(PaymentsActions.savepaymentslistResponse(json.data))
  } else {
    yield put(PaymentsActions.savepaymentslistResponse([]))
  }
}

// function* fetchPaymentsAdd(action) {
//   const { payload } = action
//   try {
//     const data = yield axiosInstance.post(serviceList.Userpost, payload)
//     if (data && data.data) {
//       yield put(PaymentsAddAction.savePaymentsResponse(data.data))
//     }
//   } catch (error) {
//     yield put(PaymentsAddAction.savePaymentsResponse(error))
//   }
// }

function* fetchPaymentsUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.transactionGetbyId}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(PaymentsGetIdActions.savePaymentsIdDetailsResponse(json.data))

  } else {
    yield put(PaymentsGetIdActions.savePaymentsIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.transactionUpdate}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updatePaymentsActions.saveupdatePaymentsResponse(json.data))
  } else {
    yield put(updatePaymentsActions.saveupdatePaymentsResponse([]))
  }
}

function* fetchPaymentsdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.transactionDelete}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(PaymentsdeleteActions.savemResponse(json.data))
    } else {
      yield put(PaymentsdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: PaymentsdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchpaymentsWatcher() {
  yield all([
    yield takeLatest(PaymentsTypes.GET_PAYMENT_LIST, fetchpaymentslist),
    // yield takeLatest(PaymentsAddTypes.PAYMENT_POST, fetchPaymentsAdd),
    yield takeLatest(PaymentsGetIdTypes.GET_PAYMENT_DETAILS, fetchPaymentsUser),
    yield takeLatest(updatePaymentsActionsTypes.UPDATE_PAYMENT, fetchUpdateUser),
    yield takeLatest(PaymentsdeleteActionsTypes.REQUEST, fetchPaymentsdelete),

  ])
}