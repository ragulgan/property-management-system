import { ERROR } from '../../constants'

export const UPLOAD_IMAGE = {
  GET_LIST: 'GET_REQUEST_UPLOAD',
  REQUEST: 'REQUEST_UPLOAD_IMAGE',
  SUCCESS: 'SUCCESS_UPLOAD_IMAGE',
  ERROR: 'ERROR_UPLOAD_IMAGE',
  CLEAR: 'CLEAR_UPLOAD_IMAGE'
}

export const UploadActions = {
  uploadImage: (data, name) => (
    {
      type: UPLOAD_IMAGE.REQUEST,
      payload: data,
      name: name
    }),
  uploadImageSuccess: (data) => ({
    type: UPLOAD_IMAGE.SUCCESS,
    uploadImage: data,
  }),
  uploadImageError: () => ({
    type: UPLOAD_IMAGE.ERROR
  }),
  uploadImageClear: (data) => ({
    type: UPLOAD_IMAGE.CLEAR,
    uploadImage: data,
  })
}


// export function uploadImage (data, name) {
//   return {
//     type: UPLOAD_IMAGE.GET_LIST,
//     payload: data,
//     name: name
//   }
// }

// export function uploadImageRequest () {
//   return {
//     type: UPLOAD_IMAGE.REQUEST
//   }
// }

// export function uploadImageSuccess (response, name) {
//   const { data, status } = response
//   return {
//     type: UPLOAD_IMAGE.SUCCESS,
//     dropzoneStatus: status,
//     messageIM: response.message,
//     uploadImage: data,
//     uploadedImageName: name
//   }
// }

// export function uploadImageError (response) {
//   return {
//     type: UPLOAD_IMAGE.ERROR,
//     dropzoneStatus: ERROR.MSG,
//     messageIM: response && response.message ? response.message : 'Something went wrong!'
//   }
// }
