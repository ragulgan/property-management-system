import React from 'react';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import { connect } from 'react-redux'
import { DashboardActions } from '../../store/actions';

function PropertyTypeChart(props) {
    const { className, Dashboardlists } = props;
    const PropertyTypeChartJson = Dashboardlists && Dashboardlists.data && Dashboardlists.data.PropertyType ? Dashboardlists.data.PropertyType : '';
    const seriesData = PropertyTypeChartJson?.series;
    const labels = PropertyTypeChartJson?.label;
    const hasChartData = seriesData?.length > 0 && labels?.length > 0;

    const chartData = {
        options: {
            chart: {
                width: '75%',
                height: 288,
                type: 'donut',
            },
            labels: labels,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    donut: {
                        size: '60%',
                    },
                    expandOnClick: true,
                },
            },
            dataLabels: {
                offset: null,
                labels: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: 'right',
                verticalAlign: 'middle',
                offsetY: 10,
                itemMargin: {
                    vertical: 7,
                },
                formatter: function (val) {
                    return val;
                },
            },
            colors: ['#F8C140', '#F58869', '#64C4F7', '#4F45B6'],
        },
    };

    return (
        <div className={`card ${className}`}>
            <div className='card-body py-3'>
                {hasChartData ? (
                    <>
                        <p className='dchart-title p-5'>Property Type</p>
                        <hr className='horizontal-line' />
                        <ReactApexChart
                            options={chartData.options}
                            series={seriesData}
                            type='donut'
                            height={288}
                        />
                    </>
                ) : (
                    <div>
                        <p className='dchart-title p-5'>Property Type</p>
                        <hr className='horizontal-line' />
                        <div className='text-center py-3'>
                            <p>No record(s) found</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyTypeChart);
