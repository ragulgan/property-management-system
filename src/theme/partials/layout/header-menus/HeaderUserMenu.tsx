/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unsetLocalStorage, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../../utils/helper';
import { SESSION } from '../../../../utils/constants'
import _ from 'lodash'
import { toAbsoluteUrl } from '../../../helpers';

const HeaderUserMenu: FC = () => {
  const dispatch = useDispatch();
  const logout = () => {
    removeLocalStorage(SESSION.TOKEN)
    setLocalStorage("logut",  "true")
    window.location.href = '/';
  };

  const [visibilityState, setVisibilityState] = useState('visible')
  const show = getLocalStorage("logut")

  useEffect(() => {
    setVisibilityState(document.visibilityState)
  }, [document.visibilityState])

  useEffect(() =>{
    if(visibilityState !== "visible"){
      unsetLocalStorage()
      window.location.href = '/';
    }
  },[visibilityState])


  useEffect(() => {
    window.onbeforeunload = function (event) {
      if (performance.navigation.type === 1) {
        return null; 
      }
      if(performance.navigation.type === 0){
        setLocalStorage("logut",  "true")
      }
    };
  }, []);
  
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-175px"
      data-kt-menu="true"
    >
      {/* <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={''} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              David
              <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
                Pro
              </span>
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              abc@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2" />

      <div className="menu-item px-5">
        <Link to={'/crafted/pages/profile'} className="menu-link px-5">
          My Profile
        </Link>
      </div>

      <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          <span className="menu-text">My Projects</span>
          <span className="menu-badge">
            <span className="badge badge-light-danger badge-circle fw-bolder fs-7">
              3
            </span>
          </span>
        </a>
      </div>

      <div
        className="menu-item px-5"
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="left-start"
        data-kt-menu-flip="bottom"
      >
        <a href="#" className="menu-link px-5">
          <span className="menu-title">My Subscription</span>
          <span className="menu-arrow" />
        </a>

        <div className="menu-sub menu-sub-dropdown w-175px py-4">
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Referrals
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Billing
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Payments
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link d-flex flex-stack px-5">
              Statements
              <i
                className="fas fa-exclamation-circle ms-2 fs-7"
                data-bs-toggle="tooltip"
                title="View your statements"
              />
            </a>
          </div>

          <div className="separator my-2" />

          <div className="menu-item px-3">
            <div className="menu-content px-3">
              <label className="form-check form-switch form-check-custom form-check-solid">
                <input
                  className="form-check-input w-30px h-20px"
                  type="checkbox"
                  value="1"
                  defaultChecked={true}
                  name="notifications"
                />
                <span className="form-check-label text-muted fs-7">
                  Notifications
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          My Statements
        </a>
      </div>

      <div className="separator my-2" />

      <div className="menu-item px-5 my-1">
        <Link to="/crafted/account/settings" className="menu-link px-5">
          Account Settings
        </Link>
      </div> */}
      <div className="menu-item">
        <Link to='/settings' className="menu-link px-5">
          <img src={toAbsoluteUrl('/media/avatars/menubar/setting.svg')} width='18' height='18' alt="Setting" className='mr-3'/>
          Setting
        </Link>
        <a onClick={logout} className="menu-link px-5">
        <img src={toAbsoluteUrl('/media/avatars/menubar/logOut.svg')} width='20' height='20' alt="Setting" className='mr-3'/>
          Log Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
