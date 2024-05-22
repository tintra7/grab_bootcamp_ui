import { FANSPEED, MODE, STATUS } from '@/constants/enum'
import { IDevice } from '@/models/entities/deviceModel'
import SendSignalRequest from '@/models/requests/DeviceRequest/sendSignalRequest'

const craftSendSignalRequest = (
  optionalPara: {
    status?: STATUS
    temp?: number
    profile?: MODE
    fan?: FANSPEED
  },
  device: IDevice
): SendSignalRequest => {
  return {
    deviceId: device._id,
    status: optionalPara.status || STATUS.ON,
    profile: optionalPara.profile || device.currentProfile,
    temp: optionalPara.temp || device.temp,
    fan: optionalPara.fan || device.fan
  }
}

export default craftSendSignalRequest
