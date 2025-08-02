import _ from 'lodash'

export const setRequestEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      type: data.type,
      description: data.description
    }
  }
}