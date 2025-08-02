import _ from 'lodash'

export const setLeaseEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
        leaseDocumentType: data && data.leaseDocumentType ? data.leaseDocumentType : '',
    }
  }
}