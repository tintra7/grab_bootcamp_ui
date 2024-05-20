import axios from 'axios'

import { apiDeviceUrl } from '@/constants/serverConfig'
import { SetDeviceRequest } from '@/models/requests/DeviceRequest/setDeviceRequest'

const setDevice = async (requestBody: SetDeviceRequest) => {
  try {
    await axios.post(`${apiDeviceUrl}/${requestBody.deviceId}/set`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export default setDevice
