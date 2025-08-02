import _ from 'lodash'

export const setPropertyEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      address: data.address,
      buildingNoOrStreetName: data.buildingNoOrStreetName,
      propertyName: data.propertyName,
      propertyOwnerName: data.propertyOwnerName,
      propertySizeOrSquareFootage: data.propertySizeOrSquareFootage,
      surveyNo: data.surveyNo,
      cityId: data.cityId,
      countryId: data.countryId,
      landLordId: data.landLordId,
      stateId: data.stateId,
      propertyTypeId: data.propertyTypeId,
      propertyStatus: data.propertyStatus,
      propertyImages: data.propertyImages
    }
  }
}

export const setPropertyDocumentTypeEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      type: data.type,
      name: data.name,
      description: data.description,
      propertyId: data.propertyId,
      upload: data.upload
    }
  }
}
