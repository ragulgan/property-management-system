import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../../theme/helpers'
import _ from 'lodash'
import { LeaseAddAction, LeaseGetIdActions, updateLeaseActions } from '../../../store/actions'
import { REGEX, USER_ERROR } from '../../../utils/constants'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, STATUS_BADGE, DATE, USER_MANAGEMENT_VALIDATION, USER_MANAGEMENT_ERROR, DROPZONE_IMAGE_NAME_TYPES, FILE_FORMAT_TYPE, } from '../../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setLeaseEditData } from './EditLeaseType'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddLease(props) {
  const {
    LeaseAddDispatch,
    getAddLeaselists,
    LeaseIdDetail,
    getLeaseIdDetailsDispatch,
    saveupdateLeaseResponse,
    clearLeaseAddDispatch,
    updateLeaseDispatch,
    clearLeaseUpdateDispatch,
    Open,
    page,
    limit,
    Close,
    editId,
    getDispatch,
    clearLeaseIdDetailsDispatch,
    setEditId
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    leaseType: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    leaseType: '',
    status: ''
  })

  const leaseTypeStatus = [
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
    if (_.isEmpty(formdata.leaseType)) {
      errors.leaseType = USER_MANAGEMENT_ERROR.LEASE_TYPE
      document.getElementById('leaseType').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        LeaseAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updateLeaseDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      leaseType: '',
      status: ''
    })
    setErrors({
      leaseType: '',
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
      clearLeaseUpdateDispatch()
      clearLeaseIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getDispatch(params)
    } else {
      clear()
      Close()
      clearLeaseAddDispatch()
      getDispatch(params)
    }
  }

  useEffect(() => {
    if (getAddLeaselists && getAddLeaselists.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddLeaselists && getAddLeaselists.message,
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
    } else if (getAddLeaselists && getAddLeaselists.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddLeaselists && getAddLeaselists.message,
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
      clearLeaseAddDispatch()
    }
  }, [getAddLeaselists])


  useEffect(() => {
    if (currentId) {
      getLeaseIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (LeaseIdDetail && LeaseIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = LeaseIdDetail && LeaseIdDetail.data
      const setData = setLeaseEditData(userData)
      setFormData(setData)

      const status = userData.status
      if (status) {
        const selOption = leaseTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [LeaseIdDetail])

  useEffect(() => {
    if (saveupdateLeaseResponse && saveupdateLeaseResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateLeaseResponse && saveupdateLeaseResponse.message,
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
    } else if (saveupdateLeaseResponse && saveupdateLeaseResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateLeaseResponse && saveupdateLeaseResponse.message,
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
  }, [saveupdateLeaseResponse])

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
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Lease Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Lease Type</label>
            <input
              placeholder='Lease Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.leaseType || ''}
              type='text'
              name='leaseType'
              id='leaseType'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.leaseType.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.leaseType && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.leaseType}</span>
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
                options={leaseTypeStatus}
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

  const { LeaseAddStore, editLeaseTypeStore, updateLeaseStore, dropzoneStore } = state;
  return {
    getAddLeaselists: LeaseAddStore && LeaseAddStore.addLease ? LeaseAddStore.addLease : '',
    loading: LeaseAddStore && LeaseAddStore.loading ? LeaseAddStore.loading : false,
    LeaseIdDetail: editLeaseTypeStore && editLeaseTypeStore.LeaseIdDetail ? editLeaseTypeStore.LeaseIdDetail : '',
    saveupdateLeaseResponse: updateLeaseStore && updateLeaseStore.saveupdateLeaseResponse ? updateLeaseStore.saveupdateLeaseResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  LeaseAddDispatch: (data) =>
    dispatch(LeaseAddAction.LeaseAdd(data)),
  clearLeaseAddDispatch: () =>
    dispatch(LeaseAddAction.clearUSER()),
  getLeaseIdDetailsDispatch: (id) =>
    dispatch(LeaseGetIdActions.getLeaseIdDetails(id)),
  clearLeaseIdDetailsDispatch: (id) =>
    dispatch(LeaseGetIdActions.clearLeaseIdDetails(id)),
  updateLeaseDispatch: (id, params) =>
    dispatch(updateLeaseActions.updateLease(id, params)),
  clearLeaseUpdateDispatch: (id, params) =>
    dispatch(updateLeaseActions.clearupdateLease(id, params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLease)