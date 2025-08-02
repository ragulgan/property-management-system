import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../../theme/helpers'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../../utils/helper';
import { STATUS_BADGE, SWEET_ALERT_MSG, STATUS_RESPONSE } from '../../../utils/constants'
import { confirmationAlert } from "../../../utils/alerts"
import { ApartmentTypeActions, ApartmentTypedeleteActions } from '../../../store/actions'
import AddApartmentType from './addApartmentType'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function ApartmentType(props) {
  const {
    getApartmentTypelistDispatch,
    className,
    loading,
    getAllApartmentTypeLists,
    ApartmentTypeDeleted,
    deleteDispatch,
    clearDelete,
    settingTab
  } = props

  const [limit, setLimit] = useState(10)
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    if(settingTab === 'Apartment Type'){
    const params = {
      limit: limit,
      pageNo: 1
    }
    getApartmentTypelistDispatch(params)
  }
  }, [settingTab])

  const handlePageClick = (event) => {
    const pageNumber = event.selected + 1
    setPage(pageNumber)
    const params = {
      limit: limit,
      pageNo: pageNumber
    }
    getApartmentTypelistDispatch(params)
  }


  const totalPages =
    getAllApartmentTypeLists && getAllApartmentTypeLists.count
      ? Math.ceil(parseInt(getAllApartmentTypeLists && getAllApartmentTypeLists.count) / limit)
      : 1

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }

  const onDeleteItem = (id) => {
    confirmationAlert(
      SWEET_ALERT_MSG.CONFIRMATION_TEXT,
      SWEET_ALERT_MSG.DELETE_APARTMENT_TYPE,
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
      pageNo: page
    }
    getApartmentTypelistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page
    }
    if (ApartmentTypeDeleted && ApartmentTypeDeleted.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: ApartmentTypeDeleted && ApartmentTypeDeleted.message,
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
      getApartmentTypelistDispatch(params)
    } else if (ApartmentTypeDeleted && ApartmentTypeDeleted.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: ApartmentTypeDeleted && ApartmentTypeDeleted.message,
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
      clearDelete()
    }
  }, [ApartmentTypeDeleted])

  const onEditItem = (id) => {
    setShow(true)
    setEditId(id)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='row pt-6 justify-content-between'>
        <div className="col-sm-12">
          <p className='fw-bolder fs-6 text-gray-800 mb-1'>Manage Apartment Types</p>
          <p className='fs-6 text-muted'>Categorize apartment for easy tracking</p>
        </div>
        <div className="col-sm-12 text-end">
          <button className='btn btn-lg btn-blue list-add-button px-3 py-2' onClick={handleShow}>
            <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Apartment Type
          </button>
        </div>
      </div>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-6 text-gray-800'>
                <tr className="table-head border-bottom-2 border-gray-200">
                  <th className="min-w-100px text-center">#</th>
                  <th className="min-w-200px">Apartment Type</th>
                  <th className="min-w-100px">Status</th>
                  <th className="min-w-100px text-center">Action</th>
                </tr>
              </thead>
              <tbody className='fs-6 border-bottom-1'>
                {
                  !loading
                    ? (
                      getAllApartmentTypeLists &&
                        getAllApartmentTypeLists && !_.isEmpty(getAllApartmentTypeLists.data)
                        ? (
                          getAllApartmentTypeLists && getAllApartmentTypeLists.data.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-center">
                                  {page === 1 ? id + 1 : (id + page * limit + 1) - limit}
                                </td>

                                <td className="py-5 text-start">
                                  {data && data.apartmentType ? data.apartmentType : "--"}
                                </td>

                                <td className="pb-0 pt-5 text-start">
                                  <span
                                    className={`badge ${STATUS_BADGE[data.status && data.status]}`
                                    }>
                                    {data.status ? data.status : "--"}
                                  </span>
                                </td>
                                <td className="pb-0 pt-5 text-center">
                                  <DropdownButton id="dropdown-basic-button" title="..." className='center dropDown-btn position-none position-dropDown'>
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
                            apartmentType='status'
                          />
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          <div className="form-group row mb-4 mt-6 align-items-center">
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
                        {Math.min(limit * page, getAllApartmentTypeLists && getAllApartmentTypeLists.count)} of {getAllApartmentTypeLists && getAllApartmentTypeLists.count}
                      </>
                    ) : page === Math.ceil(getAllApartmentTypeLists && getAllApartmentTypeLists.count / limit) ? (
                      <>
                        <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                        {getAllApartmentTypeLists && getAllApartmentTypeLists.count} of {getAllApartmentTypeLists && getAllApartmentTypeLists.count}
                      </>
                    ) : (
                      <>
                        <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                        {Math.min(limit * page, getAllApartmentTypeLists && getAllApartmentTypeLists.count)} of {getAllApartmentTypeLists && getAllApartmentTypeLists.count}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-9 d-flex justify-content-end">
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
                forcePage={page - 1}
              />
            </div>
          </div>
        </div>
      </div>
      <AddApartmentType Open={show} Close={handleClose} editId={editId} page={page} limit={limit} getDispatch={getApartmentTypelistDispatch} setEditId={setEditId} />

    </>
  );
}

const mapStateToProps = (state) => {
  const { ApartmentTypelistStore, ApartmentTypedeleteStore } = state;
  return {
    getAllApartmentTypeLists: ApartmentTypelistStore && ApartmentTypelistStore.getAllApartmentType ? ApartmentTypelistStore.getAllApartmentType : '',
    loading: ApartmentTypelistStore && ApartmentTypelistStore.loading ? ApartmentTypelistStore.loading : false,
    ApartmentTypeDeleted: ApartmentTypedeleteStore && ApartmentTypedeleteStore.ApartmentTypedelete ? ApartmentTypedeleteStore.ApartmentTypedelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getApartmentTypelistDispatch: (params) => dispatch(ApartmentTypeActions.getApartmentTypelist(params)),
  deleteDispatch: (id) => dispatch(ApartmentTypedeleteActions.delete(id)),
  clearDelete: () => dispatch(ApartmentTypedeleteActions.clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentType);