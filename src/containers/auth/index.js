import React, { useEffect } from 'react'
import { useLocation, Route } from 'react-router-dom'
import ForgotPassword from '../../components/auth/ForgotPassword'
import { toAbsoluteUrl } from '../../theme/helpers'
import routeConfig from '../../routing/routeConfig'
import AdminLogin from '../../components/auth/AdminLogin'

export function AuthPage(props) {
  const query = useLocation().search

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  const GetComponent = () => {
    const pathName = useLocation().pathname
    if (pathName === routeConfig.forgotPassword) {
      return <ForgotPassword query={query} />
    } else if (pathName === routeConfig.auth) {
      return <AdminLogin />
    } else {
      window.location = '/'
    }
  }

  return (
    <>   
     <div className="d-flex flex-column flex-md-row flex-column-fluid">
        <div className="bg-cover col-md-6 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#153D58',
            height:'100vh'
          }}
        >
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/avatars/login.png')}
            className='w-75 pt-10'
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center vh-100">
            <div className='col-md-9 col-lg-8 col-xl-7 col-xxl-6'>
              <div className='text-center'>
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/avatars/logo.png')}
                  style={{width:'40%'}}
                  />
              </div>
            <div
              className='bg-white rounded mt-10'
            >
              {GetComponent()}
            </div>
            </div>
        </div>
      </div>
    </>
  )
}
