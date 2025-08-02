import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { LoginAdminActions } from '../../store/actions'
import { REGEX, RESPONSE_STATUS, USER_MANAGEMENT_ERROR, USER_MANAGEMENT_VALIDATION, SESSION } from '../../utils/constants'
import _ from 'lodash'
import { setLocalStorage } from '../../utils/helper'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { toAbsoluteUrl } from '../../theme/helpers'

function AdminLogin(props) {
  const { loginAdminDispatch, loading, loginAdminData } = props
  const [password, setPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
    fcmToken: '',
  })
  const [errors, setErrors] = useState({
    emailAddress: '',
    password: '',
  })
  const FCM = localStorage.getItem('FCM') ? localStorage.getItem('FCM') : ''

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (_.isEmpty(formData.emailAddress)) {
      errors.emailAddress = USER_MANAGEMENT_ERROR.USER_EMAIL
    } else if (!REGEX.EMAIL.test(formData.emailAddress)) {
      errors.emailAddress = USER_MANAGEMENT_VALIDATION.USER_EMAIL
    }
    if (_.isEmpty(formData.password) && _.isEmpty(errors.emailAddress)) {
      errors.password = USER_MANAGEMENT_ERROR.USER_PASSWORD
    } else if (!REGEX.PASSWORD.test(formData.password) && _.isEmpty(errors.emailAddress)) {
      errors.password = USER_MANAGEMENT_VALIDATION.USER_PASSWORD
    }
    setErrors(errors)
    const payload = {
      emailAddress: formData.emailAddress,
      password: formData.password,
      fcmToken: FCM
    }
    if (_.isEmpty(errors)) {
      loginAdminDispatch(payload)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    formData[name] = value
    setFormData(formData)
    setErrors({ ...errors, [name]: '' })

  }

  useEffect(() => {
    if (loginAdminData && loginAdminData.data && loginAdminData.data.token && loginAdminData.status === RESPONSE_STATUS.SUCCESS) {
      setLocalStorage(SESSION.TOKEN, loginAdminData && loginAdminData.data && loginAdminData.data.token)
      setLocalStorage(SESSION.ROLE, loginAdminData && loginAdminData.data && loginAdminData.data.role)
      localStorage.setItem('UserId', loginAdminData && loginAdminData.data && loginAdminData.data.id)
      const data = loginAdminData && loginAdminData.data && loginAdminData.data.menus
      const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
      const ROLE = convertArrayToObject(data, 'name');
      localStorage.setItem('roles', JSON.stringify(ROLE))
      window.location = '/dashboard'
    }
    else if (loginAdminData.status === RESPONSE_STATUS.ERROR) {
      Toastify({
        text: loginAdminData && loginAdminData.message,
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
  }, [loginAdminData])

  const handlePasswordVisible = (e) => {
    e.preventDefault()
    setPassword(!password)
  }

  return (
    <>
      <div className='mt-15'>
        <h1 className='login-head'>
          Login
        </h1>
      </div>
      <div className='login-para mb-13'>
        Login in to your account to continue
      </div>
      <form>
        <div className="fv-row mb-5">
          <div className="position-relative mb-2">
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
              id="basic-addon1">
              <i className="bi bi-envelope fs-1" />
            </span>
            <input
              placeholder='Enter Email Address'
              className={clsx(
                'form-control form-control-lg ps-15'
              )}
              onChange={(e) => handleChange(e)}
              type='email'
              name='emailAddress'
              autoComplete='off'
              onKeyPress={(e) => {
                if (formData.emailAddress.length >= 50) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          {errors.emailAddress && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.emailAddress}</span>
            </div>
          )}
        </div>
        <div className="fv-row mb-8">
          <div className="position-relative mb-2">
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 start-0 ms-8"
              id="basic-addon1">
              {/* <img src={toAbsoluteUrl('/media/avatars/login/password.svg')} width='25px' height='25px' /> */}
              <i className="bi bi-lock fs-1" />
            </span>
            <input
              placeholder='Enter Password'
              className={clsx(
                'form-control form-control-lg ps-15 password-validation'
              )}
              onChange={(e) => handleChange(e)}
              type={password ? 'text' : 'password'}
              name='password'
              autoComplete='off'
              maxLength={30}
            />
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
              onClick={handlePasswordVisible}>
              {password ? <i className="bi bi-eye fs-2"></i> : <i className="bi bi-eye-slash fs-2"></i>}
            </span>
          </div>
          {errors.password && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert text-danger'>{errors.password}</span>
            </div>
          )}
        </div>
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-login w-100 mb-8'
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading && <span className='indicator-label'>Login</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2' />
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = state => {
  const { loginAdminStore } = state
  return {
    loginAdminData: loginAdminStore && loginAdminStore.loginAdmin ? loginAdminStore.loginAdmin : {},
    loading: loginAdminStore && loginAdminStore.loading ? loginAdminStore.loading : false
  }
}

const mapDispatchToProps = dispatch => ({
  loginAdminDispatch: (data) => dispatch(LoginAdminActions.loginAdmin(data)),
  clearAdminLogin: () => dispatch(LoginAdminActions.clearLoginAdmin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin)
