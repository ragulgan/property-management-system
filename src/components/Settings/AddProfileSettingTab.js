import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddMyProfile from './MyProfile/AddMyProfile'
import SettingsRole from './Role/Rolelist'
import PropertyType from './PropertyType/PropertiesType'
import LeaseType from './leaseType/LeaseType'
import CountryList from './country/CountryList'
import StateList from './state/StateList'
import DocumentList from './PropertyDocumentType/DocumentList'
import Leaselist from './LeaseDocumentType/Leaselist'
import CityList from './city/CityList'
import ApartmentType from './apartmentType/ApartmentTypeList'
import FlatDocType from './flatDocumentType/flatDocumentTypeList'

function AddProfileSettingTab(props) {
  const [settingTab, setSettingTab] = useState("My Profile")
  const handleSettingTabChange = (newTab) => {
    setSettingTab(newTab);
  };

  return (
    <>
      <div className='mb-5'>
        <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Settings</h4>
      </div>
      <div className='container-fixed'>
        <div className='card px-10 py-5'>
          <div className='card-body'>
            <Tabs
              activeKey={settingTab}
              onSelect={handleSettingTabChange}
              transition={false}
              id="setting-tab-example"
              className="mb-3 my-profile"
              fill
            >
              <Tab eventKey="My Profile" title="My Profile">
                <AddMyProfile />
              </Tab>
              <Tab eventKey="Role" title="Role">
                <SettingsRole settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Property Type" title="Property Type">
                <PropertyType settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Lease Type" title="Lease Type">
                <LeaseType settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Property Document Type" title="Property Document Type">
                <DocumentList settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Lease Document Type" title="Lease Document Type">
                <Leaselist settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Apartment Type" title="Apartment Type">
                <ApartmentType settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Flat Document Type" title="Flat Document Type">
                <FlatDocType settingTab={settingTab} />
              </Tab>
              <Tab eventKey="Country" title="Country">
                <CountryList settingTab={settingTab} />
              </Tab>
              <Tab eventKey="State" title="State">
                <StateList settingTab={settingTab} />
              </Tab>
              <Tab eventKey="City" title="City">
                <CityList settingTab={settingTab} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div >
    </>
  )
}

export default AddProfileSettingTab