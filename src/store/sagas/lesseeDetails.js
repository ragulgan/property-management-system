import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    LesseeListTypes,
    LesseeListActions,
    LesseeListAddTypes,
    LesseeListAddAction,
    LesseeListGetIdTypes,
    LesseeListGetIdActions,
    updateLesseeListActionsTypes,
    updateLesseeListActions,
    LesseeListdeleteActions,
    LesseeListdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchLesseeList(actions) {
    const { params } = actions
    const json = yield axiosInstance.get(serviceList.leases, { params })
    if (json.status === 200) {
        yield put(LesseeListActions.savelesseeListResponse(json.data))
    } else {
        yield put(LesseeListActions.savelesseeListResponse([]))
    }
}

function* fetchLesseeListAdd(action) {
    const { payload } = action
    try {
        const data = yield axiosInstance.post(serviceList.leases, payload)
        if (data && data.data) {
            yield put(LesseeListAddAction.saveLesseeListResponse(data.data))
        }
    } catch (error) {
        yield put(LesseeListAddAction.saveLesseeListResponse(error))
    }
}

function* fetchLesseeById(actions) {
    const { id } = actions
    const endPointUrl = `${serviceList.leases}/${id}`
    const json = yield axiosInstance.get(endPointUrl)
    if (json.status === 200) {
        yield put(LesseeListGetIdActions.saveLesseeListIdDetailsResponse(json.data))
    } else {
        yield put(LesseeListGetIdActions.saveLesseeListIdDetailsResponse([]))
    }
}

function* fetchUpdateLesseeList(actions) {
    const { payload } = actions
    const { id, params } = payload && payload
    const endPointUrl = `${serviceList.leases}/${id}`
    const json = yield axiosInstance.put(endPointUrl, params)
    try {
        const json = yield axiosInstance.put(endPointUrl, params)
        if (json && json.data) {
            yield put(updateLesseeListActions.saveupdateLesseeListResponse(json.data))
        }
    } catch (error) {
        yield put(updateLesseeListActions.saveupdateLesseeListResponse(error && error.data))
    }
}
function* fetchLesseeListdelete(actions) {
    const { id } = actions
    const deleteUrl = `${serviceList.leases}/${id} `
    try {
        const json = yield axiosInstance.delete(deleteUrl)
        if (json.status === 200) {
            yield put(LesseeListdeleteActions.saveResponse(json.data))
        } else {
            yield put(LesseeListdeleteActions.saveResponse([]))
        }
    }
    catch (error) {
        const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
        yield put({ type: LesseeListdeleteActionsTypes.RESPONSE, data })
    }
}

export function* fetchLesseeListWatcher() {
    yield all([
        yield takeLatest(LesseeListTypes.GET_LESSEELIST_LIST, fetchLesseeList),
        yield takeLatest(LesseeListAddTypes.LESSEELIST_POST, fetchLesseeListAdd),
        yield takeLatest(LesseeListGetIdTypes.GET_LESSEELIST_DETAILS, fetchLesseeById),
        yield takeLatest(updateLesseeListActionsTypes.UPDATE_LESSEELIST, fetchUpdateLesseeList),
        yield takeLatest(LesseeListdeleteActionsTypes.REQUEST, fetchLesseeListdelete),
    ])
}