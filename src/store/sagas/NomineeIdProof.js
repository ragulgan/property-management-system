import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'
import { 
    NomineeGetIdActions, 
    NomineeGetIdTypes, 
    MultifileNomineeAddActions, 
    MultifileNomineeAddTypes, 
    ImageDeleteNomineeActions, 
    ImageDeleteNomineeActionsTypes} from '../actions'
import axios from 'axios'
import { HEADER, SESSION } from '../../utils/constants'
import { getLocalStorage } from '../../utils/helper'

function* fetchEditUserNominee(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.users}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(NomineeGetIdActions.saveNomineeIdDetailsResponse(json.data))
  } else {
    yield put(NomineeGetIdActions.saveNomineeIdDetailsResponse([]))
  }
}

function* fetchMultifileAddNominee(action) {
  let header;
  const { payload } = action
  const data = payload && payload.name
  header = data
  const params = payload && payload.data

  const instance = axios.create({
    headers: {
      'escriptMasterDataType': header,
      [`${HEADER.TOKEN}`]: `${HEADER.BEARER} ${getLocalStorage(SESSION.TOKEN)}`,
    },
  });
  try {
    const data = yield instance.post(serviceList.upload, params)
    if (data && data.data) {
      yield put(MultifileNomineeAddActions.saveMultifileNomineeDetailsResponse(data.data))
    }
  } catch (error) {
    yield put(MultifileNomineeAddActions.saveMultifileNomineeDetailsResponse(error && error.data))
  }
}

function* fetchImagedeleteNominee(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.imageDelete}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(ImageDeleteNomineeActions.saveResponse(json.data))
    }
  } catch (error) {
    if (error) {
      yield put(ImageDeleteNomineeActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: ImageDeleteNomineeActionsTypes.RESPONSE, data })
    }
  }
}


export function* fetchNomineeWatcher() {
  yield all([
    yield takeLatest(NomineeGetIdTypes.GET_NOMINEE_DETAILS, fetchEditUserNominee),
    yield takeLatest(MultifileNomineeAddTypes.GET_MULTIFILE_NOMINEE_DETAILS, fetchMultifileAddNominee),
    yield takeLatest(ImageDeleteNomineeActionsTypes.REQUEST, fetchImagedeleteNominee),

  ])
}