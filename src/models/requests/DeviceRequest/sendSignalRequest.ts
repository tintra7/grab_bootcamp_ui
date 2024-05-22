import { FANSPEED, MODE, STATUS } from '@/constants/enum'

interface SendSignalRequest {
  deviceId: string
  temp: number
  fan: FANSPEED
  status: STATUS
  profile: MODE
}

export default SendSignalRequest
