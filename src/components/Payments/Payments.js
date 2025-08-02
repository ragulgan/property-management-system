import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../utils/helper';
import { STATUS_BADGE_PAYMENT, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { PaymentsActions, PaymentsAddAction, PaymentsdeleteActions } from '../../store/actions/Payments';
// import SearchLists from './search'

function Payments(props) {
  const {
    getpaymentslistDispatch,
    className,
    loading,
    Paymentslists,
    PaymentsDeleted,
    deleteDispatch

  } = props
  const [limit, setLimit] = useState(13)
  const [data, setData] = useState({})
  const [activePageNumber, setActivePageNumber] = useState(1)
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');

  const [sorting, setSorting] = useState({
    deviceID: false,
    riskid: false

  })

  useEffect(() => {
    const params = {
      limit: limit,
      page: 1
    }
    getpaymentslistDispatch(params)
  }, [])

  const handleRecordPerPage = (e) => {
    const { value } = e.target
    setLimit(value)
    const params = {
      limit: value,
      page: activePageNumber
    }
    getpaymentslistDispatch(params)
  }

  const handlePageClick = (event) => {
    const pageNumber = event.selected + 1
    const params = {
      limit: limit,
      page: pageNumber
    }
    setActivePageNumber(pageNumber)
    getpaymentslistDispatch(params)
  }

  const handleSorting = (name) => {
    if (sorting && sorting[name]) {
      sorting[name] = !sorting[name]
      setSorting(sorting)
      setData({})
      const params = {
        limit: limit,
        page: activePageNumber,
        sort: name,
        order: 'DESC'
      }
      getpaymentslistDispatch(params)
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
      getpaymentslistDispatch(params)
    }
  }

  const totalPages =
    Paymentslists && Paymentslists.data && Paymentslists.data.totalCount
      ? Math.ceil(parseInt(Paymentslists && Paymentslists.data && Paymentslists.data.totalCount) / limit)
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

  const onEditItem = (id) => {
    setShow(true)
    setEditId(id)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='mb-5'>
        <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Payments</h4>
      </div>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className='row px-6 pt-6 justify-content-between'>
            <div className='col-sm-6'>
              <div className="position-relative w-md-100 w-lg-75 w-xl-50">
                <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-1 ms-8"
                  id="basic-addon1">
                  <i className="bi bi-search fs-2" />
                </span>
                <input
                  placeholder='Search for site'
                  className='form-control form-control-lg ps-13'
                  // onChange={(e) => handleChange(e)}
                  type='search'
                  name='search'
                  autoComplete='off'
                />
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-6 text-gray-800'>
                <tr className="table-head border-bottom-2 border-gray-200">
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-100px">Property-ID</th>
                  <th className="min-w-100px">Property Name</th>
                  <th className="min-w-100px">Location</th>
                  <th className="min-w-100px">Property Qwner</th>
                  <th className="min-w-100px">Leaseholder</th>
                  <th className="min-w-100px">Lease Status</th>
                  {/* <th className="min-w-100px text-center">Action</th> */}
                </tr>
              </thead>
              <tbody className='fs-6 border-bottom-1'>
                {
                  !loading
                    ? (
                      Paymentslists &&
                        Paymentslists && !_.isEmpty(Paymentslists.data)
                        ? (
                          Paymentslists && Paymentslists.data.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {id + 1}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.propertyId ? data.propertyId : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.propertyName ? data.propertyName : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.location ? data.location : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.propertyOwner ? data.propertyOwner : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.Leaseholder ? data.Leaseholder : "--"}
                                </td>
                                {/* <td className="pb-0 pt-5  text-start">
                                  {data.leaseStatus && data.leaseStatus ? data.leaseStatus : "--"}
                                </td> */}

                                <td className="pb-0 pt-5  text-start">
                                  <span
                                    className={`badge ${STATUS_BADGE_PAYMENT[data.paymentStatus && data.paymentStatus]}`
                                    }>
                                    {data.paymentStatus ? data.paymentStatus : "--"}
                                  </span>
                                </td>
                                {/* <td className="pb-0 pt-5 text-center">
                                  <DropdownButton id="dropdown-basic-button" title="..." className='center dropDown-btn'>
                                    <Dropdown.Item href="#/action-1" className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>View</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => onEditItem(data.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Edit</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => onDeleteItem(data.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/delete-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Delete</span>
                                    </Dropdown.Item>
                                  </DropdownButton>
                                </td> */}
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
            <div className="col-lg-12 mb-4 align-items-end d-flex">
              <div className="col-lg-12">
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
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { PaymentslistStore, PaymentsdeleteStore } = state;
  return {
    Paymentslists: PaymentslistStore && PaymentslistStore.Paymentslists ? PaymentslistStore.Paymentslists : '',
    loading: PaymentslistStore && PaymentslistStore.loading ? PaymentslistStore.loading : false,
    PaymentsDeleted: PaymentsdeleteStore && PaymentsdeleteStore.Paymentsdelete ? PaymentsdeleteStore.Paymentsdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getpaymentslistDispatch: (params) => dispatch(PaymentsActions.getpaymentslist(params)),
  deleteDispatch: (id) => dispatch(PaymentsdeleteActions.delete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);