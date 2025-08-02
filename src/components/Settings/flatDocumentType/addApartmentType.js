import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FlatDocumentTypeAddAction, FlatDocumentTypeGetIdActions, updateFlatDocumentTypeActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR } from '../../../utils/constants'
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setFlatDocTypeEditData } from './editFlatDocType'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddApartmentType(props) {
  const {
    Open,
    page,
    limit,
    Close,
    editId,
    getDispatch,
    setEditId,
    getAddFlatDocumentType,
    flatDocumentTypeIdDetail,
    saveupdateFlatDocTypeResponse,
    ApartmentTypeAddDispatch,
    clearApartmentTypeAddDispatch,
    getApartmentTypeIdDetailsDispatch,
    clearApartmentTypeIdDetailsDispatch,
    updateApartmentTypeDispatch,
    clearApartmentTypeUpdateDispatch,
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    type: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    type: '',
    status: ''
  })

  const flatDocumentTypeStatus = [
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

  const handleSubmit = (e) => {
    const errors = {}
    if (_.isEmpty(formdata.status)) {
      errors.status = USER_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('status').focus()
    }
    if (_.isEmpty(formdata.type)) {
      errors.type = USER_MANAGEMENT_ERROR.LEASE_TYPE
      document.getElementById('type').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        ApartmentTypeAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updateApartmentTypeDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      type: '',
      status: ''
    })
    setErrors({
      type: '',
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
      clearApartmentTypeUpdateDispatch()
      clearApartmentTypeIdDetailsDispatch()
      setEditMode(false)
      setEditId("")
      getDispatch(params)
    } else {
      clear()
      Close()
      clearApartmentTypeAddDispatch()
      getDispatch(params)
    }
  }

  useEffect(() => {
    if (getAddFlatDocumentType && getAddFlatDocumentType.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddFlatDocumentType && getAddFlatDocumentType.message,
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
    } else if (getAddFlatDocumentType && getAddFlatDocumentType.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddFlatDocumentType && getAddFlatDocumentType.message,
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
      clearApartmentTypeAddDispatch()
    }
  }, [getAddFlatDocumentType])


  useEffect(() => {
    if (currentId) {
      getApartmentTypeIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (flatDocumentTypeIdDetail && flatDocumentTypeIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = flatDocumentTypeIdDetail && flatDocumentTypeIdDetail.data
      const setData = setFlatDocTypeEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = flatDocumentTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [flatDocumentTypeIdDetail])

  useEffect(() => {
    if (saveupdateFlatDocTypeResponse && saveupdateFlatDocTypeResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateFlatDocTypeResponse && saveupdateFlatDocTypeResponse.message,
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
    } else if (saveupdateFlatDocTypeResponse && saveupdateFlatDocTypeResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateFlatDocTypeResponse && saveupdateFlatDocTypeResponse.message,
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
      clearApartmentTypeUpdateDispatch()
    }
  }, [saveupdateFlatDocTypeResponse])

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Flat Document Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Flat Document Type</label>
            <input
              placeholder='Flat Document Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.type || ''}
              type='text'
              name='type'
              id='type'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.type.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.type && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.type}</span>
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
                options={flatDocumentTypeStatus}
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

  const { FlatDocumentTypeAddStore, editFlatDocumentTypeStore, updateFlatDocumentTypeStore } = state;
  return {
    getAddFlatDocumentType: FlatDocumentTypeAddStore && FlatDocumentTypeAddStore.addFlatDocumentType ? FlatDocumentTypeAddStore.addFlatDocumentType : '',
    loading: FlatDocumentTypeAddStore && FlatDocumentTypeAddStore.loading ? FlatDocumentTypeAddStore.loading : false,
    flatDocumentTypeIdDetail: editFlatDocumentTypeStore && editFlatDocumentTypeStore.FlatDocumentTypeIdDetail ? editFlatDocumentTypeStore.FlatDocumentTypeIdDetail : '',
    saveupdateFlatDocTypeResponse: updateFlatDocumentTypeStore && updateFlatDocumentTypeStore.updateFlatDocumentTypeResponce ? updateFlatDocumentTypeStore.updateFlatDocumentTypeResponce : '',
  };
};
const mapDispatchToProps = dispatch => ({
  ApartmentTypeAddDispatch: (data) =>
    dispatch(FlatDocumentTypeAddAction.flatDocumentTypeAdd(data)),
  clearApartmentTypeAddDispatch: () =>
    dispatch(FlatDocumentTypeAddAction.clearFlatDocumentTypeAdd()),
  getApartmentTypeIdDetailsDispatch: (id) =>
    dispatch(FlatDocumentTypeGetIdActions.getFlatDocumentTypeIdDetails(id)),
  clearApartmentTypeIdDetailsDispatch: () =>
    dispatch(FlatDocumentTypeGetIdActions.clearFlatDocumentTypeIdDetails()),
  updateApartmentTypeDispatch: (id, params) =>
    dispatch(updateFlatDocumentTypeActions.updateFlatDocumentType(id, params)),
  clearApartmentTypeUpdateDispatch: () =>
    dispatch(updateFlatDocumentTypeActions.clearupdateFlatDocumentType()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddApartmentType)