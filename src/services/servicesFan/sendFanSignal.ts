import axios from 'axios'

import { apiFanUrl } from '@/constants/serverConfig'
import SendFanSignalRequest from '@/models/requests/FanRequest/sendFanSignalRequest'

const sendFanSignal = async (requestBody: SendFanSignalRequest) => {
  try {
    await axios.post(
      `${apiFanUrl}/${requestBody.fanId}/sendsignal`,
      requestBody
    )
  } catch (error) {
    console.error(error)
  }
}

export default sendFanSignal
