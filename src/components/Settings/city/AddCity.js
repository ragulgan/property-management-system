import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CityAddAction, CityGetIdActions, updateCityActions, CityActions, StateActions, CountryActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR, PROPERTY_MANAGEMENT_ERROR } from '../../../utils/constants'
import { warningAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setCityEditData } from './Cityedit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddCity(props) {
  const {
    CityAddDispatch,
    getAddCitylists,
    CityIdDetail,
    getCityIdDetailsDispatch,
    saveupdateCityResponse,
    updateCityDispatch,
    clearCityUpdateDispatch,
    Open,
    Close,
    editId,
    page,
    limit,
    ClearCityAddDispatch,
    clearCityIdDetailsDispatch,
    setEditId,
    getcitylistDispatch,
    getstatelistDispatch,
    getAllCountrylists,
    getAllStatelists,
    getcountrylistDispatch
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    countryId: '',
    stateId: '',
    cityName: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    countryId: '',
    stateId: '',
    cityName: '',
    status: ''
  })
  const cityTypeStatus = [
    {
      "value": "ACTIVE",
      "label": "Active"
    },
    {
      "value": "INACTIVE",
      "label": "Inactive"
    }
  ]
  const [selectedOptions, setSelectedOptions] = useState();
  const [Country, setCountry] = useState()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [state, setState] = useState()
  const [selectedState, setSelectedState] = useState('')
  const [status, setSelectStatus] = useState('')
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    const errors = {}
    if (_.isEmpty(formdata.status)) {
      errors.status = USER_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('status').focus()
    }
    if (_.isEmpty(formdata.cityName)) {
      errors.cityName = USER_MANAGEMENT_ERROR.CITY
      document.getElementById('cityName').focus()
    }
    if (_.isEmpty(formdata.stateId)) {
      errors.stateId = PROPERTY_MANAGEMENT_ERROR.STATE_SELECT
      document.getElementById('stateId').focus()
    }
    if (_.isEmpty(formdata.countryId)) {
      errors.countryId = PROPERTY_MANAGEMENT_ERROR.COUNTRY_SELECT
      document.getElementById('countryId').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        CityAddDispatch(formdata)
      }
    }
  }
  const onConfirmupdate = () => {
    updateCityDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      countryId: '',
      stateId: '',
      cityName: '',
      status: ''
    })
    setErrors({
      countryId: '',
      stateId: '',
      cityName: '',
      status: ''
    })
    setSelectStatus('')
    setSelectedCountry('')
    setSelectedState('')
  }

  const onConfirm = () => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (editMode) {
      clear()
      Close()
      clearCityUpdateDispatch()
      clearCityIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getcitylistDispatch(params)
    } else {
      clear()
      Close()
      ClearCityAddDispatch()
      getcitylistDispatch(params)
    }
  }

  useEffect(() => {
    if(Open) {
      const params = {
        status:'ACTIVE'
      }
      getcountrylistDispatch(params)
      getstatelistDispatch(params)
    }
  }, [Open])

  useEffect(() => {
    if (getAddCitylists && getAddCitylists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddCitylists && getAddCitylists.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#22BB33'

        },
      }).showToast()
      onConfirm();
    } else if (getAddCitylists && getAddCitylists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddCitylists && getAddCitylists.message,
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
      ClearCityAddDispatch()
    }
  }, [getAddCitylists])

  useEffect(() => {
    if (currentId) {
      getCityIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])
  useEffect(() => {
    if (CityIdDetail && CityIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = CityIdDetail && CityIdDetail.data
      const setData = setCityEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = cityTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
      const country = userData.country.id
      if (country) {
        const CountryOption = Country.find((x) => x.value === country)
        if (CountryOption) {
          setSelectedCountry(CountryOption)
          setFormData((values) => ({ ...values, countryId: country }))
        }
      }
      const State = userData.state.id
      if (State) {
        const StateOption = state.find((x) => x.value === State)
        if (StateOption) {
          setSelectedState(StateOption)
          setFormData((values) => ({ ...values, stateId: State }))
        }
      }
    }
  }, [CityIdDetail])

  useEffect(() => {
    if (saveupdateCityResponse && saveupdateCityResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateCityResponse && saveupdateCityResponse.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#22BB33'

        },
      }).showToast()
      onConfirm()
    } else if (saveupdateCityResponse && saveupdateCityResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateCityResponse && saveupdateCityResponse.message,
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
      clearCityUpdateDispatch()
    }
  }, [saveupdateCityResponse])

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

  const CountryName = getAllCountrylists && getAllCountrylists.data
  useEffect(() => {
    const Asignees = getCountryDefaultOption(CountryName)
    setCountry(Asignees)
  }, [CountryName])

  const getCountryDefaultOption = (CountryName) => {
    const defaultOptions = []
    for (const item in CountryName) {
      defaultOptions.push({ label: CountryName[item].countryName, value: CountryName[item].id })
    }
    return defaultOptions
  }

  const handleChangeCountry = selectedOption => {
    if (selectedOption !== null) {
      setSelectedCountry(selectedOption)
      setFormData(values => ({ ...values, countryId: selectedOption.value, cityName: '', }))
      setErrors({ ...errors, countryId: "" })
      setSelectedState('')
      const params = {
        countryId: selectedOption.value,
        status: 'ACTIVE'
      }
      getstatelistDispatch(params)
    }
  }
  const StateName = getAllStatelists && getAllStatelists.data
  useEffect(() => {
    const Asignees = getStateDefaultOption(StateName)
    setState(Asignees)
  }, [StateName])

  const getStateDefaultOption = (StateName) => {
    const defaultOptions = []
    for (const item in StateName) {
      defaultOptions.push({ label: StateName[item].stateName, value: StateName[item].id })
    }
    return defaultOptions
  }

  const handleChangeState = selectedOption => {
    if (selectedOption !== null) {
      setSelectedState(selectedOption)
      setFormData(values => ({ ...values, stateId: selectedOption.value, cityName: '', }))
      setErrors({ ...errors, stateId: "" })
    }
  }

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} City</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-3'>
            <label className='staff-header mb-3 form-label required'>
              Country Name
            </label>
            <div>
              <ReactSelect
                isMulti={false}
                name='countryId'
                id='countryId'
                className='select2'
                placeholder="Select Country"
                classNamePrefix='select'
                handleChangeReactSelect={handleChangeCountry}
                options={Country}
                value={selectedCountry}
              />
            </div>
            {errors.countryId && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.countryId}</span>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label className='staff-header mb-3 form-label required'>
              State Name
            </label>
            <div>
              <ReactSelect
                isMulti={false}
                name='stateId'
                id='stateId'
                className='select2'
                placeholder="Select State"
                classNamePrefix='select'
                handleChangeReactSelect={handleChangeState}
                options={state}
                value={selectedState}
                isDisabled={selectedCountry.length === 0}
              />
            </div>
            {errors.stateId && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.stateId}</span>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label className="required form-label">City Name</label>
            <input
              placeholder='City Name'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.cityName || ''}
              type='text'
              name='cityName'
              id='cityName'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.cityName.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.cityName && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.cityName}</span>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label className='mb-3 form-label required'>
              Status
            </label>
            <div>
              <ReactSelect
                isMulti={false}
                name='status'
                id='status'
                className='select2'
                placeholder="Status"
                classNamePrefix='select'
                handleChangeReactSelect={handleChangeSelectStatus}
                options={cityTypeStatus}
                value={status}
              />
            </div>
            {errors.status && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.status}</span>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <button className='btn btn-blue-outline py-2' onClick={onConfirm}>
          Cancel
        </button>
        <button onClick={handleSubmit} className='btn btn-blue py-2'>
          {editMode ? 'Update' : 'Save'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}
const mapStateToProps = (city) => {
  const { CityAddStore, editCityStore, updateCityStore, CountrylistStore, StatelistStore } = city;
  return {
    getAddCitylists: CityAddStore && CityAddStore.CityAdd ? CityAddStore.CityAdd : '',
    loading: CityAddStore && CityAddStore.loading ? CityAddStore.loading : false,
    CityIdDetail: editCityStore && editCityStore.CityIdDetail ? editCityStore.CityIdDetail : '',
    saveupdateCityResponse: updateCityStore && updateCityStore.saveupdateCityResponse ? updateCityStore.saveupdateCityResponse : '',
    getAllCountrylists: CountrylistStore && CountrylistStore.Countrylists ? CountrylistStore.Countrylists : '',
    getAllStatelists: StatelistStore && StatelistStore.Statelists ? StatelistStore.Statelists : '',
  };
};
const mapDispatchToProps = dispatch => ({
  CityAddDispatch: (data) =>
    dispatch(CityAddAction.CityAdd(data)),
  ClearCityAddDispatch: () =>
    dispatch(CityAddAction.clearCity()),
  getCityIdDetailsDispatch: (id) =>
    dispatch(CityGetIdActions.getCityIdDetails(id)),
  clearCityIdDetailsDispatch: (id) =>
    dispatch(CityGetIdActions.clearCityIdDetails(id)),
  updateCityDispatch: (id, params) =>
    dispatch(updateCityActions.updateCity(id, params)),
  clearCityUpdateDispatch: (id, params) =>
    dispatch(updateCityActions.clearupdateCity(id, params)),
  getcitylistDispatch: (params) => dispatch(CityActions.getcitylist(params)),
  getstatelistDispatch: (params) => dispatch(StateActions.getStatelist(params)),
  getcountrylistDispatch: (params) => dispatch(CountryActions.getcountrylist(params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCity)