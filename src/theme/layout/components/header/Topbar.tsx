import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderThemesMenu, HeaderUserMenu} from '../../../partials'
import { useLayout } from '../../core'
import { connect } from 'react-redux'
import { ProfileGetIdActions } from '../../../../store/actions'
import {PROFILE_URL} from '../../../../utils/constants'
import _ from 'lodash'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

interface confirmationProps {
  getprofileDispatch: any,
  ProfileDetail:any
}

const Topbar: React.FC<confirmationProps> = (props) => {
  const {
    getprofileDispatch,
    ProfileDetail,
  } = props
  const { config } = useLayout()
  const id = localStorage.getItem('UserId')

  React.useEffect(() => {
    getprofileDispatch(id)
  }, [])  

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* NOTIFICATIONS */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu- wrapper */}
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <i className="bi bi-bell fs-1 pt-2"></i>
          {/* <KTSVG
            path='/media/icons/duotune/general/gen022.svg'
            className={toolbarButtonIconSizeClass}
          /> */}
        </div>
        <HeaderNotificationsMenu />
        {/* end::Menu wrapper */}
      </div>

      {/* THEMES */}
      {/*<div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu- wrapper */}
        {/*<div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG
            path='/media/icons/duotune/coding/cod001.svg'
            className={toolbarButtonIconSizeClass}
          />
        </div>
        <HeaderThemesMenu />
        {/* end::Menu wrapper */}
      {/*</div>

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol d-flex align-items-center', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          {ProfileDetail && ProfileDetail.data && !_.isEmpty(ProfileDetail.data.image[0])  ?
            <img src={`${PROFILE_URL}${ProfileDetail.data.image[0].filePath}`} alt='metronic' className='rounded-circle p-1' /> : 
            <img src={toAbsoluteUrl('/media/avatars/150-2.jpg')} alt='metronic' className='rounded-circle p-1'/>}
          <div className='ml-3'>
            <h1 className='user-info-name'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.name ? ProfileDetail.data.name : 'James Wiiliams'}</h1>
            <h1 className='user-info-position mb-0'>{ProfileDetail && ProfileDetail.data && ProfileDetail.data.role && ProfileDetail.data.role.roleName ? ProfileDetail.data.role.roleName : 'Co-ordinator'}</h1>
          </div>
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (profile : any) => {
  const { editProfileStore } = profile;
  return {
    ProfileDetail: editProfileStore && editProfileStore.ProfileIdDetail ? editProfileStore.ProfileIdDetail : '',
  };
};

const mapDispatchToProps = (dispatch:any) => ({
  getprofileDispatch: (id :any) =>
    dispatch(ProfileGetIdActions.getProfileIdDetails(id)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)
 