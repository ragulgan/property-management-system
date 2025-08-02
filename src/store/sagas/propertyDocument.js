import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
  PropertyDocTypes,
  PropertyDocumentActions,
  PropertyDocAddTypes,
  PropertyDocumentAddAction,
  PropertyDocGetIdTypes,
  PropertyDocumentGetIdActions,
  updatePropertyDocActionsTypes,
  updatePropertyDocumentActions,
  PropertyDocdeleteActionsTypes,
  PropertyDocumentdeleteActions
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchpropertydoclist(actions) {
  const { params } = actions
  try {
    const json = yield axiosInstance.get(serviceList.propertyDocument, { params })
    if (json.status === 200) {
      yield put(PropertyDocumentActions.savepropertyDoclistResponse(json.data))
    }
  } catch (error) {
    yield put(PropertyDocumentActions.savepropertyDoclistResponse(error && error.data))
  }
}

function* fetchPropertyDocAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.propertyDocument, payload)
    if (data && data.data) {
      yield put(PropertyDocumentAddAction.savePropertyDocResponse(data.data))
    }
  } catch (error) {
    yield put(PropertyDocumentAddAction.savePropertyDocResponse(error && error.data))
  }
}

function* fetchPropertyDoc(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.propertyDocument}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(PropertyDocumentGetIdActions.savePropertyDocIdDetailsResponse(json.data))
  } else {
    yield put(PropertyDocumentGetIdActions.savePropertyDocIdDetailsResponse([]))
  }
}

function* fetchUpdatePropertyDoc(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.propertyDocument}/${id}`
  try {
    const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updatePropertyDocumentActions.saveupdatePropertyDocResponse(json.data))
    }
  } catch (error) {
    yield put(updatePropertyDocumentActions.saveupdatePropertyDocResponse(error && error.data))
  }
}
function* fetchPropertydeleteDoc(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.propertyDocument}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(PropertyDocumentdeleteActions.saveResponse(json.data))
    }
  }
  catch (error) {
    if (error) {
      yield put(PropertyDocumentdeleteActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: PropertyDocdeleteActionsTypes.RESPONSE, data })
    }
  }
}

export function* fetchpropertyDocWatcher() {
  yield all([
    yield takeLatest(PropertyDocTypes.GET_PROPERTY_DOC_LIST, fetchpropertydoclist),
    yield takeLatest(PropertyDocAddTypes.PROPERTY_DOC_POST, fetchPropertyDocAdd),
    yield takeLatest(PropertyDocGetIdTypes.GET_PROPERTY_DOC_DETAILS, fetchPropertyDoc),
    yield takeLatest(updatePropertyDocActionsTypes.UPDATE_PROPERTY_DOC, fetchUpdatePropertyDoc),
    yield takeLatest(PropertyDocdeleteActionsTypes.REQUEST, fetchPropertydeleteDoc),
  ])
}