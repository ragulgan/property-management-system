import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { OtpActions } from '../../store/actions'
import routeConfig from '../../routing/routeConfig'
import _ from 'lodash'
import { RESPONSE_STATUS, SESSION } from '../../utils/constants'
import { connect } from 'react-redux'
import OtpInput from 'react-otp-input';
import { setLocalStorage } from '../../utils/helper'

function OTP(props) {
  const { OtpDispatch, loading, otpData, clearOtp, show , setOtpField} = props
  const [otp, setOtp] = useState('')

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    if(otp.length === 4) {
      const payload = {
        otp:otp
      }
      OtpDispatch(payload)
    }
  }

  useEffect(() => {
    if (otpData && otpData.data && otpData.data.token && otpData.status === RESPONSE_STATUS.SUCCESS) {
        setLocalStorage(SESSION.TOKEN, otpData.data.token)
        window.location = '/users'
        setOtpField(false)
        clearOtp()
    }
    else if (otpData.status === RESPONSE_STATUS.ERROR) {
        setOtpField(true)
    }
  }, [otpData])

  return (
    <>
    {show ?
    <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_otp_signup_form'
    >
        <div className='mb-8'>
        <h1 className='text-dark mb-3 login-head'>OTP Verification</h1>
        </div>
        <div className='login-para mb-5'>
        An otp has been sent to your mobile number please verifiy it below
        </div>
        <div className='fv-row mb-15 otp-field mt-20'>
        <OtpInput
            value={otp}
            shouldAutoFocus
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props}/>}
        />
        </div>
        <div className='text-center'>
        <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-login  w-100 mb-5'
            disabled={loading}
            onClick={handleOtpSubmit}
        >
            {!loading && <span className='indicator-label'>Verify</span>}
            {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
            )}
        </button>
        <div className='d-flex justify-content-center mt-5'>
            <div className='d-flex flex-stack mb-2 mt-2'>
            <Link
                to={routeConfig.auth}
                className='link-primary fs-6 login-link'
                style={{ marginLeft: '5px' }}
            >
                Resend OTP
            </Link>
            </div>
        </div>
        </div>
    </form> : null }
    </>
  )
}

const mapStateToProps = state => {
  const { otpStore } = state
  return {
    otpData: otpStore && otpStore.otpData ? otpStore.otpData : {},
    loading: otpStore && otpStore.loading ? otpStore.loading : false
  }
}

const mapDispatchToProps = dispatch => ({
  OtpDispatch: (data) => dispatch(OtpActions.Otp(data)),
  clearOtp: () => dispatch(OtpActions.clearOtp())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTP)