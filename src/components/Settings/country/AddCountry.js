import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CountryAddAction, CountryGetIdActions, updateCountryActions, CountryActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR } from '../../../utils/constants'
import { warningAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setCountryEditData } from './Countryedit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddCountry(props) {
  const {
    CountryAddDispatch,
    getAddCountrylists,
    CountryIdDetail,
    getCountryIdDetailsDispatch,
    saveupdateCountryResponse,
    updateCountryDispatch,
    clearCountryUpdateDispatch,
    Open,
    page,
    limit,
    Close,
    editId,
    ClearCountryAddDispatch,
    clearCountryIdDetailsDispatch,
    setEditId,
    getcountrylistDispatch
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    countryName: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    countryName: '',
    status: ''
  })

  const countryTypeStatus = [
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
    if (_.isEmpty(formdata.countryName)) {
      errors.countryName = USER_MANAGEMENT_ERROR.COUNTRY
      document.getElementById('countryName').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        CountryAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updateCountryDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      countryName: '',
      status: ''
    })
    setErrors({
      countryName: '',
      status: ''
    })
    setSelectStatus('')
  }

  const onConfirm = () => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (editMode) {
      clear()
      Close()
      clearCountryUpdateDispatch()
      clearCountryIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getcountrylistDispatch(params)
    } else {
      clear()
      Close()
      ClearCountryAddDispatch()
      getcountrylistDispatch(params)
    }
  }

  useEffect(() => {
    if (getAddCountrylists && getAddCountrylists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddCountrylists && getAddCountrylists.message,
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
    } else if (getAddCountrylists && getAddCountrylists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddCountrylists && getAddCountrylists.message,
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
      ClearCountryAddDispatch()
    }
  }, [getAddCountrylists])

  useEffect(() => {
    if (currentId) {
      getCountryIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (CountryIdDetail && CountryIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = CountryIdDetail && CountryIdDetail.data
      const setData = setCountryEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = countryTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [CountryIdDetail])

  useEffect(() => {
    if (saveupdateCountryResponse && saveupdateCountryResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateCountryResponse && saveupdateCountryResponse.message,
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
    } else if (saveupdateCountryResponse && saveupdateCountryResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateCountryResponse && saveupdateCountryResponse.message,
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
      clearCountryUpdateDispatch()
    }
  }, [saveupdateCountryResponse])

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

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Country Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Country Name</label>
            <input
              placeholder='Country Name'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.countryName || ''}
              type='text'
              name='countryName'
              id='countryName'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.countryName.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.countryName && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.countryName}</span>
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
                options={countryTypeStatus}
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
  const { CountryAddStoreKey, editCountryStore, updateCountryStore, dropzoneStore } = state;
  return {
    getAddCountrylists: CountryAddStoreKey && CountryAddStoreKey.CountryAdd ? CountryAddStoreKey.CountryAdd : '',
    loading: CountryAddStoreKey && CountryAddStoreKey.loading ? CountryAddStoreKey.loading : false,
    CountryIdDetail: editCountryStore && editCountryStore.CountryIdDetail ? editCountryStore.CountryIdDetail : '',
    saveupdateCountryResponse: updateCountryStore && updateCountryStore.saveupdateCountryResponse ? updateCountryStore.saveupdateCountryResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  CountryAddDispatch: (data) =>
    dispatch(CountryAddAction.CountryAdd(data)),
  ClearCountryAddDispatch: () =>
    dispatch(CountryAddAction.clearCountry()),
  getCountryIdDetailsDispatch: (id) =>
    dispatch(CountryGetIdActions.getCountryIdDetails(id)),
  clearCountryIdDetailsDispatch: (id) =>
    dispatch(CountryGetIdActions.clearCountryIdDetails(id)),
  updateCountryDispatch: (id, params) =>
    dispatch(updateCountryActions.updateCountry(id, params)),
  clearCountryUpdateDispatch: (id, params) =>
    dispatch(updateCountryActions.clearupdateCountry(id, params)),
  getcountrylistDispatch: (params) => dispatch(CountryActions.getcountrylist(params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCountry)