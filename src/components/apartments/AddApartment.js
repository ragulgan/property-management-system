import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../theme/helpers";
import _ from "lodash";
import {
  ApartmentTypeActions,
  OpenCountryActions, 
  OpenStateActions, 
  OpenCityActions,
  postApartmentAction,
  getApartmentDetialsActions,
  updateApartmentActions,
  MultifileAddActions,
  ImageDeleteActions,
} from "../../store/actions";
import { APARTMENT_MANAGEMENT_ERROR, PROFILE_URL, REGEX, RESPONSE_STATUS } from "../../utils/constants";
import { letNumericOnly } from "../../utils/helper";
import { useLocation, useHistory } from "react-router-dom";
import { setApartmentEditData } from "./EditFormdata";
import { MapContainer } from "../../UIComponents";
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddApartment(props) {
  const {
    getApartmentTypelistDispatch,
    getCitylistDispatch,
    getStatelistDispatch,
    getCountrylistDispatch,
    apartmentAddDispatch,
    clearApartmentAddDispatch,
    apartmentEditDispatch,
    clearApartmentIdDetails,
    updateApartmentDispatch,
    clearApartmentUpdateDispatch,
    PropertyImageAddDispatch,
    PropertyImageAddClear,
    PropertyDeleteImage,
    PropertyDeleteImageClear,
    getAllApartmentType,
    Countrylists,
    Statelists,
    Citylists,
    ApartmentAdd,
    ApartmentIdDetail,
    saveupdateApartmentResponse,
    PropertFileUpload,
    ImageIdDetail,
    loading,
    setActiveTab,
    setPropertyId,
    setPropDoclist,
    propertyId,
    escriptMasterDataType,
  } = props;

  const pathName = useLocation().pathname;
  const history = useHistory();
  const url = pathName && pathName.split("/");
  const currentId = url && url[2];
  const [editMode, setEditMode] = useState(false);
  const [formdata, setFormData] = useState({
    address: '',
    apartmentType: '',
    apartmentName: '',
    city: '',
    country: '',
    state: '',
    streetName: '',
    zipCode: '',
    landmark: '',
    description: '',
    latitude: '19.2560',
    longitude: '29.2560',
    apartmentImages: []
  })
  const [errors, setErrors] = useState({
    address: '',
    apartmentType: '',
    apartmentName: '',
    city: '',
    country: '',
    state: '',
    streetName: '',
    zipCode: '',
    landmark: '',
    description: '',
    latitude: '19.2560',
    longitude: '29.2560',
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [defaultImages, setDefaultImages] = useState([]);
  const [apartmentTypeOption, setApartmentTypeOption] = useState();
  const [SelectedApartmentTypeOption, setSelectedApartmentTypeOption] = useState("");
  const [countryOption, setCountryOption] = useState()
  const [SelectedCountryOption, setSelectedCountryOption] = useState('')
  const [StateOption, setStateOption] = useState()
  const [SelectedStateOption, setSelectedStateOption] = useState('')
  const [CityOption, setCityOption] = useState()
  const [SelectedCityOption, setSelectedCityOption] = useState('')
  const [paramCountry, setParamCountry] = useState('')
  const [isCountinue, setIsCountinue] = useState(false)
  const [imageClickChange, setImageClickChange] = useState('')
  const [previewImageBorder, setPreviewImageBorder] = useState('')

  useEffect(() => {
    const params = {
      status: "ACTIVE",
    };
    getApartmentTypelistDispatch(params);
    getCountrylistDispatch()
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e, name) => {
    const errors = {}
    if (_.isEmpty(formdata.address)) {
      errors.address = APARTMENT_MANAGEMENT_ERROR.ADDRESS
      document.getElementById('address').focus()
    }
    if (_.isEmpty(formdata.description)) {
      errors.description = APARTMENT_MANAGEMENT_ERROR.DESCRIPTION
      document.getElementById('description').focus()
    }
    if (_.isEmpty(formdata.landmark)) {
      errors.landmark = APARTMENT_MANAGEMENT_ERROR.LANDMARK
      document.getElementById('landmark').focus()
    }
    if (_.isEmpty(formdata.zipCode)) {
      errors.zipCode = APARTMENT_MANAGEMENT_ERROR.ZIP_CODE
      document.getElementById('zipCode').focus()
    }
    if (_.isEmpty(formdata.streetName)) {
      errors.streetName = APARTMENT_MANAGEMENT_ERROR.STREET_NAME
      document.getElementById('streetName').focus()
    }
    if (_.isEmpty(formdata.city)) {
      errors.city = APARTMENT_MANAGEMENT_ERROR.CITY_SELECT
      document.getElementById('city').focus()
    }
    if (_.isEmpty(formdata.state)) {
      errors.state = APARTMENT_MANAGEMENT_ERROR.STATE_SELECT
      document.getElementById('state').focus()
    }
    if (_.isEmpty(formdata.country)) {
      errors.country = APARTMENT_MANAGEMENT_ERROR.COUNTRY_SELECT
      document.getElementById('country').focus()
    }
    if (_.isEmpty(formdata.apartmentName)) {
      errors.apartmentName = APARTMENT_MANAGEMENT_ERROR.APARTMENT_NAME
      document.getElementById('apartmentName').focus()
    }
    if (_.isEmpty(formdata.apartmentType)) {
      errors.apartmentType = APARTMENT_MANAGEMENT_ERROR.APARTMENTTYPE_NAME
      document.getElementById('apartmentType').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        apartmentAddDispatch(formdata)
      }
      if (!_.isEmpty(name)) {
        setIsCountinue(true)
        setPropDoclist(true)
      } else {
        setIsCountinue(false)
      }
    }
  };

  const onConfirmupdate = () => {
    const id = currentId
    updateApartmentDispatch(id, formdata)
  }

  const clear = () => {
    setFormData({
      address: '',
      apartmentType: '',
      apartmentName: '',
      streetName: '',
      zipCode: '',
      landmark: '',
      description: '',
      latitude: '19.2560',
      longitude: '29.2560',
      apartmentImages: []
    })
    setSelectedApartmentTypeOption('')
    setParamCountry('')
    setSelectedCountryOption('')
    setSelectedStateOption('')
    setSelectedCityOption('')
    setDefaultImages([])
    setImageClickChange('')
    setPreviewImageBorder('')
  };

  const onConfirm = () => {
    clear()
    history.push('/apartments')
    clearApartmentIdDetails()
    PropertyImageAddClear()
  }

  useEffect(() => {
    if (ApartmentAdd && ApartmentAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearApartmentAddDispatch()
      Toastify({
        text: ApartmentAdd && ApartmentAdd.message,
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
        setActiveTab('Block and Amenities')
        setPropertyId(ApartmentAdd && ApartmentAdd.data)
        setPropDoclist(true)
        clearApartmentIdDetails()
      } else {
        onConfirm()
      }
    } else if (ApartmentAdd && ApartmentAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: ApartmentAdd && ApartmentAdd.message,
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
      clearApartmentAddDispatch()
    }
  }, [ApartmentAdd])

  useEffect(() => {
    if (PropertFileUpload && PropertFileUpload.code === 200) {
      const imageData =
        PropertFileUpload.data.map((data) => ({
          displayName: data.displayName,
          filePath: data.filePath,
          id: data.id,
          createdDate: data.createdDate,
          size: data.size,
          type: data.type
        }))
      setFormData({ ...formdata, apartmentImages: imageData })
      setDefaultImages(imageData)
      setImageClickChange(`${PROFILE_URL}${imageData[0].filePath}`)
      setPreviewImageBorder(imageData[0].id)
    }
  }, [PropertFileUpload])

  useEffect(() => {
    if (!_.isEmpty(currentId)) {
      apartmentEditDispatch(currentId)
      setEditMode(true)
    }
  }, [currentId])

  useEffect(() => {
    if (saveupdateApartmentResponse && saveupdateApartmentResponse.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: saveupdateApartmentResponse && saveupdateApartmentResponse.message,
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
      clearApartmentUpdateDispatch()
      // clearApartmentIdDetails()
      if (isCountinue) {
        setActiveTab('Block and Amenities')
        setPropertyId(propertyId)
        setPropDoclist(true)
        clearApartmentIdDetails()
      } else {
        onConfirm()
      }
    } else if (saveupdateApartmentResponse && saveupdateApartmentResponse.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: saveupdateApartmentResponse && saveupdateApartmentResponse.message,
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
      clearApartmentUpdateDispatch()
    }
  }, [saveupdateApartmentResponse])

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
      setImageClickChange('')
      setPreviewImageBorder('')
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

  const handleChangeApartmentType = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedApartmentTypeOption(selectedOption)
      setFormData(values => ({ ...values, apartmentType: selectedOption.value }))
      setErrors({ ...errors, apartmentType: "" });
    } else {
      setSelectedApartmentTypeOption();
      setFormData((values) => ({ ...values, apartmentType: "" }));
    }
  }

  const handleChangeCountry = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCountryOption(selectedOption);
      setFormData((values) => ({ ...values, country: selectedOption.value }));
      setSelectedStateOption("");
      setSelectedCityOption("");
      const params = {
        country: selectedOption.value,
      };
      getStatelistDispatch(params);
      setErrors({ ...errors, country: "" });
      setParamCountry(params)
    } else {
      setSelectedCountryOption();
      setFormData((values) => ({ ...values, country: "" }));
    }
  };

  const handleChangeState = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedStateOption(selectedOption)
      setSelectedCityOption('')
      setFormData(values => ({ ...values, state: selectedOption.value }))
      const params = {
        country: paramCountry && paramCountry?.country,
        state: selectedOption.value,
      }
      getCitylistDispatch(params)
      setErrors({ ...errors, state: "" });
    } else {
      setSelectedStateOption();
      setFormData((values) => ({ ...values, state: "" }));
    }
  }

  const handleChangeCity = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCityOption(selectedOption)
      setFormData(values => ({ ...values, city: selectedOption.value }))
      setErrors({ ...errors, city: "" });
    } else {
      setSelectedCityOption();
      setFormData((values) => ({ ...values, city: "" }));
    }
  }

  useEffect(() => {
    const data = getAllApartmentType && getAllApartmentType.data
    const apartmentType = getDefaultOptions(data)
    setApartmentTypeOption(apartmentType)
  }, [getAllApartmentType])

  useEffect(() => {
    const data = Countrylists && Countrylists.data
    const countryList = getDefaultOptionsCountry(data)
    setCountryOption(countryList)
  }, [Countrylists])

  useEffect(() => {
    const data = Statelists && Statelists.data && Statelists?.data?.states
    const stateList = getDefaultOptionsState(data)
    setStateOption(stateList)
  }, [Statelists])

  useEffect(() => {
    const data = Citylists && Citylists.data
    const cityList = getDefaultOptionsCity(data)
    setCityOption(cityList)
  }, [Citylists])

  useEffect(() => {
    return (() => {
      clear()
    })
  }, [])

  const getDefaultOptions = (apartmentType) => {
    const defaultOptions = []
    for (const item in apartmentType) {
      defaultOptions.push({ label: apartmentType[item].apartmentType, value: apartmentType[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsCountry = (countryList) => {
    const defaultOptions = [];
    for (const item in countryList) {
      defaultOptions.push({
        label: countryList[item].name,
        value: countryList[item].name
      });
    }
    return defaultOptions;
  };

  const getDefaultOptionsState = (stateList) => {
    const defaultOptions = []
    for (const item in stateList) {
      defaultOptions.push({ 
        label: stateList[item].name, 
        value: stateList[item].name })
    }
    return defaultOptions
  }

  const getDefaultOptionsCity = (cityList) => {
    const defaultOptions = []
    for (const item in cityList) {
      defaultOptions.push({ 
        label: cityList[item], 
        value: cityList[item] })
    }
    return defaultOptions
  }
  
  useEffect(() => {
    if (ApartmentIdDetail && ApartmentIdDetail.status === "ok") {
      const data = setApartmentEditData(ApartmentIdDetail.data)
      setFormData(data)
      const imageData = ApartmentIdDetail && ApartmentIdDetail.data && ApartmentIdDetail.data.apartmentImages
      setDefaultImages(imageData)
      setImageClickChange(!_.isEmpty(imageData) ? `${PROFILE_URL}${imageData[0].filePath}` : '')
      setPreviewImageBorder(!_.isEmpty(imageData) ? imageData[0].id : '')
      const apartmentDetails = ApartmentIdDetail && ApartmentIdDetail.data
      const apartmentType = apartmentDetails.apartmentType
      if (apartmentType && apartmentType.id) {
        const datas = getDefaultOptions(getAllApartmentType && getAllApartmentType.data)
        const selOption = datas.find((x) => x.value === apartmentType.id)
        if (selOption) {
          setSelectedApartmentTypeOption([selOption])
          setFormData((values) => ({ ...values, apartmentType: apartmentType.id }))
        }
      }
      const countryData = apartmentDetails.country
      if (countryData) {
        const datas = getDefaultOptionsCountry(Countrylists && Countrylists.data)
        const selOption = datas.find((x) => x.value === countryData)
        if (selOption) {
          setSelectedCountryOption([selOption])
          setFormData((values) => ({ ...values, country: countryData }))
        }
      }
    }
  }, [ApartmentIdDetail, editMode, getAllApartmentType, Countrylists])

  useEffect(() => {
    if (editMode) {
      const apartmentDetails = ApartmentIdDetail && ApartmentIdDetail.data
      const stateData = apartmentDetails.state
      if (stateData) {
        const datas = getDefaultOptionsState(Statelists && Statelists?.data && Statelists?.data?.states)
        const selOption = datas.find((x) => x.value === stateData)
        if (selOption) {
          setSelectedStateOption([selOption])
          setFormData((values) => ({ ...values, state: stateData }))
        }
      }
    }
  }, [editMode, Statelists, ApartmentIdDetail])

  useEffect(() => {
    if (editMode) {
      const apartmentDetails = ApartmentIdDetail && ApartmentIdDetail.data
      const cityData = apartmentDetails.city
      if (cityData) {
        const datas = getDefaultOptionsCity(Citylists && Citylists?.data)
        const selOption = datas.find((x) => x.value === cityData)
        if (selOption) {
          setSelectedCityOption([selOption])
          setFormData((values) => ({ ...values, city: cityData }))
        }
      }

    }
  }, [editMode, Citylists, ApartmentIdDetail])

  useEffect(() => {
    if (ApartmentIdDetail && ApartmentIdDetail.status === "ok") {
      const countryParams = ApartmentIdDetail && ApartmentIdDetail.data && ApartmentIdDetail.data.country
      const stateParams = ApartmentIdDetail && ApartmentIdDetail.data && ApartmentIdDetail.data.state
      const paramsState = {
        country: countryParams
      }
      const paramsCity = {
        country: countryParams,
        state: stateParams,
      }
      getCountrylistDispatch()
      getStatelistDispatch(paramsState)
      getCitylistDispatch(paramsCity)
    }
  }, [ApartmentIdDetail])

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
    setFormData({ ...formdata, apartmentImages: updatedImages })
    PropertyDeleteImage(id)
  }

  const imagePreview = (image) => {
    const imageValue = document.getElementById(image.id).src
    setImageClickChange(imageValue)
    setPreviewImageBorder(image.id)
  }

  return (
    <>
      <div className="form-group row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Apartments Type
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select Apartment Type"
                    isMulti={false}
                    name='apartmentType'
                    id='apartmentType'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeApartmentType}
                    options={apartmentTypeOption}
                    value={SelectedApartmentTypeOption}
                    isDisabled={!apartmentTypeOption}
                  />
                  {errors && errors.apartmentType && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.apartmentType}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Country
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select Country"
                    isMulti={false}
                    name='country'
                    id='country'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeCountry}
                    options={countryOption}
                    value={SelectedCountryOption}
                    isDisabled={!countryOption}
                  />
                  {errors && errors.country && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.country}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  City
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select City"
                    isMulti={false}
                    name='city'
                    id='city'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeCity}
                    options={CityOption}
                    value={SelectedCityOption}
                    isDisabled={!SelectedStateOption}
                  />
                  {errors && errors.city && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.city}
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Zip Code
                </label>
                <div className="w-100">
                  <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.zipCode || ''}
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    maxLength={6}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.zipCode && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.zipCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Apartment Name
                </label>
                <div className="w-100">
                  <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.apartmentName || ''}
                    type="text"
                    name="apartmentName"
                    id="apartmentName"
                    onKeyPress={(e) => {
                      const regex = REGEX.ALPHA_NUMERIC;
                      if (!regex.test(e.key) || formdata.apartmentName.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.apartmentName && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.apartmentName}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  State
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select State"
                    isMulti={false}
                    name='state'
                    id='state'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeState}
                    options={StateOption}
                    value={SelectedStateOption}
                    isDisabled={!SelectedCountryOption}
                  />
                  {errors && errors.state && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.state}
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Street Name
                </label>
                <div className="w-100">
                  <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.streetName || ''}
                    type="text"
                    name="streetName"
                    id="streetName"
                    onKeyPress={(e) => {
                      const regex = REGEX.ALPHA_NUMERIC;
                      if (!regex.test(e.key) || formdata.streetName.length >= 100) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.streetName && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.streetName}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  landmark
                </label>
                <div className="w-100">
                  <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.landmark || ''}
                    type="text"
                    name="landmark"
                    id="landmark"
                    onKeyPress={(e) => {
                      const regex = REGEX.ALPHA_NUMERIC;
                      if (!regex.test(e.key) || formdata.landmark.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.landmark && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.landmark}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">Address</label>
                <textarea
                  placeholder="Type here"
                  className="form-control form-control-lg"
                  onChange={(e) => handleChange(e)}
                  value={formdata.address || ''}
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="off"
                  rows={2}
                  onKeyPress={(e) => {
                    if (formdata.address && formdata.address.length >= 150) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.address ? null : <p className='text-muted fs-8'>Maximum 150 character</p>}
                {errors.address && (
                  <div className='fv-plugins-message-container text-danger'>
                    <span role='alert text-danger'>{errors.address}</span>
                  </div>
                )}
              </div>
              <div className="mb-4 pr-10">
                <label className="required form-label">Description</label>
                <textarea
                  placeholder="Type here"
                  className="form-control form-control-lg"
                  onChange={(e) => handleChange(e)}
                  value={formdata.description || ''}
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  rows={2}
                  onKeyPress={(e) => {
                    if (formdata.description && formdata.description.length >= 150) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.description && (
                  <div className='fv-plugins-message-container text-danger'>
                    <span role='alert text-danger'>{errors.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
        <div className="mt-8 apartment-img-background">
            {_.isEmpty(imageClickChange) && !loading ? (
              <div className="text-center">
                <img src={toAbsoluteUrl("/media/avatars/apartment/harborview.svg")} alt="previewImage" className="apartment-img" />
              </div>
            ) : loading ? (
              <div className='text-center'>
                <div className='spinner-border text-primary m-5' />
              </div>
            ): !_.isEmpty(imageClickChange) ? (
              <div className="text-center">
                <img src={imageClickChange} alt="previewImage" className="apartment-img" />
              </div>
            ): null}
            <div className="d-flex justify-content-evenly align-items-center mt-4">
              {defaultImages && defaultImages.length > 0 && defaultImages.map((image) => (
                <div key={image.id} className="apartment-img-preview-card card">
                <div className="card-body position-relative" onClick={() => imagePreview(image)}>
                  <img
                    src={`${PROFILE_URL}${image.filePath}`}
                    alt="Profile picture"
                    width="100%"
                    height="75px"
                    id={image.id}
                    className={previewImageBorder === image.id ? "image-border" : "image-border-none"}
                  />
                  <button type="button" className="icon-btn position-absolute top-0 end-0 p-0 d-flex justify-content-center align-items-center" onClick={() => handleImageDelete(image.id)}>
                    <i className="bi bi-x-circle btn-danger text-white"></i>
                  </button>
                </div>
              </div>
              ))}
              {defaultImages && defaultImages.length < 4 && (
              <div className="apartment-img-preview-card card">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <button type="button" className="icon-add p-0" onClick={handelUpload}>
                    <i className="bi bi-plus-circle text-primary">
                      <input
                        className='form-control form-control-lg d-none'
                        onChange={(e) => {
                          fileUpload(e);
                          e.target.value = null;
                        }}
                        type='file'
                        id='upload'
                        multiple
                      />
                    </i>
                  </button>
                </div>
              </div>)}
            </div>
          </div>
          <div className="mt-4">
            <label className="font-size-xs font-weight-bold mb-1 form-label">
              Pin Location
            </label>
            <MapContainer />
            <label className="font-size-xs font-weight-bold mb-1 mr-5 form-label">
              Latitude :19.2560
            </label>
            <label className="font-size-xs font-weight-bold mb-1 form-label">
              Longitude :29.2560
            </label>
          </div>
        </div>
        {/* <div className="form-group row mt-10">
          <h5 className="card-title leases-list-head mb-5">Apartment Images</h5>
          <div className="col-md-12 mb-4 rounded-1 profile-border p-3">
            {defaultImages && defaultImages.length < 5 && (
              <div className="rounded-1 apartment-image-border p-3 d-flex justify-content-center align-items-center flex-wrap">
                <div className="d-flex justify-content-center align-items-center mb-2 p-1" onClick={handelUpload}>
                  {!loading ? (
                    <>
                      <img src={toAbsoluteUrl("/media/avatars/preview-image/chooseFile.svg")} alt="chooseFile" />
                    </>
                  ) : (
                    <div className='text-center'>
                      <div className='spinner-border text-primary m-5' />
                    </div>
                  )}
                  <input
                    className='form-control form-control-lg d-none'
                    onChange={(e) => {
                      fileUpload(e);
                      e.target.value = null;
                    }}
                    type='file'
                    id='upload'
                    multiple
                  />
                </div>
              </div>
            )}
            <div className="d-flex flex-wrap">
              {defaultImages && defaultImages.length > 0 && defaultImages.map((image) => (
                <div key={image.id || image._id} className='d-flex mt-2 preview-multiple-img px-2 py-2 align-items-center' style={{ margin: '0 10px 10px 0' }}>
                  <img
                    src={`${PROFILE_URL}${image.filePath}`}
                    alt="Profile picture"
                    width='28px'
                    height='28px'
                    style={{ borderRadius: '25%' }}
                  />
                  <button className='btn btn-outline p-0 ml-2' onClick={() => handleImageDelete(image._id ? image._id : image.id)}>
                    <i className="bi bi-x fs-2"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <div className="form-group row mb-4">
          <div className="col-lg-12 text-center">
            <button
              className="btn btn-blue-outline py-2 m-2"
              onClick={(e) => onConfirm()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary py-2 m-2" onClick={(e) => handleSubmit()}>
              {editMode ? 'Update' : 'Save'}
            </button>
            <button type="submit" className="btn btn-blue py-2 m-2" onClick={(e) => handleSubmit(e, "continue")}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    ApartmentTypelistStore, OpenCountrylistStore, OpenStatelistStore, OpenCitylistStore, postApartmentStore, getApartmentDetialsStore, updateApartmentStore, MultifileAddStore, ImageDeleteStore
  } = state;
  return {
    getAllApartmentType: ApartmentTypelistStore && ApartmentTypelistStore.getAllApartmentType ? ApartmentTypelistStore.getAllApartmentType : '',
    Countrylists: OpenCountrylistStore && OpenCountrylistStore.OpenCountrylists ? OpenCountrylistStore.OpenCountrylists : "",
    Statelists: OpenStatelistStore && OpenStatelistStore.OpenStatelists ? OpenStatelistStore.OpenStatelists : "",
    Citylists: OpenCitylistStore && OpenCitylistStore.OpenCitylists ? OpenCitylistStore.OpenCitylists : "",
    ApartmentAdd: postApartmentStore && postApartmentStore.addApartment ? postApartmentStore.addApartment : '',
    ApartmentIdDetail: getApartmentDetialsStore && getApartmentDetialsStore.getApartmentDetail ? getApartmentDetialsStore.getApartmentDetail : '',
    saveupdateApartmentResponse: updateApartmentStore && updateApartmentStore.updtedResponse ? updateApartmentStore.updtedResponse : '',
    PropertFileUpload: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false,
    ImageIdDetail: ImageDeleteStore && ImageDeleteStore.Imagedelete ? ImageDeleteStore.Imagedelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getApartmentTypelistDispatch: (data) =>
    dispatch(ApartmentTypeActions.getApartmentTypelist(data)),
  getCountrylistDispatch: (data) =>
    dispatch(OpenCountryActions.getopencountrylist(data)),
  getStatelistDispatch: (data) =>
    dispatch(OpenStateActions.getopenstatelist(data)),
  getCitylistDispatch: (data) =>
    dispatch(OpenCityActions.getopencitylist(data)),
  apartmentAddDispatch: (data) =>
    dispatch(postApartmentAction.add(data)),
  clearApartmentAddDispatch: () =>
    dispatch(postApartmentAction.clear()),
  apartmentEditDispatch: (id) =>
    dispatch(getApartmentDetialsActions.getDetails(id)),
  clearApartmentIdDetails: () =>
    dispatch(getApartmentDetialsActions.clear()),
  updateApartmentDispatch: (id, params) =>
    dispatch(updateApartmentActions.update(id, params)),
  clearApartmentUpdateDispatch: () =>
    dispatch(updateApartmentActions.clear()),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  PropertyImageAddClear: () =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails()),
  PropertyDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  PropertyDeleteImageClear: () =>
    dispatch(ImageDeleteActions.clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddApartment);
