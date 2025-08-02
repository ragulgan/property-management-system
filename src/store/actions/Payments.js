
export const PaymentsTypes = {
  GET_PAYMENT_LIST: 'GET_PAYMENT_LIST',
  SAVE_PAYMENT_LIST_RESPONSE: 'SAVE_PAYMENT_LIST_RESPONSE',
  CLEAR_PAYMENT_LIST: 'CLEAR_PAYMENT_LIST'
}

export const PaymentsActions = {
  getpaymentslist: (params) => ({
    type: PaymentsTypes.GET_PAYMENT_LIST,
    params
  }),
  savepaymentslistResponse: (data) => ({
    type: PaymentsTypes.SAVE_PAYMENT_LIST_RESPONSE,
    data
  }),
  clearpaymentslist: () => ({
    type: PaymentsTypes.CLEAR_PAYMENT_LIST
  })

}


export const PaymentsAddTypes = {
  PAYMENT_POST: 'PAYMENT_POST',
  PAYMENT_POST_RESPONSE: 'PAYMENT_POST_RESPONSE',
  PAYMENT_POST_CLEAR: 'PAYMENT_POST_CLEAR'
}

export const PaymentsAddAction = {
  PaymentsAdd: (data) => {
    return {
      type: PaymentsAddTypes.PAYMENT_POST,
      payload: data
    }
  },
  savePaymentsResponse: data => ({
    type: PaymentsAddTypes.PAYMENT_POST_RESPONSE,
    data
  }),
  clearUSER: () => ({
    type: PaymentsAddTypes.PAYMENT_POST_CLEAR
  })
}

export const PaymentsGetIdTypes = {
  GET_PAYMENT_DETAILS: 'GET_PAYMENT_DETAILS',
  PAYMENT_DETAILS_RESPONSE: 'PAYMENT_DETAILS_RESPONSE',
  CLEAR_PAYMENT_DETAILS: 'CLEAR_PAYMENT_DETAILS'
}

export const PaymentsGetIdActions = {
  getPaymentsIdDetails: (id) => ({
    type: PaymentsGetIdTypes.GET_PAYMENT_DETAILS,
    id
  }),
  savePaymentsIdDetailsResponse: data => ({
    type: PaymentsGetIdTypes.PAYMENT_DETAILS_RESPONSE,
    data
  }),
  clearPaymentsIdDetails: () => ({
    type: PaymentsGetIdTypes.CLEAR_PAYMENT_DETAILS
  })
}

export const updatePaymentsActionsTypes = {
  UPDATE_PAYMENT: 'UPDATE_PAYMENT',
  SAVE_UPDATE_PAYMENT_RESPONSE: 'SAVE_UPDATE_PAYMENT_RESPONSE',
  CLEAR_UPDATE_PAYMENT: 'CLEAR_UPDATE_PAYMENT'
}

export const updatePaymentsActions = {
  updatePayments: (id, params) => {
    return {
      type: updatePaymentsActionsTypes.UPDATE_PAYMENT,
      payload: { id, params }
    }
  },
  saveupdatePaymentsResponse: data => ({
    type: updatePaymentsActionsTypes.SAVE_UPDATE_PAYMENT_RESPONSE,
    data,
    status: data.status,
    message: data.message
  }),
  clearupdatePayments: () => ({
    type: updatePaymentsActionsTypes.CLEAR_UPDATE_PAYMENT
  })
}
export const PaymentsdeleteActionsTypes = {
  REQUEST: 'PAYMENT_DELETE_REQUEST',
  RESPONSE: 'PAYMENT_DELETE_RESPONSE',
  ERROR: 'PAYMENT_DELETE_ERROR',
  CLEAR: 'PAYMENT_DELETE_CLEAR'
}

export const PaymentsdeleteActions = {
  delete: (id) => ({
    type: PaymentsdeleteActionsTypes.REQUEST,
    id
  }),
  savemResponse: (data) => ({
    type: PaymentsdeleteActionsTypes.RESPONSE,
    data
  }),
  clear: () => ({
    type: PaymentsdeleteActionsTypes.CLEAR
  })
}