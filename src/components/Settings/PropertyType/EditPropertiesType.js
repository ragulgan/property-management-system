import _ from 'lodash'

export const setPropertiesEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      propertyType: data && data.propertyType ? data.propertyType : '',
      status: data && data.status ? data.status : '',
    }
  }
}