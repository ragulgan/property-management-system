import {
    LesseeListTypes, LesseeListAddTypes, LesseeListGetIdTypes, updateLesseeListActionsTypes,
    LesseeListdeleteActionsTypes
} from '../actions'

export const LesseeListlistInitialState = {
    list: null
}

export const LesseeListlistStoreKeys = 'LesseeListlistStore'

export const LesseeListlistReducers = (state = LesseeListlistInitialState, action) => {
    switch (action.type) {
        case LesseeListTypes.GET_LESSEELIST_LIST:
            return { ...state, loading: true }
        case LesseeListTypes.SAVE_LESSEELIST_LIST_RESPONSE:
            return { ...state, getAllLesseeList: action.data, loading: false }
        case LesseeListTypes.CLEAR_LESSEELIST_LIST:
            return { ...state, getAllLesseeList: null }
        default:
            return state
    }
}

export const LesseeListAddInitialState = {
    data: null
}

export const LesseeListAddStoreKey = 'LesseeListAddStore'

export const LesseeListAddReducer = (state = LesseeListAddInitialState, action) => {
    switch (action.type) {
        case LesseeListAddTypes.LESSEELIST_POST:
            return { ...state, loading: true }
        case LesseeListAddTypes.LESSEELIST_POST_RESPONSE:
            return { ...state, LesseeListAdd: action.data, LesseeListStatus: action.data.status, LesseeListMessage: action.data.message, loading: false }
        case LesseeListAddTypes.LESSEELIST_POST_CLEAR:
            return { ...state, LesseeListAdd: null }
        default:
            return state
    }
}

export const editLesseeListsInitialState = {
    list: null
}

export const editLesseeListsStoreKey = 'editLesseeListStore'

export const editLesseeListReducer = (state = editLesseeListsInitialState, action) => {
    switch (action.type) {
        case LesseeListGetIdTypes.GET_LESSEELIST_DETAILS:
            return { ...state, loadingEA: true }
        case LesseeListGetIdTypes.LESSEELIST_DETAILS_RESPONSE:
            return { ...state, LesseeListIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
        case LesseeListGetIdTypes.CLEAR_LESSEELIST_DETAILS:
            return { ...state, LesseeListIdDetail: null, messageEA: '', statusEA: '' }
        default:
            return state
    }
}
export const updateLesseeListInitialState = {
    data: null
}

export const updateLesseeListStoreKey = 'updateLesseeListStore'

export const updateLesseeListReducer = (state = updateLesseeListInitialState, action) => {
    switch (action.type) {
        case updateLesseeListActionsTypes.UPDATE_LESSEELIST:
            return { ...state, loading: true }
        case updateLesseeListActionsTypes.SAVE_UPDATE_LESSEELIST_RESPONSE:
            return {
                ...state,
                saveupdateLesseeListResponse: action.data,
                loading: false
            }
        case updateLesseeListActionsTypes.CLEAR_UPDATE_LESSEELIST:
            return { ...state, saveupdateLesseeListResponse: null }
        default:
            return state
    }
}

export const LesseeListdeleteStoreKey = 'LesseeListdeleteStore'

export const LesseeListdeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
        case LesseeListdeleteActionsTypes.REQUEST:
            return { ...state, loadingLesseeListdelete: true }
        case LesseeListdeleteActionsTypes.RESPONSE:
            return {
                ...state,
                LesseeListdelete: res,
                statusLesseeListdelete: res.status,
                messageLesseeListdelete: res.message,
                loadingLesseeListdelete: false
            }
        case LesseeListdeleteActionsTypes.CLEAR:
            return {
                ...state,
                LesseeListdelete: null,
                statusLesseeListdelete: '',
                messageLesseeListdelete: ''
            }
        default:
            return state
    }
}