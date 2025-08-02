import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import { KTSVG, toAbsoluteUrl } from "../../theme/helpers";
import { useForm, SubmitHandler } from "react-hook-form";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { DropdownSelect } from "../../UIComponents";
import {
  unsetLocalStorage,
  capitalizeRemoveUnderscore,
} from "../../utils/helper";
import {
  PROPERTY_STATUS_BADGE,
  SWEET_ALERT_MSG,
  STATUS_RESPONSE,
  REGEX,
} from "../../utils/constants";
import { ERRORS } from "../../utils/messages";
import { confirmationAlert } from "../../utils/alerts";
import { validationFunc, letSpeceficCharsOnly } from "../../utils/helper";
import {
  LeasesListActions,
  LeasesListdeleteActions,
  LandlordsActions,
} from "../../store/actions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import dayjs, { Dayjs } from "dayjs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function PropertyDetails(props) {
  const Roles = JSON.parse(localStorage.getItem("roles"));
  const {
    getleaseslistDispatch,
    className,
    loading,
    Leaseslists,
    Leasesdelete,
    deleteDispatch,
    getLandlordlistDispatch,
    clearLeasesDelete,
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
  const didMount = React.useRef(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const pathName = useLocation().pathname;
  const history = useHistory();
  const url = pathName && pathName.split("/");
  const currentRoute = url && url[1];
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
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

  const defaultValues = {
    propertyId: "",
    propertyName: "",
    propertyType: "",
    tenants: "",
    status: "",
  };

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues });

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
    getleaseslistDispatch(params);
  };

  const totalPages =
    Leaseslists && Leaseslists.count
      ? Math.ceil(parseInt(Leaseslists && Leaseslists.count) / limit)
      : 1;

  const logout = () => {
    unsetLocalStorage();
    window.location.href = "/merchant-login";
  };

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  };
  const onConfirmRedirect = () => {
    clearLeasesDelete();
    history.push("/leases");
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
      onConfirmRedirect();
    } else if (
      Leasesdelete &&
      Leasesdelete.status === STATUS_RESPONSE.ERROR_MSG
    ) {
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
      onConfirmRedirect();
    }
  }, [Leasesdelete]);

  const onEditItem = (id) => {
    history.push(`/edit-property/${id}`);
    setShow(true);
    setEditId(id);
  };

  const handleShow = () => {
    history.push("/add-property");
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
    getleaseslistDispatch(params);
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
    getleaseslistDispatch(params);
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
      pageNo: page,
    };
    setPropertyId("");
    setPropertyName("");
    setStatus("");
    setLessorName("");
    setLeaseTerm("");
    setLandLoardValue("");
    setFromDate("");
    setEndDate("");
    getleaseslistDispatch(params);
    setProId(false);
    setSortValue("");
    setRangeValue("");
    setAmount([100000, 1500000]);
    reset(defaultValues);
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
    getleaseslistDispatch(params);
  };

  useEffect(() => {
    if (open) {
      getLandlordlistDispatch();
    }
  }, [open]);

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name && (type = "change")) {
        const value = values[name];
        console.log("value, name, type", value, name, type);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

  const listData = [
    {
      tenants: "megan thee",
      flatNo: "B-17/250",
      propertyType: "Commercial",
      floor: "1st FLoor",
      status: "VACANT",
      block: "Block 1",
    },
    {
      tenants: "Megan fox",
      flatNo: "B-17/250",
      propertyType: "Commercial",
      floor: "2th FLoor",
      status: "VACANT",
      block: "Block 1",
    },
    {
      tenants: "Kristin Stewart",
      flatNo: "B-17/250",
      propertyType: "Commercial",
      floor: "3th FLoor",
      status: "OCCUPIED",
      block: "Block 1",
    },
    {
      tenants: "Ariana",
      flatNo: "B-17/250",
      propertyType: "Commercial",
      floor: "4th FLoor",
      status: "VACANT",
      block: "Block 1",
    },
    {
      tenants: "Nicki",
      flatNo: "B-17/250",
      propertyType: "Commercial",
      floor: "5th FLoor",
      status: "MAINTENANCE",
      block: "Block 1",
    },
  ];

  const onSubmit = (data) => {};

  return (
    <>
      <div className="mb-5 row align-items-center">
        <div className="col-sm-6">
          <h4 className="fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200">
            Maple Grove Residences
          </h4>
        </div>
        <div className="col-sm-6 text-end">
          {Roles && Roles.leases && Roles.leases.add ? (
            <Link
              onClick={handleShow}
              to={`/add-property`}
              className="btn btn-lg btn-green list-add-button px-3 py-2"
            >
              <span className="mr-0">
                <i className="bi bi-plus fs-1 text-white"></i>
              </span>
              Add Property
            </Link>
          ) : null}
        </div>
      </div>

      <div className={`card ${className}`}>
        <div className="card-body py-3">
          <div className="row px-7 py-3 justify-content-between align-items-center g-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row align-items-center g-2">
                  <div className="col-sm-3 col-xxl-2 mb-3">
                    <input
                      placeholder="Block"
                      className="form-control form-control-lg placeHolder"
                      type="text"
                      name="propertyId"
                      autoComplete="off"
                      maxLength={30}
                      onKeyDown={(e) => {
                        letSpeceficCharsOnly(e, REGEX.ALPHA_NUMERIC_CHARS);
                      }}
                      {...validationFunc(register, "propertyId", null, null)}
                    />
                  </div>
                  <div className="col-sm-3 col-xxl-2 mb-3">
                    <input
                      placeholder="Floor"
                      className="form-control form-control-lg placeHolder"
                      type="text"
                      name="propertyName"
                      autoComplete="off"
                      maxLength={30}
                      onKeyDown={(e) => {
                        letSpeceficCharsOnly(e, REGEX.TEXT);
                      }}
                      {...validationFunc(register, "propertyName", null, null)}
                    />
                  </div>
                  <div className="col-sm-3 col-xxl-2 mb-3">
                    <DropdownSelect
                      options={LeaseTerms}
                      placeholder="Flat No"
                      name="propertyType"
                      control={control}
                      className='autocomplete-select line-span'
                    />
                  </div>
                  <div className="col-sm-3 col-xxl-2 mb-3">
                    <input
                      placeholder="Tenants"
                      className="form-control form-control-lg placeHolder"
                      type="text"
                      name="propertyName"
                      autoComplete="off"
                      maxLength={30}
                      onKeyDown={(e) => {
                        letSpeceficCharsOnly(e, REGEX.TEXT);
                      }}
                      {...validationFunc(register, "propertyName", null, null)}
                    />
                  </div>
                  <div className="col-sm-3 col-xxl-2 mb-3">
                    <DropdownSelect
                      options={LeaseStatus}
                      placeholder="Status"
                      name="status"
                      control={control}
                      className='autocomplete-select line-span'
                    />
                  </div>
                  <div className="col-sm-3 col-xxl-2 ml-5">
                    <button
                      className="btn btn-outline reset-btn px-0"
                      onClick={handleReset}
                    >
                      <span>Reset Filters</span>
                    </button>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-sm-3 ms-auto">
                    <button
                      className={
                        _.isEmpty(sortValue || rangeValue)
                          ? "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn"
                          : "btn btn-outline btn-outline-secondary btn-active-light-secondary d-flex justify-content-between align-items-center w-100 position-relative sort-btn sort-border-color"
                      }
                      onClick={handleSort}
                    >
                      <span>Sort by</span>
                      <span>
                        <i class="bi bi-filter-left fs-1"></i>
                      </span>
                    </button>
                    {sortBy ? (
                      <div className="sort-by survey-list position-absolute z-index-2">
                        <div
                          className="p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold"
                          onClick={() => handleSortPriceClick("Low_to_High")}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Price: Low to High
                        </div>
                        <div
                          className="p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold"
                          onClick={() => handleSortPriceClick("High_to_Low")}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Price: High to Low
                        </div>
                        <div
                          className="p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold"
                          onClick={() => handleSortClick("asc")}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Property Name (A-Z)
                        </div>
                        <div
                          className="p-2 w-100 survey-option label-text-color font-size-xs font-weight-bold"
                          onClick={() => handleSortClick("desc")}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Property Name (Z-A)
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
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
                <th className="min-w-100px">Block</th>
                <th className="min-w-100px">FLoor</th>
                <th className="min-w-100px">Flat No</th>
                <th className="min-w-100px">Tenants</th>
                <th className="min-w-100px">Status</th>
                <th className="min-w-100px">Action</th>
              </tr>
            </thead>
            <tbody className="fs-6 border-bottom-1">
              {!loading ? (
                listData && listData && !_.isEmpty(listData) ? (
                  listData.map((data, id) => {
                    return (
                      <tr key={id}>
                        <td className="py-5 text-center">{id + 1}</td>
                        <td className="py-5 text-start">
                          {data.block || "--"}
                        </td>
                        <td className="py-5 text-start">
                          {data.floor || "--"}
                        </td>
                        <td className="pb-0 pt-5  text-start">
                          {data.flatNo || "--"}
                        </td>
                        <td className="pb-0 pt-5  text-start">
                          {data.tenants || "--"}
                        </td>
                        <td className="pb-0 pt-5  text-start">
                          <span
                            className={`property-list-status badge ${
                              PROPERTY_STATUS_BADGE[data.status]
                            }`}
                          >
                            {capitalizeRemoveUnderscore(data.status)}
                          </span>
                        </td>

                        <div>
                          {(Roles && Roles.leases && Roles.leases.view) ||
                          (Roles && Roles.leases && Roles.leases.edit) ||
                          (Roles && Roles.leases && Roles.leases.delete) ? (
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={
                                <i className="bi bi-three-dots fs-1 text-dark"></i>
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
                  {/* <div className="col-lg-4 mt-4">
                    <span>
                      {page === 1 ? (
                        <>
                          <span>
                            {`${limit * (page - 1) + 1}`}
                            {"-"}
                          </span>
                          { listData && listData.count ? Math.min(
                            limit * page,
                            listData && listData.count
                          ) : 10}{" "}
                          of {listData && listData.count || 'Total'}
                        </>
                      ) : page ===
                        Math.ceil(
                          listData && listData.count / limit
                        ) ? (
                        <>
                          <span>
                            {`${limit * (page - 1) + 1}`}
                            {"-"}
                          </span>
                          {listData && listData.count} of{" "}
                          {listData && listData.count}
                        </>
                      ) : (
                        <>
                          <span>
                            {`${limit * (page - 1) + 1}`}
                            {"-"}
                          </span>
                          {Math.min(
                            limit * page,
                            listData && listData.count
                          )}{" "}
                          of {listData && listData.count}
                        </>
                      )}
                    </span>
                  </div> */}
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
  const { LeasesListlistStore, LeasesListdeleteStore } = state;
  return {
    Leaseslists:
      LeasesListlistStore && LeasesListlistStore.getAllLeaseList
        ? LeasesListlistStore.getAllLeaseList
        : "",
    loading:
      LeasesListlistStore && LeasesListlistStore.loading
        ? LeasesListlistStore.loading
        : false,
    Leasesdelete:
      LeasesListdeleteStore && LeasesListdeleteStore.LeasesListdelete
        ? LeasesListdeleteStore.LeasesListdelete
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  getleaseslistDispatch: (params) =>
    dispatch(LeasesListActions.getleasesListlist(params)),
  deleteDispatch: (id) => dispatch(LeasesListdeleteActions.delete(id)),
  clearLeasesDelete: () => dispatch(LeasesListdeleteActions.clear()),
  getLandlordlistDispatch: (params) =>
    dispatch(LandlordsActions.getlandlordslist(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
