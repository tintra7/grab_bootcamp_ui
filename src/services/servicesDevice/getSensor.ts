import axios from 'axios'

import { apiSensorUrl } from '@/constants/serverConfig'

export default async function getSensor(sensorId: string) {
  try {
    const response = await axios.get(
      `${apiSensorUrl}/current/?sensorId=${sensorId}`
    )
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
