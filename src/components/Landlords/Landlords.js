import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../utils/helper';
import { STATUS_BADGE_LANDLORD, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE, REGEX, DATE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { LandlordsActions, LandlordsGetIdActions, LandlordsdeleteActions } from '../../store/actions'
import SearchLists from './search'
import AddLandlords from './AddLandlords'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import ReactSelect from '../../theme/layout/components/ReactSelect';
import { DateSelector } from '../../theme/layout/components/DateSelector';
import dayjs from 'dayjs';

function Landlords(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getlandlordslistDispatch,
    className,
    loading,
    getAllLandlords,
    LandlordsDeleted,
    deleteDispatch,
    clearDelete
  } = props
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState({})
  const [activePageNumber, setActivePageNumber] = useState(1)
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [status, setStatus] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const LandlordSelectStatus = [
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
    const pageNumber = event.selected + 1
    setPage(pageNumber)
    const params = {
      limit: limit,
      pageNo: pageNumber,
      firstName: name,
      emailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
    }
    setActivePageNumber(pageNumber)
    getlandlordslistDispatch(params)
  }

  const totalPages =
    getAllLandlords && getAllLandlords.count
      ? Math.ceil(parseInt(getAllLandlords && getAllLandlords.count) / limit)
      : 1
  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  const onDeleteItem = (id) => {
    confirmationAlert(
      SWEET_ALERT_MSG.CONFIRMATION_TEXT,
      SWEET_ALERT_MSG.DELETE_MEMBERS,
      'warning',
      'Yes',
      'No',
      () => { onConfirmDelete(id) },
      () => { }
    )
  }

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      firstName: name,
      emailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
    }
    getlandlordslistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (LandlordsDeleted && LandlordsDeleted.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: LandlordsDeleted && LandlordsDeleted.message,
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
      clearDelete()
      getlandlordslistDispatch(params)
    } else if (LandlordsDeleted && LandlordsDeleted.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: LandlordsDeleted && LandlordsDeleted.message,
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
      clearDelete()
    }
  }, [LandlordsDeleted])

  const onEditItem = (id) => {
    setShow(true)
    setEditId(id)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      firstName: name,
      emailId: emailId,
      mobileNumber: phoneNo,
      status: typeof status === 'object' ? status.value : '',
      fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : '',
    }
    getlandlordslistDispatch(params)
  }, [name, status, emailId, phoneNo, fromDate, toDate, clearDelete])

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
    }
    setName('')
    setEmailId('')
    setPhoneNo('')
    setStatus('')
    setFromDate('')
    setToDate('')
    getlandlordslistDispatch(params)
  }

  return (
    <>
      <div className='row mb-5 align-items-center'>
        <div className="col-sm-6">
          <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Landlords</h4>
        </div>
        <div className="col-sm-6 text-end">
          {Roles && Roles.landlords && Roles.landlords.add ?
            <button className='btn btn-lg btn-blue list-add-button px-3 py-2' onClick={handleShow}>
              <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Landlord
            </button> : null}
        </div>
      </div>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className='row px-6 pt-6 justify-content-between align-items-center'>
            <div className='col-xxl-10 col-lg-12'>
              <div className='row align-items-center g-2'>
                <div className='col-sm-2 col-xxl-2'>
                  <input
                    placeholder='Landlord Name'
                    className='form-control form-control-lg placeHolder'
                    onChange={handleName}
                    type='text'
                    name='firstName'
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
                    minDate={dayjs(fromDate)}
                    placeholder='To Date'
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Status"
                    isMulti={false}
                    name='status'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={LandlordSelectStatus}
                    value={status}
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-12 col-xxl-2 d-flex justify-content-end'>
              <button className='btn btn-outline reset-btn px-0' onClick={handleReset}>Reset Filters</button>
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-6 text-gray-800'>
                <tr className="table-head border-bottom-2 border-gray-200 " style={{}}>
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-100px">Landlord Name</th>
                  <th className="min-w-100px">Email Id</th>
                  <th className="min-w-100px">Phone</th>
                  <th className="min-w-100px">Created Date</th>
                  <th className="min-w-100px">Status</th>
                  {Roles && Roles.landlords && Roles.landlords.view || Roles && Roles.landlords && Roles.landlords.edit ||
                    Roles && Roles.landlords && Roles.landlords.delete ?
                    <th className="min-w-100px text-center">Action</th> : null}
                </tr>
              </thead>
              <tbody className='fs-6 border-bottom-1 list-body'>
                {
                  !loading
                    ? (
                      getAllLandlords &&
                        getAllLandlords && !_.isEmpty(getAllLandlords.data)
                        ? (
                          getAllLandlords && getAllLandlords.data.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {page === 1 ? id + 1 : (id + page * limit + 1) - limit}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.firstName && data.lastName ? data.firstName + ' ' + data.lastName : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.emailId ? data.emailId : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.mobileNumber ? data.mobileNumber : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.createdDate ? dayjs(data.createdDate).format('DD/MM/YYYY') : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  <span
                                    className={`badge ${STATUS_BADGE_LANDLORD[data.status && data.status]}`
                                    }>
                                    {data.status ? data.status : "--"}
                                  </span>
                                </td>
                                {Roles && Roles.landlords && Roles.landlords.view || Roles && Roles.landlords && Roles.landlords.edit || Roles && Roles.landlords && Roles.landlords.delete ?
                                  <td className="pb-0 pt-5 text-center">
                                    <DropdownButton id="dropdown-basic-button" 
                                    title={
                                      <i className="bi bi-three-dots fs-1 text-dark"></i>
                                     }
                                     className='center dropDown-btn position-none position-dropDown'>
                                      {Roles && Roles.landlords && Roles.landlords.view ?
                                        <Dropdown.Item href="#/action-1" className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>View</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.landlords && Roles.landlords.edit ?
                                        <Dropdown.Item onClick={() => onEditItem(data.id)} className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>Edit</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.landlords && Roles.landlords.delete ?
                                        <Dropdown.Item onClick={() => onDeleteItem(data.id)} className='d-flex'>
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
                    {Math.min(limit * page, getAllLandlords && getAllLandlords.count)} of {getAllLandlords && getAllLandlords.count}
                  </>
                ) : page === Math.ceil(getAllLandlords && getAllLandlords.count / limit) ? (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {getAllLandlords && getAllLandlords.count} of {getAllLandlords && getAllLandlords.count}
                  </>
                ) : (
                  <>
                    <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                    {Math.min(limit * page, getAllLandlords && getAllLandlords.count)} of {getAllLandlords && getAllLandlords.count}
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
      </div>
      <AddLandlords Open={show} Close={handleClose} editId={editId} page={page} limit={limit} getDispatch={getlandlordslistDispatch} setEditId={setEditId}
        setName={setName} setEmailId={setEmailId} setPhoneNo={setPhoneNo} setStatus={setStatus} setFromDate={setFromDate} setToDate={setToDate}
      />
    </>
  );
}
const mapStateToProps = (state) => {
  const { LandlordslistStore, LandlordsdeleteStore } = state;
  return {
    getAllLandlords: LandlordslistStore && LandlordslistStore.getAllLandlords ? LandlordslistStore.getAllLandlords : '',
    loading: LandlordslistStore && LandlordslistStore.loading ? LandlordslistStore.loading : false,
    LandlordsDeleted: LandlordsdeleteStore && LandlordsdeleteStore.Landlordsdelete ? LandlordsdeleteStore.Landlordsdelete : '',
  };
};
const mapDispatchToProps = (dispatch) => ({
  getlandlordslistDispatch: (params) => dispatch(LandlordsActions.getlandlordslist(params)),
  deleteDispatch: (id) => dispatch(LandlordsdeleteActions.delete(id)),
  clearDelete: (id) => dispatch(LandlordsdeleteActions.clear(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Landlords);
