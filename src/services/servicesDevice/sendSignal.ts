import axios from 'axios'

import { apiDeviceUrl } from '@/constants/serverConfig'
import SendSignalRequest from '@/models/requests/DeviceRequest/sendSignalRequest'

const sendSignal = async (requestBody: SendSignalRequest) => {
  try {
    await axios.post(
      `${apiDeviceUrl}/${requestBody.deviceId}/sendSignal`,
      requestBody
    )
  } catch (error) {
    console.error(error)
  }
}

export default sendSignal
