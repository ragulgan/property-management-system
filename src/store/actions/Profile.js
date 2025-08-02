export const ProfileGetIdTypes = {
  GET_PROFILE_DETAILS: 'GET_PROFILE_DETAILS',
  PROFILE_DETAILS_RESPONSE: 'PROFILE_DETAILS_RESPONSE',
  CLEAR_PROFILE_DETAILS: 'CLEAR_PROFILE_DETAILS'
}

export const ProfileGetIdActions = {
  getProfileIdDetails: (id) => ({
    type: ProfileGetIdTypes.GET_PROFILE_DETAILS,
    id
  }),
  saveProfileIdDetailsResponse: data => ({
    type: ProfileGetIdTypes.PROFILE_DETAILS_RESPONSE,
    data
  }),
  clearProfileIdDetails: () => ({
    type: ProfileGetIdTypes.CLEAR_PROFILE_DETAILS
  })
}

export const MultifileAddTypes = {
  GET_MULTIFILE_PROFILE_DETAILS: 'GET_MULTIFILE_PROFILE_DETAILS',
  PROFILE_MULTIFILE_DETAILS_RESPONSE: 'PROFILE_MULTIFILE_DETAILS_RESPONSE',
  CLEAR_MULTIFILE_PROFILE_DETAILS: 'CLEAR_MULTIFILE_PROFILE_DETAILS'
}

export const MultifileAddActions = {
  getMultifileProfileDetails: (data, name) => ({
    type: MultifileAddTypes.GET_MULTIFILE_PROFILE_DETAILS,
    payload: { data, name }
  }),
  saveMultifileProfileDetailsResponse: data => ({
    type: MultifileAddTypes.PROFILE_MULTIFILE_DETAILS_RESPONSE,
    data
  }),
  clearMultifileProfileDetails: () => ({
    type: MultifileAddTypes.CLEAR_MULTIFILE_PROFILE_DETAILS
  })
}

export const ImageDeleteActionsTypes = {
  REQUEST: 'USER_IMAGE_DELETE_REQUEST',
  RESPONSE: 'USER_IMAGE_DELETE_RESPONSE',
  ERROR: 'USER_IMAGE_DELETE_ERROR',
  CLEAR: 'USER_IMAGE_DELETE_CLEAR'
}

export const ImageDeleteActions = {
  delete: (id) => ({
    type: ImageDeleteActionsTypes.REQUEST,
    id
  }),
  saveResponse: (data) => ({
    type: ImageDeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: ImageDeleteActionsTypes.CLEAR
  })
}

