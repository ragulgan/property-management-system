import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import _ from "lodash";
import {
  FlatAddAction,
  FlatGetIdActions,
  updateFlatActions,
  UploadActions,
  OpenCountryActions,
  OpenStateActions,
  OpenCityActions
} from "../../store/actions";
import {
  RESPONSE_STATUS,
  REGEX,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
  USER_MANAGEMENT_VALIDATION,
  PROPERTY_MANAGEMENT_ERROR,
  USER_MANAGEMENT_ERROR,
} from "../../utils/constants";
import { Link, useLocation, useHistory } from "react-router-dom";
import ReactSelect from "../../theme/layout/components/ReactSelect";
import { setFlatEditData } from "./EditFormdata";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Dropzone from '../../utils/dropzone/Dropzone'

function FlatOwnerAdd(props) {
  const {
    flatAddDispatch,
    clearFlatAddDispatch,
    FlatAdd,
    flatEditDispatch,
    clearFlatIdDetails,
    FlatIdDetail,
    updateFlatDispatch,
    saveupdateFlatResponse,
    clearFlatUpdateDispatch,
    setActiveTab,
    setPropertyId,
    setPropDoclist,
    propertyId,
    escriptMasterDataType,
    setShowImage,
    dropzoneImage,
    dropzoneImageAddClear,
    OpenCountrylists,
    OpenStatelists,
    OpenCitylists,
    getOpenCountrylistDispatch,
    getOpenStatelistDispatch,
    getOpenCitylistDispatch
  } = props;

  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [formdata, setFormData] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
    alternativeNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
    postalCode: '',
    currentAddress: '',
    permanentAddress: '',
    emergencyContactName1: '',
    emergencyContact1: '',
    emergencyContactRelationship1: '',
    image: []
  });
  const [errors, setErrors] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
    postalCode: '',
    currentAddress: '',
    permanentAddress: '',
  });
  const [selectedOptions, setSelectedOptions] = useState();
  const [defaultImages, setDefaultImages] = useState([]);
  const [isCountinue, setIsCountinue] = useState(false);
  const [countryOption, setCountryOption] = useState();
  const [SelectedCountryOption, setSelectedCountryOption] = useState("");
  const [stateOption, setStateOption] = useState()
  const [SelectedStateOption, setSelectedStateOption] = useState('')
  const [CityOption, setCityOption] = useState()
  const [SelectedCityOption, setSelectedCityOption] = useState('')
  const [paramCountry, setParamCountry] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getOpenCountrylistDispatch();
  }, [])

  const handleSubmit = (e, name) => {
    e.preventDefault()
    const errors = {}
    if (_.isEmpty(formdata.permanentAddress)) {
      errors.permanentAddress = USER_MANAGEMENT_ERROR.PERMANENT_ADDRESS
      document.getElementById('permanentAddress').focus()
    }
    if (_.isEmpty(formdata.currentAddress)) {
      errors.currentAddress = USER_MANAGEMENT_ERROR.CURRENT_ADDRESS
      document.getElementById('currentAddress').focus()
    }
    if (_.isEmpty(formdata.postalCode)) {
      errors.postalCode = USER_MANAGEMENT_ERROR.PINCODE
      document.getElementById('postalCode').focus()
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
    if (formdata.alternativeNumber && !REGEX.PHONE_NUMBER.test(formdata.alternativeNumber)) {
      errors.alternativeNumber = USER_MANAGEMENT_VALIDATION.USER_PHONE
      document.getElementById('alternativeNumber').focus()
    } if (formdata.mobileNumber.length === 10 && formdata.mobileNumber === formdata.alternativeNumber) {
      errors.alternativeNumber = USER_MANAGEMENT_VALIDATION.USER_SAME_PHONE_NUMBER
      document.getElementById('alternativeNumber').focus()
    } else if (formdata.alternativeNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.alternativeNumber)) {
      errors.alternativeNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('alternativeNumber').focus()
    }
    if (_.isEmpty(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_ERROR.PHONE_NUMBER
      document.getElementById('mobileNumber').focus()
    } else if (formdata.mobileNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('mobileNumber').focus()
    }
    if (_.isEmpty(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_ERROR.USER_EMAIL
      document.getElementById('emailId').focus()
    } else if (!REGEX.EMAIL.test(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_VALIDATION.USER_EMAIL
      document.getElementById('emailId').focus()
    }
    if (_.isEmpty(formdata.name)) {
      errors.name = USER_MANAGEMENT_ERROR.USER_NAME
      document.getElementById('name').focus()
    }
    setErrors(errors)
    console.log('formdata====>', formdata)
    // if (_.isEmpty(errors)) {
    //   if (editMode) {
    //     onConfirmupdate()
    //   } else {
    //     flatAddDispatch(formdata)
    //   }
    //   if (!_.isEmpty(name)) {
    //     setIsCountinue(true)
    //     setPropDoclist(true)
    //   } else {
    //     setIsCountinue(false)
    //   }
    // }
  };

  const onConfirmupdate = () => {
    const id = propertyId;
    updateFlatDispatch(id, formdata);
  };

  const clear = () => {
    setFormData({
      name: '',
      emailId: '',
      mobileNumber: '',
      alternativeNumber: '',
      countryId: '',
      stateId: '',
      cityId: '',
      postalCode: '',
      currentAddress: '',
      permanentAddress: '',
      emergencyContactName1: '',
      emergencyContact1: '',
      emergencyContactRelationship1: '',
      image: [],
    });
    setDefaultImages([])
    setParamCountry('')
    setSelectedCountryOption('')
    setSelectedStateOption('')
    setSelectedCityOption('')
  };

  const onConfirm = () => {
    clear();
    history.push("/flatOwnerList");
    clearFlatIdDetails();
    dropzoneImageAddClear()
  };

  useEffect(() => {
    if (FlatAdd && FlatAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearFlatAddDispatch();
      Toastify({
        text: FlatAdd && FlatAdd.message,
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
        setPropertyId(FlatAdd && FlatAdd.data);
        setPropDoclist(true);
        clearFlatIdDetails();
        setShowImage(true);
        setActiveTab("Flat/Unit")
      } else {
        onConfirm();
      }
    } else if (FlatAdd && FlatAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: FlatAdd && FlatAdd.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearFlatAddDispatch();
    }
  }, [FlatAdd]);

  useEffect(() => {
    if (dropzoneImage.code === 200) {
      const imageData = [{
        displayName: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].displayName,
        filePath: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].filePath,
        id: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].id
      }]
      setFormData({ ...formdata, image: imageData })
      setDefaultImages(imageData)
    }
  }, [dropzoneImage]);

  useEffect(() => {
    if (!_.isEmpty(propertyId)) {
      flatEditDispatch(propertyId);
      setEditMode(true);
    }
  }, [propertyId]);

  useEffect(() => {
    if (
      saveupdateFlatResponse &&
      saveupdateFlatResponse.status === RESPONSE_STATUS.SUCCESS
    ) {
      Toastify({
        text: saveupdateFlatResponse && saveupdateFlatResponse.message,
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
      clearFlatUpdateDispatch();
      // clearFlatIdDetails()
      if (isCountinue) {
        setPropertyId(propertyId);
        setPropDoclist(true);
        setShowImage(true);
        clearFlatIdDetails();
        setActiveTab("Flat/Unit")
      } else {
        onConfirm();
      }
    } else if (
      saveupdateFlatResponse &&
      saveupdateFlatResponse.status === RESPONSE_STATUS.ERROR
    ) {
      Toastify({
        text: saveupdateFlatResponse && saveupdateFlatResponse.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearFlatUpdateDispatch();
    }
  }, [saveupdateFlatResponse]);

  const handleChangeCountry = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCountryOption(selectedOption);
      setFormData((values) => ({ ...values, countryId: selectedOption.value }));
      setSelectedStateOption("");
      setSelectedCityOption("");
      const params = {
        country: selectedOption.value,
      };
      getOpenStatelistDispatch(params);
      setErrors({ ...errors, countryId: "" });
      setParamCountry(params)
    } else {
      setSelectedCountryOption();
      setFormData((values) => ({ ...values, countryId: "" }));
    }
  };

  const handleChangeState = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedStateOption(selectedOption)
      setSelectedCityOption('')
      setFormData(values => ({ ...values, stateId: selectedOption.value }))
      const params = {
        country: paramCountry && paramCountry?.country,
        state: selectedOption.value,
      }
      getOpenCitylistDispatch(params)
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

  useEffect(() => {
    const data = OpenCountrylists && OpenCountrylists.data;
    const countryList = getDefaultOptionsCountry(data);
    setCountryOption(countryList);
  }, [OpenCountrylists]);

  useEffect(() => {
    const data = OpenStatelists && OpenStatelists?.data && OpenStatelists?.data?.states
    const stateList = getDefaultOptionsState(data)
    setStateOption(stateList)
  }, [OpenStatelists])

  useEffect(() => {
    const data = OpenCitylists && OpenCitylists?.data
    const cityList = getDefaultOptionsCity(data)
    setCityOption(cityList)
  }, [OpenCitylists])

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
        value: stateList[item].name
      })
    }
    return defaultOptions
  }

  const getDefaultOptionsCity = (cityList) => {
    const defaultOptions = []
    for (const item in cityList) {
      defaultOptions.push({
        label: cityList[item],
        value: cityList[item]
      })
    }
    return defaultOptions
  }

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);


  useEffect(() => {
    if (FlatIdDetail && FlatIdDetail.status === "ok") {
      const data = setFlatEditData(FlatIdDetail.data)
      setFormData(data)
      const imageData = FlatIdDetail && FlatIdDetail.data && FlatIdDetail.data.image
      setDefaultImages(imageData)
      const flatOwnerDetils = FlatIdDetail && FlatIdDetail.data
      const countryData = flatOwnerDetils.country
      if (countryData) {
        const datas = getDefaultOptionsCountry(OpenCountrylists && OpenCountrylists.data)
        const selOption = datas.find((x) => x.value === countryData)
        if (selOption) {
          setSelectedCountryOption([selOption])
          setFormData((values) => ({ ...values, country: countryData }))
        }
      }
    }
  }, [FlatIdDetail, editMode, OpenCountrylists])

  useEffect(() => {
    if (editMode) {
      const apartmentAdminDetails = FlatIdDetail && FlatIdDetail.data
      const stateData = apartmentAdminDetails.state
      if (stateData) {
        const datas = getDefaultOptionsState(OpenStatelists && OpenStatelists?.data && OpenStatelists?.data?.states)
        const selOption = datas.find((x) => x.value === stateData)
        if (selOption) {
          setSelectedStateOption([selOption])
          setFormData((values) => ({ ...values, state: stateData }))
        }
      }
    }
  }, [FlatIdDetail, editMode, OpenStatelists])

  useEffect(() => {
    if (editMode) {
      const apartmentAdminDetails = FlatIdDetail && FlatIdDetail.data
      const cityData = apartmentAdminDetails.city
      if (cityData) {
        const datas = getDefaultOptionsCity(OpenCitylists && OpenCitylists?.data)
        const selOption = datas.find((x) => x.value === cityData)
        if (selOption) {
          setSelectedCityOption([selOption])
          setFormData((values) => ({ ...values, city: cityData }))
        }
      }

    }
  }, [FlatIdDetail, editMode, OpenCitylists])

  useEffect(() => {
    if (FlatIdDetail && FlatIdDetail.status === "ok") {
      const countryParams = FlatIdDetail && FlatIdDetail.data && FlatIdDetail.data.country
      const stateParams = FlatIdDetail && FlatIdDetail.data && FlatIdDetail.data.state
      const paramsState = {
        country: countryParams
      }
      const paramsCity = {
        country: countryParams,
        state: stateParams,
      }
      getOpenCountrylistDispatch()
      getOpenStatelistDispatch(paramsState)
      getOpenCitylistDispatch(paramsCity)
    }
  }, [FlatIdDetail])

  return (
    <>
      <div className="form-group row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Full Name
                </label>
                <div className="w-100">
                  <input
                    placeholder='Name'
                    className='form-control form-control-lg ps-4 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.name || ''}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.TEXT;
                      if (!regex.test(e.key) || formdata.name.length >= 30) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.name && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Mobile Number
                </label>
                <div className="w-100">
                  <input
                    placeholder='Mobile Number'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.mobileNumber || ''}
                    type='text'
                    name='mobileNumber'
                    id='mobileNumber'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const key = e.key;
                      const currentValue = e.target.value;
                      const regex = REGEX.NUMERIC_DIGITS
                      const updatedValue = currentValue + key;

                      if (!regex.test(updatedValue) || updatedValue.length > 10) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.mobileNumber && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.mobileNumber}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Country
                </label>
                <div className="w-100">
                  <ReactSelect
                    isMulti={false}
                    placeholder="Select here"
                    name='countryId'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeCountry}
                    options={countryOption}
                    value={SelectedCountryOption}
                    id='countryId'
                  // isSearchable={false}
                  />
                  {errors.countryId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.countryId}</span>
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
                    isMulti={false}
                    placeholder="Select here"
                    name='cityId'
                    id='cityId'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeCity}
                    options={CityOption}
                    value={SelectedCityOption}
                    isDisabled={!SelectedStateOption}
                  // isSearchable={false}
                  />
                  {errors.cityId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.cityId}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Permanent Address
                </label>
                <div className="w-100">
                  <textarea
                    placeholder='Permanent Address'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.permanentAddress || ''}
                    type='text'
                    name='permanentAddress'
                    id='permanentAddress'
                    autoComplete='off'
                    rows='5'
                    onKeyPress={(e) => {
                      if (formdata.permanentAddress.length >= 150) {
                        e.preventDefault()
                      }
                    }} />
                  {errors.permanentAddress && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.permanentAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Email Address
                </label>
                <div className="w-100">
                  <input
                    placeholder='Email'
                    className='form-control form-control-lg ps-4 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.emailId || ''}
                    type='email'
                    name='emailId'
                    id='emailId'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      if (formdata.emailId.length >= 50) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.emailId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.emailId}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label">
                  Alternative Number
                </label>
                <div className="w-100">
                  <input
                    placeholder='Alternative Number'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.alternativeNumber || ''}
                    type='text'
                    name='alternativeNumber'
                    id='alternativeNumber'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const key = e.key;
                      const currentValue = e.target.value;
                      const regex = REGEX.NUMERIC_DIGITS
                      const updatedValue = currentValue + key;

                      if (!regex.test(updatedValue) || updatedValue.length > 10) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.alternativeNumber && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.alternativeNumber}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  State
                </label>
                <div className="w-100">
                  <ReactSelect
                    isMulti={false}
                    placeholder="Select here"
                    name='stateId'
                    id='stateId'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeState}
                    options={stateOption}
                    value={SelectedStateOption}
                    isDisabled={!SelectedCountryOption}
                  // isSearchable={false}
                  />
                  {errors.stateId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.stateId}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Postal Code
                </label>
                <div className="w-100">
                  <input
                    placeholder='Postal Code'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.postalCode || ''}
                    type='text'
                    name='postalCode'
                    id='postalCode'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const key = e.key;
                      const currentValue = e.target.value;
                      const regex = REGEX.ZIP_CODE
                      const updatedValue = currentValue + key;

                      if (!regex.test(updatedValue) || updatedValue.length > 6) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.postalCode && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.postalCode}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Current Address
                </label>
                <div className="w-100">
                  <textarea
                    placeholder='Current Address'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.currentAddress || ''}
                    type='text'
                    name='currentAddress'
                    id='currentAddress'
                    autoComplete='off'
                    rows='5'
                    onKeyPress={(e) => {
                      if (formdata.currentAddress.length >= 150) {
                        e.preventDefault()
                      }
                    }} />
                  {errors.currentAddress && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.currentAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="mb-3 text-center">
            <label className='font-size-xs font-weight-light mb-4  form-label'>
              Profile Image
            </label>
            <div className='rounded mx-auto d-block'>
              <Dropzone
                defaultImages={defaultImages}
                type={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
                multiple={false}
                thumbnail={false}
                maxFileSize="5"
                name={`${DROPZONE_IMAGE_NAME_TYPES.IMAGE.toLowerCase()}`}
                flag={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
                formatType={FILE_FORMAT_TYPE}
                escriptMasterDataType={'User'}
                className="customDropzone"
                id='User'
              />
              {/* {errors.image && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.image}</span>
              </div>
            )} */}
            </div>
            <div className='text-muted mt-2'>Note: please upload ,pdf, doc format only- Max file size 5MB </div>
          </div>
          <div className='text-start'>
            <label className='staff-header mt-2 mb-2 form-label'>
              Emergency Contact
            </label>
            <div className='col-lg-11 mb-3 w-100'>
              <label className="mt-4 form-label">Contact Name</label>
              <input
                name='emergencyContactName1'
                id='emergencyContactName1'
                type='text'
                className='form-control form-control-lg ps-4 placeHolder'
                placeholder='Name'
                onChange={(e) => handleChange(e)}
                autoComplete='off'
                value={formdata.emergencyContactName1 || ''}
                onKeyPress={(e) => {
                  const regex = REGEX.TEXT;
                  if (!regex.test(e.key) || formdata.emergencyContactName1.length >= 30) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className='col-lg-11 mb-3 w-100'>
              <label className="mt-4 form-label">Relationship</label>
              <input
                name='emergencyContactRelationship1'
                id='emergencyContactRelationship1'
                type='text'
                className='form-control form-control-lg ps-4 placeHolder'
                placeholder='Relationship'
                onChange={(e) => handleChange(e)}
                autoComplete='off'
                value={formdata.emergencyContactRelationship1 || ''}
                onKeyPress={(e) => {
                  const regex = REGEX.TEXT;
                  if (!regex.test(e.key) || formdata.emergencyContactRelationship1.length >= 30) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className='col-lg-11 w-100'>
              <label className="mt-4 form-label">Mobile Number</label>
              <input
                name='emergencyContact1'
                id='emergencyContact1'
                type='text'
                className='form-control form-control-lg ps-4 placeHolder'
                placeholder='Mobile Number'
                onChange={(e) => handleChange(e)}
                autoComplete='off'
                value={formdata.emergencyContact1 || ''}
                onKeyPress={(e) => {
                  const key = e.key;
                  const currentValue = e.target.value;
                  const regex = REGEX.NUMERIC_DIGITS
                  const updatedValue = currentValue + key;

                  if (!regex.test(updatedValue) || updatedValue.length > 10) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.emergencyContact1 && (
                <div className='fv-plugins-message-container text-danger mb-4'>
                  <span role='alert text-danger'>{errors.emergencyContact1}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="form-group row mb-4">
          <div className="col-lg-12 text-center">
            <button
              type="button"
              className="btn btn-blue-outline py-2 m-2"
              onClick={(e) => onConfirm(e)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary py-2 m-2"
              onClick={(e) => handleSubmit(e)}
            >
              {editMode ? "Update" : "Save"}
            </button>
            <button
              type="submit"
              className="btn btn-blue py-2 m-2"
              onClick={(e) => handleSubmit(e, "continue")}
            >
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
    FlatAddStore,
    editFlatStore,
    updateFlatStore,
    OpenCountrylistStore,
    OpenStatelistStore,
    OpenCitylistStore,
    dropzoneStore
  } = state;
  return {
    FlatAdd:
      FlatAddStore && FlatAddStore.addFlat
        ? FlatAddStore.addFlat
        : "",
    FlatIdDetail:
      editFlatStore && editFlatStore.FlatIdDetail
        ? editFlatStore.FlatIdDetail
        : "",
    saveupdateFlatResponse:
      updateFlatStore && updateFlatStore.updateFlatResponce
        ? updateFlatStore.updateFlatResponce
        : "",
    OpenCountrylists: OpenCountrylistStore && OpenCountrylistStore.OpenCountrylists ? OpenCountrylistStore.OpenCountrylists : "",
    OpenStatelists: OpenStatelistStore && OpenStatelistStore.OpenStatelists ? OpenStatelistStore.OpenStatelists : "",
    OpenCitylists: OpenCitylistStore && OpenCitylistStore.OpenCitylists ? OpenCitylistStore.OpenCitylists : "",
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.status ? dropzoneStore.dropzoneImage.status : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  flatAddDispatch: (data) =>
    dispatch(FlatAddAction.flatAdd(data)),
  clearFlatAddDispatch: () =>
    dispatch(FlatAddAction.clearFlatAdd()),
  flatEditDispatch: (id) =>
    dispatch(FlatGetIdActions.getFlatIdDetails(id)),
  clearFlatIdDetails: () =>
    dispatch(FlatGetIdActions.clearFlatIdDetails()),
  updateFlatDispatch: (id, params) =>
    dispatch(updateFlatActions.updateFlat(id, params)),
  clearFlatUpdateDispatch: () =>
    dispatch(updateFlatActions.clearupdateFlat()),
  dropzoneImageAddClear: (data) =>
    dispatch(UploadActions.uploadImageClear(data)),
  getOpenCountrylistDispatch: (data) =>
    dispatch(OpenCountryActions.getopencountrylist(data)),
  getOpenStatelistDispatch: (data) =>
    dispatch(OpenStateActions.getopenstatelist(data)),
  getOpenCitylistDispatch: (data) =>
    dispatch(OpenCityActions.getopencitylist(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerAdd);
