import { DELETE_IMAGE } from '../../../../helper/types'

function removeImageducer (state = {}, action) {
  switch (action.type) {
    case DELETE_IMAGE.REQUEST:
      return Object.assign({}, state, {
        loadingDI: true
      })
    case DELETE_IMAGE.SUCCESSS:
      return Object.assign({}, state, {
        loadingDI: false,
        removeImageList: action.removeImage,
        statusDI: action.statusDI,
        messageDI: action.messageDI
      })
    case DELETE_IMAGE.ERROR:
      return Object.assign({}, state, {
        loadingDI: false,
        error: true,
        removeImageList: [],
        statusDI: action.statusDI,
        messageDI: action.messageDI
      })
    case DELETE_IMAGE.CLEAR:
      return Object.assign({}, state, {
        loadingDI: false,
        error: true,
        removeImageList: [],
        statusDI: '',
        messageDI: ''
      })
    default:
      return state
  }
}

export default removeImageducer
