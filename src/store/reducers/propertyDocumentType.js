import {
    PropertyDocumentTypeTypes, PropertyDocumentTypeAddTypes, PropertyDocumentTypeGetIdTypes, updatePropertyDocumentTypeActionsTypes,
    PropertyDocumentTypedeleteActionsTypes,
  } from '../actions'
  
  export const PropertyDocumentTypelistInitialState = {
    list: null
  }
  
  export const PropertyDocumentTypelistStoreKeys = 'PropertyDocumentTypelistStore'
  
  export const PropertyDocumentTypelistReducers = (state = PropertyDocumentTypelistInitialState, action) => {
    switch (action.type) {
      case PropertyDocumentTypeTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_LIST:
        return { ...state, loading: true }
      case PropertyDocumentTypeTypes.SAVE_PROPERTY_DOCUMENT_TYPE_TYPE_LIST_RESPONSE:
        return { ...state, getAllPropertyDocumentType: action.data, loading: false }
      case PropertyDocumentTypeTypes.CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_LIST:
        return { ...state, getAllPropertyDocumentType: null }
      default:
        return state
    }
  }
  
  
  export const PropertyDocumentTypeAddInitialState = {
    data: null
  }
  
  export const PropertyDocumentTypeAddStoreKey = 'PropertyDocumentTypeAddStore'
  
  export const PropertyDocumentTypeAddReducer = (state = PropertyDocumentTypeAddInitialState, action) => {
    switch (action.type) {
      case PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST:
        return { ...state, loading: true }
      case PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST_RESPONSE:
        return { ...state, addPropertyDocumentType: action.data, loading: false }
      case PropertyDocumentTypeAddTypes.PROPERTY_DOCUMENT_TYPE_TYPE_POST_CLEAR:
        return { ...state, addPropertyDocumentType: null }
      default:
        return state
    }
  }
  
  
  export const editPropertyDocumentTypesInitialState = {
    list: null
  }
  
  export const editPropertyDocumentTypesStoreKey = 'editPropertyDocumentTypeTypeStore'
  
  export const editPropertyDocumentTypeReducer = (state = editPropertyDocumentTypesInitialState, action) => {
    switch (action.type) {
      case PropertyDocumentTypeGetIdTypes.GET_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS:
        return { ...state, loadingEA: true }
      case PropertyDocumentTypeGetIdTypes.PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS_RESPONSE:
        return { ...state, PropertyDocumentTypeIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
      case PropertyDocumentTypeGetIdTypes.CLEAR_PROPERTY_DOCUMENT_TYPE_TYPE_DETAILS:
        return { ...state, PropertyDocumentTypeIdDetail: null, messageEA: '', statusEA: '' }
      default:
        return state
    }
  }
  export const updatePropertyDocumentTypeInitialState = {
    data: null
  }
  
  export const updatePropertyDocumentTypeStoreKey = 'updatePropertyDocumentTypeStore'
  
  export const updatePropertyDocumentTypeReducer = (state = updatePropertyDocumentTypeInitialState, action) => {
    switch (action.type) {
      case updatePropertyDocumentTypeActionsTypes.UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE:
        return { ...state, loading: true }
      case updatePropertyDocumentTypeActionsTypes.SAVE_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE_RESPONSE:
        return {
          ...state,
          saveupdatePropertyDocumentTypeResponse: action.data,
          loading: false
        }
      case updatePropertyDocumentTypeActionsTypes.CLEAR_UPDATE_PROPERTY_DOCUMENT_TYPE_TYPE:
        return { ...state, saveupdatePropertyDocumentTypeResponse: null }
      default:
        return state
    }
  }
  
  export const PropertyDocumentTypedeleteStoreKey = 'PropertyDocumentTypedeleteStore'
  
  export const PropertyDocumentTypedeleteReducer = (state = {}, action) => {
    const res = action && action.data
    switch (action.type) {
      case PropertyDocumentTypedeleteActionsTypes.REQUEST:
        return { ...state, loadingPropertyDocumentTypedelete: true }
      case PropertyDocumentTypedeleteActionsTypes.RESPONSE:
        return {
          ...state,
          PropertyDocumentTypedelete: res,
          statusPropertyDocumentTypedelete: res.status,
          messagePropertyDocumentTypedelete: res.message,
          loadingPropertyDocumentTypedelete: false
        }
      case PropertyDocumentTypedeleteActionsTypes.CLEAR:
        return {
          ...state,
          PropertyDocumentTypedelete: null,
          statusPropertyDocumentTypedelete: '',
          messagePropertyDocumentTypedelete: ''
        }
      default:
        return state
    }
  }