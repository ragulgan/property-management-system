import {
  TransactionsTypes, TransactionsAddTypes, TransactionsGetIdTypes, updateTransactionsActionsTypes,
  TransactionsdeleteActionsTypes,
} from '../actions'

export const TransactionslistInitialState = {
  list: null
}

export const TransactionslistStoreKeys = 'TransactionslistStore'

export const TransactionslistReducers = (state = TransactionslistInitialState, action) => {
  switch (action.type) {
    case TransactionsTypes.GET_TRANSACTION_LIST:
      return { ...state, loading: true }
    case TransactionsTypes.SAVE_TRANSACTION_LIST_RESPONSE:
      return { ...state, Transactionslists: action.data, loading: false }
    case TransactionsTypes.CLEAR_TRANSACTION_LIST:
      return { ...state, Transactionslists: null }
    default:
      return state
  }
}


export const TransactionsAddInitialState = {
  data: null
}

export const TransactionsAddStoreKey = 'TransactionsAddStore'

export const TransactionsAddReducer = (state = TransactionsAddInitialState, action) => {
  switch (action.type) {
    case TransactionsAddTypes.TRANSACTION_POST:
      return { ...state, loading: true }
    case TransactionsAddTypes.TRANSACTION_POST_RESPONSE:
      return { ...state, TransactionsAdd: action.data, Transactionstatus: action.data.status, TransactionsMessage: action.data.message, loading: false }
    case TransactionsAddTypes.TRANSACTION_POST_CLEAR:
      return { ...state, TransactionsAdd: null }
    default:
      return state
  }
}


export const editTransactionssInitialState = {
  list: null
}

export const editTransactionssStoreKey = 'editTransactionssStore'

export const editTransactionsReducer = (state = editTransactionssInitialState, action) => {
  switch (action.type) {
    case TransactionsGetIdTypes.GET_TRANSACTION_DETAILS:
      return { ...state, loadingEA: true }
    case TransactionsGetIdTypes.TRANSACTION_DETAILS_RESPONSE:
      return { ...state, TransactionsIdDetail: action.data, statusEA: action.data.status, messageEA: action.data.message, loadingEA: false }
    case TransactionsGetIdTypes.CLEAR_TRANSACTION_DETAILS:
      return { ...state, TransactionsIdDetail: null, messageEA: '', statusEA: '' }
    default:
      return state
  }
}
export const updateTransactionsInitialState = {
  data: null
}

export const updateTransactionsStoreKey = 'updateTransactionsStore'

export const updateTransactionsReducer = (state = updateTransactionsInitialState, action) => {
  switch (action.type) {
    case updateTransactionsActionsTypes.UPDATE_TRANSACTION:
      return { ...state, loading: true }
    case updateTransactionsActionsTypes.SAVE_UPDATE_TRANSACTION_RESPONSE:
      return {
        ...state,
        saveupdateTransactionsResponse: action.data,
        loading: false
      }
    case updateTransactionsActionsTypes.CLEAR_UPDATE_TRANSACTION:
      return { ...state, saveupdateTransactionsResponse: null }
    default:
      return state
  }
}

export const TransactionsdeleteStoreKey = 'TransactionsdeleteStore'

export const TransactionsdeleteReducer = (state = {}, action) => {
  const res = action && action.data
  switch (action.type) {
    case TransactionsdeleteActionsTypes.REQUEST:
      return { ...state, loadingTransactionsdelete: true }
    case TransactionsdeleteActionsTypes.RESPONSE:
      return {
        ...state,
        Transactionsdelete: res,
        statusTransactionsdelete: res.status,
        messageTransactionsdelete: res.message,
        loadingTransactionsdelete: false
      }
    case TransactionsdeleteActionsTypes.CLEAR:
      return {
        ...state,
        Transactionsdelete: null,
        statusTransactionsdelete: '',
        messageTransactionsdelete: ''
      }
    default:
      return state
  }
}