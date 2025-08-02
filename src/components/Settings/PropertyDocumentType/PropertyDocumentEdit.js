import _ from 'lodash'

export const setPropertyDocumentEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      propertyDocumentType: data && data.propertyDocumentType ? data.propertyDocumentType : '',
      status: data && data.status ? data.status : ''
    }
  }
}