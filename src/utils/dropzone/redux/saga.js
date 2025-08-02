import { put, takeLatest, all } from 'redux-saga/effects'
import {
  UPLOAD_IMAGE,
  UploadActions,
} from '../../../store/actions/index'
import serviceList from '../../../services/serviceList'
import axiosInstance from '../../../services'
import axios from 'axios'
import { getLocalStorage } from '../../../utils/helper'
import { HEADER, SESSION } from '../../../utils/constants'
import { useState } from 'react'

// Create the axios instance with dynamic values

function* fetchUpload(action) {
  let header;
  const { payload } = action
  const data = action && action.name
  header = data
  const instance = axios.create({
    headers: {
      'escriptMasterDataType': header,
      [`${HEADER.TOKEN}`]: `${HEADER.BEARER} ${getLocalStorage(SESSION.TOKEN)}`,
    },
  });
  try {
    const data = yield instance.post(serviceList.upload, payload)
    if (data && data.data) {
      yield put(UploadActions.uploadImageSuccess(data.data))
    }
  } catch (error) {
    yield put(UploadActions.uploadImageError(error))
  }
}


export function* fetchUploadWatcher() {
  yield all([
    yield takeLatest(UPLOAD_IMAGE.REQUEST, fetchUpload)
  ])
}
