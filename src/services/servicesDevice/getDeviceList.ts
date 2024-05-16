import { IDevice } from '@/models/entities/deviceModel'
import axios, { AxiosResponse } from 'axios'

import { apiUrl } from '@/constants/serverConfig'

const getDeviceList = async (): Promise<IDevice[]> => {
  try {
    const response: AxiosResponse<IDevice[]> = await axios.get(`${apiUrl}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getDeviceList
