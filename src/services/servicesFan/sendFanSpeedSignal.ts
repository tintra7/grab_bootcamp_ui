import axios from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'
import SendFanSpeedSignalRequest from '@/models/requests/FanRequest/sendFanSpeedSignalRequest'

const sendFanSpeedSignal = async (requestBody: SendFanSpeedSignalRequest) => {
  try {
    console.log(requestBody)
    await axios.post(
      `${apiFanUrl}/${requestBody.fanId}/sendspeedsignal`,
      requestBody
    )
  } catch (error) {
    console.error(error)
  }
}

export default sendFanSpeedSignal
