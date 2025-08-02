import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    ApartmentAdminTypes,
    ApartmentAdminActions,
    ApartmentAdminAddTypes,
    ApartmentAdminAddAction,
    ApartmentAdminGetIdTypes,
    ApartmentAdminGetIdActions,
    updateApartmentAdminActionsTypes,
    updateApartmentAdminActions,
    ApartmentAdmindeleteActionsTypes,
    ApartmentAdmindeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchapartmentAdminlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.apartmentAdmin, { params })
  if (json.status === 200) {
    yield put(ApartmentAdminActions.saveApartmentAdminlistResponse(json.data))
  } else {
    yield put(ApartmentAdminActions.saveApartmentAdminlistResponse([]))
  }
}

function* fetchapartmentAdminAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.apartmentAdmin, payload)
    if (data && data.data) {
      yield put(ApartmentAdminAddAction.saveApartmentAdminResponse(data.data))
    }
  } catch (error) {
    yield put(ApartmentAdminAddAction.saveApartmentAdminResponse(error))
  }
}

function* fetchapartmentAdmin(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.apartmentAdmin}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(ApartmentAdminGetIdActions.saveApartmentAdminIdDetailsResponse(json.data))

  } else {
    yield put(ApartmentAdminGetIdActions.saveApartmentAdminIdDetailsResponse([]))
  }
}

function* fetchUpdateapartmentAdmin(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.apartmentAdmin}/${id}`
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json.status === 200) {
    yield put(updateApartmentAdminActions.saveupdateApartmentAdminResponse(json.data))
  } else {
    yield put(updateApartmentAdminActions.saveupdateApartmentAdminResponse([]))
  }
}

function* fetchapartmentAdmindelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.apartmentAdmin}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(ApartmentAdmindeleteActions.savemResponse(json.data))
    } else {
      yield put(ApartmentAdmindeleteActions.savemResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: ApartmentAdmindeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchapartmentAdminWatcher() {
  yield all([
    yield takeLatest(ApartmentAdminTypes.GET_APARTMENTADMIN_LIST, fetchapartmentAdminlist),
    yield takeLatest(ApartmentAdminAddTypes.APARTMENTADMIN_POST, fetchapartmentAdminAdd),
    yield takeLatest(ApartmentAdminGetIdTypes.GET_APARTMENTADMIN_DETAILS, fetchapartmentAdmin),
    yield takeLatest(updateApartmentAdminActionsTypes.UPDATE_APARTMENTADMIN, fetchUpdateapartmentAdmin),
    yield takeLatest(ApartmentAdmindeleteActionsTypes.REQUEST, fetchapartmentAdmindelete),

  ])
}