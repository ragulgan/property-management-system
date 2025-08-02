import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  TransactionsTypes,
  TransactionsActions,
  TransactionsAddTypes,
  // TransactionsAddAction,
  TransactionsGetIdTypes,
  TransactionsGetIdActions,
  updateTransactionsActionsTypes,
  updateTransactionsActions,
  TransactionsdeleteActions,
  TransactionsdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchtransactionslist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.transaction, { params })
  if (json.status === 200) {
    yield put(TransactionsActions.savetransactionslistResponse(json.data))
  } else {
    yield put(TransactionsActions.savetransactionslistResponse([]))
  }
}

// function* fetchTransactionsAdd(action) {
//   const { payload } = action
//   try {
//     const data = yield axiosInstance.post(serviceList.Userpost, payload)
//     if (data && data.data) {
//       yield put(TransactionsAddAction.saveTransactionsResponse(data.data))
//     }
//   } catch (error) {
//     yield put(TransactionsAddAction.saveTransactionsResponse(error))
//   }
// }

function* fetchTransactionsUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.transactionGetbyId}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(TransactionsGetIdActions.saveTransactionsIdDetailsResponse(json.data))

  } else {
    yield put(TransactionsGetIdActions.saveTransactionsIdDetailsResponse([]))
  }
}

function* fetchUpdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.transactionUpdate}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updateTransactionsActions.saveupdateTransactionsResponse(json.data))
  } else {
    yield put(updateTransactionsActions.saveupdateTransactionsResponse([]))
  }
}

function* fetchTransactionsdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.transactionDelete}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(TransactionsdeleteActions.savemResponse(json.data))
    } else {
      yield put(TransactionsdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: TransactionsdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchtransactionsWatcher() {
  yield all([
    yield takeLatest(TransactionsTypes.GET_TRANSACTION_LIST, fetchtransactionslist),
    // yield takeLatest(TransactionsAddTypes.TRANSACTION_POST, fetchTransactionsAdd),
    yield takeLatest(TransactionsGetIdTypes.GET_TRANSACTION_DETAILS, fetchTransactionsUser),
    yield takeLatest(updateTransactionsActionsTypes.UPDATE_TRANSACTION, fetchUpdateUser),
    yield takeLatest(TransactionsdeleteActionsTypes.REQUEST, fetchTransactionsdelete),

  ])
}