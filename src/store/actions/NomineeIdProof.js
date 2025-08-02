export const NomineeGetIdTypes = {
    GET_NOMINEE_DETAILS: 'GET_NOMINEE_DETAILS',
    NOMINEE_DETAILS_RESPONSE: 'NOMINEE_DETAILS_RESPONSE',
    CLEAR_NOMINEE_DETAILS: 'CLEAR_NOMINEE_DETAILS'
  }
  
  export const NomineeGetIdActions = {
    getNomineeIdDetails: (id) => ({
      type: NomineeGetIdTypes.GET_NOMINEE_DETAILS,
      id
    }),
    saveNomineeIdDetailsResponse: data => ({
      type: NomineeGetIdTypes.NOMINEE_DETAILS_RESPONSE,
      data
    }),
    clearNomineeIdDetails: () => ({
      type: NomineeGetIdTypes.CLEAR_NOMINEE_DETAILS
    })
  }
  
  export const MultifileNomineeAddTypes = {
    GET_MULTIFILE_NOMINEE_DETAILS: 'GET_MULTIFILE_NOMINEE_DETAILS',
    NOMINEE_MULTIFILE_DETAILS_RESPONSE: 'NOMINEE_MULTIFILE_DETAILS_RESPONSE',
    CLEAR_MULTIFILE_NOMINEE_DETAILS: 'CLEAR_MULTIFILE_NOMINEE_DETAILS'
  }
  
  export const MultifileNomineeAddActions = {
    getMultifileNomineeDetails: (data, name) => ({
      type: MultifileNomineeAddTypes.GET_MULTIFILE_NOMINEE_DETAILS,
      payload: { data, name }
    }),
    saveMultifileNomineeDetailsResponse: data => ({
      type: MultifileNomineeAddTypes.NOMINEE_MULTIFILE_DETAILS_RESPONSE,
      data
    }),
    clearMultifileNomineeDetails: () => ({
      type: MultifileNomineeAddTypes.CLEAR_MULTIFILE_NOMINEE_DETAILS
    })
  }
  
  export const ImageDeleteNomineeActionsTypes = {
    REQUEST: 'USER_IMAGE_DELETE_REQUEST',
    RESPONSE: 'USER_IMAGE_DELETE_RESPONSE',
    ERROR: 'USER_IMAGE_DELETE_ERROR',
    CLEAR: 'USER_IMAGE_DELETE_CLEAR'
  }
  
  export const ImageDeleteNomineeActions = {
    delete: (id) => ({
      type: ImageDeleteNomineeActionsTypes.REQUEST,
      id
    }),
    saveResponse: (data) => ({
      type: ImageDeleteNomineeActionsTypes.RESPONSE,
      data
    }),
    clear: () => ({
      type: ImageDeleteNomineeActionsTypes.CLEAR
    })
  }
  
  