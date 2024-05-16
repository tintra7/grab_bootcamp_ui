import axios, { AxiosResponse } from 'axios'

import { apiUrl } from '@/constants/serverConfig'
import StatsResponse from '@/models/responses/getStatsResponse'

const getStats = async (deviceId: string): Promise<StatsResponse> => {
  try {
    const response: AxiosResponse<StatsResponse> = await axios.get(
      `${apiUrl}/${deviceId}/stats`
    )
    return response.data
  } catch (error) {
    console.error(error)
    return {
      humidity: -1,
      temp: -1,
      deviceId: deviceId
    }
  }
}

export default getStats
