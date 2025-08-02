import React, { useState } from 'react'
import Slider from '@mui/material/Slider';

const marks = [
    {
      value: 100000,
      label: '1L',
    },
    {
        value: 1500000,
        label: '15L',
    },
  ];

const LeasePriceFilter = (props) => {
    const {
        setAmount,
        amount
    } = props
    
    const [value, setValue] = useState(amount ? amount : [100000, 1500000]);
    const handleChange = (e, newValue) => {
        setValue(newValue)
        setAmount(newValue)
      };

    return (
        <div className='row'>
            <div className='col-md-12'>
                <label className='font-size-xs font-weight-bold mb-5 form-label label-text-color'>
                    Amount Range
                </label>
                <div className='col-md-12'>
                    <Slider
                        value={amount.length > 0 ? amount : value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={100000}
                        max={1500000}
                        min={100000}
                        size="small"
                        marks={marks}
                        sx={{ color: '#153D58' }} />
                </div>
            </div>
            <div className='col-md-6'>
                <label className='font-size-xs font-weight-bold mb-3 form-label label-text-color'>
                    Min Amount
                </label>
                <div className='w-100'>
                    <input
                        placeholder='Minimum Value'
                        className='form-control form-control-lg placeHolder p-3 position-relative'
                        // onChange={handleChange}
                        value={amount.length > 0 ? amount[0]: value[0]}
                        type='text'
                        name='minValue'
                        autoComplete='off'
                        disabled
                    />
                </div>
            </div>
            <div className='col-md-6'>
                <label className='font-size-xs font-weight-bold mb-3 form-label label-text-color'>
                    Max Amount
                </label>
                <div className='w-100'>
                    <input
                        placeholder='Maximum Value'
                        className='form-control form-control-lg placeHolder p-3 position-relative'
                        // onChange={handleChange}
                        value={amount.length > 0 ? amount[1]: value[1]}
                        type='text'
                        name='maxValue'
                        autoComplete='off'
                        disabled
                    />
                </div>
            </div>
        </div>
    )
}


export default LeasePriceFilter;