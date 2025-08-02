import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../theme/helpers";
import _ from 'lodash'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import ReactSelect from '../../theme/layout/components/ReactSelect'
import {
  PropertyDocumentActions,
  PropertyDocumentdeleteActions
} from "../../store/actions";

const FloorStatus = [
  {
    "value": "ACTIVE",
    "label": "Active"
  },
  {
    "value": "INACTIVE",
    "label": "Inactive"
  }
]

function BlockandFloor(props) {
  const { className, setActiveTab } = props
  const history = useHistory()

  const [formData, setFormData] = useState({ emergency: [] })
  const [errors, setErrors] = useState({ emergency: [] })
  const [emergencyContacts, setEmergencyContacts] = useState([{ blockName: '', noOfFloors: '', status: '' }])
  const [addonEmerError, setAddonEmerError] = useState(false)
  const [amenities, setAmenities] = useState({
    gym: false,
    swimming: false,
    communityRoom: false,
    laundry: false,
    playArea: false,
    parking: false,
    security: false,
    elevator: false,
    maintenance: false
  })

  const handleChangeContact = (e, index) => {
    const { name, value } = e.target
    const updatedContacts = [...emergencyContacts]
    if (updatedContacts[index] && updatedContacts[index].hasOwnProperty(name)) {
      updatedContacts[index][name] = value
    }
    setEmergencyContacts(updatedContacts)
  }

  const handleChangeSelectStatus = (selectedOption, index) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts[index].status = selectedOption
    setEmergencyContacts(updatedContacts)
  }

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target
    setAmenities({ ...amenities, [id]: checked })
  }

  const validateFields = () => {
    let isValid = true
    const newErrors = { emergency: [] }

    emergencyContacts.forEach((contact, index) => {
      if (!contact.blockName) {
        isValid = false
        newErrors.emergency[index] = { blockName: 'Block Name is required' }
      }
      if (!contact.noOfFloors) {
        isValid = false
        newErrors.emergency[index] = { ...newErrors.emergency[index], noOfFloors: 'Number of Floors is required' }
      }
      if (!contact.status) {
        isValid = false
        newErrors.emergency[index] = { ...newErrors.emergency[index], status: 'Block Status is required' }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e, name) => {
    e.preventDefault()
    if (validateFields()) {
      const payload = {
        blockDetails: emergencyContacts,
        amenities: amenities
      }
      if (!_.isEmpty(name)) {
        console.log(payload)
        history.push('/apartments')
      }else{
        console.log(payload)
      }
    } else {
      Toastify({
        text: 'Please fill all required fields.',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'
        },
      }).showToast()
    }
  }

  useEffect(() => {
    if (addonEmerError) {
      Toastify({
        text: 'Only Ten Blocks Info details are allowed.',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#bb2124'
        },
      }).showToast()
    }
  }, [addonEmerError])

  const handelAdd = () => {
    if (emergencyContacts.length === 10) {
      setAddonEmerError(true)
    } else {
      setEmergencyContacts([...emergencyContacts, { blockName: '', noOfFloors: '', status: '' }])
      setAddonEmerError(false)
    }
  }

  const handleRemove = (indexToRemove) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts.splice(indexToRemove, 1)
    setEmergencyContacts(updatedContacts)
    setAddonEmerError(false)
    setFormData({ ...formData, emergency: updatedContacts })
  }

  const onBack = (e, name) => {
    if (!_.isEmpty(name)) {
      setActiveTab('Apartment info')
    }
  }

  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-body py-3'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-lg-6'>
                <label className='staff-header mt-4 form-label'>
                  Blocks Info
                </label>
              </div>
              <div className='col-lg-6 d-flex justify-content-end'>
                <span className="btn btn-blue p-2 m-2 rounded-1" onClick={handelAdd}>
                  <i className="bi bi-plus-lg fs-2 text-white ml-1"></i>
                </span>
              </div>
              {emergencyContacts.map((formdata, index) => (
                <div className='row' key={index}>
                  <div className='col-lg-4'>
                    <label className="mt-4 form-label required">Block Name</label>
                    <input
                      name='blockName'
                      type='text'
                      id='blockName'
                      className='form-control form-control-lg ps-4 placeHolder'
                      placeholder='Type here'
                      onChange={(e) => handleChangeContact(e, index)}
                      autoComplete='off'
                      value={formdata.blockName || ''}
                      onKeyPress={(e) => {
                        const regex = /^[a-zA-Z0-9 ]*$/;
                        if (!regex.test(e.key) || formdata.blockName.length >= 30) {
                          e.preventDefault()
                        }
                      }}
                    />
                    {errors.emergency[index] && errors.emergency[index].blockName && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert'>{errors.emergency[index].blockName}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-lg-4'>
                    <label className="mt-4 form-label required">No.of Floors</label>
                    <input
                      name='noOfFloors'
                      id='noOfFloors'
                      type='text'
                      className='form-control form-control-lg ps-4 placeHolder'
                      placeholder='Type here'
                      onChange={(e) => handleChangeContact(e, index)}
                      autoComplete='off'
                      value={formdata.noOfFloors || ''}
                      onKeyPress={(e) => {
                        const regex = /^[0-9]*$/;
                        if (!regex.test(e.key) || formdata.noOfFloors.length >= 30) {
                          e.preventDefault()
                        }
                      }}
                    />
                    {errors.emergency[index] && errors.emergency[index].noOfFloors && (
                      <div className='fv-plugins-message-container text-danger mb-4'>
                        <span role='alert'>{errors.emergency[index].noOfFloors}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-lg-4 d-flex flex-column'>
                    <label className="mt-4 form-label required">Status</label>
                    <div className="d-flex align-items-center">
                      <ReactSelect
                        placeholder="Select Status"
                        isMulti={false}
                        name='status'
                        id='status'
                        className='select2 autocomplete-select line-span'
                        classNamePrefix='select'
                        handleChangeReactSelect={(selectedOption) => handleChangeSelectStatus(selectedOption, index)}
                        options={FloorStatus}
                        value={formdata.status}
                        isSearchable={false}
                      />
                      {errors.emergency[index] && errors.emergency[index].status && (
                        <div className="rr mt-1">
                          <style>{".rr{color:red}"}</style>
                          {errors.emergency[index].status}
                        </div>
                      )}
                      {index > 0 ? (
                        <span className="btn btn-blue p-2 m-2 rounded-1" onClick={() => handleRemove(index)}>
                          <i className="bi bi-trash3 fs-2 text-white ml-1"></i>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <div className='col-lg-12'>
                <label className='staff-header mt-4 form-label'>
                  Amenities
                </label>
              </div>
              <div className='row p-2 mx-2'>
                {[
                  { id: 'gym', label: 'Fitness Center/Gym', icon: 'gym.svg' },
                  { id: 'swimming', label: 'Swimming Pool', icon: 'swimming.svg' },
                  { id: 'communityRoom', label: 'Community Room', icon: 'community.svg' },
                  { id: 'laundry', label: 'Laundry Facilities', icon: 'washing.svg' },
                  { id: 'playArea', label: 'Playgrounds', icon: 'playground.svg' },
                  { id: 'parking', label: 'Parking', icon: 'parking.svg' },
                  { id: 'security', label: 'Security Features', icon: 'security.svg' },
                  { id: 'elevator', label: 'Elevator Access', icon: 'elevator.svg' },
                  { id: 'maintenance', label: 'Maintenance Services', icon: 'maintenance.svg' }
                ].map((amenity) => (
                  <div key={amenity.id} className='col-lg-4 mb-4 form-check d-flex align-items-center'>
                    <input
                      className="form-check-input block-amenities-checkbox"
                      type="checkbox"
                      id={amenity.id}
                      checked={amenities[amenity.id]}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label block-amenities" htmlFor={amenity.id}>
                      <img src={toAbsoluteUrl(`/media/avatars/blockAmenities/${amenity.icon}`)} alt={amenity.label} className='fs-1 p-2' />
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className='form-group row mt-4'>
              <div className='col-lg-12 text-center'>
                <button
                  type='button'
                  className='btn btn-blue-outline py-2 m-2'
                  onClick={(e) => onBack(e, "back")}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-secondary py-2 m-2">
                  Save
                </button>
                <button
                  type='submit'
                  className='btn btn-blue py-2 m-2'
                  onClick={(e) => handleSubmit(e, "continue")}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { PropertyDoclistStore, PropertyDocdeleteStore } = state;
  return {
    PropertyDoclists: PropertyDoclistStore && PropertyDoclistStore.PropertyDoclists ? PropertyDoclistStore.PropertyDoclists : '',
    loading: PropertyDoclistStore && PropertyDoclistStore.loading ? PropertyDoclistStore.loading : false,
    PropertyDocdelete: PropertyDocdeleteStore && PropertyDocdeleteStore.PropertyDocdelete ? PropertyDocdeleteStore.PropertyDocdelete : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPropertyDocListDispatch: (params) => dispatch(PropertyDocumentActions.getpropertyDoclist(params)),
  deleteDispatch: (id) => dispatch(PropertyDocumentdeleteActions.delete(id)),
  clearPropertyDocDelete: () => dispatch(PropertyDocumentdeleteActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockandFloor)