import { PropertyDocTypes,PropertyDocAddTypes,PropertyDocGetIdTypes,updatePropertyDocActionsTypes,
    PropertyDocdeleteActionsTypes} from '../actions'
  
  export const PropertyDoclistInitialState = {
    list: null
  }
  
  export const PropertyDoclistStoreKeys = 'PropertyDoclistStore'
  
  export const PropertyDoclistReducers = (state = PropertyDoclistInitialState, action) => {
    switch (action.type) {
      case PropertyDocTypes.GET_PROPERTY_DOC_LIST:
        return { ...state, loading: true }
      case PropertyDocTypes.SAVE_PROPERTY_DOC_LIST_RESPONSE:
        return { ...state, PropertyDoclists: action.data, loading: false }
      case PropertyDocTypes.CLEAR_PROPERTY_DOC_LIST:
        return { ...state, PropertyDoclists: null }
      default:
        return state
    }
  }
  
  export const PropertyDocAddInitialState = {
    data: null
  } 
  
  export const PropertyDocAddStoreKey = 'PropertyDocAddStore'
  
  export const PropertyDocAddReducer = (state = PropertyDocAddInitialState, action) => {
    switch (action.type) {
      case PropertyDocAddTypes.PROPERTY_DOC_POST:
        return { ...state, loading: true }
      case PropertyDocAddTypes.PROPERTY_POST_DOC_RESPONSE:
        return { ...state, PropertyDocAdd: action.data, loading: false }
      case PropertyDocAddTypes.PROPERTY_POST_DOC_CLEAR:
        return { ...state, PropertyDocAdd: null }
      default:
        return state
    }
  }
  
  export const editPropertysDocInitialState = {
    list: null
  }
  
  export const editPropertysDocStoreKey = 'editPropertyDocStore'
  
  export const editPropertyDocReducer = (state = editPropertysDocInitialState, action) => {
    switch (action.type) {
      case PropertyDocGetIdTypes.GET_PROPERTY_DOC_DETAILS:
        return { ...state, loadingEA: true }
      case PropertyDocGetIdTypes.PROPERTY_DETAILS_DOC_RESPONSE:
        return { ...state, PropertyDocIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case PropertyDocGetIdTypes.CLEAR_PROPERTY_DOC_DETAILS:
        return { ...state, PropertyDocIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updatePropertyDocInitialState = {
    data: null
  }
  
  export const updatePropertyDocStoreKey = 'updatePropertyDocStore'
  
  export const updatePropertyDocReducer = (state = updatePropertyDocInitialState, action) => {
    switch (action.type) {
      case updatePropertyDocActionsTypes.UPDATE_PROPERTY_DOC:
        return { ...state, loading: true }
      case updatePropertyDocActionsTypes.SAVE_UPDATE_PROPERTY_DOC_RESPONSE:
        return {
          ...state,
          saveupdatePropertyDocResponse: action.data,
          loading: false
        }
      case updatePropertyDocActionsTypes.CLEAR_UPDATE_PROPERTY_DOC:
        return { ...state, saveupdatePropertyDocResponse: null }
      default:
        return state
    }
  }
  
  export const  PropertyDocdeleteStoreKey = 'PropertyDocdeleteStore'
  
  export const  PropertyDocdeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case  PropertyDocdeleteActionsTypes.REQUEST:
        return { ...state, loadingPropertydelete: true }
      case  PropertyDocdeleteActionsTypes.RESPONSE:
        return {
          ...state,
          PropertyDocdelete: res,
          statusPropertyDocdelete: res.status,
          messagePropertyDocdelete: res.message,
          loadingPropertyDocdelete: false
        }
      case  PropertyDocdeleteActionsTypes.CLEAR:
        return {
          ...state,
          PropertyDocdelete: null,
          statusPropertyDocdelete: '',
          messagePropertyDocdelete: ''
        }
      default:
        return state
    }
  }