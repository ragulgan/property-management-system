import { put, takeLatest, all } from 'redux-saga/effects'
import axiosInstance from '../../services'
import {
    LeasesListTypes,
    LeasesListActions,
    LeasesListAddTypes,
    LeasesListAddAction,
    LeasesListGetIdTypes,
    LeasesListGetIdActions,
    updateLeasesListActionsTypes,
    updateLeasesListActions,
    LeasesListdeleteActions,
    LeasesListdeleteActionsTypes
} from '../actions'
import serviceList from '../../services/serviceList'
import { API_MESSAGES } from '../../utils/constants'

function* fetchleasesListlist(actions) {
    const { params } = actions
    const json = yield axiosInstance.get(serviceList.leases, { params })
    if (json.status === 200) {
        yield put(LeasesListActions.saveleasesListlistResponse(json.data))
    } else {
        yield put(LeasesListActions.saveleasesListlistResponse([]))
    }
}

function* fetchLeasesListAdd(action) {
    const { payload } = action
    try {
        const data = yield axiosInstance.post(serviceList.leases, payload)
        if (data && data.data) {
            yield put(LeasesListAddAction.saveLeasesListResponse(data.data))
        }
    } catch (error) {
        yield put(LeasesListAddAction.saveLeasesListResponse(error))
    }
}

function* fetchLeasesList(actions) {
    const { id } = actions
    const endPointUrl = `${serviceList.leases}/${id}`
    const json = yield axiosInstance.get(endPointUrl)
    if (json.status === 200) {
        yield put(LeasesListGetIdActions.saveLeasesListIdDetailsResponse(json.data))
    } else {
        yield put(LeasesListGetIdActions.saveLeasesListIdDetailsResponse([]))
    }
}

function* fetchUpdateLeasesList(actions) {
    const { payload } = actions
    const { id, params } = payload && payload
    const endPointUrl = `${serviceList.leases}/${id}`
    const json = yield axiosInstance.put(endPointUrl, params)
    try {
        const json = yield axiosInstance.put(endPointUrl, params)
        if (json && json.data) {
            yield put(updateLeasesListActions.saveupdateLeasesListResponse(json.data))
        }
    } catch (error) {
        yield put(updateLeasesListActions.saveupdateLeasesListResponse(error && error.data))
    }
}
function* fetchLeasesListdelete(actions) {
    const { id } = actions
    const deleteUrl = `${serviceList.leases}/${id} `
    try {
        const json = yield axiosInstance.delete(deleteUrl)
        if (json.status === 200) {
            yield put(LeasesListdeleteActions.saveResponse(json.data))
        } else {
            yield put(LeasesListdeleteActions.saveResponse([]))
        }
    }
    catch (error) {
        const data = { status: 'error', message: API_MESSAGES.SOMETHING_WRONG }
        yield put({ type: LeasesListdeleteActionsTypes.RESPONSE, data })
    }
}

export function* fetchleasesListWatcher() {
    yield all([
        yield takeLatest(LeasesListTypes.GET_LEASESLIST_LIST, fetchleasesListlist),
        yield takeLatest(LeasesListAddTypes.LEASESLIST_POST, fetchLeasesListAdd),
        yield takeLatest(LeasesListGetIdTypes.GET_LEASESLIST_DETAILS, fetchLeasesList),
        yield takeLatest(updateLeasesListActionsTypes.UPDATE_LEASESLIST, fetchUpdateLeasesList),
        yield takeLatest(LeasesListdeleteActionsTypes.REQUEST, fetchLeasesListdelete),
    ])
}