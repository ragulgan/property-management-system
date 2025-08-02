import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import { DashboardTypes, DashboardActions } from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'


function* fetchdashboardlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.dashboard, { params })
  if (json.status === 200) {
    yield put(DashboardActions.savedashboardlistResponse(json.data))
  } else {
    yield put(DashboardActions.savedashboardlistResponse([]))
  }
}

export function* fetchdashboardWatcher() {
  yield all([
    yield takeLatest(DashboardTypes.GET_DASHBOARD_LIST, fetchdashboardlist),
  ])
}