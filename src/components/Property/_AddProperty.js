import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import _ from 'lodash'
import { LandlordsActions, CityActions, StateActions, CountryActions, PropertiesActions, PropertyAddAction, PropertyGetIdActions, updatePropertyActions, MultifileAddActions, ImageDeleteActions } from '../../store/actions'
import { REGEX, FILE_FORMAT_TYPE_DOCUMENT } from '../../utils/constants'
import {
  RESPONSE_STATUS,
  SWEET_ALERT_MSG,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
  PROPERTY_MANAGEMENT_ERROR,
  IMAGE
} from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { Link, useLocation, useHistory } from 'react-router-dom'
import Select from "react-select"
import Dropzone from '../../utils/dropzone/Dropzone'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { setPropertyEditData } from './EditFormdata'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import dayjs from 'dayjs'


function PropertyAdd(props) {
  const {
    getLandlordlistDispatch,
    getCitylistDispatch,
    getStatelistDispatch,
    getCountrylistDispatch,
    getPropertieslistDispatch,
    propertyAddDispatch,
    clearPropertyAddCRMDispatch,
    PropertyAdd,
    PropertyEditDispatch,
    clearPropertyIdDetails,
    PropertyIdDetail,
    UserEdit,
    updatePropertyDispatch,
    saveupdatePropertyResponse,
    clearPropertyUpdateDispatch,
    PropertyImageAddClear,
    dropzoneStatus,
    getAllLandlords,
    Countrylists,
    Statelists,
    Citylists,
    Propertieslists,
    setActiveTab,
    setPropertyId,
    setPropDoclist,
    propertyId,
    PropertFileUpload,
    PropertyImageAddDispatch,
    PropertyDeleteImage,
    ImageIdDetail,
    PropertyDeleteImageClear,
    escriptMasterDataType,
    setShowImage,
    loading
  } = props

  const PropertyEditStatus = [
    {
      "value": "VACANT",
      "label": "Vacant"
    },
    {
      "value": "REPAIR",
      "label": "Repair"
    },
    {
      "value": "UNDER_MAINTENANCE",
      "label": "Under Maintenance"
    }
  ]

  const PropertyStatus = [
    {
      "value": "VACANT",
      "label": "Vacant"
    },
    {
      "value": "OCCUPIED",
      "label": "Occupied"
    },
    {
      "value": "REPAIR",
      "label": "Repair"
    },
    {
      "value": "UNDER_MAINTENANCE",
      "label": "Under Maintenance"
    }
  ]

  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    location: 'test',
    address: '',
    buildingNoOrStreetName: '',
    cityId: '',
    countryId: '',
    landLordId: '',
    propertyName: '',
    propertyOwnerName: '',
    propertySizeOrSquareFootage: '',
    propertyTypeId: '',
    stateId: '',
    surveyNo: '',
    propertyStatus: '',
    propertyImages: []
  })
  const [errors, setErrors] = useState({
    address: '',
    buildingNoOrStreetName: '',
    cityId: '',
    countryId: '',
    landLordId: '',
    propertyName: '',
    propertyOwnerName: '',
    propertySizeOrSquareFootage: '',
    propertyTypeId: '',
    stateId: '',
    surveyNo: '',
    propertyStatus: '',
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [defaultImages, setDefaultImages] = useState([]);
  const [landlordOption, setLandlordOption] = useState()
  const [SelectedLandlordOption, setSelectedLandlordOption] = useState('')
  const [countryOption, setCountryOption] = useState()
  const [SelectedCountryOption, setSelectedCountryOption] = useState('')
  const [StateOption, setStateOption] = useState()
  const [SelectedStateOption, setSelectedStateOption] = useState('')
  const [CityOption, setCityOption] = useState()
  const [SelectedCityOption, setSelectedCityOption] = useState('')
  const [PropertyOption, setPropertyOption] = useState()
  const [SelectedPropertyOption, setSelectedPropertyOption] = useState('')
  const [status, setSelectStatus] = useState('')
  const [isCountinue, setIsCountinue] = useState(false)
  const [isOccupied, setIsOccupied] = useState('')

  useEffect(() => {
    const params = {
      status: 'ACTIVE'
    }
    getLandlordlistDispatch(params)
    getCountrylistDispatch(params)
    getPropertieslistDispatch(params)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e, name) => {
    const errors = {}
    // if (_.isEmpty(formdata.propertyImages)) {
    //   errors.propertyImages = PROPERTY_MANAGEMENT_ERROR.DOCUMENT_UPLOAD
    //   document.getElementById('upload').focus()
    // }
    if (_.isEmpty(formdata.propertyStatus)) {
      errors.propertyStatus = PROPERTY_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('propertyStatus').focus()
    }
    if (_.isEmpty(formdata.address)) {
      errors.address = PROPERTY_MANAGEMENT_ERROR.ADDRESS
      document.getElementById('address').focus()
    }
    if (_.isEmpty(formdata.cityId)) {
      errors.cityId = PROPERTY_MANAGEMENT_ERROR.CITY_SELECT
      document.getElementById('cityId').focus()
    }
    if (_.isEmpty(formdata.stateId)) {
      errors.stateId = PROPERTY_MANAGEMENT_ERROR.STATE_SELECT
      document.getElementById('stateId').focus()
    }
    if (_.isEmpty(formdata.countryId)) {
      errors.countryId = PROPERTY_MANAGEMENT_ERROR.COUNTRY_SELECT
      document.getElementById('countryId').focus()
    }
    if (_.isEmpty(formdata.buildingNoOrStreetName)) {
      errors.buildingNoOrStreetName = PROPERTY_MANAGEMENT_ERROR.BUILD_NUMBER
      document.getElementById('buildingNoOrStreetName').focus()
    }
    if (_.isEmpty(formdata.propertySizeOrSquareFootage)) {
      errors.propertySizeOrSquareFootage = PROPERTY_MANAGEMENT_ERROR.PROPERTY_SIZE
      document.getElementById('propertySizeOrSquareFootage').focus()
    }
    if (_.isEmpty(formdata.propertyTypeId)) {
      errors.propertyTypeId = PROPERTY_MANAGEMENT_ERROR.PROPERTY_TYPE
      document.getElementById('propertyTypeId').focus()
    }
    if (_.isEmpty(formdata.surveyNo)) {
      errors.surveyNo = PROPERTY_MANAGEMENT_ERROR.SURVEY_NUMBER
      document.getElementById('surveyNo').focus()
    }
    if (_.isEmpty(formdata.propertyOwnerName)) {
      errors.propertyOwnerName = PROPERTY_MANAGEMENT_ERROR.PROPERTY_OWNER_NAME
      document.getElementById('propertyOwnerName').focus()
    }
    if (_.isEmpty(formdata.propertyName)) {
      errors.propertyName = PROPERTY_MANAGEMENT_ERROR.PROPERTY_NAME
      document.getElementById('propertyName').focus()
    }
    if (_.isEmpty(formdata.landLordId)) {
      errors.landLordId = PROPERTY_MANAGEMENT_ERROR.LANDLORD_NAME
      document.getElementById('landLordId').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        propertyAddDispatch(formdata)
      }
      if (!_.isEmpty(name)) {
        setIsCountinue(true)
        setPropDoclist(true)
      } else {
        setIsCountinue(false)
      }
    }
  }

  const onConfirmupdate = () => {
    const id = propertyId
    updatePropertyDispatch(id, formdata)
  }

  const clear = () => {
    setFormData({
      address: '',
      amount: '',
      buildingNoOrStreetName: '',
      propertyName: '',
      propertyOwnerName: '',
      propertySizeOrSquareFootage: '',
      surveyNo: '',
      propertyImages: []
    })
    setSelectedLandlordOption('')
    setSelectedCountryOption('')
    setSelectedStateOption('')
    setSelectedCityOption('')
    setSelectedPropertyOption('')
    setSelectStatus('')
    setDefaultImages([])
  }

  const onConfirm = () => {
    clear()
    history.push('/properties')
    clearPropertyIdDetails()
    PropertyImageAddClear()
    setDefaultImages([])
  }

  useEffect(() => {
    if (PropertyAdd && PropertyAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearPropertyAddCRMDispatch()
      Toastify({
        text: PropertyAdd && PropertyAdd.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22bb33",
        },
      }).showToast();
      if (isCountinue) {
        setActiveTab('Property Documents')
        setPropertyId(PropertyAdd && PropertyAdd.data)
        setPropDoclist(true)
        clearPropertyIdDetails()
        setShowImage(true)
      } else {
        onConfirm()
      }
    } else if (PropertyAdd && PropertyAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: PropertyAdd && PropertyAdd.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'

        },
      }).showToast()
      clearPropertyAddCRMDispatch()
    }
  }, [PropertyAdd])

  useEffect(() => {
    if (PropertFileUpload.code === 200) {
      const imageData =
        PropertFileUpload.data.map((data) => ({
          displayName: data.displayName,
          filePath: data.filePath,
          id: data.id,
          createdDate: data.createdDate,
          size: data.size,
          type: data.type
        }))
      setFormData({ ...formdata, propertyImages: imageData })
      setDefaultImages(imageData)
    }
  }, [PropertFileUpload])

  useEffect(() => {
    if (!_.isEmpty(propertyId)) {
      const params = {
        status: 'ACTIVE'
      }
      getStatelistDispatch(params)
      getCitylistDispatch(params)
      PropertyEditDispatch(propertyId)
      setEditMode(true)
    }
  }, [propertyId])

  useEffect(() => {
    if (saveupdatePropertyResponse && saveupdatePropertyResponse.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: saveupdatePropertyResponse && saveupdatePropertyResponse.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22bb33",
        },
      }).showToast();
      clearPropertyUpdateDispatch()
      // clearPropertyIdDetails()
      if (isCountinue) {
        setActiveTab('Property Documents')
        setPropertyId(propertyId)
        setPropDoclist(true)
        setShowImage(true)
        clearPropertyIdDetails()
      } else {
        onConfirm()
      }
    } else if (saveupdatePropertyResponse && saveupdatePropertyResponse.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: saveupdatePropertyResponse && saveupdatePropertyResponse.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'

        },
      }).showToast()
      clearPropertyUpdateDispatch()
    }
  }, [saveupdatePropertyResponse])


  useEffect(() => {
    if (ImageIdDetail && ImageIdDetail.code === 200) {
      Toastify({
        text: ImageIdDetail && ImageIdDetail.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22bb33",
        },
      }).showToast();
      PropertyDeleteImageClear()
    } else if (ImageIdDetail && ImageIdDetail.code !== 200) {
      Toastify({
        text: ImageIdDetail && ImageIdDetail.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'
        },
      }).showToast()
      PropertyDeleteImageClear()
    }
  }, [ImageIdDetail])

  const handleChangeLanlord = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLandlordOption(selectedOption)
      setFormData(values => ({ ...values, landLordId: selectedOption.value }))
      setErrors({ ...errors, landLordId: "" });
    } else {
      setSelectedLandlordOption();
      setFormData((values) => ({ ...values, landLordId: "" }));
    }
  }

  const handleChangeCountry = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCountryOption(selectedOption)
      setFormData(values => ({ ...values, countryId: selectedOption.value }))
      setSelectedStateOption('')
      setSelectedCityOption('')
      const params = {
        countryId: selectedOption.value,
        status: 'ACTIVE'
      }
      getStatelistDispatch(params)
      setErrors({ ...errors, countryId: "" });
    } else {
      setSelectedCountryOption();
      setFormData((values) => ({ ...values, countryId: "" }));
    }
  }

  const handleChangeState = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedStateOption(selectedOption)
      setSelectedCityOption('')
      setFormData(values => ({ ...values, stateId: selectedOption.value }))
      const params = {
        stateId: selectedOption.value,
        status: 'ACTIVE'
      }
      getCitylistDispatch(params)
      setErrors({ ...errors, stateId: "" });
    } else {
      setSelectedStateOption();
      setFormData((values) => ({ ...values, stateId: "" }));
    }
  }

  const handleChangeCity = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCityOption(selectedOption)
      setFormData(values => ({ ...values, cityId: selectedOption.value }))
      setErrors({ ...errors, cityId: "" });
    } else {
      setSelectedCityOption();
      setFormData((values) => ({ ...values, cityId: "" }));
    }
  }

  const handleChangeProperty = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedPropertyOption(selectedOption)
      setFormData(values => ({ ...values, propertyTypeId: selectedOption.value }))
      setErrors({ ...errors, propertyTypeId: "" });
    } else {
      setSelectedPropertyOption();
      setFormData((values) => ({ ...values, propertyTypeId: "" }));
    }
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectStatus(selectedOption)
      setFormData(values => ({ ...values, propertyStatus: selectedOption.value }))
      setErrors({ ...errors, propertyStatus: "" });
    } else {
      setSelectStatus();
      setFormData((values) => ({ ...values, propertyStatus: "" }));
    }
  }

  useEffect(() => {
    const data = getAllLandlords && getAllLandlords.data
    const landLord = getDefaultOptions(data)
    setLandlordOption(landLord)
  }, [getAllLandlords])

  useEffect(() => {
    const data = Countrylists && Countrylists.data
    const countryList = getDefaultOptionsCountry(data)
    setCountryOption(countryList)
  }, [Countrylists])

  useEffect(() => {
    const data = Statelists && Statelists.data
    const stateList = getDefaultOptionsState(data)
    setStateOption(stateList)
  }, [Statelists])

  useEffect(() => {
    return (() => {
      clear()
    })
  }, [])

  useEffect(() => {
    const data = Citylists && Citylists.data
    const cityList = getDefaultOptionsCity(data)
    setCityOption(cityList)
  }, [Citylists])

  useEffect(() => {
    const data = Propertieslists && Propertieslists.data
    const propertyList = getDefaultOptionsProperty(data)
    setPropertyOption(propertyList)
  }, [Propertieslists])


  const getDefaultOptions = (landLord) => {
    const defaultOptions = []
    for (const item in landLord) {
      defaultOptions.push({ label: landLord[item].firstName, value: landLord[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsCountry = (countryList) => {
    const defaultOptions = []
    for (const item in countryList) {
      defaultOptions.push({ label: countryList[item].countryName, value: countryList[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsState = (stateList) => {
    const defaultOptions = []
    for (const item in stateList) {
      defaultOptions.push({ label: stateList[item].stateName, value: stateList[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsCity = (cityList) => {
    const defaultOptions = []
    for (const item in cityList) {
      defaultOptions.push({ label: cityList[item].cityName, value: cityList[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsProperty = (propertyList) => {
    const defaultOptions = []
    for (const item in propertyList) {
      defaultOptions.push({ label: propertyList[item].propertyType, value: propertyList[item].id })
    }
    return defaultOptions
  }
  useEffect(() => {
    if (PropertyIdDetail && PropertyIdDetail.status === "ok") {
      const data = setPropertyEditData(PropertyIdDetail.data)
      setFormData(data)
      const imageData = PropertyIdDetail && PropertyIdDetail.data && PropertyIdDetail.data.propertyImages
      setDefaultImages(imageData)
      const userDetils = PropertyIdDetail && PropertyIdDetail.data
      const landLordId = userDetils.landLord
      if (landLordId && landLordId.id) {
        const datas = getDefaultOptions(getAllLandlords && getAllLandlords.data)
        const selOption = datas.find((x) => x.value === landLordId.id)
        if (selOption) {
          setSelectedLandlordOption([selOption])
          setFormData((values) => ({ ...values, landLordId: landLordId.id }))
        }
      }
      const countryId = userDetils.country
      if (countryId && countryId.id) {
        const datas = getDefaultOptionsCountry(Countrylists && Countrylists.data)
        const selOption = datas.find((x) => x.value === countryId.id)
        if (selOption) {
          setSelectedCountryOption([selOption])
          setFormData((values) => ({ ...values, countryId: countryId.id }))
        }
      }
      const propertyTypeId = userDetils.propertyType
      if (propertyTypeId && propertyTypeId.id) {
        const datas = getDefaultOptionsProperty(Propertieslists && Propertieslists.data)
        const selOption = datas.find((x) => x.value === propertyTypeId.id)
        if (selOption) {
          setSelectedPropertyOption([selOption])
          setFormData((values) => ({ ...values, propertyTypeId: propertyTypeId.id }))
        }
      }
      const status = userDetils.propertyStatus
      setIsOccupied(status)
      if (status) {
        const selOption = PropertyStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, propertyStatus: status }))
        }
      }
    }
  }, [PropertyIdDetail, editMode, getAllLandlords, Propertieslists])

  useEffect(() => {
    if (editMode) {
      const userDetils = PropertyIdDetail && PropertyIdDetail.data
      const stateId = userDetils.state
      if (stateId && stateId.id) {
        const datas = getDefaultOptionsState(Statelists && Statelists.data)
        const selOption = datas.find((x) => x.value === stateId.id)
        setSelectedStateOption([selOption])
        if (selOption) {
          setSelectedStateOption([selOption])
          setFormData((values) => ({ ...values, stateId: stateId.id }))
        }
      }
    }
  }, [editMode, Statelists, PropertyIdDetail])

  useEffect(() => {
    if (editMode) {
      const userDetils = PropertyIdDetail && PropertyIdDetail.data
      const cityId = userDetils.city
      if (cityId && cityId.id) {
        const datas = getDefaultOptionsCity(Citylists && Citylists.data)
        const selOption = datas.find((x) => x.value === cityId.id)
        if (selOption) {
          setSelectedCityOption([selOption])
          setFormData((values) => ({ ...values, cityId: cityId.id }))
        }
      }
    }
  }, [editMode, Citylists, PropertyIdDetail])

  const handelUpload = (e) => {
    document.getElementById('upload').click(e)
  }

  const fileUpload = (e) => {
    const files = e.target.files;
    const uploadArray = []
    for (var i = 0; i < files.length; i++) {
      uploadArray.push(files[i]);
    }
    const data = new FormData();
    const length = uploadArray.length
    for (let i = 0; i < length; i++) {
      data.append('file', uploadArray[i]);
    }
    PropertyImageAddDispatch(data, 'PropertyImage');
  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, propertyImages: updatedImages })
    PropertyDeleteImage(id)
  }

  return (
    <>
      <div className='form-group row'>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Landlord
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Landlords"
              isMulti={false}
              name='landLordId'
              id='landLordId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeLanlord}
              options={landlordOption}
              value={SelectedLandlordOption}
              isDisabled={!landlordOption}
            />
            {errors && errors.landLordId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.landLordId}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Property Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Property Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.propertyName || ''}
              type='text'
              name='propertyName'
              id='propertyName'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.ALPHA_NUMERIC;
                if (!regex.test(e.key) || formdata.propertyName.length >= 30) {
                  e.preventDefault();
                }
              }} />
            {errors.propertyName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.propertyName}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Property Owner Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Property Owner Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.propertyOwnerName || ''}
              type='text'
              name='propertyOwnerName'
              id='propertyOwnerName'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT;
                if (!regex.test(e.key) || formdata.propertyOwnerName.length >= 30) {
                  e.preventDefault();
                }
              }} />
            {errors.propertyOwnerName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.propertyOwnerName}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Survey No
          </label>
          <div className='w-100'>
            <input
              placeholder='Survey No'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.surveyNo || ''}
              type='text'
              name='surveyNo'
              id='surveyNo'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.ALPHA_NUMERIC_CHARS;
                if (!regex.test(e.key) || formdata.surveyNo.length >= 10) {
                  e.preventDefault();
                }
              }} />
            {errors.surveyNo && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.surveyNo}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Property Type
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Property Type"
              isMulti={false}
              name='propertyTypeId'
              id='propertyTypeId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeProperty}
              options={PropertyOption}
              value={SelectedPropertyOption}
              isDisabled={!PropertyOption}
            />
            {errors && errors.propertyTypeId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.propertyTypeId}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Property Size or Square Footage
          </label>
          <div className="fv-row w-100" data-kt-password-meter="true">
            <div className="position-relative mb-3">
              <input
                placeholder='Property Size'
                className='form-control form-control-lg ps-4 mb-4 placeHolder'
                onChange={(e) => handleChange(e)}
                value={formdata.propertySizeOrSquareFootage || ''}
                type='text'
                name='propertySizeOrSquareFootage'
                id='propertySizeOrSquareFootage'
                autoComplete='off'
                onKeyPress={(e) => {
                  if (!/^[0-9 .]+$/.test(e.key) || formdata.propertySizeOrSquareFootage.length >= 15) {
                    e.preventDefault()
                  }
                }} />
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                data-kt-password-meter-control="visibility">
                Sq.ft
              </span>
            </div>
            {errors.propertySizeOrSquareFootage && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.propertySizeOrSquareFootage}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Building No/Street Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Building No/ Street Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.buildingNoOrStreetName || ''}
              type='text'
              name='buildingNoOrStreetName'
              id='buildingNoOrStreetName'
              autoComplete='off'
              onKeyPress={(e) => {
                if (formdata.buildingNoOrStreetName.length >= 30) {
                  e.preventDefault()
                }
              }} />
            {errors.buildingNoOrStreetName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.buildingNoOrStreetName}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Country
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Country"
              isMulti={false}
              name='countryId'
              id='countryId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeCountry}
              options={countryOption}
              value={SelectedCountryOption}
              isDisabled={!countryOption}
            />
            {errors && errors.countryId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.countryId}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            State
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select State"
              isMulti={false}
              name='stateId'
              id='stateId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeState}
              options={StateOption}
              value={SelectedStateOption}
              isDisabled={!StateOption}
            />
            {errors && errors.stateId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.stateId}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            City
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select City"
              isMulti={false}
              name='cityId'
              id='cityId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeCity}
              options={CityOption}
              value={SelectedCityOption}
              isDisabled={!CityOption}
            />
            {errors && errors.cityId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.cityId}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Address
          </label>
          <div className='w-100'>
            <textarea
              placeholder='Type here'
              className='form-control form-control-lg ps-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.address || ''}
              type='text'
              rows={1}
              name='address'
              id='address'
              autoComplete='off'
              onKeyPress={(e) => {
                if (formdata.address.length >= 150) {
                  e.preventDefault()
                }
              }} />
            {errors.address ? null : <p className='text-muted fs-8'>Maximum 150 character</p>}
            {errors.address && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.address}</span>
              </div>
            )}
          </div>
        </div>
        {editMode && isOccupied != 'OCCUPIED' ?
          <>
            <div className='col-md-4 mb-4 pr-10'>
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Status
              </label>
              <div className='w-100'>
                <ReactSelect
                  placeholder="Select Status"
                  isMulti={false}
                  name='propertyStatus'
                  id='propertyStatus'
                  className='select2'
                  classNamePrefix='select'
                  handleChangeReactSelect={handleChangeSelectStatus}
                  options={PropertyEditStatus}
                  value={status}
                  isSearchable={false}
                />
                {errors && errors.propertyStatus && (
                  <div className="rr mt-1">
                    <style>{".rr{color:red}"}</style>
                    {errors.propertyStatus}
                  </div>
                )}
              </div>
            </div>
          </> :
          editMode && isOccupied === 'OCCUPIED' ?
            <>
              <div className='col-md-4 mb-4 pr-10'>
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Status
                </label>
                <div className='w-100'>
                  <ReactSelect
                    isMulti={false}
                    name='propertyStatus'
                    id='propertyStatus'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={PropertyStatus}
                    value={status}
                    isSearchable={false}
                    isDisabled={true}
                  />
                </div>
              </div>
            </> :
            <>
              <div className='col-md-4 mb-4 pr-10'>
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Status
                </label>
                <div className='w-100'>
                  <ReactSelect
                    placeholder="Select Status"
                    isMulti={false}
                    name='propertyStatus'
                    id='propertyStatus'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={PropertyEditStatus}
                    value={status}
                    isSearchable={false}
                  />
                  {errors && errors.propertyStatus && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.propertyStatus}
                    </div>
                  )}
                </div>
              </div>
            </>
        }
        <div className='col-md-8 mb-2 pr-10'>
          <label className='font-size-xs font-weight-bold mb-1 form-label'>
            Pin Location
          </label>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/avatars/property/map-dummy.svg')}
            className='prp-map-img-wh'
          />
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Property Images
          </label>
          <div className="d-flex justify-content-between align-items-center border border-2 rounded-2 mb-2 p-1">
            <span className='upload-text'>Choose File</span>
            <input
              placeholder='Enter Password'
              className='form-control form-control-lg d-none'
              onChange={(e) => {
                {
                  fileUpload(e)
                  e.target.value = null
                }
              }}
              type='file'
              id='upload'
              multiple
            />
            <span className="btn btn-blue p-2"
              onClick={handelUpload}>
              <span className='mr-1'>
                <i class="bi bi-upload fs-3 text-white"></i>
              </span>
              Upload
            </span>
          </div>
          {
            loading ?
              <div colSpan='100%' className='text-center'>
                <div
                  className='spinner-border text-primary m-5'
                />
              </div>
              :
              defaultImages && defaultImages.length > 0 ?
                defaultImages.map((image) => (
                  <div className='mt-2 preview-multiple-img px-5 py-2 d-flex align-items-center justify-content-between'>
                    <img
                      src={toAbsoluteUrl(`/media/avatars/preview-image/${IMAGE[image && image.type]}`)}
                      alt="Profile picture"
                      style={{ borderRadius: '50%' }}
                      width='28px'
                      height='28px'
                    />
                    <div className='w-50'>
                      <div className='preview-mutiple-name w-100'>{image.displayName}</div>
                      <div className='preview-mutiple-date'>{dayjs(image.createdDate).format('DD MMM,YYYY')}</div>
                    </div>
                    <div className='preview-mutiple-date'>{image.size}</div>
                    <button className='btn btn-outline p-0' onClick={() => handleImageDelete(image._id ? image._id : image.id)}><i class="bi bi-x fs-2"></i></button>
                  </div>

                ))
                : null}
        </div>

        <div className='col-md-8 mb-4'>
          <label className='font-size-xs font-weight-bold mb-1 mr-5 form-label'>
            Latitude :19.2560
          </label>
          <label className='font-size-xs font-weight-bold mb-1 form-label'>
            Longitude :29.2560
          </label>
        </div>
        <div className='form-group row mb-4'>
          <div className='col-lg-12 text-center'>
            <button
              type='button'
              className='btn btn-blue-outline py-2 m-2'
              onClick={(e) => onConfirm()}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-blue py-2 m-2'
              onClick={(e) => handleSubmit()}
            >
              {editMode ? 'Update' : 'Save'}
            </button>
            <button
              type='button'
              className='btn btn-blue py-2 m-2'
              onClick={(e) => handleSubmit(e, "continue")}
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { PropertyAddStore, editPropertyStore, updatePropertyStore, dropzoneStore, LandlordslistStore, CountrylistStore, StatelistStore, CitylistStore, PropertieslistStore, MultifileAddStore, ImageDeleteStore } = state
  return {
    PropertyAdd: PropertyAddStore && PropertyAddStore.PropertyAdd ? PropertyAddStore.PropertyAdd : '',
    PropertyIdDetail: editPropertyStore && editPropertyStore.PropertyIdDetail ? editPropertyStore.PropertyIdDetail : '',
    saveupdatePropertyResponse: updatePropertyStore && updatePropertyStore.saveupdatePropertyResponse ? updatePropertyStore.saveupdatePropertyResponse : '',
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.data
        ? dropzoneStore.dropzoneImage.data : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.status ? dropzoneStore.dropzoneImage.status : "",
    getAllLandlords: LandlordslistStore && LandlordslistStore.getAllLandlords ? LandlordslistStore.getAllLandlords : '',
    Countrylists: CountrylistStore && CountrylistStore.Countrylists ? CountrylistStore.Countrylists : '',
    Statelists: StatelistStore && StatelistStore.Statelists ? StatelistStore.Statelists : '',
    Citylists: CitylistStore && CitylistStore.Citylists ? CitylistStore.Citylists : '',
    Propertieslists: PropertieslistStore && PropertieslistStore.Propertieslists ? PropertieslistStore.Propertieslists : '',
    PropertFileUpload: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    ImageIdDetail: ImageDeleteStore && ImageDeleteStore.Imagedelete ? ImageDeleteStore.Imagedelete : '',
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false

  }
}

const mapDispatchToProps = dispatch => ({
  getLandlordlistDispatch: (data) =>
    dispatch(LandlordsActions.getlandlordslist(data)),
  getCitylistDispatch: (data) =>
    dispatch(CityActions.getcitylist(data)),
  getStatelistDispatch: (data) =>
    dispatch(StateActions.getStatelist(data)),
  getCountrylistDispatch: (data) =>
    dispatch(CountryActions.getcountrylist(data)),
  getPropertieslistDispatch: (data) =>
    dispatch(PropertiesActions.getpropertyTypelist(data)),
  propertyAddDispatch: (data) =>
    dispatch(PropertyAddAction.PropertyAdd(data)),
  clearPropertyAddCRMDispatch: () =>
    dispatch(PropertyAddAction.clearProperty()),
  PropertyEditDispatch: (id) =>
    dispatch(PropertyGetIdActions.getPropertyIdDetails(id)),
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
  updatePropertyDispatch: (id, params) =>
    dispatch(updatePropertyActions.updateProperty(id, params)),
  clearPropertyUpdateDispatch: () =>
    dispatch(updatePropertyActions.clearupdateProperty()),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  PropertyImageAddClear: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  PropertyDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  PropertyDeleteImageClear: (id) =>
    dispatch(ImageDeleteActions.clear(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyAdd)