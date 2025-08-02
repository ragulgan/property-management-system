import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { ResetPasswordActions } from '../../store/actions'
import {
  USER_ERROR,
  RESPONSE_STATUS,
  SESSION
} from '../../utils/constants'
import _ from 'lodash'
import { getLocalStorage } from '../../utils/helper'

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

function ResetPassword (props) {
  const {
    resetPasswordDispatch,
    resetPasswordLoading,
    resetPasswordData,
    clearResetPassword
  } = props
  const history = useHistory()
  const [formData, setFormData] = useState({
    confirmPassword: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    confirmPassword: '',
    password: ''
  })
  const [showBanner, setShowBanner] = useState(false)

  const handleSubmit = (e) => {
    const errors = {}
    if (_.isEmpty(formData.confirmPassword)) {
      errors.confirmPassword = USER_ERROR.CONFIRM_PASSWORD_REQUIRED
    }
    if (_.isEmpty(formData.password)) {
      errors.password = USER_ERROR.CONFIRM_PASSWORD_REQUIRED
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = USER_ERROR.PASSWORD_SAME
    }
    setErrors(errors)
    if (_.isEmpty(errors)) {
      const resetToken = getLocalStorage(SESSION.RESET_TOKEN)
      const data = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: resetToken
      }
      resetPasswordDispatch(data)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    formData[name] = value
    setFormData(formData)
    setErrors({ ...errors, [name]: '' })
  }

  useEffect(() => {
    if (
      resetPasswordData &&
      resetPasswordData.status === RESPONSE_STATUS.SUCCESS
    ) {
      setShowBanner(true)
      setTimeout(() => {
        setShowBanner(false)
        history.push('/')
        clearResetPassword()
      }, 3000)
    } else if (resetPasswordData.status === RESPONSE_STATUS.ERROR) {
      setShowBanner(true)
      setTimeout(() => {
        setShowBanner(false)
        history.push('/')
        clearResetPassword()
      }, 3000)
    }
  }, [resetPasswordData])

  return (
    <>
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Reset Password</h1>
        {/* end::Title */}
      </div>
      {/* begin::Banner */}
      {showBanner && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className={`text-center text-${resetPasswordData.status === RESPONSE_STATUS.SUCCESS ? 'success' : 'danger'}`}>
            {resetPasswordData.message}
          </div>
        </div>
      )}
      {/* end::Banner */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>
              Password
            </label>
            {/* end::Label */}
          </div>
        </div>
        <input
          type='password'
          placeholder='Password'
          autoComplete='off'
          onChange={(e) => handleChange(e)}
          name='confirmPassword'
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formData.password && errors.password
            },
            {
              'is-valid': formData.password && !errors.password
            }
          )}
        />
        {errors.password && (
          <div className='fv-plugins-message-container text-danger'>
            <div className='fv-help-block'>
              <span role='alert'>{errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>
          Confirm Password
        </label>
        <input
          placeholder='Confirm Password'
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formData.confirmPassword && errors.confirmPassword
            },
            {
              'is-valid': formData.confirmPassword && !errors.confirmPassword
            }
          )}
          onChange={(e) => handleChange(e)}
          name='password'
          type='password'
          autoComplete='off'
        />
        {errors.confirmPassword && (
          <div className='fv-plugins-message-container text-danger'>
            <span role='alert text-danger'>{errors.confirmPassword}</span>
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
          disabled={resetPasswordLoading}
        >
          {!resetPasswordLoading && (
            <span className='indicator-label'>Submit</span>
          )}
          {resetPasswordLoading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
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
  const { resetPasswordStore } = state
  return {
    resetPasswordData:
      resetPasswordStore && resetPasswordStore.resetPassword
        ? resetPasswordStore.resetPassword
        : {},
    resetPasswordLoading:
      resetPasswordStore && resetPasswordStore.loading
        ? resetPasswordStore.loading
        : false
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPasswordDispatch: (data) =>
    dispatch(ResetPasswordActions.resetPassword(data)),
  clearResetPassword: () => dispatch(ResetPasswordActions.clearResetPassword())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
