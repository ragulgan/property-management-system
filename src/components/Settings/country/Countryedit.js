import _ from 'lodash'

export const setCountryEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      countryName: data && data.countryName ? data.countryName : '',
      status: data && data.status ? data.status : ''
    }
  }
}