import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { LesseeListAddAction, LeasesListGetIdActions, updateLesseeListActions, UploadActions, MultifileAddActions, ImageDeleteActions, CityActions, StateActions, CountryActions, MultifileNomineeAddActions, ImageDeleteNomineeActions } from '../../store/actions'
import { REGEX } from '../../utils/constants'
import {
  RESPONSE_STATUS, SWEET_ALERT_MSG,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
  USER_MANAGEMENT_ERROR,
  USER_MANAGEMENT_VALIDATION,
  IMAGE,
  PROPERTY_MANAGEMENT_ERROR
} from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import { setLesseeDetailsEditData } from './EditFormdata'
import dayjs, { Dayjs } from 'dayjs';
import Dropzone from '../../utils/dropzone/Dropzone'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'

function AddLesseeDetail(props) {
  const {
    leaseAddDispatch,
    clearLeaseAddCRMDispatch,
    LeaseEditDispatch,
    clearLeaseIdDetails,
    updateLeaseDispatch,
    clearLeaseUpdateDispatch,
    getCitylistDispatch,
    getStatelistDispatch,
    getCountrylistDispatch,
    LesseeListAdd,
    LesseeListIdDetail,
    saveupdateLesseeListResponse,
    dropzoneImage,
    dropzoneImageAddClear,
    PropertyFileUpload,
    PropertyImageAddDispatch,
    PropertyImageAddClear,
    PropertyDeleteImage,
    PropertyDeleteImageClear,
    NomineeFileUpload,
    NomineeImageAddDispatch,
    NomineeImageAddClear,
    NomineeDeleteImage,
    NomineeDeleteImageClear,
    ImageIdDetail,
    NomineeIdDetail,
    loading,
    Countrylists,
    Statelists,
    Citylists,
    setPropDoclist,
    propertyId,
    setActiveTab,
    setLeaseId,
    leaseId
  } = props

  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    lesseeName: '',
    lesseeEmailAddress: '',
    lesseeMobileNo: '',
    country: '',
    state: '',
    district: '',
    lesseeCurrentAddress: '',
    lesseePermanentAddress: '',
    lesseeAadharNumber: '',
    lesseePanNumber: '',
    lesseeIdProof: [],
    lesseeImage: [],
    emergency : [],
    nominee : [],
    propertyId: '',
  })
  const [errors, setErrors] = useState({
    lesseeName: '',
    lesseeEmailAddress: '',
    lesseeMobileNo: '',
    country: '',
    state: '',
    district: '',
    lesseeCurrentAddress: '',
    lesseePermanentAddress: '',
    lesseeAadharNumber: '',
    lesseePanNumber: '',
    lesseeIdProof: [],
    lesseeImage: [],
    // contactName: '',
    // relationship: '',
    // phoneNumber: '',
    // name: '',
    // mobile: '',
    // emailAddress: '',
    // address: '',
    // aadharNumber: '',
    // panNumber: '',
    // idProof: [],
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [defaultImages, setDefaultImages] = useState([]);
  const [defaultImagesLesseeIdProof, setDefaultImagesLesseeIdProof] = useState([]);
  const [defaultImagesNomineeIdProof, setDefaultImagesNomineeIdProof] = useState([]);
  const [SelectedStateOption, setSelectedStateOption] = useState('')
  const [CityOption, setCityOption] = useState()
  const [countryOption, setCountryOption] = useState()
  const [SelectedCountryOption, setSelectedCountryOption] = useState('')
  const [StateOption, setStateOption] = useState()
  const [SelectedCityOption, setSelectedCityOption] = useState('')
  const [isCountinue, setIsCountinue] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState([
    { contactName: '', relationship: '', phoneNumber: '' },
  ]);

  const [nomineName, setNomineName] = useState([
    {
      name: '',
      mobile: '',
      emailAddress: '',
      address: '',
      aadharNumber: '',
      panNumber: '',
      idProof: [],
    }
  ]);
  const [addonEmerError, setAddonEmerError] = useState(false)
  const [addonNomieeError, setAddonNomieeError] = useState(false)
  const history = useHistory()
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  const handleChangeContact = (e, index) => {
    const { name, value } = e.target;
    const updatedContacts = [...emergencyContacts];
    // const updatedErrors = { ...errors};
    if (updatedContacts[index] && updatedContacts[index].hasOwnProperty(name)) {
      updatedContacts[index][name] = value;
    }
    // updatedErrors[name] = '';
    setEmergencyContacts(updatedContacts);
    setFormData({...formdata, emergency:updatedContacts})
    // setErrors(updatedErrors);
  }

  const handleChangeNomine = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...nomineName];
    // const updatedErrors = { ...errors};
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    // updatedErrors[name] = '';
    setNomineName(updatedFormData);
    setFormData({...formdata, nominee:updatedFormData})
    // setErrors(updatedErrors);
  }

  useEffect(() => {
    const params = {
      status: "ACTIVE"
    }
    getCountrylistDispatch(params)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(propertyId)) {
      setFormData((formData) => ({
        ...formData,
        propertyId: propertyId
      }))
    }
  }, [propertyId])

  const handleSubmit = (e, name) => {
    const errors = {}
    // Nominee
    // if (_.isEmpty(formdata.panNumber)) {
    //   errors.panNumber = USER_MANAGEMENT_ERROR.PAN
    //   document.getElementById('panNumber')
    // }
    // if (_.isEmpty(formdata.aadharNumber)) {
    //   errors.aadharNumber = USER_MANAGEMENT_ERROR.AADHAR_NUMBER
    //   document.getElementById('aadharNumber')
    // }
    // if (_.isEmpty(formdata.address)) {
    //   errors.address = USER_MANAGEMENT_ERROR.NOMINEE_ADDRESS
    //   document.getElementById('address')
    // }
    // if (_.isEmpty(formdata.emailAddress)) {
    //   errors.emailAddress = USER_MANAGEMENT_ERROR.USER_EMAIL
    //   document.getElementById('emailAddress')
    // } else if (!REGEX.EMAIL.test(formdata.emailAddress)) {
    //   errors.emailAddress = USER_MANAGEMENT_VALIDATION.USER_EMAIL
    //   document.getElementById('emailAddress')
    // }
    // if (_.isEmpty(formdata.mobile)) {
    //   errors.mobile = USER_MANAGEMENT_ERROR.PHONE_NUMBER
    //   document.getElementById('mobile')
    // } else if (formdata.mobile && !REGEX.MOBILE_NUMBER_VALID.test(formdata.mobile)) {
    //   errors.mobile = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
    //   document.getElementById('mobile')
    // }
    // if (_.isEmpty(formdata.name)) {
    //   errors.name = USER_MANAGEMENT_ERROR.USER_NAME
    //   document.getElementById('name')
    // }
    // Emergency contact
    // if (_.isEmpty(formdata.phoneNumber)) {
    //   errors.phoneNumber = USER_MANAGEMENT_ERROR.PHONE_NUMBER
    //   document.getElementById('phoneNumber')
    // } else if (formdata.phoneNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.phoneNumber)) {
    //   errors.phoneNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
    //   document.getElementById('phoneNumber')
    // }
    // if (_.isEmpty(formdata.relationship)) {
    //   errors.relationship = USER_MANAGEMENT_ERROR.CONTACT_RELATIONSHIP
    //   document.getElementById('relationship')
    // }
    // if (_.isEmpty(formdata.contactName)) {
    //   errors.contactName = USER_MANAGEMENT_ERROR.USER_NAME
    //   document.getElementById('contactName')
    // }
    //Lease Details
    if (_.isEmpty(formdata.lesseePanNumber)) {
      errors.lesseePanNumber = USER_MANAGEMENT_ERROR.PAN
      document.getElementById('lesseePanNumber')
    }
    if (_.isEmpty(formdata.lesseeAadharNumber)) {
      errors.lesseeAadharNumber = USER_MANAGEMENT_ERROR.AADHAR_NUMBER
      document.getElementById('lesseeAadharNumber')
    }
    if (_.isEmpty(formdata.lesseePermanentAddress)) {
      errors.lesseePermanentAddress = USER_MANAGEMENT_ERROR.PERMANENT_ADDRESS
      document.getElementById('lesseePermanentAddress')
    }
    if (_.isEmpty(formdata.lesseeCurrentAddress)) {
      errors.lesseeCurrentAddress = USER_MANAGEMENT_ERROR.CURRENT_ADDRESS
      document.getElementById('lesseeCurrentAddress')
    }
    if (_.isEmpty(formdata.district)) {
      errors.district = PROPERTY_MANAGEMENT_ERROR.SELECT_DISTRICT
      document.getElementById('district')
    }
    if (_.isEmpty(formdata.state)) {
      errors.state = PROPERTY_MANAGEMENT_ERROR.STATE_SELECT
      document.getElementById('state')
    }
    if (_.isEmpty(formdata.country)) {
      errors.country = PROPERTY_MANAGEMENT_ERROR.COUNTRY_SELECT
      document.getElementById('country')
    }
    if (_.isEmpty(formdata.lesseeMobileNo)) {
      errors.lesseeMobileNo = USER_MANAGEMENT_ERROR.PHONE_NUMBER
      document.getElementById('lesseeMobileNo')
    } else if (formdata.lesseeMobileNo && !REGEX.MOBILE_NUMBER_VALID.test(formdata.lesseeMobileNo)) {
      errors.lesseeMobileNo = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('lesseeMobileNo')
    }
    if (_.isEmpty(formdata.lesseeEmailAddress)) {
      errors.lesseeEmailAddress = USER_MANAGEMENT_ERROR.USER_EMAIL
      document.getElementById('lesseeEmailAddress')
    } else if (!REGEX.EMAIL.test(formdata.lesseeEmailAddress)) {
      errors.lesseeEmailAddress = USER_MANAGEMENT_VALIDATION.USER_EMAIL
      document.getElementById('lesseeEmailAddress')
    }
    if (_.isEmpty(formdata.lesseeName)) {
      errors.lesseeName = USER_MANAGEMENT_ERROR.USER_NAME
      document.getElementById('lesseeName')
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        leaseAddDispatch(formdata)
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
    const id = leaseId
    updateLeaseDispatch(id, formdata)
  }

  const clear = () => {
    setFormData({
      lesseeName: '',
      lesseeEmailAddress: '',
      lesseeMobileNo: '',
      country: '',
      state: '',
      district: '',
      lesseeCurrentAddress: '',
      lesseePermanentAddress: '',
      lesseeAadharNumber: '',
      lesseePanNumber: '',
      lesseeIdProof: [],
      lesseeImage: [],
      emergency : [],
      nominee : []
    })
    setSelectedStateOption('')
    setSelectedCityOption('')
    setSelectedCountryOption('')
    setDefaultImages([])
    setDefaultImagesLesseeIdProof([])
    setDefaultImagesNomineeIdProof([])
  }

  const onConfirm = (e, name) => {
    if (!_.isEmpty(name)) {
      setActiveTab('Lease info')
    }
  }

  const onConfirmLeaseList = () => {
    clear()
    history.push('/leases')
    clearLeaseIdDetails()
  }

  useEffect(() => {
    if (LesseeListAdd && LesseeListAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearLeaseAddCRMDispatch()
      Toastify({
        text: LesseeListAdd && LesseeListAdd.message,
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
        setActiveTab('Lease Documents')
        setLeaseId(LesseeListAdd && LesseeListAdd.data)
        setPropDoclist(true)
      } else {
        onConfirmLeaseList()
      }
    } else if (LesseeListAdd && LesseeListAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: LesseeListAdd && LesseeListAdd.message,
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
      clearLeaseAddCRMDispatch()
    }
  }, [LesseeListAdd])

  useEffect(() => {
    if (!_.isEmpty(leaseId)) {
      setEditMode(true)
    }
  }, [leaseId])

  useEffect(() => {
    if (LesseeListIdDetail && LesseeListIdDetail.status === 'ok') {
      const userData = LesseeListIdDetail && LesseeListIdDetail.data
      const setData = setLesseeDetailsEditData(userData)
      setFormData(setData)
      const imageData = LesseeListIdDetail && LesseeListIdDetail.data && LesseeListIdDetail.data.lesseeImage
      const imageDataLesseeId = LesseeListIdDetail && LesseeListIdDetail.data && LesseeListIdDetail.data.lesseeIdProof
      setDefaultImages(imageData)
      setDefaultImagesLesseeIdProof(imageDataLesseeId)
      const userDetils = LesseeListIdDetail && LesseeListIdDetail.data
      setEmergencyContacts(LesseeListIdDetail && LesseeListIdDetail.data && LesseeListIdDetail.data.emergency)
      setNomineName(LesseeListIdDetail && LesseeListIdDetail.data && LesseeListIdDetail.data.nominee)

      const countryId = userDetils.country
      if (countryId && countryId.id) {
        const datas = getDefaultOptionsCountry(Countrylists && Countrylists.data)
        const selOption = datas.find((x) => x.value === countryId.id)
        if (selOption) {
          setSelectedCountryOption([selOption])
          setFormData((values) => ({ ...values, country: countryId.id }))
        }
      }

      const stateId = userDetils.state
      if (stateId && stateId.id) {
        const datas = getDefaultOptionsState(Statelists && Statelists.data)
        const selOption = datas.find((x) => x.value === stateId.id)
        setSelectedStateOption([selOption])
        if (selOption) {
          setSelectedStateOption([selOption])
          setFormData((values) => ({ ...values, state: stateId.id }))
        }
      }

      const district = userDetils.district
      if (district && district.id) {
        const datas = getDefaultOptionsCity(Citylists && Citylists.data)
        const selOption = datas.find((x) => x.value === district.id)
        if (selOption) {
          setSelectedCityOption([selOption])
          setFormData((values) => ({ ...values, district: district.id }))
        }
      }
    }
  }, [LesseeListIdDetail, editMode])

  useEffect(() => {
    if (saveupdateLesseeListResponse && saveupdateLesseeListResponse.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: saveupdateLesseeListResponse && saveupdateLesseeListResponse.message,
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
      clearLeaseUpdateDispatch()
      if (isCountinue) {
        setActiveTab('Lease Documents')
        setPropDoclist(true)
      } else {
        onConfirmLeaseList()
      }
    } else if (saveupdateLesseeListResponse && saveupdateLesseeListResponse.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: saveupdateLesseeListResponse && saveupdateLesseeListResponse.message,
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
      clearLeaseUpdateDispatch()
    }
  }, [saveupdateLesseeListResponse])

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
    const data = Citylists && Citylists.data
    const cityList = getDefaultOptionsCity(data)
    setCityOption(cityList)
  }, [Citylists])

  const handleChangeCountry = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCountryOption(selectedOption)
      setFormData(values => ({ ...values, country: selectedOption.value }))
      setSelectedStateOption('')
      setSelectedCityOption('')
      const params = {
        countryId: selectedOption.value,
        status: 'ACTIVE'
      }
      getStatelistDispatch(params)
      setErrors({ ...errors, country: "" });
    } else {
      setSelectedCountryOption();
      setFormData((values) => ({ ...values, country: "" }));
    }
  }

  const handleChangeState = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedStateOption(selectedOption)
      setSelectedCityOption('')
      setFormData(values => ({ ...values, state: selectedOption.value }))
      const params = {
        stateId: selectedOption.value,
        status: 'ACTIVE'
      }
      getCitylistDispatch(params)
      setErrors({ ...errors, state: "" });
    } else {
      setSelectedStateOption()
      setFormData((values) => ({ ...values, state: "" }));
    }
  }

  const handleChangeCity = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCityOption(selectedOption)
      setFormData(values => ({ ...values, district: selectedOption.value }))
      setErrors({ ...errors, district: "" });
    } else {
      setSelectedCityOption();
      setFormData((values) => ({ ...values, district: "" }));
    }
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

  //LesseeProfile upload
  useEffect(() => {
    if (dropzoneImage.code === 200) {
      const imageData = [{
        displayName: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].displayName,
        filePath: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].filePath,
        id: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].id
      }]
      setFormData({ ...formdata, lesseeImage: imageData })
      setDefaultImages(imageData)
    }
  }, [dropzoneImage]);
  
  const handelUpload = (e) => {
    document.getElementById('lesseeIdProof').click(e)
  }

  const handelUploadNominee = (e) => {
    document.getElementById('idProof').click(e)
  }

  // LesseeIdProof upload start
  useEffect(() => {
    if (PropertyFileUpload.code === 200) {
      const imageData =
        PropertyFileUpload.data.map((data) => ({
          displayName: data.displayName,
          filePath: data.filePath,
          id: data.id,
          createdDate: data.createdDate,
          size: data.size,
          type: data.type
        }))
      setFormData({ ...formdata, lesseeIdProof: imageData })
      setDefaultImagesLesseeIdProof(imageData)
    }
  }, [PropertyFileUpload])

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
    PropertyImageAddDispatch(data, 'LesseeIdProof');
  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImagesLesseeIdProof.filter((img) => img.id !== id);
    setDefaultImagesLesseeIdProof(updatedImages);
    setFormData({ ...formdata, lesseeIdProof: updatedImages })
    PropertyDeleteImage(id)
  }
   // LesseeIdProof upload end

    // NomineeIdProof upload start
  useEffect(() => {
    if (NomineeFileUpload.code === 200) {
      const imageData =
        NomineeFileUpload.data.map((data) => ({
          displayName: data.displayName,
          filePath: data.filePath,
          id: data.id,
          createdDate: data.createdDate,
          size: data.size,
          type: data.type
        }))
        const nomineData = nomineName.map(value => {
          return{
          ...value, idProof:imageData
        }})
      setFormData({ ...formdata, nominee: nomineData })
      setDefaultImagesNomineeIdProof(imageData)
    }
  }, [NomineeFileUpload])

  useEffect(() => {
    if (NomineeIdDetail && NomineeIdDetail.code === 200) {
      Toastify({
        text: NomineeIdDetail && NomineeIdDetail.message,
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
      NomineeDeleteImageClear()
    } else if (NomineeIdDetail && NomineeIdDetail.code !== 200) {
      Toastify({
        text: NomineeIdDetail && NomineeIdDetail.message,
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
      NomineeDeleteImageClear()
    }
  }, [NomineeIdDetail])

  const fileUploadNomineeIdProof = (e) => {
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
    NomineeImageAddDispatch(data, 'NomineeIdProof');
  }

  const handleImageDeleteNomineeIdProof = (id) => {
    const updatedImages = defaultImagesNomineeIdProof.filter((img) => img.id !== id);
    setDefaultImagesNomineeIdProof(updatedImages);
    setFormData({ ...formdata, idProof: updatedImages })
    NomineeDeleteImage(id)
  }
   // NomineeIdProof upload end

  const handelAdd = () => {
    if(emergencyContacts.length === 2) {
      setEmergencyContacts([...emergencyContacts])
      setAddonEmerError(true)
    }else{
    setEmergencyContacts([...emergencyContacts, { contactName: '', relationship: '', phoneNumber: '' }]);
    setAddonEmerError(false)
    }
  };

  useEffect(()=> {
    if(addonEmerError){
    Toastify({
      text: 'Only Two Emergency Contact Members are allowed.',
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
  }else if(addonNomieeError){
    Toastify({
      text: 'Only Two Nominee Members are allowed.',
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
  }
  },[addonEmerError, addonNomieeError])

  const handelAddNomine = () => {
    if(nomineName.length === 2){
      setNomineName([...nomineName])
      setAddonNomieeError(true)
    }else {
      setNomineName([...nomineName, {
        name: '',
        mobile: '',
        emailAddress: '',
        address: '',
        aadharNumber: '',
        panNumber: '',
        idProof: [],
      }])
      setAddonNomieeError(false)
    }
  }

  const handleRemove = (indexToRemove) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts.splice(indexToRemove, 1);
    setEmergencyContacts(updatedContacts);
    setAddonEmerError(false)
    setFormData({...formdata, emergency:updatedContacts})
  };

  const handleRemoveNomine = (indexRemove) => {
    const nomineDetails = [...nomineName];
    nomineDetails.splice(indexRemove, 1);
    setNomineName(nomineDetails);
    setAddonNomieeError(false)
    setFormData({...formdata, nominee:nomineDetails})
  }

  return (
    <>
      <div className='container-fixed'>
        <div className='card py-5 px-10'>
          <div className='card-body'>
            <div className='form-group row mb-4'>
              <div className='col-lg-4 mb-3'>
                <label className='staff-header mb-3 form-label'>
                  Personal Information
                </label>
                <div className='col-lg-11 w-100'>
                  <label className="required form-label">Name</label>
                  <input
                    placeholder='Name'
                    className='form-control form-control-lg ps-4 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.lesseeName || ''}
                    type='text'
                    name='lesseeName'
                    id='lesseeName'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.TEXT;
                      if (!regex.test(e.key) || formdata.lesseeName.length >= 30) {
                        e.preventDefault();
                      }
                    }} />
                  {errors.lesseeName && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.lesseeName}</span>
                    </div>
                  )}
                  <label className="required form-label mt-4">Mobile No</label>
                  <input
                    placeholder='Mobile No'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.lesseeMobileNo || ''}
                    type='text'
                    name='lesseeMobileNo'
                    id='lesseeMobileNo'
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
                  {errors.lesseeMobileNo && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.lesseeMobileNo}</span>
                    </div>
                  )}

                  <label className="font-size-xs font-weight-bold mt-4 form-label required">
                    State
                  </label>
                  <div className='w-100'>
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
                      isDisabled={!StateOption}
                    />
                  </div>
                  {errors && errors.state && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.state}
                    </div>
                  )}
                  <label className='mt-4 form-label required'>
                    Current Address
                  </label>
                  <textarea
                    placeholder='Current Address'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.lesseeCurrentAddress || ''}
                    type='text'
                    name='lesseeCurrentAddress'
                    id='lesseeCurrentAddress'
                    autoComplete='off'
                    rows={1}
                    onKeyPress={(e) => {
                      if (formdata.lesseeCurrentAddress.length >= 150) {
                        e.preventDefault()
                      }
                    }} />
                  {errors.lesseeCurrentAddress && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.lesseeCurrentAddress}</span>
                    </div>
                  )}
                  <label className="form-label mt-4">Aadhar Number</label>
                  <input
                    placeholder='Aadhar'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.lesseeAadharNumber || ''}
                    type='text'
                    name='lesseeAadharNumber'
                    id='lesseeAadharNumber'
                    autoComplete='off'
                    onKeyPress={(e) => {
                      if (formdata.lesseeAadharNumber.length >= 10) {
                        e.preventDefault()
                      }
                    }} />
                  {errors.lesseeAadharNumber && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.lesseeAadharNumber}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 mb-3 mt-7'>
                <label className="required form-label mt-4">Email Address</label>
                <input
                  className='form-control form-control-lg ps-4 placeHolder'
                  placeholder='Email-Id'
                  onChange={(e) => handleChange(e)}
                  type='email'
                  name='lesseeEmailAddress'
                  id='lesseeEmailAddress'
                  autoComplete='off'
                  value={formdata.lesseeEmailAddress || ''}
                  onKeyPress={(e) => {
                    if (formdata.lesseeEmailAddress.length >= 50) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.lesseeEmailAddress && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.lesseeEmailAddress}</span>
                  </div>
                )}
                <label className="required form-label mt-4">Country</label>
                <div className='w-100'>
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
                </div>
                {errors && errors.country && (
                  <div className="rr mt-1">
                    <style>{".rr{color:red}"}</style>
                    {errors.country}
                  </div>
                )}
                <label className="required form-label mt-4">District</label>
                <ReactSelect
                  isMulti={false}
                  placeholder='Select City'
                  name='district'
                  id='district'
                  className='select2'
                  classNamePrefix='select'
                  handleChangeReactSelect={handleChangeCity}
                  options={CityOption}
                  value={SelectedCityOption}
                  isDisabled={!CityOption}
                />
                {errors && errors.district && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.district}</span>
                  </div>
                )}
                <label className='mt-4 form-label required'>
                  Permanent Address
                </label>
                <textarea
                  placeholder='Permanent Address'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.lesseePermanentAddress || ''}
                  type='text'
                  name='lesseePermanentAddress'
                  id='lesseePermanentAddress'
                  autoComplete='off'
                  rows={1}
                  onKeyPress={(e) => {
                    if (formdata.lesseePermanentAddress.length >= 150) {
                      e.preventDefault()
                    }
                  }} />
                {errors.lesseePermanentAddress && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.lesseePermanentAddress}</span>
                  </div>
                )}
                <label className="form-label mt-4">PAN Number</label>
                <input
                  placeholder='PAN No'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.lesseePanNumber || ''}
                  type='text'
                  name='lesseePanNumber'
                  id='lesseePanNumber'
                  autoComplete='off'
                  onKeyPress={(e) => {
                    const regex = REGEX.PAN;
                    if (!regex.test(e.key) || formdata.lesseePanNumber.length >= 10) {
                      e.preventDefault();
                    }
                  }} />
                {errors.lesseePanNumber && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.lesseePanNumber}</span>
                  </div>
                )}
              </div>
              <div className='col-lg-4 mb-3'>
                <div className='text-center'>
                  <label className='font-size-xs font-weight-light mb-4  form-label'>
                    Upload Photo
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
                      escriptMasterDataType={'Lessee'}
                      className="customDropzone"
                      id='Lessee'
                    />
                    {/* {errors.image && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.image}</span>
                    </div>
                  )} */}
                  </div>
                  <div className='text-muted mt-2'>Note: please upload jpg, png format only - Max file size 5MB </div>
                </div>
                <label className='mt-4 form-label required'>
                  ID Proof
                </label>
                <div className="d-flex justify-content-between align-items-center border border-2 rounded-2 mb-2 p-1">
                  <span className='upload-text'>Choose File</span>
                  <input
                    className='form-control form-control-lg d-none'
                    onChange={(e) => {
                      {
                        fileUpload(e)
                        e.target.value = null
                      }
                    }}
                    type='file'
                    id='lesseeIdProof'
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
                    defaultImagesLesseeIdProof && defaultImagesLesseeIdProof.length > 0 ?
                    defaultImagesLesseeIdProof.map((image) => (
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
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <label className='staff-header mt-4 form-label'>
                      Emergency Contact
                    </label>
                  </div>
                  {emergencyContacts === undefined ? null : 
                  emergencyContacts.map((formdata, index) => (
                    <div className='row' key={index}>
                      <div className='col-lg-4'>
                        <label className="mt-4 form-label required">Contact Name</label>
                        <input
                          name='contactName'
                          type='text'
                          id='contactName'
                          className='form-control form-control-lg ps-4 placeHolder'
                          placeholder='Contact Name'
                          onChange={(e) => handleChangeContact(e, index)}
                          autoComplete='off'
                          value={formdata.contactName || ''}
                          onKeyPress={(e) => {
                            const regex = REGEX.TEXT;
                            if (!regex.test(e.key) || formdata.contactName.length >= 30) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.contactName && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.contactName}</span>
                          </div>
                        )}
                      </div>
                      <div className='col-lg-4'>
                        <label className="mt-4 form-label required">Relationship</label>
                        <input
                          name='relationship'
                          id='relationship'
                          type='text'
                          className='form-control form-control-lg ps-4 placeHolder'
                          placeholder='Relationship'
                          onChange={(e) => handleChangeContact(e, index)}
                          autoComplete='off'
                          value={formdata.relationship || ''}
                          onKeyPress={(e) => {
                            const regex = REGEX.TEXT;
                            if (!regex.test(e.key) || formdata.relationship.length >= 30) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.relationship && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.relationship}</span>
                          </div>
                        )}
                      </div>
                      <div className='col-lg-4 d-flex flex-column'>
                        <label className="mt-4 form-label required">Mobile Number</label>
                        <div className="d-flex align-items-center">
                          <input
                            name='phoneNumber'
                            id='phoneNumber'
                            type='text'
                            className='form-control form-control-lg ps-4 placeHolder'
                            placeholder='Mobile Number'
                            onChange={(e) => handleChangeContact(e, index)}
                            autoComplete='off'
                            value={formdata.phoneNumber || ''}
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
                          {index === 0 ? (
                            <span className="btn btn-blue p-2 ms-2" onClick={handelAdd}>
                              Add
                            </span>
                          ) : (
                            <span className="btn btn-red p-2 ms-2" onClick={() => handleRemove(index)}>
                              Close
                            </span>
                            // <button type="button" class="btn-close" aria-label="Close" onClick={() => handleRemove(index)}></button>
                          )}

                        </div>
                        {errors.phoneNumber && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.phoneNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='col-lg-12'>
                  {nomineName === undefined ? null : 
                  nomineName.map((formdata, index) => (
                    <div className='row' key={index}>
                      <div className='col-lg-12'>
                        <label className='staff-header mt-4 form-label'>
                          Nominee
                        </label>
                      </div>
                      <div className='col-lg-4'>
                        <label className="mt-4 form-label required">Name</label>
                        <input
                          name='name'
                          id='name'
                          type='text'
                          className='form-control form-control-lg ps-4 placeHolder'
                          placeholder='Name'
                          onChange={(e) => handleChangeNomine(e, index)}
                          autoComplete='off'
                          value={formdata.name || ''}
                          onKeyPress={(e) => {
                            const regex = REGEX.TEXT;
                            if (!regex.test(e.key) || formdata.name.length >= 30) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.name && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.name}</span>
                          </div>
                        )}
                        <label className="required form-label mt-4">Email Address</label>
                        <input
                          className='form-control form-control-lg ps-4 placeHolder'
                          placeholder='Email-Id'
                          onChange={(e) => handleChangeNomine(e, index)}
                          type='email'
                          name='emailAddress'
                          id='emailAddress'
                          autoComplete='off'
                          value={formdata.emailAddress || ''}
                          onKeyPress={(e) => {
                            if (formdata.emailAddress.length >= 50) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.emailAddress && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.emailAddress}</span>
                          </div>
                        )}
                        <label className="form-label mt-4">Aadhar Number</label>
                        <input
                          placeholder='Aadhar'
                          className='form-control form-control-lg ps-4 mt-1 placeHolder'
                          onChange={(e) => handleChangeNomine(e, index)}
                          value={formdata.aadharNumber || ''}
                          type='text'
                          name='aadharNumber'
                          id='aadharNumber'
                          autoComplete='off'
                          onKeyPress={(e) => {
                            if ((formdata.aadharNumber || '').length >= 10) {
                              e.preventDefault();
                            }
                          }} />
                        {errors.aadharNumber && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.aadharNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className='col-lg-4'>
                        <label className="mt-4 form-label required">Mobile Number</label>
                        <input
                          name='mobile'
                          id='mobile'
                          type='text'
                          className='form-control form-control-lg ps-4 placeHolder'
                          placeholder='Mobile Number'
                          onChange={(e) => handleChangeNomine(e, index)}
                          autoComplete='off'
                          value={formdata.mobile || ''}
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
                        {errors.mobile && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.mobile}</span>
                          </div>
                        )}
                        <label className='mt-4 form-label required'>
                          Address
                        </label>
                        <textarea
                          placeholder='Address'
                          className='form-control form-control-lg ps-4 mt-1 placeHolder'
                          onChange={(e) => handleChangeNomine(e, index)}
                          value={formdata.address || ''}
                          type='text'
                          name='address'
                          id='address'
                          autoComplete='off'
                          rows={1}
                          onKeyPress={(e) => {
                            if ((formdata.address || '').length >= 150) {
                              e.preventDefault();
                            }
                          }} />
                        {errors.address && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.address}</span>
                          </div>
                        )}
                        <label className="form-label mt-4">PAN Number</label>
                        <input
                          placeholder='PAN No'
                          className='form-control form-control-lg ps-4 mt-1 placeHolder'
                          onChange={(e) => handleChangeNomine(e, index)}
                          value={formdata.panNumber || ''}
                          type='text'
                          name='panNumber'
                          id='panNumber'
                          autoComplete='off'
                          onKeyPress={(e) => {
                            const regex = REGEX.PAN;
                            if (!regex.test(e.key) || (formdata.panNumber || '').length >= 10) {
                              e.preventDefault();
                            }
                          }} />
                        {errors.panNumber && (
                          <div className='fv-plugins-message-container text-danger mb-4'>
                            <span role='alert text-danger'>{errors.panNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className='col-lg-4 upload-file flex-column'>
                        <label className='mt-4 form-label required'>
                          ID Proof
                        </label>
                        <div className="d-flex justify-content-between align-items-center border border-2 rounded-2 mb-2 p-1">
                          <span className='upload-text'>Choose File</span>
                          <input
                            className='form-control form-control-lg d-none'
                            onChange={(e) => {
                              {
                                fileUploadNomineeIdProof(e)
                                e.target.value = null
                              }
                            }}
                            type='file'
                            id='idProof'
                            key={index}
                            multiple
                          />
                          {index === 0 ? (
                            <span className="btn btn-blue p-2 ms-2 add-nominee" onClick={handelAddNomine}>
                              Add
                            </span>
                          ) : (
                            <span className="btn btn-red p-2 ms-2 close-nominee" onClick={() => handleRemoveNomine(index)}>
                              Close
                            </span>
                            // <button type="button" class="btn-close" aria-label="Close" onClick={() => handleRemove(index)}></button>
                          )}
                          <span className="btn btn-blue p-2"
                            onClick={handelUploadNominee}>
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
                            defaultImagesNomineeIdProof && defaultImagesNomineeIdProof.length > 0 ?
                            defaultImagesNomineeIdProof.map((image) => (
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
                                  <button className='btn btn-outline p-0' onClick={() => handleImageDeleteNomineeIdProof(image._id ? image._id : image.id)}><i class="bi bi-x fs-2"></i></button>
                                </div>
                              ))
                              : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='form-group row my-10'>
                  <div className='col-lg-12 text-center'>
                    <button
                      type='button'
                      className='btn btn-blue-outline py-2 m-2'
                      onClick={(e) => onConfirm(e, "back")}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { LesseeListAddStore, editLeasesListStore, updateLesseeListStore, dropzoneStore, MultifileAddStore, ImageDeleteStore, CountrylistStore, StatelistStore, CitylistStore, MultifileNomineeAddStore, ImageDeleteNomineeStore } = state
  return {
    LesseeListAdd: LesseeListAddStore && LesseeListAddStore.LesseeListAdd ? LesseeListAddStore.LesseeListAdd : '',
    LesseeListIdDetail: editLeasesListStore && editLeasesListStore.LeasesListIdDetail ? editLeasesListStore.LeasesListIdDetail : '',
    saveupdateLesseeListResponse: updateLesseeListStore && updateLesseeListStore.saveupdateLesseeListResponse ? updateLesseeListStore.saveupdateLesseeListResponse : '',
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.status ? dropzoneStore.dropzoneImage.status : "",
    PropertyFileUpload: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    ImageIdDetail: ImageDeleteStore && ImageDeleteStore.Imagedelete ? ImageDeleteStore.Imagedelete : '',
    NomineeFileUpload: MultifileNomineeAddStore && MultifileNomineeAddStore.NomineeIdAdd ? MultifileNomineeAddStore.NomineeIdAdd : [],
    NomineeIdDetail: ImageDeleteNomineeStore && ImageDeleteNomineeStore.ImagedeleteNominee ? ImageDeleteNomineeStore.ImagedeleteNominee : '',
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false,
    Countrylists: CountrylistStore && CountrylistStore.Countrylists ? CountrylistStore.Countrylists : '',
    Statelists: StatelistStore && StatelistStore.Statelists ? StatelistStore.Statelists : '',
    Citylists: CitylistStore && CitylistStore.Citylists ? CitylistStore.Citylists : ''
  }
}

const mapDispatchToProps = dispatch => ({
  leaseAddDispatch: (data) =>
    dispatch(LesseeListAddAction.LesseeListAdd(data)),
  clearLeaseAddCRMDispatch: () =>
    dispatch(LesseeListAddAction.clearLesseeList()),
  LeaseEditDispatch: (id) =>
   dispatch(LeasesListGetIdActions.getLeasesListIdDetails(id)),
  clearLeaseIdDetails: () =>
    dispatch(LeasesListGetIdActions.clearLeasesListIdDetails()),
  updateLeaseDispatch: (id, params) =>
    dispatch(updateLesseeListActions.updateLesseeList(id, params)),
  clearLeaseUpdateDispatch: () =>
    dispatch(updateLesseeListActions.clearupdateLesseeList()),
  getCountrylistDispatch: (data) =>
    dispatch(CountryActions.getcountrylist(data)),
  getStatelistDispatch: (data) =>
    dispatch(StateActions.getStatelist(data)),
  getCitylistDispatch: (data) =>
    dispatch(CityActions.getcitylist(data)),
  dropzoneImageAddClear: (data) =>
    dispatch(UploadActions.uploadImageClear(data)),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  PropertyImageAddClear: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  PropertyDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  PropertyDeleteImageClear: (id) =>
    dispatch(ImageDeleteActions.clear(id)), 
  NomineeImageAddDispatch: (data, name) =>
    dispatch(MultifileNomineeAddActions.getMultifileNomineeDetails(data, name)),
  NomineeImageAddClear: (data, name) =>
    dispatch(MultifileNomineeAddActions.clearMultifileNomineeDetails(data, name)),
  NomineeDeleteImage: (id) =>
    dispatch(ImageDeleteNomineeActions.delete(id)),
  NomineeDeleteImageClear: (id) =>
    dispatch(ImageDeleteNomineeActions.clear(id))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLesseeDetail)