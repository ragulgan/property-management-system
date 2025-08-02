import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { LeaseDocumentAddAction, LeaseDocumentGetIdActions, updateLeaseDocumentActions, LeaseDocumentActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR } from '../../../utils/constants'
import { warningAlert } from "../../../utils/alerts"
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setLeaseEditData } from './LeaseDocumentEdit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddLease(props) {
  const {
    LeaseAddDispatch,
    getAddLeaselists,
    LeaseIdDetail,
    getLeaseIdDetailsDispatch,
    saveupdateLeaseResponse,
    updateLeaseDispatch,
    clearLeaseUpdateDispatch,
    Open,
    Close,
    page,
    limit,
    editId,
    ClearLeaseAddDispatch,
    clearLeaseIdDetailsDispatch,
    setEditId,
    getleaselistDispatch
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    leaseDocumentType: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    leaseDocumentType: '',
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
    if (_.isEmpty(formdata.leaseDocumentType)) {
      errors.leaseDocumentType = USER_MANAGEMENT_ERROR.COUNTRY
      document.getElementById('leaseDocumentType').focus()
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
      leaseDocumentType: '',
      status: ''
    })
    setErrors({
      leaseDocumentType: '',
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
      clearLeaseUpdateDispatch()
      clearLeaseIdDetailsDispatch()
      Close()
      setEditMode(false)
      setEditId("")
      getleaselistDispatch(params)
    } else {
      clear()
      Close()
      ClearLeaseAddDispatch()
      getleaselistDispatch(params)
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
      ClearLeaseAddDispatch()
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
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Documents Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Lease Documents Type</label>
            <input
              placeholder='Lease Documents Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.leaseDocumentType || ''}
              type='text'
              name='leaseDocumentType'
              id='leaseDocumentType'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.leaseDocumentType.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.leaseDocumentType && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.leaseDocumentType}</span>
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
  const { LeaseDocumentAddStore, editLeaseDocumentsStore, updateLeaseDocumentStore } = state;
  return {
    getAddLeaselists: LeaseDocumentAddStore && LeaseDocumentAddStore.addLeaseDocument ? LeaseDocumentAddStore.addLeaseDocument : '',
    loading: LeaseDocumentAddStore && LeaseDocumentAddStore.loading ? LeaseDocumentAddStore.loading : false,
    LeaseIdDetail: editLeaseDocumentsStore && editLeaseDocumentsStore.LeaseDocumentIdDetail ? editLeaseDocumentsStore.LeaseDocumentIdDetail : '',
    saveupdateLeaseResponse: updateLeaseDocumentStore && updateLeaseDocumentStore.saveupdateLeaseDocumentResponse ? updateLeaseDocumentStore.saveupdateLeaseDocumentResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  LeaseAddDispatch: (data) =>
    dispatch(LeaseDocumentAddAction.LeaseDocumentAdd(data)),
  ClearLeaseAddDispatch: () =>
    dispatch(LeaseDocumentAddAction.clearUSER()),
  getLeaseIdDetailsDispatch: (id) =>
    dispatch(LeaseDocumentGetIdActions.getLeaseDocumentIdDetails(id)),
  clearLeaseIdDetailsDispatch: (id) =>
    dispatch(LeaseDocumentGetIdActions.clearLeaseDocumentIdDetails(id)),
  updateLeaseDispatch: (id, params) =>
    dispatch(updateLeaseDocumentActions.updateLeaseDocument(id, params)),
  clearLeaseUpdateDispatch: (id, params) =>
    dispatch(updateLeaseDocumentActions.clearupdateLeaseDocument(id, params)),
  getleaselistDispatch: (params) => dispatch(LeaseDocumentActions.getleaselist(params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLease)