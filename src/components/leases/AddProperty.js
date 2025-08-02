import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { toAbsoluteUrl } from '../../theme/helpers'
import _ from 'lodash'
import { LandlordsActions, PropertyActions, PropertyGetIdActions, LeasesListGetIdActions } from '../../store/actions'
import { IMAGE, PROPERTY_MANAGEMENT_ERROR } from '../../utils/constants'
import { Link, useLocation, useHistory } from 'react-router-dom'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { setPropertyEditData, setLeasePropertyEditData } from './EditFormdata'
import dayjs from 'dayjs'


function PropertyAdd(props) {
  const {
    getLandlordlistDispatch,
    getPropertylistDispatch,
    PropertyEditDispatch,
    clearPropertyIdDetails,
    LeaseEditDispatch,
    LeasesListIdDetail,
    getAllLandlords,
    Propertylists,
    PropertyIdDetail,
    setActiveTab,
    setPropertyId,
    leaseId,
    setLeaseId,
    setPropDoclist,
    clearlandlordslistDispatch,
    clearLeaseEditDispatch
  } = props

  const pathName = useLocation().pathname
  const history = useHistory()
  const url = pathName && pathName.split('/')
  const currentId = url && url[2]
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    landLordId: '',
    propertyId: '',
    propertyOwnerName: '',
    surveyNo: '',
    propertyTypeId: '',
    propertySizeOrSquareFootage: '',
    buildingNoOrStreetName: '',
    countryId: '',
    stateId: '',
    cityId: '',
    address: '',
    propertyStatus: '',
    // location: 'test',
    propertyImages: '',
  })
  const [errors, setErrors] = useState({
    landLordId: '',
    propertyId: '',
  })
  const [selectedOptions, setSelectedOptions] = useState()
  const [landlordOption, setLandlordOption] = useState()
  const [SelectedLandlordOption, setSelectedLandlordOption] = useState('')
  const [propertyOption, setPropertyOption] = useState()
  const [SelectedPropertyOption, setSelectedPropertyOption] = useState('')
  const [lanlordEditId, setLandlordEditId] = useState('')
  const [isCountinue, setIsCountinue] = useState(false)

  useEffect(() => {
    const params = {
      status:"ACTIVE"
    }
    getLandlordlistDispatch(params)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e, name) => {
    const errors = {}
    if (_.isEmpty(formdata.propertyId)) {
      errors.propertyId = PROPERTY_MANAGEMENT_ERROR.PROPERTY_SELECT_NAME
      document.getElementById('propertyId').focus()
    }
    if (_.isEmpty(formdata.landLordId)) {
      errors.landLordId = PROPERTY_MANAGEMENT_ERROR.LANDLORD_NAME
      document.getElementById('landLordId').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (!_.isEmpty(name)) {
        setPropDoclist(true)
        setActiveTab('Property Documents')
        setPropertyId(formdata.propertyId)
      }
    }
  }

  const clear = () => {
    setFormData({
      propertyOwnerName: '',
      surveyNo: '',
      propertyTypeId: '',
      propertySizeOrSquareFootage: '',
      buildingNoOrStreetName: '',
      countryId: '',
      stateId: '',
      cityId: '',
      address: '',
      propertyStatus: '',
    })
    setSelectedLandlordOption('')
    setSelectedPropertyOption('')
    clearlandlordslistDispatch()
    clearLeaseEditDispatch()
  }

  const onConfirm = () => {
    clear()
    clearPropertyIdDetails()
    // setPropertyId('')
    setLandlordEditId('')
    history.push('/leases')
  }

  useEffect(() => {
    if (leaseId === currentId) {
      LeaseEditDispatch(leaseId)
      setEditMode(true)
    }
  }, [leaseId])

  useEffect(() => {
    if (LeasesListIdDetail && LeasesListIdDetail.status === 'ok') {
      const userData = LeasesListIdDetail && LeasesListIdDetail.data
      const setData = setLeasePropertyEditData(userData)
      setFormData(setData)
      const userDetils = LeasesListIdDetail && LeasesListIdDetail.data
      const landLordId = userDetils && userDetils?.propertyId && userDetils?.propertyId?.landLord && userDetils?.propertyId?.landLord?.id
      const params = {
        landLord: landLordId
      }
      getPropertylistDispatch(params)
      if (landLordId && !_.isEmpty(landlordOption)) {
        const landLordIdOption = landlordOption.find((x) => x.value === landLordId)
        setLandlordEditId(landLordId)
        if (landLordIdOption) {
          setSelectedLandlordOption(landLordIdOption)
          setFormData((values) => ({ ...values, landLordId: landLordId }))
        }
      }
    }
  }, [LeasesListIdDetail])

  useEffect(() => {
    if (editMode) {
      if (Propertylists && Propertylists.status === "ok") {
        const userDetils = LeasesListIdDetail && LeasesListIdDetail.data
        const productId = userDetils && userDetils?.propertyId && userDetils?.propertyId?.id
        setPropertyId(productId ? productId : '')
        if (!_.isEmpty(propertyOption)) {
          const productIdOption = propertyOption.find((x) => x.value === productId)
          if (productIdOption) {
            setSelectedPropertyOption(productIdOption)
            setFormData((values) => ({ ...values, propertyId: productId }))
          }
        }
      }
    }
  }, [propertyOption, editMode])

  const handleChangeLanlord = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLandlordOption(selectedOption)
      setFormData(values => ({
        ...values,
        landLordId: selectedOption.value,
        propertyOwnerName: '',
        surveyNo: '',
        propertyTypeId: '',
        propertySizeOrSquareFootage: '',
        buildingNoOrStreetName: '',
        countryId: '',
        stateId: '',
        cityId: '',
        address: '',
        propertyStatus: ''
      }))
      setSelectedPropertyOption('')
      const params = {
        landLord: selectedOption.value,
        propertyStatus:"VACANT"
      }
      getPropertylistDispatch(params)
      setErrors({ ...errors, landLordId: "" });
    } else {
      setSelectedLandlordOption();
      setFormData((values) => ({ ...values, landLordId: "" }));
    }
  }
  const handleChangeProperty = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedPropertyOption(selectedOption)
      setFormData({ ...formdata, propertyId: selectedOption.value })
      const id = selectedOption && selectedOption.value
      PropertyEditDispatch(id)
      setErrors({ ...errors, propertyId: "" });
    } else {
      setSelectedPropertyOption();
      setFormData((values) => ({ ...values, propertyId: "" }));
    }
  }

  useEffect(() => {
    const data = getAllLandlords && getAllLandlords.data
    if (!_.isEmpty(data)) {
      const landLord = getDefaultOptions(data)
      setLandlordOption(landLord)
    }
  }, [getAllLandlords])

  useEffect(() => {
    const data = Propertylists && Propertylists.data
    const Property = getDefaultOptionsProperty(data)
    setPropertyOption(Property)
  }, [Propertylists])

  const getDefaultOptions = (landLord) => {
    const defaultOptions = []
    for (const item in landLord) {
      defaultOptions.push({ label: landLord[item].firstName, value: landLord[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsProperty = (Property) => {
    const defaultOptions = []
    for (const item in Property) {
      defaultOptions.push({ label: `${Property[item].propertyId} ${Property[item].propertyName}`, value: Property[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    if (PropertyIdDetail && PropertyIdDetail.status === "ok") {
      const data = setPropertyEditData(PropertyIdDetail.data)
      setFormData(data)
      // setPropertyId(PropertyIdDetail.data.id ? PropertyIdDetail.data.id : '')
    }
  }, [PropertyIdDetail])

  return (
    <>
      <div className='form-group row'>
        <div className='col-md-4 mb-4 pr-10'>
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Landlord
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Landlord"
              isMulti={false}
              name='landLordId'
              id='landLordId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeLanlord}
              options={landlordOption}
              value={SelectedLandlordOption}
              isDisabled={editMode ? true : false}
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
          <label className="font-size-xs font-weight-bold mb-3 form-label required">
            Property Id & Name
          </label>
          <div className='w-100'>
            <ReactSelect
              placeholder="Select Property Name"
              isMulti={false}
              name='propertyId'
              id='propertyId'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeProperty}
              options={propertyOption}
              value={SelectedPropertyOption}
              isDisabled={!SelectedLandlordOption || editMode ? true : false}
            />
            {errors && errors.propertyId && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.propertyId}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Property Owner Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Property Owner Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.propertyOwnerName || ''}
              type='text'
              name='propertyOwnerName'
              disabled
            />
          </div>
        </div>

        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Survey No
          </label>
          <div className='w-100'>
            <input
              placeholder='Survey No'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.surveyNo || ''}
              type='text'
              name='surveyNo'
              disabled
            />
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Property Type
          </label>
          <div className='w-100'>
            <input
              placeholder='Property Type'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.propertyTypeId || ''}
              type='text'
              name='propertyTypeId'
              disabled
            />
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Property Size or Square Footage
          </label>
          <div className='w-100'>
           <div className="position-relative mb-3">
            <input
              placeholder='Property Size or Square Footage'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.propertySizeOrSquareFootage || ''}
              type='text'
              name='propertySizeOrSquareFootage'
              disabled
            />
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                data-kt-password-meter-control="visibility">
                Sq.ft
              </span>
           </div>
          </div>
        </div>

        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Building No/ Street Name
          </label>
          <div className='w-100'>
            <input
              placeholder='Building No/ Street Name'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.buildingNoOrStreetName || ''}
              type='text'
              name='buildingNoOrStreetName'
              disabled
            />
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Country
          </label>
          <div className='w-100'>
            <input
              placeholder='Country'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.countryId || ''}
              type='text'
              name='countryId'
              disabled
            />
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            State
          </label>
          <div className='w-100'>
            <input
              placeholder='State'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.stateId || ''}
              type='text'
              name='stateId'
              disabled
            />
          </div>
        </div>

        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            City
          </label>
          <div className='w-100'>
            <input
              placeholder='City'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.cityId || ''}
              type='text'
              name='cityId'
              disabled
            />
          </div>
        </div>

        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Address
          </label>
          <div className='w-100'>
            <input
              placeholder='Address'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.address || ''}
              type='text'
              name='address'
              disabled
            />
          </div>
        </div>
        <div className='col-md-4 mb-4 pr-10'>
          <label className='font-size-xs font-weight-bold mb-3 form-label'>
            Status
          </label>
          <div className='w-100'>
            <input
              placeholder='Status'
              className='form-control form-control-lg ps-4 mb-4 placeHolder'
              value={formdata.propertyStatus || ''}
              type='text'
              name='propertyStatus'
              disabled
            />
          </div>
        </div>
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
          {PropertyIdDetail && PropertyIdDetail.data && PropertyIdDetail.data.propertyImages && PropertyIdDetail.data.propertyImages.length > 0 ?
            PropertyIdDetail.data.propertyImages.map((image) => (
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
                <button className='btn btn-outline p-0 border-0' disabled><i class="bi bi-x fs-2"></i></button>
              </div>
            ))
            : LeasesListIdDetail && LeasesListIdDetail.data && LeasesListIdDetail.data.propertyId && LeasesListIdDetail.data.propertyId.propertyImages && LeasesListIdDetail.data.propertyId.propertyImages.length > 0 ? LeasesListIdDetail.data.propertyId.propertyImages.map((image) => (
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
                <button className='btn btn-outline p-0 border-0' disabled><i class="bi bi-x fs-2"></i></button>
              </div>
            )) :
            null}
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
  const { LandlordslistStore, editPropertyStore, PropertylistStore, editLeasesListStore } = state
  return {
    getAllLandlords: LandlordslistStore && LandlordslistStore.getAllLandlords ? LandlordslistStore.getAllLandlords : '',
    Propertylists: PropertylistStore && PropertylistStore.Propertylists ? PropertylistStore.Propertylists : '',
    PropertyIdDetail: editPropertyStore && editPropertyStore.PropertyIdDetail ? editPropertyStore.PropertyIdDetail : '',
    LeasesListIdDetail: editLeasesListStore && editLeasesListStore.LeasesListIdDetail ? editLeasesListStore.LeasesListIdDetail : '',
  }
}

const mapDispatchToProps = dispatch => ({
  getLandlordlistDispatch: (data) =>
    dispatch(LandlordsActions.getlandlordslist(data)),
  clearlandlordslistDispatch: () =>
    dispatch(LandlordsActions.clearlandlordslist()),
  getPropertylistDispatch: (data) =>
    dispatch(PropertyActions.getpropertylist(data)),
  PropertyEditDispatch: (id) =>
    dispatch(PropertyGetIdActions.getPropertyIdDetails(id)),
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
  LeaseEditDispatch: (id) =>
    dispatch(LeasesListGetIdActions.getLeasesListIdDetails(id)),
  clearLeaseEditDispatch: () =>
    dispatch(LeasesListGetIdActions.clearLeasesListIdDetails()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyAdd)