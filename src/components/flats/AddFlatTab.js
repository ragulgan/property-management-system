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
import TenantInfo from './TenantInfo'

function AddPropertyTab(props) {
  const {
    clearPropertyIdDetails,
  } = props
  const pathName = useLocation().pathname
  const apartmentObj = useLocation();
  const url = pathName && pathName.split('/')
  const currentId = url && url[2]
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('Flat Info');
  const [flatId, setFlatId] = useState('')
  const [flatDoclist, setFlatDoclist] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [apartmentSelect, setApartmentSelect] = useState(apartmentObj.state && apartmentObj.state.state)


  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };
  useEffect(() => {
    if (currentId) {
      setEditMode(true)
      setFlatId(currentId)
    }
    else {
      setEditMode(false)
    }
  }, [currentId])

  useEffect(() => {
    return () => {
      clearPropertyIdDetails()
      setApartmentSelect()
      setShowImage(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === "Documents") {
      setShowImage(true)
    }
  }, [activeTab])

  return (
    <>
      <div className='mb-5'>
        <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>{editMode ? 'Edit Flat' : 'Add Flat'}</h4>
      </div>
      <div className="row flat-add-div-border m-0">
        <div className="col-sm-12 bg-white text-start">
          {!_.isEmpty(apartmentSelect) && !_.isEmpty(apartmentSelect.image) && apartmentSelect.image.length > 0 ?
            <>
              <img src={`${PROFILE_URL}${apartmentSelect.image[0].filePath}`} alt='flat' className='flat-add-apartment-image' />
            </>
            : <>
              <img src={toAbsoluteUrl('/media/avatars/apartment/flatDummy.svg')} alt='flat' className='flat-add-apartment-image' />
            </>}
          <span className='flat-add-card-name mx-4'>{!_.isEmpty(apartmentSelect) && !_.isEmpty(apartmentSelect.label) ? apartmentSelect.label : ''}</span>
        </div>
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
              <Tab eventKey="Flat Info" title="Flat Info">
                <FlatAdd setActiveTab={setActiveTab} flatId={flatId} setFlatId={setFlatId} setFlatDoclist={setFlatDoclist} setShowImage={setShowImage} apartmentSelect={apartmentSelect} />
              </Tab>
              <Tab eventKey="Documents" title="Documents">
                <DocumentList setActiveTab={setActiveTab} flatId={flatId} flatDoclist={flatDoclist} setShowImage={setShowImage} showImage={showImage} />
              </Tab>
              <Tab eventKey="Flats Owners" title="Flats Owners">
                <TenantInfo setActiveTab={setActiveTab} flatId={flatId} flatDoclist={flatDoclist} setShowImage={setShowImage} showImage={showImage} />
              </Tab>
              <Tab eventKey="Tenants/Landlords" title="Tenants/Landlords">
                <TenantInfo setActiveTab={setActiveTab} flatId={flatId} flatDoclist={flatDoclist} setShowImage={setShowImage} showImage={showImage} />
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
)(AddPropertyTab)