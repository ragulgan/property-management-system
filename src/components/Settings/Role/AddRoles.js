import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { RolesAddAction, RolesGetIdActions, updateRolesActions, RolesConfigActions, RolesActions } from '../../../store/actions'
import { REGEX } from '../../../utils/constants'
import { STATUS_RESPONSE, USER_MANAGEMENT_ERROR } from '../../../utils/constants'
import Modal from 'react-bootstrap/Modal';
import ReactSelect from '../../../theme/layout/components/ReactSelect'
import { setRolesEditData } from './EditRoles'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function AddRoles(props) {
  const {
    RolesAddDispatch,
    getrolesconfiglistDispatch,
    getAllConfiglist,
    RolesIdDetail,
    getRolesIdDetailsDispatch,
    saveupdateRolesResponse,
    updateRolesDispatch,
    clearRoleUpdateDispatch,
    clearrolesconfiglistDispatch,
    addRoleData,
    className,
    loading,
    page,
    limit,
    Open,
    Close,
    editId,
    getroleslistDispatch,
    clearRolesIdDetailsDispatch,
    clearRolesAddDispatch,
    setEditId,
    config,
    setConfig
  } = props
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
  const TypeOfUser = [
    {
      "value": "ROLE_ADMIN",
      "label": "Admin"
    },
    {
      "value": "ROLE_APARTMENTADMIN",
      "label": "Apartment Admin"
    },
  ]
  const currentId = editId
  const [editMode, setEditMode] = useState(false)
  const [formdata, setFormData] = useState({
    roleName: '',
    roleStatus: '',
    menus: '',
    type: ''
  })
  const [roleData, setRoleData] = useState([]);
  const [errors, setErrors] = useState({
    roleName: '',
    roleStatus: '',
    type: ''
  })
  const [selectedOptions, setSelectedOptions] = useState();
  const [status, setSelectStatus] = useState('')
  const [type, setSelectType] = useState('')
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    const errors = {}
    if (_.isEmpty(formdata.type)) {
      errors.type = USER_MANAGEMENT_ERROR.USER_TYPE_REQUIRED
      document.getElementById('type').focus()
    }
    if (_.isEmpty(formdata.roleStatus)) {
      errors.roleStatus = USER_MANAGEMENT_ERROR.STATUS_SELECT
      document.getElementById('roleStatus').focus()
    }
    if (_.isEmpty(formdata.roleName)) {
      errors.roleName = USER_MANAGEMENT_ERROR.USER_ROLE
      document.getElementById('roleName').focus()
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      const params = {
        roleName: formdata.roleName,
        roleStatus: formdata.roleStatus,
        menus: roleData,
        type: formdata.type,
        displayName: formdata.roleName
      }
      if (editMode) {
        const params = {
          roleName: formdata.roleName,
          roleStatus: formdata.roleStatus,
          menus: roleData,
          type: formdata.type,
          displayName: formdata.roleName
        }
        updateRolesDispatch(currentId, params)
      } else {
        RolesAddDispatch(params)
      }
    }
  }

  const clear = () => {
    setFormData({
      roleName: '',
      roleStatus: '',
      type: ''
    })
    setSelectStatus('')
    setSelectType('')
    setRoleData([])
  }

  useEffect(() => {
    setRoleData(getAllConfiglist && getAllConfiglist.data)
  }, [getAllConfiglist])

  const onConfirm = () => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (editMode) {
      clear()
      Close()
      clearRolesIdDetailsDispatch()
      clearRoleUpdateDispatch()
      getroleslistDispatch()
      setEditMode(false)
      setEditId("")
      getroleslistDispatch(params)
    } else {
      clear()
      Close()
      clearRolesAddDispatch()
      setConfig('')
      getroleslistDispatch(params)
    }
  }

  useEffect(() => {
    if (addRoleData && addRoleData.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: addRoleData && addRoleData.message,
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
    } else if (addRoleData && addRoleData.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: addRoleData && addRoleData.message,
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
      clearRolesAddDispatch()
    }
  }, [addRoleData])

  useEffect(() => {
    if (currentId) {
      getRolesIdDetailsDispatch(currentId)
      clearrolesconfiglistDispatch()
      setEditMode(true)
    }
  }, [currentId])

  useEffect(() => {
    if(config === 'config') {
      getrolesconfiglistDispatch()
    }
  }, [config])

  useEffect(() => {
    if (RolesIdDetail && RolesIdDetail.status === STATUS_RESPONSE.SUCCESS_MSG) {
      const userData = RolesIdDetail && RolesIdDetail.data
      const setData = setRolesEditData(userData)
      setFormData(setData)
      setRoleData(userData && userData.menus)
      const status = userData.roleStatus
      if (status) {
        const selOption = SelectStatus.find((x) => x.value === status)
        if (selOption) {
          setSelectStatus(selOption)
          setFormData((values) => ({ ...values, roleStatus: status }))
        }
      }
      const type = userData.type
      if (type) {
        const selOption = TypeOfUser.find((x) => x.value === type)
        if (selOption) {
          setSelectType(selOption)
          setFormData((values) => ({ ...values, type: type }))
        }
      }
    }
  }, [RolesIdDetail])

  useEffect(() => {
    if (saveupdateRolesResponse && saveupdateRolesResponse.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: saveupdateRolesResponse && saveupdateRolesResponse.message,
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
    } else if (saveupdateRolesResponse && saveupdateRolesResponse.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: saveupdateRolesResponse && saveupdateRolesResponse.message,
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
      clearRoleUpdateDispatch()
    }
  }, [saveupdateRolesResponse])

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectStatus(selectedOption)
      setFormData(values => ({ ...values, roleStatus: selectedOption.value }))
      setErrors({ ...errors, roleStatus: "" });
    } else {
      setSelectStatus();
      setFormData((values) => ({ ...values, roleStatus: "" }));
    }
  }

  const handleChangeSelectType = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectType(selectedOption)
      setFormData(values => ({ ...values, type: selectedOption.value }))
      setErrors({ ...errors, type: "" });
    } else {
      setSelectType();
      setFormData((values) => ({ ...values, type: "" }));
    }
  }

  const handleCheckBox = (e, index) => {
    if (e.target.checked === true) {
      setRoleData(roleData?.map((item, i) =>
        i === index
          ? {
            ...item,
            [e.target.name]: true
          }
          : item
      ))
    } else if (e.target.checked === false) {
      setRoleData(roleData?.map((item, i) =>
        i === index
          ? {
            ...item,
            [e.target.name]: false
          }
          : item
      ))
    }
  }

  return (
    <Modal show={Open} onHide={() => { onConfirm() }}
      className='role-setting-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>{editMode ? 'Update' : 'Add'} Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row px-15'>
          <div className='col-sm-13'>
            <div className='row mt-2'>
              <div className='col-sm-4'>
                <label className="required form-label">Enter role name</label>
                <input
                  placeholder='Enter role name'
                  className='form-control form-control-lg ps-4 placeHolder'
                  onChange={(e) => handleChange(e)}
                  value={formdata.roleName || ''}
                  type='text'
                  name='roleName'
                  id='roleName'
                  onKeyPress={(e) => {
                    const regex = REGEX.TEXT
                    if (!regex.test(e.key) || formdata.roleName.length >= 20) {
                      e.preventDefault();
                    }
                  }}
                  autoComplete='off' />
                {errors.roleName && (
                  <div className='fv-plugins-message-container text-danger mb-4'>
                    <span role='alert text-danger'>{errors.roleName}</span>
                  </div>
                )}
              </div>
              <div className='col-lg-4'>
                <label className='form-label required'>
                  Select Status
                </label>
                <div className='col-lg-11'>
                  <ReactSelect
                    isMulti={false}
                    name='status'
                    id='roleStatus'
                    className='select2'
                    placeholder="Status"
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={SelectStatus}
                    value={status}
                  // isDisabled={!IndidualOption}
                  />

                  {errors.roleStatus && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.roleStatus}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-4'>
                <label className='form-label required'>
                  Type
                </label>
                <div className='col-lg-11'>
                  <ReactSelect
                    isMulti={false}
                    name='type'
                    id='type'
                    className='select2'
                    placeholder="Type"
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectType}
                    options={TypeOfUser}
                    value={type}
                  />
                  {errors.type && (
                    <div className='fv-plugins-message-container text-danger mb-4'>
                      <span role='alert text-danger'>{errors.type}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
          <div className={`card ${className} position-relative`}>
            <div className='card-body py-3'>
              <div className="table-responsive">
                <table className="table border gs-2 mt-6">
                  <thead className='fw-bolder fs-6 text-gray-800'>
                    <tr className="table-head border-bottom-2 border-gray-200">
                      <th className="min-w-150px">Module</th>
                      <th className="min-w-100px text-center">visible</th>
                      <th className="min-w-100px text-center">Add</th>
                      <th className="min-w-100px text-center">Edit</th>
                      <th className="min-w-100px text-center">View</th>
                      <th className="min-w-100px text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className='fs-6 border-bottom-1'>
                    {
                      !loading
                        ? (
                          roleData ? (
                            roleData.map((data, name) => {
                              return (
                                <tr
                                  key={name}
                                >
                                  <td className="py-5 text-start">
                                    {data && data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : "--"}
                                  </td>
                                  <td className="py-5 text-center">
                                    <input
                                      type="checkbox"
                                      name='visible'
                                      className='form-check-input setting-checkbox'
                                      defaultChecked={data.visible} onChange={(e) => { handleCheckBox(e, name) }} />
                                  </td>
                                  <td className="py-5 text-center">
                                    <input 
                                      type="checkbox"
                                      name='add'
                                      className='form-check-input setting-checkbox'
                                      defaultChecked={data.add} onChange={(e) => { handleCheckBox(e, name) }} />
                                  </td>
                                  <td className="py-5 text-center">
                                    <input
                                      type="checkbox"
                                      name='edit'
                                      className='form-check-input setting-checkbox'
                                      defaultChecked={data.edit} onChange={(e) => { handleCheckBox(e, name) }} />
                                  </td>
                                  <td className="pb-0 pt-5 text-center">
                                    <input
                                      type="checkbox"
                                      name='view'
                                      className='form-check-input setting-checkbox'
                                      defaultChecked={data.view} onChange={(e) => { handleCheckBox(e, name) }} />
                                  </td>
                                  <td className="pb-0 pt-5 text-center">
                                    <input
                                      type="checkbox"
                                      name='delete'
                                      className='form-check-input setting-checkbox'
                                      defaultChecked={data.delete} onChange={(e) => { handleCheckBox(e, name) }} />
                                  </td>
                                </tr>
                              )
                            })
                          )
                            : (
                              <tr className='text-center py-3'>
                                <td colSpan='100%'>No record(s) found</td>
                              </tr>
                            )
                        )
                        :
                        (
                          <tr>
                            <td colSpan='100%' className='text-center'>
                              <div
                                className='spinner-border text-primary m-5'
                                role='status'
                              />
                            </td>
                          </tr>
                        )
                    }

                  </tbody>
                </table>
              </div>

            </div>
          </div>
          <Modal.Footer className='justify-content-center'>
            <button className='btn btn-blue-outline py-2' onClick={onConfirm}>
              Cancel
            </button>
            <button onClick={handleSubmit} className='btn btn-blue py-2'>
              {editMode ? 'Update' : 'Save'}
            </button>
          </Modal.Footer>
        </div>
      </Modal.Body>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  const { RolesAddStore, editRolessStore, updateRolesStore, dropzoneStore, RoleslistConfigStore } = state;
  return {
    getAllConfiglist: RoleslistConfigStore && RoleslistConfigStore.getAllConfigRoles ? RoleslistConfigStore.getAllConfigRoles : '',
    addRoleData: RolesAddStore && RolesAddStore.addRole ? RolesAddStore.addRole : '',
    loading: RolesAddStore && RolesAddStore.loading ? RolesAddStore.loading : false,
    RolesIdDetail: editRolessStore && editRolessStore.RolesIdDetail ? editRolessStore.RolesIdDetail : '',
    saveupdateRolesResponse: updateRolesStore && updateRolesStore.saveupdateRolesResponse ? updateRolesStore.saveupdateRolesResponse : '',
  };
};

const mapDispatchToProps = dispatch => ({
  getrolesconfiglistDispatch: (params) => dispatch(RolesConfigActions.getrolesconfiglist(params)),
  clearrolesconfiglistDispatch: (params) => dispatch(RolesConfigActions.clearrolesconfiglist(params)),
  RolesAddDispatch: (data) =>
    dispatch(RolesAddAction.RolesAdd(data)),
  clearRolesAddDispatch: (data) =>
    dispatch(RolesAddAction.clearUSER(data)),
  getRolesIdDetailsDispatch: (id) =>
    dispatch(RolesGetIdActions.getRolesIdDetails(id)),
  clearRolesIdDetailsDispatch: (id) =>
    dispatch(RolesGetIdActions.clearRolesIdDetails(id)),
  updateRolesDispatch: (id, params) =>
    dispatch(updateRolesActions.updateRoles(id, params)),
  clearRoleUpdateDispatch: (id, params) =>
    dispatch(updateRolesActions.clearupdateRoles(id, params)),
  getroleslistDispatch: (params) => dispatch(RolesActions.getroleslist(params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoles)