import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

import {
  AcUnitOutlined,
  AddOutlined,
  AirOutlined,
  AutoModeOutlined,
  RemoveOutlined,
  ThermostatOutlined,
  WaterDropOutlined,
  WbSunnyRounded
} from '@mui/icons-material'

import SunnyWeather from '@/assets/images/sunny.svg'
import { colors } from '@/libs/ui'
import { IDevice } from '@/models/entities/deviceModel'
import getDeviceList from '@/services/servicesDevice/getDeviceList'
import getRoom from '@/services/servicesDevice/getRoom'
import getSensor from '@/services/servicesDevice/getSensor'
import { errorAlert, loading } from '@/utils/sweetAlert'

import '@/assets/css/components/Home.css'

const Home: React.FC = () => {
  const room = useSelector((state: any) => state.room._id)

  const [deviceList, setDeviceList] = useState<IDevice[]>([])
  const [roomData, setRoomData] = useState<any>({})
  const [sensorData, setSensorData] = useState<any>({})
  const [selectedDevice, setSelectedDevice] = useState<any>({})

  useEffect(() => {
    Swal.fire(loading)
    getDeviceList(room)
      .then((devices) => {
        Swal.close()
        setDeviceList(devices)
        setSelectedDevice(devices[0])
      })
      .catch(() =>
        Swal.fire(
          errorAlert('Failed to get device list !') as SweetAlertOptions
        )
      )
  }, [room])

  useEffect(() => {
    Swal.fire(loading)
    getRoom(room)
      .then((item) => {
        Swal.close()
        setRoomData(item)
      })
      .catch(() =>
        Swal.fire(errorAlert('Failed to get room by id !') as SweetAlertOptions)
      )
  }, [room])

  useEffect(() => {
    getSensor(roomData.sensorId)
      .then((sensor) => {
        setSensorData(sensor)
      })
      .catch(() =>
        Swal.fire(
          errorAlert('Failed to get sensor data !') as SweetAlertOptions
        )
      )
  }, [roomData])

  return (
    <div className='home-container'>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className='home-section weather'>
            <div>
              <Typography
                variant='subtitle2'
                fontWeight={600}
                color='textSecondary'
              >
                Wed, May 8
              </Typography>
              <Typography variant='h6' fontWeight={700}>
                Ho Chi Minh City
              </Typography>
            </div>
            <div className='weather-info'>
              <div>
                <Typography variant='h4' fontWeight={600}>
                  30°C
                </Typography>
                <div className='weather-status'>
                  <WbSunnyRounded />
                  <Typography
                    variant='subtitle1'
                    fontWeight={600}
                    color='textSecondary'
                  >
                    Sunny
                  </Typography>
                </div>
              </div>
              <img src={SunnyWeather} alt='sunny' />
            </div>
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className='home-section device'>
            <div className='device-header'>
              <Typography variant='h6' fontWeight={500}>
                {selectedDevice.name}
              </Typography>
              <FormControlLabel
                value='start'
                control={
                  <Switch
                    color='primary'
                    checked={selectedDevice.status === 'ON'}
                  />
                }
                label={selectedDevice.status}
                labelPlacement='start'
              />
            </div>
            <div className='device-controller'>
              <div className='gauge'>
                <Button
                  variant='contained'
                  color='info'
                  disableElevation
                  sx={{ borderRadius: '48px', height: 'fit-content' }}
                >
                  <RemoveOutlined />
                </Button>
                <div className='gauge-container'>
                  <Gauge
                    value={selectedDevice.temp}
                    startAngle={-110}
                    endAngle={110}
                    width={195}
                    height={140}
                    valueMin={16}
                    valueMax={30}
                    cornerRadius='50%'
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 34,
                        fontWeight: 600,
                        transform: 'translate(0px, 0px)',
                        fontFamily: 'Be Vietnam Pro, sans-serif'
                      },
                      flexGrow: 0,
                      '-webkit-flex-grow': 0,
                      position: 'absolute'
                    }}
                    text={({ value }) => `${value}°C`}
                  />
                </div>

                <Button
                  variant='contained'
                  color='info'
                  disableElevation
                  sx={{ borderRadius: '48px', height: 'fit-content' }}
                >
                  <AddOutlined />
                </Button>
              </div>
              <div className='button'>
                <Button variant='contained' color='info' disableElevation>
                  <AirOutlined />
                </Button>
                <Button variant='contained' color='info' disableElevation>
                  <AcUnitOutlined />
                </Button>
                <Button variant='contained' color='info' disableElevation>
                  <AutoModeOutlined />
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='home-section sensor'>
            <div className='temp'>
              <Typography variant='subtitle1' fontWeight={600}>
                Temperature
              </Typography>
              <div className='text'>
                <ThermostatOutlined />
                <Typography variant='h4' fontWeight={600}>
                  {sensorData.temp}°C
                </Typography>
              </div>
            </div>
            <Divider />
            <div className='temp'>
              <Typography variant='subtitle1' fontWeight={600}>
                Humidity
              </Typography>
              <div className='text'>
                <WaterDropOutlined />
                <Typography variant='h4' fontWeight={600}>
                  {sensorData.humidity}%
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div className='device-list'>
            <div className='header'>
              <Typography variant='h6' fontWeight={600}>
                Devices
              </Typography>
              <Button
                variant='contained'
                disableElevation
                startIcon={<AddOutlined sx={{ color: 'white' }} />}
              >
                Add Device
              </Button>
            </div>
            <Grid
              container
              spacing={2}
              sx={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
            >
              {deviceList.map((device) => (
                <Grid item xs={3} key={device._id}>
                  <div className='card'>
                    <div>
                      <Switch
                        color='primary'
                        checked={device.status === 'ON'}
                      />
                    </div>
                    <div className='info'>
                      <Typography variant='subtitle1' fontWeight={500}>
                        {device.name}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        color={colors.black100}
                        fontWeight={600}
                      >
                        {device.temp}°C
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className='room'>
            <Typography variant='subtitle1' fontWeight={700}>
              {roomData.name}
            </Typography>
            <Typography variant='subtitle2' color={colors.black100}>
              {roomData.width}m x {roomData.height}m
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
