import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import { UserTypes, UsersActions, UserAddTypes, UserAddAction, UserGetIdTypes, UserGetIdActions, updateUserActionsTypes, updateUserActions, UserdeleteActionsTypes, UserdeleteActions, UserDropDownGetActions, UserDropDownGetIdTypes } from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchUSERrlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.users, { params })
  if (json.status === 200) {
    yield put(UsersActions.saveUSERlistResponse(json.data))
  } else {
    yield put(UsersActions.saveUSERlistResponse([]))
  }
}

function* fetchUserAdd(action) {
  const { payload } = action
  try {
    const data = yield axiosInstance.post(serviceList.users, payload)
    if (data && data.data) {
      yield put(UserAddAction.saveUserResponse(data.data))
    }
  } catch (error) {
    yield put(UserAddAction.saveUserResponse(error && error.data))
  }
}


function* fetchEditUser(actions) {
  const { id } = actions
  const endPointUrl = `${serviceList.users}/${id}`
  const json = yield axiosInstance.get(endPointUrl)
  if (json.status === 200) {
    yield put(UserGetIdActions.saveUserIdDetailsResponse(json.data))
  } else {
    yield put(UserGetIdActions.saveUserIdDetailsResponse([]))
  }
}

function* fetchupdateUser(actions) {
  const { payload } = actions
  const { id, params } = payload && payload
  const endPointUrl = `${serviceList.users}/${id}`
  try {
     const json = yield axiosInstance.put(endPointUrl, params)
    if (json && json.data) {
      yield put(updateUserActions.saveupdateUserResponse(json.data))
    }
  } catch (error) {
    yield put(updateUserActions.saveupdateUserResponse(error && error.data))
  }
}

function* fetchUserdelete(actions) {
  const { id } = actions
  const deleteUrl = `${serviceList.users}/${id} `
  try {
    const json = yield axiosInstance.delete(deleteUrl)
    if (json && json.data) {
      yield put(UserdeleteActions.savemResponse(json.data))
    }
  }catch (error) {
    if(error){
      yield put(UserdeleteActions.savemResponse(error && error.data))
    }else{
      const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
      yield put({ type: UserdeleteActionsTypes.RESPONSE, data })
    }
  }
}


function* fetchUserDropDownlist(actions) {
  const { params } = actions
  const json = yield axiosInstance.get(serviceList.role, { params })
  if (json.status === 200) {
    yield put(UserDropDownGetActions.saveUserDropDownIdDetailsResponse(json.data))
  } else {
    yield put(UserDropDownGetActions.saveUserDropDownIdDetailsResponse([]))
  }
}

export function* fetchUSERWatcher() {
  yield all([
    yield takeLatest(UserTypes.GET_USER_LIST, fetchUSERrlist),
    yield takeLatest(UserAddTypes.USER_POST, fetchUserAdd),
    yield takeLatest(UserGetIdTypes.GET_USER_DETAILS, fetchEditUser),
    yield takeLatest(updateUserActionsTypes.UPDATE_USER, fetchupdateUser),
    yield takeLatest(UserdeleteActionsTypes.REQUEST, fetchUserdelete),
    yield takeLatest(UserDropDownGetIdTypes.GET_USER_DROPDOWN_DETAILS, fetchUserDropDownlist),


  ])
}