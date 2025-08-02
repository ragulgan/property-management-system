import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { LandlordsActions, LeasesListActions } from '../../store/actions'
import ReactSelect from '../../theme/layout/components/ReactSelect'

const LandlordDropdown = (props) => {
    const {
        setLandLoardValue,
        getAllLandlords,
        landLoardValue
      } = props
    const [landlordOption, setLandlordOption] = useState()

    const handleChange = (selectedOption) => {
        if (selectedOption !== null) {
            setLandLoardValue(selectedOption)
          } else {
            setLandLoardValue();
          }
    }

    useEffect(() => {
        const data = getAllLandlords && getAllLandlords.data
        const landLord = getDefaultOptions(data)
        setLandlordOption(landLord)
    }, [getAllLandlords])

    const getDefaultOptions = (landLord) => {
        const defaultOptions = []
        for (const item in landLord) {
            defaultOptions.push({ label: landLord[item].firstName, value: landLord[item].id })
        }
        return defaultOptions
    }

  return (
      <div className='mt-5'>
          <div className='w-75'>
            <ReactSelect
              placeholder="Select Landlord name"
              isMulti={false}
              name='landlord'
              className='select2'
              classNamePrefix='select'
              handleChangeReactSelect={handleChange}
              options={landlordOption}
              value={landLoardValue}
            />
          </div>
      </div>
  )
}

const mapStateToProps = (state) => {
    const { LandlordslistStore } = state;
    return {
      getAllLandlords: LandlordslistStore && LandlordslistStore.getAllLandlords ? LandlordslistStore.getAllLandlords : '',
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    getLandlordlistDispatch: (params) => dispatch(LandlordsActions.getlandlordslist(params))
  });

export default connect(mapStateToProps, mapDispatchToProps)(LandlordDropdown);