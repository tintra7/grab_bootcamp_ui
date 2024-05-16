import axios from 'axios'

import { apiFanUrl, apiUrl } from '@/constants/serverConfig'
import { LinkFanRequest } from '@/models/requests/FanRequest/linkFanRequest'

const linkNewFan = async (requestBody: LinkFanRequest) => {
  try {
    await axios.post(`${apiFanUrl}`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export default linkNewFan