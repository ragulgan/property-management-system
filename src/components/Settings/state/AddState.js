import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { StateAddAction, StateGetIdActions, updateStateActions, StateActions, CountryActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR, PROPERTY_MANAGEMENT_ERROR } from '../../../utils/constants'
import { warningAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setStateEditData } from './Stateedit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddState(props) {
  const {
    StateAddDispatch,
    getAddStatelists,
    StateIdDetail,
    getStateIdDetailsDispatch,
    saveupdateStateResponse,
    updateStateDispatch,
    clearStateUpdateDispatch,
    Open,
    Close,
    page,
    limit,
    editId,
    ClearStateAddDispatch,
    clearStateIdDetailsDispatch,
    setEditId,
    getstatelistDispatch,
    getcountrylistDispatch,
    getAllCountrylists
  } = props
  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    countryId: '',
    stateName: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    countryId: '',
    stateName: '',
    status: ''
  })
  const [AsigneesOption, setAsignees] = useState()
  const stateTypeStatus = [
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
  const [SelectedAsigneesOption, setSelectedAsigneesOption] = useState('')
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
    if (_.isEmpty(formdata.stateName)) {
      errors.stateName = USER_MANAGEMENT_ERROR.STATE
      document.getElementById('stateName').focus()
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
        StateAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updateStateDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      countryId: '',
      stateName: '',
      status: ''
    })
    setErrors({
      countryId: '',
      stateName: '',
      status: ''
    })
    setSelectStatus('')
    setSelectedAsigneesOption('')
  }

  const onConfirm = () => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (editMode) {
      clear()
      Close()
      clearStateUpdateDispatch()
      clearStateIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getstatelistDispatch(params)
    } else {
      clear()
      Close()
      ClearStateAddDispatch()
      getstatelistDispatch(params)
    }
  }

  useEffect(() => {
    if (getAddStatelists && getAddStatelists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddStatelists && getAddStatelists.message,
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
    } else if (getAddStatelists && getAddStatelists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddStatelists && getAddStatelists.message,
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
      ClearStateAddDispatch()
    }
  }, [getAddStatelists])

  useEffect(() => {
    if(Open) {
      const params = {
        status:'ACTIVE'
      }
      getcountrylistDispatch(params)
    }
  }, [Open])

  useEffect(() => {
    if (currentId) {
      getStateIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (StateIdDetail && StateIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = StateIdDetail && StateIdDetail.data
      const setData = setStateEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = stateTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
      const country = userData.country.id
      if (country) {
        const CountryOption = AsigneesOption.find((x) => x.value === country)
        if (CountryOption) {
          setSelectedAsigneesOption(CountryOption)
          setFormData((values) => ({ ...values, countryId: country }))
        }
      }
    }
  }, [StateIdDetail])

  useEffect(() => {
    if (saveupdateStateResponse && saveupdateStateResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateStateResponse && saveupdateStateResponse.message,
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
    } else if (saveupdateStateResponse && saveupdateStateResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateStateResponse && saveupdateStateResponse.message,
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
      clearStateUpdateDispatch()
    }
  }, [saveupdateStateResponse])

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

  const AsigneesNames = getAllCountrylists && getAllCountrylists.data
  useEffect(() => {
    const Asignees = getDefaultOption(AsigneesNames)
    setAsignees(Asignees)
  }, [AsigneesNames])

  const getDefaultOption = (AsigneesNames) => {
    const defaultOptions = []
    for (const item in AsigneesNames) {
      defaultOptions.push({ label: AsigneesNames[item].countryName, value: AsigneesNames[item].id })
    }
    return defaultOptions
  }

  const handleChangeAsignees = selectedOption => {
    if (selectedOption !== null) {
      setSelectedAsigneesOption(selectedOption)
      setFormData(values => ({ ...values, countryId: selectedOption.value, stateName: '', }))
      setErrors({ ...errors, countryId: "" })
    }
  }

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} State Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-3'>
            <label className='mb-3 form-label required'>
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
                handleChangeReactSelect={handleChangeAsignees}
                options={AsigneesOption}
                value={SelectedAsigneesOption}
              />
            </div>
            {errors.countryId && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.countryId}</span>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label className="required form-label">State Name</label>
            <input
              placeholder='State Name'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.stateName || ''}
              type='text'
              name='stateName'
              id='stateName'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.stateName.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.stateName && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.stateName}</span>
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
                options={stateTypeStatus}
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
const mapStateToProps = (state) => {
  const { StateAddStore, editStateStore, updateStateStore, CountrylistStore } = state;
  return {
    getAddStatelists: StateAddStore && StateAddStore.StateAdd ? StateAddStore.StateAdd : '',
    loading: StateAddStore && StateAddStore.loading ? StateAddStore.loading : false,
    StateIdDetail: editStateStore && editStateStore.StateIdDetail ? editStateStore.StateIdDetail : '',
    saveupdateStateResponse: updateStateStore && updateStateStore.saveupdateStateResponse ? updateStateStore.saveupdateStateResponse : '',
    getAllCountrylists: CountrylistStore && CountrylistStore.Countrylists ? CountrylistStore.Countrylists : '',
  };
};
const mapDispatchToProps = dispatch => ({
  StateAddDispatch: (data) =>
    dispatch(StateAddAction.StateAdd(data)),
  ClearStateAddDispatch: () =>
    dispatch(StateAddAction.clearState()),
  getStateIdDetailsDispatch: (id) =>
    dispatch(StateGetIdActions.getStateIdDetails(id)),
  clearStateIdDetailsDispatch: (id) =>
    dispatch(StateGetIdActions.clearStateIdDetails(id)),
  updateStateDispatch: (id, params) =>
    dispatch(updateStateActions.updateState(id, params)),
  clearStateUpdateDispatch: (id, params) =>
    dispatch(updateStateActions.clearupdateState(id, params)),
  getstatelistDispatch: (params) => dispatch(StateActions.getStatelist(params)),
  getcountrylistDispatch: (params) => dispatch(CountryActions.getcountrylist(params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddState)