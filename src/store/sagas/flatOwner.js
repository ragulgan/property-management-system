import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    FlatOwnerListTypes,
    FlatOwnerListActions,
    FlatOwnerAddTypes,
    FlatOwnerAddAction,
    FlatOwnerGetIdTypes,
    FlatOwnerGetIdActions,
    updateFlatOwnerActionsTypes,
    updateFlatOwnerActions,
    FlatOwnerdeleteActionsTypes,
    FlatOwnerdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchFlatOwnerlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.flatOwner, { params })
  if (json.status === 200) {
    yield put(FlatOwnerListActions.saveFlatOwnerlistResponse(json.data))
  } else {
    yield put(FlatOwnerListActions.saveFlatOwnerlistResponse([]))
  }
}

function* fetchFlatOwnerAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.flatOwner, payload)
    if (data && data.data) {
      yield put(FlatOwnerAddAction.saveFlatOwnerAddResponse(data.data))
    }
  } catch (error) {
    yield put(FlatOwnerAddAction.saveFlatOwnerAddResponse(error))
  }
}

function* fetchFlatOwnerUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.flatOwner}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(FlatOwnerGetIdActions.saveFlatOwnerIdDetailsResponse(json.data))

  } else {
    yield put(FlatOwnerGetIdActions.saveFlatOwnerIdDetailsResponse([]))
  }
}

function* fetchUpdateFlatOwner(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.flatOwner}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updateFlatOwnerActions.saveupdateFlatOwnerResponse(json.data))
  } else {
    yield put(updateFlatOwnerActions.saveupdateFlatOwnerResponse([]))
  }
}

function* fetchFlatOwnerdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.flatOwner}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(FlatOwnerdeleteActions.saveResponse(json.data))
    } else {
      yield put(FlatOwnerdeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: FlatOwnerdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchFlatOwnerWatcher() {
  yield all([
    yield takeLatest(FlatOwnerListTypes.GET_FLAT_OWNER_LIST, fetchFlatOwnerlist),
    yield takeLatest(FlatOwnerAddTypes.FLAT_OWNER_POST, fetchFlatOwnerAdd),
    yield takeLatest(FlatOwnerGetIdTypes.GET_FLAT_OWNER_DETAILS, fetchFlatOwnerUser),
    yield takeLatest(updateFlatOwnerActionsTypes.UPDATE_FLAT_OWNER, fetchUpdateFlatOwner),
    yield takeLatest(FlatOwnerdeleteActionsTypes.REQUEST, fetchFlatOwnerdelete),

  ])
}