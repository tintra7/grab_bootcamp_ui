import { BRAND, FANSPEED, MODE, STATUS } from '@/constants/enum'

export interface IProfile {
  temp: number
  fan: FANSPEED
}

export interface IDevice {
  _id: string
  userId: string
  name: string
  status: STATUS
  fan: FANSPEED
  temp: number
  brand: BRAND
  currentProfile: MODE
  profile: {
    [key in MODE]: IProfile
  }
  envTemp: number
  humidity: number
}
