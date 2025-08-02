import {
    LeasesListTypes, LeasesListAddTypes, LeasesListGetIdTypes, updateLeasesListActionsTypes,
    LeasesListdeleteActionsTypes
} from '../actions'

export const LeasesListlistInitialState = {
    list: null
}

export const LeasesListlistStoreKeys = 'LeasesListlistStore'

export const LeasesListlistReducers = (state = LeasesListlistInitialState, action) => {
    switch (action.type) {
        case LeasesListTypes.GET_LEASESLIST_LIST:
            return { ...state, loading: true }
        case LeasesListTypes.SAVE_LEASESLIST_LIST_RESPONSE:
            return { ...state, getAllLeaseList: action.data, loading: false }
        case LeasesListTypes.CLEAR_LEASESLIST_LIST:
            return { ...state, getAllLeaseList: null }
        default:
            return state
    }
}

export const LeasesListAddInitialState = {
    data: null
}

export const LeasesListAddStoreKey = 'LeasesListAddStore'

export const LeasesListAddReducer = (state = LeasesListAddInitialState, action) => {
    switch (action.type) {
        case LeasesListAddTypes.LEASESLIST_POST:
            return { ...state, loading: true }
        case LeasesListAddTypes.LEASESLIST_POST_RESPONSE:
            return { ...state, LeasesListAdd: action.data, LeasesListStatus: action.data.status, LeasesListMessage: action.data.message, loading: false }
        case LeasesListAddTypes.LEASESLIST_POST_CLEAR:
            return { ...state, LeasesListAdd: null }
        default:
            return state
    }
}

export const editLeasesListsInitialState = {
    list: null
}

export const editLeasesListsStoreKey = 'editLeasesListStore'

export const editLeasesListReducer = (state = editLeasesListsInitialState, action) => {
    switch (action.type) {
        case LeasesListGetIdTypes.GET_LEASESLIST_DETAILS:
            return { ...state, loadingEA: true }
        case LeasesListGetIdTypes.LEASESLIST_DETAILS_RESPONSE:
            return { ...state, LeasesListIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
        case LeasesListGetIdTypes.CLEAR_LEASESLIST_DETAILS:
            return { ...state, LeasesListIdDetail: null, messageEA: '', statusEA: '' }
        default:
            return state
    }
}
export const updateLeasesListInitialState = {
    data: null
}

export const updateLeasesListStoreKey = 'updateLeasesListStore'

export const updateLeasesListReducer = (state = updateLeasesListInitialState, action) => {
    switch (action.type) {
        case updateLeasesListActionsTypes.UPDATE_LEASESLIST:
            return { ...state, loading: true }
        case updateLeasesListActionsTypes.SAVE_UPDATE_LEASESLIST_RESPONSE:
            return {
                ...state,
                saveupdateLeasesListResponse: action.data,
                loading: false
            }
        case updateLeasesListActionsTypes.CLEAR_UPDATE_LEASESLIST:
            return { ...state, saveupdateLeasesListResponse: null }
        default:
            return state
    }
}

export const LeasesListdeleteStoreKey = 'LeasesListdeleteStore'

export const LeasesListdeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
        case LeasesListdeleteActionsTypes.REQUEST:
            return { ...state, loadingLeasesListdelete: true }
        case LeasesListdeleteActionsTypes.RESPONSE:
            return {
                ...state,
                LeasesListdelete: res,
                statusLeasesListdelete: res.status,
                messageLeasesListdelete: res.message,
                loadingLeasesListdelete: false
            }
        case LeasesListdeleteActionsTypes.CLEAR:
            return {
                ...state,
                LeasesListdelete: null,
                statusLeasesListdelete: '',
                messageLeasesListdelete: ''
            }
        default:
            return state
    }
}