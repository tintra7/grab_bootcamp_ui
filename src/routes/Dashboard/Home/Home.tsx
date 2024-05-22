import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import { styled } from '@mui/material/'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  AcUnitOutlined,
  AddOutlined,
  OpacityRounded,
  RemoveOutlined,
  SettingsRounded,
  WindPower
} from '@mui/icons-material'

import { FANSPEED } from '@/constants/enum'
import { updateRoom } from '@/libs/redux/roomSlice'
import { colors } from '@/libs/ui'
import theme from '@/libs/ui/theme'
import { IDevice } from '@/models/entities/deviceModel'
import {
  initialLinkDeviceRequest,
  LinkDeviceRequest
} from '@/models/requests/DeviceRequest/linkDeviceRequest'
import getDeviceList from '@/services/servicesDevice/getDeviceList'
import getRoom from '@/services/servicesDevice/getRoom'
import getRoomList from '@/services/servicesDevice/getRoomList'
import linkNewDevice from '@/services/servicesDevice/linkNewDevice'
import sendSignal from '@/services/servicesDevice/sendSignal'
import craftSendSignalRequest from '@/utils/deviceControll'
import { errorAlert, loading, successAlert } from '@/utils/sweetAlert'
import Brand from '../DeviceList/Brand'
import NewDeviceDialog from './components/NewDeviceDialog'
import Sensor from './components/Sensor'
import Weather from './components/Weather'

import '@/assets/css/components/Home.css'

const StyledGaugeContainerSm = styled('div')(({ theme }) => ({
  position: 'relative',
  background: colors.green50,
  width: '195px',
  height: '195px',
  padding: '0.5rem',
  borderRadius: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '120px',
    height: '120px',
    padding: '0.25rem'
  }
}))

const Home: React.FC = () => {
  const room = useSelector((state: any) => state.room._id)
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()

  const [deviceList, setDeviceList] = useState<IDevice[]>([])
  const [roomData, setRoomData] = useState<any>({})
  const [selectedDevice, setSelectedDevice] = useState<any>({})
  const [open, setOpen] = useState(false)
  const [rooms, setRooms] = useState<any[]>([])
  const [newDevice, setNewDevice] = useState<LinkDeviceRequest>(
    initialLinkDeviceRequest
  )
  const [createSuccess, setCreateSuccess] = useState(false)

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
    if (room) {
      getRoom(room)
        .then((item) => {
          setRoomData(item)
        })
        .catch(() =>
          Swal.fire(
            errorAlert('Failed to get room by id !') as SweetAlertOptions
          )
        )

      setNewDevice({ ...newDevice, roomId: room })
    }
  }, [room])

  const handleCardOnClick = (device: IDevice) => {
    setSelectedDevice(device)
  }

  const handleNewDeviceOpen = () => {
    setOpen(true)
  }

  const handleNewDeviceClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getRoomList()
      .then((rooms) => {
        setRooms(rooms)
      })
      .catch(() => Swal.fire('Failed to get rooms'))
  }, [])

  useEffect(() => {
    if (createSuccess) {
      getDeviceList(room)
        .then((devices) => {
          setDeviceList(devices)
        })
        .catch(() =>
          Swal.fire(
            errorAlert('Failed to get device list !') as SweetAlertOptions
          )
        )
      setCreateSuccess(false)
    }
  }, [createSuccess])

  const handleNewDevice = async () => {
    handleNewDeviceClose()
    if (newDevice && newDevice.name.trim() != '') {
      Swal.fire(loading)
      try {
        await linkNewDevice(newDevice)
        setCreateSuccess(true)
        Swal.fire(
          successAlert('Successfully linked new device !') as SweetAlertOptions
        )
      } catch (error) {
        Swal.fire(errorAlert('Failed to link new device') as SweetAlertOptions)
      }
    } else {
      Swal.fire(errorAlert('Missing name !') as SweetAlertOptions)
    }
  }

  const onFanChange = async (fan: FANSPEED) => {
    setSelectedDevice({ ...selectedDevice, fan: fan })
    try {
      await sendSignal(craftSendSignalRequest({ fan: fan }, selectedDevice))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='home-container'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Weather />
        </Grid>
        {hidden && (
          <Grid item xs={12}>
            <div>
              {rooms.map((room) => (
                <Button
                  key={room._id}
                  onClick={() => {
                    dispatch(
                      updateRoom({
                        _id: room._id,
                        sensorId: room.sensorId
                      })
                    )
                  }}
                  variant={room._id === roomData._id ? 'contained' : 'outlined'}
                  disableElevation
                >
                  {room.name}
                </Button>
              ))}
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={7}>
          <div className='home-section device'>
            <div className='device-header'>
              <Typography variant='h6' fontWeight={500}>
                {selectedDevice && selectedDevice.name}
              </Typography>
              <FormControlLabel
                value='start'
                control={
                  <Switch
                    color='primary'
                    checked={selectedDevice && selectedDevice.status === 'ON'}
                    size={hidden ? 'small' : 'medium'}
                  />
                }
                label={selectedDevice && selectedDevice.status}
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
                    sx={{ borderRadius: '50%', height: 'fit-content' }}
                  >
                    <RemoveOutlined />
                  </Button>
                  <StyledGaugeContainerSm>
                    <Gauge
                      value={selectedDevice && selectedDevice.temp}
                      startAngle={-110}
                      endAngle={110}
                      width={hidden ? 120 : 195}
                      height={hidden ? 86 : 140}
                      valueMin={16}
                      valueMax={30}
                      cornerRadius='50%'
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: hidden ? 20 : 34,
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
                  </StyledGaugeContainerSm>
                  <Button
                    variant='contained'
                    color='info'
                    disableElevation
                    sx={{ borderRadius: '50%', height: 'fit-content' }}
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
                      selectedDevice && selectedDevice.fan === 'HIGH'
                        ? 'contained'
                        : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice && selectedDevice.fan === 'HIGH'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                    onClick={() => onFanChange(FANSPEED.HIGH)}
                  >
                    HIGH
                  </Button>
                  <Button
                    variant={
                      selectedDevice && selectedDevice.fan === 'MEDIUM'
                        ? 'contained'
                        : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice && selectedDevice.fan === 'MEDIUM'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                    onClick={() => onFanChange(FANSPEED.MEDIUM)}
                  >
                    MED
                  </Button>
                  <Button
                    variant={
                      selectedDevice && selectedDevice.fan === 'LOW'
                        ? 'contained'
                        : 'outlined'
                    }
                    disableElevation
                    sx={{ height: 'fit-content' }}
                    startIcon={
                      <WindPower
                        sx={{
                          color:
                            selectedDevice && selectedDevice.fan === 'LOW'
                              ? 'white'
                              : colors.green500
                        }}
                      />
                    }
                    onClick={() => onFanChange(FANSPEED.LOW)}
                  >
                    LOW
                  </Button>
                </div>
              </div>
              <div className='button'>
                <Button
                  variant='contained'
                  color={
                    selectedDevice &&
                    selectedDevice.currentProfile === 'MOISTURING'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <OpacityRounded
                    sx={{
                      color:
                        selectedDevice &&
                        selectedDevice.currentProfile === 'MOISTURING'
                          ? 'white'
                          : 'primary'
                    }}
                  />
                </Button>
                <Button
                  variant='contained'
                  color={
                    selectedDevice &&
                    selectedDevice.currentProfile === 'COOLING'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <AcUnitOutlined
                    sx={{
                      color:
                        selectedDevice &&
                        selectedDevice.currentProfile === 'COOLING'
                          ? 'white'
                          : 'primary'
                    }}
                  />
                </Button>
                <Button
                  variant='contained'
                  color={
                    selectedDevice &&
                    selectedDevice.currentProfile === 'DEFAULT'
                      ? 'primary'
                      : 'info'
                  }
                  disableElevation
                >
                  <SettingsRounded
                    sx={{
                      color:
                        selectedDevice &&
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
        <Grid item xs={12} sm={2}>
          <Sensor roomData={roomData} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <div className='device-list'>
            <div className='header'>
              <Typography variant='h6' fontWeight={600}>
                Devices
              </Typography>
              <Button
                variant='contained'
                disableElevation
                startIcon={<AddOutlined sx={{ color: 'white' }} />}
                onClick={handleNewDeviceOpen}
              >
                Add Device
              </Button>
              <NewDeviceDialog
                open={open}
                handleClose={handleNewDeviceClose}
                handleSubmit={handleNewDevice}
                rooms={rooms}
                room={room}
                setNewDevice={setNewDevice as any}
              />
            </div>
            <Grid
              container
              spacing={2}
              sx={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
            >
              {deviceList.map((device) => (
                <Grid item xs={6} sm={3} key={device._id}>
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      <Brand brandName={device.brand} />
                      <Switch
                        color='primary'
                        checked={device.status === 'ON'}
                        size={hidden ? 'small' : 'medium'}
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
        {!hidden && (
          <Grid item xs={12} sm={3}>
            <div className='room'>
              <Typography variant='subtitle1' fontWeight={700}>
                {roomData.name}
              </Typography>
              <Typography variant='subtitle2' color={colors.black100}>
                {roomData.width}m x {roomData.height}m
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Home
