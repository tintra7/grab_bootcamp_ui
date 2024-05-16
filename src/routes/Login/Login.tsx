import { useRef } from 'react'

import '@/assets/css/components/Login.css'
import LoginFormImg from '@/assets/images/login-form-img.jpg'

import Swal, { SweetAlertOptions } from 'sweetalert2'
import { loading, successAlert } from '@/utils/sweetAlert.tsx'

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const logIn = () => {
    Swal.fire(loading)
    Swal.fire(successAlert('Log In OK') as SweetAlertOptions)
  }

  return (
    <div className='login-form-container'>
      <div className='login-form'>
        <div className='login-title'>SIGN IN</div>
        <div className='login-description'>Get access to your panel</div>
        <input placeholder='Email' className='form-input' ref={emailRef}></input>
        <input placeholder='Password' type='password' className='form-input' ref={passwordRef}></input>
        <button className='form-btn' onClick={logIn}>
          SUBMIT
        </button>
        <div className='project-copyright'>Copyright © 2023 | A/C Automatic System.</div>
      </div>
      <img className='login-form-img' src={LoginFormImg} />
    </div>
  )
}

export default Login
