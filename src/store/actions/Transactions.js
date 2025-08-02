
export const TransactionsTypes = {
  GET_TRANSACTION_LIST: 'GET_TRANSACTION_LIST',
  SAVE_TRANSACTION_LIST_RESPONSE: 'SAVE_TRANSACTION_LIST_RESPONSE',
  CLEAR_TRANSACTION_LIST: 'CLEAR_TRANSACTION_LIST'
}

export const TransactionsActions = {
  gettransactionslist: (params) => ({
    type: TransactionsTypes.GET_TRANSACTION_LIST,
    params
  }),
  savetransactionslistResponse: (data) => ({
    type: TransactionsTypes.SAVE_TRANSACTION_LIST_RESPONSE,
    data
  }),
  cleartransactionslist: () => ({
    type: TransactionsTypes.CLEAR_TRANSACTION_LIST
  })

}


export const TransactionsAddTypes = {
  TRANSACTION_POST: 'TRANSACTION_POST',
  TRANSACTION_POST_RESPONSE: 'TRANSACTION_POST_RESPONSE',
  TRANSACTION_POST_CLEAR: 'TRANSACTION_POST_CLEAR'
}

export const TransactionsAddAction = {
  TransactionsAdd: (data) => {
    return {
      type: TransactionsAddTypes.TRANSACTION_POST,
      payload: data
    }
  },
  saveTransactionsResponse: data => ({
    type: TransactionsAddTypes.TRANSACTION_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: TransactionsAddTypes.TRANSACTION_POST_CLEAR
  })
}

export const TransactionsGetIdTypes = {
  GET_TRANSACTION_DETAILS: 'GET_TRANSACTION_DETAILS',
  TRANSACTION_DETAILS_RESPONSE: 'TRANSACTION_DETAILS_RESPONSE',
  CLEAR_TRANSACTION_DETAILS: 'CLEAR_TRANSACTION_DETAILS'
}

export const TransactionsGetIdActions = {
  getTransactionsIdDetails: (id) => ({
    type: TransactionsGetIdTypes.GET_TRANSACTION_DETAILS,
    id
  }),
  saveTransactionsIdDetailsResponse: data => ({
    type: TransactionsGetIdTypes.TRANSACTION_DETAILS_RESPONSE,
    data
  }),
  clearTransactionsIdDetails: () => ({
    type: TransactionsGetIdTypes.CLEAR_TRANSACTION_DETAILS
  })
}

export const updateTransactionsActionsTypes = {
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  SAVE_UPDATE_TRANSACTION_RESPONSE: 'SAVE_UPDATE_TRANSACTION_RESPONSE',
  CLEAR_UPDATE_TRANSACTION: 'CLEAR_UPDATE_TRANSACTION'
}

export const updateTransactionsActions = {
  updateTransactions: (id, params) => {
    return {
      type: updateTransactionsActionsTypes.UPDATE_TRANSACTION,
      payload: { id, params }
    }
  },
  saveupdateTransactionsResponse: data => ({
    type: updateTransactionsActionsTypes.SAVE_UPDATE_TRANSACTION_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdateTransactions: () => ({
    type: updateTransactionsActionsTypes.CLEAR_UPDATE_TRANSACTION
  })
}
export const TransactionsdeleteActionsTypes = {
  REQUEST: 'TRANSACTION_DELETE_REQUEST',
  RESPONSE: 'TRANSACTION_DELETE_RESPONSE',
  ERROR: 'TRANSACTION_DELETE_ERROR',
  CLEAR: 'TRANSACTION_DELETE_CLEAR'
}

export const TransactionsdeleteActions = {
  delete: (id) => ({
    type: TransactionsdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: TransactionsdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: TransactionsdeleteActionsTypes.CLEAR
  })
}