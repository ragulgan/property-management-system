import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import { PropertyTypes,
  PropertyActions,
  PropertyAddTypes,
  PropertyAddAction,PropertyGetIdTypes,
  PropertyGetIdActions,
  updatePropertyActionsTypes,
  updatePropertyActions,
  PropertydeleteActions,
  PropertydeleteActionsTypes} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchpropertylist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.property, { params })
  if (json.status === 200) {
    yield put(PropertyActions.savepropertylistResponse(json.data))
  } else {
    yield put(PropertyActions.savepropertylistResponse([]))
  }
}

function* fetchPropertyAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.property, payload)
    if (data && data.data) {
      yield put(PropertyAddAction.savePropertyResponse(data.data))
    }
  } catch (error) {
    yield put(PropertyAddAction.savePropertyResponse(error && error.data))
  }
}

function* fetchProperty(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.property}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(PropertyGetIdActions.savePropertyIdDetailsResponse(json.data))
  } else {  
    yield put(PropertyGetIdActions.savePropertyIdDetailsResponse([]))
  }
}

function* fetchUpdateProperty (actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.property}/${id}`
  try{
  const json = yield axiosInstance.put(endPointUrl, params)
  if (json && json.data) {
    yield put(updatePropertyActions.saveupdatePropertyResponse(json.data))
  }
 } catch (error) {
    yield put(updatePropertyActions.saveupdatePropertyResponse(error && error.data))
  }
}
function* fetchPropertydelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.property}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(PropertydeleteActions.saveResponse(json.data))
    }
  }
  catch (error) {
    if (error) {
      yield put(PropertydeleteActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: PropertydeleteActionsTypes.RESPONSE, data })
    }
  }
}

export function* fetchpropertyWatcher() {
    yield all([
      yield takeLatest(PropertyTypes.GET_PROPERTY_LIST, fetchpropertylist),
      yield takeLatest(PropertyAddTypes.PROPERTY_POST, fetchPropertyAdd),
      yield takeLatest(PropertyGetIdTypes.GET_PROPERTY_DETAILS, fetchProperty),
      yield takeLatest(updatePropertyActionsTypes.UPDATE_PROPERTY, fetchUpdateProperty),
      yield takeLatest(PropertydeleteActionsTypes.REQUEST, fetchPropertydelete),
    ])
  }