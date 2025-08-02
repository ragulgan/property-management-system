import React from 'react'
import { DATE } from '../../../utils/constants'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const DateSelector = (props) => {
  const {
    selected,
    onChange,
    name,
    className,
    placeholder,
    maxDate,
    minDate,
    showTimeSelect,
    showTimeSelectOnly,
    format,
    minTime,
    maxTime,
    readOnly,
    showMonthYearPicker,
    showYearPicker,
    yearRange,
    id,
    disabled
  } = props
  return (
    <DatePicker
      className={className}
      name={name}
      views={['year', 'month', 'day']}
      value={selected}
      onChange={date => onChange(date)}
      sx={{ width: "100%" }}
      format={format}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
      slotProps={{
        textField: {
          required: true,
          id: id,
          placeholder: placeholder,
          readOnly: true,
          error: false
        },
      }}
    />
  )
}
