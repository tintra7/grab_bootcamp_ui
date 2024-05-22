import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import { FormControl, InputAdornment, InputLabel, styled } from '@mui/material/'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  AcUnitOutlined,
  AddOutlined,
  OpacityRounded,
  RemoveOutlined,
  SettingsRounded,
  ThermostatOutlined,
  WindPower
} from '@mui/icons-material'

import { BRAND } from '@/constants/enum'
import { updateRoom } from '@/libs/redux/roomSlice'
import { colors } from '@/libs/ui'
import theme from '@/libs/ui/theme'
import { IDevice } from '@/models/entities/deviceModel'
import getDeviceList from '@/services/servicesDevice/getDeviceList'
import getRoom from '@/services/servicesDevice/getRoom'
import getRoomList from '@/services/servicesDevice/getRoomList'
import { errorAlert, loading } from '@/utils/sweetAlert'
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
    room &&
      getRoom(room)
        .then((item) => {
          setRoomData(item)
        })
        .catch(() =>
          Swal.fire(
            errorAlert('Failed to get room by id !') as SweetAlertOptions
          )
        )
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
    Swal.fire(loading)
    getRoomList()
      .then((rooms) => {
        Swal.close()
        setRooms(rooms)
      })
      .catch(() => Swal.fire('Failed to get rooms'))
  }, [])

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
              <Dialog
                open={open}
                onClose={handleNewDeviceClose}
                scroll='paper'
                fullScreen={hidden}
                fullWidth={true}
                maxWidth='sm'
              >
                <DialogTitle>{'Link New Device to Room'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Provide name and Room for new air conditioner
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                  />
                  <FormControl fullWidth margin='dense'>
                    <InputLabel id='brand-select-label'>Brand</InputLabel>
                    <Select
                      fullWidth
                      label='Brand'
                      labelId='brand-select-label'
                    >
                      {Object.entries(BRAND).map(([key, brand]) => (
                        <MenuItem key={key} value={key}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin='dense'>
                    <InputLabel id='room-select-label'>Room</InputLabel>
                    <Select
                      fullWidth
                      label='Room'
                      labelId='room-select-label'
                      value={room}
                      inputProps={{ readOnly: true }}
                    >
                      {rooms.map((room) => (
                        <MenuItem key={room._id} value={room._id}>
                          {room.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div style={{ margin: '8px 0 4px' }}>
                    <Typography variant='subtitle2'>Profile</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Button
                              variant='text'
                              startIcon={<AcUnitOutlined />}
                              disableElevation
                            >
                              COOLING
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant='text'
                              startIcon={<OpacityRounded />}
                              disableElevation
                            >
                              MOISTURING
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant='text'
                              startIcon={<SettingsRounded />}
                              disableElevation
                            >
                              DEFAULT
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              label='Temperature'
                              sx={{ m: 1 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='end'>
                                    <ThermostatOutlined />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}></Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              label='With normal TextField'
                              id='outlined-start-adornment'
                              sx={{ m: 1, width: '25ch' }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    kg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}></Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleNewDeviceClose}>Disagree</Button>
                  <Button onClick={handleNewDeviceClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
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
                    <div>
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
