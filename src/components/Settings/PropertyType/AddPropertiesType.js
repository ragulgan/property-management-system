import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../../theme/helpers'
import _ from 'lodash'
import { PropertiesAddAction, PropertiesGetIdActions, updatePropertiesActions } from '../../../store/actions'
import { REGEX, USER_ERROR } from '../../../utils/constants'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, STATUS_BADGE, DATE, USER_MANAGEMENT_VALIDATION, USER_MANAGEMENT_ERROR, DROPZONE_IMAGE_NAME_TYPES, FILE_FORMAT_TYPE, } from '../../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setPropertiesEditData } from './EditPropertiesType'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
function AddPropertiesType(props) {
  const {
    PropertiesAddDispatch,
    getAddPropertieslists,
    clearPropertiesAddDispatch,
    PropertiesIdDetail,
    getPropertiesIdDetailsDispatch,
    saveupdatePropertiesResponse,
    updatePropertiesDispatch,
    clearPropertiesUpdateDispatch,
    className,
    loading,
    page,
    limit,
    Open,
    Close,
    editId,
    getDispatch,
    clearPropertiesIdDetailsDispatch,
    setEditId
  } = props
  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    propertyType: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    propertyType: '',
    status: ''
  })
  const SelectStatus = [
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
  const [defaultImages, setDefaultImages] = useState([]);
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
    if (_.isEmpty(formdata.propertyType)) {
      errors.propertyType = USER_MANAGEMENT_ERROR.PROPERTIES_TYPE
      document.getElementById('propertyType').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        PropertiesAddDispatch(formdata)
      }
    }
  }
  const onConfirmupdate = () => {
    updatePropertiesDispatch(currentId, formdata)
  }

  const [value, setValue] = useState(false)
  const handleChanges = value => {
    setValue({
      selected: value,
    })
    setFormData({
      profile: value && value.value,
    })
  };

  const clear = () => {
    setFormData({
      propertyType: '',
      status: '',
    })
    setErrors({
      propertyType: '',
      status: '',
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
      clearPropertiesUpdateDispatch()
      clearPropertiesIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getDispatch(params)
    } else {
      clear()
      Close()
      clearPropertiesAddDispatch()
      getDispatch(params)
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

  useEffect(() => {
    if (getAddPropertieslists && getAddPropertieslists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddPropertieslists && getAddPropertieslists.message,
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
    } else if (getAddPropertieslists && getAddPropertieslists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddPropertieslists && getAddPropertieslists.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'
        },
      }).showToast();
      clearPropertiesAddDispatch()
    }
  }, [getAddPropertieslists])
  useEffect(() => {
    if (currentId) {
      getPropertiesIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])
  useEffect(() => {
    if (PropertiesIdDetail && PropertiesIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = PropertiesIdDetail && PropertiesIdDetail.data
      const setData = setPropertiesEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = SelectStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [PropertiesIdDetail])
  useEffect(() => {
    if (saveupdatePropertiesResponse && saveupdatePropertiesResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdatePropertiesResponse && saveupdatePropertiesResponse.message,
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
    } else if (saveupdatePropertiesResponse && saveupdatePropertiesResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdatePropertiesResponse && saveupdatePropertiesResponse.message,
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
      clearPropertiesUpdateDispatch()
    }
  }, [saveupdatePropertiesResponse])

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Properties Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Properties Type</label>
            <input
              placeholder='Properties Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.propertyType || ''}
              type='text'
              name='propertyType'
              id='propertyType'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.propertyType.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.propertyType && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.propertyType}</span>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label className='form-label mb-4 required'>
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
                options={SelectStatus}
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
  const { PropertiesAddStore, editPropertiesStore, updatePropertiesStore } = state;
  return {
    getAddPropertieslists: PropertiesAddStore && PropertiesAddStore.PropertiesAdd ? PropertiesAddStore.PropertiesAdd : '',
    loading: PropertiesAddStore && PropertiesAddStore.loading ? PropertiesAddStore.loading : false,
    PropertiesIdDetail: editPropertiesStore && editPropertiesStore.PropertiesIdDetail ? editPropertiesStore.PropertiesIdDetail : '',
    saveupdatePropertiesResponse: updatePropertiesStore && updatePropertiesStore.saveupdatePropertiesResponse ? updatePropertiesStore.saveupdatePropertiesResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  PropertiesAddDispatch: (data) =>
    dispatch(PropertiesAddAction.PropertiesAdd(data)),
  clearPropertiesAddDispatch: () =>
    dispatch(PropertiesAddAction.clearProperties()),
  getPropertiesIdDetailsDispatch: (id) =>
    dispatch(PropertiesGetIdActions.getPropertiesIdDetails(id)),
  clearPropertiesIdDetailsDispatch: (id) =>
    dispatch(PropertiesGetIdActions.clearPropertiesIdDetails(id)),
  updatePropertiesDispatch: (id, params) =>
    dispatch(updatePropertiesActions.updateProperties(id, params)),
  clearPropertiesUpdateDispatch: (id, params) =>
    dispatch(updatePropertiesActions.clearupdateProperties(id, params)),

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPropertiesType)