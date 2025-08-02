import {
  PaymentsTypes, PaymentsAddTypes, PaymentsGetIdTypes, updatePaymentsActionsTypes,
  PaymentsdeleteActionsTypes,
} from '../actions'

export const PaymentslistInitialState = {
  list: null
}

export const PaymentslistStoreKeys = 'PaymentslistStore'

export const PaymentslistReducers = (state = PaymentslistInitialState, action) => {
  switch (action.type) {
    case PaymentsTypes.GET_PAYMENT_LIST:
      return { ...state, loading: true }
    case PaymentsTypes.SAVE_PAYMENT_LIST_RESPONSE:
      return { ...state, Paymentslists: action.data, loading: false }
    case PaymentsTypes.CLEAR_PAYMENT_LIST:
      return { ...state, Paymentslists: null }
    default:
      return state
  }
}


export const PaymentsAddInitialState = {
  data: null
}

export const PaymentsAddStoreKey = 'PaymentsAddStore'

export const PaymentsAddReducer = (state = PaymentsAddInitialState, action) => {
  switch (action.type) {
    case PaymentsAddTypes.PAYMENT_POST:
      return { ...state, loading: true }
    case PaymentsAddTypes.PAYMENT_POST_RESPONSE:
      return { ...state, PaymentsAdd: action.data, Paymentstatus: action.data.status, PaymentsMessage: action.data.message, loading: false }
    case PaymentsAddTypes.PAYMENT_POST_CLEAR:
      return { ...state, PaymentsAdd: null }
    default:
      return state
  }
}


export const editPaymentssInitialState = {
  list: null
}

export const editPaymentssStoreKey = 'editPaymentssStore'

export const editPaymentsReducer = (state = editPaymentssInitialState, action) => {
  switch (action.type) {
    case PaymentsGetIdTypes.GET_PAYMENT_DETAILS:
      return { ...state, loadingEA: true }
    case PaymentsGetIdTypes.PAYMENT_DETAILS_RESPONSE:
      return { ...state, PaymentsIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case PaymentsGetIdTypes.CLEAR_PAYMENT_DETAILS:
      return { ...state, PaymentsIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updatePaymentsInitialState = {
  data: null
}

export const updatePaymentsStoreKey = 'updatePaymentsStore'

export const updatePaymentsReducer = (state = updatePaymentsInitialState, action) => {
  switch (action.type) {
    case updatePaymentsActionsTypes.UPDATE_PAYMENT:
      return { ...state, loading: true }
    case updatePaymentsActionsTypes.SAVE_UPDATE_PAYMENT_RESPONSE:
      return {
        ...state,
        saveupdatePaymentsResponse: action.data,
        loading: false
      }
    case updatePaymentsActionsTypes.CLEAR_UPDATE_PAYMENT:
      return { ...state, saveupdatePaymentsResponse: null }
    default:
      return state
  }
}

export const PaymentsdeleteStoreKey = 'PaymentsdeleteStore'

export const PaymentsdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case PaymentsdeleteActionsTypes.REQUEST:
      return { ...state, loadingPaymentsdelete: true }
    case PaymentsdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Paymentsdelete: res,
        statusPaymentsdelete: res.status,
        messagePaymentsdelete: res.message,
        loadingPaymentsdelete: false
      }
    case PaymentsdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Paymentsdelete: null,
        statusPaymentsdelete: '',
        messagePaymentsdelete: ''
      }
    default:
      return state
  }
}