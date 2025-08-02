import _ from 'lodash'

export const setLeaseEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      leaseType: data && data.leaseType ? data.leaseType : '',
      status: data && data.status ? data.status : ''
    }
  }
}