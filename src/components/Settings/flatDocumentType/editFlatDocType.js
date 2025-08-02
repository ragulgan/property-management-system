import _ from 'lodash'

export const setFlatDocTypeEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      type: data && data.type ? data.type : '',
      status: data && data.status ? data.status : ''
    }
  }
}