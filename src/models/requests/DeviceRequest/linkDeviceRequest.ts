import { IProfile } from '../../entities/deviceModel'
import { BRAND, FANSPEED, MODE } from '@/constants/enum'

export interface LinkDeviceRequest {
  userId: string
  name: string
  brand: BRAND
  profile: {
    [key in MODE]: IProfile
  }
}

export const initialLinkDeviceRequest: LinkDeviceRequest = {
  userId: 'empty',
  name: '',
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
