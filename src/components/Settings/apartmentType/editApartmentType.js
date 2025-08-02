import _ from 'lodash'

export const setApartmentTypeEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      apartmentType: data && data.apartmentType ? data.apartmentType : '',
      status: data && data.status ? data.status : ''
    }
  }
}