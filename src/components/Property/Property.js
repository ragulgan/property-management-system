import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../utils/helper';
import {
  STATUS_BADGE, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE, PROPERTY_STATUS_BADGE,
  REGEX
} from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { PropertyActions, PropertydeleteActions, LandlordsActions, PropertiesActions } from '../../store/actions'
// import SearchLists from './search'
// import AddProperty from './AddProperty'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import SurveyNumber from './surveyNumber'

function Property(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getpropertylistDispatch,
    className,
    loading,
    Propertylists,
    Propertydelete,
    deleteDispatch,
    clearPropertyDelete,
    getLandlordlistDispatch,
    getPropertieslistDispatch,
    getAllLandlords,
    Propertieslists,
  } = props

  const PropertyStatus = [
    {
      "value": "",
      "label": "All"
    },
    {
      "value": "VACANT",
      "label": "Vacant"
    },
    {
      "value": "OCCUPIED",
      "label": "Occupied"
    },
    {
      "value": "REPAIR",
      "label": "Repair"
    },
    {
      "value": "UNDER_MAINTENANCE",
      "label": "Under Maintenance"
    }
  ]

  const [limit, setLimit] = useState(10)
  const didMount = React.useRef(false);
  const [data, setData] = useState({})
  const [open, setOpen] = useState(false)
  const [activePageNumber, setActivePageNumber] = useState(1)
  const pathName = useLocation().pathname
  const history = useHistory()
  const url = pathName && pathName.split('/')
  const currentRoute = url && url[1]
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [page, setPage] = useState(1)
  const [propertyId, setPropertyId] = useState('')
  const [propertyName, setPropertyName] = useState('')
  const [status, setStatus] = useState('')
  const [landlordOption, setLandlordOption] = useState()
  const [SelectedLandlordOption, setSelectedLandlordOption] = useState('')
  const [PropertyOption, setPropertyOption] = useState()
  const [SelectedPropertyOption, setSelectedPropertyOption] = useState('')
  const [surveyNo, setSurveyNo] = useState('')
  const [sortBy, setSortBy] = useState(false)
  const [sortValue, setSortValue] = useState('')
  const [proId, setProId] = useState('')

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  })

  useEffect(() => {
    const params = {
      status: "ACTIVE"
    }
    getLandlordlistDispatch(params)
    getPropertieslistDispatch(params)
  }, [])

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    const pageNumber = event.selected + 1
    const params = {
      limit: limit,
      pageNo: pageNumber,
      surveyNo: surveyNo,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      propertyStatus: typeof status === 'object' ? status.value : '',
      landLord: typeof SelectedLandlordOption === 'object' ? SelectedLandlordOption.value : '',
      propertyType: typeof SelectedPropertyOption === 'object' ? SelectedPropertyOption.value : '',
      sort: sortValue ? sortValue : '',
    }
    setActivePageNumber(pageNumber)
    getpropertylistDispatch(params)
  }


  const totalPages =
    Propertylists && Propertylists.count
      ? Math.ceil(parseInt(Propertylists && Propertylists.count) / limit)
      : 1

  const logout = () => {
    unsetLocalStorage()
    window.location.href = '/merchant-login';
  };

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  const onConfirmRedirect = () => {
    clearPropertyDelete()
    history.push('/properties')
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
    if (Propertydelete && Propertydelete.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: Propertydelete && Propertydelete.message,
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
    } else if (Propertydelete && Propertydelete.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: Propertydelete && Propertydelete.message,
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
  }, [Propertydelete])

  const onEditItem = (id) => {
    history.push(`/edit-property/${id}`)
    setShow(true)
    setEditId(id)
  }

  const handleShow = () => {
    history.push('/add-property')
  }

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      surveyNo: surveyNo,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      propertyStatus: typeof status === 'object' ? status.value : '',
      landLord: typeof SelectedLandlordOption === 'object' ? SelectedLandlordOption.value : '',
      propertyType: typeof SelectedPropertyOption === 'object' ? SelectedPropertyOption.value : '',
      sort: sortValue ? sortValue : '',
    }
    getpropertylistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      propertyStatus: typeof status === 'object' ? status.value : '',
      landLord: typeof SelectedLandlordOption === 'object' ? SelectedLandlordOption.value : '',
      propertyType: typeof SelectedPropertyOption === 'object' ? SelectedPropertyOption.value : '',
      sort: sortValue ? sortValue : '',
    }
    getpropertylistDispatch(params)
  }, [propertyId, propertyName, status, SelectedLandlordOption, SelectedPropertyOption, sortValue])

  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value)
  }

  const handleChangePropertyName = (e) => {
    setPropertyName(e.target.value)
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption)
    }
  }
  const getDefaultOptions = (landLord) => {
    const defaultOptions = []
    for (const item in landLord) {
      defaultOptions.push({ label: landLord[item].firstName, value: landLord[item].id })
    }
    return defaultOptions
  }

  const getDefaultOptionsProperty = (propertyList) => {
    const defaultOptions = []
    for (const item in propertyList) {
      defaultOptions.push({ label: propertyList[item].propertyType, value: propertyList[item].id })
    }
    return defaultOptions
  }

  useEffect(() => {
    const data = getAllLandlords && getAllLandlords.data
    const landLord = getDefaultOptions(data)
    setLandlordOption(landLord)
  }, [getAllLandlords])

  useEffect(() => {
    const data = Propertieslists && Propertieslists.data
    const propertyList = getDefaultOptionsProperty(data)
    setPropertyOption(propertyList)
  }, [Propertieslists])

  const handleChangeSelectLandLord = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLandlordOption(selectedOption)
    }
  }

  const handleChangePropertyType = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedPropertyOption(selectedOption)
    }
  }

  const handleOnMoreFilter = () => {
    setOpen(true)
  }

  const handleReset = () => {
    const params = {
      limit: limit,
      pageNo: page,
    }
    setPropertyId('')
    setPropertyName('')
    setStatus('')
    setSelectedLandlordOption('')
    setSelectedPropertyOption('')
    setSurveyNo('')
    setSortValue('')
    setProId(false)
    getpropertylistDispatch(params)
  }

  const surveyList = () => {
    setOpen(false)
    const params = {
      surveyNo: surveyNo,
      limit: limit,
      pageNo: page,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      propertyStatus: typeof status === 'object' ? status.value : '',
      landLord: typeof SelectedLandlordOption === 'object' ? SelectedLandlordOption.value : '',
      propertyType: typeof SelectedPropertyOption === 'object' ? SelectedPropertyOption.value : '',
      sort: sortValue ? sortValue : '',
    }
    getpropertylistDispatch(params)
  }

  const handleResetModal = () => {
    setSurveyNo('')
    // setOpen(false)
  }


  useEffect(() => {
    const handleOutsideClick = () => {
      setSortBy(false)
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSort = (e) => {
    e.stopPropagation();
    setSortBy(true)
  }

  const handleSortClick = (name) => {
    if (name === 'asc') {
      setSortValue('asc')
      setSortBy(false)
    } else if (name === 'desc') {
      setSortValue('desc')
      setSortBy(false)
    }
  }


  return (
    <>
      <Modal show={open} onHide={() => { setOpen(false) }}
        className='filter-modal'>
        <Modal.Header>
          <Modal.Title className='text-start w-100 py-0 label-text-color'>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row px-3'>
            <div className='col-lg-12 text-start filter-list-height'>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3} className='vl'>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first" className='border-horizontal'>Survey No</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second" className='border-horizontal'>Amount</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <SurveyNumber setSurveyNo={setSurveyNo} surveyNo={surveyNo} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
            <Modal.Footer className='justify-content-end'>
              <button className='btn btn-blue-outline py-2 mr-4' onClick={handleResetModal}>
                Reset Filters
              </button>
              <button className='btn btn-blue py-2' onClick={surveyList}>
                Apply
              </button>
            </Modal.Footer>
          </div>
        </Modal.Body>
      </Modal>
      <div className='mb-5 row align-items-center'>
        <div className='col-sm-6'>
          <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>My Property</h4>
        </div>
        <div className="col-sm-6 text-end">
          {Roles && Roles.myProperty && Roles.myProperty.add ?
            <Link className='btn btn-lg btn-blue list-add-button px-3 py-2' onClick={handleShow} to="/add-property">
              <span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Property
            </Link> : null}
        </div>
      </div>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className='row px-7 py-3 justify-content-between align-items-center g-2'>
            <div className='col-xxl-10 col-xl-12 col-lg-12'>
              <div className='row align-items-center g-2'>
                <div className='col-sm-2 col-xxl-2 position-relative'>
                  {proId ?
                    <span className='position-absolute top-25 ms-5 fs-5 fw-bold'>PRT-
                    </span> : null}
                  <input
                    placeholder={proId ? '' : 'Property ID'}
                    className={proId ? 'form-control ps-16 form-control-lg placeHolder' : 'form-control form-control-lg placeHolder'}
                    onChange={handleChangePropertyId}
                    type='text'
                    name='propertyId'
                    value={propertyId}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.NUMERIC_THREE_DIGITS;
                      if (!regex.test(e.key) || propertyId.length >= 3) {
                        e.preventDefault();
                      }
                    }}
                    onClick={() => setProId(true)}
                    onBlur={propertyId && propertyId.length > 0 ? () => setProId(true) : () => setProId(false)}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <input
                    placeholder='Property Name'
                    className='form-control form-control-lg placeHolder'
                    onChange={handleChangePropertyName}
                    type='text'
                    name='propertyName'
                    value={propertyName}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.ALPHA_NUMERIC_CHARS;
                      if (!regex.test(e.key) || propertyName.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Property Type"
                    isMulti={false}
                    name='propertyType'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangePropertyType}
                    options={PropertyOption}
                    value={SelectedPropertyOption}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Landlords"
                    isMulti={false}
                    name='landLordId'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectLandLord}
                    options={landlordOption}
                    value={SelectedLandlordOption}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Status"
                    isMulti={false}
                    name='propertyStatus'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={PropertyStatus}
                    value={status}
                    isSearchable={false}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <button
                    className={_.isEmpty(surveyNo) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter": "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter sort-border-color"} onClick={handleOnMoreFilter}><span>More Filters</span><span><i class="bi bi-funnel-fill fs-3"></i></span></button>
                </div>
              </div>
            </div>
            <div className='col-xxl-1 col-xl-10 col-lg-10 ps-0 ps-xxl-5 pe-xl-5 d-flex justify-content-lg-end justify-content-xl-end justify-content-xxl-start'>
              <button className="btn btn-outline reset-btn px-0" onClick={handleReset}><span>Reset Filters</span></button>
            </div>
            <div className='col-xxl-1 col-xl-2 col-lg-2'>
              <button className={_.isEmpty(sortValue) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn" : "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn sort-border-color"} onClick={handleSort}><span>Sort by</span><span><i className="bi bi-filter-left fs-1"></i></span>
              </button>
              {sortBy ?
                <div className='sort-by survey-list position-absolute z-index-2'>
                  <div className='p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold'
                    onClick={() => handleSortClick('asc')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    Property Name (A-Z)
                  </div>
                  <div className='p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold'
                    onClick={() => handleSortClick('desc')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    Property Name (Z-A)
                  </div>
                </div> : null}
            </div>
          </div>
        </div>
      </div>
      <div className='card mt-2'>
        <div className="p-7" style={{ maxHeight: '62vh', overflowY: 'scroll' }}>
          {
            !loading
              ? (
                Propertylists && !_.isEmpty(Propertylists.data)
                  ? (
                    Propertylists && Propertylists.data.map((item, id) => {
                      return (
                        <div key={id} className="card border p-5 mb-2 position-relative">
                          <div className="card-body">
                            <h5 className="card-title property-list-head">{item.propertyId && item.propertyId ? item.propertyId : "--"}<span className='ml-3'>{item.propertyName && item.propertyName ? item.propertyName : "--"}</span></h5>
                            <p className="card-text property-list-para">{`${item.buildingNoOrStreetName && item.buildingNoOrStreetName ? item.buildingNoOrStreetName : "--"} ${item.address && item.address ? item.address : "--"}, ${item.location && item.location ? item.location : "--"}, ${item.city && item.city.cityName ? item.city.cityName : "--"}`}</p>
                          </div>
                          <div className="table-responsive d-flex align-items-center">
                            <table className="table gs-2 mt-4 custom-class">
                              <thead className='fw-bolder fs-8 text-gray-400'>
                                <tr className='border-bottom-0'>
                                  <th className='table-head-prop col-2'>Landlord</th>
                                  <th className='table-head-prop col-2'>Survey No</th>
                                  <th className='table-head-prop col-2'>Property Type</th>
                                  <th className='table-head-prop col-2'>City</th>
                                  <th className='table-head-prop text-center col-2'>Status</th>
                                </tr>
                              </thead>
                              <tbody className='fs-8'>
                                <tr>
                                  <td className="table-data-prop text-start">
                                    {item && item.landLord && item.landLord.firstName ? item.landLord.firstName : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.surveyNo && item.surveyNo ? item.surveyNo : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.propertyType && item.propertyType.propertyType ? item.propertyType.propertyType : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.city && item.city.cityName ? item.city.cityName : "--"}
                                  </td>
                                  <td className="text-center">
                                    <span
                                      className={`property-list-status badge ${PROPERTY_STATUS_BADGE[item && item.propertyStatus]}`
                                      }>
                                      {item && item.propertyStatus ?
                                        <>
                                          {item.propertyStatus === 'VACANT' && (
                                            'Vacant'
                                          )}
                                          {item.propertyStatus === 'OCCUPIED' && (
                                            'Occupied'
                                          )}
                                          {item.propertyStatus === 'REPAIR' && (
                                            'Repair'
                                          )}
                                          {item.propertyStatus === 'UNDER_MAINTENANCE' && (
                                            'Maintenance'
                                          )}
                                        </> :
                                        "--"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div>
                              {Roles && Roles.myProperty && Roles.myProperty.view || Roles && Roles.myProperty && Roles.myProperty.edit || Roles && Roles.myProperty && Roles.myProperty.delete ?
                                <DropdownButton id="dropdown-basic-button" title="..." className='center dropDown-btn position-none position-dropDown'>
                                  {Roles && Roles.myProperty && Roles.myProperty.view ?
                                    <Dropdown.Item href="#/action-1" className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/view-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>View</span>
                                    </Dropdown.Item> : null}
                                  {Roles && Roles.myProperty && Roles.myProperty.edit ?
                                    <Dropdown.Item onClick={() => onEditItem(item.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/edit-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Edit</span>
                                    </Dropdown.Item> : null}
                                  {Roles && Roles.myProperty && Roles.myProperty.delete ?
                                    <Dropdown.Item onClick={() => onDeleteItem(item.id)} className='d-flex'>
                                      <img
                                        alt='Logo'
                                        src={toAbsoluteUrl('/media/avatars/property-management/delete-icon.svg')}
                                        className='img-fluid'
                                      />
                                      <span className='ml-2'>Delete</span>
                                    </Dropdown.Item> : null}
                                </DropdownButton> : null}
                            </div>
                          </div>
                        </div>
                      )
                    })) : (
                    <div className='text-center py-3'>
                      <div colSpan='100%'>No record(s) found</div>
                    </div>
                  )
              )
              :
              (
                <div>
                  <div colSpan='100%' className='text-center'>
                    <div
                      className='spinner-border text-primary m-5'
                      role='status'
                    />
                  </div>
                </div>)}
        </div>
        <div className="form-group row mb-4 mt-6">
          <div className="col-lg-1 col-xl-3 col-xxl-5" />
          <div className="col-lg-11 col-xl-9 col-xxl-7 d-flex align-items-center justify-content-end">
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
                  {Math.min(limit * page, Propertylists && Propertylists.count)} of {Propertylists && Propertylists.count}
                </>
              ) : page === Math.ceil(Propertylists && Propertylists.count / limit) ? (
                <>
                  <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                  {Propertylists && Propertylists.count} of {Propertylists && Propertylists.count}
                </>
              ) : (
                <>
                  <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                  {Math.min(limit * page, Propertylists && Propertylists.count)} of {Propertylists && Propertylists.count}
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
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { PropertylistStore, PropertydeleteStore, LandlordslistStore, PropertieslistStore } = state;
  return {
    Propertylists: PropertylistStore && PropertylistStore.Propertylists ? PropertylistStore.Propertylists : '',
    loading: PropertylistStore && PropertylistStore.loading ? PropertylistStore.loading : false,
    Propertydelete: PropertydeleteStore && PropertydeleteStore.Propertydelete ? PropertydeleteStore.Propertydelete : '',
    getAllLandlords: LandlordslistStore && LandlordslistStore.getAllLandlords ? LandlordslistStore.getAllLandlords : '',
    Propertieslists: PropertieslistStore && PropertieslistStore.Propertieslists ? PropertieslistStore.Propertieslists : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getpropertylistDispatch: (params) => dispatch(PropertyActions.getpropertylist(params)),
  deleteDispatch: (id) => dispatch(PropertydeleteActions.delete(id)),
  clearPropertyDelete: () => dispatch(PropertydeleteActions.clear()),
  getLandlordlistDispatch: (data) =>
    dispatch(LandlordsActions.getlandlordslist(data)),
  getPropertieslistDispatch: (data) =>
    dispatch(PropertiesActions.getpropertyTypelist(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);