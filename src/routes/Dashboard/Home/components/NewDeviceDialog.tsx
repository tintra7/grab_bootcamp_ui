import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery
} from '@mui/material/'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import {
  AcUnitOutlined,
  OpacityOutlined,
  SettingsRounded
} from '@mui/icons-material'

import { BRAND, MODE } from '@/constants/enum'
import theme from '@/libs/ui/theme'
import { IDevice } from '@/models/entities/deviceModel'
import ProfileRow from './ProfileRow'

interface NewDeviceDialogProps {
  open: boolean
  handleClose: () => void
  handleSubmit: () => void
  rooms: any[]
  room: string
  setNewDevice: React.Dispatch<React.SetStateAction<IDevice>>
}

export default function NewDeviceDialog({
  open,
  handleClose,
  handleSubmit,
  rooms,
  room,
  setNewDevice
}: NewDeviceDialogProps) {
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      fullScreen={hidden}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle>{'Link New Device to Room'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide name, brand and room for new air conditioner
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          onChange={(e) =>
            setNewDevice((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <FormControl fullWidth margin='dense'>
          <InputLabel id='brand-select-label'>Brand</InputLabel>
          <Select
            fullWidth
            label='Brand'
            labelId='brand-select-label'
            onChange={(e) =>
              setNewDevice((prev) => ({
                ...prev,
                brand: e.target.value as BRAND
              }))
            }
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
            onChange={() => setNewDevice((prev) => ({ ...prev, roomId: room }))}
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
          <Grid container spacing={2}>
            {[
              {
                icon: <AcUnitOutlined />,
                mode: MODE.COOLING,
                defaultTemp: 19,
                defaultSpeed: 'HIGH'
              },
              {
                icon: <OpacityOutlined />,
                mode: MODE.MOISTURING,
                defaultTemp: 24,
                defaultSpeed: 'MEDIUM'
              },
              {
                icon: <SettingsRounded />,
                mode: MODE.DEFAULT,
                defaultTemp: 27,
                defaultSpeed: 'LOW'
              }
            ].map((profile) => (
              <Grid item xs={12} key={profile.mode}>
                <ProfileRow
                  icon={profile.icon}
                  mode={profile.mode}
                  defaultTemp={profile.defaultTemp}
                  defaulSpeed={profile.defaultSpeed}
                  setNewDevice={setNewDevice}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
