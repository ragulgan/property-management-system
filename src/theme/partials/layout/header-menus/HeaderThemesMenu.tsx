/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl, defaultAlerts} from '../../../helpers'
import { IThemeMode, LayoutContext, useLayout } from '../../../layout/core'

const HeaderThemesMenu: FC = () => {
  const {config} = useLayout()
  const [thememode, setThememode] = useState<IThemeMode>()
  const useLayoutData = () => {
    return useContext(LayoutContext)
  }
  const {setLayout} = useLayoutData()  
  useEffect(() => {
    if (thememode) {
      let layout: any = config
      layout.aside.theme = thememode
      setLayout(layout)
    }
  }, [thememode])
  const onModeChange = (item: any) => {
    setThememode(item.description)
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      <div
        className='d-flex flex-column bgi-no-repeat rounded-top'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-4.jpg')}')`}}
      >
        <h3 className='text-white fw-bold px-9 mt-10 mb-6'>
        Modes
        </h3>
      </div>
  
      <div className='tab-content'>
        <div className='tab-pane fade show active' id='kt_topbar_notifications_2' role='tabpanel'>
          <div className='d-flex flex-column px-9'>
            {defaultAlerts.map((alert, index) => (
              <div 
                key={`alert${index}`} 
                className='d-flex flex-stack py-4'
                onClick={() => onModeChange(alert)}
              >
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-35px me-4'>
                    <span className={clsx('symbol-label', `bg-light-${alert.state}`)}>
                      {' '}
                      <i className={`bi bi-droplet-half text-${alert.state}`}></i>
                    </span>
                  </div>
  
                  <div className='mb-0 me-2'>
                    <a href='#' className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
                      {alert.title}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export {HeaderThemesMenu}
