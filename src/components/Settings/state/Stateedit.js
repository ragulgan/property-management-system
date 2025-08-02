import _ from 'lodash'

export const setStateEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      stateName: data && data.stateName ? data.stateName : '',
    }
  }
}