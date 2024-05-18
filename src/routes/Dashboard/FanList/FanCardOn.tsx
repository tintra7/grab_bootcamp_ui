import { useRef, useState, useEffect } from 'react'
// import debounce from 'lodash/debounce'

import EditIcon from '@mui/icons-material/Edit'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import FanPowerButtonGroup from '../FanList/FanPowerButtonGroup'

import FanON from '@/assets/images/fan-on.png'
import '@/assets/css/components/FanList/FanCard.css'

import getFanStats from '@/services/servicesFan/getFanStats'
import sendFanSignal from '@/services/servicesFan/sendFanSignal'
import sendFanSpeedSignal from '@/services/servicesFan/sendFanSpeedSignal'

import { FANLIGHT, FANSPEEDFORFAN, FANSWING, STATUS } from '@/constants/enum'
import { IFan } from '@/models/entities/fanModel'

import Swal, { SweetAlertOptions } from 'sweetalert2'
import { warningAlert } from '@/utils/sweetAlert'

import SendFanSignalRequest from '@/models/requests/FanRequest/sendFanSignalRequest'
import FanIncreaseButtonGroup from './FanIncreaseButtonGroup'
import SendFanSpeedSignalRequest from '@/models/requests/FanRequest/sendFanSpeedSignalRequest'


interface FanCardProp {
  fan: IFan
  updateFanList: (fan: IFan) => void
}

const FanCardOn = ({ 
    fan, 
    updateFanList 
}: FanCardProp): JSX.Element => {
  const [fanSpeed, setFanSpeed] = useState<FANSPEEDFORFAN>(fan.fanSpeed)
  const [light, setLight] = useState<FANLIGHT>(fan.light)
  const [swing, setSwing] = useState<FANSWING>(fan.swing)
  const [envTemp, setEnvTemp] = useState<number>(fan.envTemp)
  const [humidity, setHumidity] = useState<number>(fan.humidity)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(true)
      getFanStats(fan._id).then((stats) => {
        if (stats.temp >= 32) {
          setEnvTemp(stats.temp)
          setHumidity(stats.humidity)
          Swal.fire(
            warningAlert(
              `High Temperature on fan ${fan.name}`
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
  }, [fan._id, fan.name])
  const craftSendFanSignalRequest = (optionalPara: {
    status?: STATUS
    fanspeed?: FANSPEEDFORFAN
    light?: FANLIGHT
    swing?: FANSWING
  }): SendFanSignalRequest => {
    return {
      fanId: fan._id,
      userId: 'test',
      status: optionalPara.status || STATUS.ON,
      fanSpeed: optionalPara.fanspeed || fan.fanSpeed,
      light: optionalPara.light || fan.light,
      swing: optionalPara.swing || fan.swing
    }
  }

  const craftSendFanSpeedSignalRequest = (optionalPara: {
    status?: STATUS
    fanspeed?: FANSPEEDFORFAN
    // light?: FANLIGHT
    // swing?: FANSWING
  }): SendFanSpeedSignalRequest => {
    return {
      fanId: fan._id,
      userId: 'test',
      // status: optionalPara.status || STATUS.ON,
      fanSpeed: optionalPara.fanspeed || fan.fanSpeed
      // light: optionalPara.light || fan.light,
      // swing: optionalPara.swing || fan.swing
    }
  }

  const onClickOff = async () => {
    try {
      setIsLoading(true)
      updateFanList({ ...fan, status: STATUS.OFF })

      await sendFanSignal(craftSendFanSignalRequest({ status: STATUS.OFF }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onClickFanSpeedIncreaseControlChange = async () => {
    try {
      setIsLoading(true)
      updateFanList({ ...fan, fanSpeed: FANSPEEDFORFAN.INCREASE })

      await sendFanSpeedSignal(craftSendFanSpeedSignalRequest({ fanspeed: FANSPEEDFORFAN.INCREASE }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // const onFanSpeedControlChange = async (fanSpeed: FANSPEEDFORFAN) => {
  //   setIsLoading(true)
  //   setFanSpeed(fanSpeed)
  //   try {
  //     await sendFanSignal(craftSendFanSignalRequest({ fanspeed: fanSpeed }))
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const onFanLightControlChange = async (light: FANLIGHT) => {
    setIsLoading(true)
    setLight(light)
    try {
      await sendFanSignal(craftSendFanSignalRequest({ light: light }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onFanSwingControlChange = async (swing: FANSWING) => {
    setIsLoading(true)
    setSwing(swing)
    try {
      await sendFanSignal(craftSendFanSignalRequest({ swing: swing }))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='fan-card on'>
      <div className='card-header'>
        <div className='status-card'>
          {isLoading == true ? (
            <div className='spinner-container'>
              <div className='loading-spinner'></div>
            </div>
          ) : (
            fan.status
          )}
        </div>
        <div className='fan-name-container'>
          <div className='fan-name'>{fan.name}</div>
          <EditIcon className='edit-icon' />
        </div>
      </div>
      <div className='card-body'>
        <div className='ac-img-container'>
          <img src={FanON} />
        </div>
        <div className='stats-container'>
          <div className='stat'>
            <WaterDropIcon className='stat-icon humidity' />
            <span>{humidity == -1 ? '--' : humidity}%</span>
          </div>
          <div className='stat'>
            <DeviceThermostatIcon className='stat-icon temp' />
            <span>{envTemp == -1 ? '--' : Math.floor(envTemp)}°C</span>
          </div>
        </div>
      </div>
      <div className='card-footer'>
          <FanIncreaseButtonGroup fanSpeed={fan.fanSpeed} onClick={onClickFanSpeedIncreaseControlChange}/>
          <FanPowerButtonGroup status={fan.status} onClick={onClickOff}/>
      </div>
    </div>
  )
}

export default FanCardOn
