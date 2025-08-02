import React from 'react'
import { DateSelector } from '../../theme/layout/components/DateSelector'
import { DATE } from '../../utils/constants'
import dayjs from 'dayjs'

const LeaseDateFilter = (props) => {
    const {
        setFromDate,
        fromDate,
        setEndDate,
        endDate
    } = props

    return (
        <div className='row'>
            <div className='col-md-12'>
                <label className='font-size-xs font-weight-bold mb-5 form-label label-text-color'>
                    Date Range 
                </label>
            </div>
            <div className='col-md-6'>
                <label className='font-size-xs font-weight-bold mb-3 form-label label-text-color'>
                    Start Date
                </label>
                <div className='w-100'>
                    <DateSelector
                        className='date-picker'
                        name='startDate'
                        views={['year', 'month', 'day']}
                        selected={dayjs(fromDate)  || null}
                        onChange={(date) => {
                            setFromDate(date && date.$d)
                        }}
                        sx={{ width: "100%" }}
                        format={DATE.DATE_ONLY}
                    />
                </div>
            </div>
            <div className='col-md-6'>
                <label className='font-size-xs font-weight-bold mb-3 form-label label-text-color'>
                    End Date
                </label>
                <div className='w-100'>
                    <DateSelector
                        className='date-picker'
                        name='endDate'
                        views={['year', 'month', 'day']}
                        selected={dayjs(endDate)  || null}
                        onChange={(date) => {
                            setEndDate(date && date.$d)
                        }}
                        sx={{ width: "100%" }}
                        format={DATE.DATE_ONLY}
                        minDate={dayjs(fromDate)}
                    />
                </div>
            </div>
        </div>
    )
}


export default LeaseDateFilter;