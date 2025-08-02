import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  USER_ERROR,
  REGEX,
  RESPONSE_STATUS,
  SESSION
} from '../../utils/constants'
import _ from 'lodash'
import { ForgotActions, VerifyActions } from '../../store/actions'
import routeConfig from '../../routing/routeConfig'
import { setLocalStorage } from '../../utils/helper'

function ForgotPassword (props) {
  const {
    forgotPasswordDispatch,
    loading,
    forgotPasswordData,
    clearForgotPassword,
    query,
    verifyUserDispatch,
    verifyUserData
  } = props
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({
    email: ''
  })
  const [showBanner, setShowBanner] = useState(false)
  const handleSubmit = (e) => {
    const errors = {}
    if (_.isEmpty(formData.email)) {
      errors.email = USER_ERROR.EMAIL_REQUIRED
    } else if (formData.email && !REGEX.EMAIL.test(formData.email)) {
      errors.email = USER_ERROR.EMAIL_INVALID
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      forgotPasswordDispatch(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    formData[name] = value
    setFormData(formData)
    setErrors({ ...errors, [name]: '' })
  }

  useEffect(() => {
    if (query) {
      const token = query.replace('?id=', '')
      const data = {
        token
      }
      setLocalStorage(SESSION.RESET_TOKEN, token)
      verifyUserDispatch(data)
    }
  }, [query])

  useEffect(() => {
    if (
      forgotPasswordData &&
      forgotPasswordData.status === RESPONSE_STATUS.SUCCESS
    ) {
      setShowBanner(true)
      setTimeout(() => {
        setShowBanner(false)
        clearForgotPassword()
      }, 3000)
    } else if (forgotPasswordData.status === RESPONSE_STATUS.ERROR) {
      setShowBanner(true)
      setTimeout(() => {
        setShowBanner(false)
        clearForgotPassword()
      }, 3000)
    }
  }, [forgotPasswordData])

  useEffect(() => {
    if (
      verifyUserData &&
      verifyUserData.status === RESPONSE_STATUS.SUCCESS
    ) {
      setShowBanner(true)
      history.push(routeConfig.resetPassword)
    } else if (verifyUserData.status === RESPONSE_STATUS.ERROR) {
      history.push(routeConfig.resetPassword)
      setShowBanner(true)
    }
  }, [verifyUserData])

  return (
    <>
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Forgot Password ?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Enter your email to reset your password.
        </div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {showBanner && forgotPasswordData.status === RESPONSE_STATUS.ERROR && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {showBanner && forgotPasswordData.status === RESPONSE_STATUS.SUCCESS && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Sent password reset link. Please check your email
          </div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formData.email && errors.email },
            {
              'is-valid': formData.email && !errors.email
            }
          )}
          onChange={(e) => handleChange(e)}
          type='email'
          name='email'
          autoComplete='off'
        />
        {errors.email && (
          <div className='fv-plugins-message-container text-danger'>
            <span role='alert text-danger'>{errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button
          type='button'
          id='kt_password_reset_submit'
          className='btn btn-lg btn-primary fw-bolder me-4'
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
        >
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          )}
        </button>
        <Link to='/'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-lg btn-light-primary fw-bolder'
            // disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </>
  )
}

const mapStateToProps = (state) => {
  const { forgotPasswordStore, verifyUserStore } = state
  return {
    forgotPasswordData:
      forgotPasswordStore && forgotPasswordStore.forgotPassword
        ? forgotPasswordStore.forgotPassword
        : {},
    loading:
      forgotPasswordStore && forgotPasswordStore.loading
        ? forgotPasswordStore.loading
        : false,
    verifyUserData:
      verifyUserStore && verifyUserStore.verifyUser
        ? verifyUserStore.verifyUser
        : {},
    VerifyUserLoading:
      verifyUserStore && verifyUserStore.loading
        ? verifyUserStore.loading
        : false
  }
}

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordDispatch: (data) =>
    dispatch(ForgotActions.forgotPassword(data)),
  clearForgotPassword: () => dispatch(ForgotActions.clearForgotPassword()),
  verifyUserDispatch: (data) => dispatch(VerifyActions.verifyUser(data)),
  clearVerifyUser: () => dispatch(VerifyActions.clearVerifyUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
