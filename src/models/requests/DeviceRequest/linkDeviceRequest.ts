import { BRAND, FANSPEED, MODE } from '@/constants/enum'
import { IProfile } from '../../entities/deviceModel'

export interface LinkDeviceRequest {
  name: string
  brand: BRAND
  roomId: string
  profile: {
    [key in MODE]: IProfile
  }
}

export const initialLinkDeviceRequest: LinkDeviceRequest = {
  name: '',
  roomId: '',
  brand: BRAND.TOSHIBA,
  profile: {
    COOLING: {
      temp: 19,
      fan: FANSPEED.HIGH
    },
    DEFAULT: {
      temp: 24,
      fan: FANSPEED.MEDIUM
    },
    MOISTURING: {
      temp: 27,
      fan: FANSPEED.LOW
    }
  }
}
