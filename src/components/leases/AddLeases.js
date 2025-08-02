import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import _ from 'lodash'
import { LeaseActions, LeasesListAddAction, LeasesListGetIdActions, updateLeasesListActions, PropertyGetIdActions } from '../../store/actions'
import { REGEX, DATE } from '../../utils/constants'
import {
  RESPONSE_STATUS,
  LEASE_MANAGEMENT_ERROR
} from '../../utils/constants'
import { Link, useLocation, useHistory } from 'react-router-dom'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { setLeaseEditData } from './EditFormdata'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { DateSelector } from '../../theme/layout/components/DateSelector'
import dayjs, { Dayjs } from 'dayjs';

function LeasesAdd(props) {
  const {
    getLeaselistDispatch,
    leaseAddDispatch,
    clearLeaseAddCRMDispatch,
    LeasesListAdd,
    LeaseEditDispatch,
    clearLeaseIdDetails,
    LeasesListIdDetail,
    updateLeaseDispatch,
    saveupdateLeasesListResponse,
    clearLeaseUpdateDispatch,
    getAllLease,
    setPropDoclist,
    propertyId,
    setActiveTab,
    setLeaseId,
    leaseId,
    clearPropertyIdDetails
  } = props

  const LeaseStatus = [
    {
      "value": "ACTIVE",
      "label": "Active"
    },
    {
      "value": "EXPIRED",
      "label": "Expired"
    },
    {
      "value": "RENEWAL",
      "label": "Renewal"
    },
    {
      "value": "EXPIRE_SOON",
      "label": "Expire Soon"
    },
    {
      "value": "TERMINATED",
      "label": "Terminated"
    },
  ]

  const LeaseTerms = [
    {
      "value": "ONE_YEAR",
      "label": "1 Year"
    },
    {
      "value": "TWO_YEAR",
      "label": "2 Year"
    },
    {
      "value": "THREE_YEAR",
      "label": "3 Year"
    },
    {
      "value": "FOUR_YEAR",
      "label": "4 Year"
    },
    {
      "value": "FIVE_YEAR",
      "label": "5 Year"
    }
  ]

  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    amount: '',
    endDate: '',
    lateFeeInfo: '',
    leaseStatus: '',
    leaseTerm: '',
    leaseType: '',
    lessorName: '',
    mainResponsibilities: '',
    moveInDate: '',
    propertyId: '',
    securityDepositAmount: '',
    startDate: ''
  })
  const [errors, setErrors] = useState({
    amount: '',
    endDate: '',
    lateFeeInfo: '',
    leaseStatus: '',
    leaseTerm: '',
    leaseType: '',
    lessorName: '',
    mainResponsibilities: '',
    moveInDate: '',
    securityDepositAmount: '',
    startDate: ''
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [leaseTypeOption, setLeaseTypeOption] = useState()
  const [SelectedLeaseTypeOption, setSelectedLeaseTypeOption] = useState('')
  const [leaseTerms, setLeaseTerms] = useState('')
  const [status, setSelectStatus] = useState('')
  const [isCountinue, setIsCountinue] = useState(false)
  const [dateSelect, setDateSelect] = useState(false)
  const [maxEndDate, setMaxEndDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [leaseTermValue, setLeaseTermValue] = useState('')
  const [dateSelectEnd, setDateSelectEnd] = useState(false)

  useEffect(() => {
    const params = {
      status: "ACTIVE"
    }
    getLeaselistDispatch(params)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(propertyId)) {
      setFormData((formData) => ({
        ...formData,
        propertyId: propertyId,
        country: "6544f362f44dad6e940a50d1",
        state: "6544f6e3f44dad6e940a50d3",
        district: "6545e21bf44dad6e940a5101"
      }))
    }
  }, [propertyId])

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e, name) => {
    const errors = {}
    if (_.isEmpty(formdata.lateFeeInfo)) {
      errors.lateFeeInfo = LEASE_MANAGEMENT_ERROR.AMOUNT
      document.getElementById('lateFeeInfo').focus()
    }
    if (_.isEmpty(formdata.mainResponsibilities)) {
      errors.mainResponsibilities = LEASE_MANAGEMENT_ERROR.MAINTENANCE
      document.getElementById('mainResponsibilities').focus()
    }
    if (_.isEmpty(formdata.leaseStatus)) {
      errors.leaseStatus = LEASE_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('leaseStatus').focus()
    }
    if (_.isEmpty(formdata.securityDepositAmount)) {
      errors.securityDepositAmount = LEASE_MANAGEMENT_ERROR.AMOUNT
      document.getElementById('securityDepositAmount').focus()
    }
    if (!formdata.moveInDate) {
      errors.moveInDate = LEASE_MANAGEMENT_ERROR.DATE_ERROR
      document.getElementById('moveInDate').focus()
    }
    if (!formdata.endDate) {
      errors.endDate = LEASE_MANAGEMENT_ERROR.DATE_ERROR
      document.getElementById('endDate').focus()
    }
    if (!formdata.startDate) {
      errors.startDate = LEASE_MANAGEMENT_ERROR.DATE_ERROR
      document.getElementById('startDate').focus()
    }
    if (_.isEmpty(formdata.amount)) {
      errors.amount = LEASE_MANAGEMENT_ERROR.AMOUNT
      document.getElementById('amount').focus()
    }
    if (_.isEmpty(formdata.leaseTerm)) {
      errors.leaseTerm = LEASE_MANAGEMENT_ERROR.LEASETERM
      document.getElementById('leaseTerm').focus()
    }
    if (_.isEmpty(formdata.leaseType)) {
      errors.leaseType = LEASE_MANAGEMENT_ERROR.LEASETYPE
      document.getElementById('leaseType').focus()
    }
    if (_.isEmpty(formdata.lessorName)) {
      errors.lessorName = LEASE_MANAGEMENT_ERROR.LESSOR_NAME
      document.getElementById('lessorName').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        formdata.startDate = dayjs(formdata.startDate).format('YYYY-MM-DD')
        formdata.endDate = dayjs(formdata.endDate).format('YYYY-MM-DD')
        formdata.moveInDate = dayjs(formdata.moveInDate).format('YYYY-MM-DD')
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
    formdata.startDate = dayjs(formdata.startDate).format('YYYY-MM-DD')
    formdata.endDate = dayjs(formdata.endDate).format('YYYY-MM-DD')
    formdata.moveInDate = dayjs(formdata.moveInDate).format('YYYY-MM-DD')
    const id = leaseId
    updateLeaseDispatch(id, formdata)
  }

  const clear = () => {
    setFormData({
      amount: '',
      endDate: '',
      lateFeeInfo: '',
      lessorName: '',
      mainResponsibilities: '',
      moveInDate: '',
      securityDepositAmount: '',
      startDate: ''
    })
    setSelectedLeaseTypeOption('')
    setLeaseTerms('')
    setSelectStatus('')
    setLeaseTermValue('')
    setDateSelect(false)
    setMaxEndDate('')
    setToDate('')
    setDateSelectEnd(false)
  }

  const onConfirm = (e, name) => {
    if (!_.isEmpty(name)) {
      setActiveTab('Property Documents')
    }
  }

  const onConfirmLeaseList = () => {
    clear()
    history.push('/leases')
    clearLeaseIdDetails()
    clearPropertyIdDetails()
  }

  useEffect(() => {
    if (LeasesListAdd && LeasesListAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearLeaseAddCRMDispatch()
      Toastify({
        text: LeasesListAdd && LeasesListAdd.message,
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
        setActiveTab('Tenant details')
        setLeaseId(LeasesListAdd && LeasesListAdd.data)
        setPropDoclist(true)
      } else {
        onConfirmLeaseList()
      }
    } else if (LeasesListAdd && LeasesListAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: LeasesListAdd && LeasesListAdd.message,
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
      clearLeaseAddCRMDispatch()
    }
  }, [LeasesListAdd])

  useEffect(() => {
    if (!_.isEmpty(leaseId)) {
      setEditMode(true)
    }
  }, [leaseId])

  useEffect(() => {
    if (LeasesListIdDetail && LeasesListIdDetail.status === 'ok') {
      const userData = LeasesListIdDetail && LeasesListIdDetail.data
      const setData = setLeaseEditData(userData)
      setFormData(setData)
    }
  }, [LeasesListIdDetail])

  useEffect(() => {
    if (saveupdateLeasesListResponse && saveupdateLeasesListResponse.status === RESPONSE_STATUS.SUCCESS) {
      Toastify({
        text: saveupdateLeasesListResponse && saveupdateLeasesListResponse.message,
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
      // clearLeaseIdDetails()
      if (isCountinue) {
        setActiveTab('Tenant details')
        // setLeaseId(leaseId)
        setPropDoclist(true)
      } else {
        onConfirmLeaseList()
      }
    } else if (saveupdateLeasesListResponse && saveupdateLeasesListResponse.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: saveupdateLeasesListResponse && saveupdateLeasesListResponse.message,
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
  }, [saveupdateLeasesListResponse])

  const handleChangeLeaseType = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLeaseTypeOption(selectedOption)
      setFormData(values => ({ ...values, leaseType: selectedOption.value }))
      setErrors({ ...errors, leaseType: "" });
    } else {
      setSelectedLeaseTypeOption();
      setFormData((values) => ({ ...values, leaseType: "" }));
    }
  }

  const handleChangeSelectTerms = (selectedOption) => {
    if (selectedOption !== null) {
      setLeaseTerms(selectedOption)
      setLeaseTermValue(selectedOption.value)
      setFormData(values => ({ ...values, leaseTerm: selectedOption.value, startDate: '', endDate: '', moveInDate: '' }))
      setErrors({ ...errors, leaseTerm: "" });
      setDateSelect(true)
    } else {
      setLeaseTerms();
      setFormData((values) => ({ ...values, leaseTerm: "" }));
    }
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectStatus(selectedOption)
      setFormData(values => ({ ...values, leaseStatus: selectedOption.value }))
      setErrors({ ...errors, leaseStatus: "" });
    } else {
      setSelectStatus();
      setFormData((values) => ({ ...values, leaseStatus: "" }));
    }
  }

  useEffect(() => {
    const data = getAllLease && getAllLease.data
    const leaseType = getDefaultOptions(data)
    setLeaseTypeOption(leaseType)
  }, [getAllLease])

  const getDefaultOptions = (leaseType) => {
    const defaultOptions = []
    for (const item in leaseType) {
      defaultOptions.push({ label: leaseType[item].leaseType, value: leaseType[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    if (LeasesListIdDetail && LeasesListIdDetail.status === "ok") {
      const data = setLeaseEditData(LeasesListIdDetail.data)
      setFormData(data)
      const userDetils = LeasesListIdDetail && LeasesListIdDetail.data && LeasesListIdDetail.data
      const leaseType = userDetils.leaseType
      if (leaseType && leaseType.id) {
        const datas = getDefaultOptions(getAllLease && getAllLease.data)
        const selOption = datas.find((x) => x.value === leaseType.id)
        if (selOption) {
          setSelectedLeaseTypeOption([selOption])
          setFormData((values) => ({ ...values, leaseType: leaseType.id }))
        }
      }
      const leaseTerms = userDetils.leaseTerm
      if (leaseTerms) {
        const selOption = LeaseTerms.find((x) => x.value === leaseTerms)
        if (selOption) {
          setLeaseTerms(selOption)
          setFormData((values) => ({ ...values, leaseTerm: leaseTerms }))
        }
      }
      const status = userDetils.leaseStatus
      if (status) {
        const selOption = LeaseStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, leaseStatus: status }))
        }
      }
    }
  }, [LeasesListIdDetail, editMode])

  useEffect(() => {
    let endDate;
    switch (leaseTermValue) {
      case 'ONE_YEAR':
        endDate = dayjs(toDate).add(1, 'year')
        setFormData((values) => ({
          ...values,
          endDate: endDate
        }))
        setMaxEndDate(endDate)
        break;
      case 'TWO_YEAR':
        endDate = dayjs(toDate).add(2, 'year')
        setFormData((values) => ({
          ...values,
          endDate: endDate
        }))
        setMaxEndDate(endDate)
        break;
      case 'THREE_YEAR':
        endDate = dayjs(toDate).add(3, 'year')
        setFormData((values) => ({
          ...values,
          endDate: endDate
        }))
        setMaxEndDate(endDate)
        break;
      case 'FOUR_YEAR':
        endDate = dayjs(toDate).add(4, 'year')
        setFormData((values) => ({
          ...values,
          endDate: endDate
        }))
        setMaxEndDate(endDate)
        break;
      case 'FIVE_YEAR':
        endDate = dayjs(toDate).add(5, 'year')
        setFormData((values) => ({
          ...values,
          endDate: endDate
        }))
        setMaxEndDate(endDate)
        break;
    }
  }, [toDate])

  return (
    <>
      <div className='form-group row '>
        <div className='col-md-4 mt-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Lessor Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Lessor Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.lessorName || ''}
              type='text'
              name='lessorName'
              id='lessorName'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.ALPHA_NUMERIC;
                if (!regex.test(e.key) || formdata.lessorName.length >= 30) {
                  e.preventDefault();
                }
              }} />
            {errors.lessorName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.lessorName}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Lease Type
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Lease Type"
              isMulti={false}
              name='leaseType'
              id='leaseType'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeLeaseType}
              options={leaseTypeOption}
              value={SelectedLeaseTypeOption}
            // isDisabled={!leaseTypeOption}
            />
            {errors && errors.leaseType && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.leaseType}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Lease Term
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Lease Term"
              isMulti={false}
              name='leaseTerm'
              id='leaseTerm'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeSelectTerms}
              options={LeaseTerms}
              value={leaseTerms}
              isSearchable={false}
            />
            {errors && errors.leaseTerm && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.leaseTerm}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Amount
          </label>
          <div className='w-100'>
            <input
              placeholder='&#8377; 0'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.amount || ''}
              type='text'
              name='amount'
              id='amount'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.NUMERIC_EIGHT_DIGITS;
                if (!regex.test(e.key) || formdata.amount.length >= 8) {
                  e.preventDefault();
                }
              }}
            />
            {errors.amount && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.amount}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-5 datapicker position-relative pr-10'>
          <label className="required form-label">Lease Start Date</label>
          <DateSelector
            className={editMode ? 'date-picker-edit' : 'date-picker'}
            name='startDate'
            id='startDate'
            views={['year', 'month', 'day']}
            selected={formdata.startDate || ''}
            onChange={(date) => {
              setDateSelectEnd(true)
              setToDate(date && date.$d)
              setErrors({ ...errors, startDate: '' })
              setFormData((values) => ({
                ...values,
                startDate: date && date.$d
              }))
            }}
            sx={{ width: "100%" }}
            format={DATE.DATE_ONLY}
            disabled={!dateSelect}
            minDate={dayjs(new Date())}

          />
          {errors.startDate && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.startDate}</span>
            </div>
          )}
        </div>
        <div className='col-md-4 mt-5 datapicker position-relative pr-10'>
          <label className="required form-label">Lease End Date</label>
          <DateSelector
            className={editMode ? 'date-picker-edit' : 'date-picker'}
            name='endDate'
            id='endDate'
            views={['year', 'month', 'day']}
            selected={formdata.endDate || ''}
            onChange={(date) => {
              setErrors({ ...errors, endDate: '' })
              setFormData((values) => ({
                ...values,
                endDate: date && date.$d
              }))
            }}
            sx={{ width: "100%" }}
            format={DATE.DATE_ONLY}
            disabled={!dateSelectEnd}
            minDate={dayjs(formdata.startDate)}
            maxDate={maxEndDate}
          />
          {errors.endDate && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.endDate}</span>
            </div>
          )}
        </div>
        <div className='col-md-4 mt-5 datapicker position-relative pr-10'>
          <label className="required form-label">Move in Date</label>
          <DateSelector
            className={editMode ? 'date-picker-edit' : 'date-picker'}
            name='moveInDate'
            id='moveInDate'
            views={['year', 'month', 'day']}
            selected={formdata.moveInDate || ''}
            onChange={(date) => {
              setErrors({ ...errors, moveInDate: '' })
              setFormData((values) => ({
                ...values,
                moveInDate: date && date.$d
              }))
            }}
            sx={{ width: "100%" }}
            format={DATE.DATE_ONLY}
            disabled={!dateSelectEnd}
            minDate={dayjs(formdata.startDate)}
            maxDate={maxEndDate}
          />
          {errors.moveInDate && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.moveInDate}</span>
            </div>
          )}
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Security Deposit Amount
          </label>
          <div className='w-100'>
            <input
              placeholder='&#8377; 0'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.securityDepositAmount || ''}
              type='text'
              name='securityDepositAmount'
              id='securityDepositAmount'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.NUMERIC_EIGHT_DIGITS;
                if (!regex.test(e.key) || formdata.securityDepositAmount.length >= 8) {
                  e.preventDefault();
                }
              }} />
            {errors.securityDepositAmount && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.securityDepositAmount}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Status
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Status"
              isMulti={false}
              name='leaseStatus'
              id='leaseStatus'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeSelectStatus}
              options={LeaseStatus}
              value={status}
              isSearchable={false}
            />
            {errors && errors.leaseStatus && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.leaseStatus}
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Maintenance Responsibilities
          </label>
          <div className='w-100'>
            <input
              placeholder='Maintenance Responsibilities '
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.mainResponsibilities || ''}
              type='text'
              name='mainResponsibilities'
              id='mainResponsibilities'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.ALPHA_NUMERIC_CHARS;
                if (!regex.test(e.key) || formdata.mainResponsibilities.length >= 10) {
                  e.preventDefault();
                }
              }} />
            {errors.mainResponsibilities && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.mainResponsibilities}</span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4 mt-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label required'>
            Late Fee Information
          </label>
          <div className='w-100'>
            <input
              placeholder='&#8377; 0'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.lateFeeInfo || ''}
              type='text'
              name='lateFeeInfo'
              id='lateFeeInfo'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.NUMERIC_EIGHT_DIGITS;
                if (!regex.test(e.key) || formdata.lateFeeInfo.length >= 8) {
                  e.preventDefault();
                }
              }} />
            {errors.lateFeeInfo && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.lateFeeInfo}</span>
              </div>
            )}
          </div>
        </div>
        <div className='form-group row mb-4'>
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
    </>
  )
}

const mapStateToProps = (state) => {
  const { LeasesListAddStore, editLeasesListStore, updateLeasesListStore, LeaselistStore } = state
  return {
    LeasesListAdd: LeasesListAddStore && LeasesListAddStore.LeasesListAdd ? LeasesListAddStore.LeasesListAdd : '',
    LeasesListIdDetail: editLeasesListStore && editLeasesListStore.LeasesListIdDetail ? editLeasesListStore.LeasesListIdDetail : '',
    saveupdateLeasesListResponse: updateLeasesListStore && updateLeasesListStore.saveupdateLeasesListResponse ? updateLeasesListStore.saveupdateLeasesListResponse : '',
    getAllLease: LeaselistStore && LeaselistStore.getAllLease ? LeaselistStore.getAllLease : '',
  }
}

const mapDispatchToProps = dispatch => ({
  getLeaselistDispatch: (data) =>
    dispatch(LeaseActions.getleaselist(data)),
  leaseAddDispatch: (data) =>
    dispatch(LeasesListAddAction.LeasesListAdd(data)),
  clearLeaseAddCRMDispatch: () =>
    dispatch(LeasesListAddAction.clearLeasesList()),
  LeaseEditDispatch: (id) =>
    dispatch(LeasesListGetIdActions.getLeasesListIdDetails(id)),
  clearLeaseIdDetails: () =>
    dispatch(LeasesListGetIdActions.clearLeasesListIdDetails()),
  updateLeaseDispatch: (id, params) =>
    dispatch(updateLeasesListActions.updateLeasesList(id, params)),
  clearLeaseUpdateDispatch: () =>
    dispatch(updateLeasesListActions.clearupdateLeasesList()),
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeasesAdd)