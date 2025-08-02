import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  ApartmentTypeListTypes,
  ApartmentTypeActions,
  ApartmentTypeAddTypes,
  ApartmentTypeAddAction,
  ApartmentTypeGetIdTypes,
  ApartmentTypeGetIdActions,
  updateApartmentTypeActionTypes,
  updateApartmentTypeActions,
  ApartmentTypedeleteActionsTypes,
  ApartmentTypedeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchApartmentTypeList(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.apartmentType, { params })
  if (json.status === 200) {
    yield put(ApartmentTypeActions.saveApartmentTypelistResponse(json.data))
  } else {
    yield put(ApartmentTypeActions.saveApartmentTypelistResponse([]))
  }
}

function* fetchApartmentTypeAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.apartmentType, payload)
    if (data && data.data) {
      yield put(ApartmentTypeAddAction.saveApartmentTypeResponse(data.data))
    }
  } catch (error) {
    yield put(ApartmentTypeAddAction.saveApartmentTypeResponse(error && error.data))
  }
}

function* fetchApartmentType(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.apartmentType}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(ApartmentTypeGetIdActions.saveApartmentTypeIdDetailsResponse(json.data))

  } else {
    yield put(ApartmentTypeGetIdActions.saveApartmentTypeIdDetailsResponse([]))
  }
}

function* fetchApartmentTypeUpdate(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.apartmentType}/${id}`
  try {

    const json = yield axiosInstance.put(endPointUrl, params)
    if (json.status === 200) {
      yield put(updateApartmentTypeActions.saveupdateApartmentTypeResponse(json.data))
    }
  } catch (error) {
    yield put(updateApartmentTypeActions.saveupdateApartmentTypeResponse(error && error.data))
  }
}

function* fetchApartmentTypedelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.apartmentType}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json.status === 200) {
      yield put(ApartmentTypedeleteActions.saveResponse(json.data))
    } else {
      yield put(ApartmentTypedeleteActions.saveResponse([]))
    }
  }
  catch (error) {
    const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
    yield put({ type: ApartmentTypedeleteActionsTypes.RESPONSE, data })
  }
}

export function* fetchApartmentTypeWatcher() {
  yield all([
    yield takeLatest(ApartmentTypeListTypes.GET_APARTMENT_TYPE_LIST, fetchApartmentTypeList),
    yield takeLatest(ApartmentTypeAddTypes.APARTMENT_TYPE_POST, fetchApartmentTypeAdd),
    yield takeLatest(ApartmentTypeGetIdTypes.GET_APARTMENT_TYPE_DETAILS, fetchApartmentType),
    yield takeLatest(updateApartmentTypeActionTypes.UPDATE_APARTMENT_TYPE, fetchApartmentTypeUpdate),
    yield takeLatest(ApartmentTypedeleteActionsTypes.REQUEST, fetchApartmentTypedelete)
  ])
}