import { NomineeGetIdTypes, MultifileNomineeAddTypes, ImageDeleteNomineeActionsTypes } from '../actions'


export const editNomineeInitialState = {
  list: null
}

export const editNomineeStoreKey = 'editNomineeStore'

export const editNomineeReducer = (state = editNomineeInitialState, action) => {
  switch (action.type) {
    case NomineeGetIdTypes.GET_NOMINEE_DETAILS:
      return { ...state, loadingEA: true }
    case NomineeGetIdTypes.NOMINEE_DETAILS_RESPONSE:
      return { ...state, NomineeIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case NomineeGetIdTypes.CLEAR_NOMINEE_DETAILS:
      return { ...state, NomineeIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}

export const MultifileNomineeAddInitialState = {
  data: null
}

export const MultifileNomineeAddStoreKey = 'MultifileNomineeAddStore'

export const MultifileNomineeAddReducer = (state = MultifileNomineeAddInitialState, action) => {
  switch (action.type) {
    case MultifileNomineeAddTypes.GET_MULTIFILE_NOMINEE_DETAILS:
      return { ...state, loading: true }
    case MultifileNomineeAddTypes.NOMINEE_MULTIFILE_DETAILS_RESPONSE:
      return { ...state, NomineeIdAdd: action.data, loading: false }
    case MultifileNomineeAddTypes.CLEAR_MULTIFILE_NOMINEE_DETAILS:
      return { ...state, NomineeIdAdd: null }
    default:
      return state
  }
}

export const ImageDeleteNomineeStoreKey = 'ImageDeleteNomineeStore'

export const ImageDeleteNomineeReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case ImageDeleteNomineeActionsTypes.REQUEST:
      return { ...state, loadingImagedeleteNominee: true }
    case ImageDeleteNomineeActionsTypes.RESPONSE:
      return {
        ...state,
        ImagedeleteNominee: res,
        statusImagedeleteNominee: res.status,
        messageImagedeleteNominee: res.message,
        loadingImagedeleteNominee: false
      }
    case ImageDeleteNomineeActionsTypes.CLEAR:
      return {
        ...state,
        ImagedeleteNominee: null,
        statusImagedeleteNominee: '',
        messageImagedeleteNominee: ''
      }
    default:
      return state
  }
}