import { DELETE_IMAGE } from '../../../../helper/types'
import { ERROR } from '../../../../lib/constants'

export function removeImage (data) {
  return {
    type: DELETE_IMAGE.GET_LIST,
    payload: data
  }
}

export function removeImageRequest () {
  return {
    type: DELETE_IMAGE.REQUEST
  }
}

export function removeImageSuccess (response) {
  const { data, status } = response
  return {
    type: DELETE_IMAGE.SUCCESSS,
    statusDI: status,
    messageDI: response.message,
    removeImage: data
  }
}

export function removeImageError (response) {
  return {
    type: DELETE_IMAGE.ERROR,
    statusDI: ERROR.MSG,
    messageDI: response && response.message ? response.message : 'Something went wrong!'
  }
}
