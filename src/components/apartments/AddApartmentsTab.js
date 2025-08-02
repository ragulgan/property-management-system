import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";
import _ from "lodash";
import { LeasesListGetIdActions } from "../../store/actions";
import { useLocation } from "react-router-dom";
// import { setUserEditData } from './EditFormdata'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BlockandFloor from "./BlockandFloor";
import AddApartment from "./AddApartment";

function AddLeasesTab(props) {
  const { clearLeaseIdDetails } = props;
  const pathName = useLocation().pathname;
  const url = pathName && pathName.split("/");
  const currentId = url && url[2];
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Apartment info");
  const [propertyId, setPropertyId] = useState("");
  const [propDoclist, setPropDoclist] = useState(false);
  const [leaseId, setLeaseId] = useState("");

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };
  useEffect(() => {
    if (currentId) {
      setEditMode(true);
      setLeaseId(currentId);
    } else {
      setEditMode(false);
    }
  }, [currentId]);

  useEffect(() => {
    return () => {
      clearLeaseIdDetails();
    };
  }, []);

  return (
    <>
      {/* <div className="mb-5">
        <h4 className="fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200">
          {editMode ? "Edit Apartments" : "Add Apartments"}
        </h4>
      </div> */}
      <div className="container-fixed">
        <div className="card px-10 py-5">
          <div className="card-body">
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabChange}
              transition={false}
              id="noanim-tab-example"
              className="mb-3 property-tabs"
            >
              <Tab eventKey="Apartment info" title="Apartment  info">
                <AddApartment
                  setActiveTab={setActiveTab}
                  setPropDoclist={setPropDoclist}
                  leaseId={leaseId}
                  setPropertyId={setPropertyId}
                  propertyId={propertyId}
                  setLeaseId={setLeaseId}
                />
              </Tab>
              <Tab
                eventKey="Block and Amenities"
                title="Block and Amenities"
                // disabled={editMode ? false : true}
              >
                <BlockandFloor
                  setActiveTab={setActiveTab}
                  propertyId={propertyId}
                  propDoclist={propDoclist}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { editLeasesListStore } = state;
  return {
    LeasesListIdDetail:
      editLeasesListStore && editLeasesListStore.LeasesListIdDetail
        ? editLeasesListStore.LeasesListIdDetail
        : "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearLeaseIdDetails: () =>
    dispatch(LeasesListGetIdActions.clearLeasesListIdDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLeasesTab);