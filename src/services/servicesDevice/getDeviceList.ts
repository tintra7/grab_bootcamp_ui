import axios, { AxiosResponse } from 'axios'

import { apiDeviceUrl } from '@/constants/serverConfig'
import { IDevice } from '@/models/entities/deviceModel'

const getDeviceList = async (room?: string): Promise<IDevice[]> => {
  try {
    const response: AxiosResponse<IDevice[]> = await axios.get(
      room ? `${apiDeviceUrl}?roomId=${room}` : `${apiDeviceUrl}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getDeviceList
