import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { getLocalStorage, unsetLocalStorage, removeLocalStorage } from '../../utils/helper';
import { STATUS_BADGE, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE, SESSION, REGEX, DATE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { UsersActions, UserdeleteActions } from '../../store/actions'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { DateSelector } from '../../theme/layout/components/DateSelector';
import dayjs from 'dayjs'

function UserList(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getUserlistDispatch,
    className,
    KYClists,
    loading,
    getAllUsers,
    deleteDispatch,
    Userdelete,
    clearUserDelete,
  } = props
  const didMount = React.useRef(false);
  const [limit, setLimit] = useState(10)
  const [activePageNumber, setActivePageNumber] = useState(1)
  const history = useHistory()
  const [staffId, setStaffId] = useState('')
  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [status, setStatus] = useState('')
  const [emp, setEmp] = useState('')
  const [page, setPage] = useState(1)
  const SuccessMsg = getLocalStorage(SESSION.AUTH_SUCCESS)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const StaffSelectStatus = [
    {
      "value": "",
      "label": "All"
    },
    {
      "value": "ACTIVE",
      "label": "Active"
    },
    {
      "value": "INACTIVE",
      "label": "Inactive"
    }
  ]

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    const pageNumber = event.selected + 1
    const params = {
      limit: limit,
      pageNo: pageNumber,
      userId: emp && staffId && staffId.length > 0 ? 'EMP' + staffId : '',
      name: name,
      officialMailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
      type:"ADMIN"
    }
    setActivePageNumber(pageNumber)
    getUserlistDispatch(params)
  }

  const totalPages =
    getAllUsers && getAllUsers.count
      ? Math.ceil(parseInt(getAllUsers && getAllUsers.count) / limit)
      : 1

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  })

  const onEditItem = (id) => {
    history.push(`/edit-user/${id}`)
  }


  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  const onConfirmRedirect = () => {
    clearUserDelete()
    history.push('/users-management')
  }
  const onDeleteItemUser = (id) => {
    confirmationAlert(
      SWEET_ALERT_MSG.CONFIRMATION_TEXT_DELETE,
      SWEET_ALERT_MSG.DELETE,
      'warning',
      'Yes',
      'No',
      () => { onConfirmDelete(id) },
      () => { }
    )
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      type:"ADMIN"
    }
    if (Userdelete && Userdelete.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: Userdelete && Userdelete.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22bb33",
        },
      }).showToast();
      onConfirmRedirect()
      getUserlistDispatch(params)
    } else if (Userdelete && Userdelete.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: Userdelete && Userdelete.message,
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
      onConfirmRedirect()
    }
  }, [Userdelete])

  useEffect(() => {
    if (SuccessMsg) {
      Toastify({
        text: 'Successfully Logged in.',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22bb33",
        },
      }).showToast();
      setTimeout(() => {
        removeLocalStorage(SESSION.AUTH_SUCCESS)
      }, 3000);
    }
  }, [SuccessMsg])

  const handleShow = () => {
    history.push('/add-user')
  }

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      userId: emp && staffId && staffId.length > 0 ? 'EMP' + staffId : '',
      name: name,
      officialMailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
      type:"ADMIN"

    }
    getUserlistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      userId: emp && staffId && staffId.length > 0 ? 'EMP' + staffId : '',
      name: name,
      officialMailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
      type:"ADMIN"
    }
    getUserlistDispatch(params)
  }, [staffId, name, status, emailId, phoneNo, fromDate, toDate])

  const handleChangeStaffId = (e) => {
    setStaffId(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmailId = (e) => {
    setEmailId(e.target.value)
  }

  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value)
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption)
    }
  }

  const handleReset = () => {
    const params = {
      limit: limit,
      pageNo: page,
      type:"ADMIN"
    }
    setStaffId('')
    setName('')
    setEmailId('')
    setPhoneNo('')
    setStatus('')
    setFromDate('')
    setToDate('')
    getUserlistDispatch(params)
    setEmp(false)
  }

  return (
    <>
      <div className='mb-5 row align-items-center'>
        <div className='col-sm-6'>
          <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Staff</h4>
        </div>
        <div className="col-sm-6 text-end">
          {Roles && Roles.user && Roles.user.add ?
            <Link className='btn btn-lg btn-blue list-add-button  px-3 py-2' onClick={handleShow} to="/add-user">
              <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Staff
            </Link> : null}
        </div>
      </div>
      <div className={`card ${className} position-relative`}>
        <div className='card-body py-3'>
          <div className='row px-6 pt-6 g-2 align-items-center'>
            <div className='col-lg-12 col-xxl-10'>
              <div className='row align-items-center g-2'>
                <div className='col-sm-2 col-xxl-2 position-relative'>
                  {emp ?
                    <span className='position-absolute top-25 ms-5 fs-5 fw-bold'>EMP
                    </span> : null}
                  <input
                    placeholder={emp ? '' : 'Staff Id'}
                    className={emp ? 'form-control ps-14 form-control-lg placeHolder' : 'form-control form-control-lg placeHolder'}
                    onChange={handleChangeStaffId}
                    type='text'
                    name='staffId'
                    value={staffId}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.NUMERIC_THREE_DIGITS;
                      if (!regex.test(e.key) || staffId.length >= 3) {
                        e.preventDefault();
                      }
                    }}
                    onClick={() => setEmp(true)}
                    onBlur={staffId && staffId.length > 0 ? () => setEmp(true) : () => setEmp(false)}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <input
                    placeholder='Name'
                    className='form-control form-control-lg placeHolder'
                    onChange={handleName}
                    type='text'
                    name='name'
                    value={name}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.TEXT;
                      if (!regex.test(e.key) || name.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <input
                    placeholder='Email Id'
                    className='form-control form-control-lg placeHolder'
                    onChange={handleEmailId}
                    type='text'
                    name='emailId'
                    value={emailId}
                    autoComplete='off'
                  // onKeyPress={(e) => {
                  //   const regex = REGEX.EMAIL;
                  //   const isValidKey = regex.test(String.fromCharCode(e.which || e.keyCode));
                  //   const isMaxLengthReached = emailId.length >= 30;

                  //   if (isMaxLengthReached) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <input
                    placeholder='Phone'
                    className='form-control form-control-lg placeHolder'
                    onChange={handlePhoneNo}
                    type='text'
                    name='mobileNumber'
                    value={phoneNo}
                    autoComplete='off'
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
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <DateSelector
                    className='date-picker'
                    name='fromDate'
                    views={['year', 'month', 'day']}
                    selected={fromDate || null}
                    onChange={(date) => {
                      setFromDate(date && date.$d)
                    }}
                    sx={{ width: "100%" }}
                    format={DATE.DATE_ONLY}
                    placeholder='From Date'
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <DateSelector
                    className='date-picker'
                    name='toDate'
                    views={['year', 'month', 'day']}
                    selected={toDate || null}
                    onChange={(date) => {
                      setToDate(date && date.$d)
                    }}
                    sx={{ width: "100%" }}
                    format={DATE.DATE_ONLY}
                    placeholder='To Date'
                    minDate={dayjs(fromDate)}
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-xxl-2'>
              <ReactSelect
                placeholder="Status"
                isMulti={false}
                name='leaseStatus'
                className='select2'
                classNamePrefix='select'
                handleChangeReactSelect={handleChangeSelectStatus}
                options={StaffSelectStatus}
                value={status}
                isSearchable={false}
              />
            </div>
            <div className='col-lg-2 col-xxl-12 d-flex justify-content-end'>
              <button className='btn btn-outline reset-btn p-0' onClick={handleReset}>Reset Filters</button>
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-8 text-gray-800'>
                <tr className="table-head fw-bold fs-3 text-gray-800 border-bottom-2 border-gray-200">
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-100px">Staff Id</th>
                  <th className="min-w-100px">Name</th>
                  <th className="min-w-100px">Email Id</th>
                  <th className="min-w-100px">Phone</th>
                  <th className="min-w-100px">Created Date</th>
                  <th className="min-w-100px">Status</th>
                  {Roles && Roles.user && Roles.user.view || Roles && Roles.user && Roles.user.edit || Roles && Roles.user && Roles.landlords.delete ?
                    <th className="min-w-100px text-center">Action</th> : null}
                </tr>
              </thead>
              <tbody className='fs-8 border-bottom-1 list-body'>
                {
                  !loading
                    ? (
                      getAllUsers && !_.isEmpty(getAllUsers.data)
                        ? (
                          getAllUsers && getAllUsers?.data?.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {page === 1 ? id + 1 : (id + page * limit + 1) - limit}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.userId ? data.userId : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.name ? data.name : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.officialMailId ? data.officialMailId : "--"}
                                </td>
                                <td className="pb-0 pt-5 text-start">
                                  {data && data.mobileNumber ? data.mobileNumber : "--"}
                                </td>
                                <td className="pb-0 pt-5 text-start">
                                  {data && data.createdDate ? dayjs(data.createdDate).format('DD/MM/YYYY') : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  <span
                                    className={`badge ${STATUS_BADGE[data && data.status]}`
                                    }>
                                    {data ? data.status : "--"}
                                  </span>
                                </td>
                                {Roles && Roles.user && Roles.user.view || Roles && Roles.user && Roles.user.edit || Roles && Roles.user && Roles.user.delete ?
                                  <td className="pb-0 pt-5 text-center">
                                    <DropdownButton id="dropdown-basic-button"
                                      title={<i className="bi bi-three-dots text-dark"></i>}
                                      className='center dropDown-btn position-none position-dropDown'>
                                      {Roles && Roles.user && Roles.user.view ?
                                        <Dropdown.Item href="#/action-1" className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>View</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.user && Roles.user.edit ?
                                        <Dropdown.Item onClick={() => onEditItem(data.id)} className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>Edit</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.user && Roles.user.delete ?
                                        <Dropdown.Item onClick={() => onDeleteItemUser(data.id)} className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/delete-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>Delete</span>
                                        </Dropdown.Item> : null}
                                    </DropdownButton>
                                  </td> : null}
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
          <div className="form-group row mb-4 mt-6">
            <div className="col-lg-5" />
            <div className="col-lg-7 d-flex align-items-center justify-content-end">
              <div className='w-50 d-flex align-items-center justify-content-center'>
                <div className='mr-5'>Record Per Page</div>
                <select
                  name='status'
                  className='form-select form-select-solid bg-white border-0'
                  style={{ width: '25%' }}
                  data-control='select'
                  data-placeholder='Select an option'
                  data-allow-clear='true'
                  onChange={handleChange}
                  value={limit || ''}
                >
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                </select>
              </div>
              <span className='w-25'>
                {page === 1 ? (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {Math.min(limit * page, getAllUsers && getAllUsers.count)} of {getAllUsers && getAllUsers.count}
                  </>
                ) : page === Math.ceil(getAllUsers && getAllUsers.count / limit) ? (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {getAllUsers && getAllUsers.count} of {getAllUsers && getAllUsers.count}
                  </>
                ) : (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {Math.min(limit * page, getAllUsers && getAllUsers.count)} of {getAllUsers && getAllUsers.count}
                  </>
                )}
              </span>
              <div className='w-50'>
                <ReactPaginate
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  previousLabel="< Prev"
                  pageClassName="page-item"
                  pageLinkClassName="page-link page-btn"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div >

    </>
  );
}

const mapStateToProps = (state) => {
  const { USERlistStore, UserdeleteStore, } = state;
  return {
    getAllUsers: USERlistStore && USERlistStore.getAllUsers ? USERlistStore.getAllUsers : '',
    loading: USERlistStore && USERlistStore.loading ? USERlistStore.loading : false,
    Userdelete: UserdeleteStore && UserdeleteStore.Userdelete ? UserdeleteStore.Userdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserlistDispatch: (params) => dispatch(UsersActions.getUSERlist(params)),
  deleteDispatch: (id) => dispatch(UserdeleteActions.delete(id)),
  clearUserDelete: (id) =>
    dispatch(UserdeleteActions.clear(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
