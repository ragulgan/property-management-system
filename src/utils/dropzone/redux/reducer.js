import { UPLOAD_IMAGE } from '../../../store/actions/index'

export const dropzoneInitialState = {
  list: null
}

export const dropzoneStoreKey = 'dropzoneStore'

export const dropzoneReducer = (state = dropzoneInitialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE.REQUEST:
      return Object.assign({}, state, {
        loadingIM: true,
        deletedKey: '',
        dropzoneStatus: '',
        dropzoneImage: []
      })
    case UPLOAD_IMAGE.SUCCESS:
      return Object.assign({}, state, {
        loadingIM: false,
        dropzoneImage: action.uploadImage,
        dropzoneStatus: action.dropzoneStatus,
        messageIM: action.messageIM,
        uploadedImageName: action.uploadedImageName
      })
    case UPLOAD_IMAGE.ERROR:
      return Object.assign({}, state, {
        loadingIM: false,
        error: true,
        dropzoneImage: [],
        dropzoneStatus: action.dropzoneStatus,
        messageIM: action.messageIM
      })
    case UPLOAD_IMAGE.CLEAR:
      return Object.assign({}, state, {
        loadingIM: false,
        error: true,
        dropzoneImage: [],
        dropzoneStatus: '',
        messageIM: ''
      })
    default:
      return state
  }
}

export default dropzoneReducer
