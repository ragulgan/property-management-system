import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import _ from "lodash";
import {
  FlatAddAction,
  FlatGetIdActions,
  updateFlatActions,
  MultifileAddActions,
  ImageDeleteActions,
  getApartmentDetialsActions
} from "../../store/actions";
import {
  RESPONSE_STATUS,
  FLAT_MANAGEMENT_ERROR,
  PROFILE_URL,
} from "../../utils/constants";
import { toAbsoluteUrl } from "../../theme/helpers";
import { letNumericOnly } from "../../utils/helper";
import { Link, useLocation, useHistory } from "react-router-dom";
import ReactSelect from "../../theme/layout/components/ReactSelect";
import { setFlatEditData } from "./EditFormdata";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function FlatAdd(props) {
  const {
    apartmentIdDetailsDispatch,
    clearApartmentDetails,
    flatAddDispatch,
    clearFlatAddDispatch,
    FlatAdd,
    flatEditDispatch,
    clearFlatIdDetails,
    FlatIdDetail,
    updateFlatDispatch,
    saveupdateFlatResponse,
    clearFlatUpdateDispatch,
    PropertyImageAddClear,
    ApartmentIdDetail,
    setActiveTab,
    setFlatId,
    setFlatDoclist,
    flatId,
    PropertFileUpload,
    PropertyImageAddDispatch,
    PropertyDeleteImage,
    ImageIdDetail,
    PropertyDeleteImageClear,
    escriptMasterDataType,
    setShowImage,
    loading,
    apartmentSelect
  } = props;

  const FurnishedStatus = [
    {
      value: "FULL_FURNISHED",
      label: "Fully-Furnished",
    },
    {
      value: "SEMI_FURNISHED",
      label: "Semi-Furnished",
    },
    {
      value: "UNFURNISHED",
      label: "Unfurnished",
    }
  ];

  const OrientationOptions = [
    {
      value: "NORTH_FACING",
      label: "North-facing",
    },
    {
      value: "EAST_FACING",
      label: "East-facing",
    },
    {
      value: "WEST_FACING",
      label: "West-facing",
    },
    {
      value: "SOUTH_FACING",
      label: "South-facing",
    }
  ];

  const ParkingAvailability = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    }
  ];

  const VehicleDetails  = [
    {
      value: "BIKE",
      label: "Bike",
    },
    {
      value: "CAR",
      label: "Car",
    },
    {
      value: "CAR_BIKE",
      label: "Bike & Car",
    },
  ];

  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [formdata, setFormData] = useState({
    block: "",
    propertySize: "",
    kitchen: "",
    isFurnished: "",
    floor: "",
    bedRoom: "",
    balcony: "",
    isParking: "",
    flatNo: "",
    bathRoom: "",
    orientation: "",
    vehicleDetail: "",
    notes: "",
    flatImages: [],
    apartmentId: "",
    // currentOccupant: "",
    // flatOwner: "",
    // isRent: false,
    // status: "",
    // tenant: ""
  });
  const [errors, setErrors] = useState({
    block: "",
    propertySize: "",
    kitchen: "",
    isFurnished: "",
    floor: "",
    bedRoom: "",
    balcony: "",
    isParking: "",
    flatNo: "",
    bathRoom: "",
    orientation: "",
    vehicleDetail: "",
    notes: "",
  });
  const [selectedOptions, setSelectedOptions] = useState();
  const [defaultImages, setDefaultImages] = useState([]);
  const [furnished, setFurnished] = useState('');
  const [orientation, setOrientation] = useState('');
  const [parkingSlot, setParkingSlot] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [blockOption, setBlockOption] = useState();
  const [SelectedBlockOption, setSelectedBlockOption] = useState("");
  const [floorOption, setFloorOption] = useState();
  const [SelectedFloorOption, setSelectedFloorOption] = useState("");
  const [isCountinue, setIsCountinue] = useState(false);
  const [imageClickChange, setImageClickChange] = useState('')
  const [previewImageBorder, setPreviewImageBorder] = useState('')

  useEffect(() => {
    if(!_.isEmpty(apartmentSelect) && !_.isEmpty(apartmentSelect.value)) {
      apartmentIdDetailsDispatch(apartmentSelect.value)
    }
  }, [apartmentSelect]);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSelectedOptions({ ...selectedOptions, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, name) => {
    const errors = {}
    if (_.isEmpty(formdata.notes)) {
      errors.notes = FLAT_MANAGEMENT_ERROR.NOTES
      document.getElementById('notes').focus()
    }
    if (_.isEmpty(formdata.vehicleDetail)) {
      errors.vehicleDetail = FLAT_MANAGEMENT_ERROR.VEHICLE_SELECT
      document.getElementById('vehicleDetail').focus()
    }
    if (_.isEmpty(formdata.isParking)) {
      errors.isParking = FLAT_MANAGEMENT_ERROR.PARKING_SLOT
      document.getElementById('isParking').focus()
    }
    if (_.isEmpty(formdata.isFurnished)) {
      errors.isFurnished = FLAT_MANAGEMENT_ERROR.FURNISH_STATUS
      document.getElementById('isFurnished').focus()
    }
    if (_.isEmpty(formdata.orientation)) {
      errors.orientation = FLAT_MANAGEMENT_ERROR.ORIENTATION
      document.getElementById('orientation').focus()
    }
    if (_.isEmpty(formdata.balcony)) {
      errors.balcony = FLAT_MANAGEMENT_ERROR.BALCONY_SELECT
      document.getElementById('balcony').focus()
    }
    if (_.isEmpty(formdata.kitchen)) {
      errors.kitchen = FLAT_MANAGEMENT_ERROR.KITCHEN_SELECT
      document.getElementById('kitchen').focus()
    }
    if (_.isEmpty(formdata.bathRoom)) {
      errors.bathRoom = FLAT_MANAGEMENT_ERROR.BATH_ROOM
      document.getElementById('bathRoom').focus()
    }
    if (_.isEmpty(formdata.bedRoom)) {
      errors.bedRoom = FLAT_MANAGEMENT_ERROR.BED_ROOM
      document.getElementById('bedRoom').focus()
    }
    if (_.isEmpty(formdata.propertySize)) {
      errors.propertySize = FLAT_MANAGEMENT_ERROR.SQUARE_FOOT
      document.getElementById('propertySize').focus()
    }
    if (_.isEmpty(formdata.flatNo)) {
      errors.flatNo = FLAT_MANAGEMENT_ERROR.UNIT_NUMBER
      document.getElementById('flatNo').focus()
    }
    if (_.isEmpty(formdata.floor)) {
      errors.floor = FLAT_MANAGEMENT_ERROR.FLOOR_SELECT
      document.getElementById('floor').focus()
    }
    if (_.isEmpty(formdata.block)) {
      errors.block = FLAT_MANAGEMENT_ERROR.BLOCK_SELECT
      document.getElementById('block').focus()
    }
    // console.log("formData +++++++>", formdata);
    setErrors(errors)
    if (_.isEmpty(errors)) {
      if (editMode) {
        onConfirmupdate()
      } else {
        flatAddDispatch({...formdata, apartmentId: apartmentSelect.value })
      }
      if (!_.isEmpty(name)) {
        setIsCountinue(true)
        setFlatDoclist(true)
      } else {
        setIsCountinue(false)
      }
    }
  };

  const onConfirmupdate = () => {
    const id = flatId;
    updateFlatDispatch(id, formdata);
  };

  const clear = () => {
    setFormData({
      block: "",
      propertySize: "",
      kitchen: "",
      isFurnished: "",
      floor: "",
      bedRoom: "",
      balcony: "",
      isParking: "",
      flatNo: "",
      bathRoom: "",
      orientation: "",
      vehicleDetail: "",
      notes: "",
      flatImages: []
    });
    setFurnished('');
    setOrientation('');
    setVehicleDetails('');
    setSelectedBlockOption("");
    setSelectedFloorOption("");
    setDefaultImages([]);
    setImageClickChange('')
    setPreviewImageBorder('')
    clearApartmentDetails()
  };

  const onConfirm = () => {
    clear();
    history.push("/flatList", {state:apartmentSelect});
    clearFlatIdDetails();
    PropertyImageAddClear();
  };

  useEffect(() => {
    if (FlatAdd && FlatAdd.status === RESPONSE_STATUS.SUCCESS) {
      clearFlatAddDispatch();
      Toastify({
        text: FlatAdd && FlatAdd.message,
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
        setFlatId(FlatAdd && FlatAdd.data);
        setFlatDoclist(true);
        clearFlatIdDetails();
        setShowImage(true);
        setActiveTab("Documents")
      } else {
        onConfirm();
      }
    } else if (FlatAdd && FlatAdd.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: FlatAdd && FlatAdd.message,
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
      clearFlatAddDispatch();
    }
  }, [FlatAdd]);

  useEffect(() => {
    if (PropertFileUpload && PropertFileUpload.code === 200) {
      const imageData = PropertFileUpload.data.map((data) => ({
        displayName: data.displayName,
        filePath: data.filePath,
        id: data.id,
        createdDate: data.createdDate,
        size: data.size,
        type: data.type,
      }));
      setFormData({ ...formdata, flatImages: imageData });
      setDefaultImages(imageData);
      setImageClickChange(`${PROFILE_URL}${imageData[0].filePath}`)
      setPreviewImageBorder(imageData[0].id)
    }
  }, [PropertFileUpload]);

  useEffect(() => {
    if (!_.isEmpty(flatId)) {
      flatEditDispatch(flatId);
      setEditMode(true);
    }
  }, [flatId]);

  useEffect(() => {
    if (
      saveupdateFlatResponse &&
      saveupdateFlatResponse.status === RESPONSE_STATUS.SUCCESS
    ) {
      Toastify({
        text: saveupdateFlatResponse && saveupdateFlatResponse.message,
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
      clearFlatUpdateDispatch();
      // clearFlatIdDetails()
      if (isCountinue) {
        setFlatId(flatId);
        setFlatDoclist(true);
        setShowImage(true);
        clearFlatIdDetails();
        setActiveTab("Documents")
      } else {
        onConfirm();
      }
    } else if (
      saveupdateFlatResponse &&
      saveupdateFlatResponse.status === RESPONSE_STATUS.ERROR
    ) {
      Toastify({
        text: saveupdateFlatResponse && saveupdateFlatResponse.message,
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
      clearFlatUpdateDispatch();
    }
  }, [saveupdateFlatResponse]);

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

  const handleChangeBlock = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedBlockOption(selectedOption);
      const floorNo = parseInt(selectedOption.floor)
      const array = new Array(floorNo).fill().map((_, index) => new Object ({label: (index + 1).toString(), value: (index + 1).toString()}));
      setFloorOption(array);
      setFormData((values) => ({
        ...values,
        block: selectedOption.value,
      }));
      setErrors({ ...errors, block: "" });
    } else {
      setSelectedBlockOption();
      setFormData((values) => ({ ...values, block: "" }));
    }
  };

  const handleChangeFloor = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedFloorOption(selectedOption);
      setFormData((values) => ({
        ...values,
        floor: selectedOption.value,
      }));
      setErrors({ ...errors, floor: "" });
    } else {
      setSelectedFloorOption();
      setFormData((values) => ({ ...values, floor: "" }));
    }
  };

  const handleChangeFurnished = (selectedOption) => {
    if (selectedOption !== null) {
      setFurnished(selectedOption)
      setFormData(values => ({ ...values, isFurnished: selectedOption.value }))
      setErrors({ ...errors, isFurnished: "" });
    } else {
      setFurnished()
      setFormData((values) => ({ ...values, isFurnished: "" }));
    }
  }

  const handleChangeOrientation = (selectedOption) => {
    if (selectedOption !== null) {
      setOrientation(selectedOption)
      setFormData(values => ({ ...values, orientation: selectedOption.value }))
      setErrors({ ...errors, orientation: "" });
    } else {
      setOrientation()
      setFormData((values) => ({ ...values, orientation: "" }));
    }
  }

  const handleChangeParking = (selectedOption) => {
    if (selectedOption !== null) {
      setParkingSlot(selectedOption)
      setFormData(values => ({ ...values, isParking: selectedOption.value }))
      setErrors({ ...errors, isParking: "" });
    } else {
      setParkingSlot()
      setFormData((values) => ({ ...values, isParking: "" }));
    }
  }

  const handleChangeVehicle = (selectedOption) => {
    if (selectedOption !== null) {
      setVehicleDetails(selectedOption)
      setFormData(values => ({ ...values, vehicleDetail: selectedOption.value }))
      setErrors({ ...errors, vehicleDetail: "" });
    } else {
      setVehicleDetails()
      setFormData((values) => ({ ...values, vehicleDetail: "" }));
    }
  }

  useEffect(() => {
    const data = ApartmentIdDetail && ApartmentIdDetail.data && ApartmentIdDetail.data.blockDetails;
    const blockInfo = getDefaultOptions(data);
    setBlockOption(blockInfo);
  }, [ApartmentIdDetail]);

  const getDefaultOptions = (blockDetail) => {
    const defaultOptions = [];
    for (const item in blockDetail) {
      defaultOptions.push({
        label: blockDetail[item].blockName,
        value: blockDetail[item].blockName,
        floor: blockDetail[item].noOfFloors,
      });
    }
    return defaultOptions;
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    if (FlatIdDetail && FlatIdDetail.status === "ok") {
      const data = setFlatEditData(FlatIdDetail.data);
      setFormData(data);
      const imageData =
        FlatIdDetail &&
        FlatIdDetail.data &&
        FlatIdDetail.data.flatImages;
      setDefaultImages(imageData);
      setImageClickChange(!_.isEmpty(imageData) ? `${PROFILE_URL}${imageData[0].filePath}` : '')
      setPreviewImageBorder(!_.isEmpty(imageData) ? imageData[0].id : '')
      const flatDetils = FlatIdDetail && FlatIdDetail.data;
      const blockDetail = flatDetils.block
      if (blockDetail) {
        const datas = getDefaultOptions(ApartmentIdDetail && ApartmentIdDetail.data && ApartmentIdDetail.data.blockDetails)
        const selOption = datas.find((x) => x.value === blockDetail)
        if (selOption) {
          setSelectedBlockOption([selOption])
          setFormData((values) => ({ ...values, block: blockDetail }))
          const floorOption = parseInt(selOption && selOption.floor)
          const array = new Array(floorOption).fill().map((_, index) => new Object ({label: (index + 1).toString(), value: (index + 1).toString()}));
          setFloorOption(array);
        }
      }
      const floorNo = flatDetils.floor
      const floorValue = new Object ({label: floorNo, value: floorNo});
      setSelectedFloorOption(floorValue);
      const furnished = flatDetils.isFurnished
      if (furnished) {
        const selOption = FurnishedStatus.find((x) => x.value === furnished)
        if (selOption) {
          setFurnished([selOption])
          setFormData((values) => ({ ...values, isFurnished: furnished }))
        }
      }
      const orientation = flatDetils.orientation
      if (orientation) {
        const selOption = OrientationOptions.find((x) => x.value === orientation)
        if (selOption) {
          setOrientation([selOption])
          setFormData((values) => ({ ...values, orientation: orientation }))
        }
      }
      const parking = flatDetils.isParking
      if (parking) {
        const selOption = ParkingAvailability.find((x) => x.value === parking)
        if (selOption) {
          setParkingSlot([selOption])
          setFormData((values) => ({ ...values, isParking: parking }))
        }
      }
      const vehicle = flatDetils.vehicleDetail
      if (vehicle) {
        const selOption = VehicleDetails.find((x) => x.value === vehicle)
        if (selOption) {
          setVehicleDetails([selOption])
          setFormData((values) => ({ ...values, vehicleDetail: vehicle }))
        }
      }
    }
  }, [FlatIdDetail, editMode, ApartmentIdDetail]);

  const handelUpload = (e) => {
    document.getElementById('upload').click(e)
  }

  const fileUpload = (e) => {
    const files = e.target.files;
    const uploadArray = []
    for (var i = 0; i < files.length; i++) {
      uploadArray.push(files[i]);
    }
    const data = new FormData();
    const length = uploadArray.length
    for (let i = 0; i < length; i++) {
      data.append('file', uploadArray[i]);
    }
    PropertyImageAddDispatch(data, 'PropertyImage');
  }

  const handleImageDelete = (id) => {
    const updatedImages = defaultImages.filter((img) => img.id !== id);
    setDefaultImages(updatedImages);
    setFormData({ ...formdata, flatImages: updatedImages })
    PropertyDeleteImage(id)
  }

  const imagePreview = (image) => {
    const imageValue = document.getElementById(image.id).src
    setImageClickChange(imageValue)
    setPreviewImageBorder(image.id)
  }

  return (
    <>
      <div className="form-group row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Block
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='block'
                    id='block'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeBlock}
                    options={blockOption}
                    value={SelectedBlockOption}
                  />
                  {errors && errors.block && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.block}
                    </div>
                  )}
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
                    onChange={(e) => handleChange(e)}
                    value={formdata.flatNo || ''}
                    type="text"
                    name="flatNo"
                    id="flatNo"
                    maxLength={3}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.flatNo && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.flatNo}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Bathrooms
                </label>
                <div className="w-100">
                  <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.bathRoom || ''}
                    type="text"
                    name="bathRoom"
                    id="bathRoom"
                    maxLength={1}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.bathRoom && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.bathRoom}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Kitchen
                </label>
                <div className="w-100">
                <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.kitchen || ''}
                    type="text"
                    name="kitchen"
                    id="kitchen"
                    maxLength={1}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.kitchen && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.kitchen}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Furnished Status
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='isFurnished'
                    id='isFurnished'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeFurnished}
                    options={FurnishedStatus}
                    value={furnished}
                  />
                  {errors && errors.isFurnished && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.isFurnished}
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Parking Slot Availability
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='isParking'
                    id='isParking'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeParking}
                    options={ParkingAvailability}
                    value={parkingSlot}
                  />
                  {errors && errors.isParking && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.isParking}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Floor
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='floor'
                    id='floor'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeFloor}
                    options={floorOption}
                    value={SelectedFloorOption}
                    isDisabled={!SelectedBlockOption}
                  />
                  {errors && errors.floor && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.floor}
                    </div>
                  )}
                </div>
              </div>
              <div className=" mb-4 pr-10">
                <label className="required font-size-xs font-weight-bold mb-3 form-label">
                  Property Size or Square Footage
                </label>
                <div className="w-100">
                  <div className="position-relative">
                    <input
                      placeholder="Type here"
                      className="form-control form-control-lg ps-4 placeHolder"
                      onChange={(e) => handleChange(e)}
                      value={formdata.propertySize || ''}
                      type="text"
                      name="propertySize"
                      id="propertySize"
                      maxLength={6}
                      onKeyDown={letNumericOnly}
                    />
                    <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                      data-kt-password-meter-control="visibility">
                      Sq.ft
                    </span>
                  </div>
                  {errors.propertySize && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.propertySize}</span>
                    </div>
                  )}
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
                    onChange={(e) => handleChange(e)}
                    value={formdata.bedRoom || ''}
                    type="text"
                    name="bedRoom"
                    id="bedRoom"
                    maxLength={1}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.bedRoom && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.bedRoom}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Balcony
                </label>
                <div className="w-100">
                <input
                    placeholder="Type here"
                    className="form-control form-control-lg ps-4 placeHolder"
                    onChange={(e) => handleChange(e)}
                    value={formdata.balcony || ''}
                    type="text"
                    name="balcony"
                    id="balcony"
                    maxLength={1}
                    onKeyDown={letNumericOnly}
                  />
                  {errors.balcony && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.balcony}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Orientation
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='orientation'
                    id='orientation'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeOrientation}
                    options={OrientationOptions}
                    value={orientation}
                  />
                  {errors && errors.orientation && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.orientation}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label required">
                  Vehicle Details
                </label>
                <div className="w-100">
                  <ReactSelect
                    placeholder="Select here"
                    isMulti={false}
                    name='vehicleDetail'
                    id='vehicleDetail'
                    className='select2'
                    classNamePrefix='select'
                    handleChangeReactSelect={handleChangeVehicle}
                    options={VehicleDetails}
                    value={vehicleDetails}
                  />
                  {errors && errors.vehicleDetail && (
                    <div className="rr mt-1">
                      <style>{".rr{color:red}"}</style>
                      {errors.vehicleDetail}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-4 pr-10">
                <label className="font-size-xs font-weight-bold mb-3 form-label">
                  Notes
                </label>
                <div className="w-100">
                  <textarea
                    placeholder="Type here"
                    className="form-control form-control-lg"
                    onChange={(e) => handleChange(e)}
                    value={formdata.notes || ''}
                    type="text"
                    name="notes"
                    id="notes"
                    autoComplete="off"
                    rows={2}
                    onKeyPress={(e) => {
                      if (formdata.notes && formdata.notes.length >= 150) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.notes && (
                    <div className='fv-plugins-message-container text-danger'>
                      <span role='alert text-danger'>{errors.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mt-8 apartment-img-background">
          {_.isEmpty(imageClickChange) && !loading ? (
              <div className="text-center">
                <img src={toAbsoluteUrl("/media/avatars/apartment/maplegrove.svg")} alt="previewImage" className="apartment-img" />
              </div>
            ) : loading ? (
              <div className='text-center'>
                <div className='spinner-border text-primary m-5' />
              </div>
            ): !_.isEmpty(imageClickChange) ? (
              <div className="text-center">
                <img src={imageClickChange} alt="previewImage" className="apartment-img" />
              </div>
            ): null}
            <div className="d-flex justify-content-evenly align-items-center mt-4">
              {defaultImages && defaultImages.length > 0 && defaultImages.map((image) => (
                <div key={image.id} className="apartment-img-preview-card card">
                <div className="card-body position-relative" onClick={() => imagePreview(image)}>
                  <img
                    src={`${PROFILE_URL}${image.filePath}`}
                    alt="Profile picture"
                    width="100%"
                    height="75px"
                    id={image.id}
                    className={previewImageBorder === image.id ? "image-border" : "image-border-none"}
                  />
                  <button type="button" className="icon-btn position-absolute top-0 end-0 p-0 d-flex justify-content-center align-items-center" onClick={() => handleImageDelete(image.id)}>
                    <i className="bi bi-x-circle btn-danger text-white"></i>
                  </button>
                </div>
              </div>
              ))}
              {defaultImages && defaultImages.length < 4 && (
              <div className="apartment-img-preview-card card">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <button type="button" className="icon-add p-0" onClick={handelUpload}>
                    <i className="bi bi-plus-circle text-primary">
                      <input
                        className='form-control form-control-lg d-none'
                        onChange={(e) => {
                          fileUpload(e);
                          e.target.value = null;
                        }}
                        type='file'
                        id='upload'
                        multiple
                      />
                    </i>
                  </button>
                </div>
              </div>)}
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
              onClick={(e) => handleSubmit()}
            >
              {editMode ? "Update" : "Save"}
            </button>
            <button
              type="submit"
              className="btn btn-blue py-2 m-2"
              onClick={(e) => handleSubmit(e, "continue")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    FlatAddStore,
    editFlatStore,
    updateFlatStore,
    getApartmentDetialsStore,
    MultifileAddStore,
    ImageDeleteStore,
  } = state;
  return {
    FlatAdd:
      FlatAddStore && FlatAddStore.addFlat
        ? FlatAddStore.addFlat
        : "",
    FlatIdDetail:
      editFlatStore && editFlatStore.FlatIdDetail
        ? editFlatStore.FlatIdDetail
        : "",
    saveupdateFlatResponse:
      updateFlatStore && updateFlatStore.updateFlatResponce
        ? updateFlatStore.updateFlatResponce
        : "",
    ApartmentIdDetail: getApartmentDetialsStore && getApartmentDetialsStore.getApartmentDetail 
        ? getApartmentDetialsStore.getApartmentDetail 
        : '',
    PropertFileUpload:
      MultifileAddStore && MultifileAddStore.PropertyAdd
        ? MultifileAddStore.PropertyAdd
        : [],
    loading:
        MultifileAddStore && MultifileAddStore.loading
          ? MultifileAddStore.loading
          : false,
    ImageIdDetail:
      ImageDeleteStore && ImageDeleteStore.Imagedelete
        ? ImageDeleteStore.Imagedelete
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  apartmentIdDetailsDispatch: (id) =>
    dispatch(getApartmentDetialsActions.getDetails(id)),
  clearApartmentDetails: () =>
    dispatch(getApartmentDetialsActions.clear()),
  flatAddDispatch: (data) => 
    dispatch(FlatAddAction.flatAdd(data)),
  clearFlatAddDispatch: () =>
    dispatch(FlatAddAction.clearFlatAdd()),
  flatEditDispatch: (id) =>
    dispatch(FlatGetIdActions.getFlatIdDetails(id)),
  clearFlatIdDetails: () =>
    dispatch(FlatGetIdActions.clearFlatIdDetails()),
  updateFlatDispatch: (id, params) =>
    dispatch(updateFlatActions.updateFlat(id, params)),
  clearFlatUpdateDispatch: () =>
    dispatch(updateFlatActions.clearupdateFlat()),
  PropertyImageAddDispatch: (data, name) =>
    dispatch(MultifileAddActions.getMultifileProfileDetails(data, name)),
  PropertyImageAddClear: () =>
    dispatch(MultifileAddActions.clearMultifileProfileDetails()),
  PropertyDeleteImage: (id) =>
    dispatch(ImageDeleteActions.delete(id)),
  PropertyDeleteImageClear: () =>
    dispatch(ImageDeleteActions.clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlatAdd);
