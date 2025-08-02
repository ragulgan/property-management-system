import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { PROFILE_URL } from '../../../utils/constants'
import dayjs from 'dayjs';


function AddMyProfile(props) {
  const {
    ProfileDetail
  } = props

  return (
    <>
      <div className='form-group row mb-4'>
        <div className='col-lg-4 mt-5'>
          <label className='fw-bolder fs-6 text-gray-800 mb-1'>
            Manage Your Profile
          </label>
          <div>
            <label class="fs-6 text-muted">Personalize your account settings and information</label>
          </div>
          <div className='mt-5'>
            <label className='form-label'>
              Full Name
            </label>
            <div className='w-100 mb-5'>
              <div className='fv-plugins-message-container text-muted mb-4'>
                <span role='alert text-muted'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.name ? ProfileDetail.data.name : '--'}</span>
              </div>
            </div>
            <label className='form-label'>
              Email ID
            </label>
            <div className='w-100 mb-5'>
              <div className='fv-plugins-message-container text-muted mb-4'>
                <span role='alert text-muted'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.emailId ? ProfileDetail.data.emailId : '--'}</span>
              </div>
            </div>
            <label className='form-label'>
              Phone Number
            </label>
            <div className='w-100 mb-5'>
              <div className='fv-plugins-message-container text-muted mb-4'>
                <span role='alert text-muted'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.mobileNumber ? ProfileDetail.data.mobileNumber : '--'}</span>
              </div>
            </div>
            <label className='form-label'>
              D.O.B
            </label>
            <div className='w-100 mb-5'>
              <div className='fv-plugins-message-container text-muted mb4'>
                <span role='alert text-muted'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.dob ? dayjs(ProfileDetail.data.dob).format('DD-MMM-YYYY') : '--'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 my-5 text-center'>
          <div className='rounded mx-auto mt-5'>
            <label className='font-size-xs font-weight-light mb-4 form-label w-100 mt-5'>
              Profile Picture
            </label>
            <img src={`${PROFILE_URL}${ProfileDetail && ProfileDetail.data && ProfileDetail.data.image[0].filePath}`} width='197' height='197' alt='metronic' className='p-3 rounded-5 profile-border' />
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { editProfileStore } = state;
  return {
    ProfileDetail: editProfileStore && editProfileStore.ProfileIdDetail ? editProfileStore.ProfileIdDetail : '',
  }
}

export default connect(
  mapStateToProps
)(AddMyProfile)