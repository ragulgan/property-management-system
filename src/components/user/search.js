import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import { KTSVG } from '../../theme/helpers'
import _ from 'lodash'
import { UsersActions } from '../../store/actions'

function SearchLists(props) {
  const { getUserlistDispatch } = props

  const [data, setFormData] = useState({
    firstName: '',
    mobile: '',
    status: '',
  })

  const handleChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSearch = () => {
    // setShow(false)
    const params = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== '') {
        params[key] = data[key]
      }
    }
    getUserlistDispatch(params)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      mobile: '',
      status: '',
    })
    const params = {
      limit: 25,
      page: 1
    }
    getUserlistDispatch(params)
  }


  return (
    <>
      <div>


      </div>
      <div
        className='modal fade'
        id='searchModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden="''"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className='modal-dialog modal-dialog-centered mw-1000px'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='me-8'>Search</h2>
              <button type="button"
                data-repeater-delete=""
                className="btn btn-sm btn-icon btn-light-danger"
                data-dismiss='modal'

              >
                <span className="svg-icon svg-icon-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor"></rect>
                    <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor"></rect>
                  </svg>
                </span>
              </button>
            </div>
            <div className='modal-body bg-lightBlue'>
              <form className='container-fixed'>
                <div className='card-header'>
                  <div className='card-body'>
                    <div className='form-group row mb-4'>
                      <div className='col-lg-3 mb-3'>
                        <label className='font-size-xs font-weight-bold mb-3  form-label'>
                          firstName
                        </label>
                        <div className='col-lg-11'>
                          <input
                            name='firstName'
                            type='text'
                            className='form-control'
                            placeholder=' firstname'
                            onChange={(e) => handleChange(e)}
                            autoComplete='off'
                            value={data.firstName || ''}
                          />
                        </div>
                      </div>
                      <div className='col-lg-3 mb-3'>
                        <label className='font-size-xs font-weight-bold mb-3  form-label'>
                          mobile
                        </label>
                        <div className='col-lg-11'>
                          <input
                            name='mobile'
                            type='text'
                            className='form-control'
                            placeholder='mobile'
                            onChange={(e) => handleChange(e)}
                            autoComplete='off'
                            value={data.mobile || ''}
                          />
                        </div>
                      </div>

                      <div className='col-lg-3 mb-3'>
                        <label className='font-size-xs font-weight-bold mb-3  form-label'>
                          Status:
                        </label>
                        <div className='col-lg-11'>
                          <select
                            name='status'
                            className='form-select form-select-solid'
                            data-control='select'
                            data-placeholder='Select an option'
                            data-allow-clear='true'
                            onChange={(e) => handleChange(e)}
                            value={data.status || ''}
                          >
                            <option value=''>Select...</option>
                            <option value='ACTIVE'>ACTIVE</option>
                            <option value='INACTIVE'>INACTIVE</option>

                          </select>
                        </div>
                      </div>

                      <div className='form-group row mb-4'>
                        <div className='col-lg-6' />
                        <div className='col-lg-6'>
                          <div className='col-lg-11'>
                            <button
                              type='button'
                              className='btn btn-sm btn-light-primary m-2 fa-pull-right'
                              onClick={() => handleSearch()}
                              data-dismiss='modal'
                            >
                              Search
                            </button>
                            <button
                              type='button'
                              className='btn btn-sm btn-light-danger m-2 fa-pull-right close'
                              onClick={() => handleReset()}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

const mapStateToProps = (state) => {
  const { USERlistStore } = state;
  return {
    USERlists: USERlistStore && USERlistStore.USERlists ? USERlistStore.USERlists : '',
    loading: USERlistStore && USERlistStore.loading ? USERlistStore.loading : false,
  };
};

// const mapStateToProps = state => ({
//     const { USERlistStore } = state;
//     console.log('USERlistStore', USERlistStore)
//     return
// //   getRiskManagementlist: state && state.riskManagementlistStore && state.riskManagementlistStore.getRiskManagementlist,
//    loading: state && state.riskManagementlistStore && state.riskManagementlistStore.loading,
//    USERlists: USERlistStore && USERlistStore.USERlists ? USERlistStore.USERlists : '',

// })

const mapDispatchToProps = dispatch => ({
  getUserlistDispatch: (data) =>
    dispatch(UsersActions.getUSERlist(data))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLists)