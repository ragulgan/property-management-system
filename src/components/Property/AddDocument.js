import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../theme/helpers'
import _ from 'lodash'
import { PropertyDocumentTypeActions, PropertyDocumentAddAction, PropertyDocumentGetIdActions, updatePropertyDocumentActions, MultifileAddActions, ImageDeleteActions } from '../../store/actions'
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
import { setPropertyDocumentTypeEditData } from './EditFormdata'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import dayjs from 'dayjs'

function AddDocument(props) {
  const {
    propertyDocAddDispatch,
    ClearPropertyDocAddDispatch,
    PropertyDocAdd,
    getPropertyDocIdDetailsDispatch,
    PropertyDocIdDetail,
    clearPropertyDocIdDetailsDispatch,
    saveupdatePropertyDocResponse,
    updatePropertyDocDispatch,
    clearPropertyDocUpdateDispatch,
    PropertyDocumentTypelists,
    getPropertyDocTypelistDispatch,
    Open,
    Close,
    editId,
    getDispatch,
    setEditId,
    propertyId,
    PropertyImageAddDispatch,
    PropertyDeleteImage,
    PropertyDocumentImage,
    clearImageAddDispatch,
    ClearPropertyDocumentImage,
    setShowImage,
    showImage,
    loading
  } = props

  const pathName = useLocation().pathname
  const url = pathName && pathName.split('/')
  const currentIdUpdate = url && url[2]
  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    upload: [],
    propertyId: '',
  })
  const [errors, setErrors] = useState({
    type: '',
    name: '',
    description: '',
  })

  const [selectedOptions, setSelectedOptions] = useState();
  const [documentTypeOption, setDocumentTypeOption] = useState()
  const [SelectedDocumentTypeOption, setSelectedDocumentTypeOption] = useState('')
  const [defaultImages, setDefaultImages] = useState([]);

  useEffect(() => {
    const params = {
      status: 'ACTIVE'
    }
    getPropertyDocTypelistDispatch(params)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(propertyId) || !_.isEmpty(currentIdUpdate)) {
      setFormData((formData) => ({
        ...formData,
        propertyId: propertyId ? propertyId : currentIdUpdate
      }))
    }
  }, [propertyId, currentIdUpdate])

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
    if (_.isEmpty(formdata.name)) {
      errors.name = PROPERTY_DOCUMENT_ERROR.PROPERTY_DOC_NAME
      document.getElementById('name').focus()
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
        propertyDocAddDispatch(formdata)
      }
    }
  }

  const onConfirmupdate = () => {
    updatePropertyDocDispatch(currentId, formdata)
  }

  const clear = () => {
    setFormData({
      ...formdata,
      name: '',
      description: '',
      upload: [],
      type: '',
    })
    setSelectedDocumentTypeOption('')
    setDefaultImages([])
    setShowImage(false)
  }

  const onConfirm = () => {
    if (editMode) {
      clear()
      clearPropertyDocIdDetailsDispatch()
      Close()
      setEditMode(false)
      clearImageAddDispatch()
      setEditId("")
    } else {
      clear()
      Close()
      clearImageAddDispatch()
    }
  }
  const Idparams = {
    propertyId: propertyId ? propertyId : currentIdUpdate
  }
  useEffect(() => {
    if (PropertyDocAdd && PropertyDocAdd.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: PropertyDocAdd && PropertyDocAdd.message,
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
      ClearPropertyDocAddDispatch()
      getDispatch(Idparams)
    } else if (PropertyDocAdd && PropertyDocAdd.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: PropertyDocAdd && PropertyDocAdd.message,
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
      ClearPropertyDocAddDispatch()
    }
  }, [PropertyDocAdd])

  useEffect(() => {
    if (PropertyDocumentImage.code === 200 && showImage) {
      const imageData = [{
        displayName: PropertyDocumentImage && PropertyDocumentImage.data && PropertyDocumentImage.data[0].displayName,
        filePath: PropertyDocumentImage && PropertyDocumentImage.data && PropertyDocumentImage.data[0].filePath,
        id: PropertyDocumentImage && PropertyDocumentImage.data && PropertyDocumentImage.data[0].id,
        type: PropertyDocumentImage && PropertyDocumentImage.data && PropertyDocumentImage.data[0].type
      }]
      setFormData({ ...formdata, upload: imageData })
      setDefaultImages(imageData)
    }
  }, [PropertyDocumentImage]);

  useEffect(() => {
    if (currentId) {
      getPropertyDocIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])


  useEffect(() => {
    if (saveupdatePropertyDocResponse && saveupdatePropertyDocResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdatePropertyDocResponse && saveupdatePropertyDocResponse.message,
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
      clearPropertyDocUpdateDispatch()
      clearPropertyDocIdDetailsDispatch()
      getDispatch(Idparams)
    } else if (saveupdatePropertyDocResponse && saveupdatePropertyDocResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdatePropertyDocResponse && saveupdatePropertyDocResponse.message,
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
      clearPropertyDocUpdateDispatch()
    }
  }, [saveupdatePropertyDocResponse])

  const handleChangeDocument = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedDocumentTypeOption(selectedOption)
      setFormData(values => ({ ...values, type: selectedOption.value }))
      setErrors({ ...errors, type: "" });
    } else {
      setSelectedDocumentTypeOption();
      setFormData((values) => ({ ...values, type: "" }));
    }
  }

  useEffect(() => {
    const data = PropertyDocumentTypelists && PropertyDocumentTypelists.data
    const documentType = getDefaultOptions(data)
    setDocumentTypeOption(documentType)
  }, [PropertyDocumentTypelists])

  const getDefaultOptions = (documentType) => {
    const defaultOptions = []
    for (const item in documentType) {
      defaultOptions.push({ label: documentType[item].propertyDocumentType, value: documentType[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    if (PropertyDocIdDetail && PropertyDocIdDetail.status === "ok") {
      const data = setPropertyDocumentTypeEditData(PropertyDocIdDetail.data)
      setFormData(data)
      setDefaultImages(PropertyDocIdDetail && PropertyDocIdDetail.data && PropertyDocIdDetail.data.upload)
      const userDetils = PropertyDocIdDetail && PropertyDocIdDetail.data
      const type = userDetils.type
      if (type && type.id) {
        const datas = getDefaultOptions(PropertyDocumentTypelists && PropertyDocumentTypelists.data)
        const selOption = datas.find((x) => x.value === type.id)
        if (selOption) {
          setSelectedDocumentTypeOption([selOption])
          setFormData((values) => ({ ...values, type: type.id }))
        }
      }
    }
  }, [PropertyDocIdDetail, editMode])

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
    PropertyImageAddDispatch(data, 'PropertyDocument');

  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, upload: updatedImages })
    PropertyDeleteImage(id)
  }

  return (
    <Modal show={Open} onHide={onConfirm} className='landlord-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{currentId ? 'Update' : 'Add'} Flat Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row px-15 mb-5 justify-content-between align-items-center'>
          <div className='col-sm-3'>
            Document Type
          </div>
          <div className='col-sm-8'>
            <ReactSelect
              placeholder="Select Document Type"
              isMulti={false}
              name='type'
              id='type'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChangeDocument}
              options={documentTypeOption}
              value={SelectedDocumentTypeOption}
              isDisabled={!documentTypeOption}
            />
            {errors && errors.type && (
              <div className="rr mt-1">
                <style>{".rr{color:red}"}</style>
                {errors.type}
              </div>
            )}
          </div>
        </div>
        <div className='row px-15 mb-5 justify-content-between align-items-center'>
          <div className='col-sm-3'>
            Document Name
          </div>
          <div className='col-sm-8'>
            <input
              placeholder='Document Name'
              className='form-control form-control-lg'
              onChange={(e) => handleChange(e)}
              value={formdata.name || ''}
              type='text'
              name='name'
              id='name'
              autoComplete='off'
              onKeyPress={(e) => {
                const regex = REGEX.TEXT;
                if (!regex.test(e.key) || formdata.name.length >= 30) {
                  e.preventDefault();
                }
              }}
            />
            {errors.name && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.name}</span>
              </div>
            )}
          </div>
        </div>
        <div className='row px-15 mb-5 justify-content-between align-items-center'>
          <div className='col-sm-3'>
            Description
          </div>
          <div className='col-sm-8'>
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
            {errors.description && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.description}</span>
              </div>
            )}
          </div>
        </div>
        <div className='row px-15 mb-5 justify-content-between align-items-center'>
          <div className='col-sm-3'>
            Upload
          </div>
          <div className="col-sm-8">
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
          {currentId ? 'Update' : 'Save'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  const { PropertyDocumentTypelistStore, PropertyDocAddStore, editPropertyDocStore, updatePropertyDocStore, MultifileAddStore } = state;
  return {
    PropertyDocAdd: PropertyDocAddStore && PropertyDocAddStore.PropertyDocAdd ? PropertyDocAddStore.PropertyDocAdd : '',
    PropertyDocIdDetail: editPropertyDocStore && editPropertyDocStore.PropertyDocIdDetail ? editPropertyDocStore.PropertyDocIdDetail : '',
    saveupdatePropertyDocResponse: updatePropertyDocStore && updatePropertyDocStore.saveupdatePropertyDocResponse ? updatePropertyDocStore.saveupdatePropertyDocResponse : '',
    PropertyDocumentTypelists: PropertyDocumentTypelistStore && PropertyDocumentTypelistStore.getAllPropertyDocumentType ? PropertyDocumentTypelistStore.getAllPropertyDocumentType : '',
    PropertyDocumentImage: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false
  };
};

const mapDispatchToProps = dispatch => ({
  getPropertyDocTypelistDispatch: (data) =>
    dispatch(PropertyDocumentTypeActions.getpropertyDocumentTypelist(data)),
  propertyDocAddDispatch: (data) =>
    dispatch(PropertyDocumentAddAction.PropertyDocAdd(data)),
  ClearPropertyDocAddDispatch: () =>
    dispatch(PropertyDocumentAddAction.clearPropertyDoc()),
  getPropertyDocIdDetailsDispatch: (id) =>
    dispatch(PropertyDocumentGetIdActions.getPropertyDocIdDetails(id)),
  clearPropertyDocIdDetailsDispatch: () =>
    dispatch(PropertyDocumentGetIdActions.clearPropertyDocIdDetails()),
  updatePropertyDocDispatch: (id, params) =>
    dispatch(updatePropertyDocumentActions.updatePropertyDoc(id, params)),
  clearPropertyDocUpdateDispatch: () =>
    dispatch(updatePropertyDocumentActions.clearupdatePropertyDoc()),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  clearImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  PropertyDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  ClearPropertyDocumentImage: () =>
    dispatch(ImageDeleteActions.clear()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDocument)