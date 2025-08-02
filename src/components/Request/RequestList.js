import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { getLocalStorage, unsetLocalStorage, removeLocalStorage } from '../../utils/helper';
import { STATUS_BADGE_REQUEST, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE, SESSION, REGEX, DATE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { RequestListActions, RequestListdeleteActions } from '../../store/actions'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { DateSelector } from '../../theme/layout/components/DateSelector';
import dayjs from 'dayjs'
import AddRequest from './AddRequest'

function RequestList(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getRequestlistDispatch,
    className,
    loading,
    getAllRequestList,
    deleteDispatch,
    Userdelete,
    clearUserDelete,
  } = props
  // const didMount = React.useRef(false);
  const [limit, setLimit] = useState(10)
  const [activePageNumber, setActivePageNumber] = useState(1)
  const history = useHistory()
  const [RequestID, setRequestID] = useState('')
  const [date, setDate] = useState('')
  const [typeIssue, setEmailId] = useState('')
  const [status, setStatus] = useState('')
  const [re, setRe] = useState('')
  const [page, setPage] = useState(1)
  const SuccessMsg = getLocalStorage(SESSION.AUTH_SUCCESS)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');



  const RequestSelectStatus = [
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
      requestId: re && RequestID && RequestID.length > 0 ? 'RE' + RequestID : '',
      createdAt: date,
      issueType: typeIssue,
      requestStatus: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
    }
    setActivePageNumber(pageNumber)
    getRequestlistDispatch(params)
  }

  const totalPages =
    getAllRequestList && getAllRequestList.count
      ? Math.ceil(parseInt(getAllRequestList && getAllRequestList.count) / limit)
      : 1

  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //   }
  // })

  const onEditItem = (id) => {
    setShow(true)
    setEditId(id)
  }
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  // const onConfirmRedirect = () => {
  //   clearUserDelete()
  //   history.push('/Tenants')
  // }
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
      pageNo: page
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
      getRequestlistDispatch(params)
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

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      requestId: re && RequestID && RequestID.length > 0 ? 'RE' + RequestID : '',
      createdAt: date,
      issueType: typeIssue,
      requestStatus: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',

    }
    getRequestlistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      requestId: re && RequestID && RequestID.length > 0 ? 'RE' + RequestID : '',
      createdAt: date,
      issueType: typeIssue,
      requestStatus: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
    }
    getRequestlistDispatch(params)
  }, [RequestID, date, status, typeIssue, fromDate, toDate])

  const handleChangeStaffId = (e) => {
    setRequestID(e.target.value)
  }

  const handleName = (e) => {
    setDate(e.target.value)
  }

  const handleEmailId = (e) => {
    setEmailId(e.target.value)
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption)
    }
  }

  // const handleReset = () => {
  //   const params = {
  //     limit: limit,
  //     pageNo: page,
  //   }
  //   setRequestID('')
  //   setDate('')
  //   setEmailId('')
  //   setPhoneNo('')
  //   setStatus('')
  //   setFromDate('')
  //   setToDate('')
  //   getRequestlistDispatch(params)
  //   setRe(false)
  // }

  return (
    <>
      <div className='mb-5 row align-items-center'>
        <div className='col-sm-6'>
          <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Requests</h4>
        </div>
        <div className="col-sm-6 text-end">
          {/* {Roles && Roles.user && Roles.user.add ? */}
          <button className='btn btn-lg btn-blue list-add-button  px-3 py-2' onClick={handleShow}>
            <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Create Request
          </button>
          {/* : null} */}
        </div>
      </div>
      <div className={`card ${className} position-relative`}>
        <div className='card-body py-3'>
          <div className='row px-6 pt-6 g-2 align-items-center'>
            <div className='col-lg-12 col-xxl-10'>
              <div className='row align-items-center g-2'>
                <div className='col-sm-2 col-xxl-2 position-relative'>
                  {re ?
                    <span className='position-absolute top-25 ms-5 fs-5 fw-bold'>RE
                    </span> : null}
                  <input
                    placeholder={re ? '' : 'Request Id'}
                    className={re ? 'form-control ps-14 form-control-lg placeHolder' : 'form-control form-control-lg placeHolder'}
                    onChange={handleChangeStaffId}
                    type='text'
                    name='RequestId'
                    value={RequestID}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.NUMERIC_THREE_DIGITS;
                      if (!regex.test(e.key) || RequestID.length >= 3) {
                        e.preventDefault();
                      }
                    }}
                    onClick={() => setRe(true)}
                    onBlur={RequestID && RequestID.length > 0 ? () => setRe(true) : () => setRe(false)}
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
                <div className='col-lg-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Status"
                    isMulti={false}
                    name='leaseStatus'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={RequestSelectStatus}
                    value={status}
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>

            {/* <div className='col-lg-2 col-xxl-12 d-flex justify-content-end'>
              <button className='btn btn-outline reset-btn p-0' onClick={handleReset}>Reset Filters</button>
            </div> */}
          </div>
          <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-8 text-gray-800'>
                <tr className="table-head fw-bold fs-3 text-gray-800 border-bottom-2 border-gray-200">
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-100px">Request Id</th>
                  <th className="min-w-100px">Request Date</th>
                  <th className="min-w-100px">Issue Type</th>
                  <th className="min-w-100px">Status</th>
                  {/* {Roles && Roles.user && Roles.user.view || Roles && Roles.user && Roles.user.edit || Roles && Roles.user && Roles.landlords.delete ? */}
                  <th className="min-w-100px text-center">Action</th>
                  {/* : null} */}
                </tr>
              </thead>
              <tbody className='fs-8 border-bottom-1 list-body'>
                {
                  !loading
                    ? (
                      getAllRequestList && !_.isEmpty(getAllRequestList.data)
                        ? (
                          getAllRequestList && getAllRequestList.data.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {page === 1 ? id + 1 : (id + page * limit + 1) - limit}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.requestId ? data.requestId : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.createdAt ? data.createdAt : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.issueType ? data.issueType : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  <span
                                    className={`badge ${STATUS_BADGE_REQUEST[data.requestStatus && data.requestStatus]}`
                                    }>
                                    {data.requestStatus ? data.requestStatus : "--"}
                                  </span>
                                </td>
                                {/* {Roles && Roles.user && Roles.user.view || Roles && Roles.user && Roles.user.edit || Roles && Roles.user && Roles.user.delete ? */}
                                <td className="pb-0 pt-5 text-center">
                                  <DropdownButton id="dropdown-basic-button" title="..." className='center dropDown-btn position-none position-dropDown'>
                                    {/* {Roles && Roles.user && Roles.user.view ? */}
                                    <Dropdown.Item href="#/action-1" className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>View</span>
                                    </Dropdown.Item>
                                    {/* : null} */}
                                    {/* {Roles && Roles.user && Roles.user.edit ? */}
                                    <Dropdown.Item onClick={() => onEditItem(data.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Edit</span>
                                    </Dropdown.Item>
                                    {/* : null} */}
                                    {/* {Roles && Roles.user && Roles.user.delete ? */}
                                    <Dropdown.Item onClick={() => onDeleteItemUser(data.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/delete-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Delete</span>
                                    </Dropdown.Item>
                                    {/* : null} */}
                                  </DropdownButton>
                                </td>
                                {/* : null} */}
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
                    {Math.min(limit * page, getAllRequestList && getAllRequestList.count)} of {getAllRequestList && getAllRequestList.count}
                  </>
                ) : page === Math.ceil(getAllRequestList && getAllRequestList.count / limit) ? (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {getAllRequestList && getAllRequestList.count} of {getAllRequestList && getAllRequestList.count}
                  </>
                ) : (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {Math.min(limit * page, getAllRequestList && getAllRequestList.count)} of {getAllRequestList && getAllRequestList.count}
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
      <AddRequest Open={show} getDispatch={getRequestlistDispatch} Close={handleClose} setEditId={setEditId} editId={editId} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { RequestListlistStore, RequestListdeleteStore, } = state;
  return {
    getAllRequestList: RequestListlistStore && RequestListlistStore.getAllRequestList ? RequestListlistStore.getAllRequestList : '',
    loading: RequestListlistStore && RequestListlistStore.loading ? RequestListlistStore.loading : false,
    Userdelete: RequestListdeleteStore && RequestListdeleteStore.Userdelete ? RequestListdeleteStore.Userdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRequestlistDispatch: (params) => dispatch(RequestListActions.getrequestList(params)),
  deleteDispatch: (id) => dispatch(RequestListdeleteActions.delete(id)),
  clearUserDelete: (id) =>
    dispatch(RequestListdeleteActions.clear(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
