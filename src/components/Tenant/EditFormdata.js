import _ from 'lodash'

export const setLesseeDetailsEditData = (data) => {
    if (!_.isEmpty(data)) {
      return {
        lesseeName: data.lesseeName,
        lesseeEmailAddress: data.lesseeEmailAddress,
        lesseeMobileNo: data.lesseeMobileNo,
        country: data.country,
        state: data.state,
        district: data.district,
        lesseeCurrentAddress: data.lesseeCurrentAddress,
        lesseePermanentAddress: data.lesseePermanentAddress,
        lesseeAadharNumber: data.lesseeAadharNumber,
        lesseePanNumber: data.lesseePanNumber,
        lesseeImage:data.lesseeImage,
        lesseeIdProof:data.lesseeIdProof
      }
    }
  }