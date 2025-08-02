import clsx from 'clsx'
import React, {FC} from 'react'
import { Link } from 'react-router-dom'
import {KTSVG} from '../../../helpers'
import {useLayout, usePageData} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const {pageTitle} = usePageData()

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />
        {pageTitle === 'Chargeback Management' && (
          <div className='d-flex align-items-center py-1'>
            <div
              className='card-toolbar me-3'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              data-bs-trigger='hover'
              title='Click to add a single chargeback'
            >
              <Link
                to='/chargeback-management/add-chargeback'
                className='btn btn-sm btn-light-primary'
              >
                <KTSVG path='/media/icons/duotune/arrows/arr087.svg' />Add Chargeback
              </Link>
            </div>
            <div
              className='card-toolbar'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              data-bs-trigger='hover'
              title='Click to add a  multiple chargeback'
            >
              <Link
                to='/chargeback-management/upload-chargeback'
                className='btn btn-sm btn-light-primary'
              >
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' />Upload Chargebacks
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export {Toolbar1}
