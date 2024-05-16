import axios, { AxiosResponse } from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'
import FanStatsResponse from '@/models/responses/getFanStatsResponse'

const getFanStats = async (fanId: string): Promise<FanStatsResponse> => {
    try {
      const response: AxiosResponse<FanStatsResponse> = await axios.get(
        `${apiFanUrl}/${fanId}/stats`
      )
      return response.data
    } catch (error) {
      console.error(error)
      return {
        humidity: -1,
        temp: -1,
        fanId: fanId
      }
    }
  }
  
  export default getFanStats