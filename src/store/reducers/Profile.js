import { ProfileGetIdTypes, MultifileAddTypes, ImageDeleteActionsTypes } from '../actions'


export const editProfileInitialState = {
  list: null
}

export const editProfileStoreKey = 'editProfileStore'

export const editProfileReducer = (state = editProfileInitialState, action) => {
  switch (action.type) {
    case ProfileGetIdTypes.GET_PROFILE_DETAILS:
      return { ...state, loadingEA: true }
    case ProfileGetIdTypes.PROFILE_DETAILS_RESPONSE:
      return { ...state, ProfileIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case ProfileGetIdTypes.CLEAR_PROFILE_DETAILS:
      return { ...state, ProfileIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const MultifileAddInitialState = {
  data: null
}

export const MultifileAddStoreKey = 'MultifileAddStore'

export const MultifileAddReducer = (state = MultifileAddInitialState, action) => {
  switch (action.type) {
    case MultifileAddTypes.GET_MULTIFILE_PROFILE_DETAILS:
      return { ...state, loading: true }
    case MultifileAddTypes.PROFILE_MULTIFILE_DETAILS_RESPONSE:
      return { ...state, PropertyAdd: action.data, loading: false }
    case MultifileAddTypes.CLEAR_MULTIFILE_PROFILE_DETAILS:
      return { ...state, PropertyAdd: null }
    default:
      return state
  }
}

export const ImageDeleteStoreKey = 'ImageDeleteStore'

export const ImageDeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case ImageDeleteActionsTypes.REQUEST:
      return { ...state, loadingImagedelete: true }
    case ImageDeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Imagedelete: res,
        statusImagedelete: res.status,
        messageImagedelete: res.message,
        loadingImagedelete: false
      }
    case ImageDeleteActionsTypes.CLEAR:
      return {
        ...state,
        Imagedelete: null,
        statusImagedelete: '',
        messageImagedelete: ''
      }
    default:
      return state
  }
}