import React from 'react'
import { toAbsoluteUrl } from '../../theme/helpers'
import { Link } from 'react-router-dom'
import RecentActivities from './DashboardTable'
import PropertyTypeChart from './PropertyTypeChart'
import RadialBarChart from './ExpireLeaseChart'
import { DashboardActions } from '../../store/actions';
import { connect } from 'react-redux'


const Dashboard = (props) => {
    const Roles = JSON.parse(localStorage.getItem('roles'))
    const {
        Dashboardlists
    } = props
    return (
        <div className='row'>
            <div className='col-sm-9'>
                <div className='row row-cols-3'>
                    <div className='col'>
                        <div className='dashboard-card-1 p-5 d-flex justify-content-between align-items-center'>
                            <div>
                                <div className='card-head'>Properties</div>
                                <div className='card-total mt-2'>{Dashboardlists && Dashboardlists.data && Dashboardlists.data.CountProperty ? Dashboardlists.data.CountProperty : 0}</div>
                            </div>
                            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/property.svg')} className='img-fluid' />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='dashboard-card-2 p-5 d-flex justify-content-between align-items-center'>
                            <div>
                                <div className='card-head'>Leases</div>
                                <div className='card-total mt-2'>{Dashboardlists && Dashboardlists.data && Dashboardlists.data.CountLease ? Dashboardlists.data.CountLease : 0}</div>
                            </div>
                            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/lease.svg')} className='img-fluid' />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='dashboard-card-3 p-5 d-flex justify-content-between align-items-center'>
                            <div>
                                <div className='card-head'>Landlords</div>
                                <div className='card-total mt-2'>{Dashboardlists && Dashboardlists.data && Dashboardlists.data.CountLandlord ? Dashboardlists.data.CountLandlord : 0}</div>
                            </div>
                            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/landlord.svg')} className='img-fluid' />
                        </div>
                    </div>
                </div>
                <div className='row row-cols-2 mt-8'>
                    <div className='col'>
                        <PropertyTypeChart />
                    </div>
                    <div className='col'>
                        <RadialBarChart />
                    </div>
                </div>
                <div className='row mt-8 px-3'>
                    <RecentActivities />
                </div>
            </div>
            <div className='col-sm-3'>
                <div className='row row-cols-12 d-flex justify-content-center'>
                    <div className='col'>
                        <div className='dashboard-quick-access-card p-5'>
                            <div className='mb-10'>
                                <div className='card-head-qa'>Quick Access</div>
                            </div>
                            <div className='quick-access-card-1 p-5 d-flex justify-content-between align-items-center mb-10'>
                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/landlord.svg')} className='img-fluid' />

                                <div className='text-start w-75 px-2'>
                                    <div className='quick-access-card-header'>Add Staff</div>
                                    <div className='quick-access-card-subheader'>Create a new Staff</div>
                                </div>
                                {Roles && Roles.user && Roles.user.add ?
                                    <Link to="/add-user">
                                        <i className="bi bi-plus-circle quick-access-add"></i>
                                    </Link> : null}
                            </div>
                            <div className='quick-access-card-1 p-5 d-flex justify-content-between align-items-center mb-10'>
                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/property.svg')} className='img-fluid' />
                                <div className='text-start w-75 px-2'>
                                    <div className='quick-access-card-header'>Add Property</div>
                                    <div className='quick-access-card-subheader'>Adding a New Property</div>
                                </div>
                                {Roles && Roles.myProperty && Roles.myProperty.add ?
                                    <Link to="/add-property">
                                        <i className="bi bi-plus-circle quick-access-add"></i>
                                    </Link> : null}
                            </div>
                            <div className='quick-access-card-1 p-5 d-flex justify-content-between align-items-center mb-10'>
                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/lease.svg')} className='img-fluid' />
                                <div className='text-start w-75 px-2'>
                                    <div className='quick-access-card-header'>Add Leases</div>
                                    <div className='quick-access-card-subheader'>Create lease agreements</div>
                                </div>
                                {Roles && Roles.leases && Roles.leases.add ?
                                    <Link to="/add-leases">
                                        <i className="bi bi-plus-circle quick-access-add"></i>
                                    </Link> : null}
                            </div>
                        </div>
                        <div className='bg-white p-5 table-responsive'>
                            <div className='mb-5'>
                                <div className='card-head-qa'>Notifications</div>
                            </div>
                            <div style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
                                {Dashboardlists && Dashboardlists.data && Dashboardlists.data.Notifications && Dashboardlists.data.Notifications.data && (
                                    Dashboardlists.data.Notifications.data.length ? (
                                        Dashboardlists.data.Notifications.data.map((data) => (
                                            <div className='p-5 d-flex justify-content-start align-items-center'>
                                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/dashboard/notificationLease.svg')} className='img-fluid p-3' />
                                                <div key={data.id}>
                                                    <div className='quick-access-notification-header'>{data.message}</div>
                                                    <div className='quick-access-notification-subheader'>{data.createdDate}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No notifications available</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { DashboardlistStore } = state;
    return {
        Dashboardlists: DashboardlistStore && DashboardlistStore.Dashboardlists ? DashboardlistStore.Dashboardlists : '',
        loading: DashboardlistStore && DashboardlistStore.loading ? DashboardlistStore.loading : false,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getdispatchlistDispatch: (params) => dispatch(DashboardActions.getdashboardlist(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)