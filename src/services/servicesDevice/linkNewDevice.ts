import axios from 'axios'

import { apiDeviceUrl } from '@/constants/serverConfig'
import { LinkDeviceRequest } from '@/models/requests/DeviceRequest/linkDeviceRequest'

const linkNewDevice = async (requestBody: LinkDeviceRequest) => {
  try {
    await axios.post(`${apiDeviceUrl}`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export default linkNewDevice
