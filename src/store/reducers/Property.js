import { PropertyTypes,PropertyAddTypes,PropertyGetIdTypes,updatePropertyActionsTypes,
    PropertydeleteActionsTypes} from '../actions'
  
  export const PropertylistInitialState = {
    list: null
  }
  
  export const PropertylistStoreKeys = 'PropertylistStore'
  
  export const PropertylistReducers = (state = PropertylistInitialState, action) => {
    switch (action.type) {
      case PropertyTypes.GET_PROPERTY_LIST:
        return { ...state, loading: true }
      case PropertyTypes.SAVE_PROPERTY_LIST_RESPONSE:
        return { ...state, Propertylists: action.data, loading: false }
      case PropertyTypes.CLEAR_PROPERTY_LIST:
        return { ...state, Propertylists: null }
      default:
        return state
    }
  }
  
  export const PropertyAddInitialState = {
    data: null
  } 
  
  export const PropertyAddStoreKey = 'PropertyAddStore'
  
  export const PropertyAddReducer = (state = PropertyAddInitialState, action) => {
    switch (action.type) {
      case PropertyAddTypes.PROPERTY_POST:
        return { ...state, loading: true }
      case PropertyAddTypes.PROPERTY_POST_RESPONSE:
        return { ...state, PropertyAdd: action.data, loading: false }
      case PropertyAddTypes.PROPERTY_POST_CLEAR:
        return { ...state, PropertyAdd: null }
      default:
        return state
    }
  }
  
  export const editPropertysInitialState = {
    list: null
  }
  
  export const editPropertysStoreKey = 'editPropertyStore'
  
  export const editPropertyReducer = (state = editPropertysInitialState, action) => {
    switch (action.type) {
      case PropertyGetIdTypes.GET_PROPERTY_DETAILS:
        return { ...state, loadingEA: true }
      case PropertyGetIdTypes.PROPERTY_DETAILS_RESPONSE:
        return { ...state, PropertyIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case PropertyGetIdTypes.CLEAR_PROPERTY_DETAILS:
        return { ...state, PropertyIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updatePropertyInitialState = {
    data: null
  }
  
  export const updatePropertyStoreKey = 'updatePropertyStore'
  
  export const updatePropertyReducer = (state = updatePropertyInitialState, action) => {
    switch (action.type) {
      case updatePropertyActionsTypes.UPDATE_PROPERTY:
        return { ...state, loading: true }
      case updatePropertyActionsTypes.SAVE_UPDATE_PROPERTY_RESPONSE:
        return {
          ...state,
          saveupdatePropertyResponse: action.data,
          loading: false
        }
      case updatePropertyActionsTypes.CLEAR_UPDATE_PROPERTY:
        return { ...state, saveupdatePropertyResponse: null }
      default:
        return state
    }
  }
  
  export const  PropertydeleteStoreKey = 'PropertydeleteStore'
  
  export const  PropertydeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case  PropertydeleteActionsTypes.REQUEST:
        return { ...state, loadingPropertydelete: true }
      case  PropertydeleteActionsTypes.RESPONSE:
        return {
          ...state,
          Propertydelete: res,
          statusPropertydelete: res.status,
          messagePropertydelete: res.message,
          loadingPropertydelete: false
        }
      case  PropertydeleteActionsTypes.CLEAR:
        return {
          ...state,
          Propertydelete: null,
          statusPropertydelete: '',
          messagePropertydelete: ''
        }
      default:
        return state
    }
  }