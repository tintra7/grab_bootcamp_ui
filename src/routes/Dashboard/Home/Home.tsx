import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import axios from 'axios'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
// import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
// import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import {
  AcUnitOutlined,
  AddOutlined,
  AirOutlined,
  AutoModeOutlined,
  CloudRounded,
  RemoveOutlined,
  ThermostatOutlined,
  ThunderstormRounded,
  WaterDropOutlined,
  WbSunnyRounded,
  WindPower
} from '@mui/icons-material'

import CloudsWeather from '@/assets/images/Clouds.svg'
import RainWeather from '@/assets/images/Rain.svg'
import SnowWeather from '@/assets/images/Snow.svg'
import SunnyWeather from '@/assets/images/sunny.svg'
// import { BRAND } from '@/constants/enum'
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
  const [weatherData, setWeatherData] = useState<any>({})
  // const [open, setOpen] = useState(false)

  async function getWeather(lat: number, lon: number) {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      const data = await response.data
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    getDeviceList(room)
      .then((devices) => {
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
    getRoom(room)
      .then((item) => {
        setRoomData(item)
      })
      .catch(() =>
        Swal.fire(errorAlert('Failed to get room by id !') as SweetAlertOptions)
      )
  }, [room])

  useEffect(() => {
    // interval to get sensor data every 5 seconds
    Swal.fire(loading)
    const interval = setInterval(() => {
      roomData.sensorId &&
        getSensor(roomData.sensorId)
          .then((sensor) => {
            Swal.close()
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

  useEffect(() => {
    Swal.fire(loading)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        getWeather(lat, lon)
          .then((data) => {
            setWeatherData(data)
            Swal.close()
          })
          .catch(() =>
            Swal.fire(
              errorAlert('Failed to get weather data !') as SweetAlertOptions
            )
          )
      },
      function (error) {
        console.error('Error Code = ' + error.code + ' - ' + error.message)
      }
    )
  }, [])

  const handleCardOnClick = (device: IDevice) => {
    setSelectedDevice(device)
  }

  const date = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date)

  // const handleNewDeviceOpen = () => {
  //   setOpen(true)
  // }

  // const handleNewDeviceClose = () => {
  //   setOpen(false)
  // }

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
                {formattedDate}
              </Typography>
              <Typography variant='h6' fontWeight={700}>
                {weatherData.name}
              </Typography>
            </div>
            <div className='weather-info'>
              <div>
                <Typography variant='h4' fontWeight={600}>
                  {weatherData ? Math.round(weatherData.main?.temp) : 28}°C
                </Typography>
                <div className='weather-status'>
                  {weatherData &&
                  weatherData.weather &&
                  weatherData.weather[0] ? (
                    weatherData.weather[0].main === 'Clear' ? (
                      <WbSunnyRounded />
                    ) : weatherData.weather[0].main === 'Clouds' ? (
                      <CloudRounded />
                    ) : weatherData.weather[0].main === 'Rain' ? (
                      <ThunderstormRounded />
                    ) : (
                      <AcUnitOutlined />
                    )
                  ) : (
                    <AcUnitOutlined />
                  )}
                  <Typography
                    variant='subtitle1'
                    fontWeight={600}
                    color='textSecondary'
                  >
                    {weatherData &&
                      weatherData.weather &&
                      weatherData.weather[0] &&
                      weatherData.weather[0].main}
                  </Typography>
                </div>
              </div>
              <img
                src={
                  weatherData && weatherData.weather && weatherData.weather[0]
                    ? weatherData.weather[0].main === 'Clear'
                      ? SunnyWeather
                      : weatherData.weather[0].main === 'Clouds'
                      ? CloudsWeather
                      : weatherData.weather[0].main === 'Rain'
                      ? RainWeather
                      : SnowWeather
                    : undefined
                }
                alt={
                  weatherData &&
                  weatherData.weather &&
                  weatherData.weather[0] &&
                  weatherData.weather[0].main
                }
              />
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
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
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
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.25rem',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    variant={
                      selectedDevice.fan === 'HIGH' ? 'contained' : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice.fan === 'HIGH'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                  >
                    HIGH
                  </Button>
                  <Button
                    variant={
                      selectedDevice.fan === 'MEDIUM' ? 'contained' : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice.fan === 'MEDIUM'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                  >
                    MED
                  </Button>
                  <Button
                    variant={
                      selectedDevice.fan === 'LOW' ? 'contained' : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice.fan === 'LOW'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                  >
                    LOW
                  </Button>
                </div>
              </div>
              <div className='button'>
                <Button
                  variant='contained'
                  color={
                    selectedDevice.currentProfile === 'MOISTURING'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <AirOutlined
                    sx={{
                      color:
                        selectedDevice.currentProfile === 'MOISTURING'
                          ? 'white'
                          : 'primary'
                    }}
                  />
                </Button>
                <Button
                  variant='contained'
                  color={
                    selectedDevice.currentProfile === 'COOLING'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <AcUnitOutlined
                    sx={{
                      color:
                        selectedDevice.currentProfile === 'COOLING'
                          ? 'white'
                          : 'primary'
                    }}
                  />
                </Button>
                <Button
                  variant='contained'
                  color={
                    selectedDevice.currentProfile === 'DEFAULT'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <AutoModeOutlined
                    sx={{
                      color:
                        selectedDevice.currentProfile === 'DEFAULT'
                          ? 'white'
                          : 'primary'
                    }}
                  />
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
                // onClick={handleNewDeviceOpen}
              >
                Add Device
              </Button>
              {/* <Dialog open={open} onClose={handleNewDeviceClose}>
                <DialogTitle>{'Link New Device to Room'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Provide name and brand for new air conditioner
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                  />
                  <Select fullWidth>
                    {Object.entries(BRAND).map(([key, brand]) => (
                      <MenuItem key={key} value={key}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleNewDeviceClose}>Disagree</Button>
                  <Button onClick={handleNewDeviceClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog> */}
            </div>
            <Grid
              container
              spacing={2}
              sx={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
            >
              {deviceList.map((device) => (
                <Grid item xs={3} key={device._id}>
                  <div
                    className='card'
                    style={{
                      background:
                        selectedDevice._id === device._id
                          ? 'linear-gradient(180deg, #00B14F 0%, #004A21 100%)'
                          : 'white'
                    }}
                    onClick={() => handleCardOnClick(device)}
                  >
                    <div>
                      <Switch
                        color='primary'
                        checked={device.status === 'ON'}
                      />
                    </div>
                    <div className='info'>
                      <Typography
                        variant='subtitle1'
                        fontWeight={500}
                        color={
                          selectedDevice._id === device._id ? 'white' : 'black'
                        }
                      >
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
