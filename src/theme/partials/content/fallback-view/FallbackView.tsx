import React from 'react'
import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen text-center'>
      <img src={toAbsoluteUrl('/media/avatars/logo-2.svg')} alt='Start logo' />
      <span>Loading ...</span>
    </div>
  )
}
