import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { PROPERTY_STATUS_BADGE } from '../../utils/constants'
import { DashboardActions } from '../../store/actions';
import dayjs from 'dayjs';

function RecentActivities(props) {
  const {
    getdispatchlistDispatch,
    className,
    loading,
    Dashboardlists
  } = props

  const [limit, setLimit] = useState(4)
  const [data, setData] = useState({})
  const [activePageNumber, setActivePageNumber] = useState(1)
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: 1
    }
    getdispatchlistDispatch(params)
  }, [])


  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <div className='row px-6 mt-5'>
            <div className='col-sm-12 text-start'>
              <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Recent Activities</h4>
            </div>
          </div>
          <div className="table-responsive px-6 rounded-0">
            <table className="table border gs-2 mt-6">
              <thead className='fw-bolder fs-6 text-gray-800'>
                <tr className="table-head border-bottom-2 border-gray-200">
                  <th className="min-w-100px">Property ID</th>
                  <th className="min-w-100px">Property Name</th>
                  <th className="min-w-100px">Landlord</th>
                  <th className="min-w-100px">Created Date</th>
                  <th className="min-w-100px">Status</th>
                </tr>
              </thead>
              <tbody className='fs-6 border-bottom-1'>
                {
                  !loading
                    ? (
                      Dashboardlists && !_.isEmpty(Dashboardlists.data)
                        ? (
                          Dashboardlists && Dashboardlists?.data && Dashboardlists?.data?.PropertyList?.map((data, id) => {
                            return (
                              <tr
                                key={id}
                              >
                                <td className="py-5 text-start">
                                  {data && data.propertyId ? data.propertyId : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.propertyName ? data.propertyName : "--"}
                                </td>
                                <td className="pb-0 pt-5  text-start">
                                  {data && data.landLord && data.landLord.firstName ? data.landLord.firstName : "--"}
                                </td>
                                <td className="py-5 text-start">
                                  {data && data.createdOn ? dayjs(data.createdOn).format('DD/MM/YYYY') : "--"}
                                </td>
                                <td className="text-start">
                                  <span
                                    className={`property-list-status badge ${PROPERTY_STATUS_BADGE[data && data.propertyStatus]}`
                                    }>
                                    {data && data.propertyStatus ?
                                      <>
                                        {data.propertyStatus === 'VACANT' && (
                                          'Vacant'
                                        )}
                                        {data.propertyStatus === 'OCCUPIED' && (
                                          'Occupied'
                                        )}
                                        {data.propertyStatus === 'REPAIR' && (
                                          'Repair'
                                        )}
                                        {data.propertyStatus === 'UNDER_MAINTENANCE' && (
                                          'Maintenance'
                                        )}
                                      </> :
                                      "--"}
                                  </span>
                                </td>
                              </tr>
                            )
                          })
                        )
                        : (
                          <tr className='text-center py-3'>
                            <td colSpan='100%'>No record(s) found</td>
                          </tr>
                        )
                    )
                    :
                    (
                      <tr>
                        <td colSpan='100%' className='text-center'>
                          <div
                            className='spinner-border text-primary m-5'
                            role='status'
                          />
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivities);