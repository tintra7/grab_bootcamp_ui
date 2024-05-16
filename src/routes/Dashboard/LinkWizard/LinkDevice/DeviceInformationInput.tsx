import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Swal, { SweetAlertOptions } from 'sweetalert2'
import { loading, successAlert, errorAlert } from '@/utils/sweetAlert'

import AcUnitIcon from '@mui/icons-material/AcUnit'
import OpacityIcon from '@mui/icons-material/Opacity'
import SettingsIcon from '@mui/icons-material/Settings'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import WindPowerIcon from '@mui/icons-material/WindPower'

import { FANSPEED, BRAND, MODE } from '@/constants/enum'
import { LinkDeviceRequest } from '@/models/requests/DeviceRequest/linkDeviceRequest'

import linkNewDevice from '@/services/servicesDevice/linkNewDevice'

import '@/assets/css/components/LinkWizard/DeviceInformationInput.css'

const DeviceInformationInput: React.FC = () => {
  const navigate = useNavigate()
  const device = useRef<LinkDeviceRequest>({
    userId: 'empty',
    name: '',
    brand: BRAND.TOSHIBA,
    profile: {
      COOLING: {
        temp: 19,
        fan: FANSPEED.HIGH
      },
      DEFAULT: {
        temp: 24,
        fan: FANSPEED.MEDIUM
      },
      MOISTURING: {
        temp: 27,
        fan: FANSPEED.LOW
      }
    }
  })

  const onFanSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const profile = event.target.id as MODE

    device.current.profile[profile].fan = event.target.value as FANSPEED
  }

  const onTempChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const profile = event.target.id as MODE

    device.current.profile[profile].temp = parseInt(event.target.value)
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    device.current.name = event.target.value
  }

  const onBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    device.current.brand = event.target.value as BRAND
  }

  const onSubmit = async () => {
    if (device.current.name.trim() != '') {
      Swal.fire(loading)
      try {
        await linkNewDevice(device.current)
        Swal.fire(
          successAlert('Successfully linked new device !') as SweetAlertOptions
        )
        setTimeout(() => navigate('/devices'), 1000)
      } catch (error) {
        Swal.fire(errorAlert('Failed to link new device') as SweetAlertOptions)
      }
    } else {
      Swal.fire(errorAlert('Missing name !') as SweetAlertOptions)
    }
  }

  return (
    <div className='device-information-input'>
      <h1>Link New Device</h1>
      <span className='description'>
        Provide name and brand for new air conditioner
      </span>
      <div className='input-container'>
        <label>Device name</label>
        <input className='device-name' onChange={onNameChange}></input>
      </div>
      <div className='input-container'>
        <label>Brand</label>
        <select onChange={onBrandChange}>
          {Object.entries(BRAND).map(([key, brand]) => (
            <option key={key} value={key}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className='input-container profile'>
        <label>Profile</label>
        <div className='profile-label cooling'>
          <AcUnitIcon />
          <span className='profile-title'>COOLING</span>
        </div>
        <div className='profile-temp'>
          <input
            type='number'
            min={18}
            max={30}
            id='COOLING'
            defaultValue={device.current.profile.COOLING.temp}
            onChange={onTempChange}
          ></input>
          <div className='input-icon'>
            <DeviceThermostatIcon />
          </div>
        </div>
        <div className='profile-fanspeed'>
          <select
            id='COOLING'
            defaultValue={device.current.profile.COOLING.fan}
            onChange={onFanSpeedChange}
          >
            {Object.entries(FANSPEED).map(([key, fanspeed]) => (
              <option key={key} value={key}>
                {fanspeed}
              </option>
            ))}
          </select>
          <div className='input-icon'>
            <WindPowerIcon />
          </div>
        </div>
        <div className='profile-label default'>
          <SettingsIcon />
          <span className='profile-title'>DEFAULT</span>
        </div>
        <div className='profile-temp'>
          <input
            type='number'
            min={18}
            max={30}
            defaultValue={device.current.profile.DEFAULT.temp}
            onChange={onTempChange}
            id='DEFAULT'
          ></input>
          <div className='input-icon'>
            <DeviceThermostatIcon />
          </div>
        </div>
        <div className='profile-fanspeed'>
          <select
            id='DEFAULT'
            onChange={onFanSpeedChange}
            defaultValue={device.current.profile.DEFAULT.fan}
          >
            {Object.entries(FANSPEED).map(([key, fanspeed]) => (
              <option key={key} value={key}>
                {fanspeed}
              </option>
            ))}
          </select>
          <div className='input-icon'>
            <WindPowerIcon />
          </div>
        </div>
        <div className='profile-label moisturing'>
          <OpacityIcon />
          <span className='profile-title'>MOISTURING</span>
        </div>
        <div className='profile-temp'>
          <input
            type='number'
            min={18}
            max={30}
            defaultValue={device.current.profile.MOISTURING.temp}
            onChange={onTempChange}
            id='MOISTURING'
            className='cooling-temp'
          ></input>
          <div className='input-icon'>
            <DeviceThermostatIcon />
          </div>
        </div>
        <div className='profile-fanspeed'>
          <select
            id='MOISTURING'
            onChange={onFanSpeedChange}
            defaultValue={device.current.profile.MOISTURING.fan}
          >
            {Object.entries(FANSPEED).map(([key, fanspeed]) => (
              <option key={key} value={key}>
                {fanspeed}
              </option>
            ))}
          </select>
          <div className='input-icon'>
            <WindPowerIcon />
          </div>
        </div>
      </div>
      <div className='submit-button' onClick={onSubmit}>
        SUBMIT
      </div>
    </div>
  )
}
export default DeviceInformationInput
