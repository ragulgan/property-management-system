import _ from 'lodash'

export const setTransactionsEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      transactionId: data.transactionId,
      createdAt: data.createdAt,
      propertyName: data.propertyName,
      propertyOwner: data.propertyOwner,
      amount: data.amount,
      transactionStatus: data.leastransactionStatuseStatus,
      action: data.action,
    }
  }
}