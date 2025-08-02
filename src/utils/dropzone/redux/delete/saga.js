import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects'
import _ from 'lodash'
import { DELETE_IMAGE } from '../../../../helper/types'
import {
  removeImageRequest,
  removeImageSuccess,
  removeImageError
} from './action'
import API from '../../../../redux/axiosConfig'
import { apiUrl } from '../../../../helper/apiUrl'

export function * removeImageListAsync (action) {
  const params = _.pickBy(action.payload, _.identity)
  try {
    yield put(removeImageRequest())
    const data = yield call(() => API.delete(`${apiUrl.UPLOADS}`, { params }))
    yield put(removeImageSuccess(data))
  } catch (error) {
    yield put(removeImageError())
  }
}

function * fetchremoveImageRootSaga () {
  yield all([
    yield takeEvery(DELETE_IMAGE.GET_LIST, removeImageListAsync)
  ])
}

const fetchremoveImageSaga = [
  fork(fetchremoveImageRootSaga)
]

export default fetchremoveImageSaga
