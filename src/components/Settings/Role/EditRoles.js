import _ from 'lodash'

export const setRolesEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      roleName: data && data.roleName ? data.roleName : '',
      roleStatus: data && data.roleStatus ? data.roleStatus : '',
      type: data && data.type ? data.type : '',
      // menus: data && data.menus ? data.menus : ''
    }
  }
}