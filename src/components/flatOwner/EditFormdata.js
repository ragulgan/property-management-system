import _ from 'lodash'

export const setFlatEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      name: data.name,
      emailId: data.emailId,
      mobileNumber: data.mobileNumber,
      alternativeNumber: data.alternativeNumber,
      currentAddress: data.currentAddress,
      permanentAddress: data.permanentAddress,
      emergencyContactName1: data.emergencyContactName1,
      emergencyContact1: data.emergencyContact1,
      emergencyContactRelationship1: data.emergencyContactRelationship1,
      image:data.image,
      country: data.country,
      state: data.state,
      city: data.city,
      postalCode: data.postalCode
    }
  }
}

export const setFlatDocumentEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      flatDocType: data.flatDocType,
      documentName: data.documentName,
      description: data.description,
      propertyId: data.propertyId,
      upload: data.upload
    }
  }
}
