import { postActionTypes } from '../actions'

export const postsInitialState = {
  posts: null
}

export const postsStoreKey = 'postsStore'

const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case postActionTypes.GET_POSTS:
      return { ...state, loading: true }
    case postActionTypes.SAVE_POSTS_RESPONSE:
      return { ...state, posts: action.data, loading: false }
    case postActionTypes.CLEAR_POSTS:
      return { ...state, posts: null }
    default:
      return state
  }
}

export default postsReducer
