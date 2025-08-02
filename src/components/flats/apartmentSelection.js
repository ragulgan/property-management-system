import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useHistory } from 'react-router-dom'
import ReactSelect from '../../theme/layout/components/ReactSelect'
import { FLATS_SELECT_ERROR, RESPONSE_STATUS } from '../../utils/constants'
import { FlatListActions, getApartmentListActions } from "../../store/actions";

function ApartmentSelection(props) {
    const { 
      getApartmentlistDispatch,
      getflatlistDispatch,
      getAllApartment, 
      FlatsLists,
      loading 
    } = props

    const [formdata, setFormData] = useState({
        apartmentId: ''
    })
    const [errors, setErrors] = useState({
        apartmentId: ''
    })

  const didMount = React.useRef(false);
  const [apartmertSelect, setApartmertSelect] = useState('')
  const [SelectedApartmentOption, setSelectedApartmentOption] = useState("");

  const history = useHistory()

    useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;
      }
    });
  
    useEffect(() => {
      getApartmentlistDispatch()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = {}
        if (_.isEmpty(formdata.apartmentId)) {
            errors.apartmentId = FLATS_SELECT_ERROR.APARTMENT_SELECT
            document.getElementById('apartmentId').focus()
        }
        setErrors(errors)
        const payload = {
          limit: 10,
          pageNo: 1,
          apartmentId: formdata.apartmentId,
        }
        if (_.isEmpty(errors)) {
          getflatlistDispatch(payload)
        }
    }

    const handleChange = (selectedOption) => {
      if (selectedOption !== null) {
        setSelectedApartmentOption(selectedOption)
        setFormData(({ apartmentId: selectedOption.value }))
        setErrors({ apartmentId: "" });
      } else {
        setSelectedApartmentOption();
        setFormData(({ apartmentId: "" }));
      }
    }

    useEffect(() => {
      const data = getAllApartment && getAllApartment.data
      const apartment = getDefaultOptions(data)
      setApartmertSelect(apartment)
    }, [getAllApartment])
    

    const getDefaultOptions = (apartments) => {
      const defaultOptions = [];
      for (const apartment of apartments) {
        defaultOptions.push({
          label: apartment.apartmentName,
          value: apartment.id,
          image: apartment.apartmentImages
        });
      }
      return defaultOptions;
    };

    useEffect(() => {
      if (!_.isEmpty(formdata.apartmentId)) { 
          history.push('/flatList', {state: SelectedApartmentOption})
      }
      else if (FlatsLists.status === RESPONSE_STATUS.ERROR) {
        Toastify({
          text: FlatsLists && FlatsLists.message,
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#bb2124",
          },
        }).showToast();
      }
    }, [FlatsLists])

    useEffect(() => {
      return (() => {
        setSelectedApartmentOption('')
      })
    }, [])

    return (
        <>
            <div className='mb-5'>
                <h4 className='fw-bolder fs-3 text-dark-800 border-bottom-2 border-gray-200'>Flats</h4>
            </div>
            <div className='card mb-5'>
                <div className='card-body'>
                    <div className="form-group row" style={{ height: '75vh', display: 'grid', placeItems: 'center' }}>
                        <div className="col-lg-6 p-20">
                            <div className='mb-5'>
                              <h4 className='apartment-selection-header'>Apartment Selection</h4>
                            </div>
                            <ReactSelect
                                placeholder="Search for an Apartment"
                                isMulti={false}
                                name='apartmentId'
                                className='select2'
                                classNamePrefix='select'
                                flatdrop='apartmentSelect'
                                id='apartmentId'
                                handleChangeReactSelect={handleChange}
                                options={apartmertSelect}
                                value={SelectedApartmentOption}
                                isSearchable
                            />
                            {errors.apartmentId && (
                                <div className='fv-plugins-message-container text-danger mb-4'>
                                    <span role='alert' className='text-danger'>{errors.apartmentId}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                className='btn btn-aprtmentSelect w-100'
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {!loading && <span className='indicator-label'>Show Flats</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Please wait...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const { getApartmentlistStore, FlatlistStore } = state
    return {
        getAllApartment: getApartmentlistStore && getApartmentlistStore.getAllApartment ? getApartmentlistStore.getAllApartment : '',
        FlatsLists: FlatlistStore && FlatlistStore.getAllFlat ? FlatlistStore.getAllFlat : "",
        loading: FlatlistStore && FlatlistStore.loading ? FlatlistStore.loading : false,
    }
}

const mapDispatchToProps = (dispatch) => ({
  getApartmentlistDispatch: (params) => dispatch(getApartmentListActions.get(params)),
  getflatlistDispatch: (params) => dispatch(FlatListActions.getFlatlist(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentSelection)
