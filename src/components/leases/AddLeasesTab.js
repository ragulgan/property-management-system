import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { LeasesListGetIdActions } from '../../store/actions'
import { useLocation } from 'react-router-dom'
// import { setUserEditData } from './EditFormdata'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DocumentList from './DocumentList'
import AddProperty from './AddProperty'
import AddLeases from './AddLeases'
import AddLesseeDetail from './AddLesseeDetail'
import LeaseDocumentList from './LeaseDocumentList'


function AddLeasesTab(props) {
    const {
        clearLeaseIdDetails,
    } = props
    const pathName = useLocation().pathname
    const url = pathName && pathName.split('/')
    const currentId = url && url[2]
    const [editMode, setEditMode] = useState(false)
    const [activeTab, setActiveTab] = useState('Property info');
    const [propertyId, setPropertyId] = useState('')
    const [propDoclist, setPropDoclist] = useState(false)
    const [leaseId, setLeaseId] = useState('')

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
      };
    useEffect(() => {
        if (currentId) {
            setEditMode(true)
            setLeaseId(currentId)
        }
        else {
            setEditMode(false)
        }
    }, [currentId])

    useEffect(() => {
        return () => {
          clearLeaseIdDetails()
        }
    }, [])

    return (
        <>
            <div className='mb-5'>
                <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>{editMode ? 'Edit Leases' : 'Add Leases'}</h4>
            </div>
            <div className='container-fixed'>
                <div className='card px-10 py-5'>
                    <div className='card-body'>
                        <Tabs
                            activeKey={activeTab} onSelect={handleTabChange}
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3 property-tabs"
                        >
                            <Tab eventKey="Property info" title="Property Info">
                                <AddProperty setActiveTab={setActiveTab} setPropDoclist={setPropDoclist} leaseId={leaseId} setPropertyId={setPropertyId} propertyId={propertyId} setLeaseId={setLeaseId}/>
                            </Tab>
                            <Tab eventKey="Property Documents" title="Property Documents" disabled={editMode ? false : true}>
                                <DocumentList setActiveTab={setActiveTab} propertyId={propertyId} propDoclist={propDoclist} />
                            </Tab>
                            <Tab eventKey="Lease info" title="Lease Info" disabled={editMode ? false : true}>
                                <AddLeases propertyId={propertyId} setActiveTab={setActiveTab} setPropDoclist={setPropDoclist} setLeaseId={setLeaseId} leaseId={leaseId} />
                            </Tab>
                            <Tab eventKey="Tenant details" title="Tenant Details" disabled={editMode ? false : true}>
                                <AddLesseeDetail propertyId={propertyId} setActiveTab={setActiveTab} setPropDoclist={setPropDoclist} leaseId={leaseId} setLeaseId={setLeaseId} />
                            </Tab>
                            <Tab eventKey="Lease Documents" title="Lease Documents" disabled={editMode ? false : true}>
                                <LeaseDocumentList leaseId={leaseId} setActiveTab={setActiveTab} propDoclist={propDoclist} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div >
        </>
    )
}
const mapStateToProps = (state) => {
    const { editLeasesListStore } = state
    return {
        LeasesListIdDetail: editLeasesListStore && editLeasesListStore.LeasesListIdDetail ? editLeasesListStore.LeasesListIdDetail : '',
    }
}

const mapDispatchToProps = dispatch => ({
    clearLeaseIdDetails: () =>
    dispatch(LeasesListGetIdActions.clearLeasesListIdDetails()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLeasesTab)