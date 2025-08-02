import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ApartmentAdminActions, ApartmentAdminAddAction, ApartmentAdminGetIdActions, updateApartmentAdminActions, UserDropDownGetActions, UploadActions, getApartmentListActions, OpenCountryActions, OpenStateActions, OpenCityActions } from '../../store/actions'
import {
  REGEX,
  RESPONSE_STATUS, SWEET_ALERT_MSG, STATUS_BADGE, DATE,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
  USER_MANAGEMENT_ERROR,
  USER_MANAGEMENT_VALIDATION
} from '../../utils/constants'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { setApartmentAdminEditData } from './editFormdata'
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
    getApartmentAdminListDispatch,
    apartmentAdminAddDispatch,
    clearApartmentAdminAddDispatch,
    addApartmentAdmin,
    apartmentAdminIdDetails,
    getApartmentAdminIdDetails,
    updateApartmentAdminDispatch,
    updateApartmentAdmin,
    clearApartmentAdminUpdateDispatch,
    dropzoneImage,
    dropzoneImageAddClear,
    getUserDropDownlistDispatch,
    getDropDown,
    getAllApartmentAdmin,
    getApartment,
    clearApartmentAdminIdDetails,
    dropzoneImageAddDispatch,
    getApartmentDispatch,
    OpenCountrylists,
    OpenStatelists,
    OpenCitylists,
    getOpenCountrylistDispatch,
    getOpenStatelistDispatch,
    getOpenCitylistDispatch
  } = props

  const BloodGroup = [
    {
      "value": "A_negative",
      "label": "A -ve"
    },
    {
      "value": "A_positive",
      "label": "A +ve"
    },
    {
      "value": "B_negative",
      "label": "B -ve"
    },
    {
      "value": "B_positive",
      "label": "B +ve"
    },
    {
      "value": "O_negative",
      "label": "O -ve"
    },
    {
      "value": "O_positive",
      "label": "O +ve"
    },
    {
      "value": "AB_negative",
      "label": "AB -ve"
    },
    {
      "value": "AB_positive",
      "label": "AB +ve"
    }
  ]

  const Gender = [
    {
      "value": "Female",
      "label": "Female"
    },
    {
      "value": "Male",
      "label": "Male"
    }
  ]

  const MaritalStatus = [
    {
      "value": "Married",
      "label": "Married"
    },
    {
      "value": "Single",
      "label": "Single"
    }
  ]

  const StaffSelectStatus = [
    {
      "value": "ACTIVE",
      "label": "Active"
    },
    {
      "value": "INACTIVE",
      "label": "Inactive"
    }
  ]

  const pathName = useLocation().pathname
  const url = pathName && pathName.split('/')
  const clearPage = url && url[1]
  const currentId = url && url[2]
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    name: '',
    fatherName: '',
    gender: '',
    emailId: '',
    mobileNumber: '',
    alternativeNumber: '',
    maritalStatus: '',
    bloodGroup: '',
    currentAddress: '',
    permanentAddress: '',
    pg: '',
    ug: '',
    status: '',
    dateOfJoining: '',
    roleId: '',
    officialMailId: '',
    password: '',
    reportTo: '',
    emergencyContactName1: '',
    emergencyContact1: '',
    emergencyContactRelationship1: '',
    emergencyContactName2: '',
    emergencyContact2: '',
    emergencyContactRelationship2: '',
    dob: '',
    image: [],
    type: '',
    apartmentId: '',
    country: '',
    state: '',
    city: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    fatherName: '',
    gender: '',
    emailId: '',
    mobileNumber: '',
    alternativeNumber: '',
    maritalStatus: '',
    bloodGroup: '',
    currentAddress: '',
    permanentAddress: '',
    ug: '',
    status: '',
    dateOfJoining: '',
    roleId: '',
    officialMailId: '',
    password: '',
    reportTo: '',
    emergencyContact1: '',
    emergencyContact2: '',
    dob: '',
    apartmentId: '',
    country: '',
    state: '',
    city: '',
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
  const [ApartmentOption, setApartmentOption] = useState()
  const [SelectedApartmentOption, setSelectedApartmentOption] = useState('')
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
      status: "ACTIVE",
      type:"APARTMENT_ADMIN"
    }
    const paramsDropdown = {
      roleStatus: "ACTIVE",
      roleType:"ROLE_APARTMENTADMIN"
    }
    const paramsIsAssigned = {
        status: "ACTIVE",
        isAssigned: !currentId ? false : true,
      }
    getApartmentAdminListDispatch(params)
    getUserDropDownlistDispatch(paramsDropdown)
    getApartmentDispatch(paramsIsAssigned)
    getOpenCountrylistDispatch();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    // if (formdata.emergencyContact1 && !REGEX.PHONE_NUMBER.test(formdata.emergencyContact1)) {
    //   errors.emergencyContact1 = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER
    //   document.getElementById('emergencyContact1').focus()
    // }
    // if (formdata.emergencyContact2 && !REGEX.PHONE_NUMBER.test(formdata.emergencyContact2)) {
    //   errors.emergencyContact2 = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER
    //   document.getElementById('emergencyContact2').focus()
    // }
    if (_.isEmpty(formdata.apartmentId)) {
        errors.apartmentId = USER_MANAGEMENT_ERROR.USER_TYPE_REQUIRED
        document.getElementById('apartmentId').focus()
    }
    if (_.isEmpty(formdata.ug)) {
      errors.ug = USER_MANAGEMENT_ERROR.UG
      document.getElementById('ug').focus()
    }
    if (_.isEmpty(formdata.permanentAddress)) {
      errors.permanentAddress = USER_MANAGEMENT_ERROR.PERMANENT_ADDRESS
      document.getElementById('permanentAddress').focus()
    }
    if (_.isEmpty(formdata.currentAddress)) {
      errors.currentAddress = USER_MANAGEMENT_ERROR.CURRENT_ADDRESS
      document.getElementById('currentAddress').focus()
    }
    if (_.isEmpty(formdata.city)) {
        errors.city = USER_MANAGEMENT_ERROR.CITY_SELECT
        document.getElementById('city').focus()
      }
      if (_.isEmpty(formdata.state)) {
        errors.state = USER_MANAGEMENT_ERROR.STATE_SELECT
        document.getElementById('state').focus()
      }
      if (_.isEmpty(formdata.country)) {
        errors.country = USER_MANAGEMENT_ERROR.COUNTRY_SELECT
        document.getElementById('country').focus()
      }
    if (!formdata.bloodGroup) {
      errors.bloodGroup = USER_MANAGEMENT_ERROR.BLOOD_GROUP_SELECT
      document.getElementById('bloodGroup').focus()
    }
    if (_.isEmpty(formdata.maritalStatus)) {
      errors.maritalStatus = USER_MANAGEMENT_ERROR.MARTIAL_SELECT
      document.getElementById('maritalStatus').focus()
    }
    if (!formdata.dob) {
      errors.dob = USER_MANAGEMENT_ERROR.DOB
      document.getElementById('dob').focus()
    }
    if (_.isEmpty(formdata.reportTo)) {
      errors.reportTo = USER_MANAGEMENT_ERROR.REPORT_TO_SELECT
      document.getElementById('reportTo').focus()
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
    if (!editMode) {
      if (_.isEmpty(formdata.password)) {
        errors.password = USER_MANAGEMENT_ERROR.USER_PASSWORD
        document.getElementById('password').focus()
      } else if (!REGEX.PASSWORD.test(formdata.password)) {
        errors.password = USER_MANAGEMENT_VALIDATION.USER_PASSWORD_TYPE
        document.getElementById('password').focus()
      }
    }
    if (_.isEmpty(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_ERROR.PHONE_NUMBER
      document.getElementById('mobileNumber').focus()
    } else if (formdata.mobileNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('mobileNumber').focus()
    }
    if (_.isEmpty(formdata.officialMailId)) {
      errors.officialMailId = USER_MANAGEMENT_ERROR.USER_EMAIL
      document.getElementById('officialMailId').focus()
    } else if (!REGEX.EMAIL.test(formdata.officialMailId)) {
      errors.officialMailId = USER_MANAGEMENT_VALIDATION.USER_EMAIL
      document.getElementById('officialMailId').focus()
    }
    if (_.isEmpty(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_ERROR.USER_EMAIL
      document.getElementById('emailId').focus()
    } else if (!REGEX.EMAIL.test(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_VALIDATION.USER_EMAIL
      document.getElementById('emailId').focus()
    }
    if (_.isEmpty(formdata.roleId)) {
      errors.roleId = USER_MANAGEMENT_ERROR.ROLEID_SELECT
      document.getElementById('roleId').focus()
    }
    if (_.isEmpty(formdata.fatherName)) {
      errors.fatherName = USER_MANAGEMENT_ERROR.FATHER_NAME
      document.getElementById('fatherName').focus()
    }
    if (!formdata.dateOfJoining) {
      errors.dateOfJoining = USER_MANAGEMENT_ERROR.DATE_OF_JOIN
      document.getElementById('dateOfJoining').focus()
    }
    if (_.isEmpty(formdata.gender)) {
      errors.gender = USER_MANAGEMENT_ERROR.GENDER_SELECT
      document.getElementById('gender').focus()
    }
    if (_.isEmpty(formdata.status)) {
      errors.status = USER_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('status').focus()
    }
    if (_.isEmpty(formdata.name)) {
      errors.name = USER_MANAGEMENT_ERROR.USER_NAME
      document.getElementById('name').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
        formdata.dateOfJoining = dayjs(formdata.dateOfJoining).format('YYYY-MM-DD')
        formdata.type = 'APARTMENT_ADMIN'
        apartmentAdminAddDispatch(formdata)
        // console.log('formdata====>', formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
    formdata.dateOfJoining = dayjs(formdata.dateOfJoining).format('YYYY-MM-DD')
    formdata.type = 'APARTMENT_ADMIN'
    updateApartmentAdminDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      name: '',
      fatherName: '',
      gender: '',
      emailId: '',
      mobileNumber: '',
      alternativeNumber: '',
      maritalStatus: '',
      bloodGroup: '',
      currentAddress: '',
      permanentAddress: '',
      pg: '',
      ug: '',
      status: '',
      dateOfJoining: '',
      roleId: '',
      officialMailId: '',
      password: '',
      reportTo: '',
      emergencyContactName1: '',
      emergencyContact1: '',
      emergencyContactRelationship1: '',
      emergencyContactName2: '',
      emergencyContact2: '',
      emergencyContactRelationship2: '',
      dob: '',
      image: [],
      type: '',
      apartmentId: '',
      country: '',
      state: '',
      city: '',
    })
    setPassword('')
    setBloodGroup('')
    setGender('')
    setMaritalStatus('')
    setSelectStatus('')
    setSelectedRoleOption('')
    setDefaultImages([])
    setSelectedApartmentOption('')
    setParamCountry('')
    setSelectedCountryOption('')
    setSelectedStateOption('')
    setSelectedCityOption('')
  }

  useEffect(() => {
    return (() => {
      clearApartmentAdminIdDetails()
      clearApartmentAdminAddDispatch()
      clear()
    })
  }, [])

  const onConfirm = () => {
    clear()
    history.push('/apartmentadmin')
    clearApartmentAdminIdDetails()
    dropzoneImageAddClear()
  }

  const handlePasswordVisible = (e) => {
    e.preventDefault()
    setPassword(!password)
  }
  useEffect(() => {
    if (addApartmentAdmin && addApartmentAdmin.status === RESPONSE_STATUS.SUCCESS) {
      clearApartmentAdminAddDispatch()
      onConfirm()
      clear()
      Toastify({
        text: addApartmentAdmin && addApartmentAdmin.message,
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
    } else if (addApartmentAdmin && addApartmentAdmin.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: addApartmentAdmin && addApartmentAdmin.message,
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
      clearApartmentAdminAddDispatch()
    }
  }, [addApartmentAdmin])

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
      getApartmentAdminIdDetails(currentId)
      setEditMode(true)
    }
  }, [currentId])

  useEffect(() => {
    if (updateApartmentAdmin && updateApartmentAdmin.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: updateApartmentAdmin && updateApartmentAdmin.message,
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
      clearApartmentAdminUpdateDispatch()
      clear()
      clearApartmentAdminIdDetails()
      onConfirm()
    } else if (updateApartmentAdmin && updateApartmentAdmin.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: updateApartmentAdmin && updateApartmentAdmin.message,
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
      clearApartmentAdminUpdateDispatch()
    }
  }, [updateApartmentAdmin])

  const handleChangeIndidual = (selectedOption) => {
    if (selectedOption !== null) {
      setBloodGroup(selectedOption)
      setFormData(values => ({ ...values, bloodGroup: selectedOption.value }))
      setErrors({ ...errors, bloodGroup: "" });
    } else {
      setBloodGroup()
      setFormData((values) => ({ ...values, bloodGroup: "" }));
    }
  }

  const handleChangeGender = (selectedOption) => {
    if (selectedOption !== null) {
      setGender(selectedOption)
      setFormData(values => ({ ...values, gender: selectedOption.value }))
      setErrors({ ...errors, gender: "" });
    } else {
      setGender();
      setFormData((values) => ({ ...values, gender: "" }));
    }
  }

  const handleChangeRole = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedRoleOption(selectedOption)
      setFormData(values => ({ ...values, roleId: selectedOption.value }))
      setErrors({ ...errors, roleId: "" });
    } else {
      setSelectedRoleOption();
      setFormData((values) => ({ ...values, roleId: "" }));
    }
  }

  const handleChangeMartialStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setMaritalStatus(selectedOption)
      setFormData(values => ({ ...values, maritalStatus: selectedOption.value }))
      setErrors({ ...errors, maritalStatus: "" });
    } else {
      setMaritalStatus();
      setFormData((values) => ({ ...values, maritalStatus: "" }));
    }
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectStatus(selectedOption)
      setFormData(values => ({ ...values, status: selectedOption.value }))
      setErrors({ ...errors, status: "" });
    } else {
      setSelectStatus();
      setFormData((values) => ({ ...values, status: "" }));
    }
  }

  const handleChangeReportTo = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedReportOption(selectedOption)
      setFormData(values => ({ ...values, reportTo: selectedOption.value }))
      setErrors({ ...errors, reportTo: "" });
    } else {
      setSelectedReportOption();
      setFormData((values) => ({ ...values, reportTo: "" }));
    }
  }

  const handleChangeApartment = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedApartmentOption(selectedOption)
      setFormData(values => ({ ...values, apartmentId: selectedOption.value }))
      setErrors({ ...errors, apartmentId: "" });
    } else {
      setSelectedApartmentOption();
      setFormData((values) => ({ ...values, apartmentId: "" }));
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
      getOpenStatelistDispatch(params);
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
      getOpenCitylistDispatch(params)
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
    const data = getDropDown && getDropDown.data
    const Role = getDefaultOption(data)
    setRole(Role)
  }, [getDropDown])

  useEffect(() => {
    const data = getAllApartmentAdmin && getAllApartmentAdmin.data
    const report = getDefaultOptions(data)
    setRoleReportOption(report)
  }, [getAllApartmentAdmin])

  useEffect(() => {
    const data = getApartment && getApartment.data
    const Apartment = getDefaultOptionApartment(data)
    setApartmentOption(Apartment)
  }, [getApartment])

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


  const getDefaultOption = (getDropDown) => {
    const defaultOptions = []
    for (const item in getDropDown) {
      defaultOptions.push({ label: getDropDown[item].roleName, value: getDropDown[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptions = (report) => {
    const defaultOptions = []
    for (const item in report) {
      defaultOptions.push({ label: report[item].name, value: report[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionApartment = (getApartment) => {
    const defaultOptions = []
    for (const item in getApartment) {
      defaultOptions.push({ label: getApartment[item].apartmentName, value: getApartment[item].id })
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
    if (apartmentAdminIdDetails && apartmentAdminIdDetails.status === "ok") {
      const data = setApartmentAdminEditData(apartmentAdminIdDetails.data)
      setFormData(data)
      const imageData = apartmentAdminIdDetails && apartmentAdminIdDetails.data && apartmentAdminIdDetails.data.image
      setDefaultImages(imageData)
      const userDetils = apartmentAdminIdDetails && apartmentAdminIdDetails.data
      const roleId = userDetils.role
      if (roleId && roleId.id && getDropDown) {
        const datas = getDefaultOption(getDropDown && getDropDown.data)
        const selOption = datas.find((x) => x.value === roleId.id)
        if (selOption) {
          setSelectedRoleOption([selOption])
          setFormData((values) => ({ ...values, roleId: roleId.id }))
        }
      }
      const apartmentId = userDetils.apartment
      if (apartmentId && apartmentId.id && getApartment) {
        const datas = getDefaultOptionApartment(getApartment && getApartment.data)
        const selOption = datas.find((x) => x.value === apartmentId.id)
        if (selOption) {
          setSelectedApartmentOption([selOption])
          setFormData((values) => ({ ...values, apartmentId: apartmentId.id }))
        }
      }
      const gender = userDetils.gender
      if (gender) {
        const selOption = Gender.find((x) => x.value === gender)
        if (selOption) {
          setGender([selOption])
          setFormData((values) => ({ ...values, gender: gender }))
        }
      }
      const status = userDetils.status
      if (status) {
        const selOption = StaffSelectStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus([selOption])
          setFormData((values) => ({ ...values, status: status }))
        }
      }
      const Report = userDetils.reportTo.id
      if (Report) {
        const reports = getDefaultOptions(getAllApartmentAdmin && getAllApartmentAdmin.data)
        const selOption = reports.find((x) => x.value === Report)
        if (selOption) {
          setSelectedReportOption([selOption])
          setFormData((values) => ({ ...values, reportTo: selOption.value }))
        }
      }
      const maritalStatus = userDetils.maritalStatus
      if (maritalStatus) {
        const selOption = MaritalStatus.find((x) => x.value === maritalStatus)
        if (selOption) {
          setMaritalStatus([selOption])
          setFormData((values) => ({ ...values, maritalStatus: maritalStatus }))
        }
      }
      const bloodGroup = userDetils.bloodGroup
      if (bloodGroup) {
        const selOption = BloodGroup.find((x) => x.value === bloodGroup)
        if (selOption) {
          setBloodGroup([selOption])
          setFormData((values) => ({ ...values, bloodGroup: bloodGroup }))
        }
      }
      const countryData = userDetils.country
      if (countryData) {
        const datas = getDefaultOptionsCountry(OpenCountrylists && OpenCountrylists.data)
        const selOption = datas.find((x) => x.value === countryData)
        if (selOption) {
          setSelectedCountryOption([selOption])
          setFormData((values) => ({ ...values, country: countryData }))
        }
      }
    }
  }, [apartmentAdminIdDetails, editMode, getDropDown, getAllApartmentAdmin, getApartment, OpenCountrylists])

  useEffect(() => {
    if (editMode) {
      const apartmentAdminDetails = apartmentAdminIdDetails && apartmentAdminIdDetails.data
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
  }, [editMode, OpenStatelists, apartmentAdminIdDetails])

  useEffect(() => {
    if (editMode) {
      const apartmentAdminDetails = apartmentAdminIdDetails && apartmentAdminIdDetails.data
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
  }, [editMode, OpenCitylists, apartmentAdminIdDetails])

  useEffect(() => {
    if (apartmentAdminIdDetails && apartmentAdminIdDetails.status === "ok") {
      const countryParams = apartmentAdminIdDetails && apartmentAdminIdDetails.data && apartmentAdminIdDetails.data.country
      const stateParams = apartmentAdminIdDetails && apartmentAdminIdDetails.data && apartmentAdminIdDetails.data.state
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
  }, [apartmentAdminIdDetails])

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
                  Personal Information
                </label>
                <div className='col-lg-11 w-100'>
                  <label className="required form-label">Name</label>
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
                  <div className='mt-4'>
                    <label className="required form-label">Gender</label>
                    <ReactSelect
                      isMulti={false}
                      placeholder="Select Gender"
                      name='gender'
                      className='select2 gender'
                      classNamePrefix='select'
                      handleChangeReactSelect={handleChangeGender}
                      options={Gender}
                      value={gender}
                      id='gender'
                      isSearchable={false}
                    />
                  </div>
                  {errors.gender && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.gender}</span>
                    </div>
                  )}
                  <div>
                    <label className="required form-label mt-4">Father's Name</label>
                    <input
                      placeholder="Father's Name"
                      className='form-control form-control-lg ps-4 mt-1 placeHolder'
                      onChange={(e) => handleChange(e)}
                      value={formdata.fatherName || ''}
                      type='text'
                      name='fatherName'
                      id='fatherName'
                      autoComplete='off'
                      onKeyPress={(e) => {
                        const regex = REGEX.TEXT;
                        if (!regex.test(e.key) || formdata.fatherName.length >= 30) {
                          e.preventDefault();
                        }
                      }} />
                    {errors.fatherName && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert text-danger'>{errors.fatherName}</span>
                      </div>
                    )}
                  </div>
                  <label className="required form-label mt-4">Email</label>
                  <input
                    placeholder='Email'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
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
                  <label className="required mt-4 form-label">Date Of Birth</label>
                  <div className='col-md-12 mt-1'>
                    <DateSelector
                      className={editMode ? 'date-picker-edit' : 'date-picker'}
                      name='dob'
                      id='dob'
                      views={['year', 'month', 'day']}
                      selected={formdata.dob || ''}
                      onChange={(date) => {
                        setErrors({ ...errors, dob: '' })
                        setFormData((values) => ({
                          ...values,
                          dob: date && date.$d
                        }))
                      }}
                      sx={{ width: "100%" }}
                      format={DATE.DATE_ONLY}
                      minDate={startOfQ12022}
                      maxDate={endOfQ12022}
                    />
                  </div>
                  {errors.dob && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.dob}</span>
                    </div>
                  )}
                  <div className='mt-4'>
                    <label className="required form-label">Martial Status</label>
                    <ReactSelect
                      isMulti={false}
                      placeholder="Select Martial Status"
                      name='maritalStatus'
                      id='maritalStatus'
                      className='select2'
                      classNamePrefix='select'
                      handleChangeReactSelect={handleChangeMartialStatus}
                      options={MaritalStatus}
                      value={maritalStatus}
                      isSearchable={false}
                    />
                  </div>
                  {errors.maritalStatus && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.maritalStatus}</span>
                    </div>
                  )}
                  <div className='mt-4'>
                    <label className="required form-label">Blood Group</label>
                    <ReactSelect
                      isMulti={false}
                      placeholder='Select Blood Group'
                      name='bloodGroup'
                      id='bloodGroup'
                      className='select2'
                      classNamePrefix='select'
                      handleChangeReactSelect={handleChangeIndidual}
                      options={BloodGroup}
                      value={bloodGroup}
                    />
                  </div>
                  {errors.bloodGroup && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.bloodGroup}</span>
                    </div>
                  )}
                  <div className='mt-4'>
                    <label className="required form-label">Country</label>
                    <ReactSelect
                      isMulti={false}
                      placeholder="Select here"
                      name='country'
                      id='country'
                      className='select2'
                      classNamePrefix='select'
                      handleChangeReactSelect={handleChangeCountry}
                      options={countryOption}
                      value={SelectedCountryOption}
                      // isSearchable={false}
                    />
                  </div>
                  {errors.country && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.country}</span>
                    </div>
                  )}
                  <div className='mt-4'>
                    <label className="required form-label">City</label>
                    <ReactSelect
                      isMulti={false}
                      placeholder="Select here"
                      name='city'
                      id='city'
                      className='select2'
                      classNamePrefix='select'
                      handleChangeReactSelect={handleChangeCity}
                      options={CityOption}
                      value={SelectedCityOption}
                      isDisabled={!SelectedStateOption}
                      // isSearchable={false}
                    />
                  </div>
                  {errors.city && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.city}</span>
                    </div>
                  )}
                </div>
                <div className='col-lg-12 mb-3'>
                  <label className='staff-header mt-3 form-label'>
                    Education Information
                  </label>
                  <div className='mt-2'>
                    <label className='mb-1 mt-4 form-label required'>
                      Under Graduate
                    </label>
                    <input
                      placeholder='UG'
                      className='form-control form-control-lg ps-4 placeHolder'
                      onChange={(e) => handleChange(e)}
                      value={formdata.ug || ''}
                      type='text'
                      name='ug'
                      id='ug'
                      autoComplete='off'
                      onKeyPress={(e) => {
                        const regex = REGEX.EDUCATION;
                        if (!regex.test(e.key) || formdata.ug.length >= 30) {
                          e.preventDefault();
                        }
                      }} />
                  </div>
                  {errors.ug && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.ug}</span>
                    </div>
                  )}
                  <div className='mt-2'>
                    <label className='mb-1 mt-1 form-label'>
                      Post Graduate
                    </label>
                    <input
                      placeholder='PG'
                      className='form-control form-control-lg ps-4 mt-1 placeHolder'
                      onChange={(e) => handleChange(e)}
                      value={formdata.pg || ''}
                      type='text'
                      name='pg'
                      id='pg'
                      autoComplete='off'
                      onKeyPress={(e) => {
                        const regex = REGEX.EDUCATION;
                        if (!regex.test(e.key) || formdata.pg.length >= 30) {
                          e.preventDefault();
                        }
                      }} />
                  </div>
                </div>
              </div>
              <div className='col-lg-4 mb-3 mt-8'>
                <label className='staff-header mb-3 form-label required'>
                  Admin Status
                </label>
                <div className='col-lg-11'>
                  <ReactSelect
                    isMulti={false}
                    name='status'
                    id='status'
                    className='select2'
                    placeholder="Select Status"
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={StaffSelectStatus}
                    value={status}
                    isSearchable={false}
                  />

                  {errors.status && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.status}</span>
                    </div>
                  )}
                  <div className='col-lg-11 mt-6'>
                    <label className='staff-header mb-2 form-label'>
                      Job information
                    </label>
                  </div>
                  <div className='col-lg-12'>
                    <label className="required mt-4 form-label">Date Of Joining</label>
                    <div className='col-md-12 mt-1'>
                      <DateSelector
                        className={editMode ? 'date-picker-edit' : 'date-picker'}
                        name='dateOfJoining'
                        id='dateOfJoining'
                        views={['year', 'month', 'day']}
                        selected={formdata.dateOfJoining || ''}
                        onChange={(date) => {
                          setErrors({ ...errors, dateOfJoining: '' })
                          setFormData((values) => ({
                            ...values,
                            dateOfJoining: date && date.$d
                          }))
                        }}
                        sx={{ width: "100%" }}
                        format={DATE.DATE_ONLY}
                        minDate={startOfJoin}
                        maxDate={endOfJoin}
                      />
                    </div>
                    {errors.dateOfJoining && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert text-danger'>{errors.dateOfJoining}</span>
                      </div>
                    )}
                    <div className='mt-4'>
                      <label className="required form-label">Role</label>
                      <ReactSelect
                        isMulti={false}
                        placeholder='Select Role'
                        name='roleId'
                        id='roleId'
                        className='select2'
                        classNamePrefix='select'
                        handleChangeReactSelect={handleChangeRole}
                        options={RoleOption}
                        value={SelectedRoleOption}
                        isDisabled={!RoleOption}
                      />
                    </div>
                    {errors.roleId && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert text-danger'>{errors.roleId}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-lg-12 mt-4'>
                    <label className="required form-label">Official Email</label>
                    <input
                      className='form-control form-control-lg ps-4 placeHolder'
                      placeholder='Official Email-Id'
                      onChange={(e) => handleChange(e)}
                      type='email'
                      name='officialMailId'
                      id='officialMailId'
                      autoComplete='off'
                      value={formdata.officialMailId || ''}
                      onKeyPress={(e) => {
                        if (formdata.officialMailId.length >= 50) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.officialMailId && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert text-danger'>{errors.officialMailId}</span>
                      </div>
                    )}
                  </div>
                  {!editMode ?
                    <div className="fv-row mt-4">
                      <label className="required mt-1 form-label">Password</label>
                      <div className='mt-1 position-relative'>
                        <input
                          placeholder='Password'
                          className='form-control form-control-lg ps-4 password-validation placeHolder'
                          onChange={(e) => handleChange(e)}
                          type={password ? 'text' : 'password'}
                          name='password'
                          id='password'
                          autoComplete='off'
                        />
                        <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                          onClick={handlePasswordVisible}>
                          {password ? <i className="bi bi-eye fs-2"></i> : <i className="bi bi-eye-slash fs-2"></i>}
                        </span>
                      </div>
                      {/* <p className='text-muted fs-7'>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p> */}
                      {errors.password && (
                        <div className='fv-plugins-message-container text-danger mb-4'>
                          <span role='alert text-danger'>{errors.password}</span>
                        </div>
                      )}
                    </div>
                    : null}
                  <label className="required form-label mt-2">Reports To</label>
                  <ReactSelect
                    isMulti={false}
                    placeholder='Reports To'
                    name='reportTo'
                    id='reportTo'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeReportTo}
                    options={ReportOption}
                    value={SelectedReportOption}
                    isDisabled={!ReportOption}
                  />
                  {errors.reportTo && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.reportTo}</span>
                  </div>
                )}
                  <label className="required form-label mt-2">Apartment Name</label>
                  <ReactSelect
                    isMulti={false}
                    placeholder='Apartment Name'
                    name='apartmentId'
                    id='apartmentId'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeApartment}
                    options={ApartmentOption}
                    value={SelectedApartmentOption}
                    isDisabled={!ApartmentOption}
                  />
                  {errors.apartmentId && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.apartmentId}</span>
                  </div>
                )}
                  <label className='staff-header mt-3 form-label'>
                    Address
                  </label>
                  <div>
                    <label className=' mb-1 mt-1 form-label required'>
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
                  </div>
                  {errors.currentAddress && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.currentAddress}</span>
                    </div>
                  )}
                  <label className=' mb-1 mt-4 form-label required'>
                    Permanent Address
                  </label>
                  <textarea
                    placeholder='Permanent Address'
                    className='form-control form-control-lg ps-4 mt-1 placeHolder'
                    onChange={(e) => handleChange(e)}
                    value={formdata.permanentAddress || ''}
                    type='text'
                    name='permanentAddress'
                    id='permanentAddress'
                    autoComplete='off'
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
                <label className="required form-label mt-4">State</label>
                  <ReactSelect
                    isMulti={false}
                    placeholder="Select here"
                    name='state'
                    id='state'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeState}
                    options={stateOption}
                    value={SelectedStateOption}
                    isDisabled={!SelectedCountryOption}
                  />
                  {errors.state && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.state}</span>
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
                <div className='col-lg-12 mt-5 text-start'>
                  <label className='staff-header mt-3 mb-2 form-label'>
                    Emergency Contact - 01
                  </label>
                  <div>
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
                  <label className='staff-header mt-6 mb-2 form-label'>
                    Emergency Contact - 02
                  </label>
                  <div>
                    <label className="mt-4 form-label">Contact Name</label>
                    <input
                      name='emergencyContactName2'
                      id='emergencyContactName2'
                      type='text'
                      className='form-control form-control-lg ps-4 placeHolder'
                      placeholder='Name'
                      onChange={(e) => handleChange(e)}
                      autoComplete='off'
                      value={formdata.emergencyContactName2 || ''}
                      onKeyPress={(e) => {
                        const regex = REGEX.TEXT;
                        if (!regex.test(e.key) || formdata.emergencyContactName2.length >= 30) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <label className="mt-4 form-label">Relationship</label>
                  <input
                    name='emergencyContactRelationship2'
                    id='emergencyContactRelationship2'
                    type='text'
                    className='form-control form-control-lg ps-4 placeHolder'
                    placeholder='Relationship'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    value={formdata.emergencyContactRelationship2 || ''}
                    onKeyPress={(e) => {
                      const regex = REGEX.TEXT;
                      if (!regex.test(e.key) || formdata.emergencyContactRelationship2.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <label className="mt-4 form-label">Mobile Number</label>
                  <input
                    name='emergencyContact2'
                    id='emergencyContact2'
                    type='text'
                    className='form-control form-control-lg ps-4 placeHolder'
                    placeholder='Mobile Number'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    value={formdata.emergencyContact2 || ''}
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
                  {errors.emergencyContact2 && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.emergencyContact2}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='form-group row mb-4'>
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
  const { ApartmentAdminAddStore, editApartmentAdminStore, updateApartmentAdminStore, dropzoneStore, UserlistDropDownStore, ApartmentAdminlistStore, getApartmentlistStore, OpenCountrylistStore,
    OpenStatelistStore, OpenCitylistStore } = state
  return {
    getDropDown: UserlistDropDownStore && UserlistDropDownStore.getDropDown ? UserlistDropDownStore.getDropDown : '',
    getAllApartmentAdmin: ApartmentAdminlistStore && ApartmentAdminlistStore.getAllapartmentAdmins ? ApartmentAdminlistStore.getAllapartmentAdmins : '',
    getApartment: getApartmentlistStore && getApartmentlistStore.getAllApartment ? getApartmentlistStore.getAllApartment : '',
    OpenCountrylists: OpenCountrylistStore && OpenCountrylistStore.OpenCountrylists ? OpenCountrylistStore.OpenCountrylists : "",
    OpenStatelists: OpenStatelistStore && OpenStatelistStore.OpenStatelists ? OpenStatelistStore.OpenStatelists : "",
    OpenCitylists: OpenCitylistStore && OpenCitylistStore.OpenCitylists ? OpenCitylistStore.OpenCitylists : "",
    addApartmentAdmin: ApartmentAdminAddStore && ApartmentAdminAddStore.addApartmentAdmin ? ApartmentAdminAddStore.addApartmentAdmin : '',
    apartmentAdminIdDetails: editApartmentAdminStore && editApartmentAdminStore.ApartmentAdminIdDetail ? editApartmentAdminStore.ApartmentAdminIdDetail : '',
    updateApartmentAdmin: updateApartmentAdminStore && updateApartmentAdminStore.updateApartmentAdminResponce ? updateApartmentAdminStore.updateApartmentAdminResponce : '',
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage && dropzoneStore.dropzoneImage.status ? dropzoneStore.dropzoneImage.status : "",
  }
}

const mapDispatchToProps = dispatch => ({
  getApartmentAdminListDispatch: (data) =>
    dispatch(ApartmentAdminActions.getApartmentAdminlist(data)),
  apartmentAdminAddDispatch: (data) =>
    dispatch(ApartmentAdminAddAction.apartmentAdminAdd(data)),
  clearApartmentAdminAddDispatch: () =>
    dispatch(ApartmentAdminAddAction.clearApartmentAdmin()),
  getApartmentAdminIdDetails: (id) =>
    dispatch(ApartmentAdminGetIdActions.getApartmentAdminIdDetails(id)),
  clearApartmentAdminIdDetails: () =>
    dispatch(ApartmentAdminGetIdActions.clearApartmentAdminIdDetails()),
  updateApartmentAdminDispatch: (id, params) =>
    dispatch(updateApartmentAdminActions.updateApartmentAdmin(id, params)),
  clearApartmentAdminUpdateDispatch: () =>
    dispatch(updateApartmentAdminActions.clearupdateApartmentAdmin()),
  getUserDropDownlistDispatch: (data) =>
    dispatch(UserDropDownGetActions.getUserDropDownIdDetails(data)),
  dropzoneImageAddClear: () =>
    dispatch(UploadActions.uploadImageClear()),
  getApartmentDispatch: (data) =>
    dispatch(getApartmentListActions.get(data)),
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