import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../theme/helpers'
import _ from 'lodash'
import { LeaseDocumentActions, LeaseDocumentListAddAction, LeaseDocumentListGetIdActions, updateLeaseDocumentListActions, MultifileAddActions, ImageDeleteActions } from '../../store/actions'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, PROPERTY_DOCUMENT_ERROR, PROPERTY_MANAGEMENT_ERROR, REGEX, IMAGE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { Link, useLocation, useHistory } from 'react-router-dom'
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx'
import { DateSelector } from '../../theme/layout/components/DateSelector'
import { toAbsoluteUrl } from '../../theme/helpers'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { setLeaseDocumentTypeEditData } from './EditFormdata'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import dayjs from 'dayjs'

function AddLeaseDocument(props) {
  const {
    leaseDocAddDispatch,
    ClearLeaseDocAddDispatch,
    LeaseDocAdd,
    getLeaseDocIdDetailsDispatch,
    LeaseDocIdDetail,
    clearLeaseDocIdDetailsDispatch,
    saveupdateLeaseDocResponse,
    updateLeaseDocDispatch,
    clearLeaseDocUpdateDispatch,
    LeaseDocumentTypelists,
    getLeaseDocTypelistDispatch,
    Open,
    Close,
    editId,
    getDispatch,
    setEditId,
    leaseId,
    LeaseImageAddDispatch,
    LeaseImageAddClear,
    LeaseFileUpload,
    LeaseDeleteImage,
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
    leaseId: '',
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
      status: "ACTIVE"
    }
    getLeaseDocTypelistDispatch(params)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(leaseId) || !_.isEmpty(currentIdUpdate)) {
      setFormData((formData) => ({
        ...formData,
        leaseId: leaseId ? leaseId : currentIdUpdate
      }))
    }
  }, [leaseId, currentIdUpdate])

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
        leaseDocAddDispatch(formdata)
      }
    }
  }
  const onConfirmupdate = () => {
    updateLeaseDocDispatch(currentId, formdata)
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
  }

  const onConfirm = () => {
    if (editMode) {
      clear()
      clearLeaseDocIdDetailsDispatch()
      Close()
      setEditMode(false)
      setEditId("")
      LeaseImageAddClear()
    } else {
      clear()
      Close()
      LeaseImageAddClear()
    }
  }
  const Idparams = {
    leaseId: leaseId ? leaseId : currentIdUpdate
  }
  useEffect(() => {
    if (LeaseDocAdd && LeaseDocAdd.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: LeaseDocAdd && LeaseDocAdd.message,
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
      ClearLeaseDocAddDispatch()
      getDispatch(Idparams)
    } else if (LeaseDocAdd && LeaseDocAdd.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: LeaseDocAdd && LeaseDocAdd.message,
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
      ClearLeaseDocAddDispatch()
    }
  }, [LeaseDocAdd])

  useEffect(() => {
    if (LeaseFileUpload.code === 200) {
      const imageData = [{
        displayName: LeaseFileUpload && LeaseFileUpload.data && LeaseFileUpload.data[0].displayName,
        filePath: LeaseFileUpload && LeaseFileUpload.data && LeaseFileUpload.data[0].filePath,
        id: LeaseFileUpload && LeaseFileUpload.data && LeaseFileUpload.data[0].id,
        type: LeaseFileUpload && LeaseFileUpload.data && LeaseFileUpload.data[0].type
      }]
      setFormData({ ...formdata, upload: imageData })
      setDefaultImages(imageData)
    }
  }, [LeaseFileUpload]);

  useEffect(() => {
    if (currentId) {
      getLeaseDocIdDetailsDispatch(currentId)
      setEditMode(true)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    if (saveupdateLeaseDocResponse && saveupdateLeaseDocResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateLeaseDocResponse && saveupdateLeaseDocResponse.message,
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
      clearLeaseDocUpdateDispatch()
      clearLeaseDocIdDetailsDispatch()
      getDispatch(Idparams)
    } else if (saveupdateLeaseDocResponse && saveupdateLeaseDocResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateLeaseDocResponse && saveupdateLeaseDocResponse.message,
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
      clearLeaseDocUpdateDispatch()
    }
  }, [saveupdateLeaseDocResponse])

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
    const data = LeaseDocumentTypelists && LeaseDocumentTypelists.data
    const documentType = getDefaultOptions(data)
    setDocumentTypeOption(documentType)
  }, [LeaseDocumentTypelists])

  const getDefaultOptions = (documentType) => {
    const defaultOptions = []
    for (const item in documentType) {
      defaultOptions.push({ label: documentType[item].leaseDocumentType, value: documentType[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    if (LeaseDocIdDetail && LeaseDocIdDetail.status === "ok") {
      const data = setLeaseDocumentTypeEditData(LeaseDocIdDetail.data)
      setFormData(data)
      setDefaultImages(LeaseDocIdDetail && LeaseDocIdDetail.data && LeaseDocIdDetail.data.upload)
      const userDetils = LeaseDocIdDetail && LeaseDocIdDetail.data
      const type = userDetils.type
      if (type && type.id) {
        const datas = getDefaultOptions(LeaseDocumentTypelists && LeaseDocumentTypelists.data)
        const selOption = datas.find((x) => x.value === type.id)
        if (selOption) {
          setSelectedDocumentTypeOption([selOption])
          setFormData((values) => ({ ...values, type: type.id }))
        }
      }
    }
  }, [LeaseDocIdDetail, editMode])

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
    LeaseImageAddDispatch(data, 'LeaseDocument');

  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, upload: updatedImages })
    LeaseDeleteImage(id)
  }

  return (
    <Modal show={Open} onHide={onConfirm} className='landlord-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{currentId ? 'Update' : 'Add'} Lease Document</Modal.Title>
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
                placeholder='Enter Password'
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
                onClick={handelUpload}>
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
                  : null}
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
  const { LeaseDocumentlistStore, LeaseDocAddStore, editLeasesDocStore, updateLeaseDocStore, MultifileAddStore } = state;
  return {
    LeaseDocAdd: LeaseDocAddStore && LeaseDocAddStore.LeaseDocAdd ? LeaseDocAddStore.LeaseDocAdd : '',
    LeaseDocIdDetail: editLeasesDocStore && editLeasesDocStore.LeaseDocIdDetail ? editLeasesDocStore.LeaseDocIdDetail : '',
    saveupdateLeaseDocResponse: updateLeaseDocStore && updateLeaseDocStore.saveupdateLeaseDocResponse ? updateLeaseDocStore.saveupdateLeaseDocResponse : '',
    LeaseDocumentTypelists: LeaseDocumentlistStore && LeaseDocumentlistStore.getAllLease ? LeaseDocumentlistStore.getAllLease : '',
    LeaseFileUpload: MultifileAddStore && MultifileAddStore.PropertyAdd ? MultifileAddStore.PropertyAdd : [],
    loading: MultifileAddStore && MultifileAddStore.loading ? MultifileAddStore.loading : false


  };
};

const mapDispatchToProps = dispatch => ({
  getLeaseDocTypelistDispatch: (data) =>
    dispatch(LeaseDocumentActions.getleaselist(data)),
  leaseDocAddDispatch: (data) =>
    dispatch(LeaseDocumentListAddAction.LeaseDocAdd(data)),
  ClearLeaseDocAddDispatch: () =>
    dispatch(LeaseDocumentListAddAction.clearLeaseDoc()),
  getLeaseDocIdDetailsDispatch: (id) =>
    dispatch(LeaseDocumentListGetIdActions.getLeaseDocIdDetails(id)),
  clearLeaseDocIdDetailsDispatch: () =>
    dispatch(LeaseDocumentListGetIdActions.clearLeaseDocIdDetails()),
  updateLeaseDocDispatch: (id, params) =>
    dispatch(updateLeaseDocumentListActions.updateLeaseDoc(id, params)),
  clearLeaseDocUpdateDispatch: () =>
    dispatch(updateLeaseDocumentListActions.clearupdateLeaseDoc()),
  LeaseImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  LeaseImageAddClear: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  LeaseDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLeaseDocument)