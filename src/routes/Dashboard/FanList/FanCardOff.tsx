import Swal from 'sweetalert2'

import Grid from '@mui/material/Grid'

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import EditIcon from '@mui/icons-material/Edit'
import WaterDropIcon from '@mui/icons-material/WaterDrop'

import FanOFF from '@/assets/images/fan-off.png'
import { FANLIGHT, FANSPEEDFORFAN, FANSWING, STATUS } from '@/constants/enum'
import { IFan } from '@/models/entities/fanModel'
import sendFanSignal from '@/services/servicesFan/sendFanSignal'
import setFan from '@/services/servicesFan/setFan'
import { loading } from '@/utils/sweetAlert'
import FanPowerButtonGroup from '../FanList/FanPowerButtonGroup'

interface FanCardProp {
  fan: IFan
  updateFanList: (fan: IFan) => void
}

const FanCardOff = ({ fan, updateFanList }: FanCardProp): JSX.Element => {
  const onClickOn = async () => {
    try {
      Swal.fire(loading)
      await setFan({ fanId: fan._id, userId: 'test' })

      console.log(fan)
      await sendFanSignal({
        fanId: fan._id,
        userId: 'test',
        status: STATUS.ON,
        fanSpeed: FANSPEEDFORFAN.NONE,
        light: FANLIGHT.OFF,
        swing: FANSWING.OFF
      })

      updateFanList({
        ...fan,
        status: STATUS.ON,
        fanSpeed: FANSPEEDFORFAN.NONE,
        light: FANLIGHT.OFF,
        swing: FANSWING.OFF
      })

      Swal.close()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='device-card off'>
      <div className='card-header'>
        <div className='status-card'>{fan.status}</div>
        <div className='device-name-container'>
          <div className='device-name'>{fan.name}</div>
          <EditIcon className='edit-icon' />
        </div>
      </div>
      <div className='card-body'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className='ac-img-container'>
              <img src={FanOFF} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='stats-container disable'>
              <div className='stat'>
                <WaterDropIcon className='stat-icon humidity' />
                <span>--</span>
              </div>
              <div className='stat'>
                <DeviceThermostatIcon className='stat-icon temp' />
                <span>--</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className='card-footer'>
        <FanPowerButtonGroup status={fan.status} onClick={onClickOn} />
      </div>
    </div>
  )
}

export default FanCardOff
