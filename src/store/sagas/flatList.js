import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    FlatListTypes,
    FlatListActions,
    FlatAddTypes,
    FlatAddAction,
    FlatGetIdTypes,
    FlatGetIdActions,
    updateFlatActionsTypes,
    updateFlatActions,
    FlatdeleteActionsTypes,
    FlatdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchFlatlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.flatList, { params })
  if (json.status === 200) {
    yield put(FlatListActions.saveFlatlistResponse(json.data))
  } else {
    yield put(FlatListActions.saveFlatlistResponse([]))
  }
}

function* fetchFlatAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.flatList, payload)
    if (data && data.data) {
      yield put(FlatAddAction.saveFlatAddResponse(data.data))
    }
  } catch (error) {
    yield put(FlatAddAction.saveFlatAddResponse(error))
  }
}

function* fetchFlatUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.flatList}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(FlatGetIdActions.saveFlatIdDetailsResponse(json.data))

  } else {
    yield put(FlatGetIdActions.saveFlatIdDetailsResponse([]))
  }
}

function* fetchUpdateFlat(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.flatList}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updateFlatActions.saveupdateFlatResponse(json.data))
  } else {
    yield put(updateFlatActions.saveupdateFlatResponse([]))
  }
}

function* fetchFlatdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.flatList}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(FlatdeleteActions.savemResponse(json.data))
    } else {
      yield put(FlatdeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: FlatdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchFlatWatcher() {
  yield all([
    yield takeLatest(FlatListTypes.GET_FLAT_LIST, fetchFlatlist),
    yield takeLatest(FlatAddTypes.FLAT_POST, fetchFlatAdd),
    yield takeLatest(FlatGetIdTypes.GET_FLAT_DETAILS, fetchFlatUser),
    yield takeLatest(updateFlatActionsTypes.UPDATE_FLAT, fetchUpdateFlat),
    yield takeLatest(FlatdeleteActionsTypes.REQUEST, fetchFlatdelete),

  ])
}