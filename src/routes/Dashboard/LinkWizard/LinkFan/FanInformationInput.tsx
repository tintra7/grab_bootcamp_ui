import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Swal, { SweetAlertOptions } from 'sweetalert2'
import { loading, successAlert, errorAlert } from '@/utils/sweetAlert'

import { LinkFanRequest } from '@/models/requests/FanRequest/linkFanRequest'

import linkNewFan from '@/services/servicesFan/linkNewFan'

import '@/assets/css/components/LinkFanWizard/FanInformationInput.css'

const FanInformationInput: React.FC = () => {
    const navigate = useNavigate()
    const fan = useRef<LinkFanRequest>({
      userId: 'empty',
      name: '',
      
    })
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        fan.current.name = event.target.value
      }
    const onSubmit = async () => {
        if (fan.current.name.trim() != '') {
          Swal.fire(loading)
          try {
            await linkNewFan(fan.current)
            Swal.fire(
              successAlert('Successfully linked new fan !') as SweetAlertOptions
            )
            setTimeout(() => navigate('/fans'), 1000)
          } catch (error) {
            Swal.fire(errorAlert('Failed to link new fan') as SweetAlertOptions)
          }
        } else {
          Swal.fire(errorAlert('Missing name !') as SweetAlertOptions)
        }
      }
    return (
        <div className='fan-information-input'>
        <h1>Link New Device</h1>
        <span className='description'>
          Provide name for new fan
        </span>
        <div className='input-container'>
          <label>Device name</label>
          <input className='fan-name' onChange={onNameChange}></input>
        </div>
        <div className='submit-button' onClick={onSubmit}>
          SUBMIT
        </div>
      </div>
    )
}

export default FanInformationInput


