import _ from 'lodash'

export const setCityEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      cityName: data && data.cityName ? data.cityName : '',
    }
  }
}