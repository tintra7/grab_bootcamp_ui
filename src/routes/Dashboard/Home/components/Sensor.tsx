import { useEffect, useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import { Grid, styled, Typography, useMediaQuery } from '@mui/material/'
import Divider from '@mui/material/Divider'

import { ThermostatOutlined, WaterDropOutlined } from '@mui/icons-material'

import { colors } from '@/libs/ui'
import theme from '@/libs/ui/theme'
import getSensor from '@/services/servicesDevice/getSensor'
import { errorAlert } from '@/utils/sweetAlert'

const StyleSensorSectionSm = styled('div')(({ theme }) => ({
  background: colors.white,
  padding: '1rem',
  borderRadius: '1rem',
  display: 'flex',
  justifyContent: 'center',
  height: 'calc(100% - 2rem)',
  [theme.breakpoints.down('sm')]: {
    height: 'auto'
  }
}))

export default function Sensor({ roomData }: any) {
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))

  const [sensorData, setSensorData] = useState<any>({})

  useEffect(() => {
    // interval to get sensor data every 5 seconds
    const interval = setInterval(() => {
      roomData.sensorId &&
        getSensor(roomData.sensorId)
          .then((sensor) => {
            setSensorData(sensor)
          })
          .catch(() =>
            Swal.fire(
              errorAlert('Failed to get sensor data !') as SweetAlertOptions
            )
          )
    }, 5000)

    return () => clearInterval(interval)
  }, [roomData])

  return (
    <StyleSensorSectionSm>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={5} sm={12}>
          <div className='sensor-temp'>
            <Typography variant='subtitle1' fontWeight={600}>
              Temperature
            </Typography>
            <div className='sensor-text'>
              <ThermostatOutlined />
              <Typography variant='h4' fontWeight={600}>
                {sensorData.temp ? sensorData.temp.toFixed(1) : 28}°C
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} sm={12}>
          <Divider orientation={hidden ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid item xs={5} sm={12}>
          <div className='sensor-temp'>
            <Typography variant='subtitle1' fontWeight={600}>
              Humidity
            </Typography>
            <div className='sensor-text'>
              <WaterDropOutlined />
              <Typography variant='h4' fontWeight={600}>
                {sensorData.humidity ? sensorData.humidity.toFixed(1) : 50}%
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </StyleSensorSectionSm>
  )
}
