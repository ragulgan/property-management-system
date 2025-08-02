import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../theme/helpers'
import _ from 'lodash'
import { RequestListAddTypes, RequestListAddAction, RequestListGetIdActions, updateRequestListActions, MultifileAddActions, ImageDeleteActions } from '../../store/actions'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, PROPERTY_DOCUMENT_ERROR, PROPERTY_MANAGEMENT_ERROR, IMAGE, REGEX } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { Link, useLocation, useHistory } from 'react-router-dom'
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx'
import { DateSelector } from '../../theme/layout/components/DateSelector'
import { toAbsoluteUrl } from '../../theme/helpers'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { setRequestEditData } from './EditFormRequestData'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import dayjs from 'dayjs'

function AddRequests(props) {
  const {
    RequestAddDispatch,
    ClearRequestAddDispatch,
    RequestListAdd,
    getRequestIdDetailsDispatch,
    RequestListIdDetail,
    clearRequestIdDetailsDispatch,
    saveupdateRequestListResponse,
    updateRequestDispatch,
    clearRequestUpdateDispatch,
    getAllRequestList,
    // getPropertyDocTypelistDispatch,
    Open,
    Close,
    editId,
    getDispatch,
    setEditId,
    // propertyId,
    RequestImageAddDispatch,
    RequestDeleteImage,
    RequestImage,
    clearImageAddDispatch,
    ClearRequestImage,
    // setShowImage,
    showImage,
    loading
  } = props

  // const pathName = useLocation().pathname
  // const url = pathName && pathName.split('/')
  // const currentIdUpdate = url && url[2]
  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    type: '',
    description: '',
    upload: [],
    // propertyId: '',
  })
  const [errors, setErrors] = useState({
    type: '',
    description: '',
  })

  const [selectedOptions, setSelectedOptions] = useState();
  const [requestTypeOption, setRequestTypeOption] = useState()
  const [SelectedRequestTypeOption, setSelectedRequestTypeOption] = useState('')
  const [defaultImages, setDefaultImages] = useState([]);

  // useEffect(() => {
  //   const params = {
  //     status: 'ACTIVE'
  //   }
  //   getPropertyDocTypelistDispatch(params)
  // }, [])

  // useEffect(() => {
  //   if (!_.isEmpty(propertyId) || !_.isEmpty(currentIdUpdate)) {
  //     setFormData((formData) => ({
  //       ...formData,
  //       propertyId: propertyId ? propertyId : currentIdUpdate
  //     }))
  //   }
  // }, [propertyId, currentIdUpdate])

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    const errors = {}
    // if (_.isEmpty(formdata.upload)) {
    //   errors.upload = PROPERTY_MANAGEMENT_ERROR.DOCUMENT_UPLOAD
    //   document.getElementById('upload').focus()
    // }
    if (_.isEmpty(formdata.description)) {
      errors.description = PROPERTY_DOCUMENT_ERROR.PROPERTY_DOC_DES
      document.getElementById('description').focus()
    }
    if (_.isEmpty(formdata.type)) {
      errors.type = PROPERTY_DOCUMENT_ERROR.PROPERTY_DOC_TYPE
      document.getElementById('type').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      }
      else {
        RequestAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updateRequestDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      ...formdata,
      description: '',
      upload: [],
      type: '',
    })
    setSelectedRequestTypeOption('')
    setDefaultImages([])
    // setShowImage(false)
  }

  const onConfirm = () => {
    if (editMode) {
      clear()
      clearRequestIdDetailsDispatch()
      Close()
      setEditMode(false)
      clearImageAddDispatch()
      setEditId("")
    } else {
      clear()
      Close()
      clearImageAddDispatch()
      ClearRequestAddDispatch()

    }
  }
  // const Idparams = {
  //   propertyId: propertyId ? propertyId : currentIdUpdate
  // }
  useEffect(() => {
    if (RequestListAdd && RequestListAdd.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: RequestListAdd && RequestListAdd.message,
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
      // getDispatch(Idparams)
    } else if (RequestListAdd && RequestListAdd.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: RequestListAdd && RequestListAdd.message,
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
      ClearRequestAddDispatch()
    }
  }, [RequestListAdd])

  useEffect(() => {
    if (RequestImage.code === 200 && showImage) {
      const imageData = [{
        displayName: RequestImage && RequestImage.data && RequestImage.data[0].displayName,
        filePath: RequestImage && RequestImage.data && RequestImage.data[0].filePath,
        id: RequestImage && RequestImage.data && RequestImage.data[0].id,
        type: RequestImage && RequestImage.data && RequestImage.data[0].type
      }]
      setFormData({ ...formdata, upload: imageData })
      setDefaultImages(imageData)
    }
  }, [RequestImage]);

  useEffect(() => {
    if (currentId) {
      getRequestIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])


  useEffect(() => {
    if (saveupdateRequestListResponse && saveupdateRequestListResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateRequestListResponse && saveupdateRequestListResponse.message,
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
      clearRequestUpdateDispatch()
      clearRequestIdDetailsDispatch()
      // getDispatch(Idparams)
    } else if (saveupdateRequestListResponse && saveupdateRequestListResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateRequestListResponse && saveupdateRequestListResponse.message,
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
      clearRequestUpdateDispatch()
    }
  }, [saveupdateRequestListResponse])

  const handleChangeRequest = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedRequestTypeOption(selectedOption)
      setFormData(values => ({ ...values, type: selectedOption.value }))
      setErrors({ ...errors, type: "" });
    } else {
      setSelectedRequestTypeOption();
      setFormData((values) => ({ ...values, type: "" }));
    }
  }

  useEffect(() => {
    const data = getAllRequestList && getAllRequestList.data
    const documentType = getDefaultOptions(data)
    setRequestTypeOption(documentType)
  }, [getAllRequestList])

  const getDefaultOptions = (documentType) => {
    const defaultOptions = []
    for (const item in documentType) {
      defaultOptions.push({ label: documentType[item].propertyDocumentType, value: documentType[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    if (RequestListIdDetail && RequestListIdDetail.status === "ok") {
      const data = setRequestEditData(RequestListIdDetail.data)
      setFormData(data)
      setDefaultImages(RequestListIdDetail && RequestListIdDetail.data && RequestListIdDetail.data.upload)
      const userDetils = RequestListIdDetail && RequestListIdDetail.data
      const type = userDetils.type
      if (type && type.id) {
        const datas = getDefaultOptions(getAllRequestList && getAllRequestList.data)
        const selOption = datas.find((x) => x.value === type.id)
        if (selOption) {
          setSelectedRequestTypeOption([selOption])
          setFormData((values) => ({ ...values, type: type.id }))
        }
      }
    }
  }, [RequestListIdDetail, editMode])

  const handelUpload = (e) => {
    document.getElementById('upload').click(e)
  }

  const fileUpload = (e) => {
    const files = e.target.files;
    const uploadArray = []
    for (var i = 0; i < files.length; i++) {
      uploadArray.push(files[i]);
    }
    const data = new FormData();
    const length = uploadArray.length
    for (let i = 0; i < length; i++) {
      data.append('file', uploadArray[i]);
    }
    RequestImageAddDispatch(data, 'PropertyDocument');

  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, upload: updatedImages })
    RequestDeleteImage(id)
  }

  return (
    <Modal show={Open} onHide={onConfirm} className='setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100 landlord-size'>{editMode ? 'Update' : 'Create'} Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='px-15 pb-15'>
          <div className='mt-2'>
            <label className="required form-label">Request Type</label>
            <ReactSelect
              placeholder="Select Request Type"
              isMulti={false}
              name='type'
              id='type'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeRequest}
              options={requestTypeOption}
              value={SelectedRequestTypeOption}
              isDisabled={!requestTypeOption}
            />
          </div>
          {errors && errors.type && (
            <div className="rr mt-1">
              <style>{".rr{color:red}"}</style>
              {errors.type}
            </div>
          )}
          <div className='mt-3'>
            <label className="required form-label">
              Description
            </label>
            <textarea
              placeholder='Add a descriptions'
              className='form-control form-control-lg'
              onChange={(e) => handleChange(e)}
              value={formdata.description || ''}
              type='text'
              name='description'
              id='description'
              autoComplete='off'
              rows={2}
              onKeyPress={(e) => {
                if (formdata.description.length >= 150) {
                  e.preventDefault()
                }
              }}
            />
          </div>
          {errors.description && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.description}</span>
            </div>
          )}
          <div className='mt-3'>
            <label className='mb-3 form-label required'>
              Upload
            </label>
            <div className='d-flex justify-content-between align-items-center border border-1 rounded-3 mb-2 p-1'>
              <span className='pl-2'>Choose File</span>
              <input
                className='form-control form-control-lg d-none'
                onChange={(e) => {
                  {
                    fileUpload(e)
                    e.target.value = null
                  }
                }}
                type='file'
                name='upload'
                autoComplete='off'
                id='upload'
              />
              <span className="btn btn-grey p-2"
                onClick={handelUpload}
              >
                <span className='mr-1'>
                  <i className="bi bi-file-earmark-plus fs-3 icon-color"></i>
                </span>
                Upload
              </span>
              {/* {errors.upload && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert text-danger'>{errors.upload}</span>
                </div>
              )} */}
            </div>
            <div className='text-muted'>Note: please upload pdf, doc format only- Max file size 5MB </div>
            {
              loading ?
                <div colSpan='100%' className='text-center'>
                  <div
                    className='spinner-border text-primary m-5'
                    role='status'
                  />
                </div>
                :
                defaultImages && defaultImages.length > 0 ?
                  defaultImages.map((image) => (
                    <div className='mt-2 preview-multiple-img px-5 py-2 d-flex align-items-center justify-content-between'>
                      <img
                        src={toAbsoluteUrl(`/media/avatars/preview-image/${IMAGE[image && image.type]}`)}
                        alt="Profile picture"
                        style={{ borderRadius: '50%' }}
                        width='28px'
                        height='28px'
                      />
                      <div className='w-50'>
                        <div className='preview-mutiple-name w-100'>{image.displayName}</div>
                        <div className='preview-mutiple-date'>{dayjs(image.createdDate).format('DD MMM,YYYY')}</div>
                      </div>
                      <div className='preview-mutiple-date'>{image.size}</div>
                      <button className='btn btn-outline p-0' onClick={() => handleImageDelete(image._id ? image._id : image.id)}><i class="bi bi-x fs-2"></i></button>
                    </div>
                  ))
                  : null
            }

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
  const { RequestListlistStore, RequestListAddStore, editRequestListStore, updateRequestListStore, MultifileAddStore } = state;
  return {
    RequestListAdd: RequestListAddStore && RequestListAddStore.RequestListAdd ? RequestListAddStore.RequestListAdd : '',
    RequestListIdDetail: editRequestListStore && editRequestListStore.RequestListIdDetail ? editRequestListStore.RequestListIdDetail : '',
    saveupdateRequestListResponse: updateRequestListStore && updateRequestListStore.saveupdateRequestListResponse ? updateRequestListStore.saveupdateRequestListResponse : '',
    getAllRequestList: RequestListlistStore && RequestListlistStore.getAllRequestList ? RequestListlistStore.getAllRequestList : '',
    RequestImage: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false
  };
};

const mapDispatchToProps = dispatch => ({
  // getPropertyDocTypelistDispatch: (data) =>
  //   dispatch(RequestListAddTypes.getpropertyDocumentTypelist(data)),
  RequestAddDispatch: (data) =>
    dispatch(RequestListAddAction.RequestListAdd(data)),
  ClearRequestAddDispatch: (data) =>
    dispatch(RequestListAddAction.clearRequestList(data)),
  getRequestIdDetailsDispatch: (id) =>
    dispatch(RequestListGetIdActions.getRequestListIdDetails(id)),
  clearRequestIdDetailsDispatch: () =>
    dispatch(RequestListGetIdActions.clearRequestListIdDetails()),
  updateRequestDispatch: (id, params) =>
    dispatch(updateRequestListActions.updateRequestList(id, params)),
  clearRequestUpdateDispatch: () =>
    dispatch(updateRequestListActions.clearupdateRequestList()),
  RequestImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  clearImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  RequestDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  ClearRequestImage: () =>
    dispatch(ImageDeleteActions.clear()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRequests)