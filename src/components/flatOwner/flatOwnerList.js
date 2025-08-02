import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import { toAbsoluteUrl } from "../../theme/helpers";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  capitalizeRemoveUnderscore,
} from "../../utils/helper";
import {
  STATUS_BADGE,
  SWEET_ALERT_MSG,
  STATUS_RESPONSE,
  REGEX,
} from "../../utils/constants";
import { confirmationAlert } from "../../utils/alerts";
import {
  FlatOwnerListActions,
  FlatOwnerdeleteActions,
  LandlordsActions
} from "../../store/actions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import dayjs, { Dayjs } from "dayjs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ReactSelect from '../../theme/layout/components/ReactSelect'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import LandlordDropdown from './landLordFilter'
import LeaseStartEndFilter from './leaseStartEndFilter'
import LeasePriceFilter from './leaseAmountFilter'

function FlatOwnersList(props) {
  const Roles = JSON.parse(localStorage.getItem("roles"));
  const {
    className,
    FlatsOwnerLists,
    loading,
    FlatsOwnerdelete,
    getflatOwnerlistDispatch,
    deleteDispatch,
    clearFlatsOwnerDelete,
    getLandlordlistDispatch
  } = props;

  const LeaseStatus = [
    {
      value: "",
      label: "All",
    },
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "EXPIRED",
      label: "Expired",
    },
    {
      value: "EXPIRE_SOON",
      label: "Expire soon",
    },
    {
      value: "RENEWAL",
      label: "Renewal",
    },
    {
      value: "TERMINATED",
      label: "Terminated",
    },
  ];

  const LeaseTerms = [
    {
      value: "",
      label: "All",
    },
    {
      value: "001/500",
      label: "001/500",
    },
    {
      value: "002/500",
      label: "002/500",
    },
    {
      value: "003/500",
      label: "003/500",
    },
    {
      value: "004/500",
      label: "004/500",
    },
    {
      value: "005/500",
      label: "005/500",
    },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const didMount = React.useRef(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const pathName = useLocation();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [lessorName, setLessorName] = useState("");
  const [leaseTerm, setLeaseTerm] = useState("");
  const [status, setStatus] = useState("");
  const [landLoardValue, setLandLoardValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [rangeValue, setRangeValue] = useState("");
  const [proId, setProId] = useState("");
  const [amount, setAmount] = useState([100000, 1500000]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  });

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    const pageNumber = event.selected + 1;
    const params = {
      limit: limit,
      pageNo: pageNumber,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === "object" ? leaseTerm.value : "",
      leaseStatus: typeof status === "object" ? status.value : "",
      landlord: typeof landLoardValue === "object" ? landLoardValue.value : "",
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      minValue: amount.length > 0 ? amount[0] : "",
      maxValue: amount.length > 0 ? amount[1] : "",
      sort: sortValue ? sortValue : "",
      range: rangeValue ? rangeValue : "",
    };
    setActivePageNumber(pageNumber);
    getflatOwnerlistDispatch(params);
  };

  const totalPages =
    FlatsOwnerLists && FlatsOwnerLists.count
      ? Math.ceil(parseInt(FlatsOwnerLists && FlatsOwnerLists.count) / limit)
      : 1;

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  };
  const onConfirmRedirect = () => {
    clearFlatsOwnerDelete();
    history.push("/flatOwnerList");
  };
  const onDeleteItem = (id) => {
    confirmationAlert(
      SWEET_ALERT_MSG.CONFIRMATION_TEXT_DELETE,
      SWEET_ALERT_MSG.DELETE,
      "warning",
      "Yes",
      "No",
      () => {
        onConfirmDelete(id);
      },
      () => {}
    );
  };

  useEffect(() => {
    if (FlatsOwnerdelete && FlatsOwnerdelete.status === STATUS_RESPONSE.SUCCESS_MSG) {
      Toastify({
        text: FlatsOwnerdelete && FlatsOwnerdelete.message,
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
      onConfirmRedirect();
    } else if (
      FlatsOwnerdelete &&
      FlatsOwnerdelete.status === STATUS_RESPONSE.ERROR_MSG
    ) {
      Toastify({
        text: FlatsOwnerdelete && FlatsOwnerdelete.message,
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
      onConfirmRedirect();
    }
  }, [FlatsOwnerdelete]);

  const onEditItem = (id) => {
    history.push(`/edit-flatOwner/${id}`);
    setShow(true);
    setEditId(id);
  };

  const handleShow = () => {
    history.push('/add-flatOwner')
  };

  const handleChange = (e) => {
    setLimit(e.target.value);
    const params = {
      limit: e.target.value,
      pageNo: page,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === "object" ? leaseTerm.value : "",
      leaseStatus: typeof status === "object" ? status.value : "",
      landlord: typeof landLoardValue === "object" ? landLoardValue.value : "",
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      minValue: amount.length > 0 ? amount[0] : "",
      maxValue: amount.length > 0 ? amount[1] : "",
      sort: sortValue ? sortValue : "",
      range: rangeValue ? rangeValue : "",
    };
    getflatOwnerlistDispatch(params);
  };

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === "object" ? leaseTerm.value : "",
      leaseStatus: typeof status === "object" ? status.value : "",
      sort: sortValue ? sortValue : "",
      range: rangeValue ? rangeValue : "",
    };
    getflatOwnerlistDispatch(params);
  }, [
    propertyId,
    propertyName,
    status,
    lessorName,
    leaseTerm,
    sortValue,
    rangeValue,
  ]);

  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value);
  };

  const handleChangePropertyName = (e) => {
    setPropertyName(e.target.value);
  };

  const handleChangeLessorName = (e) => {
    setLessorName(e.target.value);
  };

  const handleChangeLeaseTerm = (selectedOption) => {
    if (selectedOption !== null) {
      setLeaseTerm(selectedOption);
    }
  };

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption);
    }
  };

  const handleOnMoreFilter = () => {
    setOpen(true);
  };

  const handleReset = () => {
    const params = {
      limit: limit,
      pageNo: page
    };
    setPropertyId("");
    setPropertyName("");
    setStatus("");
    setLessorName("");
    setLeaseTerm("");
    setLandLoardValue("");
    setFromDate("");
    setEndDate("");
    setProId(false);
    setSortValue("");
    setRangeValue("");
    setAmount([100000, 1500000]);
    getflatOwnerlistDispatch(params);
  };

  const surveyList = () => {
    setOpen(false);
    const params = {
      limit: limit,
      pageNo: page,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      lessorName: lessorName,
      leaseTerm: typeof leaseTerm === "object" ? leaseTerm.value : "",
      leaseStatus: typeof status === "object" ? status.value : "",
      landlord: typeof landLoardValue === "object" ? landLoardValue.value : "",
      startDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      minValue: amount.length > 0 ? amount[0] : "",
      maxValue: amount.length > 0 ? amount[1] : "",
      sort: sortValue ? sortValue : "",
      range: rangeValue ? rangeValue : "",
    };
    getflatOwnerlistDispatch(params);
  };

  useEffect(() => {
    if (open) {
      getLandlordlistDispatch();
    }
  }, [open]);

  const handleResetModal = () => {
    setLandLoardValue("");
    setFromDate("");
    setEndDate("");
    setAmount([100000, 1500000]);
    // setOpen(false)
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setSortBy(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSort = (e) => {
    e.stopPropagation();
    setSortBy(true);
  };

  const handleSortClick = (name) => {
    if (name === "asc") {
      setSortValue("asc");
      setSortBy(false);
    } else if (name === "desc") {
      setSortValue("desc");
      setSortBy(false);
    }
  };

  const handleSortPriceClick = (name) => {
    if (name === "Low_to_High") {
      setRangeValue("Low_to_High");
      setSortBy(false);
    } else if (name === "High_to_Low") {
      setRangeValue("High_to_Low");
      setSortBy(false);
    }
  };

  useEffect(() => {
    return (() => {
      const params = {
        limit: limit,
        pageNo: page
      };
      setPropertyId("");
      setPropertyName("");
      setStatus("");
      setLessorName("");
      setLeaseTerm("");
      setLandLoardValue("");
      setFromDate("");
      setEndDate("");
      setProId(false);
      setSortValue("");
      setRangeValue("");
      setAmount([100000, 1500000]);
      getflatOwnerlistDispatch(params);
    })
  }, [])

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
      <div className="row m-0">
        <div className="col-sm-4 my-1">
            <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Flats Owners</h4>
        </div>
        <div className="mb-5 col-sm-8 text-end">
          {Roles && Roles.leases && Roles.leases.add ? (
            <button
              onClick={handleShow}
              className="btn btn-lg btn-blue list-add-button px-3 py-2"
            >
              <span className="mr-0">
                <i className="bi bi-plus fs-1 text-white"></i>
              </span>
              Add Flat Owners
            </button>
          ) : null}
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
                    placeholder={proId ? '' : 'Block'}
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
                    placeholder='Floor'
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
                    placeholder='Flat'
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
                    placeholder="Tanents"
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
                  <button className={amount[0] == 100000 && amount[1] == 1500000 && _.isEmpty(landLoardValue || fromDate || endDate) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter" : "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 more-filter sort-border-color"} onClick={handleOnMoreFilter}><span>More Filters</span><span><i className="bi bi-funnel-fill fs-3"></i></span></button>
                </div>
              </div>
            </div>
            <div className='col-xxl-1 col-xl-10 col-lg-10 ps-0 ps-xxl-5 pe-xl-5 d-flex justify-content-lg-end justify-content-xl-end justify-content-xxl-start'>
              <button className="btn btn-outline reset-btn px-0" onClick={handleReset}><span>Reset Filters</span></button>
            </div>
            <div className='col-xxl-1 col-xl-2 col-lg-2'>
              <button className={_.isEmpty(sortValue || rangeValue) ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn" : "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn sort-border-color"} onClick={handleSort}><span>Sort by</span><span><i className="bi bi-filter-left fs-1"></i></span>
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

      <div className="card">
        <div className="table-responsive">
          <table className="table border gs-2 mt-6">
            <thead className="fw-bolder fs-6 text-gray-800">
              <tr className="table-head border-bottom-2 border-gray-200">
                <th className="min-w-100px text-center">#</th>
                <th className="min-w-100px">Name</th>
                <th className="min-w-100px">Apartment</th>
                <th className="min-w-100px">Block</th>
                <th className="min-w-100px">Floor</th>
                <th className="min-w-100px">Flat/Unit No</th>
                <th className="min-w-100px">Phone</th>
                <th className="min-w-100px">Status</th>
                <th className="min-w-100px">Action</th>
              </tr>
            </thead>
            <tbody className="fs-6 border-bottom-1">
              {!loading ? (
                FlatsOwnerLists && !_.isEmpty(FlatsOwnerLists.data) ? (
                  FlatsOwnerLists && FlatsOwnerLists.data.map((data, id) => {
                    return (
                      <tr key={id}>
                        <td className="py-5 text-center">{id + 1}</td>
                        <td className="py-5 text-start">
                          {data.firstName || "--"}
                        </td>
                        {!_.isEmpty(data.flatInfo) && data.flatInfo.map((item) =>
                          <>
                            <td className="py-5 text-start">
                              {item.apartmentName || "--"}
                            </td>
                            <td className="pb-0 pt-5  text-start">
                              {item.block || "--"}
                            </td>
                            <td className="pb-0 pt-5  text-start">
                              {item.floor || "--"}
                            </td>
                            <td className="pb-0 pt-5  text-start">
                              {item.flatNo || "--"}
                            </td>
                          </>
                        )}
                        <td className="pb-0 pt-5  text-start">
                          {data.mobileNumber || "--"}
                        </td>
                        <td className="pb-0 pt-5  text-start">
                          <span
                            className={`badge ${STATUS_BADGE[data && data.status]}`
                            }>
                            {data ? capitalizeRemoveUnderscore(data.status) : "--"}
                          </span>
                        </td>
                        <div>
                          {(Roles && Roles.leases && Roles.leases.view) ||
                          (Roles && Roles.leases && Roles.leases.edit) ||
                          (Roles && Roles.leases && Roles.leases.delete) ? (
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={
                                <i className="bi bi-three-dots text-dark"></i>
                              }
                              className="center dropDown-btn position-none position-dropDown"
                            >
                              {Roles && Roles.leases && Roles.leases.view ? (
                                <Dropdown.Item
                                  href="#/action-1"
                                  className="d-flex"
                                >
                                  <img
                                    alt="Logo"
                                    src={toAbsoluteUrl(
                                      "/media/avatars/property-management/view-icon.svg"
                                    )}
                                    className="img-fluid"
                                  />
                                  <span className="ml-2">View</span>
                                </Dropdown.Item>
                              ) : null}
                              {Roles && Roles.leases && Roles.leases.edit ? (
                                <Dropdown.Item
                                  onClick={() => onEditItem(data.id)}
                                  className="d-flex"
                                >
                                  <img
                                    alt="Logo"
                                    src={toAbsoluteUrl(
                                      "/media/avatars/property-management/edit-icon.svg"
                                    )}
                                    className="img-fluid"
                                  />
                                  <span className="ml-2">Edit</span>
                                </Dropdown.Item>
                              ) : null}
                              {Roles && Roles.leases && Roles.leases.delete ? (
                                <Dropdown.Item
                                  onClick={() => onDeleteItem(data.id)}
                                  className="d-flex"
                                >
                                  <img
                                    alt="Logo"
                                    src={toAbsoluteUrl(
                                      "/media/avatars/property-management/delete-icon.svg"
                                    )}
                                    className="img-fluid"
                                  />
                                  <span className="ml-2">Delete</span>
                                </Dropdown.Item>
                              ) : null}
                            </DropdownButton>
                          ) : null}
                        </div>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center py-3">
                    <td colSpan="100%">No record(s) found</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="100%" className="text-center">
                    <div
                      className="spinner-border text-primary m-5"
                      role="status"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="form-group row mt-6">
            <div className="col-lg-12 mb-4 align-items-center d-flex">
              <div className="col-lg-3">
                <div className="row">
                  <div className="col-lg-5 ms-4">
                    <select
                      name="status"
                      className="form-select form-select-solid"
                      data-control="select"
                      data-placeholder="Select an option"
                      data-allow-clear="true"
                      onChange={handleChange}
                      value={limit || ""}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
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
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { FlatOwnerlistStore, FlatOwnerdeleteStore } = state;
  return {
    FlatsOwnerLists:
      FlatOwnerlistStore && FlatOwnerlistStore.getAllFlatOwner
        ? FlatOwnerlistStore.getAllFlatOwner
        : "",
    loading:
      FlatOwnerlistStore && FlatOwnerlistStore.loading
        ? FlatOwnerlistStore.loading
        : false,
    FlatsOwnerdelete:
      FlatOwnerdeleteStore && FlatOwnerdeleteStore.FlatOwnerdelete
        ? FlatOwnerdeleteStore.FlatOwnerdelete
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  getflatOwnerlistDispatch: (params) =>
    dispatch(FlatOwnerListActions.getFlatOwnerlist(params)),
  deleteDispatch: (id) => dispatch(FlatOwnerdeleteActions.delete(id)),
  clearFlatsOwnerDelete: () => dispatch(FlatOwnerdeleteActions.clear()),
  getLandlordlistDispatch: (params) =>
    dispatch(LandlordsActions.getlandlordslist(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnersList);
