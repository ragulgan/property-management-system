import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { UsersActions, UserAddAction, UserGetIdActions, updateUserActions, UserDropDownGetActions, UploadActions, OpenCountryActions, OpenStateActions, OpenCityActions } from '../../store/actions'
import {
  RESPONSE_STATUS, SWEET_ALERT_MSG, STATUS_BADGE, DATE,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
  USER_MANAGEMENT_ERROR,
  USER_MANAGEMENT_VALIDATION,
  PROPERTY_MANAGEMENT_ERROR, 
  REGEX
} from '../../utils/constants'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { setUserEditData } from './editFormdata'
import { DateSelector } from '../../theme/layout/components/DateSelector'
import dayjs, { Dayjs } from 'dayjs';
import Dropzone from '../../utils/dropzone/Dropzone'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const endOfQ12022 = dayjs().subtract(18, 'year');
const startOfQ12022 = dayjs().subtract(50, 'year');

const endOfJoin = dayjs().add(1, 'month');
const startOfJoin = dayjs().subtract(1, 'month');

function AddApartmentAdmin(props) {
  const {
    getUserlistDispatch,
    userAddDispatch,
    clearUSERAddCRMDispatch,
    addUser,
    UsersIdDetail,
    getUserIdDetails,
    updateUserDispatch,
    updateUserResponce,
    clearUSERUpdateDispatch,
    dropzoneImage,
    dropzoneImageAddClear,
    getUserDropDownlistDispatch,
    getDropDown,
    getAllUsers,
    clearUserIdDetails,
    dropzoneImageAddDispatch,

    OpenCountrylists,
    OpenStatelists,
    OpenCitylists,
    getOpenCountrylistDispatch,
    getOpenStatelistDispatch,
    getOpenCitylistDispatch
  } = props

  const pathName = useLocation().pathname
  const url = pathName && pathName.split('/')
  const clearPage = url && url[1]
  const currentId = url && url[2]
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
    alternativeNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
    currentAddress: '',
    emergencyContactName1: '',
    emergencyContact1: '',
    emergencyContactRelationship1: '',
    image: [],
    // pg: '',
    // ug: '',
    // status: '',
    // dateOfJoining: '',
    // officialMailId: '',
    // password: '',
    // reportTo: '',
    // dob: '',
    // fatherName: '',
    // bloodGroup: '',
    // permanentAddress: '',
    // emergencyContactName2: '',
    // emergencyContact2: '',
    // emergencyContactRelationship2: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
    alternativeNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
    currentAddress: '',
    image: [],
    // pg: '',
    // ug: '',
    // status: '',
    // dateOfJoining: '',
    // officialMailId: '',
    // password: '',
    // reportTo: '',
    // dob: '',
    // fatherName: '',
    // bloodGroup: '',
    // permanentAddress: '',
    // emergencyContactName1: '',
    // emergencyContact1: '',
    // emergencyContactRelationship1: '',
    // emergencyContactName2: '',
    // emergencyContact2: '',
    // emergencyContactRelationship2: '',
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [password, setPassword] = useState('')
  const [defaultImages, setDefaultImages] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [status, setSelectStatus] = useState('')
  const [RoleOption, setRole] = useState()
  const [SelectedRoleOption, setSelectedRoleOption] = useState('')
  const [ReportOption, setRoleReportOption] = useState()
  const [SelectedReportOption, setSelectedReportOption] = useState('')

  const [countryOption, setCountryOption] = useState();
  const [SelectedCountryOption, setSelectedCountryOption] = useState("");
  const [stateOption, setStateOption] = useState()
  const [SelectedStateOption, setSelectedStateOption] = useState('')
  const [CityOption, setCityOption] = useState()
  const [SelectedCityOption, setSelectedCityOption] = useState('')
  const [paramCountry, setParamCountry] = useState('')

  const history = useHistory()
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const params = {
      status: "ACTIVE"
    }
    const paramsDropdown = {
      roleStatus: "ACTIVE"
    }
    getUserDropDownlistDispatch(paramsDropdown)
    getUserlistDispatch(params)
    getOpenCountrylistDispatch();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (_.isEmpty(formdata.currentAddress)) {
      errors.currentAddress = USER_MANAGEMENT_ERROR.CURRENT_ADDRESS
      document.getElementById('currentAddress').focus()
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
    // if (_.isEmpty(errors)) {
    //   if (editMode) {
    //     onConfirmupdate()
    //   } else {
    //     formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
    //     formdata.dateOfJoining = dayjs(formdata.dateOfJoining).format('YYYY-MM-DD')
    //     userAddDispatch(formdata)
    //   }
    // }
    console.log('formdata====>', formdata)
  }

  const onConfirmupdate = () => {
    // formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
    // formdata.dateOfJoining = dayjs(formdata.dateOfJoining).format('YYYY-MM-DD')
    updateUserDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      name: '',
      emailId: '',
      mobileNumber: '',
      alternativeNumber: '',
      countryId: '',
      stateId: '',
      cityId: '',
      currentAddress: '',
      emergencyContactName1: '',
      emergencyContact1: '',
      emergencyContactRelationship1: '',
      image: [],
      // pg: '',
      // ug: '',
      // status: '',
      // dateOfJoining: '',
      // officialMailId: '',
      // password: '',
      // reportTo: '',
      // dob: '',
      // fatherName: '',
      // bloodGroup: '',
      // permanentAddress: '',
      // emergencyContactName2: '',
      // emergencyContact2: '',
      // emergencyContactRelationship2: '',
    })
    setDefaultImages([])
    setParamCountry('')
    setSelectedCountryOption('')
    setSelectedStateOption('')
    setSelectedCityOption('')
    // setPassword('')
    // setBloodGroup('')
    // setGender('')
    // setMaritalStatus('')
    // setSelectStatus('')
    // setSelectedRoleOption('')
  }

  useEffect(() => {
    return (() => {
      clearUserIdDetails()
      clearUSERAddCRMDispatch()
      clear()
    })
  }, [])

  const onConfirm = () => {
    clear()
    history.push('/apartmentadmin')
    clearUserIdDetails()
    dropzoneImageAddClear()
  }

  const handlePasswordVisible = (e) => {
    e.preventDefault()
    setPassword(!password)
  }
  useEffect(() => {
    if (addUser && addUser.status === RESPONSE_STATUS.SUCCESS) {
      clearUSERAddCRMDispatch()
      onConfirm()
      clear()
      Toastify({
        text: addUser && addUser.message,
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
    } else if (addUser && addUser.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: addUser && addUser.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearUSERAddCRMDispatch()
    }
  }, [addUser])

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
    if (currentId) {
      getUserIdDetails(currentId)
      setEditMode(true)
    }
  }, [currentId])

  useEffect(() => {
    if (updateUserResponce && updateUserResponce.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: updateUserResponce && updateUserResponce.message,
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
      clearUSERUpdateDispatch()
      clear()
      clearUserIdDetails()
      onConfirm()
    } else if (updateUserResponce && updateUserResponce.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: updateUserResponce && updateUserResponce.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearUSERUpdateDispatch()
    }
  }, [updateUserResponce])

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
    if (UsersIdDetail && UsersIdDetail.status === "ok") {
      const data = setUserEditData(UsersIdDetail.data)
      setFormData(data)
      const imageData = UsersIdDetail && UsersIdDetail.data && UsersIdDetail.data.image
      setDefaultImages(imageData)
      const userDetils = UsersIdDetail && UsersIdDetail.data
    }
  }, [UsersIdDetail, editMode])

  return (
    <>
      <div className='mb-5'>
        <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>{editMode ? 'Edit Apartment Admin' : 'Add Apartment Admin'}</h4>
      </div>
      <div className='container-fixed'>
        <div className='card py-5 px-10'>
          <div className='card-body'>
            <div className='form-group row mb-4'>
              <div className='col-lg-4 mb-3 pr-10'>
                <label className='staff-header mb-3 form-label'>
                    Basic Info
                </label>
                <div className='col-lg-11 w-100'>
                  <label className="required form-label">Full Name</label>
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
                  <label className="required form-label mt-4">Mobile Number</label>
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
                  <div className='mt-4'>
                    <label className="required form-label">Country</label>
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
                  </div>
                  {errors.countryId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.countryId}</span>
                    </div>
                  )}
                  <div className='mt-4'>
                    <label className="required form-label">City</label>
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
                  </div>
                  {errors.cityId && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.cityId}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 mb-3 pr-10'>
                <label className='mb-8 form-label'>
                </label>
                <div className='col-lg-11 w-100'>
                  <label className='required form-label'>
                    Email Address
                  </label>
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
                  <label className="form-label mt-4">Alternative Number</label>
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
                  <label className="required form-label mt-4">State</label>
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
                  <label className='form-label required mt-4'>
                    Current Address
                  </label>
                  <textarea
                    placeholder='Current Address'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.currentAddress || ''}
                    type='text'
                    name='currentAddress'
                    id='currentAddress'
                    autoComplete='off'
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
              <div className='col-lg-4 mb-3 text-center'>
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
              <div className='col-lg-4 text-start'>
                <label className='staff-header mt-2 mb-2 form-label'>
                  Emergency Contact
                </label>
                <div className='col-lg-11 w-100'>
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
              </div>
              <div className='col-lg-4 text-start'>
                <label className='staff-header mt-8 mb-2 form-label'>  
                </label>
                <div className='col-lg-11 w-100'>
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
              </div>
              <div className='col-lg-4 text-start'>
              <label className='staff-header mt-8 mb-2 form-label'>   
                  </label>
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
              <div className='form-group row mt-6 mb-4'>
                <div className='col-lg-12 text-center'>
                  <button
                    className='btn btn-blue-outline py-2 m-2'
                    onClick={onConfirm}
                  >
                    Discard
                  </button>
                  <button
                    className='btn btn-blue btn-size py-2 m-2'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    {editMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { UserAddStore, editUsersStore, updateUserStore, dropzoneStore, UserlistDropDownStore, USERlistStore, OpenCountrylistStore,
    OpenStatelistStore, OpenCitylistStore
   } = state
  return {
    addUser: UserAddStore && UserAddStore.addUser ? UserAddStore.addUser : '',
    UsersIdDetail: editUsersStore && editUsersStore.UsersIdDetail ? editUsersStore.UsersIdDetail : '',
    updateUserResponce: updateUserStore && updateUserStore.updateUserResponce ? updateUserStore.updateUserResponce : '',
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.status ? dropzoneStore.dropzoneImage.status : "",
    getDropDown: UserlistDropDownStore && UserlistDropDownStore.getDropDown ? UserlistDropDownStore.getDropDown : '',
    getAllUsers: USERlistStore && USERlistStore.getAllUsers ? USERlistStore.getAllUsers : '',

    OpenCountrylists: OpenCountrylistStore && OpenCountrylistStore.OpenCountrylists ? OpenCountrylistStore.OpenCountrylists : "",
    OpenStatelists: OpenStatelistStore && OpenStatelistStore.OpenStatelists ? OpenStatelistStore.OpenStatelists : "",
    OpenCitylists: OpenCitylistStore && OpenCitylistStore.OpenCitylists ? OpenCitylistStore.OpenCitylists : "",
  }
}

const mapDispatchToProps = dispatch => ({
  getUserlistDispatch: (data) =>
    dispatch(UsersActions.getUSERlist(data)),
  userAddDispatch: (data) =>
    dispatch(UserAddAction.USERAdd(data)),
  clearUSERAddCRMDispatch: (data) =>
    dispatch(UserAddAction.clearUSER(data)),
  getUserIdDetails: (id) =>
    dispatch(UserGetIdActions.getUserIdDetails(id)),
  clearUserIdDetails: () =>
    dispatch(UserGetIdActions.clearUserIdDetails()),
  updateUserDispatch: (id, params) =>
    dispatch(updateUserActions.updateUser(id, params)),
  clearUSERUpdateDispatch: () =>
    dispatch(updateUserActions.clearupdateUser()),
  getUserDropDownlistDispatch: (data) =>
    dispatch(UserDropDownGetActions.getUserDropDownIdDetails(data)),
  dropzoneImageAddClear: (data) =>
    dispatch(UploadActions.uploadImageClear(data)),
  getOpenCountrylistDispatch: (data) =>
    dispatch(OpenCountryActions.getopencountrylist(data)),
  getOpenStatelistDispatch: (data) =>
    dispatch(OpenStateActions.getopenstatelist(data)),
  getOpenCitylistDispatch: (data) =>
    dispatch(OpenCityActions.getopencitylist(data)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddApartmentAdmin)