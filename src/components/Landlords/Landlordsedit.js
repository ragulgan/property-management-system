import _ from 'lodash'
import dayjs from 'dayjs';

export const setLandlordsEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      firstName: data && data.firstName ? data.firstName : '',
      lastName: data && data.lastName ? data.lastName : '',
      mobileNumber: data && data.mobileNumber ? data.mobileNumber : '',
      emailId: data && data.emailId ? data.emailId : '',
      image: data.image ? data.image : '',
      dob: data.dob ? dayjs(data.dob) : '',
      alternativeMobileNumber: data.alternativeMobileNumber ? data.alternativeMobileNumber : '',
      address: data && data.address ? data.address : '',
    }
  }
}