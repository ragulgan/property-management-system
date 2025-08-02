/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { KTSVG } from '../../../helpers';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';
import { SESSION } from '../../../../utils/constants'
import { getLocalStorage } from '../../../../utils/helper'

export function AsideMenuMain() {
  const Roles = JSON.parse(localStorage.getItem('roles')!)
  const Role_type = getLocalStorage(SESSION.ROLE)

  return (
    <>
      {Roles && Roles.dashboard && Roles.dashboard.visible ?
      <AsideMenuItem
        to="/dashboard"
        title="Dashboard"
        fontIcon="bi-archive"
        icon="/media/avatars/asideMenu/dash001.svg"
        /> : null}
      {Roles && Roles.user && Roles.user.visible ?
       <AsideMenuItem
        to="/users-management"
        title="User"
        fontIcon="bi-archive"
        icon="/media/avatars/asideMenu/dash002.svg"
        /> : null}
      <AsideMenuItemWithSub
        to='#'
        icon='/media/avatars/asideMenu/dash007.svg'
        title='Apartments'
        fontIcon='bi-layers'
      >
          <AsideMenuItem
            to="/apartments"
            title="Apartments"
            fontIcon="bi-archive"
            icon="/media/icons/duotune/general/gen011.svg"
          />
          <AsideMenuItem
            to='/apartmentadmin'
            title="Apartment Admin"
            fontIcon="bi-archive"
            icon="/media/icons/duotune/general/gen015.svg"
          />
          <AsideMenuItem
            to='/flats'
            title="Flats"
            fontIcon="bi-archive"
            icon="/media/icons/duotune/general/gen015.svg"
          />
          <AsideMenuItem
            to='/flatOwnerList'
            title="Flats Owners"
            fontIcon="bi-archive"
            icon="/media/icons/duotune/general/gen015.svg"
          />
          <AsideMenuItem
            to='/Tenants'
            title="Tenants"
            fontIcon="bi-archive"
            icon="/media/avatars/asideMenu/dash009.svg"
          />
      </AsideMenuItemWithSub>
      {Roles && Roles.transactions && Roles.transactions.visible ?
      <AsideMenuItem
        to="/transaction"
        title="Transactions"
        fontIcon="bi-archive"
        icon="/media/avatars/asideMenu/dash001.svg"
        />: null}
      {Roles && Roles.payments && Roles.payments.visible ?
      <AsideMenuItem
        to="/payments"
        title="Payments"
        fontIcon="bi-archive"
        icon="/media/avatars/asideMenu/dash001.svg"
      />: null}

      {Roles && Roles.myProperty && Roles.myProperty.visible || Roles && Roles.transactions && Roles.transactions.visible ?
      <AsideMenuItemWithSub
        to='#'
        icon='/media/avatars/asideMenu/dash008.svg'
        title='Property'
        fontIcon='bi-layers'
        >
          {Roles && Roles.myProperty && Roles.myProperty.visible ?
            <AsideMenuItem
              to="/properties"
              title="Property"
              fontIcon="bi-archive"
              icon="/media/avatars/asideMenu/dash005.svg"
            /> : null}
            {Roles && Roles.landlords && Roles.landlords.visible ?
            <AsideMenuItem
              to="/land-lords"
              title="Property Owners"
              fontIcon="bi-archive"
              icon="/media/avatars/asideMenu/dash003.svg"
            />: null}
            {Roles && Roles.leases && Roles.leases.visible ?
            <AsideMenuItem
              to="/leases"
              title="Lease in"
              fontIcon="bi-archive"
              icon="/media/avatars/asideMenu/dash005.svg"
            />: null} 
            <AsideMenuItem
              to="#"
              title="Lease out"
              fontIcon="bi-archive"
              icon="/media/avatars/asideMenu/dash005.svg"
            />
            <AsideMenuItem
              to="#"
              title="Lessees Details"
              fontIcon="bi-archive"
              icon="/media/avatars/asideMenu/dash005.svg"
            />
          {/* {Roles && Roles.transactions && Roles.transactions.visible ?
            <AsideMenuItem
              to="/transaction"
              title="Transactions"
              fontIcon="bi-archive"
              icon="/media/icons/duotune/general/gen015.svg"
            /> : null} */}
        </AsideMenuItemWithSub> : null}
      {Roles && Roles.leases && Roles.leases.visible || Roles && Roles.payments && Roles.payments.visible ?
        <AsideMenuItemWithSub
          to='#'
          icon='/media/avatars/asideMenu/dash003.svg'
          title='Maintenance'
          fontIcon='bi-layers'
        >
          {Roles && Roles.leases && Roles.leases.visible ?
            <AsideMenuItem
              to="/Request"
              title="Maintenance Request"
              fontIcon="bi-archive"
              icon="/media/icons/duotune/general/gen011.svg"
            /> : null} 
          {Roles && Roles.payments && Roles.payments.visible ?
            <AsideMenuItem
              to="#"
              title="Maintenance Staff"
              fontIcon="bi-archive"
              icon="/media/icons/duotune/general/gen015.svg"
            /> : null}
        </AsideMenuItemWithSub> : null}
       {/* <AsideMenuItem
        to="/Tenants"
        title="Tenants"
        fontIcon="bi-archive"
        icon="/media/avatars/asideMenu/dash009.svg"
      />  */}
      {Role_type === 'superadmin' ?
        <AsideMenuItem
          to="/settings"
          title="Settings"
          fontIcon="bi-archive"
          icon="/media/avatars/asideMenu/dash006.svg"
        /> : null}
    </>
  );
}
