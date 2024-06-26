import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import { NotificationsRounded } from '@mui/icons-material'

import { updateRoom } from '@/libs/redux/roomSlice'
import getRoomList from '@/services/servicesDevice/getRoomList'
import { loading } from '@/utils/sweetAlert'
import theme from '../theme'
import { colors } from '..'

import '@/assets/css/layouts/Header.css'

function stringAvatar(name: string) {
  return {
    sx: { bgcolor: colors.green900 },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

const Header: React.FC = () => {
  const roomRedux = useSelector((state: any) => state.room._id)
  const dispatch = useDispatch()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [rooms, setRooms] = useState<any[]>([])
  const [room, setRoom] = useState<string>(roomRedux)

  useEffect(() => {
    getRoomList()
      .then((rooms) => {
        setRooms(rooms)
        setRoom(rooms[0]._id)
        dispatch(
          updateRoom({
            _id: rooms[0]._id,
            sensorId: rooms[0].sensorId
          })
        )
      })
      .catch(() => Swal.fire('Failed to get rooms'))
  }, [])

  return (
    <div className='header'>
      <div className='text'>
        <Typography variant='h5' fontWeight={600}>
          Welcome home, Thien Bui
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          Have a great day!
        </Typography>
      </div>
      <div className='user'>
        {hidden ? null : (
          <>
            {' '}
            <Button>Add Room</Button>
            <Select
              value={room}
              onChange={(e) => {
                setRoom(e.target.value as string)
                dispatch(
                  updateRoom({
                    _id: e.target.value as string,
                    sensorId: rooms.find(
                      (room: any) => room._id === e.target.value
                    )?.sensorId
                  })
                )
              }}
            >
              {rooms.map((room: any) => (
                <MenuItem key={room._id} value={room._id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        <IconButton>
          <NotificationsRounded />
        </IconButton>
        <Avatar
          {...stringAvatar('Thien Bui')}
          sx={{
            width: hidden ? 24 : 48,
            height: hidden ? 24 : 48,
            bgcolor: colors.green900
          }}
        />
      </div>
    </div>
  )
}

export default Header
