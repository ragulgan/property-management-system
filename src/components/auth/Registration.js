import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { RegisterActions } from '../../store/actions'
import routeConfig from '../../routing/routeConfig'
import _ from 'lodash'
import { REGEX, RESPONSE_STATUS, USER_MANAGEMENT_ERROR, USER_MANAGEMENT_VALIDATION } from '../../utils/constants'
import { connect } from 'react-redux'
import Otp from './Otp'

function Registration(props) {
  const { RegisterDispatch, loading, registerData, clearRegister } = props
  const [formData, setFormData] = useState({
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState({
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName:''
  })
  const [otpField, setOtpField] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (_.isEmpty(formData.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_ERROR.USER_PHONE
    } else  if (!REGEX.PHONE_NUMBER_1.test(formData.mobileNumber)) {
      errors.mobileNumber = USER_MANAGEMENT_VALIDATION.USER_PHONE
    }
    if (_.isEmpty(formData.firstName)) {
      errors.firstName = USER_MANAGEMENT_ERROR.USER_FNAME
    }
    if (_.isEmpty(formData.lastName)) {
      errors.lastName = USER_MANAGEMENT_ERROR.USER_LNAME
    }    
    if (_.isEmpty(formData.email)) {
      errors.email = USER_MANAGEMENT_ERROR.USER_EMAIL
    }else if (!REGEX.EMAIL.test(formData.email)) {
      errors.email = USER_MANAGEMENT_VALIDATION.USER_EMAIL
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      RegisterDispatch(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    formData[name] = value
    setFormData(formData)
    setErrors({ ...errors, [name]: '' })
  }

  useEffect(() => {
    if (registerData && registerData.data && registerData.data.token && registerData.status === RESPONSE_STATUS.SUCCESS) {
      clearRegister()
      setOtpField(true)
    }
    else if (registerData.status === RESPONSE_STATUS.ERROR) {
      setOtpField(false)
    }
  }, [registerData])

  return (
    <>
      <Otp show={otpField}  setOtpField={setOtpField}/>
      {
        !otpField ? (
          <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_signup_form'
        >
          <div className='mb-8'>
            <h1 className='text-dark mb-3 login-head'>Shenll Property <br />
              Join Us Today !</h1>
          </div>
          <div className='login-para mb-5'>
            Fill the form below to create an account
          </div>
          <div className="fv-row mb-5">
            <div className="position-relative mb-2">
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
                id="basic-addon1">
                <i className="bi bi-person fs-1" />
              </span>
              <input
                placeholder='Enter First Name'
                className={clsx(
                  'form-control form-control-lg ps-15',
                  { 'is-invalid': formData.firstName && errors.firstName },
                  {
                    'is-valid': formData.firstName && !errors.firstName
                  }
                )}
                onChange={(e) => handleChange(e)}
                type='text'
                name='firstName'
                autoComplete='off' />
            </div>
            {errors.firstName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.firstName}</span>
              </div>
            )}
          </div>
          <div className="fv-row mb-5">
            <div className="position-relative mb-2">
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
                id="basic-addon1">
                <i className="bi bi-person fs-1" />
              </span>
              <input
                placeholder='Enter Last Name'
                className={clsx(
                  'form-control form-control-lg ps-15',
                  { 'is-invalid': formData.lastName && errors.lastName },
                  {
                    'is-valid': formData.lastName && !errors.lastName
                  }
                )}
                onChange={(e) => handleChange(e)}
                type='text'
                name='lastName'
                autoComplete='off'
              />
            </div>
            {errors.lastName && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert text-danger'>{errors.lastName}</span>
              </div>
            )}
          </div>
          <div className="fv-row mb-5">
            <div className="position-relative mb-2">
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
                id="basic-addon1">
                <i className="bi bi-telephone fs-1" />
              </span>
              <input
                 placeholder='Enter Mobile Number'
                 className={clsx(
                   'form-control form-control-lg ps-15',
                   { 'is-invalid': formData.mobileNumber && errors.mobileNumber },
                   {
                     'is-valid': formData.mobileNumber && !errors.mobileNumber
                   }
                 )}
                 onChange={(e) => handleChange(e)}
                 maxLength={10}
                 type='text'
                 name='mobileNumber'
                 autoComplete='off'
               />
             </div>
             {errors.mobileNumber && (
               <div className='fv-plugins-message-container text-danger'>
                 <span role='alert text-danger'>{errors.mobileNumber}</span>
               </div>
             )}
          </div>
          <div className="fv-row mb-5">
            <div className="position-relative mb-2">
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
                id="basic-addon1">
                <i className="bi bi-envelope fs-1" />
              </span>
              <input
                 placeholder='Enter Email Address'
                 className={clsx(
                   'form-control form-control-lg ps-15',
                   { 'is-invalid': formData.email && errors.email },
                   {
                     'is-valid': formData.email && !errors.email
                   }
                 )}
                 onChange={(e) => handleChange(e)}
                 type='text'
                 name='email'
                 autoComplete='off'
               />
             </div>
             {errors.email && (
               <div className='fv-plugins-message-container text-danger'>
                 <span role='alert text-danger'>{errors.email}</span>
               </div>
             )}
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-lg btn-login  w-100 mb-5'
              disabled={loading}
              onClick={handleSubmit}
            >
              {!loading && <span className='indicator-label'>Register</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2' />
                </span>
              )}
            </button>
            <div className='d-flex justify-content-between mt-n5'>
              <div className='d-flex flex-stack mb-2 mt-4'>
                <label className='form-label login-link-text text-dark fs-6 mb-0'>
                  Already have an account?
                </label>
                <Link
                  to={routeConfig.auth}
                  className='link-primary fs-6 login-link'
                  style={{ marginLeft: '5px' }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
        ):
        null
      }
    </>
  )
}

const mapStateToProps = state => {
  const { registerStore } = state
  return {
    registerData: registerStore && registerStore.registerData ? registerStore.registerData : {},
    loading: registerStore && registerStore.loading ? registerStore.loading : false
  }
}

const mapDispatchToProps = dispatch => ({
  RegisterDispatch: (data) => dispatch(RegisterActions.Register(data)),
  clearRegister: () => dispatch(RegisterActions.clearRegister())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration)