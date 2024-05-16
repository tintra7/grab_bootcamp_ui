import axios from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'
import { SetFanRequest } from '@/models/requests/FanRequest/setFanRequest'

const setFan = async (requestBody: SetFanRequest) => {
  try {
    await axios.post(`${apiFanUrl}/${requestBody.fanId}/set`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export default setFan