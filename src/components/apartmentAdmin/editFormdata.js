import _ from 'lodash'
import dayjs from 'dayjs';

export const setApartmentAdminEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      name: data.name,
      fatherName: data.fatherName,
      gender: data.gender,
      emailId: data.emailId,
      mobileNumber: data.mobileNumber,
      alternativeNumber: data.alternativeNumber,
      maritalStatus: data.maritalStatus,
      bloodGroup: data.bloodGroup,
      currentAddress: data.currentAddress,
      permanentAddress: data.permanentAddress,
      pg: data.pg,
      ug: data.ug,
      dateOfJoining: data.dateOfJoining ? dayjs(data.dateOfJoining) : '',
      officialMailId: data.officialMailId,
      password: data.password,
      reportTo: data.reportTo,
      role: data.role,
      emergencyContactName1: data.emergencyContactName1,
      emergencyContact1: data.emergencyContact1,
      emergencyContactRelationship1: data.emergencyContactRelationship1,
      emergencyContactName2: data.emergencyContactName2,
      emergencyContact2: data.emergencyContact2,
      emergencyContactRelationship2: data.emergencyContactRelationship2,
      dob:data.dob ? dayjs(data.dob) : '',
      image:data.image,
      type: data.type,
      apartment: data.apartment,
      country: data.country,
      state: data.state,
      city: data.city
    }
  }
}