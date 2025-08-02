import _ from 'lodash'

export const setFlatEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      block: data.block,
      propertySize: data.propertySize,
      kitchen: data.kitchen,
      isFurnished: data.isFurnished,
      floor: data.floor,
      bedRoom: data.bedRoom,
      balcony: data.balcony,
      isParking: data.isParking,
      flatNo: data.flatNo,
      bathRoom: data.bathRoom,
      orientation: data.orientation,
      vehicleDetail: data.vehicleDetail,
      notes: data.notes,
      flatImages: data.flatImages,
      apartmentId: data.apartment && data.apartment.id ? data.apartment.id : ''
    }
  }
}

export const setFlatDocumentEditData = (data) => {
  if (!_.isEmpty(data)) {
    return {
      flatDocType: data.flatDocType,
      documentName: data.documentName,
      description: data.description,
      flatId: data.flatId,
      upload: data.upload
    }
  }
}
