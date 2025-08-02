import { UserTypes, UserAddTypes, UserGetIdTypes, updateUserActionsTypes, UserdeleteActionsTypes, UserDropDownGetIdTypes } from '../actions'

export const USERlistInitialState = {
  list: null
}

export const USERlistStoreKeys = 'USERlistStore'

export const USERlistReducers = (state = USERlistInitialState, action) => {
  switch (action.type) {
    case UserTypes.GET_USER_LIST:
      return { ...state, loading: true }
    case UserTypes.SAVE_USER_LIST_RESPONSE:
      return { ...state, getAllUsers: action.data, loading: false }
    case UserTypes.CLEAR_USER_LIST:
      return { ...state, getAllUsers: null }
    default:
      return state
  }
}

export const UserAddInitialState = {
  data: null
}

export const UserAddStoreKey = 'UserAddStore'

export const UserAddReducer = (state = UserAddInitialState, action) => {
  switch (action.type) {
    case UserAddTypes.USER_POST:
      return { ...state, loading: true }
    case UserAddTypes.USER_POST_RESPONSE:
      return { ...state, addUser: action.data, loading: false }
    case UserAddTypes.USER_POST_CLEAR:
      return { ...state, addUser: null }
    default:
      return state
  }
}

export const editUsersInitialState = {
  list: null
}

export const editUsersStoreKey = 'editUsersStore'

export const editUsersReducer = (state = editUsersInitialState, action) => {
  switch (action.type) {
    case UserGetIdTypes.GET_USER_DETAILS:
      return { ...state, loadingEA: true }
    case UserGetIdTypes.USER_DETAILS_RESPONSE:
      return { ...state, UsersIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case UserGetIdTypes.CLEAR_USER_DETAILS:
      return { ...state, UsersIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const updateUserInitialState = {
  data: null
}

export const updateUserStoreKey = 'updateUserStore'

export const updateUserReducer = (state = updateUserInitialState, action) => {
  switch (action.type) {
    case updateUserActionsTypes.UPDATE_USER:
      return { ...state, loading: true }
    case updateUserActionsTypes.SAVE_UPDATE_USER_RESPONSE:
      return {
        ...state,
        updateUserResponce: action.data,
        loading: false
      }
    case updateUserActionsTypes.CLEAR_UPDATE_USER:
      return { ...state, updateUserResponce: null }
    default:
      return state
  }
}

export const UserdeleteStoreKey = 'UserdeleteStore'

export const UserdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case UserdeleteActionsTypes.REQUEST:
      return { ...state, loadingUserdelete: true }
    case UserdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Userdelete: res,
        statusUserdelete: res.status,
        messageUserdelete: res.message,
        loadingUserdelete: false
      }
    case UserdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Userdelete: null,
        statusUserdelete: '',
        messageUserdelete: ''
      }
    default:
      return state
  }
}



export const UserDropDownInitialState = {
  list: null
}

export const USERlistDropDownStoreKeys = 'UserlistDropDownStore'

export const UserlistDropDownReducers = (state = UserDropDownInitialState, action) => {
  switch (action.type) {
    case UserDropDownGetIdTypes.GET_USER_DROPDOWN_DETAILS:
      return { ...state, loading: true }
    case UserDropDownGetIdTypes.USER_DROPDOWN_DETAILS_RESPONSE:
      return { ...state, getDropDown: action.data, loading: false }
    case UserDropDownGetIdTypes.CLEAR_DROPDOWN_USER_DETAILS:
      return { ...state, getDropDown: null }
    default:
      return state
  }
}