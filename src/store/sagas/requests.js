import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  RequestListTypes,
  RequestListActions,
  RequestListAddTypes,
  RequestListAddAction,
  RequestListGetIdTypes,
  RequestListGetIdActions,
  updateRequestListActionsTypes,
  updateRequestListActions,
  RequestListdeleteActions,
  RequestListdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchrequestList(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.request, { params })
  if (json.status === 200) {
    yield put(RequestListActions.saverequestListResponse(json.data))
  } else {
    yield put(RequestListActions.saverequestListResponse([]))
  }
}

function* fetchrequestListAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.request, payload)
    if (data && data.data) {
      yield put(RequestListAddAction.saverequestListResponse(data.data))
    }
  } catch (error) {
    yield put(RequestListAddAction.saverequestListResponse(error))
  }
}

function* fetchrequestById(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.request}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(RequestListGetIdActions.saverequestListIdDetailsResponse(json.data))
  } else {
    yield put(RequestListGetIdActions.saverequestListIdDetailsResponse([]))
  }
}

function* fetchUpdaterequestList(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.request}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updateRequestListActions.saveupdaterequestListResponse(json.data))
    }
  } catch (error) {
    yield put(updateRequestListActions.saveupdaterequestListResponse(error && error.data))
  }
}
function* fetchrequestListdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.request}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(RequestListdeleteActions.saveResponse(json.data))
    } else {
      yield put(RequestListdeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: RequestListdeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchrequestListWatcher() {
  yield all([
    yield takeLatest(RequestListTypes.GET_REQUESTLIST_LIST, fetchrequestList),
    yield takeLatest(RequestListAddTypes.REQUESTLIST_POST, fetchrequestListAdd),
    yield takeLatest(RequestListGetIdTypes.GET_REQUESTLIST_DETAILS, fetchrequestById),
    yield takeLatest(updateRequestListActionsTypes.UPDATE_REQUESTLIST, fetchUpdaterequestList),
    yield takeLatest(RequestListdeleteActionsTypes.CLEAR, fetchrequestListdelete),
  ])
}