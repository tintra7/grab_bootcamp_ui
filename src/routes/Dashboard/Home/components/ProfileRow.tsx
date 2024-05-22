import { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { ThermostatOutlined, WindPower } from '@mui/icons-material'

import { FANSPEED, MODE } from '@/constants/enum'
import { IDevice } from '@/models/entities/deviceModel'

function TemperatureInput({
  defaultTemp,
  setNewDevice,
  mode
}: {
  defaultTemp: number
  setNewDevice: React.Dispatch<React.SetStateAction<IDevice>>
  mode: MODE
}) {
  const [temperature, setTemperature] = useState<number>(defaultTemp)

  const handleTemperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value)
    if (value < 16) value = 16
    if (value > 30) value = 30
    setTemperature(value)
    setNewDevice((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [mode]: {
          temp: value,
          fan: prev.profile[mode].fan
        }
      }
    }))
  }

  return (
    <TextField
      label='Temperature'
      sx={{ m: 1 }}
      variant='outlined'
      type='number'
      defaultValue={defaultTemp}
      value={temperature}
      onChange={handleTemperatureChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <ThermostatOutlined />
          </InputAdornment>
        ),
        endAdornment: <InputAdornment position='end'>°C</InputAdornment>
      }}
    />
  )
}

interface ProfileRowProps {
  icon: JSX.Element
  mode: MODE
  defaultTemp: number
  defaulSpeed: string
  setNewDevice: React.Dispatch<React.SetStateAction<IDevice>>
}

export default function ProfileRow({
  icon,
  mode,
  defaultTemp,
  defaulSpeed,
  setNewDevice
}: ProfileRowProps) {
  return (
    <Grid container spacing={1} justifyContent='center' alignItems='center'>
      <Grid item xs={3}>
        <Button variant='text' startIcon={icon} disableElevation>
          {mode}
        </Button>
      </Grid>
      <Grid item xs={4}>
        <TemperatureInput
          defaultTemp={defaultTemp}
          setNewDevice={setNewDevice}
          mode={mode}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          select
          label='Fan Speed'
          fullWidth
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <WindPower />
              </InputAdornment>
            )
          }}
          defaultValue={defaulSpeed}
          onChange={(e) =>
            setNewDevice((prev) => ({
              ...prev,
              profile: {
                ...prev.profile,
                [mode]: {
                  temp: prev.profile[mode].temp,
                  fan: e.target.value as FANSPEED
                }
              }
            }))
          }
        >
          {Object.entries(FANSPEED).map(([key, speed]) => (
            <MenuItem key={key} value={key}>
              {speed}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  )
}
