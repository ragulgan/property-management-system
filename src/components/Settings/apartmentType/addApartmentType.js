import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../../theme/helpers'
import _ from 'lodash'
import { ApartmentTypeAddAction, ApartmentTypeGetIdActions, updateApartmentTypeActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR } from '../../../utils/constants'
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setApartmentTypeEditData } from './editApartmentType'
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
    getAddApartmentType,
    ApartmentTypeIdDetail,
    saveupdateApartmentTypeResponse,
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
    apartmentType: '',
    status: ''
  })
  const [errors, setErrors] = useState({
    apartmentType: '',
    status: ''
  })

  const apartmentTypeStatus = [
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
    if (_.isEmpty(formdata.apartmentType)) {
      errors.apartmentType = USER_MANAGEMENT_ERROR.LEASE_TYPE
      document.getElementById('apartmentType').focus()
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
      apartmentType: '',
      status: ''
    })
    setErrors({
      apartmentType: '',
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
    if (getAddApartmentType && getAddApartmentType.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: getAddApartmentType && getAddApartmentType.message,
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
    } else if (getAddApartmentType && getAddApartmentType.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: getAddApartmentType && getAddApartmentType.message,
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
  }, [getAddApartmentType])


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
    if (ApartmentTypeIdDetail && ApartmentTypeIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = ApartmentTypeIdDetail && ApartmentTypeIdDetail.data
      const setData = setApartmentTypeEditData(userData)
      setFormData(setData)

      const status = userData.status
      if (status) {
        const selOption = apartmentTypeStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
    }
  }, [ApartmentTypeIdDetail])

  useEffect(() => {
    if (saveupdateApartmentTypeResponse && saveupdateApartmentTypeResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateApartmentTypeResponse && saveupdateApartmentTypeResponse.message,
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
    } else if (saveupdateApartmentTypeResponse && saveupdateApartmentTypeResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateApartmentTypeResponse && saveupdateApartmentTypeResponse.message,
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
  }, [saveupdateApartmentTypeResponse])

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
            <label className="required form-label">Apartment Type</label>
            <input
              placeholder='Lease Type'
              className='form-control form-control-lg ps-4 mt-1 placeHolder'
              onChange={(e) => handleChange(e)}
              value={formdata.apartmentType || ''}
              type='text'
              name='apartmentType'
              id='apartmentType'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT
                if (!regex.test(e.key) || formdata.apartmentType.length >= 20) {
                  e.preventDefault();
                }
              }}
              autoComplete='off' />
            {errors.apartmentType && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.apartmentType}</span>
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
                options={apartmentTypeStatus}
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

  const { ApartmentTypeAddStore, editApartmentTypeStore, updateApartmentTypeStore } = state;
  return {
    getAddApartmentType: ApartmentTypeAddStore && ApartmentTypeAddStore.addApartmentType ? ApartmentTypeAddStore.addApartmentType : '',
    loading: ApartmentTypeAddStore && ApartmentTypeAddStore.loading ? ApartmentTypeAddStore.loading : false,
    ApartmentTypeIdDetail: editApartmentTypeStore && editApartmentTypeStore.ApartmentTypeIdDetail ? editApartmentTypeStore.ApartmentTypeIdDetail : '',
    saveupdateApartmentTypeResponse: updateApartmentTypeStore && updateApartmentTypeStore.saveupdateApartmentTypeResponse ? updateApartmentTypeStore.saveupdateApartmentTypeResponse : '',
  };
};
const mapDispatchToProps = dispatch => ({
  ApartmentTypeAddDispatch: (data) =>
    dispatch(ApartmentTypeAddAction.PostApartmentType(data)),
  clearApartmentTypeAddDispatch: () =>
    dispatch(ApartmentTypeAddAction.clearApartmentType()),
  getApartmentTypeIdDetailsDispatch: (id) =>
    dispatch(ApartmentTypeGetIdActions.getApartmentTypeIdDetails(id)),
  clearApartmentTypeIdDetailsDispatch: () =>
    dispatch(ApartmentTypeGetIdActions.clearApartmentTypeIdDetails()),
  updateApartmentTypeDispatch: (id, params) =>
    dispatch(updateApartmentTypeActions.updateApartmentType(id, params)),
  clearApartmentTypeUpdateDispatch: () =>
    dispatch(updateApartmentTypeActions.clearupdateApartmentType()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddApartmentType)