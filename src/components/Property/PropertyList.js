import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import { KTSVG, toAbsoluteUrl } from "../../theme/helpers";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { unsetLocalStorage } from "../../utils/helper";
import {
  STATUS_BADGE,
  REVIEWTYPE,
  SWEET_ALERT_MSG,
  STATUS_RESPONSE,
  PROPERTY_STATUS_BADGE,
  REGEX,
} from "../../utils/constants";
import {
  successAlert,
  warningAlert,
  confirmationAlert,
} from "../../utils/alerts";
import {
  PropertyActions,
  PropertydeleteActions,
  LandlordsActions,
  PropertiesActions,
} from "../../store/actions";
// import SearchLists from './search'
// import AddProperty from './AddProperty'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReactSelect from "../../theme/layout/components/ReactSelect";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SurveyNumber from "./surveyNumber";

function Property(props) {
  const Roles = JSON.parse(localStorage.getItem("roles"));
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
  } = props;

  const PropertyStatus = [
    {
      value: "",
      label: "All",
    },
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
  const [status, setStatus] = useState("");
  const [landlordOption, setLandlordOption] = useState();
  const [SelectedLandlordOption, setSelectedLandlordOption] = useState("");
  const [PropertyOption, setPropertyOption] = useState();
  const [SelectedPropertyOption, setSelectedPropertyOption] = useState("");
  const [surveyNo, setSurveyNo] = useState("");
  const [sortBy, setSortBy] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [proId, setProId] = useState("");

  const [key, setKey] = useState("APARTMENTS");

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  });

  useEffect(() => {
    const params = {
      status: "ACTIVE",
    };
    getLandlordlistDispatch(params);
    getPropertieslistDispatch(params);
  }, []);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    const pageNumber = event.selected + 1;
    const params = {
      limit: limit,
      pageNo: pageNumber,
      surveyNo: surveyNo,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      propertyStatus: typeof status === "object" ? status.value : "",
      landLord:
        typeof SelectedLandlordOption === "object"
          ? SelectedLandlordOption.value
          : "",
      propertyType:
        typeof SelectedPropertyOption === "object"
          ? SelectedPropertyOption.value
          : "",
      sort: sortValue ? sortValue : "",
    };
    setActivePageNumber(pageNumber);
    getpropertylistDispatch(params);
  };

  const totalPages =
    Propertylists && Propertylists.count
      ? Math.ceil(parseInt(Propertylists && Propertylists.count) / limit)
      : 1;

  const logout = () => {
    unsetLocalStorage();
    window.location.href = "/merchant-login";
  };

  const onConfirmDelete = (id) => {
    deleteDispatch(id);
  };
  const onConfirmRedirect = () => {
    clearPropertyDelete();
    history.push("/properties");
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
    if (
      Propertydelete &&
      Propertydelete.status === STATUS_RESPONSE.SUCCESS_MSG
    ) {
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
      onConfirmRedirect();
    } else if (
      Propertydelete &&
      Propertydelete.status === STATUS_RESPONSE.ERROR_MSG
    ) {
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
      onConfirmRedirect();
    }
  }, [Propertydelete]);

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
      surveyNo: surveyNo,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      propertyStatus: typeof status === "object" ? status.value : "",
      landLord:
        typeof SelectedLandlordOption === "object"
          ? SelectedLandlordOption.value
          : "",
      propertyType:
        typeof SelectedPropertyOption === "object"
          ? SelectedPropertyOption.value
          : "",
      sort: sortValue ? sortValue : "",
    };
    getpropertylistDispatch(params);
  };

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      propertyStatus: typeof status === "object" ? status.value : "",
      landLord:
        typeof SelectedLandlordOption === "object"
          ? SelectedLandlordOption.value
          : "",
      propertyType:
        typeof SelectedPropertyOption === "object"
          ? SelectedPropertyOption.value
          : "",
      sort: sortValue ? sortValue : "",
    };
    getpropertylistDispatch(params);
  }, [
    propertyId,
    propertyName,
    status,
    SelectedLandlordOption,
    SelectedPropertyOption,
    sortValue,
  ]);

  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value);
  };

  const handleChangePropertyName = (e) => {
    setPropertyName(e.target.value);
  };

  const handleChangeSelectStatus = (selectedOption) => {
    if (selectedOption !== null) {
      setStatus(selectedOption);
    }
  };
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
    const data = getAllLandlords && getAllLandlords.data;
    const landLord = getDefaultOptions(data);
    setLandlordOption(landLord);
  }, [getAllLandlords]);

  useEffect(() => {
    const data = Propertieslists && Propertieslists.data;
    const propertyList = getDefaultOptionsProperty(data);
    setPropertyOption(propertyList);
  }, [Propertieslists]);

  const handleChangeSelectLandLord = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedLandlordOption(selectedOption);
    }
  };

  const handleChangePropertyType = (selectedOption) => {
    if (selectedOption !== null) {
      setSelectedPropertyOption(selectedOption);
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
    setSelectedLandlordOption("");
    setSelectedPropertyOption("");
    setSurveyNo("");
    setSortValue("");
    setProId(false);
    getpropertylistDispatch(params);
  };

  const surveyList = () => {
    setOpen(false);
    const params = {
      surveyNo: surveyNo,
      limit: limit,
      pageNo: page,
      propertyId:
        proId && propertyId && propertyId.length > 0 ? "PRT-" + propertyId : "",
      propertyName: propertyName,
      propertyStatus: typeof status === "object" ? status.value : "",
      landLord:
        typeof SelectedLandlordOption === "object"
          ? SelectedLandlordOption.value
          : "",
      propertyType:
        typeof SelectedPropertyOption === "object"
          ? SelectedPropertyOption.value
          : "",
      sort: sortValue ? sortValue : "",
    };
    getpropertylistDispatch(params);
  };

  const handleResetModal = () => {
    setSurveyNo("");
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

  const handleOpen = (id) => {
    history.push(`/properties/details/${id}`);
  }

  const handleSortClick = (name) => {
    if (name === "asc") {
      setSortValue("asc");
      setSortBy(false);
    } else if (name === "desc") {
      setSortValue("desc");
      setSortBy(false);
    }
  };

  const propertyData = [
    {
      residenceName: "Maple Grove Residences",
      address: "3/16,appu 2nd St, Mylapore Chennai, Tamil Nadu, 600004",
      members: [
        {
          name: 'Jack',
          avatar: 'https://s3-alpha-sig.figma.com/img/9011/153f/6a051692ca5fc3f1d6e19b63464bc2c9?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qwaI9Sr9D88PcsHqlswXc-r~Vu1Hdr8fhPn30mR8LM-UwzDOOqAR8Y7DNrHzFIg2D8Ku40QMY7hPe1yvNS5TDI1013TDn-W2xApyRCyyAx3BDPTvlI06iMEqwFVtpmt~DA-Mk4DZsS8xlHP0tNlzdYTwlhw~cRqfI4zcuCpqMo-WG~5guvvB2p--HcX-MdKmt~EENuN9kx06rLPuCwZ7z9nXgru-U~06AmtuCPUjwDEdHXRvdgKChnME3CNjhOLyGAZALIt4cKKsSdzunLxUxHAaUHKKco8Iw-uPQrAMQokz~Kh65XEwjw2QlnGVwtflkgFPBSQ~CIO6XO7c2ijSWw__'
        },
        {
          name: 'Jone',
          avatar: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PsY194tO4ulu4oP9WK15tE9XrL0EPwOqmoyXBmL9HLw34Gv-loIsQsSg63IzYTUdVjrFnA4-hcmwwbm8u0KL2mA4bzF4~xjIRlPtF10MXW73inx7KS1ICiK1dOYQc4XgF~2AUfK721RDdFHerTTmRzoGta~Me-4NJLa7rl8wqJorL1AwrBORIEyQrE4aF9X0rdqTQFM-AY40CpxcK09emIW1yvlLAsebSeyVNSb-epqEw1r8DJiS2sB8jPwrUI5VxLMc6EMVfsOAxTzToI-sFFYM0lXvp2~XIs3spPnMoMP~Y-6CO~3rFbE1hDfTu1wa3PmkHO14fhJ4HJ2dcEKBHA__'
        },
        {
          name: 'Jane',
          avatar: 'https://s3-alpha-sig.figma.com/img/f0d0/2ad2/f4d075c1fa8155478e5bb26aaae69fc1?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EMEjWsIC~v63KHE7DDCnac4-e4qKCI9V411BPTGJA34beyZdoMb4shfeM4HD~bHOBJkdnyh1awJDiIeFpJV1ChRW1kh-10ZqQ9OhR8Ipc6sWCyoFblP4LKCbUN-J-K-xRnql09Jk8LqNnGQ9POwE~XiaoXexWGVmaMAYapFQfRozUhmzv5GJllV2tEc8r3zMg0FOI~7nQRVQVz7Bc0PICUiRCHtVcGb0oeJikWDHONs2~QByh1ycsehrKNeU02yOj6MkPGAnld0bZIdqDXKoWeCvP4VortnLGRnS-qIEGcEFbuLwjPNhnEDLecQoB-r0oZy2Gt27yStPAw5qclW6ZA__'
        },
        {
          name: 'Doe',
          avatar: 'https://s3-alpha-sig.figma.com/img/30d0/4ffd/801a4e66ac2af52dff9798293d9b612c?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bahXEU089QMJtLVlPY2B4mSwMWozDeivzHI4-E0pfCX5d68OnVBbU5uxURHFLEfsPFn7kSMBSgEZV75aCOh9j9LJhCzZix61Wlhc6KymrDjqorC2t~g46z~gpUC3vhEU244gti2uDzAoEfNYpDMKfC2FRfCpWwKgufm67IRUqwo~pfhG~9d4Q4XZ~KSr-W3txP2LDp7IIHBTGEIw6ctCI-CdxxF-xgtYGNkzlOKLOl-BAM0nrTfKku6fbcrBLDNuDBbxebt2qHRTAQQtaZrLEjihfIVhYmTWO93a0Ozd6nDYCce20q24PjWslyodLy13nGS7-1Fq~H3nxfMJkDlgIQ__'
        },
      ],
      image:
        "https://s3-alpha-sig.figma.com/img/f34a/ad82/817cdf37cef4b2a26fc577430b0f170a?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fRhsceRJp6rdLKjd9sQ~I4zT~1VIhZ8A0lQRriufoDplmtHvCDZky8ZytmJdCB~2Ds~E2WeAvXQCtG8dhY5TU3kwNTEZ1L3nkcsvwSIySrMeY0rTSkogrigzTxVUMFeVqzgWe8DpSwCBxRhTBn1NFshmN-d6ZdbRbQxoL3yOgfskBy7hzgKfldFLIIb~b8kf93og21MgZU0CO30JrV4xbWHmjwhM7bOSJAaV5y2kuRByYcXNHkLivepn7P9yOHS8jnZ9tzJDGNHncgZH8genEw6pB0m0mylLwEj7K63n8RvHXU9JJ3LaCTUXmD-MUTwBMYe0XraV0dz5~7pK67uaBQ__",
    },
    {
      residenceName: "Harborview Heights Apartments",
      address: "27, Sydoji Street Triplicane Chennai, Tamil Nadu, 600005",
      members: [
        {
          name: 'Jack',
          avatar: 'https://s3-alpha-sig.figma.com/img/9011/153f/6a051692ca5fc3f1d6e19b63464bc2c9?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qwaI9Sr9D88PcsHqlswXc-r~Vu1Hdr8fhPn30mR8LM-UwzDOOqAR8Y7DNrHzFIg2D8Ku40QMY7hPe1yvNS5TDI1013TDn-W2xApyRCyyAx3BDPTvlI06iMEqwFVtpmt~DA-Mk4DZsS8xlHP0tNlzdYTwlhw~cRqfI4zcuCpqMo-WG~5guvvB2p--HcX-MdKmt~EENuN9kx06rLPuCwZ7z9nXgru-U~06AmtuCPUjwDEdHXRvdgKChnME3CNjhOLyGAZALIt4cKKsSdzunLxUxHAaUHKKco8Iw-uPQrAMQokz~Kh65XEwjw2QlnGVwtflkgFPBSQ~CIO6XO7c2ijSWw__'
        },
        {
          name: 'Jone',
          avatar: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PsY194tO4ulu4oP9WK15tE9XrL0EPwOqmoyXBmL9HLw34Gv-loIsQsSg63IzYTUdVjrFnA4-hcmwwbm8u0KL2mA4bzF4~xjIRlPtF10MXW73inx7KS1ICiK1dOYQc4XgF~2AUfK721RDdFHerTTmRzoGta~Me-4NJLa7rl8wqJorL1AwrBORIEyQrE4aF9X0rdqTQFM-AY40CpxcK09emIW1yvlLAsebSeyVNSb-epqEw1r8DJiS2sB8jPwrUI5VxLMc6EMVfsOAxTzToI-sFFYM0lXvp2~XIs3spPnMoMP~Y-6CO~3rFbE1hDfTu1wa3PmkHO14fhJ4HJ2dcEKBHA__'
        },
        {
          name: 'Jane',
          avatar: 'https://s3-alpha-sig.figma.com/img/f0d0/2ad2/f4d075c1fa8155478e5bb26aaae69fc1?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EMEjWsIC~v63KHE7DDCnac4-e4qKCI9V411BPTGJA34beyZdoMb4shfeM4HD~bHOBJkdnyh1awJDiIeFpJV1ChRW1kh-10ZqQ9OhR8Ipc6sWCyoFblP4LKCbUN-J-K-xRnql09Jk8LqNnGQ9POwE~XiaoXexWGVmaMAYapFQfRozUhmzv5GJllV2tEc8r3zMg0FOI~7nQRVQVz7Bc0PICUiRCHtVcGb0oeJikWDHONs2~QByh1ycsehrKNeU02yOj6MkPGAnld0bZIdqDXKoWeCvP4VortnLGRnS-qIEGcEFbuLwjPNhnEDLecQoB-r0oZy2Gt27yStPAw5qclW6ZA__'
        },
        {
          name: 'Doe',
          avatar: 'https://s3-alpha-sig.figma.com/img/30d0/4ffd/801a4e66ac2af52dff9798293d9b612c?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bahXEU089QMJtLVlPY2B4mSwMWozDeivzHI4-E0pfCX5d68OnVBbU5uxURHFLEfsPFn7kSMBSgEZV75aCOh9j9LJhCzZix61Wlhc6KymrDjqorC2t~g46z~gpUC3vhEU244gti2uDzAoEfNYpDMKfC2FRfCpWwKgufm67IRUqwo~pfhG~9d4Q4XZ~KSr-W3txP2LDp7IIHBTGEIw6ctCI-CdxxF-xgtYGNkzlOKLOl-BAM0nrTfKku6fbcrBLDNuDBbxebt2qHRTAQQtaZrLEjihfIVhYmTWO93a0Ozd6nDYCce20q24PjWslyodLy13nGS7-1Fq~H3nxfMJkDlgIQ__'
        },
      ],
      image:
        "https://s3-alpha-sig.figma.com/img/63df/1e24/11922da32d5c29e7989668abc6eef03f?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpWCfuobx3kDUuwxjlTkh27EdtD510uc0kCr9R-39TAY0PChtctO0L2j1U2o49X8dbVa-A~gCwQTicusoD7KIjNTzC2jY~0Ey2ebkA2r9fhm3Amv3po-yMmhQPe~xZd~gyXRNg0WuyQIU2yUYzpW357c0iqnruzmH0LAZgW1ZpbGb~n-VhatW2uSbobdI7wuxaaL7BGyq8cpNWPqtNCvaR~TVc-6IHc-WUSCmfd4WJF5sE9iVeKR1La5O4dfoC1g3eO2gOzk7n5uitRPNpJBcTxgkxZHR7t2U32T6Sj-hUHnjgzfn8osIs~S5WTeR~vlP26-Lm9L7Yui5WXTr1RLmw__",
    },
    {
      residenceName: "Pinecrest Plaza Apartments",
      address: "27, Sydoji Street Triplicane Chennai, Tamil Nadu, 600005",
      members: [
        {
          name: 'Jack',
          avatar: 'https://s3-alpha-sig.figma.com/img/9011/153f/6a051692ca5fc3f1d6e19b63464bc2c9?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qwaI9Sr9D88PcsHqlswXc-r~Vu1Hdr8fhPn30mR8LM-UwzDOOqAR8Y7DNrHzFIg2D8Ku40QMY7hPe1yvNS5TDI1013TDn-W2xApyRCyyAx3BDPTvlI06iMEqwFVtpmt~DA-Mk4DZsS8xlHP0tNlzdYTwlhw~cRqfI4zcuCpqMo-WG~5guvvB2p--HcX-MdKmt~EENuN9kx06rLPuCwZ7z9nXgru-U~06AmtuCPUjwDEdHXRvdgKChnME3CNjhOLyGAZALIt4cKKsSdzunLxUxHAaUHKKco8Iw-uPQrAMQokz~Kh65XEwjw2QlnGVwtflkgFPBSQ~CIO6XO7c2ijSWw__'
        },
        {
          name: 'Jone',
          avatar: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PsY194tO4ulu4oP9WK15tE9XrL0EPwOqmoyXBmL9HLw34Gv-loIsQsSg63IzYTUdVjrFnA4-hcmwwbm8u0KL2mA4bzF4~xjIRlPtF10MXW73inx7KS1ICiK1dOYQc4XgF~2AUfK721RDdFHerTTmRzoGta~Me-4NJLa7rl8wqJorL1AwrBORIEyQrE4aF9X0rdqTQFM-AY40CpxcK09emIW1yvlLAsebSeyVNSb-epqEw1r8DJiS2sB8jPwrUI5VxLMc6EMVfsOAxTzToI-sFFYM0lXvp2~XIs3spPnMoMP~Y-6CO~3rFbE1hDfTu1wa3PmkHO14fhJ4HJ2dcEKBHA__'
        },
        {
          name: 'Jane',
          avatar: 'https://s3-alpha-sig.figma.com/img/f0d0/2ad2/f4d075c1fa8155478e5bb26aaae69fc1?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EMEjWsIC~v63KHE7DDCnac4-e4qKCI9V411BPTGJA34beyZdoMb4shfeM4HD~bHOBJkdnyh1awJDiIeFpJV1ChRW1kh-10ZqQ9OhR8Ipc6sWCyoFblP4LKCbUN-J-K-xRnql09Jk8LqNnGQ9POwE~XiaoXexWGVmaMAYapFQfRozUhmzv5GJllV2tEc8r3zMg0FOI~7nQRVQVz7Bc0PICUiRCHtVcGb0oeJikWDHONs2~QByh1ycsehrKNeU02yOj6MkPGAnld0bZIdqDXKoWeCvP4VortnLGRnS-qIEGcEFbuLwjPNhnEDLecQoB-r0oZy2Gt27yStPAw5qclW6ZA__'
        },
        {
          name: 'Doe',
          avatar: 'https://s3-alpha-sig.figma.com/img/30d0/4ffd/801a4e66ac2af52dff9798293d9b612c?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bahXEU089QMJtLVlPY2B4mSwMWozDeivzHI4-E0pfCX5d68OnVBbU5uxURHFLEfsPFn7kSMBSgEZV75aCOh9j9LJhCzZix61Wlhc6KymrDjqorC2t~g46z~gpUC3vhEU244gti2uDzAoEfNYpDMKfC2FRfCpWwKgufm67IRUqwo~pfhG~9d4Q4XZ~KSr-W3txP2LDp7IIHBTGEIw6ctCI-CdxxF-xgtYGNkzlOKLOl-BAM0nrTfKku6fbcrBLDNuDBbxebt2qHRTAQQtaZrLEjihfIVhYmTWO93a0Ozd6nDYCce20q24PjWslyodLy13nGS7-1Fq~H3nxfMJkDlgIQ__'
        },
      ],
      image:
        "https://s3-alpha-sig.figma.com/img/5807/d574/24f8cf83a3a6deb898b1230c023962f1?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K~fkOqasT-llmfrq-n3Pq7awYYAlVw10hLathT289MnXlUx3roEdA5kbhwNe576atryEdkrxw0Di3U~tBhvyildJCbe9j16YCILeYGzC97nwvYv-89P7MCKbzV7LI0tSPIc0O2j2-Yc1n2TzTQ7HmH7Af7wrKXFF84te2OIOS9UxioiinBkk11AoDmDYPj2w0GKenGJPk4GEm7JS1LHG2PpyLuVEbnFpcfziDgVUnnKKJlT-YwkdGnUEebERTVdw7VQQeK4BmU5fTdTlQdVdw4cpWDJjN5TJKYiQWKI9iVLaNzEZuv~vNZdmUZ8NWP6FlT04DGo62YF0YnqSihua5w__",
    },
  ];

  return (
    <div>
      <div className="d-flex mb-2">
        <label
          className={`btn rounded-0 ${
            key === "APARTMENTS" ? "propertyTabs" : "propertyTabsInactive"
          }`}
          onClick={() => setKey("APARTMENTS")}
        >
          Apartments
        </label>
        <label
          className={`btn rounded-0 ${
            key === "LANDLORDS_PROPERTY"
              ? "propertyTabs"
              : "propertyTabsInactive"
          }`}
          onClick={() => setKey("LANDLORDS_PROPERTY")}
        >
          Landlord’s Property
        </label>
      </div>
      <div className="d-flex">
        {key === "APARTMENTS" ? (
          <>
            {propertyData.map((item, i) => (
              <Card style={{ width: "18rem" }} key={i} className="rounded m-2"
              onClick={() => { handleOpen(i+1) }}
              >
                <Card.Img variant="top" height={120} src={item.image} />
                <Card.Body className="m-3">
                  <Card.Title>{item.residenceName}</Card.Title>
                  <Card.Text>{item.address}</Card.Text>
                  <div className="symbol-group symbol-hover flex-nowrap">
                    {
                      item.members.map((user, j) => (
                        <OverlayTrigger
                        key={`${j}-${user.name}`}
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-user-name">{user.name}</Tooltip>
                        }
                      >
                        <div className="symbol symbol-35px symbol-circle">
                          {user.avatar && (
                            <img src={user.avatar} alt="Pic" />
                          )}
                        </div>
                      </OverlayTrigger>
                      ))
                    }
                  </div>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    PropertylistStore,
    PropertydeleteStore,
    LandlordslistStore,
    PropertieslistStore,
  } = state;
  return {
    Propertylists:
      PropertylistStore && PropertylistStore.Propertylists
        ? PropertylistStore.Propertylists
        : "",
    loading:
      PropertylistStore && PropertylistStore.loading
        ? PropertylistStore.loading
        : false,
    Propertydelete:
      PropertydeleteStore && PropertydeleteStore.Propertydelete
        ? PropertydeleteStore.Propertydelete
        : "",
    getAllLandlords:
      LandlordslistStore && LandlordslistStore.getAllLandlords
        ? LandlordslistStore.getAllLandlords
        : "",
    Propertieslists:
      PropertieslistStore && PropertieslistStore.Propertieslists
        ? PropertieslistStore.Propertieslists
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  getpropertylistDispatch: (params) =>
    dispatch(PropertyActions.getpropertylist(params)),
  deleteDispatch: (id) => dispatch(PropertydeleteActions.delete(id)),
  clearPropertyDelete: () => dispatch(PropertydeleteActions.clear()),
  getLandlordlistDispatch: (data) =>
    dispatch(LandlordsActions.getlandlordslist(data)),
  getPropertieslistDispatch: (data) =>
    dispatch(PropertiesActions.getpropertyTypelist(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
