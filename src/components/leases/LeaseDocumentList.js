import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../utils/helper';
import { STATUS_BADGE, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { LeaseDocumentListActions, LeaseDocumentListGetIdActions, LeaseDocumentListdeleteActions, PropertyGetIdActions } from '../../store/actions'
import AddLeaseDocument from './AddLeaseDocument';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function LeaseDocumentList(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getLeaseDocListDispatch,
    className,
    loading,
    LeaseDoclists,
    LeaseDocdelete,
    deleteDispatch,
    leaseId,
    clearLeaseDocDelete,
    propDoclist,
    setActiveTab,
    clearPropertyIdDetails
  } = props

  const [limit, setLimit] = useState(10)
  const [data, setData] = useState({})
  const [activePageNumber, setActivePageNumber] = useState(1)
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [page, setPage] = useState(1)
  const history = useHistory()
  const pathName = useLocation().pathname
  const url = pathName && pathName.split('/')
  const currentId = url && url[2]
  const [sorting, setSorting] = useState({
    deviceID: false,
    riskid: false,
    phone: false,
    email: false,

  })
  useEffect(() => {
    if (propDoclist === true && !_.isEmpty(leaseId) || !_.isEmpty(currentId)) {
      const params = {
        limit: limit,
        pageNo: 1,
        leaseId: leaseId ? leaseId : currentId
      }
      getLeaseDocListDispatch(params)
    }
  }, [propDoclist, leaseId, currentId])

  const handleRecordPerPage = (e) => {
    const { value } = e.target
    setLimit(value)
    const params = {
      limit: value,
      pageNo: activePageNumber,
      leaseId: leaseId ? leaseId : currentId
    }
    getLeaseDocListDispatch(params)
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    const pageNumber = event.selected + 1
    const params = {
      limit: limit,
      pageNo: pageNumber,
      leaseId: leaseId ? leaseId : currentId
    }
    setActivePageNumber(pageNumber)
    getLeaseDocListDispatch(params)
  }

  const handleSorting = (name) => {
    if (sorting && sorting[name]) {
      sorting[name] = !sorting[name]
      setSorting(sorting)
      setData({})
      const params = {
        limit: limit,
        pageNo: activePageNumber,
        sort: name,
        order: 'DESC'
      }
      getLeaseDocListDispatch(params)
    } else {
      const filter = _.mapValues(sorting, () => {
        return false
      })
      filter[name] = !filter[name]
      setSorting(filter)
      setData({})
      const params = {
        limit: limit,
        page: activePageNumber,
        sort: name,
        order: 'ASC'
      }
      getLeaseDocListDispatch(params)
    }
  }

  const totalPages =
    LeaseDoclists && LeaseDoclists.count
      ? Math.ceil(parseInt(LeaseDoclists && LeaseDoclists.count) / limit)
      : 1

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  const onConfirmRedirect = () => {
    clearLeaseDocDelete()
    const params = {
      limit: limit,
      pageNo: 1,
      leaseId: leaseId ? leaseId : currentId
    }
    getLeaseDocListDispatch(params)
  }
  const onDeleteItem = (id) => {
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
    if (LeaseDocdelete && LeaseDocdelete.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: LeaseDocdelete && LeaseDocdelete.message,
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
    } else if (LeaseDocdelete && LeaseDocdelete.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: LeaseDocdelete && LeaseDocdelete.message,
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
  }, [LeaseDocdelete])

  const onEditItem = (id) => {
    setShow(true)
    setEditId(id)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      leaseId: leaseId ? leaseId : currentId
    }
    getLeaseDocListDispatch(params)
  }

  const onBack = (e, name) => {
    if (!_.isEmpty(name)) {
      setActiveTab('Tenant details')
    }
  }
  const onComplete = () => {
    clearPropertyIdDetails()
    history.push('/leases')
  }

  return (
    <>
      <div className='row pt-6 justify-content-between'>
        <div className="col-sm-6 text-end" />
        <div className="col-sm-6 text-end">
          {Roles && Roles.leases && Roles.leases.add ?
            <button className='btn btn-lg btn-blue list-add-button px-3 py-2' onClick={handleShow}>
              <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Documents
            </button> : null}
        </div>
      </div>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className="table-responsive">
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-6 text-gray-800'>
                <tr className="table-head border-bottom-2 border-gray-200">
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-150px">Title</th>
                  <th className="min-w-150px">Document Type</th>
                  <th className="min-w-200px">Descriptions</th>
                  <th className="min-w-150px">Last Modified</th>
                  {Roles && Roles.leases && Roles.leases.view || Roles && Roles.leases && Roles.leases.edit ||
                    Roles && Roles.leases && Roles.leases.delete ?
                    <th className="min-w-100px text-center">Action</th> : null}
                </tr>
              </thead>
              <tbody className='fs-6 border-bottom-1'>
                {
                  !loading
                    ? (
                      LeaseDoclists && !_.isEmpty(LeaseDoclists.data)
                        ? (
                          LeaseDoclists && LeaseDoclists.data.map((item, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {id + 1}
                                </td>
                                <td className="py-5 text-start">
                                  {item.name && item.name ? item.name : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {item.type && item.type.leaseDocumentType ? item.type.leaseDocumentType : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {item.description && item.description ? item.description : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {item.createdAt && item.createdAt ? item.createdAt : "--"}
                                </td>
                                {Roles && Roles.leases && Roles.leases.view || Roles && Roles.leases && Roles.leases.edit || Roles && Roles.leases && Roles.leases.delete ?
                                  <td className="pb-0 pt-5 text-center">
                                    <DropdownButton id="dropdown-basic-button" title="..." className='center dropDown-btn position-none position-dropDown'>
                                      {Roles && Roles.leases && Roles.leases.view ?
                                        <Dropdown.Item href="#/action-1" className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>View</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.leases && Roles.leases.edit ?
                                        <Dropdown.Item onClick={() => onEditItem(item.id)} className='d-flex'>
                                          <img
                                            alt='Logo'
                                            src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                            className='img-fluid'
                                          />
                                          <span className='ml-2'>Edit</span>
                                        </Dropdown.Item> : null}
                                      {Roles && Roles.leases && Roles.leases.delete ?
                                        <Dropdown.Item onClick={() => onDeleteItem(item.id)} className='d-flex'>
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
          <div className="form-group row mt-6">
            <div className="col-lg-12 mb-4 align-items-center d-flex">
              <div className="col-lg-3">
                <div className='row'>
                  <div className='col-lg-5 ms-4'>
                    <select
                      name='status'
                      className='form-select form-select-solid'
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
                  <div className='col-lg-4 mt-4'>
                    <span>
                      {page === 1 ? (
                        <>
                          <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                          {Math.min(limit * page, LeaseDoclists && LeaseDoclists.count)} of {LeaseDoclists && LeaseDoclists.count}
                        </>
                      ) : page === Math.ceil(LeaseDoclists && LeaseDoclists.count / limit) ? (
                        <>
                          <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                          {LeaseDoclists && LeaseDoclists.count} of {LeaseDoclists && LeaseDoclists.count}
                        </>
                      ) : (
                        <>
                          <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                          {Math.min(limit * page, LeaseDoclists && LeaseDoclists.count)} of {LeaseDoclists && LeaseDoclists.count}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3" />
              <div className="col-lg-6 d-flex justify-content-end">
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
          </div>
          <div className='form-group row'>
            <div className='col-lg-12 text-center'>
              <button
                type='button'
                className='btn btn-blue-outline py-2 m-2'
                onClick={(e) => onBack(e, "back")}
              >
                Back
              </button>
              <button
                type='button'
                className='btn btn-blue py-2 m-2'
                onClick={(e) => onComplete()}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddLeaseDocument leaseId={leaseId} Open={show} Close={handleClose} editId={editId} getDispatch={getLeaseDocListDispatch} setEditId={setEditId} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { LeaseDoclistStore, LeaseDocdeleteStore } = state;
  return {
    LeaseDoclists: LeaseDoclistStore && LeaseDoclistStore.LeaseDoclists ? LeaseDoclistStore.LeaseDoclists : '',
    loading: LeaseDoclistStore && LeaseDoclistStore.loading ? LeaseDoclistStore.loading : false,
    LeaseDocdelete: LeaseDocdeleteStore && LeaseDocdeleteStore.LeaseDocdelete ? LeaseDocdeleteStore.LeaseDocdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLeaseDocListDispatch: (params) => dispatch(LeaseDocumentListActions.getLeaseDoclist(params)),
  deleteDispatch: (id) => dispatch(LeaseDocumentListdeleteActions.delete(id)),
  clearLeaseDocDelete: () => dispatch(LeaseDocumentListdeleteActions.clear()),
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaseDocumentList);