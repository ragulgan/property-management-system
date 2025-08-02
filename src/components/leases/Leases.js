import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { unsetLocalStorage } from '../../utils/helper';
import { STATUS_BADGE, REVIEWTYPE, SWEET_ALERT_MSG, STATUS_RESPONSE, LEASE_STATUS_BADGE, REGEX } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { LeasesListActions, LeasesListdeleteActions, LandlordsActions } from '../../store/actions'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReactSelect from '../../theme/layout/components/ReactSelect'
import dayjs, { Dayjs } from 'dayjs';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import LandlordDropdown from './landLordFilter'
import LeaseStartEndFilter from './leaseStartEndFilter'
import LeasePriceFilter from './leaseAmountFilter'

function Leases(props) {
  const Roles = JSON.parse(localStorage.getItem('roles'))
  const {
    getleaseslistDispatch,
    className,
    loading,
    Leaseslists,
    Leasesdelete,
    deleteDispatch,
    getLandlordlistDispatch,
    clearLeasesDelete
  } = props

  const LeaseStatus = [
    {
      "value": "",
      "label": "All"
    },
    {
      "value": "ACTIVE",
      "label": "Active"
    },
    {
      "value": "EXPIRED",
      "label": "Expired"
    },
    {
      "value": "EXPIRE_SOON",
      "label": "Expire soon"
    },
    {
      "value": "RENEWAL",
      "label": "Renewal"
    },
    {
      "value": "TERMINATED",
      "label": "Terminated"
    },
  ]

  const LeaseTerms = [
    {
      "value": "",
      "label": "All"
    },
    {
      "value": "ONE_YEAR",
      "label": "1 Year"
    },
    {
      "value": "TWO_YEAR",
      "label": "2 Year"
    },
    {
      "value": "THREE_YEAR",
      "label": "3 Year"
    },
    {
      "value": "FOUR_YEAR",
      "label": "4 Year"
    },
    {
      "value": "FIVE_YEAR",
      "label": "5 Year"
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
  const [lessorName, setLessorName] = useState('')
  const [leaseTerm, setLeaseTerm] = useState('')
  const [status, setStatus] = useState('')
  const [landLoardValue, setLandLoardValue] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortBy, setSortBy] = useState(false)
  const [sortValue, setSortValue] = useState('')
  const [rangeValue, setRangeValue] = useState('')
  const [proId, setProId] = useState('')
  const [amount, setAmount] = useState([100000, 1500000])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  })

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    const pageNumber = event.selected + 1
    const params = {
      limit: limit,
      pageNo: pageNumber,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === 'object' ? leaseTerm.value : '',
      leaseStatus: typeof status === 'object' ? status.value : '',
      landlord: typeof landLoardValue === 'object' ? landLoardValue.value : '',
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : '',
      minValue: amount.length > 0 ? amount[0] : '',
      maxValue: amount.length > 0 ? amount[1] : '',
      sort: sortValue ? sortValue : '',
      range: rangeValue ? rangeValue : ''
    }
    setActivePageNumber(pageNumber)
    getleaseslistDispatch(params)
  }

  const totalPages =
    Leaseslists && Leaseslists.count
      ? Math.ceil(parseInt(Leaseslists && Leaseslists.count) / limit)
      : 1

  const logout = () => {
    unsetLocalStorage()
    window.location.href = '/merchant-login';
  };

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  }
  const onConfirmRedirect = () => {
    clearLeasesDelete()
    history.push('/leases')
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
    if (Leasesdelete && Leasesdelete.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: Leasesdelete && Leasesdelete.message,
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
    } else if (Leasesdelete && Leasesdelete.status === STATUS_RESPONSE.ERROR_MSG) {
      Toastify({
        text: Leasesdelete && Leasesdelete.message,
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
  }, [Leasesdelete])

  const onEditItem = (id) => {
    history.push(`/edit-leases/${id}`)
    setShow(true)
    setEditId(id)
  }

  const handleShow = () => {
    history.push('/add-leases')
  }

  const handleChange = (e) => {
    setLimit(e.target.value)
    const params = {
      limit: e.target.value,
      pageNo: page,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === 'object' ? leaseTerm.value : '',
      leaseStatus: typeof status === 'object' ? status.value : '',
      landlord: typeof landLoardValue === 'object' ? landLoardValue.value : '',
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : '',
      minValue: amount.length > 0 ? amount[0] : '',
      maxValue: amount.length > 0 ? amount[1] : '',
      sort: sortValue ? sortValue : '',
      range: rangeValue ? rangeValue : ''
    }
    getleaseslistDispatch(params)
  }

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === 'object' ? leaseTerm.value : '',
      leaseStatus: typeof status === 'object' ? status.value : '',
      sort: sortValue ? sortValue : '',
      range: rangeValue ? rangeValue : ''
    }
    getleaseslistDispatch(params)
  }, [propertyId, propertyName, status, lessorName, leaseTerm, sortValue, rangeValue])

  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value)
  }

  const handleChangePropertyName = (e) => {
    setPropertyName(e.target.value)
  }

  const handleChangeLessorName = (e) => {
    setLessorName(e.target.value)
  }

  const handleChangeLeaseTerm = (selectedOption) => {
    if (selectedOption !== null) {
      setLeaseTerm(selectedOption)
    }
  }

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption)
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
    setLessorName('')
    setLeaseTerm('')
    setLandLoardValue('')
    setFromDate('')
    setEndDate('')
    getleaseslistDispatch(params)
    setProId(false)
    setSortValue('')
    setRangeValue('')
    setAmount([100000, 1500000])
  }

  const surveyList = () => {
    setOpen(false)
    const params = {
      limit: limit,
      pageNo: page,
      propertyId: proId && propertyId && propertyId.length > 0 ? 'PRT-' + propertyId : '',
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === 'object' ? leaseTerm.value : '',
      leaseStatus: typeof status === 'object' ? status.value : '',
      landlord: typeof landLoardValue === 'object' ? landLoardValue.value : '',
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : '',
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : '',
      minValue: amount.length > 0 ? amount[0] : '',
      maxValue: amount.length > 0 ? amount[1] : '',
      sort: sortValue ? sortValue : '',
      range: rangeValue ? rangeValue : ''
    }
    getleaseslistDispatch(params)
  }

  useEffect(() => {
    if (open) {
      getLandlordlistDispatch()
    }
  }, [open])

  const handleResetModal = () => {
    setLandLoardValue('')
    setFromDate('')
    setEndDate('')
    setAmount([100000, 1500000])
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

  const handleSortPriceClick = (name) => {
    if (name === 'Low_to_High') {
      setRangeValue('Low_to_High')
      setSortBy(false)
    } else if (name === 'High_to_Low') {
      setRangeValue('High_to_Low')
      setSortBy(false)
    }
  }


  return (
    <>
      <Modal show={open} onHide={() => { setOpen(false) }}
        className='filter-modal'>
        <Modal.Body>
          <div className='row px-3'>
            <div className='col-lg-12 text-start filter-list-height'>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className='p-5'>
                  <Col sm={3} className='vl'>
                    <Modal.Title className='text-start w-100 px-3 label-text-color'>Filters</Modal.Title>
                    <Nav variant="pills" className="flex-column mt-5">
                      <Nav.Item>
                        <Nav.Link eventKey="first" className='border-horizontal'>Landlord</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second" className='border-horizontal'>Lease Date</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third" className='border-horizontal'>Amount</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <LandlordDropdown landLoardValue={landLoardValue} setLandLoardValue={setLandLoardValue} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <LeaseStartEndFilter fromDate={fromDate} setFromDate={setFromDate}
                          endDate={endDate} setEndDate={setEndDate} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <LeasePriceFilter setAmount={setAmount} amount={amount} />
                      </Tab.Pane>
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
          <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>My Leases</h4>
        </div>
        <div className="col-sm-6 text-end">
          {Roles && Roles.leases && Roles.leases.add ?
            <Link onClick={handleShow} to={`/add-leases`} className="btn btn-lg btn-blue list-add-button px-3 py-2"><span className='mr-0'><i className="bi bi-plus fs-1 text-white"></i></span>Add Leases</Link> : null}
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
                  <input
                    placeholder='Lessor'
                    className='form-control form-control-lg placeHolder'
                    onChange={handleChangeLessorName}
                    type='text'
                    name='lessorName'
                    value={lessorName}
                    autoComplete='off'
                    onKeyPress={(e) => {
                      const regex = REGEX.TEXT;
                      if (!regex.test(e.key) || lessorName.length >= 30) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Lease Term"
                    isMulti={false}
                    name='leaseTerm'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeLeaseTerm}
                    options={LeaseTerms}
                    value={leaseTerm}
                    isSearchable={false}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <ReactSelect
                    placeholder="Status"
                    isMulti={false}
                    name='leaseStatus'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeSelectStatus}
                    options={LeaseStatus}
                    value={status}
                    isSearchable={false}
                  />
                </div>
                <div className='col-sm-2 col-xxl-2'>
                  <button className={amount[0] == 100000 && amount[1] == 1500000 && _.isEmpty(landLoardValue || fromDate || endDate) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter": "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter sort-border-color"} onClick={handleOnMoreFilter}><span>More Filters</span><span><i class="bi bi-funnel-fill fs-3"></i></span></button>
                </div>
              </div>
            </div>
            <div className='col-xxl-1 col-xl-10 col-lg-10 ps-0 ps-xxl-5 pe-xl-5 d-flex justify-content-lg-end justify-content-xl-end justify-content-xxl-start'>
              <button className="btn btn-outline reset-btn px-0" onClick={handleReset}><span>Reset Filters</span></button>
            </div>
            <div className='col-xxl-1 col-xl-2 col-lg-2'>
              <button className={_.isEmpty(sortValue || rangeValue) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn" : "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn sort-border-color" } onClick={handleSort}><span>Sort by</span><span><i class="bi bi-filter-left fs-1"></i></span>
              </button>
              {sortBy ?
                <div className='sort-by survey-list position-absolute z-index-2'>
                  <div className='p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold'
                    onClick={() => handleSortPriceClick('Low_to_High')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    Price: Low to High
                  </div>
                  <div className='p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold'
                    onClick={() => handleSortPriceClick('High_to_Low')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    Price: High to Low
                  </div>
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
                Leaseslists &&
                  Leaseslists && !_.isEmpty(Leaseslists.data)
                  ? (
                    Leaseslists && Leaseslists.data.map((item, id) => {
                      return (
                        <div key={id} className="card border p-5 mb-2 position-relative">
                          <div className="card-body">
                            <h5 className="card-title leases-list-head">{item && item.property && item.property.propertyId ? item.property.propertyId : "--"}<span className='ml-3'>{item && item.property && item.property.propertyName ? item.property.propertyName : "--"}</span></h5>

                            <p className="card-text leases-list-para">{`${item && item.property && item.property.buildingNoOrStreetName ? item.property.buildingNoOrStreetName : "--"}, ${item && item.property && item.property.address ? item.property.address : "--"}, ${item.property && item.property.location ? item.property.location : "--"}, ${item.property.city && item.property.city.cityName ? item.property.city.cityName : "--"}`}</p>
                          </div>
                          <div className="table-responsive d-flex align-items-center">
                            <table className="table gs-2 mt-4 custom-class">
                              <thead className='fw-bolder fs-8 text-gray-400'>
                                <tr className='border-bottom-0'>
                                  <th className='table-head-prop col-2'>Landlord</th>
                                  <th className='table-head-prop col-2'>Lessor</th>
                                  <th className='table-head-prop col-2'>Start Date</th>
                                  <th className='table-head-prop col-2'>End Date</th>
                                  <th className='table-head-prop col-2'>Term</th>
                                  <th className='table-head-prop col-1'>Amount</th>
                                  <th className="table-head-prop text-center col-2">Status</th>
                                </tr>
                              </thead>
                              <tbody className='fs-8'>
                                <tr>
                                  <td className="table-data-prop text-start">
                                    {item && item.landlordDetails && item.landlordDetails.landlordName && item.landlordDetails.landlordName ? item.landlordDetails.landlordName : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.lessorName ? item.lessorName : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.startDate ? dayjs(item.startDate).format('DD/MM/YYYY') : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.endDate ? dayjs(item.endDate).format('DD/MM/YYYY') : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.leaseTerm ?
                                      <>
                                        {item.leaseTerm === 'ONE_YEAR' && (
                                          '1 Year'
                                        )}
                                        {item.leaseTerm === 'TWO_YEAR' && (
                                          '2 Year'
                                        )}
                                        {item.leaseTerm === 'THREE_YEAR' && (
                                          '3 Year'
                                        )}
                                        {item.leaseTerm === 'FOUR_YEAR' && (
                                          '4 Year'
                                        )}
                                        {item.leaseTerm === 'FIVE_YEAR' && (
                                          '5 Year'
                                        )}
                                      </> : "--"}
                                  </td>
                                  <td className="table-data-prop text-start">
                                    {item && item.amount ? item.amount : "--"}
                                  </td>
                                  <td className="text-center">
                                    <span
                                      className={`property-list-status badge ${LEASE_STATUS_BADGE[item && item.leaseStatus]}`
                                      }>
                                      {item && item.leaseStatus ?
                                        <>
                                          {item.leaseStatus === 'ACTIVE' && (
                                            'Active'
                                          )}
                                          {item.leaseStatus === 'EXPIRED' && (
                                            'Expired'
                                          )}
                                          {item.leaseStatus === 'RENEWAL' && (
                                            'Renewal'
                                          )}
                                          {item.leaseStatus === 'EXPIRE_SOON' && (
                                            'Expire soon'
                                          )}
                                          {item.leaseStatus === 'TERMINATED' && (
                                            'Terminated'
                                          )}
                                          {item.leaseStatus === 'DRAFT' && (
                                            'Draft'
                                          )}
                                          {item.leaseStatus === 'INACTIVE' && (
                                            'Inactive'
                                          )}
                                        </> :
                                        "--"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div>
                              {Roles && Roles.leases && Roles.leases.view || Roles && Roles.leases && Roles.leases.edit ||
                                Roles && Roles.leases && Roles.leases.delete ?
                                <DropdownButton id="dropdown-basic-button" 
                                title={
                                  <i className="bi bi-three-dots fs-1 text-dark"></i>
                                } 
                                className='center dropDown-btn position-none position-dropDown'>
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
                style={{ width: '25%' }}
                className='form-select form-select-solid bg-white border-0'
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
                  {Math.min(limit * page, Leaseslists && Leaseslists.count)} of {Leaseslists && Leaseslists.count}
                </>
              ) : page === Math.ceil(Leaseslists && Leaseslists.count / limit) ? (
                <>
                  <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                  {Leaseslists && Leaseslists.count} of {Leaseslists && Leaseslists.count}
                </>
              ) : (
                <>
                  <span>{`${limit * (page - 1) + 1}`}{'-'}</span>
                  {Math.min(limit * page, Leaseslists && Leaseslists.count)} of {Leaseslists && Leaseslists.count}
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
  const { LeasesListlistStore, LeasesListdeleteStore } = state;
  return {
    Leaseslists: LeasesListlistStore && LeasesListlistStore.getAllLeaseList ? LeasesListlistStore.getAllLeaseList : '',
    loading: LeasesListlistStore && LeasesListlistStore.loading ? LeasesListlistStore.loading : false,
    Leasesdelete: LeasesListdeleteStore && LeasesListdeleteStore.LeasesListdelete ? LeasesListdeleteStore.LeasesListdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getleaseslistDispatch: (params) => dispatch(LeasesListActions.getleasesListlist(params)),
  deleteDispatch: (id) => dispatch(LeasesListdeleteActions.delete(id)),
  clearLeasesDelete: () => dispatch(LeasesListdeleteActions.clear()),
  getLandlordlistDispatch: (params) => dispatch(LandlordsActions.getlandlordslist(params))

});

export default connect(mapStateToProps, mapDispatchToProps)(Leases);