import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LineChart } from '@mui/x-charts'
import axios from 'axios'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material/'

import { apiSensorUrl } from '@/constants/serverConfig'
import { colors } from '@/libs/ui'
import theme from '@/libs/ui/theme'
import { errorAlert, loading } from '@/utils/sweetAlert'

export default function Data() {
  const sensorId = useSelector((state: any) => state.room.sensorId)

  const [data, setData] = useState<any>({})

  async function fetchData(record: number = 10) {
    try {
      const response = await axios.get(
        `${apiSensorUrl}/last?sensorId=${sensorId}&record=${record}`
      )
      const data = await response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    Swal.fire(loading)
    sensorId &&
      fetchData()
        .then((data) => {
          setData(data)
          Swal.close()
        })
        .catch(() => {
          Swal.fire(errorAlert('Failed to get data!') as SweetAlertOptions)
        })
  }, [sensorId])

  return (
    <div className='home-section'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}
      >
        <Typography variant='h6' fontWeight={600}>
          Recent sensor data
        </Typography>
        <FormControl>
          <InputLabel>Record</InputLabel>
          <Select
            label='Record'
            defaultValue={'10'}
            onChange={(e) => {
              const value = e.target.value
              Swal.fire(loading)
              sensorId &&
                fetchData(parseInt(value))
                  .then((data) => {
                    setData(data)
                    Swal.close()
                  })
                  .catch(() => {
                    Swal.fire(
                      errorAlert('Failed to get data!') as SweetAlertOptions
                    )
                  })
            }}
            sx={{
              minWidth: 100,
              [theme.breakpoints.down('sm')]: {
                minWidth: 50
              }
            }}
          >
            <MenuItem value={'10'}>10</MenuItem>
            <MenuItem value={'20'}>20</MenuItem>
            <MenuItem value={'30'}>30</MenuItem>
          </Select>
        </FormControl>
      </div>
      <LineChart
        xAxis={[
          {
            scaleType: 'band',
            data: data.timestamp || []
          }
        ]}
        series={[
          { data: data.humidity || [], label: 'Humidity' },
          { data: data.temp || [], label: 'Temperature' }
        ]}
        height={400}
        colors={[colors.green500, colors.blue500]}
        sx={{ width: '100%' }}
        slotProps={{
          legend: {
            itemGap: 20
          }
        }}
      />
    </div>
  )
}
