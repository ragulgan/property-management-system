import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../../theme/helpers'
import _ from 'lodash'
import { PropertyDocumentTypeAddAction, PropertyDocumentTypeGetIdActions, updatePropertyDocumentTypeActions, PropertyDocumentTypeActions } from '../../../store/actions'
import { REGEX, USER_ERROR } from '../../../utils/constants'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, STATUS_BADGE, DATE, USER_MANAGEMENT_VALIDATION, USER_MANAGEMENT_ERROR, DROPZONE_IMAGE_NAME_TYPES, FILE_FORMAT_TYPE, } from '../../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setPropertyDocumentEditData } from './PropertyDocumentEdit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddPropertyDocument(props) {
  const {
    PropertyDocumentAddDispatch,
    getAddPropertyDocumentlists,
    PropertyDocumentIdDetail,
    getPropertyDocumentIdDetailsDispatch,
    saveupdatePropertyDocumentResponse,
    updatePropertyDocumentDispatch,
    clearPropertyDocumentUpdateDispatch,
    clearPropertyDocumentAddDispatch,
    Open,
    Close,
    page,
    limit,
    editId,
    getDispatch,
    clearPropertyDocumentIdDetailsDispatch,
    getPropertyDocumentlistDispatch,
    setEditId
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    propertyDocumentType: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    propertyDocumentType: '',
    status: ''
  })

  const DocumentTypeStatus = [
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
    if (_.isEmpty(formdata.propertyDocumentType)) {
      errors.propertyDocumentType = USER_MANAGEMENT_ERROR.LEASE_TYPE
      document.getElementById('propertyDocumentType').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        PropertyDocumentAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updatePropertyDocumentDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      propertyDocumentType: '',
      status: ''

    })
    setErrors({
      propertyDocumentType: '',
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
      clearPropertyDocumentUpdateDispatch()
      clearPropertyDocumentIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getDispatch(params)
    } else {
      clear()
      Close()
      clearPropertyDocumentAddDispatch()
      getPropertyDocumentlistDispatch()
      getDispatch(params)
    }
  }

  useEffect(() => {
    if (getAddPropertyDocumentlists && getAddPropertyDocumentlists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddPropertyDocumentlists && getAddPropertyDocumentlists.message,
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
    } else if (getAddPropertyDocumentlists && getAddPropertyDocumentlists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddPropertyDocumentlists && getAddPropertyDocumentlists.message,
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
      clearPropertyDocumentAddDispatch()
    }
  }, [getAddPropertyDocumentlists])

  useEffect(() => {
    if (currentId) {
      getPropertyDocumentIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (PropertyDocumentIdDetail && PropertyDocumentIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = PropertyDocumentIdDetail && PropertyDocumentIdDetail.data
      const setData = setPropertyDocumentEditData(userData)
      setFormData(setData)

      const status = userData.status
      if (status) {
        const selOption = DocumentTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [PropertyDocumentIdDetail])

  useEffect(() => {
    if (saveupdatePropertyDocumentResponse && saveupdatePropertyDocumentResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdatePropertyDocumentResponse && saveupdatePropertyDocumentResponse.message,
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
    } else if (saveupdatePropertyDocumentResponse && saveupdatePropertyDocumentResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdatePropertyDocumentResponse && saveupdatePropertyDocumentResponse.message,
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
      clearPropertyDocumentUpdateDispatch()
    }
  }, [saveupdatePropertyDocumentResponse])

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
    <Modal show={Open} onHide={onConfirm}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Documents Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Property Documents Type</label>
            <input
              placeholder='Property Documents Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.propertyDocumentType || ''}
              type='text'
              name='propertyDocumentType'
              id='propertyDocumentType'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.propertyDocumentType.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.propertyDocumentType && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.propertyDocumentType}</span>
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
                options={DocumentTypeStatus}
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
  const { PropertyDocumentTypeAddStore, editPropertyDocumentTypeTypeStore, updatePropertyDocumentTypeStore } = state;
  return {
    getAddPropertyDocumentlists: PropertyDocumentTypeAddStore && PropertyDocumentTypeAddStore.addPropertyDocumentType ? PropertyDocumentTypeAddStore.addPropertyDocumentType : '',
    loading: PropertyDocumentTypeAddStore && PropertyDocumentTypeAddStore.loading ? PropertyDocumentTypeAddStore.loading : false,
    PropertyDocumentIdDetail: editPropertyDocumentTypeTypeStore && editPropertyDocumentTypeTypeStore.PropertyDocumentTypeIdDetail ? editPropertyDocumentTypeTypeStore.PropertyDocumentTypeIdDetail : '',
    saveupdatePropertyDocumentResponse: updatePropertyDocumentTypeStore && updatePropertyDocumentTypeStore.saveupdatePropertyDocumentTypeResponse ? updatePropertyDocumentTypeStore.saveupdatePropertyDocumentTypeResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  PropertyDocumentAddDispatch: (data) =>
    dispatch(PropertyDocumentTypeAddAction.PropertyDocumentTypeAdd(data)),
  clearPropertyDocumentAddDispatch: () =>
    dispatch(PropertyDocumentTypeAddAction.clearUSER()),
  getPropertyDocumentIdDetailsDispatch: (id) =>
    dispatch(PropertyDocumentTypeGetIdActions.getPropertyDocumentTypeIdDetails(id)),
  clearPropertyDocumentIdDetailsDispatch: (id) =>
    dispatch(PropertyDocumentTypeGetIdActions.clearPropertyDocumentTypeIdDetails(id)),

  updatePropertyDocumentDispatch: (id, params) =>
    dispatch(updatePropertyDocumentTypeActions.updatePropertyDocumentType(id, params)),
  clearPropertyDocumentUpdateDispatch: (id, params) =>
    dispatch(updatePropertyDocumentTypeActions.clearupdatePropertyDocumentType(id, params)),
  getPropertyDocumentlistDispatch: (params) =>
    dispatch(PropertyDocumentTypeActions.getpropertyDocumentTypelist(params))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPropertyDocument)