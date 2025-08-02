import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import _ from "lodash";
import {
  LandlordsActions,
  CityActions,
  StateActions,
  CountryActions,
  PropertiesActions,
  PropertyAddAction,
  PropertyGetIdActions,
  updatePropertyActions,
  MultifileAddActions,
  ImageDeleteActions,
} from "../../store/actions";
import {
  RESPONSE_STATUS,
  DROPZONE_IMAGE_NAME_TYPES,
  FILE_FORMAT_TYPE,
} from "../../utils/constants";
import { toAbsoluteUrl } from "../../theme/helpers";
import { useForm } from "react-hook-form";
import { ERRORS } from "../../utils/messages";
import { validationFunc, letNumericOnly } from "../../utils/helper";
import { ErrorWrapper, DropdownSelect, MapContainer } from "../../UIComponents";
import { Link, useLocation, useHistory } from "react-router-dom";
import Select from "react-select";
import Dropzone from "../../utils/dropzone/Dropzone";
import ReactSelect from "../../theme/layout/components/ReactSelect";
import { setPropertyEditData } from "./EditFormdata";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function PropertyAdd(props) {
  const {
    getLandlordlistDispatch,
    getCitylistDispatch,
    getStatelistDispatch,
    getCountrylistDispatch,
    getPropertieslistDispatch,
    propertyAddDispatch,
    clearPropertyAddCRMDispatch,
    PropertyAdd,
    PropertyEditDispatch,
    clearPropertyIdDetails,
    PropertyIdDetail,
    UserEdit,
    updatePropertyDispatch,
    saveupdatePropertyResponse,
    clearPropertyUpdateDispatch,
    PropertyImageAddClear,
    dropzoneStatus,
    getAllLandlords,
    Countrylists,
    Statelists,
    Citylists,
    Propertieslists,
    setActiveTab,
    setPropertyId,
    setPropDoclist,
    propertyId,
    PropertFileUpload,
    PropertyImageAddDispatch,
    PropertyDeleteImage,
    ImageIdDetail,
    PropertyDeleteImageClear,
    escriptMasterDataType,
    setShowImage,
    loading,
  } = props;

  const PropertyEditStatus = [
    {
      value: "VACANT",
      label: "Vacant",
    },
    {
      value: "REPAIR",
      label: "Repair",
    },
    {
      value: "UNDER_MAINTENANCE",
      label: "Under Maintenance",
    },
  ];

  const PropertyStatus = [
    {
      value: "VACANT",
      label: "Vacant",
    },
    {
      value: "OCCUPIED",
      label: "Occupied",
    },
    {
      value: "REPAIR",
      label: "Repair",
    },
    {
      value: "UNDER_MAINTENANCE",
      label: "Under Maintenance",
    },
  ];

  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [formdata, setFormData] = useState({
    location: "test",
    address: "",
    buildingNoOrStreetName: "",
    cityId: "",
    countryId: "",
    landLordId: "",
    propertyName: "",
    propertyOwnerName: "",
    propertySizeOrSquareFootage: "",
    propertyTypeId: "",
    stateId: "",
    surveyNo: "",
    propertyStatus: "",
    propertyImages: [],
  });
  const [errors_, setErrors] = useState({
    address: "",
    buildingNoOrStreetName: "",
    cityId: "",
    countryId: "",
    landLordId: "",
    propertyName: "",
    propertyOwnerName: "",
    propertySizeOrSquareFootage: "",
    propertyTypeId: "",
    stateId: "",
    surveyNo: "",
    propertyStatus: "",
  });
  const [selectedOptions, setSelectedOptions] = useState();
  const [defaultImages, setDefaultImages] = useState([]);
  const [landlordOption, setLandlordOption] = useState();
  const [SelectedLandlordOption, setSelectedLandlordOption] = useState("");
  const [countryOption, setCountryOption] = useState();
  const [SelectedCountryOption, setSelectedCountryOption] = useState("");
  const [StateOption, setStateOption] = useState();
  const [SelectedStateOption, setSelectedStateOption] = useState("");
  const [CityOption, setCityOption] = useState();
  const [SelectedCityOption, setSelectedCityOption] = useState("");
  const [PropertyOption, setPropertyOption] = useState();
  const [SelectedPropertyOption, setSelectedPropertyOption] = useState("");
  const [status, setSelectStatus] = useState("");
  const [isCountinue, setIsCountinue] = useState(false);
  const [isOccupied, setIsOccupied] = useState("");

  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const params = {
      status: "ACTIVE",
    };
    getLandlordlistDispatch(params);
    getCountrylistDispatch(params);
    getPropertieslistDispatch(params);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value });
  };

  const onConfirmupdate = () => {
    const id = propertyId;
    updatePropertyDispatch(id, formdata);
  };

  const clear = () => {
    setFormData({
      address: "",
      amount: "",
      buildingNoOrStreetName: "",
      propertyName: "",
      propertyOwnerName: "",
      propertySizeOrSquareFootage: "",
      surveyNo: "",
      propertyImages: [],
    });
    setSelectedLandlordOption("");
    setSelectedCountryOption("");
    setSelectedStateOption("");
    setSelectedCityOption("");
    setSelectedPropertyOption("");
    setSelectStatus("");
    setDefaultImages([]);
  };

  const onConfirm = () => {
    clear();
    history.push("/properties");
    clearPropertyIdDetails();
    reset();
    PropertyImageAddClear();
    setDefaultImages([]);
  };

  useEffect(() => {
    if (PropertyAdd && PropertyAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearPropertyAddCRMDispatch();
      Toastify({
        text: PropertyAdd && PropertyAdd.message,
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
      if (isCountinue) {
        setPropertyId(PropertyAdd && PropertyAdd.data);
        setPropDoclist(true);
        clearPropertyIdDetails();
        setShowImage(true);
      } else {
        onConfirm();
      }
    } else if (PropertyAdd && PropertyAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: PropertyAdd && PropertyAdd.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearPropertyAddCRMDispatch();
    }
  }, [PropertyAdd]);

  useEffect(() => {
    if (PropertFileUpload.code === 200) {
      const imageData = PropertFileUpload.data.map((data) => ({
        displayName: data.displayName,
        filePath: data.filePath,
        id: data.id,
        createdDate: data.createdDate,
        size: data.size,
        type: data.type,
      }));
      setFormData({ ...formdata, propertyImages: imageData });
      setDefaultImages(imageData);
    }
  }, [PropertFileUpload]);

  useEffect(() => {
    if (!_.isEmpty(propertyId)) {
      const params = {
        status: "ACTIVE",
      };
      getStatelistDispatch(params);
      getCitylistDispatch(params);
      PropertyEditDispatch(propertyId);
      setEditMode(true);
    }
  }, [propertyId]);

  useEffect(() => {
    if (
      saveupdatePropertyResponse &&
      saveupdatePropertyResponse.status === RESPONSE_STATUS.SUCCESS
    ) {
      Toastify({
        text: saveupdatePropertyResponse && saveupdatePropertyResponse.message,
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
      clearPropertyUpdateDispatch();
      // clearPropertyIdDetails()
      if (isCountinue) {
        setPropertyId(propertyId);
        setPropDoclist(true);
        setShowImage(true);
        clearPropertyIdDetails();
      } else {
        onConfirm();
      }
    } else if (
      saveupdatePropertyResponse &&
      saveupdatePropertyResponse.status === RESPONSE_STATUS.ERROR
    ) {
      Toastify({
        text: saveupdatePropertyResponse && saveupdatePropertyResponse.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      clearPropertyUpdateDispatch();
    }
  }, [saveupdatePropertyResponse]);

  useEffect(() => {
    if (ImageIdDetail && ImageIdDetail.code === 200) {
      Toastify({
        text: ImageIdDetail && ImageIdDetail.message,
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
      PropertyDeleteImageClear();
    } else if (ImageIdDetail && ImageIdDetail.code !== 200) {
      Toastify({
        text: ImageIdDetail && ImageIdDetail.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bb2124",
        },
      }).showToast();
      PropertyDeleteImageClear();
    }
  }, [ImageIdDetail]);

  const handleChangeLanlord = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLandlordOption(selectedOption);
      setFormData((values) => ({
        ...values,
        landLordId: selectedOption.value,
      }));
      setErrors({ ...errors, landLordId: "" });
    } else {
      setSelectedLandlordOption();
      setFormData((values) => ({ ...values, landLordId: "" }));
    }
  };

  const handleChangeCountry = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCountryOption(selectedOption);
      setFormData((values) => ({ ...values, countryId: selectedOption.value }));
      setSelectedStateOption("");
      setSelectedCityOption("");
      const params = {
        countryId: selectedOption.value,
        status: "ACTIVE",
      };
      getStatelistDispatch(params);
      setErrors({ ...errors, countryId: "" });
    } else {
      setSelectedCountryOption();
      setFormData((values) => ({ ...values, countryId: "" }));
    }
  };

  const handleChangeState = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedStateOption(selectedOption);
      setSelectedCityOption("");
      setFormData((values) => ({ ...values, stateId: selectedOption.value }));
      const params = {
        stateId: selectedOption.value,
        status: "ACTIVE",
      };
      getCitylistDispatch(params);
      setErrors({ ...errors, stateId: "" });
    } else {
      setSelectedStateOption();
      setFormData((values) => ({ ...values, stateId: "" }));
    }
  };

  const handleChangeCity = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedCityOption(selectedOption);
      setFormData((values) => ({ ...values, cityId: selectedOption.value }));
      setErrors({ ...errors, cityId: "" });
    } else {
      setSelectedCityOption();
      setFormData((values) => ({ ...values, cityId: "" }));
    }
  };

  const handleChangeProperty = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedPropertyOption(selectedOption);
      setFormData((values) => ({
        ...values,
        propertyTypeId: selectedOption.value,
      }));
      setErrors({ ...errors, propertyTypeId: "" });
    } else {
      setSelectedPropertyOption();
      setFormData((values) => ({ ...values, propertyTypeId: "" }));
    }
  };

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectStatus(selectedOption);
      setFormData((values) => ({
        ...values,
        propertyStatus: selectedOption.value,
      }));
      setErrors({ ...errors, propertyStatus: "" });
    } else {
      setSelectStatus();
      setFormData((values) => ({ ...values, propertyStatus: "" }));
    }
  };

  useEffect(() => {
    const data = getAllLandlords && getAllLandlords.data;
    const landLord = getDefaultOptions(data);
    setLandlordOption(landLord);
  }, [getAllLandlords]);

  useEffect(() => {
    const data = Countrylists && Countrylists.data;
    const countryList = getDefaultOptionsCountry(data);
    setCountryOption(countryList);
  }, [Countrylists]);

  useEffect(() => {
    const data = Statelists && Statelists.data;
    const stateList = getDefaultOptionsState(data);
    setStateOption(stateList);
  }, [Statelists]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    const data = Citylists && Citylists.data;
    const cityList = getDefaultOptionsCity(data);
    setCityOption(cityList);
  }, [Citylists]);

  useEffect(() => {
    const data = Propertieslists && Propertieslists.data;
    const propertyList = getDefaultOptionsProperty(data);
    setPropertyOption(propertyList);
  }, [Propertieslists]);

  const getDefaultOptions = (landLord) => {
    const defaultOptions = [];
    for (const item in landLord) {
      defaultOptions.push({
        label: landLord[item].firstName,
        value: landLord[item].id,
      });
    }
    return defaultOptions;
  };

  const getDefaultOptionsCountry = (countryList) => {
    const defaultOptions = [];
    for (const item in countryList) {
      defaultOptions.push({
        label: countryList[item].countryName,
        value: countryList[item].id,
      });
    }
    return defaultOptions;
  };

  const getDefaultOptionsState = (stateList) => {
    const defaultOptions = [];
    for (const item in stateList) {
      defaultOptions.push({
        label: stateList[item].stateName,
        value: stateList[item].id,
      });
    }
    return defaultOptions;
  };

  const getDefaultOptionsCity = (cityList) => {
    const defaultOptions = [];
    for (const item in cityList) {
      defaultOptions.push({
        label: cityList[item].cityName,
        value: cityList[item].id,
      });
    }
    return defaultOptions;
  };

  const getDefaultOptionsProperty = (propertyList) => {
    const defaultOptions = [];
    for (const item in propertyList) {
      defaultOptions.push({
        label: propertyList[item].propertyType,
        value: propertyList[item].id,
      });
    }
    return defaultOptions;
  };
  useEffect(() => {
    if (PropertyIdDetail && PropertyIdDetail.status === "ok") {
      const data = setPropertyEditData(PropertyIdDetail.data);
      setFormData(data);
      const imageData =
        PropertyIdDetail &&
        PropertyIdDetail.data &&
        PropertyIdDetail.data.propertyImages;
      setDefaultImages(imageData);
      const userDetils = PropertyIdDetail && PropertyIdDetail.data;
      const landLordId = userDetils.landLord;
      if (landLordId && landLordId.id) {
        const datas = getDefaultOptions(
          getAllLandlords && getAllLandlords.data
        );
        const selOption = datas.find((x) => x.value === landLordId.id);
        if (selOption) {
          setSelectedLandlordOption([selOption]);
          setFormData((values) => ({ ...values, landLordId: landLordId.id }));
        }
      }
      const countryId = userDetils.country;
      if (countryId && countryId.id) {
        const datas = getDefaultOptionsCountry(
          Countrylists && Countrylists.data
        );
        const selOption = datas.find((x) => x.value === countryId.id);
        if (selOption) {
          setSelectedCountryOption([selOption]);
          setFormData((values) => ({ ...values, countryId: countryId.id }));
        }
      }
      const propertyTypeId = userDetils.propertyType;
      if (propertyTypeId && propertyTypeId.id) {
        const datas = getDefaultOptionsProperty(
          Propertieslists && Propertieslists.data
        );
        const selOption = datas.find((x) => x.value === propertyTypeId.id);
        if (selOption) {
          setSelectedPropertyOption([selOption]);
          setFormData((values) => ({
            ...values,
            propertyTypeId: propertyTypeId.id,
          }));
        }
      }
      const status = userDetils.propertyStatus;
      setIsOccupied(status);
      if (status) {
        const selOption = PropertyStatus.find((x) => x.value === status);
        if (selOption) {
          setSelectStatus(selOption);
          setFormData((values) => ({ ...values, propertyStatus: status }));
        }
      }
    }
  }, [PropertyIdDetail, editMode, getAllLandlords, Propertieslists]);

  useEffect(() => {
    if (editMode) {
      const userDetils = PropertyIdDetail && PropertyIdDetail.data;
      const stateId = userDetils && userDetils.state;
      if (stateId && stateId.id) {
        const datas = getDefaultOptionsState(Statelists && Statelists.data);
        const selOption = datas.find((x) => x.value === stateId.id);
        setSelectedStateOption([selOption]);
        if (selOption) {
          setSelectedStateOption([selOption]);
          setFormData((values) => ({ ...values, stateId: stateId.id }));
        }
      }
    }
  }, [editMode, Statelists, PropertyIdDetail]);

  useEffect(() => {
    if (editMode) {
      const userDetils = PropertyIdDetail && PropertyIdDetail.data;
      const cityId = userDetils.city;
      if (cityId && cityId.id) {
        const datas = getDefaultOptionsCity(Citylists && Citylists.data);
        const selOption = datas.find((x) => x.value === cityId.id);
        if (selOption) {
          setSelectedCityOption([selOption]);
          setFormData((values) => ({ ...values, cityId: cityId.id }));
        }
      }
    }
  }, [editMode, Citylists, PropertyIdDetail]);

  const handelUpload = (e) => {
    document.getElementById("upload").click(e);
  };

  const fileUpload = (e) => {
    const files = e.target.files;
    const uploadArray = [];
    for (var i = 0; i < files.length; i++) {
      uploadArray.push(files[i]);
    }
    const data = new FormData();
    const length = uploadArray.length;
    for (let i = 0; i < length; i++) {
      data.append("file", uploadArray[i]);
    }
    PropertyImageAddDispatch(data, "PropertyImage");
  };

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, propertyImages: updatedImages });
    PropertyDeleteImage(id);
  };

  const onSubmit = (data) => {
    setActiveTab("Documents");
  };

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name && (type = "change")) {
        const value = values[name];
        console.log("value, name, type", value, name, type);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  const arr = [1,2,3,4,5,6]

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <div className="col-md-4">
            <div className="mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Block
              </label>
              <div className="w-100">
                <DropdownSelect
                  options={landlordOption}
                  placeholder="Select here"
                  name="block"
                  control={control}
                  msg={ERRORS.setRegMsg("Block")}
                />
                <ErrorWrapper error={errors && errors.block} />
              </div>
            </div>
            <div className=" mb-4 pr-10">
              <label className="required font-size-xs font-weight-bold mb-3 form-label">
                Unit/Flat No
              </label>
              <div className="w-100">
                <input
                  placeholder="Type here"
                  className="form-control form-control-lg ps-4 placeHolder"
                  type="text"
                  name="unitNo"
                  {...validationFunc(
                    register,
                    "unitNo",
                    null,
                    ERRORS.setRegMsg("Unit/Flat No")
                  )}
                />
                <ErrorWrapper error={errors && errors.unitNo} />
              </div>
            </div>
            <div className=" mb-4 pr-10">
              <label className="required font-size-xs font-weight-bold mb-3 form-label">
                Bedrooms
              </label>
              <div className="w-100">
                <input
                  placeholder="Type here"
                  className="form-control form-control-lg ps-4 placeHolder"
                  type="text"
                  name="bedrooms"
                  {...validationFunc(
                    register,
                    "bedrooms",
                    null,
                    ERRORS.setRegMsg("Bedrooms")
                  )}
                />
                <ErrorWrapper error={errors && errors.bedrooms} />
              </div>
            </div>
            <div className="mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Balcony
              </label>
              <div className="w-100">
                <DropdownSelect
                  options={landlordOption}
                  placeholder="Select here"
                  name="balcony"
                  control={control}
                  msg={ERRORS.setRegMsg("Balcony")}
                />
                <ErrorWrapper error={errors && errors.balcony} />
              </div>
            </div>
            <div className="mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Parking
              </label>
              <div className="w-100">
                <DropdownSelect
                  options={landlordOption}
                  placeholder="Select here"
                  name="parking"
                  control={control}
                  msg={ERRORS.setRegMsg("Parking")}
                />
                <ErrorWrapper error={errors && errors.parking} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Floor
              </label>
              <div className="w-100">
                <DropdownSelect
                  options={landlordOption}
                  placeholder="Select here"
                  name="floor"
                  control={control}
                  msg={ERRORS.setRegMsg("Floor")}
                />
                <ErrorWrapper error={errors && errors.floor} />
              </div>
            </div>
            <div className=" mb-4 pr-10">
              <label className="required font-size-xs font-weight-bold mb-3 form-label">
                Property Size or Square Footage
              </label>
              <div className="w-100">
                <input
                  placeholder="Type here"
                  className="form-control form-control-lg ps-4 placeHolder"
                  type="text"
                  name="propertySquareFootage"
                  {...validationFunc(
                    register,
                    "propertySquareFootage",
                    null,
                    ERRORS.setRegMsg("Property Size or Square Footage")
                  )}
                />
                <ErrorWrapper error={errors && errors.propertySquareFootage} />
              </div>
            </div>
            <div className=" mb-4 pr-10">
              <label className="required font-size-xs font-weight-bold mb-3 form-label">
                Bathrooms
              </label>
              <div className="w-100">
                <input
                  placeholder="Type here"
                  className="form-control form-control-lg ps-4 placeHolder"
                  type="text"
                  name="bathrooms"
                  {...validationFunc(
                    register,
                    "bathrooms",
                    null,
                    ERRORS.setRegMsg("Bathrooms")
                  )}
                />
                <ErrorWrapper error={errors && errors.bathrooms} />
              </div>
            </div>
            <div className="mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label required">
                Furnished Status
              </label>
              <div className="w-100">
                <DropdownSelect
                  options={landlordOption}
                  placeholder="Select here"
                  name="furnishedStatus"
                  control={control}
                  msg={ERRORS.setRegMsg("Furnished Status")}
                />
                <ErrorWrapper error={errors && errors.furnishedStatus} />
              </div>
            </div>
            <div className=" mb-4 pr-10">
              <label className="required font-size-xs font-weight-bold mb-3 form-label">
                Parking Slot
              </label>
              <div className="w-100">
                <input
                  placeholder="Type here"
                  className="form-control form-control-lg ps-4 placeHolder"
                  type="text"
                  name="parkingSlot"
                  {...validationFunc(
                    register,
                    "parkingSlot",
                    null,
                    ERRORS.setRegMsg("Parking Slot")
                  )}
                />
                <ErrorWrapper error={errors && errors.parkingSlot} />
              </div>
            </div>
          </div>
          <div className="col-md-4 p-0">
            <div className="row">
              {
                arr.map((o) => (
                  <div className="col-sm-4 col-md-4 col-lg-4 p-0" key={o}>
                    <Dropzone
                      defaultImages={defaultImages}
                      type={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
                      multiple={false}
                      thumbnail={false}
                      maxFileSize="5"
                      name={`${DROPZONE_IMAGE_NAME_TYPES.IMAGE.toLowerCase()}`}
                      flag={DROPZONE_IMAGE_NAME_TYPES.IMAGE}
                      formatType={FILE_FORMAT_TYPE}
                      escriptMasterDataType={"Landlord"}
                      id="Dropzones"
                      placeHolderImg={toAbsoluteUrl(
                        "/media/avatars/preview-image/placeholder.png"
                      )}
                      placeHolderWidth="100%"
                      placeHolderHeight="80%"
                    />
                  </div>
                  ))
              }
            </div>
          </div>
          <div className="col-md-8 col-sm-3">
            <div className=" mb-4 pr-10">
              <label className="font-size-xs font-weight-bold mb-3 form-label">
                Notes
              </label>
              <div className="w-100">
                <textarea
                  placeholder="Type here"
                  className="form-control form-control-lg"
                  type="text"
                  name="notes"
                  id="notes"
                  autoComplete="off"
                  rows={2}
                  onKeyDown={(e) => {
                    if (formdata.notes.length >= 150) {
                      e.preventDefault();
                    }
                  }}
                  {...validationFunc(register, "notes", null, null)}
                />
                <ErrorWrapper error={errors && errors.notes} />
              </div>
            </div>
          </div>
          <div className="form-group row mb-4">
            <div className="col-lg-12 text-center">
              <button
                type="button"
                className="btn btn-blue-outline py-2 m-2"
                onClick={(e) => onConfirm()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-secondary py-2 m-2"
              >
                {editMode ? "Update" : "Save"}
              </button>
              <button
                type="submit"
                className="btn btn-blue py-2 m-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    PropertyAddStore,
    editPropertyStore,
    updatePropertyStore,
    dropzoneStore,
    LandlordslistStore,
    CountrylistStore,
    StatelistStore,
    CitylistStore,
    PropertieslistStore,
    MultifileAddStore,
    ImageDeleteStore,
  } = state;
  return {
    PropertyAdd:
      PropertyAddStore && PropertyAddStore.PropertyAdd
        ? PropertyAddStore.PropertyAdd
        : "",
    PropertyIdDetail:
      editPropertyStore && editPropertyStore.PropertyIdDetail
        ? editPropertyStore.PropertyIdDetail
        : "",
    saveupdatePropertyResponse:
      updatePropertyStore && updatePropertyStore.saveupdatePropertyResponse
        ? updatePropertyStore.saveupdatePropertyResponse
        : "",
    dropzoneImage:
      dropzoneStore &&
      dropzoneStore.dropzoneImage &&
      dropzoneStore.dropzoneImage.data
        ? dropzoneStore.dropzoneImage.data
        : [],
    dropzoneStatus:
      dropzoneStore &&
      dropzoneStore.dropzoneImage &&
      dropzoneStore.dropzoneImage.status
        ? dropzoneStore.dropzoneImage.status
        : "",
    getAllLandlords:
      LandlordslistStore && LandlordslistStore.getAllLandlords
        ? LandlordslistStore.getAllLandlords
        : "",
    Countrylists:
      CountrylistStore && CountrylistStore.Countrylists
        ? CountrylistStore.Countrylists
        : "",
    Statelists:
      StatelistStore && StatelistStore.Statelists
        ? StatelistStore.Statelists
        : "",
    Citylists:
      CitylistStore && CitylistStore.Citylists ? CitylistStore.Citylists : "",
    Propertieslists:
      PropertieslistStore && PropertieslistStore.Propertieslists
        ? PropertieslistStore.Propertieslists
        : "",
    PropertFileUpload:
      MultifileAddStore && MultifileAddStore.PropertyAdd
        ? MultifileAddStore.PropertyAdd
        : [],
    ImageIdDetail:
      ImageDeleteStore && ImageDeleteStore.Imagedelete
        ? ImageDeleteStore.Imagedelete
        : "",
    loading:
      MultifileAddStore && MultifileAddStore.loading
        ? MultifileAddStore.loading
        : false,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLandlordlistDispatch: (data) =>
    dispatch(LandlordsActions.getlandlordslist(data)),
  getCitylistDispatch: (data) => dispatch(CityActions.getcitylist(data)),
  getStatelistDispatch: (data) => dispatch(StateActions.getStatelist(data)),
  getCountrylistDispatch: (data) =>
    dispatch(CountryActions.getcountrylist(data)),
  getPropertieslistDispatch: (data) =>
    dispatch(PropertiesActions.getpropertyTypelist(data)),
  propertyAddDispatch: (data) => dispatch(PropertyAddAction.PropertyAdd(data)),
  clearPropertyAddCRMDispatch: () =>
    dispatch(PropertyAddAction.clearProperty()),
  PropertyEditDispatch: (id) =>
    dispatch(PropertyGetIdActions.getPropertyIdDetails(id)),
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
  updatePropertyDispatch: (id, params) =>
    dispatch(updatePropertyActions.updateProperty(id, params)),
  clearPropertyUpdateDispatch: () =>
    dispatch(updatePropertyActions.clearupdateProperty()),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  PropertyImageAddClear: (data, name) =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails(data, name)),
  PropertyDeleteImage: (id) => dispatch(ImageDeleteActions.delete(id)),
  PropertyDeleteImageClear: (id) => dispatch(ImageDeleteActions.clear(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyAdd);
