import axios from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'
import { LinkDeviceRequest } from '@/models/requests/DeviceRequest/linkDeviceRequest'

const linkNewDevice = async (requestBody: LinkDeviceRequest) => {
  try {
    await axios.post(`${apiFanUrl}`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export default linkNewDevice
