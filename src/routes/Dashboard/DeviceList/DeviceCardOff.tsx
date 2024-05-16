import Brand from './Brand'
import ModeButtonGroup from './ModeButtonGroup'
import PowerButtonGroup from './PowerButtonGroup'
import EditIcon from '@mui/icons-material/Edit'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import WindPowerIcon from '@mui/icons-material/WindPower'

import ACOff from '@/assets/images/air-conditioner_off.png'
import '@/assets/css/components/DeviceList/DeviceCard.css'

import setDevice from '@/services/servicesDevice/setDevice'
import sendSignal from '@/services/servicesDevice/sendSignal'

import { IDevice } from '@/models/entities/deviceModel'
import { STATUS, MODE } from '@/constants/enum'

import Swal from 'sweetalert2'
import { loading } from '@/utils/sweetAlert'

interface DeviceCardProp {
  device: IDevice
  updateDeviceList: (device: IDevice) => void
}

const DeviceCardOff = ({
  device,
  updateDeviceList
}: DeviceCardProp): JSX.Element => {
  const onClickOn = async () => {
    try {
      Swal.fire(loading)
      await setDevice({ deviceId: device._id, userId: 'test' })

      console.log(device)
      await sendSignal({
        deviceId: device._id,
        userId: 'test',
        status: STATUS.ON,
        profile: MODE.DEFAULT,
        temp: device.profile.DEFAULT.temp,
        fan: device.profile.DEFAULT.fan
      })

      updateDeviceList({
        ...device,
        status: STATUS.ON,
        currentProfile: MODE.DEFAULT,
        temp: device.profile.DEFAULT.temp,
        fan: device.profile.DEFAULT.fan
      })

      Swal.close()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='device-card off'>
      <div className='card-header'>
        <Brand brandName={device.brand} />
        <div className='status-card'>{device.status}</div>
        <div className='device-name-container'>
          <div className='device-name'>{device.name}</div>
          <EditIcon className='edit-icon' />
        </div>
      </div>
      <div className='card-body'>
        <div className='ac-img-container'>
          <img src={ACOff} />
        </div>
        <div className='fan-controler-container disable'>
          <WindPowerIcon className='stat-icon fan' />
          <div className='fan-speed'>HIGH</div>
          <div className='fan-speed'>MED</div>
          <div className='fan-speed'>LOW</div>
        </div>
        <div className='stats-container disable'>
          <div className='stat'>
            <WaterDropIcon className='stat-icon humidity' />
            <span>--</span>
          </div>
          <div className='stat'>
            <DeviceThermostatIcon className='stat-icon temp' />
            <span>--</span>
          </div>
          <hr className='stat-divider'></hr>
          <div className='stat'>
            <AcUnitIcon className='stat-icon humidity' />
            <span>--</span>
          </div>
        </div>
      </div>
      <div className={'slide-bar-container disable'}>
        <AcUnitIcon className='stat-icon temp' />
        <input
          disabled={true}
          id='temperature-bar'
          type='range'
          min='18'
          max='30'
          step='1'
        />
        <AcUnitIcon className='stat-icon humidity' />
      </div>
      <div className='card-footer'>
        <div className='card-button-group'>
          <ModeButtonGroup
            mode={device.currentProfile}
            status={device.status}
            onModeChange={() => {}}
          />
          <PowerButtonGroup status={device.status} onClick={onClickOn} />
        </div>
      </div>
    </div>
  )
}

export default DeviceCardOff
