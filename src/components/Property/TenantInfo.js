import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import { validationFunc, downloadFiles } from "../../utils/helper";
import _ from "lodash";
import {
  PropertyDocumentTypeActions,
  PropertyDocumentAddAction,
} from "../../store/actions";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "../../theme/helpers";

function TenantInfo(props) {
  const {
    Open,
    editId,
    setActiveTab,
    loading,
  } = props;

  const pathName = useLocation().pathname;
  const url = pathName && pathName.split("/");
  const currentIdUpdate = url && url[2];
  const currentId = editId;
  const [editMode, setEditMode] = useState(false);

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const aadharData = [
    {
      name: "Aadhar.png",
      date: "2 Dec, 2022",
    },
    {
      name: "Aadhar.png",
      date: "2 Dec, 2022",
    },
    {
      name: "Pancard.png",
      date: "2 Dec, 2022",
    },
  ];

  const pdfUrl ='https://getsamplefiles.com/download/zip/sample-1.zip'

  const handleCancel = () => {
    setActiveTab("Documents");
  }

  const handleContinue = () => {
    
  }

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name && (type = "change")) {
        const value = values[name];
        console.log("value, name, type", value, name, type);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <div className="d-flex border border-dark-subtle rounded">
        <div className="p-4 py-8 flex-grow-1">
          <h5 className="fw-bolder fs-3 text-dark-800 mb-5">Tenant Info</h5>
          <div className="mb-4 pr-10">
            <label className="font-size-xs font-weight-bold mb-3 form-label">
              Tenant/Landlords ID
            </label>
            <div className="w-100">
              <div className="position-relative w-md-100 w-lg-75 w-xl-50">
                <span
                  className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-1 ms-8"
                  id="basic-addon1"
                >
                  <i className="bi bi-search fs-2" />
                </span>
                 <input
                  placeholder="Search..."
                  className="form-control form-control-lg ps-13"
                  type="search"
                  name="search"
                  autoComplete="off"
                  {...validationFunc(
                    register,
                    "search",
                    null,
                    null
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-15">
            <div className="row">
              <div className="col-3">
                <p>Name</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Zaire Stanton</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Email Address</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Zairestanton@gmail.com</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Mobile Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">+918778156623</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Address</p>
              </div>
              <div className="col">
                <p className="fw-bolder">
                  28 Harris Complx, Shop 11 Harris Raod Pudupet Chennai, Tamil
                  Nadu, 600002
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Aadhar Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">8580-3038-2541</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Pan Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">ABCTY1234D</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="row">
              <div className="col-3">
                <p>Name</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Lydia Baptista</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Relationship</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Mother</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Mobile Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">+918778156623</p>
              </div>
            </div>
          </div>
          <h6 className="fw-bold fs-3 text-dark-800 my-5">Nominee</h6>
          <div className="mt-6">
            <div className="row">
              <div className="col-3">
                <p>Name</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Ruben Korsgaard</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Email Address</p>
              </div>
              <div className="col">
                <p className="fw-bolder">Rubenkorsgaard@gmail.com</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Mobile Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">918778156623</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Address</p>
              </div>
              <div className="col">
                <p className="fw-bolder">
                  9/430, Anna Ngr Main Road, N S K Nagar, Chennai, Tamil Nadu,
                  600106
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Aadhar Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">2625-2331-7140</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Pan Number</p>
              </div>
              <div className="col">
                <p className="fw-bolder">MBCTY1234D</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-start border-dark-subtle p-3 flex-column">
          <div
            class="d-flex align-items-start flex-column mb-3 py-6 px-3"
            style={{ width: 300 }}
          >
            <div className="d-flex justify-content-center w-100 mb-3">
              <img
                src={toAbsoluteUrl("/media/avatars/preview-image/blank.png")}
                className="img-fluid rounded float-start"
                style={{ height: 150, width: 150 }}
                alt="..."
              />
            </div>
            <p className="fw-bold fs-4 text-dark-800 my-5">
              Tenants/Landlords Documents
            </p>
            {aadharData.map((item, i) => (
              <div
                className="d-flex align-items-center w-100 mb-3 border border-dark-subtle rounded"
                key={i}
                role="button" tabIndex="0"
                onClick={() => downloadFiles(pdfUrl)}
              >
                <div className="p-2">
                  <img
                    src={toAbsoluteUrl("/media/avatars/preview-image/png.png")}
                    className="img-fluid rounded float-start"
                    style={{ height: 20, width: 20 }}
                    alt="..."
                  />
                </div>
                <div className="p-2 flex-grow-1">
                  <p className="fw-bold fs-8 text-dark-800 mb-0">{item.name}</p>
                </div>
                <div className="ms-auto p-2">
                  <i class="bi bi-download"></i>
                </div>
              </div>
            ))}
            <p className="fw-bold fs-4 text-dark-800 my-5">Nominee Image</p>
            <img
              src={toAbsoluteUrl("/media/avatars/preview-image/blank.png")}
              className="img-fluid rounded float-start"
              style={{ height: 100, width: 100 }}
              alt="..."
            />
            <p className="fw-bold fs-4 text-dark-800 my-5">Nominee Documents</p>
            {aadharData.map((item, i) => (
              <div
                className="d-flex align-items-center w-100 mb-3 border border-dark-subtle rounded"
                key={i}
                role="button" tabIndex="0"
                onClick={() => downloadFiles(pdfUrl)}
              >
                <div className="p-2">
                  <img
                    src={toAbsoluteUrl("/media/avatars/preview-image/png.png")}
                    className="img-fluid rounded float-start"
                    style={{ height: 20, width: 20 }}
                    alt="..."
                  />
                </div>
                <div className="p-2 flex-grow-1">
                  <p className="fw-bold fs-8 text-dark-800 mb-0">{item.name}</p>
                  <p className="fs-9 text-dark-400 mb-0">{item.date}</p>
                </div>
                <div className="ms-auto p-2">
                  <i class="bi bi-download"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row mt-10 mb-4">
            <div className="col-lg-12 text-center">
              <button
                type="button"
                className="btn btn-blue-outline py-2 m-2"
                onClick={() => { handleCancel() }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-secondary py-2 m-2"
                onClick={() => { handleContinue() }}
              >
                {editMode ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-blue py-2 m-2"
                onClick={() => { handleContinue() }}
              >
                Continue
              </button>
            </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { MultifileAddStore } = state;
  return {
    loading:
      MultifileAddStore && MultifileAddStore.loading
        ? MultifileAddStore.loading
        : false,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPropertyDocTypelistDispatch: (data) =>
    dispatch(PropertyDocumentTypeActions.getpropertyDocumentTypelist(data)),
  propertyDocAddDispatch: (data) =>
    dispatch(PropertyDocumentAddAction.PropertyDocAdd(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TenantInfo);
