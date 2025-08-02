import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { LandlordsAddAction, LandlordsGetIdActions, updateLandlordsActions } from '../../store/actions'
import { UploadActions } from '../../utils/dropzone/redux/action'
import { REGEX } from '../../utils/constants'
import { STATUS_RESPONSE, DATE, USER_MANAGEMENT_VALIDATION, USER_MANAGEMENT_ERROR, DROPZONE_IMAGE_NAME_TYPES, FILE_FORMAT_TYPE, } from '../../utils/constants'
import Modal from 'react-bootstrap/Modal';
import { DateSelector } from '../../theme/layout/components/DateSelector'
import dayjs, { Dayjs } from 'dayjs';
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Dropzone from '../../utils/dropzone/Dropzone'
import { setLandlordsEditData } from './Landlordsedit'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const endOfQ12022 = dayjs().subtract(18, 'year');
const startOfQ12022 = dayjs().subtract(50, 'year');

function AddLandlords(props) {
  const {
    LandlordsAddDispatch,
    addLandLord,
    clearLandlordsAddDispatch,
    LandlordsIdDetail,
    getLandlordsIdDetailsDispatch,
    saveupdateLandlordsResponse,
    updateLandlordsDispatch,
    clearLandlordUpdateDispatch,
    dropzoneImage,
    page,
    limit,
    Open,
    Close,
    editId,
    getDispatch,
    clearLandlordsIdDetailsDispatch,
    setEditId,
    clearDropzoneImage,
    loading,
    setName,
    setEmailId,
    setPhoneNo,
    setStatus,
    setFromDate,
    setToDate
  } = props

  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
    emailId: '',
    address: '',
    image: [],
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
    emailId: '',
    address: '',
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
  const [status, setSelectStatus] = useState('')
  const [defaultImages, setDefaultImages] = useState([]);
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
    if (_.isEmpty(formdata.address)) {
      errors.address = USER_MANAGEMENT_ERROR.USER_ADDRESS
      document.getElementById('address').focus()
    }
    if (_.isEmpty(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_ERROR.USER_EMAIL
      document.getElementById('emailId').focus()
    } else if (!REGEX.EMAIL.test(formdata.emailId)) {
      errors.emailId = USER_MANAGEMENT_VALIDATION.USER_EMAIL
      document.getElementById('emailId').focus()
    }
    if (formdata.alternativeMobileNumber && !REGEX.PHONE_NUMBER.test(formdata.alternativeMobileNumber)) {
      errors.alternativeMobileNumber = USER_MANAGEMENT_VALIDATION.USER_PHONE
      document.getElementById('alternativeMobileNumber').focus()
    } if (formdata.mobileNumber.length === 10 && formdata.mobileNumber === formdata.alternativeMobileNumber) {
      errors.alternativeMobileNumber = USER_MANAGEMENT_VALIDATION.USER_SAME_PHONE_NUMBER
      document.getElementById('alternativeMobileNumber').focus()
    } else if (formdata.alternativeMobileNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.alternativeMobileNumber)) {
      errors.alternativeMobileNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('alternativeMobileNumber').focus()
    }
    if (_.isEmpty(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_ERROR.PHONE_NUMBER
      document.getElementById('mobileNumber').focus()
    } else if (formdata.mobileNumber && !REGEX.MOBILE_NUMBER_VALID.test(formdata.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_VALIDATION.USER_VALID_PHONE_NUMBER;
      document.getElementById('mobileNumber').focus()
    }
    if (!formdata.dob) {
      errors.dob = USER_MANAGEMENT_ERROR.DOB
      document.getElementById('dob').focus()
    }
    if (_.isEmpty(formdata.lastName)) {
      errors.lastName = USER_MANAGEMENT_ERROR.USER_LNAME
      document.getElementById('lastName').focus()
    }
    if (_.isEmpty(formdata.firstName)) {
      errors.firstName = USER_MANAGEMENT_ERROR.USER_FNAME
      document.getElementById('firstName').focus()
    }
    // if (_.isEmpty(formdata.image)) {
    //   errors.image = USER_MANAGEMENT_ERROR.LANDLORD_IMG
    //   document.getElementById('Landlord').focus()
    // }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
        LandlordsAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    formdata.dob = dayjs(formdata.dob).format('YYYY-MM-DD')
    updateLandlordsDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      emailId: '',
      status: '',
      image: [],
      dob: '',
    })
    setErrors({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      emailId: '',
      status: '',
      dob: '',
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
      clearLandlordsAddDispatch()
      clearLandlordUpdateDispatch()
      clearLandlordsIdDetailsDispatch()
      clearDropzoneImage()
      Close()
      setEditMode(false)
      setEditId("")
      setDefaultImages([])
      setName('')
      setEmailId('')
      setPhoneNo('')
      setStatus('')
      setFromDate('')
      setToDate('')
      getDispatch(params)
    } else {
      clear()
      Close()
      clearLandlordsAddDispatch()
      clearDropzoneImage()
      setEditId("")
      setDefaultImages([])
      setName('')
      setEmailId('')
      setPhoneNo('')
      setStatus('')
      setFromDate('')
      setToDate('')
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
    if (addLandLord && addLandLord.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: addLandLord && addLandLord.message,
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

    } else if (addLandLord && addLandLord.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: addLandLord && addLandLord.message,
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
    }
  }, [addLandLord])

  useEffect(() => {
    if (dropzoneImage.code === 200) {
      const imageData = [{
        displayName: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].displayName,
        filePath: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].filePath,
        id: dropzoneImage && dropzoneImage.data && dropzoneImage.data[0].id
      }]
      setFormData({ ...formdata, image: imageData })
      setDefaultImages(imageData)
    }
  }, [dropzoneImage]);

  useEffect(() => {
    if (currentId) {
      getLandlordsIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])
  useEffect(() => {
    if (LandlordsIdDetail && LandlordsIdDetail.status === "ok") {
      const userData = LandlordsIdDetail && LandlordsIdDetail.data
      const setData = setLandlordsEditData(userData)
      setFormData(setData)
      const status = userData.status
      if (status) {
        const selOption = SelectStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, status: status }))
        }
      }
      const imageData = LandlordsIdDetail && LandlordsIdDetail.data && LandlordsIdDetail.data.image
      setDefaultImages(imageData)
    }
  }, [LandlordsIdDetail])

  useEffect(() => {
    if (saveupdateLandlordsResponse && saveupdateLandlordsResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateLandlordsResponse && saveupdateLandlordsResponse.message,
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
      clear()
      onConfirm()
      clearLandlordUpdateDispatch()
      clearLandlordsIdDetailsDispatch()

    } else if (saveupdateLandlordsResponse && saveupdateLandlordsResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateLandlordsResponse && saveupdateLandlordsResponse.message,
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
    }
  }, [saveupdateLandlordsResponse])

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='landlord-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100 landlord-size'>{editMode ? 'Update' : 'Add'} Landlord</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row px-15'>
          <div className='col-sm-7'>
            <div className='row mt-2'>
              <div className='col-sm-6'>
                <label className="required form-label">First Name</label>
                <input
                  placeholder='First Name'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.firstName || ''}
                  type='text'
                  name='firstName'
                  id='firstName'
                  onKeyPress={(e) => {
                    const regex = REGEX.TEXT
                    if (!regex.test(e.key) || formdata.firstName.length >= 20) {
                      e.preventDefault();
                    }
                  }}
                  autoComplete='off' />
                {errors.firstName && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.firstName}</span>
                  </div>
                )}
              </div>
              <div className='col-sm-6'>
                <label className="required form-label">Last Name</label>
                <input
                  placeholder='Last Name'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.lastName || ''}
                  type='text'
                  name='lastName'
                  id='lastName'
                  onKeyPress={(e) => {
                    const regex = REGEX.TEXT
                    if (!regex.test(e.key) || formdata.lastName.length >= 10) {
                      e.preventDefault();
                    }
                  }}
                  autoComplete='off'
                />
                {errors.lastName && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.lastName}</span>
                  </div>
                )}
              </div>
              <div className='col-md-12 mt-4'>
                <label className="required form-label">Date of Birth</label>
                <DateSelector
                  className={editMode ? 'date-picker-edit' : 'date-picker'}
                  name='dob'
                  id='dob'
                  views={['year', 'month', 'day']}
                  selected={formdata.dob || ''}
                  onChange={(date) => {
                    setErrors({ ...errors, dob: '' })
                    setFormData((values) => ({
                      ...values,
                      dob: date && date.$d
                    }))
                  }}
                  sx={{ width: "100%" }}
                  format={DATE.DATE_ONLY}
                  minDate={startOfQ12022}
                  maxDate={endOfQ12022}
                />
              </div>
              {errors.dob && (
                <div className='fv-plugins-message-container text-danger mb-4'>
                  <span role='alert text-danger'>{errors.dob}</span>
                </div>
              )}
              <div className='col-sm-12 mt-4'>
                <label className="required form-label">Mobile Number</label>
                <input
                  placeholder='Mobile Number'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.mobileNumber || ''}
                  // maxLength={10}
                  type='text'
                  name='mobileNumber'
                  id='mobileNumber'
                  onKeyPress={(e) => {
                    const key = e.key;
                    const currentValue = e.target.value;
                    const regex = REGEX.NUMERIC_DIGITS
                    const updatedValue = currentValue + key;
                    if (!regex.test(updatedValue) || updatedValue.length > 10) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.mobileNumber && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.mobileNumber}</span>
                  </div>
                )}
              </div>
              <div className='col-sm-12 mt-4'>
                <label className="form-label">Alternative Mobile Number</label>
                <input
                  placeholder='Alternative Mobile No'
                  className='form-control form-control-lg ps-4 mb-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.alternativeMobileNumber || ''}
                  maxLength={10}
                  type='text'
                  name='alternativeMobileNumber'
                  id='alternativeMobileNumber'
                  onKeyPress={(e) => {
                    const key = e.key;
                    const currentValue = e.target.value;
                    const regex = REGEX.NUMERIC_DIGITS
                    const updatedValue = currentValue + key;

                    if (!regex.test(updatedValue) || updatedValue.length > 10) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.alternativeMobileNumber && (
                  <div className='fv-plugins-message-container text-danger'>
                    <span role='alert text-danger'>{errors.alternativeMobileNumber}</span>
                  </div>
                )}

              </div>
              <div className='col-sm-12 mt-4'>
                <label className="required form-label">Email Id</label>
                <input
                  placeholder='Email Address'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.emailId || ''}
                  type='text'
                  name='emailId'
                  id='emailId'
                  autoComplete='off'
                  onKeyPress={(e) => {
                    if (formdata.emailId.length >= 50) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.emailId && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.emailId}</span>
                  </div>
                )}
              </div>
              <div className='col-sm-12 mt-4'>
                <label className="required form-label">Address</label>
                <textarea
                  placeholder='Address'
                  className='form-control form-control-lg ps-4 mt-1 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.address || ''}
                  type='text'
                  name='address'
                  id='address'
                  autoComplete='off'
                  rows={2}
                  maxLength={100}
                  onKeyPress={(e) => {
                    const regex = REGEX.ALPHA_NUMERIC_SPECIAL_CHARS
                    if (!regex.test(e.key) || formdata.address && formdata.address.length >= 100) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.address && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-sm-5 pl-15 mt-6'>
            {/* {
              dropzoneImage && !_.isEmpty(dropzoneImage.data) ? (
                <div colSpan='100%' className='text-center'>
                  <div
                    className='spinner-border text-primary m-5'
                  />
                </div>
              ) : ( */}
            <Dropzone
              defaultImages={defaultImages}
              type={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
              multiple={false}
              thumbnail={false}
              maxFileSize="5"
              name={`${DROPZONE_IMAGE_NAME_TYPES.IMAGE.toLowerCase()}`}
              flag={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
              formatType={FILE_FORMAT_TYPE}
              escriptMasterDataType={'Landlord'}
              id='Landlord'
            />
            {/* {errors.image && (
              <div className='fv-plugins-message-container text-danger mb-4'>
                <span role='alert text-danger'>{errors.image}</span>
              </div>
            )} */}
            <div className='text-muted mt-2'>Note: please upload ,pdf, doc format only- Max file size 5MB </div>
            <div className='col-lg-12 mt-5 text-start'>
              <label className='form-label required'>
                Select Status
              </label>
              <div className='col-sm-12 mt-4'>
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
                  // isDisabled={!IndidualOption}
                  isSearchable={false}
                />
                {errors.status && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.status}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Modal.Footer className='justify-content-center'>
            <button className='btn btn-blue-outline py-2' onClick={onConfirm}>
              Cancel
            </button>
            <button onClick={handleSubmit} className='btn btn-blue btn-size py-2'>
              {editMode ? 'Update' : 'Save'}
            </button>
          </Modal.Footer>
        </div>
      </Modal.Body>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  const { LandlordsAddStore, editLandlordssStore, updateLandlordsStore, dropzoneStore } = state;
  return {
    addLandLord: LandlordsAddStore && LandlordsAddStore.addLandLord ? LandlordsAddStore.addLandLord : '',
    LandlordsIdDetail: editLandlordssStore && editLandlordssStore.LandlordsIdDetail ? editLandlordssStore.LandlordsIdDetail : '',
    saveupdateLandlordsResponse: updateLandlordsStore && updateLandlordsStore.saveupdateLandlordsResponse ? updateLandlordsStore.saveupdateLandlordsResponse : '',
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
  };
};
const mapDispatchToProps = dispatch => ({
  LandlordsAddDispatch: (data) =>
    dispatch(LandlordsAddAction.LandlordsAdd(data)),
  clearLandlordsAddDispatch: (data) =>
    dispatch(LandlordsAddAction.clearUSER(data)),
  getLandlordsIdDetailsDispatch: (id) =>
    dispatch(LandlordsGetIdActions.getLandlordsIdDetails(id)),
  clearLandlordsIdDetailsDispatch: (id) =>
    dispatch(LandlordsGetIdActions.clearLandlordsIdDetails(id)),
  updateLandlordsDispatch: (id, params) =>
    dispatch(updateLandlordsActions.updateLandlords(id, params)),
  clearLandlordUpdateDispatch: (id, params) =>
    dispatch(updateLandlordsActions.clearupdateLandlords(id, params)),
  dropzoneImageAddDispatch: (data) =>
    dispatch(UploadActions.uploadImage(data)),
  clearDropzoneImage: () =>
    dispatch(UploadActions.uploadImageError())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLandlords)