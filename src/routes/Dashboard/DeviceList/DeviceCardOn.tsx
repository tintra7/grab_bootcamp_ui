import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import Grid from '@mui/material/Grid'

import AcUnitIcon from '@mui/icons-material/AcUnit'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import EditIcon from '@mui/icons-material/Edit'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import WindPowerIcon from '@mui/icons-material/WindPower'

import ACOn from '@/assets/images/air-conditioner_on.png'
import { FANSPEED, MODE, STATUS } from '@/constants/enum'
import { IDevice } from '@/models/entities/deviceModel'
import SendSignalRequest from '@/models/requests/DeviceRequest/sendSignalRequest'
import getSensor from '@/services/servicesDevice/getSensor'
import getStats from '@/services/servicesDevice/getStats'
import sendSignal from '@/services/servicesDevice/sendSignal'
import { warningAlert } from '@/utils/sweetAlert'
import Brand from './Brand'
import ModeButtonGroup from './ModeButtonGroup'
import PowerButtonGroup from './PowerButtonGroup'

import '@/assets/css/components/DeviceList/DeviceCard.css'

interface DeviceCardProp {
  device: IDevice
  updateDeviceList: (device: IDevice) => void
}

const DeviceCardOn = ({
  device,
  updateDeviceList
}: DeviceCardProp): JSX.Element => {
  const sensorId = useSelector((state: any) => state.room.sensorId)
  const tempControl = useRef<HTMLInputElement>(null)

  const [fan, setFan] = useState<FANSPEED>(device.fan)
  const [temp, setTemp] = useState<number>(device.temp)
  const [envTemp, setEnvTemp] = useState<number>(28)
  const [humidity, setHumidity] = useState<number>(50)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(true)
      sensorId &&
        getSensor(sensorId).then((stats) => {
          if (stats.temp >= 32) {
            setEnvTemp(stats.temp)
            setHumidity(stats.humidity)
            Swal.fire(
              warningAlert(
                `High Temperature on device ${device.name}`
              ) as SweetAlertOptions
            )
          } else {
            setEnvTemp(stats.temp)
            setHumidity(stats.humidity)
            setIsLoading(false)
          }
        })
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [sensorId])

  const craftSendSignalRequest = (optionalPara: {
    status?: STATUS
    temp?: number
    profile?: MODE
    fan?: FANSPEED
  }): SendSignalRequest => {
    return {
      deviceId: device._id,
      status: optionalPara.status || STATUS.ON,
      profile: optionalPara.profile || device.currentProfile,
      temp: optionalPara.temp || device.temp,
      fan: optionalPara.fan || device.fan
    }
  }

  const onClickOff = async () => {
    try {
      setIsLoading(true)
      updateDeviceList({ ...device, status: STATUS.OFF })

      await sendSignal(craftSendSignalRequest({ status: STATUS.OFF }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const debounceTempControl = debounce(() => onTempControlChange(), 500)

  const onTempControlChange = async () => {
    setIsLoading(true)
    const newTemp: number = Number(tempControl.current!.value)
    setTemp(newTemp)

    try {
      await sendSignal(craftSendSignalRequest({ temp: newTemp }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onFanChange = async (fan: FANSPEED) => {
    setIsLoading(true)
    setFan(fan)
    try {
      await sendSignal(craftSendSignalRequest({ fan: fan }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onModeChange = async (mode: MODE) => {
    setIsLoading(true)
    setFan(device.profile[mode].fan)
    setTemp(device.profile[mode].temp)
    tempControl.current!.value = device.profile[mode].temp.toString()

    try {
      await sendSignal(
        craftSendSignalRequest({
          profile: mode,
          temp: device.profile[mode].temp,
          fan: device.profile[mode].fan
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='device-card on'>
      <div className='card-header'>
        <Brand brandName={device.brand || ''} />

        <div className='status-card'>
          {isLoading == true ? (
            <div className='spinner-container'>
              <div className='loading-spinner'></div>
            </div>
          ) : (
            device.status
          )}
        </div>
        <div className='device-name-container'>
          <div className='device-name'>{device.name}</div>
          <EditIcon className='edit-icon' />
        </div>
      </div>
      <div className='card-body'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className='ac-img-container'>
              <img src={ACOn} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='fan-controler-container'>
              <WindPowerIcon className='stat-icon fan' />
              <div
                className={`fan-speed ${fan == FANSPEED.HIGH ? 'current' : ''}`}
                onClick={() => onFanChange(FANSPEED.HIGH)}
              >
                HIGH
              </div>
              <div
                className={`fan-speed ${
                  fan == FANSPEED.MEDIUM ? 'current' : ''
                }`}
                onClick={() => onFanChange(FANSPEED.MEDIUM)}
              >
                MED
              </div>
              <div
                className={`fan-speed ${fan == FANSPEED.LOW ? 'current' : ''}`}
                onClick={() => onFanChange(FANSPEED.LOW)}
              >
                LOW
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='stats-container'>
              <div className='stat'>
                <WaterDropIcon className='stat-icon humidity' />
                <span>{humidity == -1 ? '--' : humidity}%</span>
              </div>
              <div className='stat'>
                <DeviceThermostatIcon className='stat-icon temp' />
                <span>{envTemp == -1 ? '--' : Math.floor(envTemp)}°C</span>
              </div>
              <hr className='stat-divider'></hr>
              <div className='stat'>
                <AcUnitIcon className='stat-icon humidity' />
                <span>{temp}°C</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className='slide-bar-container'>
        <AcUnitIcon className='stat-icon humidity' />
        <input
          id='temperature-bar'
          type='range'
          min='18'
          max='30'
          step='1'
          ref={tempControl}
          defaultValue={temp}
          onChange={debounceTempControl}
        />
        <AcUnitIcon className='stat-icon temp' />
      </div>
      <div className='card-footer'>
        <div className='card-button-group'>
          <ModeButtonGroup
            mode={device.currentProfile}
            status={device.status}
            onModeChange={onModeChange}
          />
          <PowerButtonGroup status={device.status} onClick={onClickOff} />
        </div>
      </div>
    </div>
  )
}

export default DeviceCardOn
