import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../../components/auth/Login'
import { toAbsoluteUrl } from '../../theme/helpers'

export function LoginPage(props) {
  const query = useLocation().search
  const pathName = useLocation().pathname

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <>
      <div className="d-flex flex-column flex-lg-row flex-column-fluid"
      >
        <div className=" bg-cover d-flex flex-column flex-lg-row-fluid bgi-no-repeat bgi-position-x-center bgi-size-contain min-h-100px min-h-lg-350px"
          style={{
            // backgroundImage: `url(${toAbsoluteUrl(
            //   '/media/loginImage/login.png'
            // )})`
            backgroundColor: '#153D58'
          }}
        >
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/loginImage/login.png')}
            className='h-427px w-545px'
            style={{
              marginTop: '193px',
              marginLeft: '48px'
            }}
          />
        </div>
        <div className="d-flex flex-column flex-lg-row-auto positon-xl-relative bg-login"
        >
          {/* <div className="mt-6 ml-2 mb-10"> */}
          {/* <img
              alt='Logo'
              src={toAbsoluteUrl('/media/loginImage/MicrosoftTeams-image.png')}
              className='h-65px'
            /> */}
          {/* </div>  */}
          <div className="d-flex flex-column login-top ps-16">
            <a href='#' className='mb-4 '>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/avatars/logo.png')}
                className='h-65px'
                style={{
                  width: '67.23px',
                  height: "22.05px",
                  marginTop: '27px',
                  // marginLeft: "1332.91px"
                }}
              />
            </a>
            <div
              className='w-lg-500px bg-white rounded mt-10'
            >
              <Login />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
