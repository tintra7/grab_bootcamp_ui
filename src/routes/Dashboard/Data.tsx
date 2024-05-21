import { useState } from 'react'
import { useSelector } from 'react-redux'
import { LineChart } from '@mui/x-charts'
import axios from 'axios'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import Button from '@mui/material/Button'

import { apiSensorUrl } from '@/constants/serverConfig'
import { colors } from '@/libs/ui'
import { errorAlert, loading } from '@/utils/sweetAlert'

export default function Data() {
  const sensorId = useSelector((state: any) => state.room.sensorId)

  const [data, setData] = useState<any>({})

  const [check, setCheck] = useState<boolean>(false)

  async function fetchData() {
    try {
      const response = await axios.get(
        `${apiSensorUrl}/last?sensorId=${sensorId}&record=10`
      )
      const data = await response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const handleFetchData = () => {
    setCheck(true)

    Swal.fire(loading)
    fetchData()
      .then((data) => {
        setData(data)
        Swal.close()
      })
      .catch(() => {
        Swal.fire(errorAlert('Failed to get data!') as SweetAlertOptions)
      })
  }

  return (
    <>
      {!check ? (
        <Button onClick={handleFetchData}>Fetch Data</Button>
      ) : (
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
        />
      )}
    </>
  )
}
