import React from 'react';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import { DashboardActions } from '../../store/actions';
import { connect } from 'react-redux'

function RadialBarChart(props) {
    const { className, Dashboardlists } = props;
    const ExpireLeaseChartJson = Dashboardlists && Dashboardlists.data && Dashboardlists.data.ExpiringLeaseCount ? Dashboardlists.data.ExpiringLeaseCount : '';
    const seriesData = ExpireLeaseChartJson?.series;
    const labels = ExpireLeaseChartJson?.label;
    const hasChartData = seriesData?.length > 0 && labels?.length > 0;

    const chartData = {
        options: {
            chart: {
                width: '100%',
                height: 320,
                type: 'donut',
            },
            labels: labels,
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    donut: {
                        size: '80%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Property',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                offsetY: -100,
                itemMargin: {
                    horizontal: 15,
                },
                markers: {
                    width: 10,
                    height: 10,
                    radius: 2,
                },
                formatter: function (val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '';
                },
            },
            colors: ['#FF545D', '#FF8528', '#4850B2'],
        },
    };
    return (
        <div className={`card ${className}`}>
            <div className='card-body py-3'>
                {hasChartData ? (
                    <>
                        <p className='dchart-title p-5'>Expiring Lease</p>
                        <hr className='horizontal-line' />
                        <ReactApexChart
                            options={chartData.options}
                            series={seriesData}
                            type="donut"
                            height={320}
                        />
                    </>
                ) : (
                    <div>
                        <p className='dchart-title p-5'>Expiring Lease</p>
                        <hr className='horizontal-line' />
                        <div className='text-center py-3'>
                            <p>No record(s) found</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(RadialBarChart);

