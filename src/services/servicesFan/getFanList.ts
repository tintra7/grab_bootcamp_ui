import { IFan } from '@/models/entities/fanModel'
import axios, { AxiosResponse } from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'

const getFanList = async (): Promise<IFan[]> => {
    try {
      const response: AxiosResponse<IFan[]> = await axios.get(`${apiFanUrl}`)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  export default getFanList