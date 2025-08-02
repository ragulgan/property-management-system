import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'
import { ProfileGetIdActions, ProfileGetIdTypes, MultifileAddActions, MultifileAddTypes, ImageDeleteActions, ImageDeleteActionsTypes } from '../actions'
import axios from 'axios'
import { HEADER, SESSION } from '../../utils/constants'
import { getLocalStorage } from '../../utils/helper'

function* fetchEditUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.users}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(ProfileGetIdActions.saveProfileIdDetailsResponse(json.data))
  } else {
    yield put(ProfileGetIdActions.saveProfileIdDetailsResponse([]))
  }
}

function* fetchMultifileAdd(action) {
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
      yield put(MultifileAddActions.saveMultifileProfileDetailsResponse(data.data))
    }
  } catch (error) {
    yield put(MultifileAddActions.saveMultifileProfileDetailsResponse(error && error.data))
  }
}

function* fetchImagedelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.imageDelete}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(ImageDeleteActions.saveResponse(json.data))
    }
  } catch (error) {
    if (error) {
      yield put(ImageDeleteActions.saveResponse(error && error.data))
    } else {
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: ImageDeleteActionsTypes.RESPONSE, data })
    }
  }
}


export function* fetchProfileWatcher() {
  yield all([
    yield takeLatest(ProfileGetIdTypes.GET_PROFILE_DETAILS, fetchEditUser),
    yield takeLatest(MultifileAddTypes.GET_MULTIFILE_PROFILE_DETAILS, fetchMultifileAdd),
    yield takeLatest(ImageDeleteActionsTypes.REQUEST, fetchImagedelete),

  ])
}