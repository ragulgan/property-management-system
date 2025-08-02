export const actionTypes = {
  GET_POSTS: 'GET_POSTS',
  SAVE_POSTS_RESPONSE: 'SAVE_POSTS_RESPONSE',
  CLEAR_POSTS: 'CLEAR_POSTS'
}

export const actions = {
  getPosts: () => ({
    type: actionTypes.GET_POSTS
  }),
  savePostsResponse: data => ({
    type: actionTypes.SAVE_POSTS_RESPONSE,
    data
  }),
  clearPosts: () => ({
    type: actionTypes.CLEAR_POSTS
  })
}
