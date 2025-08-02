import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG, toAbsoluteUrl } from '../../theme/helpers'
import _ from 'lodash'
import { UsersActions, UserAddAction, UserGetIdActions, updateUserActions, PropertyGetIdActions } from '../../store/actions'
import { PROFILE_URL, REGEX } from '../../utils/constants'
import { STATUS_RESPONSE, SWEET_ALERT_MSG, STATUS_BADGE, DATE } from '../../utils/constants'
import { successAlert, warningAlert, confirmationAlert } from "../../utils/alerts"
import { Link, useLocation, useHistory } from 'react-router-dom'
import Select from "react-select"
import image from '../../theme/assets/Image/property-management.png'
import { DateSelector } from '../../theme/layout/components/DateSelector'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DocumentList from './DocumentList'
import FlatAdd from './AddFlat'
// import TenantInfo from './TenantInfo'

function AddFlatOwnerTab(props) {
  const {
    clearPropertyIdDetails,
  } = props
  const pathName = useLocation().pathname
  const apartmentObj = useLocation();
  const url = pathName && pathName.split('/')
  const currentId = url && url[2]
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('Basic info');
  const [propertyId, setPropertyId] = useState('')
  const [propDoclist, setPropDoclist] = useState(false)
  const [showImage, setShowImage] = useState(false)


  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };
  useEffect(() => {
    if (currentId) {
      setEditMode(true)
      setPropertyId(currentId)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    return () => {
      clearPropertyIdDetails()
      setShowImage(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === "Flat/Unit") {
      setShowImage(true)
    }
  }, [activeTab])

  return (
    <>
      <div className='mb-5'>
        <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>{editMode ? 'Edit Flat Owner' : 'Add Flat Owner'}</h4>
      </div>
      <div className='container-fixed'>
        <div className='card px-10 py-5 flat-add-main-border-apply'>
          <div className='card-body'>
            <Tabs
              activeKey={activeTab} onSelect={handleTabChange}
              transition={false}
              id="noanim-tab-example"
              className="mb-3 property-tabs"
            >
              <Tab eventKey="Basic info" title="Basic info">
                <FlatAdd setActiveTab={setActiveTab} setPropertyId={setPropertyId} setPropDoclist={setPropDoclist} propertyId={propertyId} setShowImage={setShowImage} />
              </Tab>
              <Tab eventKey="Flat/Unit" title="Flat/Unit Info">
                <DocumentList setActiveTab={setActiveTab} propertyId={propertyId} propDoclist={propDoclist} setShowImage={setShowImage} showImage={showImage} />
              </Tab>
              <Tab eventKey="Occupancy status" title="Occupancy status">
                {/* <TenantInfo setActiveTab={setActiveTab} propertyId={propertyId} propDoclist={propDoclist} setShowImage={setShowImage} showImage={showImage} /> */}
              </Tab>
              <Tab eventKey="Financial Details" title="Financial Details">
                {/* <TenantInfo setActiveTab={setActiveTab} propertyId={propertyId} propDoclist={propDoclist} setShowImage={setShowImage} showImage={showImage} /> */}
              </Tab>
              <Tab eventKey="ID & Documentation" title="ID & Documentation">
                {/* <TenantInfo setActiveTab={setActiveTab} propertyId={propertyId} propDoclist={propDoclist} setShowImage={setShowImage} showImage={showImage} /> */}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div >
    </>
  )
}
const mapStateToProps = (state) => {
  const { editPropertyStore } = state
  return {
    PropertyIdDetail: editPropertyStore && editPropertyStore.PropertyIdDetail ? editPropertyStore.PropertyIdDetail : '',
  }
}
const mapDispatchToProps = dispatch => ({
  clearPropertyIdDetails: () =>
    dispatch(PropertyGetIdActions.clearPropertyIdDetails()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFlatOwnerTab)