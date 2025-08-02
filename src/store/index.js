import configureStore from './configureStore'
import { postsInitialState, postsStoreKey } from './reducers/posts'

const initialState = {
  //[postsStoreKey]: { ...postsInitialState }
}

const store = configureStore(initialState)

export default store
