import { useEffect, useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import { STATUS } from '@/constants/enum'
import { IDevice } from '@/models/entities/deviceModel'
import getDeviceList from '@/services/servicesDevice/getDeviceList'
import { errorAlert, loading } from '@/utils/sweetAlert'
import DeviceCardOff from './DeviceCardOff'
import DeviceCardOn from './DeviceCardOn'

import '@/assets/css/components/DeviceList/DeviceList.css'
import Grid from '@mui/material/Grid'

const DeviceList: React.FC = () => {
  const [deviceList, setDeviceList] = useState<IDevice[]>([])

  const updateDeviceList = (device: IDevice) => {
    const newDeviceList = deviceList.map((d) => {
      if (d._id == device._id) return device
      else return d
    })

    setDeviceList(newDeviceList)
  }

  useEffect(() => {
    Swal.fire(loading)
    getDeviceList()
      .then((devices) => {
        Swal.close()
        setDeviceList(devices)
      })
      .catch(() =>
        Swal.fire(
          errorAlert('Failed to get device list !') as SweetAlertOptions
        )
      )
  }, [])

  return (
    <div className='devices-container'>
      <Grid container spacing={2}>
        {deviceList.map((device) => (
          <Grid item xs={12} sm={4}>
            {device.status == STATUS.ON ? (
              <DeviceCardOn
                key={device._id}
                device={device}
                updateDeviceList={updateDeviceList}
              />
            ) : (
              <DeviceCardOff
                key={device._id}
                device={device}
                updateDeviceList={updateDeviceList}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default DeviceList
